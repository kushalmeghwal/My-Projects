const mongoose = require('mongoose');
const nodemailer=require('nodemailer');


const fileSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String
    },
    tags:{
        type:String
    },
    email:{
        type:String
    }
});

//post middleware=db entry ke turant bad chalne wale
fileSchema.post('save',async function(doc) {
    try{
        console.log('doc',doc);
        //transporter
        //shift this configuration to config folder
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        });
        //send mail
        let info=await transporter.sendMail({
            from:`fileUpload-by kushal`,
            to:doc.email,
            subject:'file uploaded on cloudinary',
            html:`<h1>hello file upload ho gayi</h1> <p>ye rhi photo <a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`
        })
    }
    catch(err){
        console.error(err);
    }
    
})

const File=mongoose.model('File',fileSchema);
module.exports=File;