import { Request, Response, Router } from 'express';
import Patientmodel from '../models/patientModel';
import appointmentModel from '../models/appointmentModel';
import mongoose from 'mongoose';
// create a new workout
export const createPatient = async (req: Request, res: Response) => {
    console.log('Request reached controller')

  try {
    const { username,name,email,password,dateofbirth,mobilenumber,emergencyContact } = req.body;
    const patient = await Patientmodel.create({ username,name,email,password,dateofbirth,mobilenumber,emergencyContact });
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
import Doctor from '../models/doctorModel';


export const getpatientsPrescription = async (req: Request, res: Response) => {

  try {
    const { username } = req.query;

    const patient = await Patient.findOne({ username });
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const { date, doctorUsername, filled } = req.query;

    const filters: any = { patientUsername: username };

    if (date) {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();

      if (date === 'currentMonth') {
        filters.date = {
          $gte: new Date(currentYear, currentMonth, 1),
          $lte: currentDate,
        };
      } else if (date === 'earlier') {
        filters.date = { $lt: new Date(currentYear, currentMonth, 1) };
      }
    }

    if (doctorUsername) {
      filters.doctorUsername = doctorUsername;
    }

    if (filled === 'true' || filled === 'false') {
      filters.filled = filled === 'true';
    }
    console.log(filters);

    const prescriptions = await Prescription.find(filters);
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch prescription' });
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

  export const getAppointmentByDate = async (req: Request, res: Response) => {
      const patientUsername = req.query.patientUsername;
      const date = req.query.date;
      const appoinments = await AppointmentModel.find({ patient: patientUsername, date: date}).exec();
      res.status(200).json(appoinments);
  };
  
  export const getAppointmentByStatus = async (req: Request, res: Response) => {
      const patientUsername = req.query.patientUsername;
      const status = req.query.status;
      const appoinments = await AppointmentModel.find({ patient: patientUsername, status: status}).exec();
      res.status(200).json(appoinments);
  };