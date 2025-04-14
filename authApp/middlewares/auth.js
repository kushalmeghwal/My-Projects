//auth isStudent isAdmin

const jwt=require('jsonwebtoken');
require('dotenv').config();


exports.auth=(req,res,next)=>{
    try{
        //extract jwt token
        //pending : other ways to fetch token = req.cookies.token
        const token=req.body.token;

        if(!token){
            return res.status(401).json({
                success:false,
                message:'token missing'
            })
        }
        //varify the token
        try{
            const payload=jwt.verify(token,process.env.JWT_SECRET);
            console.log(payload);
            req.user=payload;
        }
        catch(err){
            return res.status(401).json({
                success:false,
                message:'token is invalid'
            })
        }
        next();
    }
    catch(err){
        return res.status(401).json({
            success:false,
            message:'something went wrong while varifying the token'
        });
    }
}


exports.isStudent=(req,res,next)=>{
    try{
        if(req.user.role!=='Student'){
            return res.status(401).json({
                success:false,
                message:'sorry! this is a protected route for students'
            })
        }
     
        next();
    }
    catch(err){
        return res.status(401).json({
            success:false,
            message:'user role is not matching'
        });
    }
}

exports.isAdmin=(req,res,next)=>{
    try{
        if(req.user.role!=='Admin'){
            return res.status(401).json({
                success:false,
                message:'sorry! this is a protected route for admin'
            })
        }
     
        next();
    }
    catch(err){
        return res.status(401).json({
            success:false,
            message:'user role is not matching'
        });
    }
}

