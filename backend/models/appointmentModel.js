"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.appointmentSchema = new mongoose_1.default.Schema({
    status: {
        type: String,
        enum: ['upcoming', 'completed', 'cancelled', 'rescheduled'],
        required: false
    },
    doctor: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        required: true
    },
    patient: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        enum: ['new appointement', 'Follow up'],
        required: false
    },
});
const appointmentModel = mongoose_1.default.model('appoinment', exports.appointmentSchema);
exports.default = appointmentModel;