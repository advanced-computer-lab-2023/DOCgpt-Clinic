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
exports.payWithCredit = exports.paymenttt = exports.login = void 0;
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
const subscriptionRoute_1 = __importDefault(require("./routes/subscriptionRoute"));
const patientController_1 = require("./controllers/patientController");
const tokenModel_1 = __importDefault(require("./models/tokenModel"));
const appRouter_1 = __importDefault(require("../backend/routes/appRouter"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = __importDefault(require("express"));
const payment_1 = __importDefault(require("./routes/payment"));
const stripe_1 = __importDefault(require("stripe"));
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
// app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
//   req.app.locals = {
//     OTP : null,
//     resetSession : false
// }
// next()
// })
// Routes
app.use('/routes/patient', patient_1.default);
app.use('/routes/doctors', doctor_1.default);
app.use('/routes', prescription_1.default);
app.use('/routes/admins', admin_1.default);
app.use('/routes/appointments', appointment_1.default);
app.use('/routes/healthRecord', healthRecord_1.default);
app.use('/routes/otp', appRouter_1.default);
app.use('/routes', subscriptionRoute_1.default);
app.use('/routes/pay', payment_1.default);
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
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
if (!process.env.STRIPE_SECRET_KEY)
    throw new Error('process.env.STRIPE_SECRET_KEY not found');
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Received login request:", req.body);
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
        if (role == 'doctor' && (usernameExists2 === null || usernameExists2 === void 0 ? void 0 : usernameExists2.status) == "pending") {
            throw Error('your request is still pending');
        }
        if (role == 'doctor' && (usernameExists2 === null || usernameExists2 === void 0 ? void 0 : usernameExists2.status) == "rejected") {
            throw Error('your request to join the platform is rejected from the adminstrator');
        }
        const match = yield bcrypt_1.default.compare(password, user.password);
        if (!match) {
            throw Error('incorrect password');
        }
        const token = (0, patientController_1.createToken)(user.id);
        const tokenn = yield tokenModel_1.default.create({ token, username, role: role });
        console.log("Received login succes");
        req.app.locals.username = username;
        res.status(200).json({ user, token, role });
    }
    catch (error) {
        const err = error;
        res.status(400).json({ error: err.message });
    }
});
exports.login = login;
const storeItems = new Map([
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
const doctorModel_2 = __importDefault(require("./models/doctorModel")); // Import the Doctor model
const paymenttt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { doctorUsername, paymentMethod, sessionPrice } = req.body; // Extract doctor username and payment method from the request body
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const tokenDB = yield tokenModel_1.default.findOne({ token });
        var patientUsername;
        console.log(tokenDB);
        if (tokenDB) {
            patientUsername = tokenDB.username;
        }
        const patient = yield patientModel_1.default.findOne({ username: patientUsername });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        // Find the doctor and patient based on their usernames
        const doctor = yield doctorModel_2.default.findOne({ username: doctorUsername });
        if (!doctor) {
            res.status(404).json({ error: "Doctor not found" });
            return;
        }
        if (!patient) {
            res.status(404).json({ error: "Patient not found" });
            return;
        }
        const price = sessionPrice; // Calculate the session price based on the doctor's username
        if (paymentMethod === "wallet") {
            // Check if patient has enough balance in their wallet
            if (patient.walletBalance < price) {
                res.status(400).json({ error: "Insufficient balance in the patient's wallet" });
                return;
            }
            // Deduct the session price from the patient's wallet balance
            patient.walletBalance -= price;
            yield patient.save();
            // Add the session price to the doctor's wallet balance
            doctor.walletBalance += price;
            yield doctor.save();
            res.json({ message: "Payment successful" });
        }
        else if (paymentMethod === "card") {
            (0, exports.payWithCredit)(req, res, price);
            doctor.walletBalance += price;
            yield doctor.save();
        }
        else {
            res.status(400).json({ error: "Invalid payment method" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});
exports.paymenttt = paymenttt;
const payWithCredit = (req, res, sessionPrice) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const session = yield stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "EGP",
                        product_data: {
                            name: "Appoitment ",
                        },
                        unit_amount: 10000,
                    },
                    quantity: 1,
                }
            ],
            success_url: `http://localhost:3000`,
            cancel_url: `http://localhost:3000/login`,
        });
        res.json({ url: session.url });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
});
exports.payWithCredit = payWithCredit;
app.post('/pay', exports.paymenttt);
app.post('/api/login', exports.login);
