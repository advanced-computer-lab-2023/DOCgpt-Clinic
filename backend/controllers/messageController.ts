import { NextFunction, Request, Response, Router } from 'express';
import tokenModel from '../models/tokenModel';
import message from '../models/message';
import Conversation from '../models/conversation';

export const createMessage = async (req: Request, res: Response) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenDB = await tokenModel.findOne({ token });
     const sender =tokenDB?.username;
    console.log(token);
    const { conversationId,text } = req.body;
    //const firstusername=tokenDB?.username;
    //const secondusername=req.body;

    try {
    const Convo=await message.create({conversationId,sender,text});
    res.status(201).json(Convo);
} catch(err){
    res.status(500).json(err);
}
}
export const getMsgs= async (req: Request, res: Response) => {
    try {
        const messages = await message.find({
          conversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
      } catch (err) {
        res.status(500).json(err);
      }
    

}
export const getLastMessage = async (req: Request, res: Response) => {
  try {
    const conversationId = req.query.conversationId as string;

    // Check if the conversation exists
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    // Fetch the last message for the conversation
    const lastMessage = await message.findOne({ conversationId }).sort({ createdAt: -1 });


    if (!lastMessage) {
      return res.status(404).json({ error: 'No messages found for the conversation' });
    }

    res.status(200).json(lastMessage);
  } catch (error) {
    console.error('Error fetching last message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}