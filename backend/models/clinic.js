"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const clinicSchema = new mongoose_1.default.Schema({
    markup: {
        type: Number,
        required: true,
    },
    // Add other properties specific to the Clinic model
});
