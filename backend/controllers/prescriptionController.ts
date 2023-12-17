import { Request, Response } from 'express';
import Prescription from '../models/perscriptionModel'; // Import Medicine type if you have it
import Doctor from '../models/doctorModel';
import Patient from '../models/patientModel';
import tokenModel from '../models/tokenModel';
import doctorModel from '../models/doctorModel';
import axios from 'axios';
import mongoose from 'mongoose';


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
        console.log("zeft")
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




  
export const deleteMedicineFromPresc = async (req: Request, res: Response) => {
  try {
    const prescriptionId = req.query.prescriptionId; // Consider using req.params if using route parameters
    const { medicineName } = req.body; // Extract medicineName from req.body

    // Ensure that medicineName is provided
    if (!medicineName) {
      return res.status(400).send({ message: 'Medicine name is required.' });
    }

    const updatedPrescription = await Prescription.findByIdAndUpdate(
      prescriptionId,
      { $pull: { Medicines: { medicineName } } }, // Assumes medicineName is a direct field
      { new: true }
    );

    if (!updatedPrescription) {
      return res.status(404).send({ message: 'Prescription not found or medicine not in prescription.' });
    }

    res.status(200).send({ message: 'Medicine removed from prescription successfully.', updatedPrescription });
  } catch (error) {
    res.status(500).send({ message: 'Error removing medicine from prescription', error });
  }
};


export const addMedtoPresc = async (req: Request, res: Response) => {
  try {
    const prescriptionId = req.params.prescriptionId;
    const { medicineName, quantity, dosage } = req.body;

    // Find the prescription and check if the medicine already exists
    const prescription = await Prescription.findById(prescriptionId);
    if (!prescription) {
      return res.status(404).send({ message: 'Prescription not found.' });
    }

    const existingMedicineIndex = prescription.Medicines.findIndex(med => med.medicineName === medicineName);

    let updatedPrescription;

    if (existingMedicineIndex !== -1) {
      // Medicine exists, increment the quantity
      const incrementQuantity = { [`Medicines.${existingMedicineIndex}.quantity`]: quantity };
      updatedPrescription = await Prescription.findByIdAndUpdate(
        prescriptionId,
        { $inc: incrementQuantity },
        { new: true }
      );
    } else {
      // Medicine does not exist, add as a new entry
      updatedPrescription = await Prescription.findByIdAndUpdate(
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
    }

    res.status(200).send({ message: 'Medicine added to prescription successfully.', updatedPrescription });
  } catch (error) {
    res.status(500).send({ message: 'Error adding medicine to prescription', error });
  }
};
export const viewMedicineNamesInPrescription = async (req: Request, res: Response) => {
  try {
    // Extracting prescriptionId from query parameters
    const prescriptionId = req.query.prescriptionId as string;

    if (!prescriptionId) {
      return res.status(400).send({ message: 'Prescription ID is required.' });
    }

    // Find the prescription by ID and select only the Medicines array
    const prescription = await Prescription.findById(prescriptionId).select('Medicines');

    if (!prescription) {
      return res.status(404).send({ message: 'Prescription not found.' });
    }

    // Extract medicineName, dosage, and quantity from each item in the Medicines array
    const medicines = prescription.Medicines.map(medicine => ({
      medicineName: medicine.medicineName,
      dosage: medicine.dosage,
      quantity: medicine.quantity
    }));
    
    // Send the list of medicines (including name, dosage, and quantity) as a response
    res.status(200).send({ medicines });
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving medicines from prescription', error });
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
      .select('id doctorUsername date status Medicines');

    // Filter out prescriptions with empty medicine arrays
    const validPrescriptions = prescriptions.filter((prescription) => prescription.Medicines.length > 0);

    // Construct response with full prescription details
    const prescriptionDetails = validPrescriptions.map((prescription) => ({
      doctorName: prescription.doctorUsername, // Replace with just 'doctorUsername' if it's not a reference
      date: prescription.date,
      status: prescription.status,
      medicines: prescription.Medicines,
      _id: prescription._id,
    }));

    // Respond with the detailed prescriptions
    res.json(prescriptionDetails);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch prescriptions for the patient' });
  }
};

export const getPrescriptionDetails = async (req: Request, res: Response) => {
  try {
    const { prescriptionId } = req.query;

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
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Find all prescriptions for the doctor
    const prescriptions = await Prescription.find({ doctorUsername: username })
      .populate('patientUsername', 'name') // Populate doctor's name if 'doctorUsername' is a reference
      .select('patientUsername date status Medicines');

    // Filter out prescriptions with empty medicine arrays
    const validPrescriptions = prescriptions.filter((prescription) => prescription.Medicines.length > 0);

    // Construct response with full prescription details
    const prescriptionDetails = validPrescriptions.map((prescription) => ({
      PatientName: prescription.patientUsername, // Replace with just 'doctorUsername' if it's not a reference
      date: prescription.date,
      status: prescription.status,
      medicines: prescription.Medicines,
      _id: prescription._id,
    }));

    // Respond with the detailed prescriptions
    res.json(prescriptionDetails);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch prescriptions for the doctor' });
  }
};

  
  
  
  export const addMedicineToPrescription = async (req: Request, res: Response) => {
    try {
  
      const { prescriptionId,  } = req.query;
        const { dosage, medicine,medicineName } = req.body;
    
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

  
  export const checkifexists = async (req: Request, res: Response) => {
    try {
      const username=req.body.patientUsername;
      // Check if the username is present
      if (!username) {
        return res.status(401).json({ error: 'Invalid username' });
      }
  
      // Assuming you want to check if a medicine with a specific name exists
      const medicineName = req.body.medName;
      console.log(medicineName)
      // Check if the medicine exists in the prescriptions for the user
      const medicineExists = await Prescription.findOne({
        patientUsername: username,
        'Medicines.medicineName': medicineName,
      });
  console.log("ana hena");
      res.json({ exists: !!medicineExists });
    } catch (error) {
      console.error('Error checking if medicine exists:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  





export const addPrescriptionToCart = async (req: Request, res: Response) => {
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

    const medicineInfoArray = [];
    const { prescriptionId } = req.body;

    // Find the prescription by ID
    const prescription = await Prescription.findById(prescriptionId);
    if (!prescription) {
      return res.status(404).json({ error: 'Prescription not found' });
    }

    for (const medicine of prescription.Medicines) {
      const { medicineName, dosage, quantity } = medicine;

      try {
        // Get medicine ID
        const idResponse = await axios.post('http://localhost:3000/api/medicines/getId', { medicineName });
        const medicineId = idResponse.data.medicineId;

        // Get medicine price
        const priceResponse = await axios.post('http://localhost:3000/api/medicines/getPrice', { medicineName });
        const medicinePrice = Number(priceResponse.data.medicinePrice);

        const cartItem = { medicineId, quantity, medicineName, medicinePrice, prescriptionId };

        // Add medicine information to the array
        medicineInfoArray.push(cartItem);

        // Add the item to the cart
        await axios.post('http://localhost:3000/api/cart/addToCart', cartItem, { headers: { Authorization: `Bearer ${token}` } });
      } catch (error : any) {
        console.error('Error adding medicine to cart:', error);
        return res.status(500).json({ error: `Error adding medicine to cart: ${error.message}` });
      }
    }

    await prescription.save();

    // Respond with the accumulated medicine information
    return res.status(200).json({
      message: 'Prescription added to cart successfully',
      medicines: medicineInfoArray,
    });
  } catch (error : any) {
    console.error('Error adding prescription to cart:', error);
    return res.status(500).json({ error: `Error adding prescription to cart: ${error.message}` });
  }
};




export const updateMedicineInPrescription = async (req: Request, res: Response) => {
  try {
    const prescriptionId = req.params.id;
console.log("ana hena")
    // Check for valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(prescriptionId)) {
      return res.status(400).send({ message: 'Invalid prescription ID.' });
    }

    const { medicineName, quantity, dosage } = req.body;

    // Find the prescription
    const prescription = await Prescription.findById(prescriptionId);

    if (!prescription) {
      return res.status(404).send({ message: 'Prescription not found.' });
    }

    // Find the index of the medicine to update in the Medicines array
    const medicineIndex = prescription.Medicines.findIndex((med) => med.medicineName === medicineName);

    if (medicineIndex === -1) {
      return res.status(404).send({ message: 'Medicine not found in the prescription.' });
    }

    // Update the medicine details
    prescription.Medicines[medicineIndex].quantity = quantity;
    prescription.Medicines[medicineIndex].dosage = dosage;

    // Save the updated prescription
    const updatedPrescription = await prescription.save();
    res.status(200).send({ message: 'Medicine details updated successfully.', updatedPrescription });
  } catch (error: any) {
    console.error('Error updating medicine details in prescription:', error);
    res.status(500).send({ message: 'Internal server error.', error: error.message });
  }
};




  export const changeStatus = async (req: Request, res: Response) => {
    try {
      const { prescriptionId } = req.body;
  
      // Check if the prescription ID is provided
      if (!prescriptionId) {
        return res.status(400).json({ error: 'Prescription ID is required.' });
      }
  
      // Find the prescription by ID
      const prescription = await Prescription.findById(prescriptionId);
  
      // Check if the prescription exists
      if (!prescription) {
        return res.status(404).json({ error: 'Prescription not found.' });
      }
  
      // Update the prescription status
       if(prescription.status=="unfilled"){
        prescription.status="filled";
       }
      // Save the updated prescription
      await prescription.save();
  
      // Respond with the updated prescription
      res.json({ message: 'Prescription status updated successfully.', prescription });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
 
  
  
  

  export const deleteMedPresc = async (req: Request, res: Response) => {
    try {
      const { prescriptionId } = req.params;
      const { medicineId } = req.body;
  
      // Ensure that medicineId is provided
      if (!medicineId) {
        return res.status(400).send({ message: 'Medicine ID is required.' });
      }
  
      const updatedPrescription = await Prescription.findByIdAndUpdate(
        prescriptionId,
        { $pull: { Medicines: { _id: medicineId } } }, // Remove the specific medicine by its _id
        { new: true }
      );
  
      if (!updatedPrescription) {
        return res.status(404).send({ message: 'Prescription not found or medicine not in prescription.' });
      }
  
      res.status(200).send({ message: 'Medicine removed from prescription successfully.', updatedPrescription });
    } catch (error) {
      res.status(500).send({ message: 'Error removing medicine from prescription', error });
    }
  };
  
  // Backend: Update medicine quantity and dosage if status is unfilled
 // Update prescription medicines
 export const updatePrescriptionMed = async (req: Request, res: Response) => {
  try {
    const { prescriptionId } = req.params;
    const { medicineId, quantity, dosage } = req.body;

    // Ensure that medicineId is provided
    if (!medicineId) {
      return res.status(400).send({ message: 'Medicine ID is required.' });
    }

    const updatedPrescription = await Prescription.findOneAndUpdate(
      { _id: prescriptionId, 'Medicines._id': medicineId },
      { $set: { 'Medicines.$.quantity': quantity, 'Medicines.$.dosage': dosage } },
      { new: true }
    );

    if (!updatedPrescription) {
      return res.status(404).send({ message: 'Prescription not found or medicine not in prescription.' });
    }

    res.status(200).json({ message: 'Medicine updated in prescription successfully.', updatedPrescription });
  } catch (error) {
    res.status(500).json({ message: 'Error updating medicine in prescription', error });
  }
};

