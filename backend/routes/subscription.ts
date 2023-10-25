import express, { Router } from 'express';
import {
    subscribeToHealthPackage,
    subscribeToHealthPackageForFamily,
    viewSubscribedHealthPackages } 
    from '../controllers/subscriptionController';

const router: Router = express.Router();

// Define the subscription route
router.post('/subscribe', subscribeToHealthPackage);
router.post('/subscribeFamilyMem', subscribeToHealthPackageForFamily);
router.get('/viewSubscription',viewSubscribedHealthPackages);

export default router;