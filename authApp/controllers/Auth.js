const bcrypt=require('bcrypt');
const User=require('../models/User');
const jwt=require('jsonwebtoken');
require('dotenv').config();

exports.signup=async (req,res)=>{
    try{
        //fetch4ap data
       const {name,email,password,role}=req.body;
       //check if user already exists
       const existingUser=await User.findOne({email});
       if(existingUser){
        return res.status(400).json({
            success:false,
            message:'user already existed'
        });
       }
       //secure password
       try{
        hashedPassword=await bcrypt.hash(password,10);
       }
       catch(err){
        return res.status(500).json({
            success:false,
            message:'error while hashing password'
        });
       }
       //create entry in db for user
       const user=await User.create({
        name,email,password:hashedPassword,role
       });

       return res.status(200).json({
        success:true,
        message:'user created successfully'
       });

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'user can not be registered,try again later' 
        })
    }
}

exports.login= async (req,res)=>{
    try{
        //data search
        const {email,password}=req.body;
        //validation
        if(!email || !password){
            return res.status(400).json({
                success:false, 
                message:'please fill all uthe details'
            });
        }
        //check for registered user
        const user=await User.findOne({email});
        //if not a registered user
        if(!user){
            return res.status(401).json({
                success:false, 
                message:'user is not registered'
            });
        }
        const payload={
            email:user.email,
            id:user._id,
            role:user.role
        };
        //varify password and generate a JWT token
        if(bcrypt.compare(password, user.password)){
            //password match
            let token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h"});
            // user=user.toObject();
            user.token=token;
            user.password=undefined; 
            const options={
                expires: new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                user,
                token,
                message:"user logged in successfully"
            });
        }
        else{
            //password do not match
            return res.status(403).json({
                success:false,  
                message:'incorrect password'
            });
        }
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'login failed' 
        })
    }
}