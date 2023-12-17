# EL7A2NI 
Welcome to our Virtual Clinic Platform! Our website is designed to offer a seamless and user-friendly experience, providing easy access to a range of virtual clinic features. Users can create accounts, build profiles, schedule appointments, follow up on their health progress, subscribe to health packages, manage and upload health records securely, and explore information about doctors across various specialties. Our platform aims to streamline the virtual healthcare experience, ensuring convenient access to all clinic services. Whether you're looking to connect with healthcare professionals, manage your health records, explore our diverse range of features,or even join our team, our virtual clinic is here to cater to your needs.
## Badges

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

## Table of Contents
- [Motivation](#motivation)
- [Build Status](#build-status)
- [Code Style](#code-style)
- [Screenshots](#screenshots)
- [Framework](#framework)
- [Features](#features)
- [Code Examples](#code-examples)
- [Installation](#installation)
- [API References](#api-references)
- [Tests](#tests) 
- [How to use?](#how-to-use)
- [Contributing](#Contributing)
- [Credits](#credits)
- [License](#License)

## Motiviation :fire:
This project was created as a part of Advanced Computer Lab course. The objectives for this course were:
1. Learn how to properly use the Agile Methodology to plan out a project and develop the software.
2. Learn the process of following a given set of System Requirements to develop a software.
3. Learn to research and master the use of the MERN Stack.
4. Learn how to work together as a team on GitHub.

At our Virtual Clinic Platform, we strive to transform the healthcare experience, offering a user-centric platform that simplifies access to a wide range of virtual clinic services. Whether it's scheduling appointments, consulting with healthcare professionals, managing health records, or exploring career opportunities in the medical field, our platform prioritizes user convenience, privacy, and dependability. Discover a seamless and stress-free virtual clinic experience, designed to meet your healthcare needs with ease.

## Build Status :mechanical_arm:
- The project is currently in development.
- Unit tests will be added.
- A message broker needs to be added to the application to handle asynchronous tasks such as sending emails and notifications.
- A caching layer needs to be added to the application.
- How documents are uploaded in sign up page.

## Code Style :writing_hand:

[![Code Style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)
You can then run Prettier on your code by using the prettier command in your terminal. For example:
bash
prettier --write "src/**/*.{js,ts}"

## Screenshots 

### Landing Page 
<details>
<img  src="Clinic/Clinic Landing 1.png"><br>
<img  src="Clinic/Clinic Landing 2.png"><br>
</details>

### Admin Pages 
<details>
<img  src="Clinic/Admin's Doctors Requests.png"><br>
<img  src="Clinic/Doctor's Information.png"><br>
</details>

### Doctor Pages 
<details>
<img  src="Clinic/Doctor's Home Page.png"><br>
<img  src="Clinic/Doctor's Notifications.png"><br>
<img  src="Clinic/Prescription Details Doctor.png"><br>
<img  src="Clinic/Doctor's Appointments.png"><br>
<img  src="Clinic/Doctor's View Prescriptions.png"><br>
<img  src="Clinic/Doctor's Follow Up Requests.png"><br>
<img  src="Clinic/Clinic Chat 1.png"><br>
<img  src="Clinic/Clinic Chat 2.png"><br>
</details>

### Patient Pages 
<details>
<img  src="Clinic/Patient's Health Record 1.png"><br>
<img  src="Clinic/Patients's Health Record 2.png"><br>
<img  src="Clinic/Health Packages.png"><br>
<img  src="Clinic/Screenshot 2023-12-16 at 11.49.11 PM.png"><br>
<img  src="Clinic/Snack Bar Alert.png"><br>
</details>

## Tech and Framework used 🧰
-   [React](https://reactjs.org/)
-   [Node.js](https://nodejs.org/en/)
-   [Express](https://expressjs.com/)
-   [MongoDB](https://www.mongodb.com/)
-   [Mongoose](https://mongoosejs.com/)
-   [Material-UI](https://material-ui.com/)
-   [Stripe](https://stripe.com/)
-   [Git](https://git-scm.com/)
-   [Github Actions](github.com/features/actions)
-   [NodeMailer](https://nodemailer.com/about/)
-   [Postman](https://www.postman.com/)
-   [VSCode](https://code.visualstudio.com/)
-   [JWT](https://jwt.io/)

## Features
The system serves different type of users (Admin , Patient, Doctor)

### As an Admin I can
* View / Delete Patients.
* View / Delete Doctors.
* View Doctor Information.
* Search for Doctor by Username.
* View all Admins.
* Add another Admin.
* View / Accept / Reject Doctors requets.
* View / Add / Update / Delete Health Packages.

### As a Patient I can
* Reserve an Appointment.
* View my Appointments.
* View my Wallet.
* View my Prescriptions.
* Download my Prescriptions.
* Subscribe to Health Packages for Myself/ a Family Member.
* View my current/ previous Health Packages.
* View/Update my Health Records.
* View/Link Family Members.
* View family Members' Appointments/current & previous Subscribed packages

### As a Doctor I can
* Download Prescriptions
* View my Patients Details.
* Search/Filter by Patient Name & Patients with Upcoming Appooitnments.
* Add Time Slots for Appointments.
* View my Appointments.
* View Follow Up Requests.
* View my Prescriptions.
* View my Wallet
* Navigates to the Pharmacy Website to Add Medicines to the Prescription.


General Features : 

|       Feature                   | 🔰 Status  
| -------------------------- | :----------------:| 
| Authentiation            |         ✔️         |    
| Authorization            |         ✔️         |    
| User Roles             |         ✔️         |    
| Payments         |         ✔️         |   
| User Email Notifications  |         ✔️         |      
| User Password Reset    |         ✔️         |  
| Realtime Chat   |         ✔️         |  
| Reserve An Appointment    |         ✔️         |  
| Subscribe to Health Packages    |         ✔️         |  
| Documents Upload    |         ✔️         |  


## LICENSE
This project is licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0) and [MIT License](https://opensource.org/licenses/MIT).

## Credits

### Videos
- Videos on the website are sourced from YouTube.
  - [Video Title 1](link-to-video-1)

### Tutorials
- Tutorials from YouTube were referenced during the development of this project.
  - [React CSV Download](https://www.youtube.com/watch?v=IPEqb_AJbAQ)
  - [MERN Stack](https://youtube.com/playlist?list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&si=BhSnCLJzAsbEZMJp)
  -   [Install TypeScript And Transpile Files](https://youtu.be/pc5IlcEn8vw?si=UDJSEkoCHPamrBQp)
  -   [Filter](https://youtu.be/ZoayCCDHFiI?si=H6O5gT2Z5H7le5l9)
  -   [Upload and Display Images](https://youtu.be/jfZyqZycjmA?si=zParjdNyOtgrleC5)

### Photos
- Photos used in this project are from [Freepik](https://www.freepik.com/).

## Contributing 
Contributions are always welcome!
See contributing.md for ways to get started.
Please adhere to this project's code of conduct.

## Installation
In order to install this project locally, simply fork and clone the repository or download as zip and unzip on your machine.
 * Open the project in your prefered code editor.
 * Go to terminal -> New terminal (If you are using VS code)
 * Split your terminal into two (run the backend on one terminal and the frontend on the other terminal).
 
## How to use 
### In the first terminal
bash
> git clone https://github.com/advanced-computer-lab-2023/DOCgpt-Pharmacy.git
> git checkout sprint3start
> cd backend/
> cd backend/npm init
> cd backend/npm install
> cd backend/tsc
> cd backend/npm run dev

### In the second terminal
bash
> cd frontend/
> cd frontend/npm init
> cd frontend/npm install
> cd frontend/npm start


### Environment Variables 

PORT

MONGO_URI

ACCESS_TOKEN_SECRET

REFRESH_TOKEN_SECRET

STRIPE_SECRET_KEY

## Code Example :computer:
---
typescript

export const getAllPrescriptionsDoctor = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenDB = await tokenModel.findOne({ token });
    const username = tokenDB && tokenDB.username;

    // Check if the patient exists
    const doctor = await doctorModel.findOne({ username });
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Find all prescriptions for the doctor
    const prescriptions = await Prescription.find({ doctorUsername: username })
      .populate('patientUsername', 'name') // Populate doctor's name if 'doctorUsername' is a reference
      .select('patientUsername date status Medicines');

    // Filter out prescriptions with empty medicine arrays
    const validPrescriptions = prescriptions.filter((prescription) => prescription.Medicines.length > 0);

    // Construct response with full prescription details
    const prescriptionDetails = validPrescriptions.map((prescription) => ({
      PatientName: prescription.patientUsername, // Replace with just 'doctorUsername' if it's not a reference
      date: prescription.date,
      status: prescription.status,
      medicines: prescription.Medicines,
      _id: prescription._id,
    }));

    // Respond with the detailed prescriptions
    res.json(prescriptionDetails);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch prescriptions for the doctor' });
  }
};

typescript 

export const addOrUpdateDosage = async (req: Request, res: Response) => {
  try {
    const { prescriptionId, medicineName, dosage } = req.body;

    if (!prescriptionId || !medicineName || !dosage) {
      return res.status(400).json({ error: 'Prescription ID, medicine name, and dosage are required' });
    }

    const prescription = await prescriptionModel.findById(prescriptionId);

    if (!prescription) {
      return res.status(404).json({ error: 'Prescription not found' });
    }

    // Check if the medicine is already in the prescription
    const existingMedicine = prescription.Medicines.find(
      (medicine) => medicine.medicineName === medicineName
    );

    if (existingMedicine) {
      // Update dosage if the medicine is already in the prescription
      existingMedicine.dosage = dosage;
    } else {
      // Add the medicine with dosage if it's not in the prescription
      prescription.Medicines.push({ medicineName, dosage });
    }

    // Save the updated prescription
    await prescription.save();

    return res.status(200).json({ message: 'Dosage added/updated successfully', prescription });
  } catch (error) {
    console.error('Error adding/updating dosage:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

typescript 

export const sendRequestFollowUp = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenDB = await tokenModel.findOne({ token });

    let username: string;
    if (tokenDB) {
      username = tokenDB.username;
    } else {
      return res.status(404).json({ error: 'Username not found' });
    }

    const {
      Appointmentstatus,
      doctor,
      patient,
      AppointmentDate,
      type,
      price,
      paid,
      scheduledBy,
      followUpDate,
    } = req.body;

    const followUpRequest = await requestModel.create({
      Appointmentstatus,
      doctor,
      patient,
      AppointmentDate,
      type,
      price,
      paid,
      scheduledBy,
      status: 'pending',
      followUpDate,
      requestedBy: username,
    });

    res.status(200).json({ followUpRequest });
  } catch (error) {
    console.error('Error handling file remove:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

typescript

export const subscribeToHealthPackageForFamily = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenDB = await tokenModel.findOne({ token });
    const username = tokenDB && tokenDB.username;
    const { packageName, familyMemberName, paymentMethod } = req.body;

    if (!username || !packageName || !familyMemberName || !paymentMethod) {
      return res
        .status(400)
        .json({ error: 'Username, package name, and family member username are required' });
    }

    // Find the patient by username
    const patient = await patientModel.findOne({ username });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Check if the patient has family members
    if (patient.familyMembers && patient.familyMembers.length > 0) {
      const familyMember = patient.familyMembers.find((member) => member.name === familyMemberName);

      if (!familyMember) {
        return res.status(404).json({ error: 'Family member not found' });
      }

      // Find the health package by name
      const healthPackage = await packageModel.findOne({ name: packageName });

      if (!healthPackage) {
        return res.status(404).json({ error: 'Health package not found' });
      }

      if (!familyMember.healthPackageSubscription) {
        familyMember.healthPackageSubscription = [];
      }
      const isSubscribed = familyMember.healthPackageSubscription.some(
        (subscription) => subscription.name === packageName && subscription.status === 'subscribed'
      );

      if (isSubscribed) {
        return res.status(400).json({ error: 'Patient is already subscribed to this package' });
      }

      const price = await calcTotal(healthPackage.feesPerYear, username);
      const subscriptionCost = price;

      if (paymentMethod === 'creditCard') {
        const sessionUrl = await creditPayment(req, res, subscriptionCost);

        if (!sessionUrl) {
          return res.status(500).json({ error: 'Failed to create payment session' });
        }

        const newDate = new Date();
        const endDate = new Date(newDate);
        endDate.setFullYear(newDate.getFullYear() + 1);

        familyMember.healthPackageSubscription.push({
          name: packageName,
          startdate: newDate.toISOString(),
          enddate: endDate.toISOString(),
          status: 'subscribed',
          payedBy: username,
        });

        const familyMemberUsername = familyMember.username;
        if (!familyMemberUsername)
          return res
            .status(404)
            .json({ error: 'No family members found for this patient' });

        await subscribeFamAsPatient(familyMemberUsername, packageName);
        await patient.save();

        return res
          .status(201)
          .json({ message: 'Health package subscribed successfully', patient, sessionUrl });
      } else {
        if (patient.walletBalance < subscriptionCost) {
          return res.status(400).json({ error: 'Insufficient funds in the wallet' });
        } else {
          // Deduct the cost from the wallet balance
          patient.walletBalance -= subscriptionCost;
          const newDate = new Date();
          const endDate = new Date(newDate);
          endDate.setFullYear(newDate.getFullYear() + 1);

          familyMember.healthPackageSubscription.push({
            name: packageName,
            startdate: newDate.toISOString(),
            enddate: endDate.toISOString(),
            status: 'subscribed',
            payedBy: username,
          });

          const familyMemberUsername = familyMember.username;
          if (!familyMemberUsername)
            return res
              .status(404)
              .json({ error: 'No family members found for this patient' });

          subscribeFamAsPatient(familyMemberUsername, packageName);
        }
      }
      await patient.save();

      return res
        .status(201)
        .json({ message: 'Health package subscribed successfully for family member', patient });
    } else {
      return res.status(404).json({ error: 'No family members found for this patient' });
    }
  } catch (error) {
    console.error('Error subscribing to health package for family member:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

typescript

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
              name: 'Appoitment ',
            },
            unit_amount: 100,
          },
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:3000/login',
      cancel_url: 'http://localhost:3000/login',
    });
    res.json({ url: session.url });
  } catch (e: any) {
    console.log(process.env.STRIPE_SECRET_KEY);
    res.status(500).json({ error: e.message });
  }
};

typescript

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const { notificationId } = req.body;

    // Check if the prescription ID is provided
    if (!notificationId) {
      return res.status(400).json({ error: 'notification ID is required.' });
    }
    // Find the prescription by ID
    const notification = await notificationtModel.findById(notificationId);

    // Check if the prescription exists
    if (!notification) {
      return res.status(404).json({ error: 'notification not found.' });
    }

    // Update the prescription status
    if (notification.read == false) {
      notification.read = true;
    }
    // Save the updated prescription
    await notification.save();

    // Respond with the updated prescription
    res.json({ message: 'notification status updated successfully.', notification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

typescript

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new Error('SECRET_ACCESS_TOKEN is not defined in the environment.');
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err: jwt.JsonWebTokenError | null, user: any) => {
      if (err) {
        return res.status(403).json({ message: 'Token is not valid' });
      }

      const tokenDB = await tokenModel.findOne({ token });

      if (!tokenDB) {
        return res.status(404).json({ message: 'Token not found' });
      }

      const admin = await adminModel.findOne({ username: tokenDB.username });

      if (!admin) {
        return res.status(404).json({ message: 'admin not found' });
      }

      const isPasswordValid = await bcrypt.compare(currentPassword, admin.password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }

      // Validate the new password using the validatePassword function
      if (!validatePassword(newPassword)) {
        return res.status(400).json({ message: 'Invalid new password' });
      }

      // Hash and update the new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      admin.password = hashedNewPassword;
      await admin.save();

      return res.status(200).json({ message: 'Password changed successfully' });
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

typescript (React)

const handleLogout = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch("/routes/doctors/logoutDoctor", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the user's token
      },
    });

    if (response.ok) {
      // Handle successful logout (e.g., clear local storage, redirect user)
      console.log("User logged out successfully");
      localStorage.removeItem("authToken");

      navigate("/"); // Redirect to your login page
    } else {
      // Handle errors during logout
      console.error("Logout failed");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
  <MenuItem onClick={handleLogout}>
    <span style={{ color: "black", marginRight: "5px" }}>
      <Icon>
        <LogoutRoundedIcon />
      </Icon>
    </span>
    Logout
  </MenuItem>
</Menu>;

typescript (React)

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DrPrescription from '../../components/DrPrescription';
import DrawerAppBar from '../../components/Doctor bar/doctorBar';
import { Grid, Typography } from '@mui/material';
import El7a2niInfo from '../../components/El7a2ni-info';
import Background from '../../Prescriptions.jpeg';
import Back from '../../components/backButton';

interface Medicine {
  medicineName: string;
  dosage: string;
  quantity: number;
  _id: string;
}

interface Prescription {
  PatientName: string;
  date: string;
  status: string;
  medicines: Medicine[];
  _id: string;
}

const DrPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('/routes/getAllPrescriptionsDoctor', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Replace with your authentication token
          },
        });
        console.log(response.data);
        setPrescriptions(response.data);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };

    fetchPrescriptions();
  }, []); // Empty dependency array to run the effect once on component mount

  return (
    <>
      <DrawerAppBar />
      <div
        style={{
          position: 'relative',
          backgroundImage: `url(${Background})`,
          backgroundSize: 'cover',
          minHeight: '50vh',
          marginBottom: '100px',
          backgroundPosition: 'center',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Transparent overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        ></div>

        <Back />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'white',
          }}
        >
          <h1>
            <strong>PRESCRIPTIONS</strong>
          </h1>
        </div>
      </div>
      <Back />
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {prescriptions.slice().reverse().map((prescription, index) => (
          <Grid item key={index}>
            <DrPrescription prescription={prescription} />
          </Grid>
        ))}
      </Grid>
      <El7a2niInfo />
    </>
  );
};

export default DrPrescriptions;


## API References 
<summary>Admin Routes</summary>
<details>
GET /routes/admins/viewAdmin

POST /routes/admins/addAdmin

DELETE /routes/admins/delete

DELETE /routes/admins/deletepatient

DELETE /routes/admins/deletedoc

GET /routes/admins/doctor

POST /routes/admins/addPackage

DELETE /routes/admins/deletePa

DELETE /routes/admins/deleteHealthPackage

PATCH /routes/admins/updatePackage

GET /routes/admins/getpack

GET /routes/admins/getpackname

GET /routes/admins/getdoc

GET /routes/admins/getpati

DELETE /routes/admins/logoutAdmin

POST /routes/admins/changePassAdmin



</details>

<summary>Doctor Routes</summary>
<details>
GET /routes/doctors/

GET /routes/doctors/getDoctor

GET /routes/doctors/searchPatient

GET /routes/doctors/viewMyPatients

GET /routes/doctors/viewMyPatientsUsername

GET /routes/doctors/selectPatient

GET /routes/doctors/viewPatientsUpcoming

POST /routes/doctors/docspec

GET /routes/doctors/allMyApp

GET /routes/doctors/upcomingApp

GET /routes/doctors/pastApp

GET /routes/doctors/appointmentsByDate

GET /routes/doctors/appointmentsByStatus

GET /routes/doctors/todayapp

GET /routes/doctors/HealthRecords

GET /routes/doctors/HealthRecord

PATCH /routes/doctors/HealthRecord/comments

GET /routes/doctors/hhi

POST /routes/doctors/postDoctor

POST /routes/doctors/addHealthRecord

PATCH /routes/doctors/updateEmail

PATCH /routes/doctors/updateRate

PATCH /routes/doctors/updateAffiliation

POST /routes/doctors/addprescription

POST /routes/doctors/followup

PATCH /routes/doctors/addtimeslot

GET /routes/doctors/getSlots

PATCH /routes/doctors/removetimeslot

GET /routes/doctors/sessionPrice

GET /routes/doctors/viewWalletAmount

DELETE /routes/doctors/logoutDoctor

POST /routes/doctors/changePassDoc

GET /routes/doctors/pendingDoctors

PATCH /routes/doctors/acceptRequest

PATCH /routes/doctors/rejectRequest

PATCH /routes/doctors/removedoc

POST /routes/doctors/checkcontract

POST /routes/doctors/contactseen

POST /routes/doctors/upload

POST /routes/doctors/getDoctorDocuments

POST /routes/doctors/downloadDocument

POST /routes/doctors/rescheduleApp

PATCH /routes/doctors/acceptFollowUpRequest

PATCH /routes/doctors/rejectFollowUpRequest

POST /routes/doctors/addOrUpdateDosage

PATCH /routes/doctors/updateUnfilledPrescription

GET /routes/doctors/viewRequests

GET /routes/doctors/getDoctorByUsername

</details>

<summary>Patient Routes</summary>
<details>

GET /routes/patient/getP

PUT /routes/patient/addfammember

GET /routes/patient/verifyToken

POST /routes/patient/postP

GET /routes/patient/getPatient

GET /routes/patient/viewFam

GET /routes/patient/getPatientprescriptions

GET /routes/patient/doctors

GET /routes/patient/doctors/search

GET /routes/patient/doctors/filter

GET /routes/patient/doctors/view

GET /routes/patient/doctors/select

GET /routes/patient/getMyAppointments

GET /routes/patient/pastApp

GET /routes/patient/upcomingApp

GET /routes/patient/getAppByDate

GET /routes/patient/getAppByStatus

GET /routes/patient/getpatientdocnames

GET /routes/patient/healthRecord

GET /routes/patient/viewHealthPackage

DELETE /routes/patient/logoutPatient

POST /routes/patient/changePassPatient

PATCH /routes/patient/linkFamilyMember

GET /routes/patient/viewWalletAmount

GET /routes/patient/getTodApp

PATCH /routes/patient/uploadDocs

GET /routes/patient/patientDocument/:filename

PATCH /routes/patient/deleteDocs

PATCH /routes/patient/rescheduleAppointments

GET /routes/patient/viewFamAppointments

POST /routes/patient/requestFollowUp

POST /routes/patient/calcpatientage

</details>

<summary>Appointment Routes</summary>
<details>

POST /routes/appointments/create

GET /routes/appointments/

GET /routes/appointments/getAll

GET /routes/appointments/appP

PATCH /routes/appointments/completed

POST /routes/appointments/cancelAppointment

POST /routes/appointments/cancelAppointmentDoc

POST /routes/appointments/makeApp

POST /routes/appointments/makeAppForFam

GET /routes/appointments/getAppointmentById

</details>

<summary>appRouter Routes</summary>
<details>
POST /routes/otp/otp

POST /routes/otp/verifyOtp

POST /routes/otp/otpMail

POST /routes/otp/resetPassword

</details>

<summary>Conversation Routes</summary>
<details>

POST /routes/conversation/startConv

GET /routes/conversation/getConv

</details>

<summary>Health Record Routes</summary>
<details>

POST /routes/healthRecord/

</details>

<summary>Message Routes</summary>
<details>

POST /routes/messages/addMessage

GET /routes/messages/getMessages/:conversationId

GET /routes/messages/getLastMessage

</details>

<summary>Notification Routes</summary>
<details>
GET /routes/notifications/patient

GET /routes/notifications/doctor

GET /routes/notifications/countP

GET /routes/notifications/countD

POST /routes/notifications/mark

</details>


<summary>Payment Routes</summary>
<details>

POST /routes/pay/pay

POST /routes/pay/payp

</details>

<summary>Prescription Routes</summary>
<details>
GET /routes/prescriptions

POST /routes/prescriptions

PUT /routes/prescriptions/:id

GET /routes/viewMedicineNamesInPrescription

GET /routes/getAllPrescriptionsPatient

GET /routes/getPrescriptionDetails

GET /routes/getAllPrescriptionsDoctor/

POST /routes//addMedTopresc/:prescriptionId

POST /routes/addToCart

POST /routes/changeStatus

DELETE /routes/deleteMedPresc/:prescriptionId

PUT /routes/updatePrescMed/:prescriptionId

POST /routes/checkmedicineexists

DELETE /routes/removeMedFromPresc

PUT /routes/updateMedicineInPrescription/:id

</details>

<summary>Subscription Routes</summary>
<details>

POST /routes/subscribeToHealthPackage

POST /routes/subscribeToHealthPackageForFamily

GET /routes/viewSubscribedPackages

GET /routes/viewHealthPackageStatus

GET /routes/getSubscribedPackagesForMember

PATCH /routes/cancelSubscription

PATCH /routes/cancelSubscriptionfam

GET /routes/viewFamMemberPackages

GET /routes/getdisc/:username

</details>
