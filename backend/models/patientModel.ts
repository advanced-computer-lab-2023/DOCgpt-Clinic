import mongoose, { Document, Model, Schema } from 'mongoose';


const prescriptionSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
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

export const patientSchema = new mongoose.Schema({
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
      name:{
       type:String ,
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

  familyMembers:[{ name: {
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
    enum: ['wife','husband','child'],
    required: true,
  },
  healthPackageSubscription: [
    {
      name:{
       type:String ,
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
  ]}],
  walletBalance: {
    type: Number,
    required: true,
    default: 0,
    }
});

function validatePassword(password: string) {
  return password.length >= 8; // Minimum password length of 8 characters
}
 const patientModel = mongoose.model('patient', patientSchema);
  




export default patientModel;


