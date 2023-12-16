"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payWithCredit = exports.payment = void 0;
const doctorModel_1 = __importDefault(require("../models/doctorModel")); // Import the Doctor model
const patientModel_1 = __importDefault(require("../models/patientModel"));
const stripe_1 = __importDefault(require("stripe"));
const payment = async (req, res) => {
    try {
        const { doctorUsername, paymentMethod } = req.body; // Extract doctor username and payment method from the request body
        // // Get the patient username from the token (assuming it's already implemented)
        // const authHeader = req.headers['authorization'];
        // const token = authHeader && authHeader.split(' ')[1];
        // const tokenDB = await tokenModel.findOne({ token:token }); 
        // var username;
        // if(tokenDB){
        // username=tokenDB.username;
        // }
        // else {
        //   return res.status(404).json({ error: 'username not found' });
        // }
        // Find the patient by ID
        const username = "mohamed";
        const patient = await patientModel_1.default.findOne({ username });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        // Find the doctor and patient based on their usernames
        const doctor = await doctorModel_1.default.findOne({ username: doctorUsername });
        if (!doctor) {
            res.status(404).json({ error: "Doctor not found" });
            return;
        }
        if (!patient) {
            res.status(404).json({ error: "Patient not found" });
            return;
        }
        const sessionPrice = calculateSessionPrice(doctor.hourlyRate); // Calculate the session price based on the doctor's username
        if (paymentMethod === "wallet") {
            // Check if patient has enough balance in their wallet
            if (patient.walletBalance < sessionPrice) {
                res.status(400).json({ error: "Insufficient balance in the patient's wallet" });
                return;
            }
            // Deduct the session price from the patient's wallet balance
            patient.walletBalance -= sessionPrice;
            await patient.save();
            // Add the session price to the doctor's wallet balance
            doctor.walletBalance += sessionPrice;
            await doctor.save();
            res.json({ message: "Payment successful" });
        }
        else if (paymentMethod === "card") {
            (0, exports.payWithCredit)(req, res, sessionPrice);
        }
        else {
            res.status(400).json({ error: "Invalid payment method" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
exports.payment = payment;
function calculateSessionPrice(hourlyRate) {
    return hourlyRate;
}
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
const payWithCredit = async (req, res, sessionPrice) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "EGP",
                        product_data: {
                            name: "Appoitment ",
                        },
                        unit_amount: 100,
                    },
                    quantity: 1,
                }
            ],
            success_url: `http://localhost:3000/login`,
            cancel_url: `http://localhost:3000/login`,
        });
        res.json({ url: session.url });
    }
    catch (e) {
        console.log(process.env.STRIPE_SECRET_KEY);
        res.status(500).json({ error: e.message });
    }
};
exports.payWithCredit = payWithCredit;
