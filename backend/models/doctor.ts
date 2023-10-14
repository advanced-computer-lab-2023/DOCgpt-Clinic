import mongoose, { Document, Model, Schema } from 'mongoose';

  
export interface IDoctor extends Document {
  username: string;
  name: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  hourlyRate: number;
  affiliation: string;
  speciality: string;
  educationalBackground: string;
}

const doctorSchema: Schema = new mongoose.Schema({
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
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  hourlyRate: {
    type: Number,
    required: true,
  },
  affiliation: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
  educationalBackground: {
    type: String,
    required: true,
  },
});

function validatePassword(password: string) {
  return password.length >= 8; // Minimum password length of 8 characters
}

//export default mongoose.model<IDoctor>('Doctor', doctorSchema);

const Doctor: Model<IDoctor> = mongoose.model<IDoctor>('Doctor', doctorSchema);

export default Doctor;






// import mongoose, { Document, Model, Schema, modelNames } from 'mongoose';

// const doctorSchema =new mongoose.Schema(
//     {
//         username: {
//             type: String,
//              required: true,
//          },
//          name: {
//            type: String,
//            required: true,
//          },
     
//           email: {
//            type: String,
//            required: true,
//            match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
     
//           },
//           password: {
//            type: String,
//            required: true,
//            validate: [validatePassword, 'Password must be at least 8 characters long'],
//            // You may want to add additional password validation logic here
//          },
//          dateofbirth:{
//            type: Date,
//            required: true,
     
//          },
//          hourlyrate:{
//             type:Number,
//             requied:true
//          },
//          affiliation:{
//             type: String,
//            required: true
//          },
//          educationalBackground:{
//             type: String,
//            required: true
//          }


//     }
// )
// function validatePassword(password: string) {
//     return password.length >= 8; // Minimum password length of 8 characters
//   }
//   const doctorModel = mongoose.model('Doctor', doctorSchema);
  

// export default doctorModel;