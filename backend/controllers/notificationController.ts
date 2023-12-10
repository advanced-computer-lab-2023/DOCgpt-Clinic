import { Request, Response } from 'express';
import NotificationModel from '../models/notificationModel';
import PatientModel from '../models/patientModel';
import TokenModel from '../models/tokenModel';
import doctorModel from '../models/doctorModel';

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
  
      const notificationsCount = await NotificationModel.countDocuments({ patientUsername: username });
      res.json({ notificationsCount });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };