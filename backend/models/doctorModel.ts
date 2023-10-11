import mongoose, { Document, Model, Schema, modelNames } from 'mongoose';

const doctorSchema =new mongoose.Schema(
    {
        username: {
            type: String,
             required: true,
         },
         name: {
           type: String,
           required: true,
         },
     
          email: {
           type: String,
           required: true,
           match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
     
          },
          password: {
           type: String,
           required: true,
           validate: [validatePassword, 'Password must be at least 8 characters long'],
           // You may want to add additional password validation logic here
         },
         dateofbirth:{
           type: Date,
           required: true,
     
         },
         hourlyrate:{
            type:Number,
            requied:true
         },
         affiliation:{
            type: String,
           required: true
         },
         educationalBackground:{
            type: String,
           required: true
         }


    }
)
function validatePassword(password: string) {
    return password.length >= 8; // Minimum password length of 8 characters
  }
  const doctorModel = mongoose.model('doctor', doctorSchema);
  

export default doctorModel;