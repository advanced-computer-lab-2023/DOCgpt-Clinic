import express,{Router} from 'express';


import {deleteAdminByUsername, getAdmins} from '../controllers/adminController';
import {addAdmin,deletePatientByUsername,deleteDoctorByUsername,viewDoctorInfo} from '../controllers/adminController';

const router = Router();

// Define your routes and middleware here



//post a new admin 
router.post('/',addAdmin);

//get all admins
router.get('/',getAdmins);

//delete admins
router.delete('/', deleteAdminByUsername);

//delete patient
router.delete('/', deletePatientByUsername);

//delete doctor
router.delete('/', deleteDoctorByUsername);

//view doctor data
router.get('/doc',viewDoctorInfo);

export default router;