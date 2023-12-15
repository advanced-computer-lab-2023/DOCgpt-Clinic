import express from 'express';
import { getNotificationsP , getNotificationsD , getCountP 
    , getCountD , markAsRead} from '../controllers/notificationController';

const router = express.Router();

router.get('/patient', getNotificationsP);
router.get('/doctor', getNotificationsD);
router.get('/countP', getCountP);
router.get('/countD', getCountD);
router.post('/mark', markAsRead);




export default router;