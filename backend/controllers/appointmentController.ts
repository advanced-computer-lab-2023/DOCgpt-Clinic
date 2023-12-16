import { Request, Response } from "express";
import AppointmentModel from "../models/appointmentModel";
import DoctorModel from '../models/doctorModel'; // Import your Doctor model
import tokenModel from "../models/tokenModel";
import patientModel from "../models/patientModel";
import notificationtModel from "../models/notificationModel";

import Stripe from 'stripe';
import { sendAnEmail } from "./nodemailer";


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


export const createNotificationWithCurrentDate = async (patientUsername : any , subject : any ,msg : any) => {
  try {
    const currentDate = new Date();

    const notification = await notificationtModel.create({
      patientUsername,
      date: currentDate,
      subject ,
      msg,
    });
    notification.save();
    console.log('Notification created:', notification);
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

function formatDateWithoutDay(dateString : any) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options as Intl.DateTimeFormatOptions);
}

function extractTime(dateString : any) {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  return time;
}

export const createAppointment = async (req: Request, res: Response) => {
  const doctorUsername = req.body.doctorUsername;
  const date = req.body.date;
  const status = 'upcoming';
  const type = 'Regular';
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

    console.log("ana hena");
    
    const newDate = new Date(date);
    doctor.timeslots = doctor.timeslots.filter((timeslot: { date?: { getTime: () => number } }) =>
      !(
        timeslot.date &&
        timeslot.date.getTime() === newDate.getTime()
      )
    );
    
    
    await doctor.save();

    const appointment = await AppointmentModel.create({
      status: status,
      doctor: doctorUsername,
      patient: username,
      date: new Date(date),
      type: type,
      price: price,
      scheduledBy: username
    });
    const time = extractTime(date);
    const formattedDateWithoutDay = formatDateWithoutDay(date);

    const patientEmail = patient.email; // Adjust this based on your patient model structure
    const emailSubject = 'Appointment Confirmation';
    const msgSubject = ` ${type} Appointment Confirmation`;

    const emailText = `Your appointment has been scheduled for ${new Date(date)}. 
                      Doctor: ${doctor.username}
                      Type: ${type}
                      Price: ${price}`;
    const msg = ` Date : ${formattedDateWithoutDay} , ${time}
                      Doctor: ${doctor.username} `
                      ;


    const doctorEmail = doctor.email; // Adjust this based on your patient model structure
    const emailText1 = `An  appointment has been scheduled for ${new Date(date)}. 
                                        patient: ${username}
                                        Type: ${type}
                                        Price: ${price}`;
    const msg1 = `Date : ${formattedDateWithoutDay} , ${time}. 
                                        patient: ${username}`;
    // Assuming sendOTPByEmail returns a Promise, use await here if needed
     const not=  await sendAnEmail(patientEmail, emailSubject, emailText);
     const not2=  await sendAnEmail(doctorEmail, emailSubject, emailText1);

    console.log("im hereree");
    // Create a notification for the patient
     const nn= await createNotificationWithCurrentDate(username,msgSubject,msg);
     const nnn= await createNotificationWithCurrentDate(doctorUsername,msgSubject,msg1);

     return appointment ;
    
  }
  catch (error : any) {
    console.error("An error occurred:", error); // Log the full error object for debugging

    return res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};

export const createAppointmentFam = async (req: Request, res: Response , user:string) => {
  const doctorUsername = req.body.doctorUsername;
  const date = req.body.date;
  const status = 'upcoming';
  const type = 'Regular';
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
    

    const fam = await patientModel.findOne({ username: user });
    if (!fam) {
      return res.status(404).json({ error: 'family member not found' });
    }

    const doctor = await DoctorModel.findOne({ username: doctorUsername });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found app' });
    }

    console.log("ana hena");
    
    const newDate = new Date(date);
    doctor.timeslots = doctor.timeslots.filter((timeslot: { date?: { getTime: () => number } }) =>
      !(
        timeslot.date &&
        timeslot.date.getTime() === newDate.getTime()
      )
    );
    
    
    await doctor.save();

    const appointment = await AppointmentModel.create({
      status: status,
      doctor: doctorUsername,
      patient: user,
      date: new Date(date),
      type: type,
      price: price,
      scheduledBy: username
    });
    const time = extractTime(date);
    const formattedDateWithoutDay = formatDateWithoutDay(date);
     
    const patientEmail = fam.email; // Adjust this based on your patient model structure
    const emailSubject = `  Appointment Confirmation`;
    const msgSubject = ` ${type} Appointment Confirmation`;

    const emailText = `Your appointment has been scheduled for ${new Date(date)}. 
                      Doctor: ${doctor.username}
                      Type: ${type} `;
   const msg = ` Date : ${formattedDateWithoutDay} , ${time}
                      Doctor: ${doctor.username} `
                      ;


    const doctorEmail = doctor.email; // Adjust this based on your patient model structure
    const emailText1 = `An  appointment has been scheduled for ${new Date(date)}. 
                                        patient: ${username}
                                        Type: ${type}
                                        Price: ${price}`;
    const msg1 = `Date : ${formattedDateWithoutDay} , ${time}. 
                                        patient: ${username}`;
    // Assuming sendOTPByEmail returns a Promise, use await here if needed
     const not=  await sendAnEmail(patientEmail, emailSubject, emailText);
     const not2=  await sendAnEmail(doctorEmail, emailSubject, emailText1);

    console.log("im hereree");
    // Create a notification for the patient
     const nn= await createNotificationWithCurrentDate(username,msgSubject,msg);
     const nnn= await createNotificationWithCurrentDate(doctorUsername,msgSubject,msg1);

     return appointment ;
    
  }
  catch (error : any) {
    console.error("An error occurred:", error); // Log the full error object for debugging

    return res.status(500).json({ message: 'An error occurred', error: error.message });
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
      const numericPrice = typeof price === 'number' ? price : parseInt(price, 10);
      const sessionUrl = await payWithCredit(req, res,  numericPrice);

      if (!sessionUrl) {
        return res.status(500).json({ error: 'Failed to create payment session' });
      }
      console.log("Doctor's balance before update:", doctor.walletBalance);
    
      doctor.walletBalance += numericPrice;  
      console.log("Doctor's balance after update:", doctor.walletBalance);
      await doctor.save();

      const app = await createAppointment(req, res);

      if (!app) {
        return res.status(500).json({ error: 'Failed to create appointment' });
      }

      return res.status(201).json({ message: 'Appointment done', app, sessionUrl });
    }

    if (paymentMethod === 'wallet') {
      const numericPrice = typeof price === 'number' ? price : parseInt(price, 10);

      if (patient.walletBalance < price) {
        return res.status(400).json({ error: "Insufficient balance in the patient's wallet" });
       
      }

      patient.walletBalance -= numericPrice;
      await patient.save();
    
      console.log("Price:", numericPrice);
      console.log("Doctor's balance before update:", doctor.walletBalance);
    
      doctor.walletBalance += numericPrice;  // This should now work as expected
    
      await doctor.save();
    
      console.log("Doctor's balance after update:", doctor.walletBalance);
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
      const numericPrice = typeof price === 'number' ? price : parseInt(price, 10);
      const sessionUrl = await payWithCredit(req, res,  numericPrice);

      if (!sessionUrl) {
        return res.status(500).json({ error: 'Failed to create payment session' });
      }
      console.log("Doctor's balance before update:", doctor.walletBalance);
    
      doctor.walletBalance += numericPrice;  
      console.log("Doctor's balance after update:", doctor.walletBalance);
      await doctor.save();

      const app = await createAppointmentFam(req, res,user);
         console.log("done");
      if (!app) {
        return res.status(500).json({ error: 'Failed to create appointment' });
      }

      return res.status(201).json({ message: 'Appointment done', app, sessionUrl });
    }

    if (paymentMethod === 'wallet') {
      const numericPrice = typeof price === 'number' ? price : parseInt(price, 10);

      if (patient.walletBalance < price) {
        return res.status(400).json({ error: "Insufficient balance in the patient's wallet" });
       
      }

      patient.walletBalance -= numericPrice;
      await patient.save();
    
      console.log("Price:", numericPrice);
      console.log("Doctor's balance before update:", doctor.walletBalance);
    
      doctor.walletBalance += numericPrice;  // This should now work as expected
    
      await doctor.save();
    
      console.log("Doctor's balance after update:", doctor.walletBalance);
      const app = await createAppointmentFam(req, res,user);

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
// export const payment2 = async (req: Request, res: Response) => {
//   try {
//     const { doctorUsername, paymentMethod, price, date ,user} = req.body;
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     const tokenDB = await tokenModel.findOne({ token });

//     if (!tokenDB) {
//       return res.status(404).json({ error: 'Token not found' });
//     }

//     const patientUsername = tokenDB.username;
//     const patient = await patientModel.findOne({ username: patientUsername });

//     if (!patient) {
//       return res.status(404).json({ error: 'Patient not found' });
//     }

//     const doctor = await DoctorModel.findOne({ username: doctorUsername });

//     if (!doctor) {
//       res.status(404).json({ error: 'Doctor not found pay' });
//       return;
//     }

//     const pricee = price;

//     if (paymentMethod === 'card') {
//       const sessionUrl = await payWithCredit(req, res, price);

//       if (!sessionUrl) {
//         return res.status(500).json({ error: 'Failed to create payment session' });
//       }
//         console.log(doctor.walletBalance)
//       doctor.walletBalance += price;
//       await doctor.save();

//       const app = await createAppointment22(req, res,user);

//       if (!app) {
//         return res.status(500).json({ error: 'Failed to create appointment' });
//       }

//       return res.status(201).json({ message: 'Appointment done', app, sessionUrl });
//     }

//     if (paymentMethod === 'wallet') {
//       if (patient.walletBalance < price) {
//         res.status(400).json({ error: "Insufficient balance in the patient's wallet" });
//         return;
//       }

//       patient.walletBalance -= price;
//       await patient.save();

//       doctor.walletBalance = parseFloat(doctor.walletBalance) + parseFloat(price);

//       await doctor.save();
//        console.log(doctor.walletBalance);
//       const app = await createAppointment22(req, res,user);

//       if (!app) {
//         return res.status(500).json({ error: 'Failed to create appointment' });
//       }

//       res.json({ message: 'Payment successful', app });
//     } else {
//       res.status(400).json({ error: 'Invalid payment method' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };


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
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'EG'], // List of allowed countries
      },
      success_url: 'http://localhost:3002/patient/viewMyappointments', // Update with your success URL
      cancel_url: 'http://localhost:3002/patient/viewMyappointments', // Update with your cancel URL
    });

    return session.url;
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};




export const cancelAppointment = async (req: Request, res: Response) => {
  const doctorUsername = req.body.doctorUsername;
  const date = req.body.date;
  const status = 'cancelled';
  const type = 'Regular';
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
    const newTimeSlot = {
      date: date
    };
    doctor.timeslots.push(newTimeSlot);
    const currentDate = new Date();
const givenDate = new Date(date);
    
const timeDifference =  currentDate.getTime() -  givenDate.getTime()  ;
console.log(currentDate.getTime());
console.log(givenDate.getTime());


// Check if the time difference is less than 24 hours (in milliseconds)
const isLessthan24Hours = timeDifference < 24 * 60 * 60 * 1000;
console.log(timeDifference);
    if (!isLessthan24Hours) {
      console.log("Doctor's balance before update:", doctor.walletBalance);
      doctor.walletBalance = doctor.walletBalance-  price;
     
      patient.walletBalance = patient.walletBalance +price;
      await patient.save();
      console.log(patient);
    }
    await doctor.save();
    console.log("Doctor's balance after update:", doctor.walletBalance);
   
    const existingAppointment = await AppointmentModel.findOneAndUpdate(
      {
        doctor: doctorUsername,
        patient: username,
        date: new Date(date),
      },
      { $set: { status: 'cancelled' } },
      { new: true } // Return the updated document
    );

    if (!existingAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    const patientEmail = patient.email; 
    const emailSubject = 'Appointment cancelled ';
    const emailText = `Your appointment with this date   ${new Date(date)} has been cancelled. 
                      Doctor: ${doctor.username}
                      Type: ${type}
                      Price: ${price}`;
 const doctorEmail = doctor.email; 
const emailText1 = `Your appointment with this date   ${new Date(date)} has been cancelled. 
                                        patient: ${patient.username}
                                        Type: ${type}
                                        Price: ${price}`;
     const patientMail=  await sendAnEmail(patientEmail, emailSubject, emailText);
     const docMail=  await sendAnEmail(doctorEmail, emailSubject, emailText1);


    console.log("im hereree");
    // Create a notification for the patient
     const patientNotification= await createNotificationWithCurrentDate(username,emailSubject,emailText);
     const doctorNotification= await createNotificationWithCurrentDate(doctorUsername,emailSubject,emailText1);

     return res.status(201).json({ message: 'Appointment Cancelled' });
    
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred', error });
  }
};
export const cancelAppointmentDoc = async (req: Request, res: Response) => {
  const patientUsername = req.body.patientUsername;
  const date = req.body.date;
  const status = 'cancelled';
  const type = 'Regular';
  const price = Number(req.body.price);

  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenDB = await tokenModel.findOne({ token });

    if (!tokenDB) {
      return res.status(404).json({ error: 'Token not found' });
    }

    const username = tokenDB.username;
    const doctor = await DoctorModel.findOne({ username });

    if (!doctor) {
      return res.status(404).json({ error: 'doctor  not found' });
    }

    const patient = await patientModel.findOne({ username: patientUsername });

    if (!patient) {
      return res.status(404).json({ message: 'patient not found app' });
    }
    const newTimeSlot = {
      date: date
    };
    doctor.timeslots.push(newTimeSlot);
    const currentDate = new Date();
const givenDate = new Date(date);
    
const timeDifference =  currentDate.getTime() -  givenDate.getTime()  ;
console.log(currentDate.getTime());
console.log(givenDate.getTime());


// Check if the time difference is less than 24 hours (in milliseconds)
const isLessthan24Hours = timeDifference < 24 * 60 * 60 * 1000;
console.log(timeDifference);
    if (!isLessthan24Hours) {
      doctor.walletBalance = doctor.walletBalance-  price;
      patient.walletBalance = patient.walletBalance +price;
      await patient.save();
      console.log(patient);
    }
    await doctor.save();

   
    const existingAppointment = await AppointmentModel.findOneAndUpdate(
      {
        doctor: username,
        patient: patientUsername,
        date: new Date(date),
      },
      { $set: { status: 'cancelled' } },
      { new: true } // Return the updated document
    );

    if (!existingAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    const patientEmail = patient.email; 
    const emailSubject = 'Appointment cancelled ';
    const emailText = `Your appointment with this date   ${new Date(date)} has been cancelled. 
                      Doctor: ${doctor.username}
                      Type: ${type}
                      Price: ${price}`;
 const doctorEmail = doctor.email; 
const emailText1 = `Your appointment with this date   ${new Date(date)} has been cancelled. 
                                        patient: ${patient.username}
                                        Type: ${type}
                                        Price: ${price}`;
     const patientMail=  await sendAnEmail(patientEmail, emailSubject, emailText);
     const docMail=  await sendAnEmail(doctorEmail, emailSubject, emailText1);


    console.log("im hereree");
    // Create a notification for the patient
     const patientNotification= await createNotificationWithCurrentDate(patientUsername,emailSubject,emailText);
     const doctorNotification= await createNotificationWithCurrentDate(username,emailSubject,emailText1);

     return res.status(201).json({ message: 'Appointment Cancelled' });
    
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred', error });
  }
};


export const cancelAppointmentFam = async (req: Request, res: Response) => {
  const doctorUsername = req.body.doctorUsername;
  const famMember=req.body.famMember;
  const date = req.body.date;
  const status = 'cancelled';
  const type = 'Regular';
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
    const fam = await patientModel.findOne({ username : famMember });

    if (!fam) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    const doctor = await DoctorModel.findOne({ username: doctorUsername });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found app' });
    }
    const newTimeSlot = {
      date: date
    };
    doctor.timeslots.push(newTimeSlot);
    const currentDate = new Date();
const givenDate = new Date(date);
    
const timeDifference =  currentDate.getTime() -  givenDate.getTime()  ;
console.log(currentDate.getTime());
console.log(givenDate.getTime());


// Check if the time difference is less than 24 hours (in milliseconds)
const isLessthan24Hours = timeDifference < 24 * 60 * 60 * 1000;
console.log(timeDifference);
    if (!isLessthan24Hours) {
      doctor.walletBalance = doctor.walletBalance-  price;
      patient.walletBalance = patient.walletBalance +price;
      await patient.save();
      console.log(patient);
    }
    await doctor.save();

   
    const existingAppointment = await AppointmentModel.findOneAndUpdate(
      {
        doctor: doctorUsername,
        patient: famMember,
        date: new Date(date),
      },
      { $set: { status: 'cancelled' } },
      { new: true } // Return the updated document
    );

    if (!existingAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    const patientEmail = fam.email; 
    const emailSubject = 'Appointment cancelled ';
    const emailText = `Your appointment with this date   ${new Date(date)} has been cancelled. 
                      Doctor: ${doctor.username}
                      Type: ${type}
                      Price: ${price}`;
 const doctorEmail = doctor.email; 
const emailText1 = `Your appointment with this date   ${new Date(date)} has been cancelled. 
                                        patient: ${patient.username}
                                        Type: ${type}
                                        Price: ${price}`;
     const patientMail=  await sendAnEmail(patientEmail, emailSubject, emailText);
     const docMail=  await sendAnEmail(doctorEmail, emailSubject, emailText1);


    console.log("im hereree");
    // Create a notification for the patient
     const patientNotification= await createNotificationWithCurrentDate(username,emailSubject,emailText);
     const doctorNotification= await createNotificationWithCurrentDate(doctorUsername,emailSubject,emailText1);

     return res.status(201).json({ message: 'Appointment Cancelled' });
    
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred', error });
  }
};

export const getAppointmentById = async (req: Request, res: Response) => {
  const {appointmentId}= req.query;
  const appointment = await AppointmentModel.findById(appointmentId);
  return res.status(200).json({ appointment });
}
