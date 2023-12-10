import express from 'express';
import { getNotificationsP , getNotificationsD , getCountP} from '../controllers/notificationController';

const router = express.Router();

router.get('/patient', getNotificationsP);
router.get('/doctor', getNotificationsD);
router.get('/countP', getCountP);


export default router;