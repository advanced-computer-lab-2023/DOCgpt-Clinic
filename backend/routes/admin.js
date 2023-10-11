"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
const adminController_2 = require("../controllers/adminController");
const router = (0, express_1.Router)();
// Define your routes and middleware here
//post a new admin 
router.post('/', adminController_2.addAdmin);
//get all admins
router.get('/', adminController_1.getAdmins);
//delete admins
router.delete('/', adminController_1.deleteAdminByUsername);
//delete patient
router.delete('/', adminController_2.deletePatientByUsername);
//delete doctor
router.delete('/', adminController_2.deleteDoctorByUsername);
//view doctor data
router.get('/doc', adminController_2.viewDoctorInfo);
exports.default = router;
