import mongoose from 'mongoose';

const productSchema=mongoose.Schema({
    title:{type:String,require:true},
    price:{type:String,require:true},
    catagory:{type:String,require:true},
    description:{type:String,default:"no more detail available"}
},{strict:false});

export const Product=mongoose.model('products',productSchema);