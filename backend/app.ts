import express,{ Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
const app = express();
import adminrouter from './routes/admin';
import dotenv from 'dotenv';
import patientrouter from './routes/patient'

// Load environment variables from .env file
dotenv.config();




const mongooseUrl = process.env.MONGO_URI ?? 'defaultConnection';
// Middleware to parse JSON requests
app.use(express.json());


// Middleware to log request path and method
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.path, req.method);
  next();
});

//express app
app.use('/routes',adminrouter);
app.get('/routes',adminrouter);
app.use('/routes',patientrouter);
app.get('/routes',patientrouter);

// Define a POST route
app.post('/api/posts', (req: Request, res: Response) => {
  // Handle the POST request here
  const postData = req.body;
  // Process the postData and send a response

  res.json({mssg:'welcome'});
  res.json({ message: 'POST request received', data: postData });
 
});


mongoose.connect(mongooseUrl).then(()=> {app.listen(process.env.PORT, ( ) => {
  console.log("listenining on port",process.env.PORT)
   })})
.catch(
  (error) => {
      console.log(error)
    }
)
require('dotenv').config();
;





app.get('/',(req: Request, res: Response) =>{
    res.json(`welcome`);
});
// Start the server
























;