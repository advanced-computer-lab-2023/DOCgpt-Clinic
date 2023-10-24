import {Request,Response,Router} from 'express';
import adminModel from '../models/adminModel';
import doctorModel from '../models/doctorModel';
import patientModel from '../models/patientModel';
import packageModel  from '../models/packageModel'; // Import your package model

import mongoose from 'mongoose'

export const addAdmin = async (req:Request,res: Response) => 
{
    try{
        const {username ,password} = req.body
        const admin = await adminModel.create({username, password});
        res.status(200).json(admin);
    }
    catch(error)
    {
        const err = error as Error;
        res.status(400).json({error:err.message});

    }};

    export const addfafAdmin = async (req:Request,res: Response) => 
{
    try{
        const {username ,password} = req.body
        const admin = await adminModel.create({username, password});
        res.status(200).json(admin);
    }
    catch(error)
    {
        const err = error as Error;
        res.status(400).json({error:err.message});

    }};


    //delete admin
    export const deleteAdminByUsername = async (req: Request, res: Response) => {
        try {
          const { username } = req.body;
      
          // Find and delete the admin by username
          const deletedAdmin = await adminModel.findOneAndDelete({ username });
      
          if (!deletedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
          }
      
          res.status(200).json({ message: 'Admin deleted successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal server error' });
        }
      };

          


           



      //delete Doctor
    export const deleteDoctorByUsername = async (req: Request, res: Response) => {
        try {
          const { username } = req.body;
      
          // Find and delete the Doctor by username
          const deletedDoctor = await doctorModel.findOneAndDelete({ username });
      
          if (!deletedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
          }
      
          res.status(200).json({ message: 'Doctor deleted successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal server error' });
        }
      };
      
      //delete Patient
    
      export const deletePatientByUsername = async (req: Request, res: Response) => {
        try {
          const { username } = req.body;
      
          // Find and delete the Doctor by username
          const deletedPatient = await patientModel.findOneAndDelete({ username });
      
          if (!deletedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
          }
      
          res.status(200).json({ message: 'Patient deleted successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal server error' });
        }
      };
    
    
    // view doctor Info
    export const deletePatientByrota = async (req: Request, res: Response) => {
      try {
        const { username } = req.body;
    
        // Find and delete the Doctor by username
        const deletedPatient = await patientModel.findOneAndDelete({ username });
    
        if (!deletedPatient) {
          return res.status(404).json({ message: 'Patient not found' });
        }
    
        res.status(200).json({ message: 'Patient deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    };
    export const deletePatientBySmsomaa = async (req: Request, res: Response) => {
      try {
        const { username } = req.body;
    
        // Find and delete the Doctor by username
        const deletedPatient = await patientModel.findOneAndDelete({ username });
    
        if (!deletedPatient) {
          return res.status(404).json({ message: 'Patient not found' });
        }
    
        res.status(200).json({ message: 'Patient deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    };
    export const viewDoctorInfo = async (req: Request, res: Response): Promise<void> => {
      try {
        const { username } = req.query;
    
        if (!username) {
          res.status(400).json({ message: 'Username is required' });
          return;
        }
    
        // Find the doctor by username
        const doctor = await doctorModel.findOne({ username });
    
        if (!doctor) {
          res.status(404).json({ message: 'Doctor not found' });
        } else {
          res.status(200).json({ doctor });
        }
      } catch (error) {
        // Handle any errors here
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };
    
    





// add a package

export const addPackage = async (req: Request, res: Response) => {
  try {
    const { name, feesPerYear, doctorDiscount, medicineDiscount, familysubscribtionDiscount } = req.body;

    // Ensure all required fields are provided and validated here
    if (!name || !feesPerYear || !doctorDiscount || !medicineDiscount || !familysubscribtionDiscount) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newPackage = await packageModel.create({
      name,
      feesPerYear,
      doctorDiscount,
      medicineDiscount,
      familysubscribtionDiscount,
    });

    await newPackage.save();

    return res.status(201).json({ message: 'Package added successfully', package: newPackage });
  } catch (error) {
    console.error('Error adding package:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};






//delete package

export const deletePackageByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    // Find and delete the admin by username
    const deletedPackage = await packageModel.findOneAndDelete({ name });

    if (!deletedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    res.status(200).json({ message: 'Package deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// update Package

export const updatePackage = async (req: Request, res: Response) => {
  
  const { name,newname, feesPerYear, doctorDiscount, PackageDiscount, familysubscribtionDiscount } = req.body;

  try {
    // Find the Package by its name and update it
    const updatedPackage = await packageModel.findOneAndUpdate({ name: name }, req.body, { new: true });


    // Check if the Package exists
    if (!updatedPackage) {
      return res.status(404).json({ error: 'Package not found' });
    }

    // Return the updated Package
    res.status(200).json(updatedPackage);
  } catch (error) {
    console.error('Error updating Package:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

















   
   
  
   
      export const getAdmins = async (req: Request, res: Response): Promise<void> => {
   try {
      // Retrieve all users from the database
      const admins = await adminModel.find();
      res.json({ admins });
   } catch (error) {
      // Handle any errors here
      res.status(500).json({ error: 'Internal Server Error' });
   }
}

//get patients
export const getPatients = async (req: Request, res: Response): Promise<void> => {
  try {
     // Retrieve all users from the database
     const patients = await patientModel.find();
     res.json({ patients });
  } catch (error) {
     // Handle any errors here
     res.status(500).json({ error: 'Internal Server Error' });
  }
}








//getdoctors

export const getdoctorsR = async (req: Request, res: Response): Promise<void> => {
  try {
     // Retrieve all users from the database
     const doctors = await doctorModel.find();
     res.json({ doctors });
  } catch (error) {
     // Handle any errors here
     res.status(500).json({ error: 'Internal Server Error' });
  }
}


export const getPackage = async (req: Request, res: Response): Promise<void> => {
  try {
     // Retrieve all users from the database
     const packages = await packageModel.find();
     res.json({ packages });
  } catch (error) {
     // Handle any errors here
     res.status(500).json({ error: 'Internal Server Error' });
  }
}



export const getPackageNAME = async (req: Request, res: Response): Promise<void> => {
  try {
    // Retrieve all packages from the database
    const packages = await packageModel.find({}, 'name'); // Retrieve only the 'name' field
    const packageNames = packages.map((pkg) => pkg.name);
    res.json({ packageNames });
 } catch (error) {
    // Handle any errors here
    res.status(500).json({ error: 'Internal Server Error' });
 }}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    