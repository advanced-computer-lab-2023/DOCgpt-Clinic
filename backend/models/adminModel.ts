import mongoose, { Document, Model, Schema } from 'mongoose';

const adminschema = new Schema({
    username: {
       type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
      
      }})
    
      const adminModel = mongoose.model('admin', adminschema);
      
    
    export default adminModel;
      
  