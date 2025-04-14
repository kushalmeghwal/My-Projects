const mongoose=require('mongoose');

const connectDb=()=>{
    mongoose.connect(process.env.DATABASE_URL,{})
    .then(console.log('DB connected successfully'))
    .catch((error)=>{
        console.log('DB not connected');
        console.log(error);
        process.exit(1);
    })
};
module.exports=connectDb;