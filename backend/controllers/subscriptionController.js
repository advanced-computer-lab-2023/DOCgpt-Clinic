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
exports.creditPayment = exports.getdiscount = exports.getdisc = exports.getSubscribedPackagesForMember = exports.viewFamilyMembersAndPackages = exports.cancelSubscriptionfam2 = exports.cancelSubscription = exports.viewHealthPackageStatus = exports.viewSubscribedPackages = exports.subscribeToHealthPackageForFamily = exports.subscribeFamAsPatient = exports.subscribeToHealthPackage = void 0;
const patientModel_1 = __importDefault(require("../models/patientModel")); // Import your patient model
const packageModel_1 = __importDefault(require("../models/packageModel")); // Import your package model
const tokenModel_1 = __importDefault(require("../models/tokenModel"));
const stripe_1 = __importDefault(require("stripe"));
require('dotenv').config();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
if (!process.env.STRIPE_SECRET_KEY)
    throw new Error('process.env.STRIPE_SECRET_KEY not found');
const subscribeToHealthPackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const tokenDB = yield tokenModel_1.default.findOne({ token });
        const username = tokenDB && tokenDB.username;
        const { packageName, paymentMethod } = req.body;
        if (!username || !packageName || !paymentMethod) {
            return res.status(400).json({ error: 'Username, package name, and payment method are required' });
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
        const isSubscribed = patient.healthPackageSubscription.some(subscription => subscription.name === packageName && subscription.status === 'subscribed');
        if (isSubscribed) {
            return res.status(400).json({ error: 'Patient is already subscribed to this package' });
        }
        const subscriptionCost = healthPackage.feesPerYear;
        if (paymentMethod === 'creditCard') {
            const sessionUrl = yield (0, exports.creditPayment)(req, res, subscriptionCost);
            if (!sessionUrl) {
                return res.status(500).json({ error: 'Failed to create payment session' });
            }
            const newDate = new Date();
            const endDate = new Date(newDate);
            endDate.setFullYear(newDate.getFullYear() + 1);
            patient.healthPackageSubscription.push({
                name: packageName,
                startdate: newDate.toISOString(),
                enddate: endDate.toISOString(),
                status: "subscribed",
                payedBy: username,
            });
            yield patient.save();
            return res.status(201).json({ message: 'Health package subscribed successfully', patient, sessionUrl });
        }
        else { // <-- Corrected placement of else
            console.log("ana dkhlt hena");
            if (patient.walletBalance < subscriptionCost) {
                return res.status(400).json({ error: 'Insufficient funds in the wallet' });
            }
            else {
                const newDate = new Date();
                const endDate = new Date(newDate);
                endDate.setFullYear(newDate.getFullYear() + 1);
                patient.walletBalance -= subscriptionCost;
                patient.healthPackageSubscription.push({
                    name: packageName,
                    startdate: newDate.toISOString(),
                    enddate: endDate.toISOString(),
                    status: "subscribed",
                    payedBy: username,
                });
                yield patient.save();
            }
        }
        return res.status(201).json({ message: 'Health package subscribed successfully', patient });
    }
    catch (error) {
        console.error('Error subscribing to health package:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.subscribeToHealthPackage = subscribeToHealthPackage;
const subscribeFamAsPatient = (username, packageName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("ANA HENA FAM AS PATIENT");
        if (!username || !packageName) {
            throw new Error('Username and package name are required');
        }
        // Find the patient by username
        const patient = yield patientModel_1.default.findOne({ username });
        if (!patient) {
            throw new Error('Patient not found');
        }
        // Find the health package by name
        const healthPackage = yield packageModel_1.default.findOne({ name: packageName });
        if (!healthPackage) {
            throw new Error('Health package not found');
        }
        const isSubscribed = patient.healthPackageSubscription.some(subscription => subscription.name === packageName && subscription.status === 'subscribed');
        if (isSubscribed) {
            throw new Error('Patient is already subscribed to this package');
        }
        if (!patient.healthPackageSubscription) {
            patient.healthPackageSubscription = [];
        }
        if (!Array.isArray(patient.healthPackageSubscription)) {
            patient.healthPackageSubscription = [];
        }
        // Add the health package to the subscription array
        const newDate = new Date();
        const endDate = new Date(newDate);
        endDate.setFullYear(newDate.getFullYear() + 1);
        patient.healthPackageSubscription.push({
            name: packageName,
            startdate: newDate.toISOString(),
            enddate: endDate.toISOString(),
            status: 'subscribed',
            payedBy: username,
        });
        yield patient.save();
        return { message: 'Health package subscribed successfully', patient };
    }
    catch (error) {
        console.error('Error subscribing to health package:', error);
        throw new Error('Internal server error');
    }
});
exports.subscribeFamAsPatient = subscribeFamAsPatient;
const subscribeToHealthPackageForFamily = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const tokenDB = yield tokenModel_1.default.findOne({ token });
        const username = tokenDB && tokenDB.username;
        const { packageName, familyMemberName, paymentMethod } = req.body;
        if (!username || !packageName || !familyMemberName || !paymentMethod) {
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
            if (!familyMember.healthPackageSubscription) {
                familyMember.healthPackageSubscription = [];
            }
            const isSubscribed = familyMember.healthPackageSubscription.some(subscription => subscription.name === packageName && subscription.status === 'subscribed');
            if (isSubscribed) {
                return res.status(400).json({ error: 'Patient is already subscribed to this package' });
            }
            const price = yield calcTotal(healthPackage.feesPerYear, username);
            const subscriptionCost = price;
            if (paymentMethod === 'creditCard') {
                const sessionUrl = yield (0, exports.creditPayment)(req, res, subscriptionCost);
                if (!sessionUrl) {
                    return res.status(500).json({ error: 'Failed to create payment session' });
                }
                const newDate = new Date();
                const endDate = new Date(newDate);
                endDate.setFullYear(newDate.getFullYear() + 1);
                familyMember.healthPackageSubscription.push({
                    name: packageName,
                    startdate: newDate.toISOString(),
                    enddate: endDate.toISOString(),
                    status: "subscribed",
                    payedBy: username,
                });
                const familyMemberUsername = familyMember.username;
                if (!familyMemberUsername)
                    return res.status(404).json({ error: 'No family members found for this patient' });
                yield (0, exports.subscribeFamAsPatient)(familyMemberUsername, packageName);
                yield patient.save();
                return res.status(201).json({ message: 'Health package subscribed successfully', patient, sessionUrl });
            }
            else {
                console.log("ana hena ");
                if (patient.walletBalance < subscriptionCost) {
                    return res.status(400).json({ error: 'Insufficient funds in the wallet' });
                }
                else {
                    // Deduct the cost from the wallet balance
                    patient.walletBalance -= subscriptionCost;
                    const newDate = new Date();
                    const endDate = new Date(newDate);
                    endDate.setFullYear(newDate.getFullYear() + 1);
                    familyMember.healthPackageSubscription.push({
                        name: packageName,
                        startdate: newDate.toISOString(),
                        enddate: endDate.toISOString(),
                        status: "subscribed",
                        payedBy: username,
                    });
                    const familyMemberUsername = familyMember.username;
                    if (!familyMemberUsername)
                        return res.status(404).json({ error: 'No family members found for this patient' });
                    (0, exports.subscribeFamAsPatient)(familyMemberUsername, packageName);
                }
            }
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
const viewSubscribedPackages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const tokenDB = yield tokenModel_1.default.findOne({ token });
        const username = tokenDB === null || tokenDB === void 0 ? void 0 : tokenDB.username;
        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }
        const patient = yield patientModel_1.default.findOne({ username });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        const currentDate = new Date();
        patient.healthPackageSubscription.map((healthPackage) => {
            var _a;
            if (((_a = healthPackage.enddate) === null || _a === void 0 ? void 0 : _a.split('T')[0]) === currentDate.toISOString().split('T')[0]) {
                healthPackage.status = 'cancelled with end date';
            }
        });
        const updated = yield patient.save();
        let subscribedPackages = [];
        if (patient.healthPackageSubscription && Array.isArray(patient.healthPackageSubscription)) {
            subscribedPackages = patient.healthPackageSubscription.filter((pkg) => pkg.status === 'subscribed');
        }
        return res.status(200).json({ subscribedPackages });
    }
    catch (error) {
        console.error('Error retrieving subscribed packages:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.viewSubscribedPackages = viewSubscribedPackages;
const viewHealthPackageStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const tokenDB = yield tokenModel_1.default.findOne({ token });
        const username = tokenDB && tokenDB.username;
        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }
        // Find the patient by username
        const patient = yield patientModel_1.default.findOne({ username });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        const familyMembersNames = patient.familyMembers.map((familyMember) => familyMember.name);
        // Create an array to store health package details for the patient and family members
        const healthPackages = [];
        const currentDate = new Date();
        patient.healthPackageSubscription.map((healthPackage) => {
            var _a;
            if (((_a = healthPackage.enddate) === null || _a === void 0 ? void 0 : _a.split('T')[0]) === currentDate.toISOString().split('T')[0]) {
                healthPackage.status = 'cancelled with end date';
            }
        });
        const updated = yield patient.save();
        // Include the patient's health package subscriptions
        if (patient.healthPackageSubscription && patient.healthPackageSubscription.length > 0) {
            healthPackages.push(...patient.healthPackageSubscription.map(package1 => ({
                name: package1.name,
                status: package1.status,
            })));
        }
        if (familyMembersNames.length === 0) {
            res.status(200).json({ healthPackages });
        }
        else {
            for (const familyMember of patient.familyMembers) {
                const currentDate = new Date();
                patient.familyMembers.map((familymember) => {
                    familymember.healthPackageSubscription.map((healthPackage) => {
                        var _a;
                        if (((_a = healthPackage.enddate) === null || _a === void 0 ? void 0 : _a.split('T')[0]) === currentDate.toISOString().split('T')[0]) {
                            healthPackage.status = 'cancelled with end date';
                        }
                    });
                });
                const updated = yield patient.save();
                if (familyMember.healthPackageSubscription && familyMember.healthPackageSubscription.length > 0 && familyMember.healthPackageSubscription[0].payedBy === patient.username) {
                    healthPackages.push(...familyMember.healthPackageSubscription.map((package1) => ({
                        patientName: patient.name,
                        name: package1.name,
                        familyMemberName: familyMember.name,
                        status: package1.status,
                    })));
                }
            }
            console.log(healthPackages);
            res.status(200).json({ healthPackages });
        }
    }
    catch (error) {
        console.error('Error viewing health package status:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.viewHealthPackageStatus = viewHealthPackageStatus;
const findHealthPackageStatusHelper = (packages, packageName) => {
    const packageData = packages.find(package1 => package1.name.toLowerCase() === packageName.toLowerCase());
    return packageData ? packageData.status : 'Not subscribed';
};
// Helper function to find the member name associated with a health package
const findMemberNameHelper = (packages, packageName) => {
    const packageData = packages.find(package1 => package1.name.toLowerCase() === packageName.toLowerCase());
    return packageData ? packageData.memberName : '';
};
const cancelSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const tokenDB = yield tokenModel_1.default.findOne({ token });
        const username = (tokenDB && tokenDB.username);
        const { packageName } = req.body;
        if (!username || !packageName) {
            return res.status(400).json({ error: 'Patient ID and package name are required' });
        }
        const patient = yield patientModel_1.default.findOne({ username });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        const healthPackage = yield packageModel_1.default.findOne({ name: packageName });
        if (!healthPackage) {
            return res.status(404).json({ error: 'Health package not found' });
        }
        // Update the status to 'unsubscribed'
        const updateSubscriptionStatus = (subscription) => {
            if (subscription.name === packageName) {
                subscription.status = 'unsubscribed';
            }
        };
        // Update patient's subscription
        patient.healthPackageSubscription.forEach(updateSubscriptionStatus);
        // Update family members' subscriptions
        if (patient.familyMembers && patient.familyMembers.length > 0) {
            for (const familyMember of patient.familyMembers) {
                if (familyMember.healthPackageSubscription) {
                    familyMember.healthPackageSubscription.forEach(updateSubscriptionStatus);
                }
            }
        }
        yield patient.save();
        return res.status(200).json({ message: 'Health package subscription canceled successfully', patient });
    }
    catch (error) {
        console.error('Error canceling health package subscription:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.cancelSubscription = cancelSubscription;
const cancelSubscriptionfam2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const tokenDB = yield tokenModel_1.default.findOne({ token });
        const username = (tokenDB && tokenDB.username);
        const { packageName, familyname } = req.body;
        if (!packageName) {
            return res.status(400).json({ error: 'package name' });
        }
        console.log(familyname);
        if (!familyname) {
            return res.status(400).json({ error: ' family name' });
        }
        const patient = yield patientModel_1.default.findOne({ username });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        const healthPackage = yield packageModel_1.default.findOne({ name: packageName });
        if (!healthPackage) {
            return res.status(404).json({ error: 'Health package not found' });
        }
        // Update the status to 'unsubscribed'
        const updateSubscriptionStatus = (subscription) => {
            if (subscription.name === packageName && (subscription.status === 'subscribed')) {
                subscription.status = 'unsubscribed';
            }
        };
        // // Update patient's subscription
        // patient.healthPackageSubscription.forEach(updateSubscriptionStatus);
        // Update family members' subscriptions
        if (patient.familyMembers && patient.familyMembers.length > 0) {
            for (const familyMember of patient.familyMembers) {
                if (familyMember.healthPackageSubscription && familyMember.name === familyname) {
                    familyMember.healthPackageSubscription.forEach(updateSubscriptionStatus);
                }
            }
        }
        yield patient.save();
        return res.status(200).json({ message: 'Health package subscription canceled successfully', patient });
    }
    catch (error) {
        console.error('Error canceling health package subscription:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.cancelSubscriptionfam2 = cancelSubscriptionfam2;
const viewFamilyMembersAndPackages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const tokenDB = yield tokenModel_1.default.findOne({ token });
        const username = tokenDB && tokenDB.username;
        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }
        const patient = yield patientModel_1.default.findOne({ username });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        const currentDate = new Date();
        patient.familyMembers.map((familymember) => {
            familymember.healthPackageSubscription.map((healthPackage) => {
                var _a;
                if (((_a = healthPackage.enddate) === null || _a === void 0 ? void 0 : _a.split('T')[0]) === currentDate.toISOString().split('T')[0]) {
                    healthPackage.status = 'cancelled with end date';
                }
            });
        });
        const updated = yield patient.save();
        // Collect family members' subscriptions
        const familyMemberPackages = [];
        for (const familyMember of patient.familyMembers) {
            console.log('Family Member:', familyMember.name);
            if (familyMember.healthPackageSubscription && Array.isArray(familyMember.healthPackageSubscription)) {
                console.log('Subscriptions before filter:', familyMember.healthPackageSubscription);
                const subscribedPackages = familyMember.healthPackageSubscription
                    .filter(pkg => pkg.status === 'subscribed')
                    .map(pkg => ({
                    familyMemberName: familyMember.name,
                    package: pkg,
                }));
                console.log('Subscribed Packages:', subscribedPackages);
                familyMemberPackages.push(...subscribedPackages);
            }
        }
        console.log("ana hena");
        console.log(familyMemberPackages);
        return res.status(200).json({ familyMemberPackages });
    }
    catch (error) {
        console.error('Error retrieving family members and packages:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.viewFamilyMembersAndPackages = viewFamilyMembersAndPackages;
const getSubscribedPackagesForMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const tokenDB = yield tokenModel_1.default.findOne({ token });
        const username = (tokenDB && tokenDB.username);
        const { familyMemberName } = req.query;
        const patient = yield patientModel_1.default.findOne({ username });
        if (!patient) {
            return res.status(404).json({ error: 'Family member not found 1' });
        }
        const familyMembers = patient.familyMembers;
        // Assuming the family member's name is known or passed in the request
        const targetFamilyMember = familyMembers.find((member) => member.name === familyMemberName);
        if (!targetFamilyMember) {
            return res.status(404).json({ error: 'Family member not found 2' });
        }
        const subscribedPackages = targetFamilyMember.healthPackageSubscription.filter((pck) => pck.status === 'subscribed');
        return res.status(200).json({ subscribedPackages });
    }
    catch (error) {
        console.error('Error fetching subscribed packages:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getSubscribedPackagesForMember = getSubscribedPackagesForMember;
function calcTotal(feesPerYear, username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const patient = yield patientModel_1.default.findOne({ username });
            if (!patient) {
                throw new Error('Patient not found');
            }
            if (patient.healthPackageSubscription.length === 0) {
                console.log('Patient has no health packages subscribed');
                return feesPerYear; // or any default value you want to return when no health packages are subscribed
            }
            const firstSubscription = patient.healthPackageSubscription[0];
            const packageName = firstSubscription.name;
            const healthPackage = yield packageModel_1.default.findOne({ name: packageName });
            if (!healthPackage) {
                throw new Error('Health package not found');
            }
            const discount = feesPerYear - healthPackage.familysubscribtionDiscount * 0.01 * feesPerYear;
            console.log('Discount:', discount);
            // Perform further calculations or operations with the discount value
            return discount;
        }
        catch (error) {
            console.error('Error calculating health discount:', error);
            throw error;
        }
    });
}
function getdisc(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const patient = yield patientModel_1.default.findOne({ username });
            if (!patient) {
                throw new Error('Patient not found');
            }
            if (patient.healthPackageSubscription.length === 0) {
                console.log('Patient has no health packages subscribed');
                return 0; // or any default value you want to return when no health packages are subscribed
            }
            const firstSubscription = patient.healthPackageSubscription[0];
            const packageName = firstSubscription.name;
            const healthPackage = yield packageModel_1.default.findOne({ name: packageName });
            if (!healthPackage) {
                throw new Error('Health package not found');
            }
            const discount = healthPackage.medicineDiscount;
            console.log('Discount:', discount);
            // Perform further calculations or operations with the discount value
            return discount;
        }
        catch (error) {
            console.error('Error calculating health discount:', error);
            throw error;
        }
    });
}
exports.getdisc = getdisc;
const getdiscount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    try {
        const discount = yield getdisc(username);
        res.json({ discount });
    }
    catch (error) {
        res.status(404).send(error.message);
    }
});
exports.getdiscount = getdiscount;
const creditPayment = (req, res, sessionPrice) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const session = yield stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "EGP",
                        product_data: {
                            name: "healt package subscribtion",
                        },
                        unit_amount: sessionPrice * 100,
                    },
                    quantity: 1,
                }
            ],
            success_url: `http://localhost:3000`,
            cancel_url: `http://localhost:3000/login`,
        });
        return session.url;
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
});
exports.creditPayment = creditPayment;
