import mongoose, { Document, Model, Schema } from 'mongoose';


export const requestSchema = new mongoose.Schema({
    Appointmentstatus: {
        type: String,
        enum: ['upcoming', 'completed', 'cancelled', 'rescheduled'],
        required: false
    },
    doctor: {
        type: String,
        required: true
    },
    patient: {
        type: String,
        required: true
    },
    AppointmentDate:{  //old appoitment date
        type: Date,
        required: true
    },
    type:{
        type: String,
        enum: ['Regular', 'Follow up'],
        required: false
    },
    price: {
        type: Number,
        default: 10,
        required: false,
      },
      paid: {
        type: Boolean,
        default: false, 
        required: false,
      },
      scheduledBy:{
        type: String,
        required: false,
      },
      status:{
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        required: false
      },
      followUpDate:{
        type: Date,
        required: false
      },
      requestedBy:{
        type: String,
        required: false,
      }
  });

const requestModel= mongoose.model('request', requestSchema);

export default requestModel;