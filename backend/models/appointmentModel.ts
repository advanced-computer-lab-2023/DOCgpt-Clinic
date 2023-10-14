import mongoose, { Document, Model, Schema } from 'mongoose';

export const appointmentSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['upcoming', 'completed', 'cancelled', 'rescheduled'],
        required: false
    },
    doctor: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        required: true
    },
    patient: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },

});

const appointmentModel= mongoose.model('appoinment', appointmentSchema);

export default appointmentModel;