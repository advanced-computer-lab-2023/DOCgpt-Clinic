import { Request, Response } from "express";
import HealthRecordModel from "../models/healthRecordModel";
import multer from 'multer'; // For handling file uploads

// Multer configuration to handle file uploads
const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
      cb(null, 'uploads/'); // Store uploaded files in the 'uploads' directory
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    },
});

const upload = multer({ storage: storage });

export const createHealthRecord = async (req: Request, res: Response) => {
    try{
        const newRecord = new HealthRecordModel({ ...req.body });

        // Save the new document to the database
        await newRecord.save();
    
        res.status(201).json({ message: 'Record created successfully', record: newRecord });
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};