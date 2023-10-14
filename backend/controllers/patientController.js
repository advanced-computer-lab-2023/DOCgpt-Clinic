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
exports.viewFamilyMembers = exports.addFamilyMember = void 0;
const patientModel_1 = __importDefault(require("../models/patientModel"));
// Define a method to add a family member to a patient's record
// Define a method to add a family member to a patient's record
const addFamilyMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.query;
        if (!username) {
            return res.status(404).json({ error: 'No such patient' });
        }
        // Assuming you have a route parameter for the patient's ID
        const familyMemberData = req.body; // Assuming family member data is sent in the request body
        // Find the patient by ID
        const patient = yield patientModel_1.default.findOne({ username });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        // Add the new family member object to the patient's record
        patient.familyMembers.push({
            name: familyMemberData.name,
            nationalId: familyMemberData.nationalId,
            age: familyMemberData.age,
            gender: familyMemberData.gender,
            relationToPatient: familyMemberData.relationToPatient,
        });
        yield patient.save();
        return res.status(201).json({ message: 'Family member added successfully', patient });
    }
    catch (error) {
        console.error('Error adding family member:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.addFamilyMember = addFamilyMember;
//view family members 
const viewFamilyMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.query;
        if (!username) {
            return res.status(404).json({ error: 'user name is required' });
        }
        // Find the patient by ID
        const patient = yield patientModel_1.default.findOne({ username });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        // Return the family members array
        return res.status(200).json({ familyMembers: patient.familyMembers });
    }
    catch (error) {
        console.error('Error viewing family members:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.viewFamilyMembers = viewFamilyMembers;
