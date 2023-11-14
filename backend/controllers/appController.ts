import otpGenerator from 'otp-generator';
import { Request, Response } from 'express';
import { sendOTPByEmail } from './nodemailer';
import patientModel from '../models/patientModel';
import Doctor from '../models/doctorModel';
import adminModel from '../models/adminModel';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken';
import tokenModel from '../models/tokenModel';

export const generateOTP = async (req: Request, res: Response) => {
  const OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  req.app.locals.OTP = OTP;
  // res.status(201).json({ code: OTP });
};

export const verifyOTP = async (req: Request, res: Response) => {
  const code = req.query.code;
  if (parseInt(req.app.locals.OTP) === parseInt(code + '')) {
    req.app.locals.OTP = null;
    req.app.locals.resetSession = true;
    return res.status(201).send({ msg: 'Verify Successfully!' });
  }
  return res.status(400).send({ error: 'Invalid OTP' });
};

export const SendResetmail = async (req: Request, res: Response) => {
  const email = req.body.email as string;
  const isValidMail = validateEmail(email);

  if (!isValidMail) {
    return res.status(400).send({ error: 'Please enter a correct Gmail' });
  }

  const usernameExists = await patientModel.findOne({ email });
  const usernameExists2 = await Doctor.findOne({ email });
  const usernameExists3 = await adminModel.findOne({ email });

  if (!usernameExists && !usernameExists2 && !usernameExists3) {
    return res.status(404).send({ error: 'No user with this email' });
  }

  const OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  req.app.locals.OTP = OTP;  
  console.log(OTP);
  const text = `Your OTP is: ${OTP}`;
  const subject = 'Reset Forgotten Password';
  const sent = await sendOTPByEmail(email, subject, text);

  res.json({ message: 'OTP sent successfully' });
};

function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


export const resetPassword = async (req: Request, res: Response) => {
  try {
    if (!req.app.locals.resetSession) {
      return res.status(403).json({ message: 'Access denied' });
    }
    const username=req.body.username;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;
 
    let user;

    const doctor = await Doctor.findOne({username:username });
    const patient = await patientModel.findOne({ username:username });

    if (doctor) {
      user = doctor;
    } else {
      user = patient;
    }

    if (!user) {
      throw Error('No user found');
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'New password and confirm password do not match' });
    }

    if (!validatePassword(newPassword)) {
      return res.status(400).json({ message: 'Invalid new password' });
    }

    // Hash and update the new password
    const hashedNewPassword = await bcrypt.hash(newPassword + '', 10);

    user.password = hashedNewPassword;
    await user.save();
    req.app.locals.resetSession=false;
    return res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


function validatePassword(password: any) {
  // Minimum password length of 8 characters
  if (password.length < 8) {
    return false;
  }

  // Regular expression pattern to check for at least one capital letter and one number
  const pattern = /^(?=.[A-Z])(?=.\d)/;

  // Use the test method to check if the password matches the pattern
  if (!pattern.test(password)) {
    return false;
  }

  // All requirements are met
  return true;
}