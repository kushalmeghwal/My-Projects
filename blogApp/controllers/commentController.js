//import model
const Comment=require('../models/commentModel');
const Post=require('../models/postModel');

//business logic

exports.createComment=async (req,res)=>{
    try{
        //fetch data from req body
        const {post,user,body}=req.body;
        //create a comment object
        const comment=new Comment({
            post,user,body
        });

        //save the new comment into database
        const savedcomment=await comment.save();
        //find the post by id,add the new comment to its comments array
        const updatedPost=await Post.findByIdAndUpdate(post,{$push: {comments:savedcomment._id}},{new:true})
        .populate('comments')//populate the comments array with comment document
        .exec();

        res.json({
            post:updatedPost,
        })
    }
    catch(err){
        return res.status(500).json({
            err:'error while commenting',
        });
    }
};