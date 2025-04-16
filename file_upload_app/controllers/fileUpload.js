const { text } = require('express');
const File=require('../models/File');
const cloudinary=require('cloudinary').v2;
exports.localFileUpload=async (req,res)=>{
    try{
        //fetch file
        const file=req.files.file;
        console.log(file);

        let path=__dirname+"/files/"+Date.now()+`.${file.name.split('.')[1]}`;
        console.log('path->',path);
        file.mv(path,(err)=>{
            console.log(err);
        });

        res.json({
            success:true,
            message:'loacl file uploaded successfully',
        });
    }
    catch(err){
        console.log('file uploading error');
        console.log(err);
    }
}

function isFileTypeSupported(type,supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file,folder,quality){
    const options={folder};
    console.log('tmp',file.tempFilePath);
    if(quality){
        options.quality=quality;
    }
    options.resource_type='auto';
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

//image upload handler
exports.imageUpload=async (req,res)=>{
    try{
        //data fetch
        const {name,tags,email}=req.body;
        console.log(name,tags,email);

        const file=req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes=["jpg","jpeg","png"];
        const fileType=file.name.split('.')[1].toLowerCase();
    
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'file format is not supported'
            })
        }
        //supported file format
       
        const response = await uploadFileToCloudinary(file,"fileUpload");
        console.log(response);
        //db entry
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'image uploaded successfully'
        });
    }
    catch(err){
        console.error(err);
        res.status(400).json({
            success:false,
            message:'something went wrong'
        });
    }
}


//video upload handler
exports.videoUpload=async (req,res)=>{
    try{
        //data fetch
        const {name,tags,email}=req.body;
        console.log(name,tags,email);

        const file=req.files.videoFile;
        console.log(file);

        //validation
        const supportedTypes=['mp4','mov'];
        const fileType=file.name.split('.')[1].toLowerCase();
        //TODO: add a upper limit of 5 mb 
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'file format is not supported'
            })
        }
        //supported file format
        console.log('uploading to fileUpload');
        const response = await uploadFileToCloudinary(file,"fileUpload");
        console.log(response);
        //db entry
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'video uploaded successfully'
        });
    }
    catch(err){
        console.error(err);
        res.status(400).json({
            success:false,
            message:'something went wrong'
        });
    }
}

//image size reducer

exports.imageSizeReducer=async (req,res)=>{
    try{
        //data fetch
        const {name,tags,email}=req.body;
        console.log(name,tags,email);

        const file=req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes=["jpg","jpeg","png"];
        const fileType=file.name.split('.')[1].toLowerCase();
    
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'file format is not supported'
            })
        }
        //supported file format
       
        const response = await uploadFileToCloudinary(file,"fileUpload",20);
        console.log(response);
        //db entry
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'image uploaded successfully'
        });
    }
    catch(err){
        console.error(err);
        res.status(400).json({
            success:false,
            message:'something went wrong'
        });
    }
}