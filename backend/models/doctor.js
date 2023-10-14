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
        required: true,
        validate: [validatePassword, 'Password must be at least 8 characters long'],
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
});
function validatePassword(password) {
    return password.length >= 8; // Minimum password length of 8 characters
}
//export default mongoose.model<IDoctor>('Doctor', doctorSchema);
const Doctor = mongoose_1.default.model('Doctor', doctorSchema);
exports.default = Doctor;
// import mongoose, { Document, Model, Schema, modelNames } from 'mongoose';
// const doctorSchema =new mongoose.Schema(
//     {
//         username: {
//             type: String,
//              required: true,
//          },
//          name: {
//            type: String,
//            required: true,
//          },
//           email: {
//            type: String,
//            required: true,
//            match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
//           },
//           password: {
//            type: String,
//            required: true,
//            validate: [validatePassword, 'Password must be at least 8 characters long'],
//            // You may want to add additional password validation logic here
//          },
//          dateofbirth:{
//            type: Date,
//            required: true,
//          },
//          hourlyrate:{
//             type:Number,
//             requied:true
//          },
//          affiliation:{
//             type: String,
//            required: true
//          },
//          educationalBackground:{
//             type: String,
//            required: true
//          }
//     }
// )
// function validatePassword(password: string) {
//     return password.length >= 8; // Minimum password length of 8 characters
//   }
//   const doctorModel = mongoose.model('Doctor', doctorSchema);
// export default doctorModel;
