import { Request, Response } from 'express';
import patientModel from '../models/patientModel'; // Import your patient model
import packageModel from '../models/packageModel'; // Import your package model
import tokenModel from '../models/tokenModel';
import Stripe from 'stripe';
require('dotenv').config();


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
if (!process.env.STRIPE_SECRET_KEY)
 throw new Error('process.env.STRIPE_SECRET_KEY not found');

export const subscribeToHealthPackage = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenDB = await tokenModel.findOne({ token });
    const username = tokenDB && tokenDB.username;
    const {packageName, paymentMethod } = req.body;
 

    if (!username || !packageName || !paymentMethod) {
      return res.status(400).json({ error: 'Username, package name, and payment method are required' });
    }

    // Find the patient by username
    const patient = await patientModel.findOne({ username });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Find the health package by name
    const healthPackage = await packageModel.findOne({ name: packageName });

    if (!healthPackage) {
      return res.status(404).json({ error: 'Health package not found' });
    }
    const isSubscribed = patient.healthPackageSubscription.some(
      subscription => subscription.name === packageName && subscription.status === 'subscribed with renewal date'
    );
    
    if (isSubscribed) {
      return res.status(400).json({ error: 'Patient is already subscribed to this package' });
    }
    const subscriptionCost = healthPackage.feesPerYear;
    if (paymentMethod === 'creditCard') {

      const sessionUrl = await creditPayment(req, res, subscriptionCost);

      if (!sessionUrl) {
        return res.status(500).json({ error: 'Failed to create payment session' });
      }
      
      patient.healthPackageSubscription.push({
        name: packageName,
        startdate: '',
        enddate: '',
        status: "subscribed with renewal date"   
      })
      await patient.save();
      return res.status(201).json({ message: 'Health package subscribed successfully', patient, sessionUrl });

    } ;
    if (paymentMethod === 'wallet') {
      if (patient.walletBalance < subscriptionCost) {
        return res.status(400).json({ error: 'Insufficient funds in the wallet' });
      }
      else {
        // Deduct the cost from the wallet balance
      patient.walletBalance -= subscriptionCost;
      patient.healthPackageSubscription.push({
        name: packageName,
        startdate: '',
        enddate: '',
        status: "subscribed with renewal date"   
      })
      }
    }
  
    if (!patient.healthPackageSubscription) {
      patient.healthPackageSubscription = [];
    }

    if (!Array.isArray(patient.healthPackageSubscription)) {
      patient.healthPackageSubscription = [];
    }

    await patient.save();

    return res.status(201).json({ message: 'Health package subscribed successfully', patient });
  } catch (error) {
    console.error('Error subscribing to health package:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const subscribeFamAsPatient = async (username: String, packageName: string) => {
  try {
  console.log("ANA HENA FAM AS PATIENT")
    if (!username || !packageName ) {
      throw new Error('Username and package name are required');    }

    // Find the patient by username
    const patient = await patientModel.findOne({ username });

    if (!patient) {
      throw new Error('Patient not found');
    }

    // Find the health package by name
    const healthPackage = await packageModel.findOne({ name: packageName });

    if (!healthPackage) {
      throw new Error('Health package not found');
    }
    
    const isSubscribed = patient.healthPackageSubscription.some(
      subscription => subscription.name === packageName && subscription.status === 'subscribed with renewal date'
    );
    
    if (isSubscribed) {
      throw new Error('Patient is already subscribed to this package');
    }
    
    if (!patient.healthPackageSubscription) {
      patient.healthPackageSubscription = [];
    }

    if (!Array.isArray(patient.healthPackageSubscription)) {
      patient.healthPackageSubscription = [];
    }
    // Add the health package to the subscription array
    patient.healthPackageSubscription.push({
      name: packageName,
      startdate: '',
      enddate: '',
      status: 'subscribed with renewal date',
    });

    await patient.save();

    return { message: 'Health package subscribed successfully', patient };
  } catch (error) {
    console.error('Error subscribing to health package:', error);
    throw new Error('Internal server error');
  }
};


export const subscribeToHealthPackageForFamily = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenDB = await tokenModel.findOne({ token });
    const username = tokenDB && tokenDB.username;
    const {packageName, familyMemberName, paymentMethod } = req.body;

    if (!username || !packageName || !familyMemberName || !paymentMethod ) {
      return res.status(400).json({ error: 'Username, package name, and family member username are required' });
    }

    // Find the patient by username
    const patient = await patientModel.findOne({ username });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Check if the patient has family members
    if (patient.familyMembers && patient.familyMembers.length > 0) {
      const familyMember = patient.familyMembers.find((member) => member.name === familyMemberName);

      if (!familyMember) {
        return res.status(404).json({ error: 'Family member not found' });
      }

      // Find the health package by name
      const healthPackage = await packageModel.findOne({ name: packageName });

      if (!healthPackage) {
        return res.status(404).json({ error: 'Health package not found' });
      }
      
      if (!familyMember. healthPackageSubscription) {
        familyMember. healthPackageSubscription = [];
        }
      const isSubscribed = familyMember.healthPackageSubscription.some(
        subscription => subscription.name === packageName && subscription.status === 'subscribed with renewal date'
      );
      
      if (isSubscribed) {
        return res.status(400).json({ error: 'Patient is already subscribed to this package' });
      }
      const price =  await calcTotal(healthPackage.feesPerYear, username);
      const subscriptionCost = price;


      if (paymentMethod === 'creditCard') {
             
        const sessionUrl = await creditPayment(req, res, subscriptionCost);

        if (!sessionUrl) {
          return res.status(500).json({ error: 'Failed to create payment session' });
        }
        familyMember.healthPackageSubscription.push({
          name: packageName,
          startdate: '',
          enddate: '',
          status: "subscribed with renewal date"   
        });
        const familyMemberUsername = familyMember.username;
        if(!familyMemberUsername)
        return res.status(404).json({ error: 'No family members found for this patient' });
        await subscribeFamAsPatient(familyMemberUsername, packageName);     
        await patient.save();
        return res.status(201).json({ message: 'Health package subscribed successfully', patient, sessionUrl });     
      } ;
      if (paymentMethod === 'wallet') {
        if (patient.walletBalance < subscriptionCost) {
          return res.status(400).json({ error: 'Insufficient funds in the wallet' });
        }
        else {
          // Deduct the cost from the wallet balance
        patient.walletBalance -= subscriptionCost;
        familyMember.healthPackageSubscription.push({
          name: packageName,
          startdate: '',
          enddate: '',
          status: "subscribed with renewal date"   
        });
        const familyMemberUsername = familyMember.username;
        if(!familyMemberUsername)
        return res.status(404).json({ error: 'No family members found for this patient' });

        subscribeFamAsPatient(familyMemberUsername, packageName);
      }
      }
     
      

      await patient.save();

      return res.status(201).json({ message: 'Health package subscribed successfully for family member', patient });
    } else {
      return res.status(404).json({ error: 'No family members found for this patient' });
    }
  } catch (error) {
    console.error('Error subscribing to health package for family member:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const viewSubscribedPackages = async (req: Request, res: Response) => {
  interface SubscribedPackage {
    name: string;
    startdate?: string | Date;
    enddate?: string | Date;
    status: 'subscribed with renewal date' | 'unsubscribed' | 'cancelled with end date';
  }
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenDB = await tokenModel.findOne({ token });
    const username = (tokenDB && tokenDB.username);

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    const patient = await patientModel.findOne({ username });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    let subscribedPackages: SubscribedPackage[] = [];

    // Check patient's subscriptions
    if (patient.healthPackageSubscription && Array.isArray(patient.healthPackageSubscription)) {
      subscribedPackages = patient.healthPackageSubscription.filter(
        (pkg) => pkg.status === 'subscribed with renewal date'
      );
    }

    // Check family members' subscriptions
    // if (patient.familyMembers && patient.familyMembers.length > 0) {
    //   for (const familyMember of patient.familyMembers) {
    //     if (familyMember.healthPackageSubscription && Array.isArray(familyMember.healthPackageSubscription)) {
    //       const familyMemberSubscribedPackages = familyMember.healthPackageSubscription.filter(
    //         (pkg) => pkg.status === 'subscribed with renewal date'
    //       );
    //       subscribedPackages.push(...familyMemberSubscribedPackages);
    //     }
    //   }
    // }

    return res.status(200).json({ subscribedPackages });
  } catch (error) {
    console.error('Error retrieving subscribed packages:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const viewHealthPackageStatus = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenDB = await tokenModel.findOne({ token });
    const username = tokenDB && tokenDB.username;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    // Find the patient by username
    const patient = await patientModel.findOne({ username });
 
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    } 
    const familyMembersNames = patient.familyMembers.map((familyMember) => familyMember.name);
    
    
    // Create an array to store health package details for the patient and family members
    const healthPackages: { name: string; status: string; }[] = [];

    // Include the patient's health package subscriptions
    if (patient.healthPackageSubscription && patient.healthPackageSubscription.length > 0) {
      healthPackages.push(...patient.healthPackageSubscription.map(package1 => ({
       
        name: package1.name,
        status: package1.status,
      })));
    }
   
    if(familyMembersNames.length ===0 ){
      res.status(200).json({ healthPackages });
    }
    else{
          for (const familyMember of patient.familyMembers) {
       if (familyMember.healthPackageSubscription && familyMember.healthPackageSubscription.length > 0) {
  healthPackages.push(
    ...familyMember.healthPackageSubscription.map(package1 => ({
      patientName: patient.name,
      name: package1.name,
         familyMemberName:familyMember.name,
      status: package1.status,
   
    }))
  );
}

        }
      
      console.log(healthPackages);
      res.status(200).json({ healthPackages });
    }

  } catch (error) {
    console.error('Error viewing health package status:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const findHealthPackageStatusHelper = (packages: any[], packageName: string) => {
  const packageData = packages.find(package1 => package1.name.toLowerCase() === packageName.toLowerCase());
  return packageData ? packageData.status : 'Not subscribed';
};

// Helper function to find the member name associated with a health package
const findMemberNameHelper = (packages: any[], packageName: string) => {
  const packageData = packages.find(package1 => package1.name.toLowerCase() === packageName.toLowerCase());
  return packageData ? packageData.memberName : '';
};


export const cancelSubscription = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenDB = await tokenModel.findOne({ token });
    const username =  (tokenDB && tokenDB.username);
    const {packageName } = req.body;

    if (!username || !packageName) {
      return res.status(400).json({ error: 'Patient ID and package name are required' });
    }

    const patient = await patientModel.findOne({username});

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const healthPackage = await packageModel.findOne({ name: packageName });

    if (!healthPackage) {
      return res.status(404).json({ error: 'Health package not found' });
    }

    // Update the status to 'unsubscribed'
    const updateSubscriptionStatus = (subscription: any) => {
      if (subscription.name === packageName) {
        subscription.status = 'unsubscribed';
      }
    };

    // Update patient's subscription
    patient.healthPackageSubscription.forEach(updateSubscriptionStatus);

    // Update family members' subscriptions
    if (patient.familyMembers && patient.familyMembers.length > 0) {
      for (const familyMember of patient.familyMembers) {
        if (familyMember.healthPackageSubscription) {
          familyMember.healthPackageSubscription.forEach(updateSubscriptionStatus);
        }
      }
    }

    await patient.save();

    return res.status(200).json({ message: 'Health package subscription canceled successfully', patient });
  } catch (error) {
    console.error('Error canceling health package subscription:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



export const cancelSubscriptionfam2 = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenDB = await tokenModel.findOne({ token });
    const username =  (tokenDB && tokenDB.username);
    const {packageName ,familyname} = req.body;

  
    if (!packageName) {
      return res.status(400).json({ error: 'package name' });
    }
console.log(familyname);
    if (!familyname) {
      return res.status(400).json({ error: ' family name' });
    }

    const patient = await patientModel.findOne({username});

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const healthPackage = await packageModel.findOne({ name: packageName });

    if (!healthPackage) {
      return res.status(404).json({ error: 'Health package not found' });
    }

    // Update the status to 'unsubscribed'
    const updateSubscriptionStatus = (subscription: any) => {
      if (subscription.name === packageName && (subscription.status==='subscribed with renewal date')) {
        subscription.status = 'unsubscribed';
      }
    };

    // // Update patient's subscription
    // patient.healthPackageSubscription.forEach(updateSubscriptionStatus);

    // Update family members' subscriptions
    if (patient.familyMembers && patient.familyMembers.length > 0) {
      for (const familyMember of patient.familyMembers) {
        if (familyMember.healthPackageSubscription && familyMember.name === familyname ) {
          familyMember.healthPackageSubscription.forEach(updateSubscriptionStatus);
        }
      }
    }

    await patient.save();

    return res.status(200).json({ message: 'Health package subscription canceled successfully', patient });
  } catch (error) {
    console.error('Error canceling health package subscription:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



export const viewFamilyMembersAndPackages = async (req: Request, res: Response) => {
  interface FamilyMemberPackage {
    familyMemberName: string;
    package: {
      name: string;
      startdate?: string ;
      enddate?: string ;
      status: 'subscribed with renewal date' | 'unsubscribed' | 'cancelled with end date';
    };
  }

  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenDB = await tokenModel.findOne({ token });
    const username = tokenDB && tokenDB.username;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    const patient = await patientModel.findOne({ username });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    let familyMembersAndPackages: FamilyMemberPackage[] = [];

    // Check family members' subscriptions
    if (patient.familyMembers && patient.familyMembers.length > 0) {
      for (const familyMember of patient.familyMembers) {
        if (familyMember.healthPackageSubscription && Array.isArray(familyMember.healthPackageSubscription)) {
          const familyMemberSubscribedPackages = familyMember.healthPackageSubscription
            .filter(pkg => pkg.status === 'subscribed with renewal date') // Filter by status
            .map(pkg => ({
              familyMemberName: familyMember.name,
              package: pkg,
            }));
          familyMembersAndPackages.push(...familyMemberSubscribedPackages);
        }
      }
    }

    return res.status(200).json({ familyMembersAndPackages });
  } catch (error) {
    console.error('Error retrieving family members and packages:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSubscribedPackagesForMember = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenDB = await tokenModel.findOne({ token });
    const username = (tokenDB && tokenDB.username);
    const { familyMemberName } = req.query;

    const patient = await patientModel.findOne({username});

    if (!patient) {
      return res.status(404).json({ error: 'Family member not found 1' });
    }

    const familyMembers = patient.familyMembers;

    // Assuming the family member's name is known or passed in the request

    const targetFamilyMember = familyMembers.find(
      (member) => member.name === familyMemberName
    );

    if (!targetFamilyMember) {
      return res.status(404).json({ error: 'Family member not found 2' });
    }

    const subscribedPackages = targetFamilyMember.healthPackageSubscription.filter(
      (pck) => pck.status === 'subscribed with renewal date'
    );

    return res.status(200).json({ subscribedPackages });
  } catch (error) {
    console.error('Error fetching subscribed packages:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

async function calcTotal(feesPerYear: number, username: string) {
  try {
    const patient = await patientModel.findOne({ username });
    if (!patient) {
      throw new Error('Patient not found');
    }

    if (patient.healthPackageSubscription.length === 0) {
      console.log('Patient has no health packages subscribed');
      return feesPerYear; // or any default value you want to return when no health packages are subscribed
    }

    const firstSubscription = patient.healthPackageSubscription[0];
    const packageName = firstSubscription.name;

    const healthPackage = await packageModel.findOne({ name: packageName });
    if (!healthPackage) {
      throw new Error('Health package not found');
    }

    const discount =  feesPerYear- healthPackage.familysubscribtionDiscount*0.01*feesPerYear;

    console.log('Discount:', discount);
    // Perform further calculations or operations with the discount value

    return discount;
  } catch (error) {
    console.error('Error calculating health discount:', error);
    throw error;
  }
}


export const creditPayment = async (req: Request, res: Response , sessionPrice : any) => {
  try {
  
    const session = await stripe.checkout.sessions.create({
      
      payment_method_types: ["card"],
      mode: "payment",
     
      line_items: [
        {
          price_data: {
            currency: "EGP",
            product_data: {
              name: "healt package subscribtion",
            },
            unit_amount: sessionPrice*100,
          },
          quantity: 1,
        
    }],
      success_url: `http://localhost:3000`,
      cancel_url: `http://localhost:3000/login`,
    },
    );
    return   session.url ;
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};