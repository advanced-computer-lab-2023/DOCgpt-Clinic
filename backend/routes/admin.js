"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
const adminController_2 = require("../controllers/adminController");
const router = (0, express_1.Router)();
// Define your routes and middleware here
//post a new admin 
router.post('/addAdmin', adminController_2.addAdmin);
//get all admins
router.get('/viewAdmin', adminController_1.getAdmins);
//getdoctors
//delete admins
router.delete('/delete', adminController_1.deleteAdminByUsername);
//delete patient
router.delete('/deletepatient', adminController_2.deletePatientByUsername);
//delete doctor
router.delete('/deletedoc', adminController_2.deleteDoctorByUsername);
//view doctor data
router.get('/doctor', adminController_2.viewDoctorInfo);
//add package
router.post('/addPackage', adminController_2.addPackage);
//delete package
router.delete('/deletePa', adminController_2.deletePackageByName);
//update package 
router.patch('/updatePackage', adminController_2.updatePackage);
//get package 
router.get('/getpack', adminController_2.getPackage);
router.get('/getpackname', adminController_1.getPackageNAME);
router.get('/getdoc', adminController_2.getdoctorsR);
//get patients
router.get('/getpati', adminController_2.getPatients);
router.delete('/logoutAdmin', adminController_2.logout);
router.post('/changePassAdmin', adminController_2.changePassword);
exports.default = router;
