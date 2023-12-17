"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subscriptionController_1 = require("../controllers/subscriptionController");
const router = express_1.default.Router();
router.post('/subscribeToHealthPackage', subscriptionController_1.subscribeToHealthPackage);
router.post('/subscribeToHealthPackageForFamily', subscriptionController_1.subscribeToHealthPackageForFamily);
router.get('/viewSubscribedPackages', subscriptionController_1.viewSubscribedPackages);
router.get('/viewHealthPackageStatus', subscriptionController_1.viewHealthPackageStatus);
router.get('/getSubscribedPackagesForMember', subscriptionController_1.getSubscribedPackagesForMember);
//router.get('/viewFamilyMembersAndPackages', viewFamilyMembersAndPackages);
router.patch('/cancelSubscription', subscriptionController_1.cancelSubscription);
router.patch('/cancelSubscriptionfam', subscriptionController_1.cancelSubscriptionfam2);
router.get('/viewFamMemberPackages', subscriptionController_1.viewFamilyMembersAndPackages);
router.get("/getdisc/:username", subscriptionController_1.getdiscount);
exports.default = router;
