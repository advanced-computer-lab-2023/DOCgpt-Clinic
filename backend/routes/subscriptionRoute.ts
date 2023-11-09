import express, { Router } from 'express';
import {
    subscribeToHealthPackage,
    subscribeToHealthPackageForFamily,
    viewSubscribedPackages,
    viewHealthPackageStatus,
    cancelSubscription
} from '../controllers/subscriptionController';

const router: Router = express.Router();

router.post('/subscribeToHealthPackage', subscribeToHealthPackage);
router.post('/subscribeToHealthPackageForFamily', subscribeToHealthPackageForFamily);
router.get('/viewSubscribedPackages', viewSubscribedPackages);
router.get('/viewHealthPackageStatus', viewHealthPackageStatus);

router.patch('/cancelSubscription', cancelSubscription);

export default router;


