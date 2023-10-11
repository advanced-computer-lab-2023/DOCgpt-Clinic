import { Request, Response } from 'express';
import doctorModel from '../models/doctorModel';
import mongoose from 'mongoose';


// export const createdoctor= async (req: Request, res: Response) => {
//     try {
//       const { username,name,email,password,dateofbirth,hourlyrate,affiliation, educationalBackground } = req.body;
//       const doctor = await doctorModel.create({ username,name,email,password,dateofbirth,hourlyrate,affiliation, educationalBackground});
//       res.status(200).json(doctor);
//     } catch (error) {
//       const err = error as Error;
//       res.status(400).json({ error: err.message });
//     }
//   };




export const createdoctor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, name, email, password, dateOfBirth, hourlyRate, affiliation, speciality, educationalBackground } = req.body;

    const newDoctor = new doctorModel({
      username,
      name,
      email,
      password,
      dateOfBirth,
      hourlyRate,
      affiliation,
      speciality,
      educationalBackground,
    });

    const doctor = await newDoctor.save();
    res.status(200).json(doctor);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
};