import { Request, Response } from "express";
import AppointmentModel from "../models/appointmentModel";

export const getAppointmentByDate = async (req: Request, res: Response) => {
    const patientUsername = req.query.patientUsername;
    const date = req.query.date;
    const appoinments = await AppointmentModel.find({ patient: patientUsername, date: date}).exec();
    res.status(200).json(appoinments);
};

export const getAppointmentByStatus = async (req: Request, res: Response) => {
    const patientUsername = req.query.patientUsername;
    const status = req.query.status;
    const appoinments = await AppointmentModel.find({ patient: patientUsername, status: status}).exec();
    res.status(200).json(appoinments);
};