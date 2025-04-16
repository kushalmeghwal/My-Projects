import {User} from '../models/userModel.js';
import jwt from 'jsonwebtoken';
export const isAuthenticated=async (req,res,next)=>{
    const token=req.header('auth');
    if(!token) return res.json({message:'login first'});
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    const id=decoded.userId;
    let user=await User.findById(id);
    if(!user) return res.json({message:'user not found'});
    req.user=user;
    next();
};