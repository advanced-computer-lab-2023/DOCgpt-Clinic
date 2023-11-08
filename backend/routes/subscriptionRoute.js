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
router.get('/viewSubscription', subscriptionController_1.viewSubscribedHealthPackages);
exports.default = router;
