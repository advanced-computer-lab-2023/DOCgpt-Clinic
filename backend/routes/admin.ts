import express,{Router} from 'express';


import {deleteAdminByUsername, getAdmin, getAdmins, getPackageNAME} from '../controllers/adminController';
import {createAdmin,deletePatientByUsername,deleteDoctorByUsername,viewDoctorInfo,addPackage,deletePackageByName,updatePackage,getPackage,getdoctorsR,getPatients,logout,changePassword} from '../controllers/adminController';


const router = Router();

// Define your routes and middleware here



//post a new admin 
router.post('/addAdmin',createAdmin);

//get all admins
router.get('/viewAdmin',getAdmins);
 
//getdoctors
 
//delete admins
router.delete('/delete', deleteAdminByUsername);

//delete patient
router.delete('/deletepatient', deletePatientByUsername);

//delete doctor
router.delete('/deletedoc', deleteDoctorByUsername);

//view doctor data
router.get('/doctor',viewDoctorInfo);
//add package
router.post('/addPackage',addPackage)

//delete package
router.delete('/deletePa',deletePackageByName)

// Example of setting up the route with express
router.delete('/deleteHealthPackage/:name', deletePackageByName);

 //update package 
 router.patch('/updatePackage',updatePackage)

 //get package 
 router.get('/getpack',getPackage);
 router.get('/getpackname',getPackageNAME);
 router.get('/getdoc',getdoctorsR);

router.get('/getadmin',getAdmin)

 //get patients
 router.get('/getpati',getPatients);


router.delete('/logoutAdmin',logout)
router.post('/changePassAdmin',changePassword)
export default router;