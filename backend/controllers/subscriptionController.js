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
exports.subscribeToHealthPackageForFamily = exports.subscribeToHealthPackage = void 0;
const patientModel_1 = __importDefault(require("../models/patientModel")); // Import your patient model
const packageModel_1 = __importDefault(require("../models/packageModel")); // Import your package model
const subscribeToHealthPackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, packageName } = req.body; // Assuming the patient's username and the selected health package name are sent in the request body
        if (!username || !packageName) {
            return res.status(400).json({ error: 'Username and package name are required' });
        }
        // Find the patient by username
        const patient = yield patientModel_1.default.findOne({ username });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        // Find the health package by name
        const healthPackage = yield packageModel_1.default.findOne({ name: packageName });
        if (!healthPackage) {
            return res.status(404).json({ error: 'Health package not found' });
        }
        // Add the health package subscription to the patient's record
        patient.healthPackageSubscription = packageName;
        yield patient.save();
        return res.status(201).json({ message: 'Health package subscribed successfully', patient });
    }
    catch (error) {
        console.error('Error subscribing to health package:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.subscribeToHealthPackage = subscribeToHealthPackage;
const subscribeToHealthPackageForFamily = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, packageName, familyMemberName } = req.body;
        if (!username || !packageName || !familyMemberName) {
            return res.status(400).json({ error: 'Username, package name, and family member username are required' });
        }
        // Find the patient by username
        const patient = yield patientModel_1.default.findOne({ username });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        // Check if the patient has family members
        if (patient.familyMembers && patient.familyMembers.length > 0) {
            const familyMember = patient.familyMembers.find((member) => member.name === familyMemberName);
            if (!familyMember) {
                return res.status(404).json({ error: 'Family member not found' });
            }
            // Find the health package by name
            const healthPackage = yield packageModel_1.default.findOne({ name: packageName });
            if (!healthPackage) {
                return res.status(404).json({ error: 'Health package not found' });
            }
            // Add the health package subscription to the family member's record
            familyMember.healthPackageSubscription = packageName;
            yield patient.save();
            return res.status(201).json({ message: 'Health package subscribed successfully for family member', patient });
        }
        else {
            return res.status(404).json({ error: 'No family members found for this patient' });
        }
    }
    catch (error) {
        console.error('Error subscribing to health package for family member:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.subscribeToHealthPackageForFamily = subscribeToHealthPackageForFamily;
