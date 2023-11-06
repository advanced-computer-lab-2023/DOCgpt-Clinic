import { NextFunction, Request, Response, Router } from 'express';
import Patientmodel from '../models/patientModel';
import packageModel from '../models/packageModel'; 
import appointmentModel from '../models/appointmentModel';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// create a new workout
export const createPatient = async (req: Request, res: Response) => {
    console.log('Request reached controller')

  try {
    const { username,name,email,password,dateofbirth,mobilenumber,emergencyContact, healthPackageSubscription } = req.body;
    const emailExists=await Patientmodel.findOne({email}) ;
    const emailExists2=await doctorModel.findOne({email})
    const emailExists3=await adminModel.findOne({email})
    const usernameExists=await Patientmodel.findOne({username});
    const usernameExists2=await doctorModel.findOne({username});
    const usernameExists3=await adminModel.findOne({username});
    if(emailExists){
    
      return res.status(401).json({ message: 'email exists' });
    
    }
    if(emailExists2){
      return res.status(401).json({ message: 'email exists' });
    }
    if(emailExists3){
      return res.status(401).json({ message: 'email exists' });
    }
    if(usernameExists){
      return res.status(401).json({ message: 'username exists' });
    }
    if(usernameExists2){
      return res.status(401).json({ message: 'username exists' });
    }
    if(usernameExists3){
      return res.status(401).json({ message: 'username exists' });
    }
    const salt =await bcrypt.genSalt(10)
    const hash=await bcrypt.hash(password,salt)
    if (!validatePassword(password)) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    const patient = await Patientmodel.create({ username,name,email,password:hash,dateofbirth,mobilenumber,emergencyContact, healthPackageSubscription });
console.log('Patient created!', patient)

    res.status(200).json(patient);
  } catch (error) {
    
    const err = error as Error;
console.log('Error creating patient') 

    res.status(400).json({ error: err.message });
  }
};



// get all workouts 

export const getPatients = async (req: Request, res: Response) => {
  const Patients = await Patientmodel.find({}).sort({createdAt: -1})
  res.status(200).json(Patients)

}



import Prescription from '../models/perscriptionModel';
import Patient from '../models/patientModel';
import patientModel from '../models/patientModel';
import Doctor, { IDoctor } from '../models/doctorModel';


 

export const getPrescriptionsByUser = async (req: Request, res: Response) => {
  try {
    const username= req.query.username;
    const dateString = req.query.date as string; // Assert the type as string
    
    const filled=req.query.filled;
    const doctorUsername= req.query.doctorUsername
    const filters: any = { patientUsername: username };
    
    
    if (dateString) {
      // Parse the date string into a JavaScript Date object
      const dateParts = dateString.split('_');
          if (dateParts.length === 3) {
            const year = parseInt(dateParts[0], 10);
            const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based
            const day = parseInt(dateParts[2], 10);
            const dateObject = new Date(year, month, day);
            
            // Filter appointments that match the provided date
            filters.date = dateObject;
          }
        }

    if (filled) {
      filters.filled = filled;
    }
    
    if (doctorUsername) {
      filters.doctorUsername = doctorUsername;
    }
    
    const prescriptions = await Prescription.find(filters).exec();
    res.status(200).json(prescriptions);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



export const addFamilyMember = async (req: Request, res: Response) => {
  try {
    const { username } = req.query;
    
    if (!username) {
      return res.status(404).json({ error: 'No such patient' });
    }

    // Assuming you have a route parameter for the patient's ID
    const familyMemberData = req.body; // Assuming family member data is sent in the request body
    
    // Find the patient by ID
    const patient= await patientModel.findOne({ username });
    
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
            console.log(patient);
            // Add the new family member object to the patient's record
    patient.familyMembers.push({
      name: familyMemberData.name,
      nationalId: familyMemberData.nationalId,
      age: familyMemberData.age,
      gender: familyMemberData.gender,
      relationToPatient: familyMemberData.relationToPatient,
      healthPackageSubscription:familyMemberData.healthPackageSubscription
    });
    
    await patient.save();
    
    return res.status(201).json({ message: 'Family member added successfully', patient });
  } catch (error) {
    console.error('Error adding family member:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



//view family members 

export const viewFamilyMembers = async (req: Request, res: Response) => {
  try {
    const { username } = req.query;
    
    if (!username) {
      return res.status(404).json({ error: 'user name is required' });
    }
    
    // Find the patient by ID
    const patient= await patientModel.findOne({ username });
    
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    
    // Return the family members array
    return res.status(200).json({ familyMembers: patient.familyMembers });
  } catch (error) {
    console.error('Error viewing family members:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getDoctor = async (req: Request, res: Response): Promise<void> => {
  try {
    const doctors = await Doctor.find({}, 'name speciality hourlyRate');
    const doctorsWithSessionPrice = [];

    for (const doctor of doctors) {
      //const hourlyRate = doctor.hourlyRate;
      const sessionPrice = (130 + 0.1) - 0.5;
      const doctorWithSessionPrice = { ...doctor.toObject(), sessionPrice };
      doctorsWithSessionPrice.push(doctorWithSessionPrice);
    }
    
    res.status(200).json(doctorsWithSessionPrice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const filterDoctors = async (req: Request, res: Response) => {
  const speciality = req.query.speciality;
  let doctors = [];
  const date = req.query.date;
  if(speciality){
    doctors = await Doctor.find({speciality: speciality}).exec();
  }
  else{
    doctors = await Doctor.find();
  }
  
  const resultDoctors: any[] = []; 
  for (const doctor of doctors) {
      const appointments = await appointmentModel.find({date: date, doctor: doctor.username});
      if(appointments.length === 0){
        resultDoctors.push(doctor);
      }
    }
    
    res.status(200).json(resultDoctors);
  };
  
  export const getDoctorDetails = async (req: Request, res: Response): Promise<void> => {
    try {
    const { _id } = req.query;

    const doctor = await Doctor.findById(_id);

    if (!doctor) {
      res.status(404).json({ error: 'Doctor not found' });
      return;
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving doctor details' });
  }
};

export const searchDoctors = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, speciality } = req.query as { name: string; speciality: string };

    const query: any = {};

    if (name) {
      query.name = { $regex: new RegExp(name, 'i') };
    }

    if (speciality) {
      query.speciality = { $regex: new RegExp(speciality, 'i') };
    }

    const doctors = await Doctor.find(query);
    
    if (doctors.length === 0) {
      res.status(404).json({ error: 'No doctors found' });
      return;
    }

    res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while searching for doctors' });
  }
};

export const selectDoctors = async (req: Request, res: Response): Promise<void> => {
  try {
    const { _id } = req.query;

    const doctor = await Doctor.findById(_id);

    if (!doctor) {
      res.status(404).json({ error: 'Doctor not found' });
      return;
    }

    // Handle the logic for selecting the doctor.
    // Example: Update the doctor's status or perform any other actions.

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while selecting the doctor' });
  }}


  import AppointmentModel from "../models/appointmentModel";
import healthRecordModel from '../models/healthRecordModel';
import doctorModel from '../models/doctorModel';
import tokenModel from '../models/tokenModel';
import adminModel from '../models/adminModel';

  
  export const viewHealthPackages = async (req: Request, res: Response) => {
    try {

      // Retrieve all health packages from the database
      const healthPackages = await packageModel.find();
  
      if (healthPackages.length === 0) {
        return res.status(404).json({ message: 'No health packages found' });
      }

      // Return the health packages to the patient
      res.status(200).json({ healthPackages });
    } catch (error) {
      console.error('Error fetching health packages:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  export const viewHealthPackageDetails = async (req: Request, res: Response) => {
    try {
      const packageName = req.params.name; // Assuming the package name is passed as a route parameter
      
      // Find the health package by its name
      const healthPackage = await packageModel.findOne({ name: packageName });
      
      if (!healthPackage) {
        return res.status(404).json({ message: 'Health package not found' });
      }
      
      // Return the health package details to the patient
      res.status(200).json({ healthPackage });

    }
    catch (error) {
      res.status(500).json({ message: 'An error occurred', error });
  }
  }

  export const viewDoctorAppointments = async (req: Request, res: Response) => {
    const doctorUsername = req.query.doctorUsername; // Assuming the parameter is in the route

    try {
        const doctor: IDoctor | null = await doctorModel.findOne({ username: doctorUsername }).exec();

        if (doctor) {
            // Retrieve the doctor's timeslots (available appointments)
            const doctorAppointments = doctor.timeslots; // or any other property you've defined for appointments

            res.status(200).json(doctorAppointments);
        } else {
            res.status(404).json({ message: 'Doctor not found yasara elkalbb' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
  };



  // export const viewHealthPackageDetails = async (req: Request, res: Response) => {
  //   try {
  //     const packageName = req.params.name; // Assuming the package name is passed as a route parameter
  
  //     // Find the health package by its name
  //     const healthPackage = await packageModel.findOne({ name: packageName });
  
  //     if (!healthPackage) {
  //       return res.status(404).json({ message: 'Health package not found' });
  //     }
  
  //     // Return the health package details to the patient
  //     res.status(200).json({ healthPackage });
  //   } catch (error) {
  //     console.error('Error fetching health package details:', error);
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // };
 
 
  

  // APPOINTMENTS 
  

  //VIEW ALL MY APPOINTMENTS
  export const getPatientAppointments = async (req: Request, res: Response) => {
    console.log("im in");
    try {
      const patientUsername = req.query.patientUsername; // Extract username from route parameters
      
      const dateString = req.query.date as string; // Assert the type as string
      const status = req.query.status;
      
      const filters: any = { patient: patientUsername };
  
      if (dateString) {
        // Parse the date string into a JavaScript Date object
        const dateParts = dateString.split('_');
        if (dateParts.length === 3) {
          const year = parseInt(dateParts[0], 10);
          const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based
          const day = parseInt(dateParts[2], 10);
          const dateObject = new Date(year, month, day);
          
          // Filter appointments that match the provided date
          filters.date = dateObject;
        }
      }
      
      if (status) {
        filters.status = status;
      }
      
      const appointments = await AppointmentModel.find(filters).exec();
      res.status(200).json(appointments);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  //VIEW PAST APPOINTMENTS
  export const viewPastAppointments = async (req: Request, res: Response) => {
    try{
      const patientUsername = req.query.patientUsername;
      const appointments = await AppointmentModel.find({ patient: patientUsername, status: { $in: ['cancelled', 'completed', 'rescheduled'] } });
      if(!appointments){
        return res.status(404).json({ message: 'You Have No Past Appointments Yet!'});
      }
      
      res.status(200).json({ appointments });
      
    }
    catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  //VIEW UPCOMING APPOINTMENTS
  export const viewUpcomingAppointments = async (req: Request, res: Response) => {
    try{
      const patientUsername = req.query.patientUsername;
      const appointments = await AppointmentModel.find({ patient: patientUsername, status: 'upcoming' });
      if(!appointments){
        return res.status(404).json({ message: 'You Have No Upcoming Appointments Yet!'});
      }
      
      res.status(200).json( { appointments });

    }
    catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  // FILTER APPOINTMENTS BY DATE 
  export const getAppointmentByDate = async (req: Request, res: Response) => {
    const patientUsername = req.query.patientUsername;
    const date = req.query.date;
      const appointments = await AppointmentModel.find({ patient: patientUsername, date: date}).exec();
      res.status(200).json({appointments});
  };
  
  //FILTER APPOINTMENTS BY STATUS
  export const getAppointmentByStatus = async (req: Request, res: Response) => {
      const patientUsername = req.query.patientUsername;
      const status = req.query.status;
      const appointments = await AppointmentModel.find({ patient: patientUsername, status: status}).exec();
      res.status(200).json({appointments});
  };


  //HEALTH RECORD 

  //VIEW MY HEALTH RECORD (ONE AND ONLY)
  export const viewMyHealthRecord = async (req: Request, res: Response) => {
    try{
      const patientUsername = req.query.patientUsername;
      const healthRecord = await healthRecordModel.find({ patient: patientUsername});
      if(!healthRecord){
        return res.status(404).json({ message: 'You Have No healthRecord Yet!'});
      }
      
      res.status(200).json( { healthRecord });

    }
    catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }


  function validatePassword(password: string) {
    // Minimum password length of 8 characters
    if (password.length < 8) {
      return false;
    }
  
    // Regular expression pattern to check for at least one capital letter and one number
    const pattern = /^(?=.*[A-Z])(?=.*\d)/;
  
    // Use the test method to check if the password matches the pattern
    if (!pattern.test(password)) {
      return false;
    }
  
    // All requirements are met
    return true;
  }
  export const createToken = (_id: string): string => {
    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new Error('SECRET_ACCESS_TOKEN is not defined in the environment.');
    }
    const token = jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3d' });
    return token;
  };
  export const loginPatient=async (req:Request, res:Response) => {
    try{
       const {username , password}=req.body
       if(!username || !password){
        throw Error ('all fields must be filled')
       }
       const patient=await Patientmodel.findOne({username})
       if(! patient){
        throw Error ('invalid username')
       }
       const match=await bcrypt.compare(password,patient.password)
  
       if(!match){
        throw Error('incorrect password')
       }
       const token = createToken(patient.id);
       const tokenn = await tokenModel.create({token,username,role:'patient'})
       res.status(200).json({patient,token})}
       catch(error){
        const err = error as Error;
        res.status(400).json({ error: err.message });
       }
  }

  export const logout =async (req:Request,res:Response) =>{
    try{
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
    
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error('SECRET_ACCESS_TOKEN is not defined in the environment.');
      }
    
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err: jwt.JsonWebTokenError | null, user: any) => {
        if (err) {
          return res.status(403).json({ message: 'Token is not valid' });
        }
        const tokenDB= await tokenModel.findOneAndDelete({token:token})
        res.json(tokenDB);
      });
    }
      catch(error){
        const err = error as Error;
        res.status(400).json({ error: err.message });
       }
  }
  export const changePassword = async (req: Request, res: Response) => {
    try {
      const { currentPassword, newPassword } = req.body;
  
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
  
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error('SECRET_ACCESS_TOKEN is not defined in the environment.');
      }
  
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err: jwt.JsonWebTokenError | null, user: any) => {
        if (err) {
          return res.status(403).json({ message: 'Token is not valid' });
        }
  
        const tokenDB = await tokenModel.findOne({ token });
  
        if (!tokenDB) {
          return res.status(404).json({ message: 'Token not found' });
        }
  
        const patient = await Patientmodel.findOne({ username: tokenDB.username });
  
        if (!patient) {
          return res.status(404).json({ message: 'Patient not found' });
        }
  
        const isPasswordValid = await bcrypt.compare(currentPassword, patient.password);
  
        if (!isPasswordValid) {
          return res.status(400).json({ message: 'Current password is incorrect' });
        }
  
        // Validate the new password using the validatePassword function
        if (!validatePassword(newPassword)) {
          return res.status(400).json({ message: 'Invalid new password' });
        }
  
        // Hash and update the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  
        patient.password = hashedNewPassword;
        await patient.save();
  
        return res.status(200).json({ message: 'Password changed successfully' });
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  export const verifyTokenPatient =(req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new Error('SECRET_ACCESS_TOKEN is not defined in the environment.');
    }
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err: jwt.JsonWebTokenError | null, user: any) => {
      if (err) {
        return res.status(403).json({ message: 'Token is not valid' });
      }
      const tokenDB = await tokenModel.findOne({token})
      if(tokenDB){
        if(tokenDB.role === 'patient'){
          next();
        }
        else{
          return res.status(403).json({ message: 'Token is not authorized' });
        }
      }
      else{
        return res.status(403).json({ message: 'Token is not valid 2' });
      }
     // req.user = user;
      
    });
  };
