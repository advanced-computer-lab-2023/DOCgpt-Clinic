import express, { Router } from 'express';
import {
    subscribeToHealthPackage,
    subscribeToHealthPackageForFamily,
    viewSubscribedHealthPackages,

} from '../controllers/subscriptionController';

const router: Router = express.Router();

router.post('/subscribeToHealthPackage', subscribeToHealthPackage);
router.post('/subscribeToHealthPackageForFamily', subscribeToHealthPackageForFamily);
router.get('/viewSubscription', viewSubscribedHealthPackages);


export default router;


