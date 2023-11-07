"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const createHealthRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRecord = new healthRecordModel_1.default(Object.assign({}, req.body));
        // Save the new document to the database
        yield newRecord.save();
        res.status(201).json({ message: 'Record created successfully', record: newRecord });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createHealthRecord = createHealthRecord;
