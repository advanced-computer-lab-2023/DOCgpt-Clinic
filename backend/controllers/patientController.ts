import { Request, Response, Router } from 'express';
import Patientmodel from '../models/patientModel';
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


export const getpatientsPrescription = async (req: Request, res: Response) => {

  try {
    const { username } = req.params;

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