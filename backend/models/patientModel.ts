import mongoose, { Document, Model, Schema } from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
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
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other", "Female", "Male"],
    default: "male",
    // Add appropriate values based on your application
  },
  password: {
    type: String,
    required: true,
    // validate: [validatePassword, 'Password must be at least 8 characters long'],
  },
  dateofbirth: {
    type: Date,
    required: true,
  },
  mobilenumber: {
    type: String,
    required: true,
  },
  emergencyContact: {
    fullName: String,
    mobileNumber: String,
    relation: String,
  },
  healthPackageSubscription: [
    {
      name: {
        type: String,
        required: true,
      },
      startdate: {
        type: String,
        required: false,
      },
      enddate: {
        type: String,
        required: false,
      },
      status: {
        type: String,
        enum: [
          "subscribed",
          "unsubscribed",
          "cancelled with end date",
        ],
        required: true,
      },
      payedBy:{
        type: String,
        required: false,
      },
    },
  ],

  familyMembers: [
    {
      name: {
        type: String,
        required: true,
      },
      nationalId: {
        type: String,
        // required: true,
      },
      username: {
        type: String,
        // required: true,
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
        enum: ["wife", "husband", "child", "sister", "brothet"],
        required: true,
      },
      healthPackageSubscription: [
        {
          name: {
            type: String,
            required: true,
          },
          startdate: {
            type: String,
            required: false,
          },
          enddate: {
            type: String,
            required: false,
          },
          status: {
            type: String,
            enum: [
              "subscribed",
              "unsubscribed",
              "cancelled with end date",
            ],
            required: true,
          },
          payedBy: {
            type: String,
            required: false,
          },
        },
      ],
    },
  ],
  walletBalance: {
    type: Number,
    required: true,
    default: 2000,
  },
  deliveryAddress: [
    {
      type: String,
      required: false,
    },
  ],
  carts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

function validatePassword(password: string) {
  return password.length >= 8; // Minimum password length of 8 characters
}
const patientModel = mongoose.model("patient", patientSchema);

export default patientModel;
