import express, { Request, Response, NextFunction } from 'express';
import { config as dotenvConfig } from 'dotenv';
const mongoose = require('mongoose')
import patientRoutes from './routes/patientRoute';
import appointmentRoutes from './routes/appointment';

dotenvConfig();

const app = express();

// Middleware
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.path, req.method);
    next();
});

// Get routes
// app.get('/', (req: Request, res: Response) => {
//     res.json({ mssg: 'welcome to DOCgpt' });
// });
app.use('/routes', patientRoutes);
app.use('/routes/appointments', appointmentRoutes);
app.get('/routes', patientRoutes);




//app.get();

//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    // Listen
// app.listen(4000, () => {
app.listen(process.env.PORT, () => {
    console.log('connected to db & listening on port', process.env.PORT);
});
})
.catch((error: any) => {
    console.log(error)
})

