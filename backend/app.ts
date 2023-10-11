// This is a TypeScript file

// Import the required modules
import dotenv from 'dotenv';

import express from 'express'
import mongoose from 'mongoose'
import PatientRoutes from './routes/patient'
import DoctorRoutes from './routes/doctor'
import PrescriptionRoutes from './routes/prescription'

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
app.use('/routes',  PatientRoutes)
app.get('/routes',PatientRoutes)
app.use('/routes',  DoctorRoutes)
app.get('/routes',DoctorRoutes)
app.use('/routes',  PrescriptionRoutes)
app.get('/routes',PrescriptionRoutes)

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
