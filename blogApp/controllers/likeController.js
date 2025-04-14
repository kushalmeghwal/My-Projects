//import model
const Like=require('../models/likeModel');
const Post=require('../models/postModel');

//business logic
//for liking a post
exports.likePost=async (req,res)=>{
    try{
        //fetch data from req body
        const {post,user}=req.body; //user = jo like kr rha h 
        //create a like object
        const like=new Like({
            post,user,
        });

        //save the new like into database
        const savedLike=await like.save();
        //find the post by id,add the new like to its likes array
        const updatedPost=await Post.findByIdAndUpdate(post,{$push: {likes:savedLike._id}},{new:true})
        .populate('likes')//populate the likes array with like document
        .exec();

        res.json({
            post:updatedPost,
        })
    }
    catch(err){
        return res.status(500).json({
            err:'error while liking',
        });
    }
};

//unliking a post
exports.unlikePost= async(req,res)=>{
  try{
       //fetch data from req body
       const {post,user}=req.body; //user = jisne like kiya tha
       //delete the new like from like collection from database
       const unLike=await Like.findOneAndDelete({post:post,_id:user});
       //update post collection in database
       const updatedPost=await Post.findByIdAndUpdate(post,{$pull: {likes:unLike._id}},{new:true})
      
       res.json({
        post:updatedPost,
       })
 
  }
  catch(err){
    return res.status(500).json({
      err:'error while unliking',
  });
  }
}


//dummy route
exports.dummyLink=(req,res)=>{
  res.send('this is dummy page');
};