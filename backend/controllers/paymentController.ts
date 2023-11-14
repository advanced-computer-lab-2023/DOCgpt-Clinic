
import { Request, Response } from "express";
import Doctor  from "../models/doctorModel"; // Import the Doctor model
import patientModel from "../models/patientModel";
import tokenModel from "../models/tokenModel";
import Stripe from "stripe";


export const payment = async (req: Request, res: Response) => {
  try {
    const { doctorUsername, paymentMethod  } = req.body; // Extract doctor username and payment method from the request body
       
    // // Get the patient username from the token (assuming it's already implemented)
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];
   
    // const tokenDB = await tokenModel.findOne({ token:token }); 
    
    // var username;
    // if(tokenDB){
    // username=tokenDB.username;
    // }
    // else {
    //   return res.status(404).json({ error: 'username not found' });
    // }
    
    // Find the patient by ID
    const username="mohamed";
    const patient= await patientModel.findOne({ username });
    
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    // Find the doctor and patient based on their usernames
    const doctor  = await Doctor.findOne({ username: doctorUsername });

    if (!doctor) {
      res.status(404).json({ error: "Doctor not found" });
      return;
    }

    if (!patient) {
      res.status(404).json({ error: "Patient not found" });
      return;
    }

    const sessionPrice = calculateSessionPrice(doctor.hourlyRate); // Calculate the session price based on the doctor's username

    if (paymentMethod === "wallet") {
      // Check if patient has enough balance in their wallet
      if (patient.walletBalance < sessionPrice) {
        res.status(400).json({ error: "Insufficient balance in the patient's wallet" });
        return;
      }

      // Deduct the session price from the patient's wallet balance
      patient.walletBalance -= sessionPrice;
      await patient.save();

      // Add the session price to the doctor's wallet balance
      doctor.walletBalance += sessionPrice;
      await doctor.save();

      res.json({ message: "Payment successful" });
    } else if (paymentMethod === "card") {
      payWithCredit(req,res , sessionPrice);
    } else {
      res.status(400).json({ error: "Invalid payment method" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

function calculateSessionPrice(  hourlyRate: any) {
   return  hourlyRate;
}


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);


export const payWithCredit = async (req: Request, res: Response , sessionPrice : any) => {
  try {
  
    const session = await stripe.checkout.sessions.create({
      
      payment_method_types: ["card"],
      mode: "payment",
     
      line_items: [
        {
          price_data: {
            currency: "EGP",
            product_data: {
              name: "Appoitment ",
            },
            unit_amount: 100,
          },
          quantity: 1,
        
    }],
      success_url: `http://localhost:3000/login`,
      cancel_url: `http://localhost:3000/login`,
    },
    );
    res.json({ url: session.url });
  } catch (e: any) {
    console.log(process.env.STRIPE_SECRET_KEY)
    res.status(500).json({ error: e.message });
  }
};