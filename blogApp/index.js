const express=require('express');
const app=express();

require('dotenv').config();
const PORT=process.env.PORT || 4000;
//middleware
app.use(express.json());
//route
const blog=require('./routes/blog');
//mountac
app.use('/api/v1',blog);
//db connction
const connectDb=require('./config/database');
connectDb();
//default route
app.get('/',(req,res)=>{
    res.send('hello guys');
})
app.listen(PORT,()=>{
    console.log(`app is running at port no. ${PORT}`);
})
