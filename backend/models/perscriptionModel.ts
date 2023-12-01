
import mongoose, { Document, Model, Schema } from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
  doctorUsername: {
    type: String,
    required: true,
  },
  patientUsername: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default:"unfilled",
  },
  Medicines: [
    {
      medicineName:{
       type:String ,
       required: false,

      },
      dosage: {
        type: Number,
        required: false,
      },
      quantity: {
        type: Number,
        required: false,
      },
    },
  ],
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);
export default Prescription;