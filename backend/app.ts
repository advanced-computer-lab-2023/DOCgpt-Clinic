import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import adminrouter from './routes/admin';
import patientrouter from './routes/patient';

const app: Application = express();
const allowedOrigin: string = 'http://localhost:3000';

// Load environment variables from .env file
dotenv.config();

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to log request path and method
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.path, req.method);
  next();
});

// Configure CORS
app.use(
  cors({
    origin: allowedOrigin,
    // Add other CORS configurations if needed
  })
);

// Express app routes
app.use('/routes', adminrouter);
app.use('/routes', patientrouter);

// Define a POST route
app.post('/api/posts', (req: Request, res: Response) => {
  // Handle the POST request here
  const postData = req.body;
  // Process the postData and send a response
  res.json({ message: 'POST request received', data: postData });
});

// Connect to MongoDB and start the server
const mongooseUrl = process.env.MONGO_URI ?? 'defaultConnection';
mongoose.connect(mongooseUrl)
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log("Listening on port", port);
    });
  })
  .catch((error) => {
    console.error(error);
  });

// Define a default route
app.get('/', (req: Request, res: Response) => {
  res.json(`Welcome`);
});

export default app;