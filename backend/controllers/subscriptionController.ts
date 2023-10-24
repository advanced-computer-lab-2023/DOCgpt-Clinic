// Import necessary modules and the patientModel
import { Request, Response } from 'express';
import patientModel from '../models/patientModel'; // Import your patient model
import packageModel from '../models/packageModel'; // Import your package model

export const subscribeToHealthPackage = async (req: Request, res: Response) => {
  try {
    const { username, packageName } = req.body; // Assuming the patient's username and the selected health package name are sent in the request body

    if (!username || !packageName) {
      return res.status(400).json({ error: 'Username and package name are required' });
    }

    // Find the patient by username
    const patient = await patientModel.findOne({ username });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Find the health package by name
    const healthPackage = await packageModel.findOne({ name: packageName });

    if (!healthPackage) {
      return res.status(404).json({ error: 'Health package not found' });
    }

    // Add the health package subscription to the patient's record
    patient.healthPackageSubscription = packageName;
    
    await patient.save();

    return res.status(201).json({ message: 'Health package subscribed successfully', patient });
  } catch (error) {
    console.error('Error subscribing to health package:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const subscribeToHealthPackageForFamily = async (req: Request, res: Response) => {
    try {
      const { username, packageName, familyMemberName } = req.body;
  
      if (!username || !packageName || !familyMemberName) {
        return res.status(400).json({ error: 'Username, package name, and family member username are required' });
      }
  
      // Find the patient by username
      const patient = await patientModel.findOne({ username });
  
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
  
      // Check if the patient has family members
      if (patient.familyMembers && patient.familyMembers.length > 0) {
        const familyMember = patient.familyMembers.find((member) => member.name === familyMemberName);
  
        if (!familyMember) {
          return res.status(404).json({ error: 'Family member not found' });
        }
  
        // Find the health package by name
        const healthPackage = await packageModel.findOne({ name: packageName });
  
        if (!healthPackage) {
          return res.status(404).json({ error: 'Health package not found' });
        }
  
        // Add the health package subscription to the family member's record
        familyMember.healthPackageSubscription = packageName;
  
        await patient.save();
  
        return res.status(201).json({ message: 'Health package subscribed successfully for family member', patient });
      } else {
        return res.status(404).json({ error: 'No family members found for this patient' });
      }
    } catch (error) {
      console.error('Error subscribing to health package for family member:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  
