
import dotenv from 'dotenv';
import adminModel from './models/adminModel';
import patientModel from './models/patientModel';
import doctorModel from './models/doctorModel'


import mongoose from 'mongoose'
import PatientRoutes from './routes/patient'
import DoctorRoutes from './routes/doctor'
import PrescriptionRoutes from './routes/prescription'
import adminrouter from './routes/admin';
import appointment from './routes/appointment'
import Healthrecords from './routes/healthRecord'
import subscriptionRoute from './routes/subscriptionRoute'
import { createToken } from './controllers/patientController';
import tokenModel from './models/tokenModel';
import  Approuter from '../backend/routes/appRouter';
import bcrypt from 'bcrypt';
import express, { Request, Response ,NextFunction } from 'express';
import Payment from './routes/payment'
import Stripe from 'stripe';


require('dotenv').config();
// Express app
const app= express()

// Middleware
app.use(express.json())

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('Request received for', req.path) 
  console.log(req.path, req.method)
  next()
})

// app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
//   req.app.locals = {
//     OTP : null,
//     resetSession : false
// }
// next()
// })

// Routes
app.use('/routes/patient',  PatientRoutes);
app.use('/routes/doctors',  DoctorRoutes);
app.use('/routes',  PrescriptionRoutes);
app.use('/routes/admins',  adminrouter);
app.use('/routes/appointments',  appointment);
app.use('/routes/healthRecord', Healthrecords);
app.use('/routes/otp',Approuter);
app.use('/routes', subscriptionRoute);
app.use('/routes/pay',Payment);



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


  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
if (!process.env.STRIPE_SECRET_KEY)
 throw new Error('process.env.STRIPE_SECRET_KEY not found');

 export const login=async (req:Request, res:Response) => {
  console.log("Received login request:", req.body);

  try{
     const {username , password}=req.body
     if(!username || !password){
      throw Error ('all fields must be filled')
     }
     const usernameExists=await patientModel.findOne({username});
    const usernameExists2=await doctorModel.findOne({username});
    const usernameExists3=await adminModel.findOne({username});
     var user;
     var role;
    

     if(usernameExists){
        user=await patientModel.findOne( {username});
        role='patient';
     }
     if(usernameExists2){
      user=await doctorModel.findOne({username});
      role='doctor';
   }
   if(usernameExists3){
    user=await adminModel.findOne({username});
    role='admin';
 }

  if(user==null){
    throw Error('no user found');
  }
  if(role=='doctor' && usernameExists2?.status=="pending"){
    throw Error('your request is still pending');
  }

  if(role=='doctor' && usernameExists2?.status=="rejected"){
    throw Error('your request to join the platform is rejected from the adminstrator');
  }

     const match=await bcrypt.compare(password,user.password)

     if(!match){
      throw Error('incorrect password')
     }
     const token = createToken(user.id);
     const tokenn = await tokenModel.create({token,username,role:role})
     console.log("Received login succes");
        req.app.locals.username=username
     res.status(200).json({user,token,role})}

     catch(error){
      const err = error as Error;
      res.status(400).json({ error: err.message });
     }
}


  
  const storeItems= new Map([
    [1, { priceInCents: 1000, name: "Appointment" }],
  ]);
  
  // app.post("/create-checkout-session", async (req: Request, res: Response) => {
  //   try {
  //     const session = await stripe.checkout.sessions.create({
  //       payment_method_types: ["card"],
  //       mode: "payment",
  //       line_items: [
  //         {
  //           price_data: {
  //             currency: "EGP",
  //             product_data: {
  //               name: "Appoitment ",
  //             },
  //             unit_amount: 10000,
  //           },
  //           quantity: 1,
          
  //     }],
  //       success_url: `http://localhost:3000/login`,
  //       cancel_url: `http://localhost:3000/login`,
  //     });
  //     res.json({ url: session.url });
  //   } catch (e: any) {
  //     res.status(500).json({ error: e.message });
  //   }
  // });

 
  

  import Doctor  from "./models/doctorModel"; // Import the Doctor model



 

  // app.post('/pay',paymenttt)

  app.post('/api/login',login)