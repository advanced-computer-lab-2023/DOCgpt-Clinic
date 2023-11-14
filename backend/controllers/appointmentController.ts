import { Request, Response } from "express";
import AppointmentModel from "../models/appointmentModel";
import DoctorModel from '../models/doctorModel'; // Import your Doctor model
import tokenModel from "../models/tokenModel";
import patientModel from "../models/patientModel";



export const createAppointment = async (req: Request, res: Response) => {
    const doctorUsername = req.body.doctor;
    const date = req.body.date;
    const status = "upcoming";
    const type = 'new appointment';
    const price =req.body.price;
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const tokenDB = await tokenModel.findOne({ token:token }); 
        var username;
        if(tokenDB){
        username=tokenDB.username;
        }
        else {
          return res.status(404).json({ error: 'username not found' });
        }
        const patient= await patientModel.findOne({ username });
        
        if (!patient) {
          return res.status(404).json({ error: 'Patient not found' });
        }
        // Find the doctor by ID
        const doctor = await DoctorModel.findOne({username: doctorUsername}).exec();

        if (doctor) {
            // Remove the time slot from the doctor's timeslots
            console.log('Before removing timeslot:', doctor.timeslots);
            const newDate = new Date(date);
            doctor.timeslots = doctor.timeslots.filter((timeslot: { date: { getTime: () => number; }; }) => timeslot.date.getTime() !== newDate.getTime());
            
            console.log('After removing timeslot:', doctor.timeslots);
            
            // Save the updated doctor
            await doctor.save();

            // Create the appointment
            const appointment = await AppointmentModel.create({
                status: status,
                doctor: doctorUsername,
                patient: patient,
                date: new Date(date), // Convert date to Date object
                type: type,
                price : price
            });

            return res.status(201).json(appointment);
        } else {
            return res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error });
    }
};

// export const createAppointment = async (req: Request, res: Response) => {
//     const doctorUsername = req.body.doctor;
//     const patientUsername = req.body.patient;
//     const date = req.body.date;
//     const status = req.body.status;

//     try {
//         // Find the doctor by username
//         const doctor: IDoctor | null = await DoctorModel.findOne({ username: doctorUsername }).exec();

//         if (doctor) {
//             // Remove the time slot from the doctor's timeslots
//             console.log('Before removing timeslot:', doctor.timeslots);
//             const newDate = new Date(date);
//             doctor.timeslots = doctor.timeslots.filter((timeslot) => timeslot.date.getTime() !== newDate.getTime());
            
            

//             console.log('After removing timeslot:', doctor.timeslots);
            
//             // Save the updated doctor
//             await doctor.save();

//             // Create the appointment
//             const appointment = await AppointmentModel.create({
//                 status: status,
//                 doctor: doctorUsername,
//                 patient: patientUsername,
//                 date: new Date(date), // Convert date to Date object
//             });

//             return res.status(201).json(appointment);
//         } else {
//             return res.status(404).json({ message: 'Doctor not found' });
//         }
//     } catch (error) {
//         return res.status(500).json({ message: 'An error occurred', error });
//     }
// };

export const getAppointments = async (req: Request, res: Response) => { 
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenDB = await tokenModel.findOne({ token });
    console.log(token);
    
    const doctorUsername=tokenDB?.username;
    const appoinments = await AppointmentModel.find({doctor: doctorUsername}).exec();
    res.status(200).json(appoinments);
}

export const getAllAppointments = async (req: Request, res: Response) =>{
    const appoinments = await AppointmentModel.find().exec();
    res.json(appoinments);
}

export const getPapp = async (req: Request, res: Response) => { 
    const username = req.query.username;
    const appoinments = await AppointmentModel.find({patient: username}).exec();
    res.status(200).json(appoinments);
}

export const localVariables = async (req: Request, res: Response, next: () => void) => {
    req.app.locals = {
        OTP : null,
        resetSession : false
    }
    next()
}


export const complete = async(req: Request, res: Response) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenDB = await tokenModel.findOne({ token });
    console.log(token);
    const doctorUsername=tokenDB?.username;
    const status = req.body.status;
    const date = req.body.date;
    const patient = req.body.patient;

    const result = await AppointmentModel.updateOne(
        {
            patient: patient,
            status: status,
            date: date,
            doctor: doctorUsername,
            },
        { $set: { status: 'completed' } }
    );
}