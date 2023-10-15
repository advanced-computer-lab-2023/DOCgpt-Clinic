import mongoose, { Document, Model, Schema } from 'mongoose';

const adminschema = new Schema({
    username: {
       type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
        validate: [validatePassword, 'Password must be at least 8 characters long'],
        // You may want to add additional password validation logic here
      }})
      function validatePassword(password: string) {
        return password.length >= 8; // Minimum password length of 8 characters
      }
      const adminModel = mongoose.model('admin', adminschema);
      
    
    export default adminModel;
      
  