"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientController_1 = require("../controllers/patientController");
const patientController_2 = require("../controllers/patientController");
const router = express_1.default.Router();
router.use(express_1.default.json());
// Add family member
router.put('/addfammember', patientController_1.addFamilyMember);
// view family members
router.get('/view', patientController_2.viewFamilyMembers);
exports.default = router;
