import express from "express";
import { createConv, getConv } from "../controllers/conversationController";

const router = express.Router();

router.post('/startConv',createConv);
router.get('/getConv',getConv);

export default router;