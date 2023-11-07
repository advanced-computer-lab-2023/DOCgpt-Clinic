"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const adminModel_1 = __importDefault(require("./models/adminModel"));
const patientModel_1 = __importDefault(require("./models/patientModel"));
const doctorModel_1 = __importDefault(require("./models/doctorModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const patient_1 = __importDefault(require("./routes/patient"));
const doctor_1 = __importDefault(require("./routes/doctor"));
const prescription_1 = __importDefault(require("./routes/prescription"));
const admin_1 = __importDefault(require("./routes/admin"));
const appointment_1 = __importDefault(require("./routes/appointment"));
const healthRecord_1 = __importDefault(require("./routes/healthRecord"));
const patientController_1 = require("./controllers/patientController");
const tokenModel_1 = __importDefault(require("./models/tokenModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = __importDefault(require("express"));
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
app.use('/routes/patient', patient_1.default);
app.use('/routes/doctors', doctor_1.default);
app.use('/routes', prescription_1.default);
app.use('/routes/admins', admin_1.default);
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
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            throw Error('all fields must be filled');
        }
        const usernameExists = yield patientModel_1.default.findOne({ username });
        const usernameExists2 = yield doctorModel_1.default.findOne({ username });
        const usernameExists3 = yield adminModel_1.default.findOne({ username });
        var user;
        var role;
        //  if(! patient){
        //   throw Error ('invalid username')
        //  }
        if (usernameExists) {
            user = yield patientModel_1.default.findOne({ username });
            role = 'patient';
        }
        if (usernameExists2) {
            user = yield doctorModel_1.default.findOne({ username });
            role = 'doctor';
        }
        if (usernameExists3) {
            user = yield adminModel_1.default.findOne({ username });
            role = 'admin';
        }
        if (user == null) {
            throw Error('no user found');
        }
        const match = yield bcrypt_1.default.compare(password, user.password);
        if (!match) {
            throw Error('incorrect password');
        }
        const token = (0, patientController_1.createToken)(user.id);
        const tokenn = yield tokenModel_1.default.create({ token, username, role: role });
        res.status(200).json({ user, token });
    }
    catch (error) {
        const err = error;
        res.status(400).json({ error: err.message });
    }
});
exports.login = login;
app.get('/api/login', exports.login);