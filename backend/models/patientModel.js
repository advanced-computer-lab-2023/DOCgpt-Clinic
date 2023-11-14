"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const prescriptionSchema = new mongoose_1.default.Schema({
    doctorId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    filled: {
        type: Boolean,
        default: false,
    },
});
exports.patientSchema = new mongoose_1.default.Schema({
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
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other'],
        default: 'male',
        // Add appropriate values based on your application
    },
    password: {
        type: String,
        required: true,
        validate: [validatePassword, 'Password must be at least 8 characters long'],
    },
    dateofbirth: {
        type: Date,
        required: true,
    },
    mobilenumber: {
        type: String,
        required: true,
    },
    emergencyContact: {
        fullName: String,
        mobileNumber: String,
        relation: String,
    },
    healthPackageSubscription: [
        {
            name: {
                type: String,
                required: true,
            },
            startdate: {
                type: String,
                required: false,
            },
            enddate: {
                type: String,
                required: false,
            },
            status: {
                type: String,
                enum: ['subscribed with renewal date', 'unsubscribed', 'cancelled with end date'],
                required: true,
            },
        },
    ],
    familyMembers: [{ name: {
                type: String,
                required: true,
            },
            nationalId: {
                type: String,
                // required: true,
            },
            username: {
                type: String,
                // required: true,
            },
            age: {
                type: Number,
                required: true,
            },
            gender: {
                type: String,
                required: true,
            },
            relationToPatient: {
                type: String,
                enum: ['wife', 'husband', 'child'],
                required: true,
            },
            healthPackageSubscription: [
                {
                    name: {
                        type: String,
                        required: true,
                    },
                    startdate: {
                        type: String,
                        required: false,
                    },
                    enddate: {
                        type: String,
                        required: false,
                    },
                    status: {
                        type: String,
                        enum: ['subscribed with renewal date', 'unsubscribed', 'cancelled with end date'],
                        required: true,
                    },
                },
            ] }],
    walletBalance: {
        type: Number,
        required: true,
        default: 2000,
    }
});
function validatePassword(password) {
    return password.length >= 8; // Minimum password length of 8 characters
}
const patientModel = mongoose_1.default.model('patient', exports.patientSchema);
exports.default = patientModel;
