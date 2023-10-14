import mongoose, { Document, Model, Schema,modelNames } from 'mongoose';


const packageschema = new Schema({
    name: {
       type: String,
        required: true,
    },

    feesPerYear: {
        type:Number,
        required: true,},
    doctorDiscount:
    {
        type:Number,
        required: true,

    },
    medicineDiscount:
    {
        type:Number,
        required: true,

    },
    familysubscribtionDiscount:
    {
        type:Number,
        required: true,

    }
})
        
      const packageModel = mongoose.model('package', packageschema);
      
    
    export default packageModel;
      