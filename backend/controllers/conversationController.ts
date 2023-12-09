import { NextFunction, Request, Response, Router } from 'express';
import tokenModel from '../models/tokenModel';
import Conversation from '../models/conversation';

// create conv

export const createConv = async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      const tokenDB = await tokenModel.findOne({ token });
  
      const firstusername = tokenDB?.username;
      const secondusername = req.body.secondusername;
  
      // Check if a conversation already exists between the two users
      const existingConversation = await Conversation.findOne({
        $or: [
          { firstusername, secondusername },
          { firstusername: secondusername, secondusername: firstusername },
        ],
      });
  
      if (existingConversation) {
        // Conversation already exists, return a response indicating that
        return res.status(200).json(existingConversation);
      }
  
      // If no existing conversation, create a new one
      const newConvo = await Conversation.create({ firstusername, secondusername });
      res.status(201).json(newConvo);
    } catch (error) {
      console.error("Error creating conversation:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

// get convs of user

export const getConv = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenDB = await tokenModel.findOne({ token });

    const username = tokenDB?.username;
    const convos = await Conversation.find({
      $or: [{ firstusername: username }, { secondusername: username }],
    });
    
    res.status(200).json(convos);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};