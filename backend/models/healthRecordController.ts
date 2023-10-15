import { Request, Response } from "express";
import HealthRecordModel from "../models/healthRecordModel";

export const createHealthRecord = async (req: Request, res: Response) => {
    const patientId = req.body.patientId;
    const MedicalHistory = req.body.MedicalHistory;
    const MedicationList = req.body.MedicationList;
    const VitalSigns = req.body.VitalSigns;

    const healthRecord = await HealthRecordModel.create({
        patientId: patientId,
        MedicalHistory: MedicalHistory,
        MedicationList: MedicationList,
        VitalSigns: VitalSigns
    });
    res.status(200).json(healthRecord);
};