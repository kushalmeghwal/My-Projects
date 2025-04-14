import {User} from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register=async(req,res)=>{
    const {name,email,password}=req.body;
    let user=await User.findOne({email});
    if(user) return res.json({message:'user already exists',success:false});
    const hashPassword= await bcrypt.hash(password,10);
    user=await User.create({
        name,
        email,
        password:hashPassword
    });
    res.json({message:'user registered successfully',success:true});
}

export const login=async(req,res)=>{
    const {email,password}=req.body;
    let user=await User.findOne({email});
    if(!user) return res.json({message:'user dont exists',success:false});
    const validPass=bcrypt.compare(password,user.password);
    if(!validPass) return res.json({message:'invalid password',success:false});
    const token=jwt.sign(
        {userId:user._id},
        process.env.JWT_SECRET,
        {expiresIn:'1d'}
    );
    res.cookie('token',token,{});
    res.json({message:`welcome ${user.name} aapka swagat hai`,token,success:true});
}