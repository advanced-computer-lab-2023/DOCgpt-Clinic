"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/Document.js
const mongoose_1 = __importDefault(require("mongoose"));
const documentSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    document: { type: String, required: true },
    filePath: { type: String }
    // Add other document properties as needed
});
const documentModel = mongoose_1.default.model('Document', documentSchema);
exports.default = documentModel;
