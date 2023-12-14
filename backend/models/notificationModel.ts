import mongoose, { Document, Model, Schema } from 'mongoose';

export const notificationSchema = new mongoose.Schema({
    patientUsername: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    msg:{
        type: String,
        required: true
    },
    read:{
        type: Boolean,
        required: false,
        default :false
    },
  

});

const notificationtModel= mongoose.model('notification', notificationSchema);

export default notificationtModel;