"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthRecordSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.healthRecordSchema = new mongoose_1.default.Schema({
    patient: {
        type: String,
        ref: "patient"
    },
    MedicalHistory: {
        Allergies: {
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
    VitalSigns: {
        BloodPressure: {
            type: Number,
        },
        HeartRate: {
            type: Number,
        },
        Height: {
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
const healthRecordModel = mongoose_1.default.model('healthRecord', exports.healthRecordSchema);
exports.default = healthRecordModel;
