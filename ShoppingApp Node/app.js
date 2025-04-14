import express from 'express';
import connectDb from './config/database.js';
import bodyParser from 'body-parser';
import {config} from 'dotenv';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';

const app=express();


app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
config({path:'.env'});


app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);



//default route
app.get('/',(req,res)=>{
    res.json({message:'welcome my friend welcome'});
});


const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`app is running on port no:${PORT}`);
})