import express, { Router } from 'express';
import {
    subscribeToHealthPackage,
    subscribeToHealthPackageForFamily,
    viewSubscribedPackages,
    viewHealthPackageStatus,
    viewFamilyMembersAndPackages,
    cancelSubscription,
    getSubscribedPackagesForMember,
    subscribeFamAsPatient,
    cancelSubscriptionfam2
} from '../controllers/subscriptionController';

const router: Router = express.Router();

router.post('/subscribeToHealthPackage', subscribeToHealthPackage);
router.post('/subscribeToHealthPackageForFamily', subscribeToHealthPackageForFamily);

router.get('/viewSubscribedPackages', viewSubscribedPackages);
router.get('/viewHealthPackageStatus', viewHealthPackageStatus);
router.get('/viewFamilyMembersAndPackages', viewFamilyMembersAndPackages);
router.patch('/cancelSubscription', cancelSubscription);
router.patch('/cancelSubscriptionfam', cancelSubscriptionfam2);

export default router;