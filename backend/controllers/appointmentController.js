"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppointmentById = exports.cancelAppointmentFam = exports.cancelAppointmentDoc = exports.cancelAppointment = exports.payWithCredit = exports.payment2 = exports.paymenttt = exports.createAppointmentFam = exports.createAppointment = exports.createNotificationWithCurrentDate = exports.complete = exports.localVariables = exports.getPapp = exports.getAllAppointments = exports.getAppointments = void 0;
const appointmentModel_1 = __importDefault(require("../models/appointmentModel"));
const doctorModel_1 = __importDefault(require("../models/doctorModel")); // Import your Doctor model
const tokenModel_1 = __importDefault(require("../models/tokenModel"));
const patientModel_1 = __importDefault(require("../models/patientModel"));
const notificationModel_1 = __importDefault(require("../models/notificationModel"));
const stripe_1 = __importDefault(require("stripe"));
const nodemailer_1 = require("./nodemailer");
require('dotenv').config();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
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
const getAppointments = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenDB = await tokenModel_1.default.findOne({ token });
    console.log(token);
    const doctorUsername = tokenDB === null || tokenDB === void 0 ? void 0 : tokenDB.username;
    const appoinments = await appointmentModel_1.default.find({ doctor: doctorUsername }).exec();
    res.status(200).json(appoinments);
};
exports.getAppointments = getAppointments;
const getAllAppointments = async (req, res) => {
    const appoinments = await appointmentModel_1.default.find().exec();
    res.json(appoinments);
};
exports.getAllAppointments = getAllAppointments;
const getPapp = async (req, res) => {
    const username = req.query.username;
    const appoinments = await appointmentModel_1.default.find({ patient: username }).exec();
    res.status(200).json(appoinments);
};
exports.getPapp = getPapp;
const localVariables = async (req, res, next) => {
    req.app.locals = {
        OTP: null,
        resetSession: false
    };
    next();
};
exports.localVariables = localVariables;
const complete = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenDB = await tokenModel_1.default.findOne({ token });
    console.log(token);
    const doctorUsername = tokenDB === null || tokenDB === void 0 ? void 0 : tokenDB.username;
    const status = req.body.status;
    const date = req.body.date;
    const patient = req.body.patient;
    const result = await appointmentModel_1.default.updateOne({
        patient: patient,
        status: status,
        date: date,
        doctor: doctorUsername,
    }, { $set: { status: 'completed' } });
};
exports.complete = complete;
const createNotificationWithCurrentDate = async (patientUsername, subject, msg) => {
    try {
        const currentDate = new Date();
        const notification = await notificationModel_1.default.create({
            patientUsername,
            date: currentDate,
            subject,
            msg,
        });
        notification.save();
        console.log('Notification created:', notification);
        return notification;
    }
    catch (error) {
        console.error('Error creating notification:', error);
        throw error; // Re-throw the error to handle it in the calling function
    }
};
exports.createNotificationWithCurrentDate = createNotificationWithCurrentDate;
function formatDateWithoutDay(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}
function extractTime(dateString) {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return time;
}
const createAppointment = async (req, res) => {
    const doctorUsername = req.body.doctorUsername;
    const date = req.body.date;
    const status = 'upcoming';
    const type = 'Regular';
    const price = Number(req.body.price);
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const tokenDB = await tokenModel_1.default.findOne({ token });
        if (!tokenDB) {
            return res.status(404).json({ error: 'Token not found' });
        }
        const username = tokenDB.username;
        const patient = await patientModel_1.default.findOne({ username });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        const doctor = await doctorModel_1.default.findOne({ username: doctorUsername });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found app' });
        }
        console.log("ana hena");
        const newDate = new Date(date);
        doctor.timeslots = doctor.timeslots.filter((timeslot) => !(timeslot.date &&
            timeslot.date.getTime() === newDate.getTime()));
        await doctor.save();
        const appointment = await appointmentModel_1.default.create({
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
                      Doctor: ${doctor.username} `;
        const doctorEmail = doctor.email; // Adjust this based on your patient model structure
        const emailText1 = `An  appointment has been scheduled for ${new Date(date)}. 
                                        patient: ${username}
                                        Type: ${type}
                                        Price: ${price}`;
        const msg1 = `Date : ${formattedDateWithoutDay} , ${time}. 
                                        patient: ${username}`;
        // Assuming sendOTPByEmail returns a Promise, use await here if needed
        const not = await (0, nodemailer_1.sendAnEmail)(patientEmail, emailSubject, emailText);
        const not2 = await (0, nodemailer_1.sendAnEmail)(doctorEmail, emailSubject, emailText1);
        console.log("im hereree");
        // Create a notification for the patient
        const nn = await (0, exports.createNotificationWithCurrentDate)(username, emailSubject, msgSubject);
        const nnn = await (0, exports.createNotificationWithCurrentDate)(doctorUsername, emailSubject, msgSubject);
        return appointment;
    }
    catch (error) {
        console.error("An error occurred:", error); // Log the full error object for debugging
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};
exports.createAppointment = createAppointment;
const createAppointmentFam = async (req, res, user) => {
    const doctorUsername = req.body.doctorUsername;
    const date = req.body.date;
    const status = 'upcoming';
    const type = 'Regular';
    const price = Number(req.body.price);
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const tokenDB = await tokenModel_1.default.findOne({ token });
        if (!tokenDB) {
            return res.status(404).json({ error: 'Token not found' });
        }
        const username = tokenDB.username;
        const patient = await patientModel_1.default.findOne({ username });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        const fam = await patientModel_1.default.findOne({ username: user });
        if (!fam) {
            return res.status(404).json({ error: 'family member not found' });
        }
        const doctor = await doctorModel_1.default.findOne({ username: doctorUsername });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found app' });
        }
        console.log("ana hena");
        const newDate = new Date(date);
        doctor.timeslots = doctor.timeslots.filter((timeslot) => !(timeslot.date &&
            timeslot.date.getTime() === newDate.getTime()));
        await doctor.save();
        const appointment = await appointmentModel_1.default.create({
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
                      Doctor: ${doctor.username} `;
        const doctorEmail = doctor.email; // Adjust this based on your patient model structure
        const emailText1 = `An  appointment has been scheduled for ${new Date(date)}. 
                                        patient: ${username}
                                        Type: ${type}
                                        Price: ${price}`;
        const msg1 = `Date : ${formattedDateWithoutDay} , ${time}. 
                                        patient: ${username}`;
        // Assuming sendOTPByEmail returns a Promise, use await here if needed
        const not = await (0, nodemailer_1.sendAnEmail)(patientEmail, emailSubject, emailText);
        const not2 = await (0, nodemailer_1.sendAnEmail)(doctorEmail, emailSubject, emailText1);
        console.log("im hereree");
        // Create a notification for the patient
        const nn = await (0, exports.createNotificationWithCurrentDate)(username, msgSubject, msg);
        const nnn = await (0, exports.createNotificationWithCurrentDate)(doctorUsername, msgSubject, msg1);
        return appointment;
    }
    catch (error) {
        console.error("An error occurred:", error); // Log the full error object for debugging
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};
exports.createAppointmentFam = createAppointmentFam;
const paymenttt = async (req, res) => {
    try {
        const { doctorUsername, paymentMethod, price, date } = req.body;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const tokenDB = await tokenModel_1.default.findOne({ token });
        if (!tokenDB) {
            return res.status(404).json({ error: 'Token not found' });
        }
        const patientUsername = tokenDB.username;
        const patient = await patientModel_1.default.findOne({ username: patientUsername });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        const doctor = await doctorModel_1.default.findOne({ username: doctorUsername });
        if (!doctor) {
            res.status(404).json({ error: 'Doctor not found pay' });
            return;
        }
        const pricee = price;
        if (paymentMethod === 'card') {
            const numericPrice = typeof price === 'number' ? price : parseInt(price, 10);
            const sessionUrl = await (0, exports.payWithCredit)(req, res, numericPrice);
            if (!sessionUrl) {
                return res.status(500).json({ error: 'Failed to create payment session' });
            }
            console.log("Doctor's balance before update:", doctor.walletBalance);
            doctor.walletBalance += numericPrice;
            console.log("Doctor's balance after update:", doctor.walletBalance);
            await doctor.save();
            const app = await (0, exports.createAppointment)(req, res);
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
            doctor.walletBalance += numericPrice; // This should now work as expected
            await doctor.save();
            console.log("Doctor's balance after update:", doctor.walletBalance);
            const app = await (0, exports.createAppointment)(req, res);
            if (!app) {
                return res.status(500).json({ error: 'Failed to create appointment' });
            }
            res.json({ message: 'Payment successful', app });
        }
        else {
            res.status(400).json({ error: 'Invalid payment method' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.paymenttt = paymenttt;
const payment2 = async (req, res) => {
    try {
        const { doctorUsername, paymentMethod, price, date, user } = req.body;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const tokenDB = await tokenModel_1.default.findOne({ token });
        if (!tokenDB) {
            return res.status(404).json({ error: 'Token not found' });
        }
        const patientUsername = tokenDB.username;
        const patient = await patientModel_1.default.findOne({ username: patientUsername });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        const doctor = await doctorModel_1.default.findOne({ username: doctorUsername });
        if (!doctor) {
            res.status(404).json({ error: 'Doctor not found pay' });
            return;
        }
        const pricee = price;
        if (paymentMethod === 'card') {
            const numericPrice = typeof price === 'number' ? price : parseInt(price, 10);
            const sessionUrl = await (0, exports.payWithCredit)(req, res, numericPrice);
            if (!sessionUrl) {
                return res.status(500).json({ error: 'Failed to create payment session' });
            }
            console.log("Doctor's balance before update:", doctor.walletBalance);
            doctor.walletBalance += numericPrice;
            console.log("Doctor's balance after update:", doctor.walletBalance);
            await doctor.save();
            const app = await (0, exports.createAppointmentFam)(req, res, user);
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
            doctor.walletBalance += numericPrice; // This should now work as expected
            await doctor.save();
            console.log("Doctor's balance after update:", doctor.walletBalance);
            const app = await (0, exports.createAppointmentFam)(req, res, user);
            if (!app) {
                return res.status(500).json({ error: 'Failed to create appointment' });
            }
            res.json({ message: 'Payment successful', app });
        }
        else {
            res.status(400).json({ error: 'Invalid payment method' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.payment2 = payment2;
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
const payWithCredit = async (req, res, sessionPrice) => {
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
            success_url: 'http://localhost:3002/patient/viewMyappointments',
            cancel_url: 'http://localhost:3002/patient/viewMyappointments', // Update with your cancel URL
        });
        return session.url;
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
exports.payWithCredit = payWithCredit;
const cancelAppointment = async (req, res) => {
    const doctorUsername = req.body.doctorUsername;
    const date = req.body.date;
    const status = 'cancelled';
    const type = 'Regular';
    const price = Number(req.body.price);
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const tokenDB = await tokenModel_1.default.findOne({ token });
        if (!tokenDB) {
            return res.status(404).json({ error: 'Token not found' });
        }
        const username = tokenDB.username;
        const patient = await patientModel_1.default.findOne({ username });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        const doctor = await doctorModel_1.default.findOne({ username: doctorUsername });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found app' });
        }
        const newTimeSlot = {
            date: date
        };
        doctor.timeslots.push(newTimeSlot);
        const currentDate = new Date();
        const givenDate = new Date(date);
        const timeDifference = currentDate.getTime() - givenDate.getTime();
        console.log(currentDate.getTime());
        console.log(givenDate.getTime());
        // Check if the time difference is less than 24 hours (in milliseconds)
        const isLessthan24Hours = timeDifference < 24 * 60 * 60 * 1000;
        console.log(timeDifference);
        if (!isLessthan24Hours) {
            console.log("Doctor's balance before update:", doctor.walletBalance);
            doctor.walletBalance = doctor.walletBalance - price;
            patient.walletBalance = patient.walletBalance + price;
            await patient.save();
            console.log(patient);
        }
        await doctor.save();
        console.log("Doctor's balance after update:", doctor.walletBalance);
        const existingAppointment = await appointmentModel_1.default.findOneAndUpdate({
            doctor: doctorUsername,
            patient: username,
            date: new Date(date),
        }, { $set: { status: 'cancelled' } }, { new: true } // Return the updated document
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
        const patientMail = await (0, nodemailer_1.sendAnEmail)(patientEmail, emailSubject, emailText);
        const docMail = await (0, nodemailer_1.sendAnEmail)(doctorEmail, emailSubject, emailText1);
        console.log("im hereree");
        // Create a notification for the patient
        const patientNotification = await (0, exports.createNotificationWithCurrentDate)(username, emailSubject, emailText);
        const doctorNotification = await (0, exports.createNotificationWithCurrentDate)(doctorUsername, emailSubject, emailText1);
        return res.status(201).json({ message: 'Appointment Cancelled' });
    }
    catch (error) {
        return res.status(500).json({ message: 'An error occurred', error });
    }
};
exports.cancelAppointment = cancelAppointment;
const cancelAppointmentDoc = async (req, res) => {
    const patientUsername = req.body.patientUsername;
    const date = req.body.date;
    const status = 'cancelled';
    const type = 'Regular';
    const price = Number(req.body.price);
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const tokenDB = await tokenModel_1.default.findOne({ token });
        if (!tokenDB) {
            return res.status(404).json({ error: 'Token not found' });
        }
        const username = tokenDB.username;
        const doctor = await doctorModel_1.default.findOne({ username });
        if (!doctor) {
            return res.status(404).json({ error: 'doctor  not found' });
        }
        const patient = await patientModel_1.default.findOne({ username: patientUsername });
        if (!patient) {
            return res.status(404).json({ message: 'patient not found app' });
        }
        const newTimeSlot = {
            date: date
        };
        doctor.timeslots.push(newTimeSlot);
        const currentDate = new Date();
        const givenDate = new Date(date);
        const timeDifference = currentDate.getTime() - givenDate.getTime();
        console.log(currentDate.getTime());
        console.log(givenDate.getTime());
        // Check if the time difference is less than 24 hours (in milliseconds)
        const isLessthan24Hours = timeDifference < 24 * 60 * 60 * 1000;
        console.log(timeDifference);
        if (!isLessthan24Hours) {
            doctor.walletBalance = doctor.walletBalance - price;
            patient.walletBalance = patient.walletBalance + price;
            await patient.save();
            console.log(patient);
        }
        await doctor.save();
        const existingAppointment = await appointmentModel_1.default.findOneAndUpdate({
            doctor: username,
            patient: patientUsername,
            date: new Date(date),
        }, { $set: { status: 'cancelled' } }, { new: true } // Return the updated document
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
        const patientMail = await (0, nodemailer_1.sendAnEmail)(patientEmail, emailSubject, emailText);
        const docMail = await (0, nodemailer_1.sendAnEmail)(doctorEmail, emailSubject, emailText1);
        console.log("im hereree");
        // Create a notification for the patient
        const patientNotification = await (0, exports.createNotificationWithCurrentDate)(patientUsername, emailSubject, emailText);
        const doctorNotification = await (0, exports.createNotificationWithCurrentDate)(username, emailSubject, emailText1);
        return res.status(201).json({ message: 'Appointment Cancelled' });
    }
    catch (error) {
        return res.status(500).json({ message: 'An error occurred', error });
    }
};
exports.cancelAppointmentDoc = cancelAppointmentDoc;
const cancelAppointmentFam = async (req, res) => {
    const doctorUsername = req.body.doctorUsername;
    const famMember = req.body.famMember;
    const date = req.body.date;
    const status = 'cancelled';
    const type = 'Regular';
    const price = Number(req.body.price);
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const tokenDB = await tokenModel_1.default.findOne({ token });
        if (!tokenDB) {
            return res.status(404).json({ error: 'Token not found' });
        }
        const username = tokenDB.username;
        const patient = await patientModel_1.default.findOne({ username });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        const fam = await patientModel_1.default.findOne({ username: famMember });
        if (!fam) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        const doctor = await doctorModel_1.default.findOne({ username: doctorUsername });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found app' });
        }
        const newTimeSlot = {
            date: date
        };
        doctor.timeslots.push(newTimeSlot);
        const currentDate = new Date();
        const givenDate = new Date(date);
        const timeDifference = currentDate.getTime() - givenDate.getTime();
        console.log(currentDate.getTime());
        console.log(givenDate.getTime());
        // Check if the time difference is less than 24 hours (in milliseconds)
        const isLessthan24Hours = timeDifference < 24 * 60 * 60 * 1000;
        console.log(timeDifference);
        if (!isLessthan24Hours) {
            doctor.walletBalance = doctor.walletBalance - price;
            patient.walletBalance = patient.walletBalance + price;
            await patient.save();
            console.log(patient);
        }
        await doctor.save();
        const existingAppointment = await appointmentModel_1.default.findOneAndUpdate({
            doctor: doctorUsername,
            patient: famMember,
            date: new Date(date),
        }, { $set: { status: 'cancelled' } }, { new: true } // Return the updated document
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
        const patientMail = await (0, nodemailer_1.sendAnEmail)(patientEmail, emailSubject, emailText);
        const docMail = await (0, nodemailer_1.sendAnEmail)(doctorEmail, emailSubject, emailText1);
        console.log("im hereree");
        // Create a notification for the patient
        const patientNotification = await (0, exports.createNotificationWithCurrentDate)(username, emailSubject, emailText);
        const doctorNotification = await (0, exports.createNotificationWithCurrentDate)(doctorUsername, emailSubject, emailText1);
        return res.status(201).json({ message: 'Appointment Cancelled' });
    }
    catch (error) {
        return res.status(500).json({ message: 'An error occurred', error });
    }
};
exports.cancelAppointmentFam = cancelAppointmentFam;
const getAppointmentById = async (req, res) => {
    const { appointmentId } = req.query;
    const appointment = await appointmentModel_1.default.findById(appointmentId);
    return res.status(200).json({ appointment });
};
exports.getAppointmentById = getAppointmentById;
