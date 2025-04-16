import {Product} from '../models/productModel.js';

export const addProduct= async (req,res)=>{
    try{
        let product= await Product.create(req.body);
        res.json({message:'product added successfully',product,success:true});
    }catch(error){
        res.json(error.message);
    }
}
//get all products
export const getAllProducts= async (req,res)=>{
    try{
        let products=await Product.find();
        if(!products) return res.json({message:'product not found',success:false});
        res.json({message:'fetcheds all products',products,success:true});
    }catch(error){
        res.json(error.message);
    }
}

//get product by id
export const getProductById= async (req,res)=>{
    const id=req.params.id;
    try{
        let product=await Product.findById(id);
        if(!product) return res.json({message:'invalid',success:false});
        res.json({message:`fetched product with id: ${id}`,product,success:true});
    }catch(error){
        res.json(error.message);
    }
}

//update product by id
export const updateProductById= async (req,res)=>{
    const id=req.params.id;
    try{
        let product=await Product.findByIdAndUpdate(id,req.body,{new:true});
        if(!product) return res.json({message:'invalid id',success:false});
        res.json({message:`product updated successfully`,product,success:true});
    }catch(error){
        res.json(error.message);
    }
}

//delete product by id
export const deleteProductById= async (req,res)=>{
    const id=req.params.id;
    try{
        let product=await Product.findByIdAndDelete(id);
        if(!product) return res.json({message:'invalid id',success:false});
        res.json({message:`product deleted successfully`,success:true});
    }catch(error){
        res.json(error.message);
    }
}