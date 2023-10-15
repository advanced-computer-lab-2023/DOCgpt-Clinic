import mongoose, { Document, Model, Schema } from 'mongoose';
import patientModel from './patientModel';

export const healthRecordSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "patient"        
    },
    MedicalHistory: {
        Allergies:  {
            type: String,
            required: false
        },
        PastMedicalConditions: {
            type: String,
            required: false
        }
    },
    MedicationList: {
        CurrentMedications: {
            type: String,
            required: false
        },
        PastMedications: {
            type: String,
            required: false
        } 
    },
    VitalSigns:{
        BloodPressure: {
            type: Number,
            required: false
        },
        HeartRate: {
            type: Number,
            required: false
        }
    }
});

const healthRecordModel = mongoose.model('healthRecord', healthRecordSchema);


export default healthRecordModel;