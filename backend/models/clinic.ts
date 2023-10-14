import mongoose, { Document, Model, Schema } from 'mongoose';

interface IClinic extends Document {
  markup: number;
  // Add other properties specific to the Clinic model
}

const clinicSchema: Schema<IClinic> = new mongoose.Schema<IClinic>({
  markup: {
    type: Number,
    required: true,
  },
  // Add other properties specific to the Clinic model
});