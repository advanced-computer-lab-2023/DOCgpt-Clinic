import mongoose, { Document, Model, Schema } from 'mongoose';

enum DoctorStatus {
  Rejected = 'rejected',
  Accepted = 'accepted',
  Pending = 'pending',
}

const doctorSchema: Schema = new mongoose.Schema({
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
    enum: Object.values(DoctorStatus),
    default: DoctorStatus.Pending,
},
});

function validatePassword(password: string) {
  return password.length >= 8; // Minimum password length of 8 characters
}

export interface IDoctor extends Document {
  username: string;
  name: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  hourlyRate: number;
  affiliation: string;
  speciality: string;
  educationalBackground: string;
  timeslots: Array<{
    date: Date;
  
  }>;
  status: DoctorStatus;
}

const Doctor: Model<IDoctor> = mongoose.model<IDoctor>('Doctor', doctorSchema);

export default Doctor;