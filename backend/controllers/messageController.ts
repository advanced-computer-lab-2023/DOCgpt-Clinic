import { NextFunction, Request, Response, Router } from 'express';
import tokenModel from '../models/tokenModel';
import message from '../models/message';

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