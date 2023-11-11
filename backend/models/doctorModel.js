"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const doctorSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    },
    password: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    hourlyRate: {
        type: Number,
        required: true,
    },
    affiliation: {
        type: String,
        required: true,
    },
    speciality: {
        type: String,
        required: true,
    },
    educationalBackground: {
        type: String,
        required: true,
    },
    timeslots: [
        {
            date: {
                type: Date,
                required: false,
            },
        },
    ],
    status: {
        type: String,
        enum: [
            'rejected',
            'accepted',
            'pending'
        ],
        default: 'pending'
    },
    documents: [
        {
            filename: String,
            path: String, // The local path where the file is saved
        },
    ],
    walletBalance: {
        type: Number,
        required: true,
        default: 0,
    }
});
const Doctor = mongoose_1.default.model('Doctor', doctorSchema);
exports.default = Doctor;
