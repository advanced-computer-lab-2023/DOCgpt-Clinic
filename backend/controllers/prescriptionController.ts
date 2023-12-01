import { Request, Response } from 'express';
import Prescription from '../models/perscriptionModel';
import Doctor from '../models/doctorModel';
import Patient from '../models/patientModel';
import tokenModel from '../models/tokenModel';
import doctorModel from '../models/doctorModel';

// Create a new prescription
export const createPrescription = async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      const tokenDB = await tokenModel.findOne({ token });
      const doctorUsername = tokenDB && tokenDB.username;



      const {  patientUsername} = req.body;
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
        patientUsername
      });
  
      const savedPrescription = await prescription.save();
      res.json(savedPrescription);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create prescription' });
    }
  };
// Adjust the path accordingly

export const addMedtoPresc = async (req: Request, res: Response) => {
  try {
    const prescriptionId = req.params.prescriptionId;

    const { medicineName, quantity,dosage } = req.body; // Additional details from the request body
 console.log(medicineName);
 console.log(dosage);
 console.log(quantity);
    // Find the prescription and update it
    const updatedPrescription = await Prescription.findByIdAndUpdate(
      prescriptionId,
      {
        $push: {
          Medicines: {
            medicineName,
            dosage,
            quantity,
          },
        },
      },
      { new: true }
    );
console.log("ana henaaaaaa");
    // Send success response
    res.status(200).send({ message: 'Medicine added to prescription successfully.', updatedPrescription });
  } catch (error) {
    // Handle errors
    res.status(500).send({ message: 'Error adding medicine to prescription', error });
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
    const { status } = req.body;

    const updatedPrescription = await Prescription.findByIdAndUpdate(
      id,
      { status },
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
// Get all prescriptions for a specific patient by patient's username
export const getAllPrescriptionsPatient = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenDB = await tokenModel.findOne({ token });
    const username = tokenDB && tokenDB.username;

      // Check if the patient exists
      const patient = await Patient.findOne({ username });
      if (!patient) {
          return res.status(404).json({ error: 'Patient not found' });
      }

      // Find all prescriptions for the patient
      const prescriptions = await Prescription.find({ patientUsername: username })
          .populate('doctorUsername', 'name') // Populate doctor's name if 'doctorUsername' is a reference
          .select('doctorUsername date status Medicines');

      // Construct response with full prescription details
      const prescriptionDetails = prescriptions.map(prescription => ({
          doctorName: prescription.doctorUsername, // Replace with just 'doctorUsername' if it's not a reference
          date: prescription.date,
          status: prescription.status,
          medicines: prescription.Medicines
      }));

      // Respond with the detailed prescriptions
      res.json(prescriptionDetails);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch prescriptions for the patient' });
  }
};
export const getPrescriptionDetails = async (req: Request, res: Response) => {
  try {
    const { prescriptionId } = req.body;

    if (!prescriptionId) {
      return res.status(400).json({ error: 'Prescription ID is required' });
    }

    const prescription = await Prescription.findById(prescriptionId);

    if (!prescription) {
      return res.status(404).json({ error: 'Prescription not found' });
    }

    return res.status(200).json({ prescription });
  } catch (error) {
    console.error('Error getting prescription details:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
  export const getAllPrescriptionsDoctor = async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      const tokenDB = await tokenModel.findOne({ token });
      const username = tokenDB && tokenDB.username;
  
        // Check if the patient exists
        const doctor = await doctorModel.findOne({ username });
        if (!doctor) {
            return res.status(404).json({ error: 'Patient not found' });
        }
  
        // Find all prescriptions for the patient
        const prescriptions = await Prescription.find({ doctorUsername: username })
            .populate('patientUsername', 'name') // Populate doctor's name if 'doctorUsername' is a reference
            .select('patientUsername date status Medicines');
  
        // Construct response with full prescription details
        const prescriptionDetails = prescriptions.map(prescription => ({
            PatientName: prescription.patientUsername, // Replace with just 'doctorUsername' if it's not a reference
            date: prescription.date,
            status: prescription.status,
            medicines: prescription.Medicines
        }));
  
        // Respond with the detailed prescriptions
        res.json(prescriptionDetails);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch prescriptions for the patient' });
    }
  };
  
  
  
  export const addMedicineToPrescription = async (req: Request, res: Response) => {
    try {
  
      const { prescriptionId,  } = req.query;
        const { dosage, medicine,medicineName } = req.body;
  
        // Validate the incoming data as necessary
  
        const updatedPrescription = await Prescription.findByIdAndUpdate(
            prescriptionId,
            { $push: { Medicines: medicine } },
            { new: true, runValidators: true } // Options to return the updated document and run schema validators
        );
  
        if (!updatedPrescription) {
            return res.status(404).send({ message: 'Prescription not found' });
        }
  
        res.status(200).send({ message: 'Medicine added successfully', updatedPrescription });
    } catch (error) {
        res.status(500).send({ message: 'Error adding medicine to prescription', error });
    }
  };