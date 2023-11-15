import { Request, Response } from "express";
import AppointmentModel from "../models/appointmentModel";
import DoctorModel from '../models/doctorModel'; // Import your Doctor model
import tokenModel from "../models/tokenModel";
import patientModel from "../models/patientModel";

import Stripe from 'stripe';


require('dotenv').config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
if (!process.env.STRIPE_SECRET_KEY)
 throw new Error('process.env.STRIPE_SECRET_KEY not found');





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


export const createAppointment = async (req: Request, res: Response) => {
  const doctorUsername = req.body.doctorUsername;
  const date = req.body.date;
  const status = 'upcoming';
  const type = 'new appointment';
  const price = Number(req.body.price);

  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenDB = await tokenModel.findOne({ token });

    if (!tokenDB) {
      return res.status(404).json({ error: 'Token not found' });
    }

    const username = tokenDB.username;
    const patient = await patientModel.findOne({ username });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const doctor = await DoctorModel.findOne({ username: doctorUsername });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found app' });
    }

    const newDate = new Date(date);
    doctor.timeslots = doctor.timeslots.filter((timeslot: { date: { getTime: () => number } }) =>
      timeslot.date.getTime() !== newDate.getTime()
    );

    await doctor.save();

    const appointment = await AppointmentModel.create({
      status: status,
      doctor: doctorUsername,
      patient: username,
      date: new Date(date),
      type: type,
      price: price,
    });

    return appointment;
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred', error });
  }
};

export const paymenttt = async (req: Request, res: Response) => {
  try {
    const { doctorUsername, paymentMethod, price, date } = req.body;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenDB = await tokenModel.findOne({ token });

    if (!tokenDB) {
      return res.status(404).json({ error: 'Token not found' });
    }

    const patientUsername = tokenDB.username;
    const patient = await patientModel.findOne({ username: patientUsername });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const doctor = await DoctorModel.findOne({ username: doctorUsername });

    if (!doctor) {
      res.status(404).json({ error: 'Doctor not found pay' });
      return;
    }

    const pricee = price;

    if (paymentMethod === 'card') {
      const sessionUrl = await payWithCredit(req, res, price);

      if (!sessionUrl) {
        return res.status(500).json({ error: 'Failed to create payment session' });
      }
        console.log(doctor.walletBalance)
      doctor.walletBalance += price;
      await doctor.save();

      const app = await createAppointment(req, res);

      if (!app) {
        return res.status(500).json({ error: 'Failed to create appointment' });
      }

      return res.status(201).json({ message: 'Appointment done', app, sessionUrl });
    }

    if (paymentMethod === 'wallet') {
      if (patient.walletBalance < price) {
        res.status(400).json({ error: "Insufficient balance in the patient's wallet" });
        return;
      }

      patient.walletBalance -= price;
      await patient.save();

      doctor.walletBalance += price;
      await doctor.save();

      const app = await createAppointment(req, res);

      if (!app) {
        return res.status(500).json({ error: 'Failed to create appointment' });
      }

      res.json({ message: 'Payment successful', app });
    } else {
      res.status(400).json({ error: 'Invalid payment method' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
export const payment2 = async (req: Request, res: Response) => {
  try {
    const { doctorUsername, paymentMethod, price, date ,user} = req.body;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenDB = await tokenModel.findOne({ token });

    if (!tokenDB) {
      return res.status(404).json({ error: 'Token not found' });
    }

    const patientUsername = tokenDB.username;
    const patient = await patientModel.findOne({ username: patientUsername });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const doctor = await DoctorModel.findOne({ username: doctorUsername });

    if (!doctor) {
      res.status(404).json({ error: 'Doctor not found pay' });
      return;
    }

    const pricee = price;

    if (paymentMethod === 'card') {
      const sessionUrl = await payWithCredit(req, res, price);

      if (!sessionUrl) {
        return res.status(500).json({ error: 'Failed to create payment session' });
      }
        console.log(doctor.walletBalance)
      doctor.walletBalance += price;
      await doctor.save();

      const app = await createAppointment22(req, res,user);

      if (!app) {
        return res.status(500).json({ error: 'Failed to create appointment' });
      }

      return res.status(201).json({ message: 'Appointment done', app, sessionUrl });
    }

    if (paymentMethod === 'wallet') {
      if (patient.walletBalance < price) {
        res.status(400).json({ error: "Insufficient balance in the patient's wallet" });
        return;
      }

      patient.walletBalance -= price;
      await patient.save();

      doctor.walletBalance += price;
      await doctor.save();

      const app = await createAppointment22(req, res,user);

      if (!app) {
        return res.status(500).json({ error: 'Failed to create appointment' });
      }

      res.json({ message: 'Payment successful', app });
    } else {
      res.status(400).json({ error: 'Invalid payment method' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


export const payWithCredit = async (req: Request, res: Response, sessionPrice: any) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'EGP',
            product_data: {
              name: 'Appointment',
            },
            unit_amount: sessionPrice * 100,
          },
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:3000/success', // Update with your success URL
      cancel_url: 'http://localhost:3000/cancel', // Update with your cancel URL
    });

    return session.url;
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};


export const createAppointment22 = async (req: Request, res: Response,username:string) => {
  const doctorUsername = req.body.doctorUsername;
  const date = req.body.date;
  const status = 'upcoming';
  const type = 'new appointment';
  const price = Number(req.body.price);

  try {
   
    const patient = await patientModel.findOne({ username });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const doctor = await DoctorModel.findOne({ username: doctorUsername });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found app' });
    }

    const newDate = new Date(date);
    doctor.timeslots = doctor.timeslots.filter((timeslot: { date: { getTime: () => number } }) =>
      timeslot.date.getTime() !== newDate.getTime()
    );

    await doctor.save();

    const appointment = await AppointmentModel.create({
      status: status,
      doctor: doctorUsername,
      patient: username,
      date: new Date(date),
      type: type,
      price: price,
    });

    return appointment;
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred', error });
  }
};