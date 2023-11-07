import mongoose, { Document, Model, Schema } from 'mongoose';
import patientModel from './patientModel';

export const healthRecordSchema = new mongoose.Schema({
    patient: {
        type: String,
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
        },
        Comments: {
            type: [String],
            required: false
        } 
    },
    MedicationList: {
        CurrentMedications: {
            Name: {
                type: String,
                required: true
            },
             //IMAGE URL
            Prescription: {
                type: String,
                required: false
            },
            required: false
        },
        PastMedications: {
            Name: {
                type: String,
                required: true
            },
            //IMAGE URL
            Prescription: {
                type: String,
                required: false
            },
            required: false
        },
        Comments: {
            type: [String],
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
        }, 
        Height:{
            type: Number,
            required: false
        },
        Weight: {
            type: Number,
            required: false
        },
        Comments: {
            type: [String],
            required: false
        }
    },
    Laboratory: {
        //IMAGES URI
        BloodTests: {
            type: [String],
            required : false
        },
        XRays: {
            type: [String],
            required : false
        },
        Other: {
            type: [String],
            required: false
        },
        Comments: {
            type: [String],
            required: false
        }
    },
    GeneralComments: {
        type: [String],
        required: false
    },
    GeneralImages: {
        type: [String],
        required: false
    }
});

const healthRecordModel = mongoose.model('healthRecord', healthRecordSchema);


export default healthRecordModel;