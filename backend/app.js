"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const mongoose = require('mongoose');
const patientRoute_1 = __importDefault(require("./routes/patientRoute"));
const appointment_1 = __importDefault(require("./routes/appointment"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
// Get routes
// app.get('/', (req: Request, res: Response) => {
//     res.json({ mssg: 'welcome to DOCgpt' });
// });
app.use('/routes', patientRoute_1.default);
app.use('/routes/appointments', appointment_1.default);
app.get('/routes', patientRoute_1.default);
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
    .catch((error) => {
    console.log(error);
});
