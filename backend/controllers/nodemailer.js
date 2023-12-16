"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAnEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendAnEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            service: "Gmail",
            port: 587,
            secure: false,
            auth: {
                user: "docgpt7@gmail.com",
                pass: "uvmd bdfx iypf flvo",
            },
        });
        await transporter.sendMail({
            from: "docgpt Clinic",
            to: email,
            subject: subject,
            text: text,
        });
        console.log("email sent successfully");
    }
    catch (error) {
        console.log("email not sent!");
        console.log(error);
        return error;
    }
};
exports.sendAnEmail = sendAnEmail;
