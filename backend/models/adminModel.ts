import mongoose, { Document, Model, Schema } from 'mongoose';

const adminschema = new Schema({
    username: {
       type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
      
      }
    ,
    email: {
      type: String,
      required: true,
      match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    }
  })
    
      const adminModel = mongoose.model('admin', adminschema);
      
    
    export default adminModel;
      
  