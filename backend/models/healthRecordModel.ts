import mongoose, { Document, Model, Schema } from 'mongoose';
import patientModel from './patientModel';

export const healthRecordSchema = new mongoose.Schema({
    patient: {
        type: String,
        ref: "patient"        
    },
    MedicalHistory: {
        Allergies:  {
            type: [String],
        },
        PastMedicalConditions: {
            type: [String],
        },
        Comments: {
            type: [String],
        } 
    },
    MedicationList: {
        CurrentMedications: {
            Names: {
                type: [String],
                required: true
            },
             //IMAGE URL
            Prescriptions: {
                type: [String],

            },
        },
        PastMedications: {
            Names: {
                type: [String],
                required: true
            },
            //IMAGE URL
            Prescriptions: {
                type: [String],

            },
        },
        Comments: {
            type: [String],
        } 
    },
    VitalSigns:{
        BloodPressure: {
            type: Number,
        },
        HeartRate: {
            type: Number,
        }, 
        Height:{
            type: Number,
        },
        Weight: {
            type: Number,
        },
        Comments: {
            type: [String],
        }
    },
    Laboratory: {
        //IMAGES URI
        BloodTests: {
            type: [String],
        },
        XRays: {
            type: [String],
        },
        Other: {
            type: [String],
        },
        Comments: {
            type: [String],
        }
    },
    GeneralComments: {
        type: [String]
    },
    GeneralImages: {
        type: [String]
    }
});

const healthRecordModel = mongoose.model('healthRecord', healthRecordSchema);


export default healthRecordModel;