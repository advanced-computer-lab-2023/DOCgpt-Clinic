// This is a TypeScript file

// Import the required modules
import dotenv from 'dotenv';
import adminModel from './models/adminModel';
import express from 'express'
import mongoose from 'mongoose'
import PatientRoutes from './routes/patient'
import DoctorRoutes from './routes/doctor'
import PrescriptionRoutes from './routes/prescription'
import adminrouter from './routes/admin';
import appointment from './routes/appointment'
import Healthrecords from './routes/healthRecord'



require('dotenv').config();
// Express app
const app: express.Application = express()

// Middleware
app.use(express.json())

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('Request received for', req.path) 
  console.log(req.path, req.method)
  next()
})

// Routes
app.use('/routes/patient',  PatientRoutes);
app.use('/routes/doctors',  DoctorRoutes);
app.use('/routes',  PrescriptionRoutes);
app.use('/routes/admins',  adminrouter);
app.use('/routes/appointments',  appointment);
app.use('/routes/healthRecord', Healthrecords);


console.log('Routes mounted!')


// Connect to the database
mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('Connected to database')

    // Listen to the port
    app.listen(process.env.PORT, () => {
      console.log(`Listening for requests on port ${process.env.PORT}`)
    })
  })
  .catch((err) => {
    console.log(err)
  })
