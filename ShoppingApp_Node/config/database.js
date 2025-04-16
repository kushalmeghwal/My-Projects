import mongoose from "mongoose";
import 'dotenv/config';
const connectDb=mongoose.connect(process.env.DB_URI);
    try{
        console.log('database connected');
    }catch(err){
        console.log('database not connected : error->',err);
    }

export default connectDb;