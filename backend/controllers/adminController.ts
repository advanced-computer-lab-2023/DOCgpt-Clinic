import {Request,Response,Router} from 'express';
import adminModel from '../models/adminModel';
import doctorModel from '../models/doctorModel';
import patientModel from '../models/patientModel';
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
    

   export const viewDoctorInfo = async (req: Request, res: Response): Promise<void> => {
   try {
      const { username } = req.body;

      // Find the doctor by username
      const doctor = await doctorModel.findOne({ username });

      if (!doctor) {
          res.status(404).json({ message: 'Doctor not found' });
      }

      res.json({ doctor });
   } catch (error) {
      // Handle any errors here
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
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



    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    