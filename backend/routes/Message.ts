import express from "express";
import { createMessage, getLastMessage, getMsgs } from "../controllers/messageController";


const router = express.Router();


router.post('/addMessage',createMessage)
router.get('/getMessages/:conversationId',getMsgs)
router.get('/getLastMessage', getLastMessage)

export default router;