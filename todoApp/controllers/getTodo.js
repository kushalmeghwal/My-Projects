//import the model
const Todo=require('../models/Todo');


//define router handler

exports.getTodo= async(req,res)=>{
    try{
        //fetch all todo items from database
        const todos=await Todo.find({});
        //response 
        res.status(200)
        .json({
            success:true,
            data:todos,
            message:'entire data is fetched',
        })
    }
    catch(err){
        console.error(err);
        res.status(500)
        .json({
            success:false,
            error:err.message,
            message:'server error'
        })
    }
}

exports.getTodoById= async(req,res)=>{
    try{
        //extract todo item basis on id
        const id=req.params.id;
        const todo=await Todo.findById({_id:id});

        //id not found
        if(!todo){
            return res.status(404)
            .json({
                success:false,
                message:'data not found with given id',
            })
        }
        //id found
        res.status(200)
        .json({
            success:true,
            data:todo,
            message:`data found with given id ${id} hurray!!`
        })
    }
    catch(err){
        console.error(err);
        res.status(500)
        .json({
            success:false,
            error:err.message,
            message:'server error'
        })
    }
}