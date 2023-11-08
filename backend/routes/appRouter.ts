import { generateOTP  , verifyOTP , SendResetmail , resetPassword} from "../controllers/appController";
import express,{Router} from 'express';
const router = Router();

console.log("im here");
router.post('/otp',generateOTP);
router.post('/verifyOtp',verifyOTP);
router.post('/otpMail',SendResetmail);
router.post('/resetPassword',resetPassword);




export default router;