// import mongoose, { Document, Model, Schema } from 'mongoose';

// // Define an interface for the workout document

  
//   const patientschema = new Schema({
//     username: {
//        type: String,
//         required: true,
//     },
//     name: {
//       type: String,
//         required: true,
//     },

//      email: {
//       type: String,
//       required: true,
//       match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,

//      },
//      password: {
//       type: String,
//       required: true,
//       validate: [validatePassword, 'Password must be at least 8 characters long'],
//       // You may want to add additional password validation logic here
//     },
//     dateofbirth:{
//       type: Date,
//       required: true,

//     },
//     mobilenumber:{
//       type: Number,
//       required: true,

//     },
//     emergencyContact: {
//     fullName: String,
//     mobileNumber: String,
//     relation: String,
//     }
//   })
  
//   function validatePassword(password: string) {
//     return password.length >= 8; // Minimum password length of 8 characters
//   }
//   const PatientModel = mongoose.model('Patient', patientschema);
//   ;

// export default PatientModel;




// const mongoose = require('mongoose');

// const familyMemberSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   nationalId: {
//     type: String,
//     required: true,
//   },
//   age: {
//     type: Number,
//     required: true,
//   },
//   gender: {
//     type: String,
//     required: true,
//   },
//   relationToPatient: {
//     type: String,
//     enum: ['wife', 'husband', 'child'],
//     required: true,
//   },
// });

// const prescriptionSchema = new mongoose.Schema({
//   doctorId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Doctor',
//     required: true,
//   },
//   date: {
//     type: Date,
//     required: true,
//   },
//   filled: {
//     type: Boolean,
//     default: false,
//   },
// });

// const patientSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },

//   email: {
//     type: String,
//     required: true,
//     match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
//   },
//   password: {
//     type: String,
//     required: true,
//     validate: [validatePassword, 'Password must be at least 8 characters long'],
//   },
//   dateofbirth: {
//     type: Date,
//     required: true,
//   },
//   mobilenumber: {
//     type: Number,
//     required: true,
//   },
//   emergencyContact: {
//     fullName: String,
//     mobileNumber: String,
//     relation: String,
//   },
//   familyMembers: [familyMemberSchema],
//   prescriptions: [prescriptionSchema],
// });

// function validatePassword(password: string) {
//   return password.length >= 8; // Minimum password length of 8 characters
// }

// const PatientModel = mongoose.model('Patient', patientSchema);

// export default PatientModel;



import mongoose, { Document, Model, Schema } from 'mongoose';

// Define an interface for the workout document

  
  // const patientschema = new Schema({
  //   username: {
  //      type: String,
  //       required: true,
  //   },
  //   name: {
  //     type: String,
  //       required: true,
  //   },

  //    email: {
  //     type: String,
  //     required: true,
  //     match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,

  //    },
  //    password: {
  //     type: String,
  //     required: true,
  //     validate: [validatePassword, 'Password must be at least 8 characters long'],
  //     // You may want to add additional password validation logic here
  //   },
  //   dateofbirth:{
  //     type: Date,
  //     required: true,

  //   },
  //   mobilenumber:{
  //     type: Number,
  //     required: true,

  //   },
  //   emergencyContact: {
  //   fullName: String,
  //   mobileNumber: String,
  //   relation: String,
  //   }
  // })
  
  
  






// const familyMemberSchema = new mongoose.Schema({
//   name: {
//     // type: String,
//     required: true,
//   },
//   nationalId: {
//     type: String,
//     required: true,
//   },
//   age: {
//     type: Number,
//     required: true,
//   },
//   gender: {
//     type: String,
//     required: true,
//   },
//   relationToPatient: {
//     type: String,
//     enum: ['wife', 'husband', 'child'],
//     required: true,
//   },
// });


const prescriptionSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  filled: {
    type: Boolean,
    default: false,
  },
});

export const patientSchema = new mongoose.Schema({
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
  dateofbirth: {
    type: Date,
    required: true,
  },
  mobilenumber: {
    type: Number,
    required: true,
  },
  emergencyContact: {
    fullName: String,
    mobileNumber: String,
    relation: String,
  },
  familyMembers:[{ name: {
    type: String,
    required: true,
  },
  nationalId: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  relationToPatient: {
    type: String,
    enum: ['wife', 'husband', 'child'],
    required: true,
  }}]
});

function validatePassword(password: string) {
  return password.length >= 8; // Minimum password length of 8 characters
}
 const patientModel = mongoose.model('patient', patientSchema);
  ;




export default patientModel;