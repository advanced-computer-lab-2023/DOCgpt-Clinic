import express,{Router} from 'express';


import {deleteAdminByUsername, getAdmins, getPackageNAME} from '../controllers/adminController';
import {addAdmin,deletePatientByUsername,deleteDoctorByUsername,viewDoctorInfo,addPackage,deletePackageByName,updatePackage,getPackage,getdoctorsR,getPatients,loginAdmin,logout,changePassword} from '../controllers/adminController';


const router = Router();

// Define your routes and middleware here



//post a new admin 
router.post('/addAdmin',addAdmin);

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
 //update package 
 router.patch('/updatePackage',updatePackage)

 //get package 
 router.get('/getpack',getPackage);
 router.get('/getpackname',getPackageNAME);
 router.get('/getdoc',getdoctorsR);



 //get patients
 router.get('/getpati',getPatients);

 router.get('/loginAdmin',loginAdmin)
router.delete('/logoutAdmin',logout)
router.post('/changePassAdmin',changePassword)
export default router;