"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.requestSchema = new mongoose_1.default.Schema({
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
    AppointmentDate: {
        type: Date,
        required: true
    },
    type: {
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
    scheduledBy: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        required: false
    },
    followUpDate: {
        type: Date,
        required: false
    },
    requestedBy: {
        type: String,
        required: false,
    }
});
const requestModel = mongoose_1.default.model('request', exports.requestSchema);
exports.default = requestModel;
