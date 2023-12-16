"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHealthRecord = void 0;
const healthRecordModel_1 = __importDefault(require("../models/healthRecordModel"));
const multer_1 = __importDefault(require("multer")); // For handling file uploads
// Multer configuration to handle file uploads
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Store uploaded files in the 'uploads' directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
const createHealthRecord = async (req, res) => {
    try {
        const newRecord = new healthRecordModel_1.default(Object.assign({}, req.body));
        // Save the new document to the database
        await newRecord.save();
        res.status(201).json({ message: 'Record created successfully', record: newRecord });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.createHealthRecord = createHealthRecord;
