import { payWithCredit
 } from "../controllers/paymentController";
 import { payment } from "../controllers/paymentController";

 import express, { Router } from 'express';
 const router: Router = express.Router();

 router.post("/pay",payment)
 router.post("/payp",payWithCredit)


 export default router;