const express=require('express');
const router=express.Router();

const {login,signup}=require('../controllers/Auth');
const {auth,isStudent,isAdmin}=require('../middlewares/auth');

router.post('/login',login);
router.post('/signup',signup);

//protecter routes
router.get('/student',auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:'welcome to the protected route for Students'
    });
});
router.get('/admin',auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:'welcome to the protected route for Admin'
    });
});

//using single middleware
router.get('/test',auth,(req,res)=>{
    res.json({
        success:true,
        message:'welcome to the protected route for test'
    });
});

module.exports=router;    