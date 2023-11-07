import mongoose, { Document, Model, Schema } from 'mongoose';


const tokenschema= new mongoose.Schema({
    token: {
        type:String,
        required:true
    },

    username:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }
})
const tokenModel = mongoose.model('Token', tokenschema);
  

export default tokenModel;