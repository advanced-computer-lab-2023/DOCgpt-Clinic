import mongoose, { Document, Model, Schema } from 'mongoose';


const ConversationSchema = new mongoose.Schema(
    {
      firstusername:String,
      secondusername:String,
    },
    { timestamps: true }
  );


  const Conversation= mongoose.model('Conversation', ConversationSchema);
  export default Conversation;
