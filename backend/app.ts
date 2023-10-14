import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import DoctorModel from "./models/doctorModel";
import DoctorRouter from "./routes/doctor";
import PatientRouter from "./routes/patient";
import AppointmentRouter from "./routes/appointment";
import HealthRecordRouter from "./routes/healthRecord";


const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/api/doctors", DoctorRouter);
app.use("/api/appointment", AppointmentRouter);
app.use("/routes/patients", PatientRouter);
app.use("/routes/healthRecord", HealthRecordRouter);


mongoose.connect(process.env.MONGO_URI as string)
.then(() => {
    console.log("MONGOOSE CONNECTED!!!");
    app.listen(port, () => {
        console.log("Server running on port: " + port);    
    });
    
})

.catch(console.error);
