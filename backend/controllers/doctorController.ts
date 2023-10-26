import { Request, Response } from "express";
import multer from 'multer';
import path from 'path';
import DoctorModel, { IDoctor } from "../models/doctorModel";
import AppointmentModel from "../models/appointmentModel";
import PatientModel from "../models/patientModel";
import HealthRecordModel from "../models/healthRecordModel";

export const getDoctors = async (req: Request, res: Response) => {
    const doctors = await DoctorModel.find().exec();
    res.status(200).json(doctors);
};

export const getDoctor = async (req: Request, res: Response) => {

    const doctorUsername = req.query.doctorUsername;
    const doctor = await DoctorModel.findOne({username: doctorUsername}).exec();
    console.log(doctor)
    res.status(200).json(doctor);
};

export const searchPatient = async (req: Request, res: Response) => {
    const patientName = String(req.query.patientName);
    // find by the full name
    // const patient = await PatientModel.find({ name: patientName }).exec();
    // res.status(200).json(patient);

    // find by just the substring
    const patients = await PatientModel.find().exec();
    const matchingPatients = patients.filter((patient) =>
        patient.name.includes(patientName)
    );
    res.json(matchingPatients);
}

export const createDoctors = async (req: Request, res: Response) => {
    const username = req.body.username;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const dateOfBirth = req.body.dateOfBirth;
    const hourlyRate = req.body.hourlyRate;
    const affiliation = req.body.affiliation;
    const speciality = req.body.speciality;
    const educationalBackground = req.body.educationalBackground;
    
    const doctor = await DoctorModel.create({
        username: username,
        name: name,
        email: email,
        password: password,
        dateOfBirth: dateOfBirth,
        hourlyRate: hourlyRate,
        affiliation: affiliation,
        speciality: speciality,
        educationalBackground: educationalBackground,
        
    });
    res.status(201).json(doctor);
    
};

export const updateDoctorEmail = async (req: Request, res: Response) => {
    const doctorUsername = req.query.doctorUsername;
    const newEmail = req.body.email;
    const doctor = await DoctorModel.findOne({username: doctorUsername}).exec();
    if(doctor!=null){
        doctor.email = newEmail;
        const updatedDoctor = await doctor.save();
        res.status(200).json(updatedDoctor);
    }
};

export const updateDoctorHourlyRate = async (req: Request, res: Response) => {
    const doctorUsername = req.query.doctorUsername;
    const newRate = req.body.hourlyRate;
    const doctor = await DoctorModel.findOne({username: doctorUsername}).exec();
    if(doctor!=null){
        doctor.hourlyRate = newRate;
        const updatedDoctor = await doctor.save();
        res.status(200).json(updatedDoctor);
    }
};

export const updateDoctorAffiliation = async (req: Request, res: Response) => {
    const doctorUsername = req.query.doctorUsername;
    const newAffiliation = req.body.affiliation;
    const doctor = await DoctorModel.findOne({username: doctorUsername}).exec();
    if(doctor!=null){
        doctor.affiliation = newAffiliation;
        const updatedDoctor = await doctor.save();
        res.status(200).json(updatedDoctor);
    }
};

export const viewMyPatients = async (req: Request, res: Response) => {
    const doctorUsername = req.query.doctorUsername;
    const appointments = await AppointmentModel.find({ doctor: doctorUsername }).exec();
    const patients: any[] = []; 
    const usernames: any[] = [];
    for (const appoinment of appointments) {
        const username = appoinment.patient;
        const patient = await PatientModel.findOne({ username: username}).exec();
        if(!usernames.includes(username)){
            patients.push(patient);
            usernames.push(username);
        }
    }
    res.status(200).json(patients);
    // res.status(200).json(patients);
};

export const viewPatientsUpcoming = async (req: Request, res: Response) => {
    const doctorUsername = req.query.doctorUsername;
    const appointments = await AppointmentModel.find({ doctor: doctorUsername , status: "upcoming"}).exec();
    const patients: any[] = []; 
    const usernames: any[] = [];
    for (const appoinment of appointments) {
        const username = appoinment.patient;
        const patient = await PatientModel.findOne({ username: username}).exec();
        if(!usernames.includes(username)){
            patients.push({date: appoinment.date});
            patients.push(patient);
            usernames.push(username);
        }
    }
    res.status(200).json(patients);
};


export const selectPatient = async (req: Request, res: Response) => {
    const patientId = req.query.patientId;
    const patient = await PatientModel.findById(patientId);
    res.status(200).json(patient);
};

export const addTimeSlots = async (req: Request, res: Response) => {
    const doctorUsername = req.query.doctorUsername;
    const { dates } = req.body;

    try {
        // Find the doctor by username
        const doctor: IDoctor | null = await DoctorModel.findOne({ username: doctorUsername }).exec();

        if (doctor) {
            // Use push to add new time slots to the existing array
            dates.forEach((date: Date) => {
                doctor.timeslots.push({ date });
            });

            // Save the updated doctor
            const updatedDoctor = await doctor.save();

            res.status(200).json(updatedDoctor);
        } else {
            res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
};

export const createfollowUp = async (req: Request, res: Response) => {
    const doctorUsername = req.body.doctor;
    const patientUsername = req.body.patient;
    const date = req.body.date;
    const status = req.body.status;
    const type=req.body.type;
    
    const appoinment = await AppointmentModel.create({
        status: status,
        doctor: doctorUsername,
        patient: patientUsername,
        date: date,
        type:type
    });
    res.status(201).json(appoinment);
    
};



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '/Users/rawan/Desktop/uploads'); // The folder where files will be saved
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
    },
  });
  const upload = multer({ storage });
  
  export const uploadAndSubmitReqDocs = (req: Request, res: Response) => {
    upload.array('documents', 3)(req, res, (err) => {
      if (err) {
        return res.status(500).json({ error: 'File upload failed.' });
      }
      const uploadedFiles = req.files as Express.Multer.File[];
      console.log('Uploaded Files:', uploadedFiles);
  
      // Handle saving file information and associating it with the doctor's registration here
  
      res.json({ message: 'Documents uploaded and submitted successfully.' });
    });
  };


// HEALTH RECORDS

//VIEW ALL MY PATIENTS HEALTH RECORDS
export const viewHealthRecords = async (req: Request, res: Response) => {
    const doctorUsername = req.query.doctorUsername;
    const appointments = await AppointmentModel.find({ doctor: doctorUsername}).exec();
    const healthRecords: any[] = []; 
    const usernames: any[] = [];
    for (const appoinment of appointments) {
        const username = appoinment.patient;
        const healthRecord = await HealthRecordModel.findOne({ patient: username}).exec();
        if(!usernames.includes(username)){
            healthRecords.push(healthRecord);
            usernames.push(username);
        }
    }
    res.status(200).json(healthRecords);
};

//VIEW A HEALTH RECORD FOR A SPECIFIC PATIENT
export const viewHealthRecord = async (req: Request, res: Response) => {
    const patientUsername = req.query.patientUsername;
    const healthRecord = await HealthRecordModel.find({ patient: patientUsername});
    res.status(200).json(healthRecord);
};  

//ADD A HEALTH RECORD FOR CHOSEN PATIENT
export const addHealthRecord = async (req: Request, res: Response) => {
    const patient = req.query.patientUsername;
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



// APPOINTMENTS

// VIEW ALL MY APPOINTMENTS
export const viewMyAppointments = async (req: Request, res: Response) => {
    try{
        const doctorUsername = req.query.doctorUsername;
        const appointments = await AppointmentModel.find({ doctor: doctorUsername }).exec();
        if(!appointments){
            return res.status(404).json({ message: 'You Have No Appointments Yet!'});
        }
        res.status(200).json({ appointments });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// VIEW UPCOMING APPOINTMENTS
export const viewUpcomingAppointments = async (req: Request, res: Response) => {
    try{
        const doctorUsername = req.query.doctorUsername;
        const appointments = await AppointmentModel.find({ doctor: doctorUsername, status: 'upcoming' });
        if(!appointments){
            return res.status(404).json({ message: 'You Have No Upcoming Appointments Yet!'});
        }
        
        res.status(200).json( { appointments });

    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
// VIEW PAST APPOINTMENTS 
export const viewPastAppointments = async (req: Request, res: Response) => {
    try{
        const doctorUsername = req.query.doctorUsername;
        const appointments = await AppointmentModel.find({ doctor: doctorUsername, status: { $in: ['cancelled', 'completed', 'rescheduled'] } });
        if(!appointments){
            return res.status(404).json({ message: 'You Have No Past Appointments Yet!'});
        }
        
        res.status(200).json({ appointments });
        
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


// FILTER APPOINTMENTS BY DATE
export const getAppointmentByDate = async (req: Request, res: Response) => {
    try{
        const doctorUsername = req.query.doctorUsername;
        const date = req.query.date;
        const appointments = await AppointmentModel.find({ doctor: doctorUsername, date: date}).exec();

        if(!appointments){
            return res.status(404).json({ message: 'You Have No Appointments On this date!'});
        }
        res.status(200).json(appointments);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// FILTER APPOINTMENTS BY STATUS
export const getAppointmentByStatus = async (req: Request, res: Response) => {
    const doctorUsername = req.query.doctorUsername;
    const status = req.query.status;
    const appointments = await AppointmentModel.find({ doctor: doctorUsername, status: status}).exec();
    res.status(200).json(appointments);
};
