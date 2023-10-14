"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
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
        type: Number,
        required: true,
    },
    emergencyContact: {
        fullName: String,
        mobileNumber: String,
        relation: String,
    },
    familyMembers: [{ name: {
                type: String,
                required: true,
            },
            nationalId: {
                type: String,
                required: true,
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
            } }]
});
function validatePassword(password) {
    return password.length >= 8; // Minimum password length of 8 characters
}
const patientModel = mongoose_1.default.model('patient', exports.patientSchema);
;
exports.default = patientModel;
