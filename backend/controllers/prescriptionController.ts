import { Request, Response } from 'express';
import Prescription from '../models/perscriptionModel';
import Doctor from '../models/doctorModel';
import Patient from '../models/patientModel';

// Create a new prescription
export const createPrescription = async (req: Request, res: Response) => {
    try {
      const { doctorUsername, patientUsername, filled } = req.body;
        console.log("hi am herre");
      // Check if the doctor exists
      const doctor = await Doctor.findOne({ username: doctorUsername });
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
      }
  
      // Check if the patient exists
      const patient = await Patient.findOne({ username: patientUsername });
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
  
      const prescription  = new Prescription({
        doctorUsername,
        patientUsername,
        filled,
      });
  
      const savedPrescription = await prescription.save();
      res.json(savedPrescription);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create prescription' });
    }
  };

// Get all prescriptions
export const getAllPrescriptions = async (req: Request, res: Response) => {
  try {
    const prescriptions = await Prescription.find();
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch prescriptions' });
  }
};

// Update a prescription
export const updatePrescription = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { filled } = req.body;

    const updatedPrescription = await Prescription.findByIdAndUpdate(
      id,
      { filled },
      { new: true }
    );

    if (!updatedPrescription) {
      return res.status(404).json({ error: 'Prescription not found' });
    }

    res.json(updatedPrescription);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update prescription' });
  }
};


// Get patients prescription by patient's username
export const getpatientsPrescription = async (req: Request, res: Response) => {
    console.log("im hererrrr");

    try {
        console.log("im hererrrr");

      const { username } = req.params;
  
      const patient = await Patient.findOne({ username });
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
  
      const prescription = await Prescription.find({ patientUsername: username });
      if (!prescription) {
        return res.status(404).json({ error: 'Prescription not found' });
      }
  
      res.json(prescription);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch prescription' });
    }
  };