import { Request, Response } from "express";
import HealthRecordModel from "../models/healthRecordModel";

export const createHealthRecord = async (req: Request, res: Response) => {
    const patient = req.body.patient;
    const MedicalHistory = req.body.MedicalHistory;
    const MedicationList = req.body.MedicationList;
    const VitalSigns = req.body.VitalSigns;

    const healthRecord = await HealthRecordModel.create({
        patient: patient,
        MedicalHistory: MedicalHistory,
        MedicationList: MedicationList,
        VitalSigns: VitalSigns
    });
    res.status(200).json(healthRecord);
};