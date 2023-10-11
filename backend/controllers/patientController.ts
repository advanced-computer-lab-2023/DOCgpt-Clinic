import {Request,Response,Router} from 'express';
import patientModel from '../models/patientModel';

import { patientSchema } from '../models/patientModel';


import { Document } from 'mongodb';
import mongoose, {  Model, Schema, Types } from 'mongoose';




// Define a method to add a family member to a patient's record

// Define a method to add a family member to a patient's record
export const addFamilyMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such patient' });
    }

    // Assuming you have a route parameter for the patient's ID
    const familyMemberData = req.body; // Assuming family member data is sent in the request body

    // Find the patient by ID
    const patient: Document | null = await patientModel.findById(id);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

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
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such patient' });
    }

    // Find the patient by ID
    const patient: Document | null = await patientModel.findById(id);

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

  