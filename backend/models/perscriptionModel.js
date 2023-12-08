"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const prescriptionSchema = new mongoose_1.default.Schema({
    doctorUsername: {
        type: String,
        required: true,
    },
    patientUsername: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        default: "unfilled",
    },
    Medicines: [
        {
            medicineName: {
                type: String,
                required: false,
            },
            dosage: {
                type: Number,
                required: false,
            },
            quantity: {
                type: Number,
                required: false,
            },
        },
    ],
});
const Prescription = mongoose_1.default.model('Prescription', prescriptionSchema);
exports.default = Prescription;
