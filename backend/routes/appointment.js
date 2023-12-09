"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appointmentController_1 = require("../controllers/appointmentController");
const router = express_1.default.Router();
router.post("/create", appointmentController_1.createAppointment);
router.get("/", appointmentController_1.getAppointments);
router.get("/getAll", appointmentController_1.getAllAppointments);
router.get("/appP", appointmentController_1.getPapp);
router.patch("/completed", appointmentController_1.complete);
router.post("/cancelAppointment", appointmentController_1.cancelAppointment);
router.post("/makeApp", appointmentController_1.paymenttt);
router.post("/makeAppForFam", appointmentController_1.payment2);
router.get("/getAppointmentById", appointmentController_1.getAppointmentById);
exports.default = router;
