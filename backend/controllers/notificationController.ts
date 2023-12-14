import { Request, Response } from 'express';
import NotificationModel from '../models/notificationModel';
import PatientModel from '../models/patientModel';
import TokenModel from '../models/tokenModel';
import doctorModel from '../models/doctorModel';
import notificationtModel from '../models/notificationModel';

export const getNotificationsP = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenDB = await TokenModel.findOne({ token });

    if (!tokenDB) {
      return res.status(404).json({ error: 'User not found' });
    }

    const username = tokenDB.username;

    const patient = await PatientModel.findOne({ username });
    if (!patient) {
      return res.status(404).json({ error: 'User not found' });
    }

    const notifications = await NotificationModel.find({ patientUsername: username });

    res.json(notifications);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getNotificationsD = async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      const tokenDB = await TokenModel.findOne({ token });
  
      if (!tokenDB) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const username = tokenDB.username;
  
      const doctor = await doctorModel.findOne({ username });
      if (!doctor) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const notifications = await NotificationModel.find({ patientUsername: username });
  
      res.json(notifications);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  export const getCountP = async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      const tokenDB = await TokenModel.findOne({ token });
  
      if (!tokenDB) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const username = tokenDB.username;
  
      const patient = await PatientModel.findOne({ username });
      if (!patient) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const notificationsCount = await NotificationModel.countDocuments({ patientUsername: username ,  read : false });
      res.json({ notificationsCount });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  export const getCountD = async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      const tokenDB = await TokenModel.findOne({ token });
  
      if (!tokenDB) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const username = tokenDB.username;
  
      const doctor = await doctorModel.findOne({ username });
      if (!doctor) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const notificationsCount = await NotificationModel.countDocuments({ patientUsername: username  , read : false});
      res.json({ notificationsCount });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  export const markAsRead = async (req: Request, res: Response) => {
    try {
      const { notificationId } = req.body;
  
      // Check if the prescription ID is provided
      if (!notificationId) {
        return res.status(400).json({ error: 'notification ID is required.' });
      }
      // Find the prescription by ID
      const notification = await notificationtModel.findById(notificationId);
  
      // Check if the prescription exists
      if (!notification) {
        return res.status(404).json({ error: 'notification not found.' });
      }
  
      // Update the prescription status
       if(notification.read==false){
             notification.read=true;
       }
      // Save the updated prescription
      await notification.save();
  
      // Respond with the updated prescription
      res.json({ message: 'notification status updated successfully.', notification });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };