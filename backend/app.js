"use strict";
// This is a TypeScript file
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const patient_1 = __importDefault(require("./routes/patient"));
const doctor_1 = __importDefault(require("./routes/doctor"));
const prescription_1 = __importDefault(require("./routes/prescription"));
const admin_1 = __importDefault(require("./routes/admin"));
const appointment_1 = __importDefault(require("./routes/appointment"));
const healthRecord_1 = __importDefault(require("./routes/healthRecord"));
require('dotenv').config();
// Express app
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log('Request received for', req.path);
    console.log(req.path, req.method);
    next();
});
// Routes
app.use('/routes', patient_1.default);
app.use('/routes/doctors', doctor_1.default);
app.use('/routes', prescription_1.default);
app.use('/routes', admin_1.default);
app.use('/routes/appointments', appointment_1.default);
app.use('/routes/healthRecord', healthRecord_1.default);
console.log('Routes mounted!');
// Connect to the database
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => {
    console.log('Connected to database');
    // Listen to the port
    app.listen(process.env.PORT, () => {
        console.log(`Listening for requests on port ${process.env.PORT}`);
    });
})
    .catch((err) => {
    console.log(err);
});
