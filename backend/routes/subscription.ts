import express, { Router } from 'express';
import {
     subscribeToHealthPackage,
    subscribeToHealthPackageForFamily } 
    from '../controllers/subscriptionController';

const router: Router = express.Router();

// Define the subscription route
router.post('/subscribe', subscribeToHealthPackage);
router.post('/subscribeFamilyMem', subscribeToHealthPackageForFamily);

export default router;