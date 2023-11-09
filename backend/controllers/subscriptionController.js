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
exports.cancelSubscription = exports.viewHealthPackageStatus = exports.viewSubscribedPackages = exports.subscribeToHealthPackageForFamily = exports.subscribeToHealthPackage = void 0;
const patientModel_1 = __importDefault(require("../models/patientModel")); // Import your patient model
const packageModel_1 = __importDefault(require("../models/packageModel")); // Import your package model
const subscribeToHealthPackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, packageName, paymentMethod } = req.body;
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
        if (paymentMethod === 'wallet') {
            const subscriptionCost = healthPackage.feesPerYear;
            if (patient.walletBalance < subscriptionCost) {
                return res.status(400).json({ error: 'Insufficient funds in the wallet' });
            }
            else {
                // Deduct the cost from the wallet balance
                patient.walletBalance -= subscriptionCost;
                patient.healthPackageSubscription.push({
                    name: packageName,
                    startdate: '',
                    enddate: '',
                    status: "subscribed with renewal date"
                });
            }
        }
        if (paymentMethod === 'creditCard') {
            patient.healthPackageSubscription.push({
                name: packageName,
                startdate: '',
                enddate: '',
                status: "subscribed with renewal date"
            });
        }
        ;
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
        const { username, packageName, familyMemberName, paymentMethod } = req.body;
        if (!username || !packageName || !familyMemberName || paymentMethod) {
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
            if (paymentMethod === 'wallet') {
                const subscriptionCost = healthPackage.feesPerYear;
                if (patient.walletBalance < subscriptionCost) {
                    return res.status(400).json({ error: 'Insufficient funds in the wallet' });
                }
                else {
                    // Deduct the cost from the wallet balance
                    patient.walletBalance -= subscriptionCost;
                    familyMember.healthPackageSubscription.push({
                        name: packageName,
                        startdate: '',
                        enddate: '',
                        status: "subscribed with renewal date"
                    });
                }
            }
            if (paymentMethod === 'creditCard') {
                familyMember.healthPackageSubscription.push({
                    name: packageName,
                    startdate: '',
                    enddate: '',
                    status: "subscribed with renewal date"
                });
            }
            ;
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
// export const subscribeToHealthPackage = async (req: Request, res: Response) => {
//   try {
//     const { username, packageName } = req.body; // Assuming the patient's username and the selected health package name are sent in the request body
//     if (!username || !packageName) {
//       return res.status(400).json({ error: 'Username and package name are required' });
//     }
//     // Find the patient by username
//     const patient = await patientModel.findOne({ username });
//     if (!patient) {
//       return res.status(404).json({ error: 'Patient not found' });
//     }
//     // Find the health package by name
//     const healthPackage = await packageModel.findOne({ name: packageName });
//     if (!healthPackage) {
//       return res.status(404).json({ error: 'Health package not found' });
//     }
//     // Add the health package subscription to the patient's record
//    //patient.healthPackageSubscription = packageName;
//    patient.healthPackageSubscription.push({
//     name: packageName,
//     startdate: '',
//     enddate: '',
//     status: "subscribed with renewal date"   
//   });
//     await patient.save();
//     return res.status(201).json({ message: 'Health package subscribed successfully', patient });
//   } catch (error) {
//     console.error('Error subscribing to health package:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };
// export const subscribeToHealthPackageForFamily = async (req: Request, res: Response) => {
//   try {
//     const { username, packageName, familyMemberName } = req.body;
//     if (!username || !packageName || !familyMemberName ) {
//       return res.status(400).json({ error: 'Username, package name, and family member username are required' });
//     }
//     // Find the patient by username
//     const patient = await patientModel.findOne({ username });
//     if (!patient) {
//       return res.status(404).json({ error: 'Patient not found' });
//     }
//     // Check if the patient has family members
//     if (patient.familyMembers && patient.familyMembers.length > 0) {
//       const familyMember = patient.familyMembers.find((member) => member.name === familyMemberName);
//       if (!familyMember) {
//         return res.status(404).json({ error: 'Family member not found' });
//       }
//       // Find the health package by name
//       const healthPackage = await packageModel.findOne({ name: packageName });
//       if (!healthPackage) {
//         return res.status(404).json({ error: 'Health package not found' });
//       }
//       // Add the health package subscription to the family member's record
//       familyMember.healthPackageSubscription.push({
//           name: packageName,
//           startdate: '',
//           enddate: '',
//           status: "subscribed with renewal date"   
//         });
//       await patient.save();
//       return res.status(201).json({ message: 'Health package subscribed successfully for family member', patient });
//     } else {
//       return res.status(404).json({ error: 'No family members found for this patient' });
//     }
//   } catch (error) {
//     console.error('Error subscribing to health package for family member:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };
const viewSubscribedPackages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.query;
        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }
        const patient = yield patientModel_1.default.findOne({ username });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        const subscribedPackages = patient.healthPackageSubscription.filter((pkg) => pkg.status === 'subscribed with renewal date');
        // Check family members' subscriptions
        if (patient.familyMembers && patient.familyMembers.length > 0) {
            for (const familyMember of patient.familyMembers) {
                if (familyMember.healthPackageSubscription) {
                    const familyMemberSubscribedPackages = familyMember.healthPackageSubscription.filter((pkg) => pkg.status === 'subscribed with renewal date');
                    subscribedPackages.push(...familyMemberSubscribedPackages);
                }
            }
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
        const { _id } = req.query;
        if (!_id) {
            return res.status(400).json({ error: 'Username is required' });
        }
        // Find the patient by username
        const patient = yield patientModel_1.default.findOne({ _id });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        // Create an array to store health package details
        const healthPackages = [];
        // Include the patient's health package subscriptions
        if (patient.healthPackageSubscription) {
            healthPackages.push(...patient.healthPackageSubscription.map(package1 => package1.name));
        }
        // Include health package subscriptions of family members
        if (patient.familyMembers && patient.familyMembers.length > 0) {
            for (const familyMember of patient.familyMembers) {
                if (familyMember.healthPackageSubscription) {
                    healthPackages.push(...familyMember.healthPackageSubscription.map(package1 => package1.name));
                }
            }
        }
        // Fetch the details of the health packages along with their status
        const healthPackagesWithStatus = yield packageModel_1.default.find({
            'name': { $in: healthPackages },
        });
        // Extract status for each health package
        const healthPackageStatus = healthPackagesWithStatus.map(package1 => ({
            name: package1.name,
            status: findHealthPackageStatus(patient, package1.name),
        }));
        return res.status(200).json({ healthPackageStatus });
    }
    catch (error) {
        console.error('Error viewing health package status:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.viewHealthPackageStatus = viewHealthPackageStatus;
// Helper function to find the status of a health package for a given patient and family member
const findHealthPackageStatus = (patient, packageName) => {
    const findStatus = (subscription) => subscription.name === packageName;
    // Check patient's health package subscriptions
    const patientSubscription = patient.healthPackageSubscription.find(findStatus);
    if (patientSubscription) {
        return patientSubscription.status;
    }
    // Check family member's health package subscriptions
    if (patient.familyMembers && patient.familyMembers.length > 0) {
        for (const familyMember of patient.familyMembers) {
            const familyMemberSubscription = familyMember.healthPackageSubscription.find(findStatus);
            if (familyMemberSubscription) {
                return familyMemberSubscription.status;
            }
        }
    }
    // If not found, return 'Not subscribed'
    return 'Not subscribed';
};
const cancelSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.query; // Assuming you're passing the patient ID in the request parameters
        const { packageName } = req.body;
        if (!_id || !packageName) {
            return res.status(400).json({ error: 'Patient ID and package name are required' });
        }
        const patient = yield patientModel_1.default.findById(_id);
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
