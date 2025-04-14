const express=require('express');
const app=express();

//load config from env file
require('dotenv').config();
const PORT=process.env.PORT || 4000;

//middleware parse into json from request body
app.use(express.json());

//import routes for Todo api
const todoRoutes=require('./routes/todos');

//mount the Todo api routes
app.use('/api/v1',todoRoutes);

//start server
app.listen(PORT,()=>{
    console.log(`server started successfully at port no: ${PORT}`);
});

//connect MongoDb
const dbConnect=require('./config/database');
dbConnect();

//default route
app.get('/',(req,res)=>{
    res.send(`<h1> this is homepage </h1>`);
});