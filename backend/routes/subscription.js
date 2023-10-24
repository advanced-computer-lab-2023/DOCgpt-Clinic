"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subscriptionController_1 = require("../controllers/subscriptionController");
const router = express_1.default.Router();
// Define the subscription route
router.post('/subscribe', subscriptionController_1.subscribeToHealthPackage);
router.post('/subscribeFamilyMem', subscriptionController_1.subscribeToHealthPackageForFamily);
exports.default = router;
