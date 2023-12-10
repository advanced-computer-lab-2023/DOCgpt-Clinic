import mongoose, { Document, Model, Schema } from 'mongoose';



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
    enum:[
    'rejected',
      'accepted',
      'pending'
    ],
    default: 'pending'

},
documents: [
  {
    filename: String, // The name of the uploaded file
    path: String,     // The local path where the file is saved
  },
],
walletBalance: {
  type: Number,
  required: true,
  default: 0,
  },
  hasSeenContract:{
    type:Boolean,
    required: false,
    default:false
  }

});





const doctorModel= mongoose.model('Doctor', doctorSchema);

export default doctorModel;