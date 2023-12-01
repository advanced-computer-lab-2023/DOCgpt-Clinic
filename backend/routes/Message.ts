import express from "express";
import { createMessage, getMsgs } from "../controllers/messageController";


const router = express.Router();


router.post('/addMessage',createMessage)
router.get('/getMessages/:conversationId',getMsgs)

export default router;