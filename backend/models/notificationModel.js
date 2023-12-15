"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.notificationSchema = new mongoose_1.default.Schema({
    patientUsername: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    msg: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        required: false,
        default: false
    },
});
const notificationtModel = mongoose_1.default.model('notification', exports.notificationSchema);
exports.default = notificationtModel;
