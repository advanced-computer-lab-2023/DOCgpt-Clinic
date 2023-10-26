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
const createHealthRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patient = req.body.patient;
    const MedicalHistory = req.body.MedicalHistory;
    const MedicationList = req.body.MedicationList;
    const VitalSigns = req.body.VitalSigns;
    const healthRecord = yield healthRecordModel_1.default.create({
        patient: patient,
        MedicalHistory: MedicalHistory,
        MedicationList: MedicationList,
        VitalSigns: VitalSigns
    });
    res.status(200).json(healthRecord);
});
exports.createHealthRecord = createHealthRecord;
