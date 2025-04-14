//import model

const Post=require('../models/postModel');

//business logic

exports.createPost=async (req,res)=>{
    try{
        //fetch data from req body
        const {title,body}=req.body;
        //create a comment object
        const post=new Post({ 
            title,body
        });

        //save the new comment into database
        const savedPost=await post.save();
        
        res.status(200)
        .json({
            post:savedPost,
        })
    }
    catch(err){
        return res.status(500).json({
            err:'error while posting',
        });
    }
};

exports.getAllPosts=async(req,res)=>{
    try{
        const posts=await Post.find().populate('likes').populate('comments').exec();
        res.json({
            posts,
        })
    }
    catch(err){
        return res.status(500).json({
            err:'error while fetching posts',
        });
    }
}