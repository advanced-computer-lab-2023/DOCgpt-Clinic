"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthRecordSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.healthRecordSchema = new mongoose_1.default.Schema({
    patientId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "patient"
    },
    MedicalHistory: {
        Allergies: {
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
    VitalSigns: {
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
const healthRecordModel = mongoose_1.default.model('healthRecord', exports.healthRecordSchema);
exports.default = healthRecordModel;
