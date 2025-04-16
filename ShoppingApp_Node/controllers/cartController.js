import { it } from 'node:test';
import {Cart} from '../models/cartModel.js';
import { User } from '../models/userModel.js';

export const addToCart= async (req,res)=>{
    const {productId,title,price,quantity}=req.body;
    const userId=req.user;
    let cart=await Cart.findOne({userId});
    if(!cart) cart=new Cart({userId,items:[]});
    const itemIndex=cart.items.findIndex(
        (item)=>item.productId.toString()==productId
    );
    if(itemIndex>-1){
        cart.items[itemIndex].quantity+=quantity;
        cart.items[itemIndex].price+=price*quantity;
    }else{
        cart.items.push({productId,title,price,quantity})
    }
    await cart.save();
    res.json({message:'items added to cart',cart,success:true});
}

//user's cart
export const userCart= async (req,res)=>{
    const userId=req.user;
    let cart=await Cart.findOne({userId});
    if(!cart) return res.json({message:'cart not found'});
    res.json({message:'user cart',cart});
}

//remove product from cart
export const removeProductFromCart=async (req,res)=>{
    const productId=req.params.productId;
    const userId=req.user;
    let cart=await Cart.findOne({userId});
    if(!cart) return res.json({message:'cart not found'});
    cart.items=cart.items.filter((item)=>item.productId.toString()!==productId)
    await cart.save();
    res.json({message:'product is removed from cart'});
}
//delete all
export const clearCart= async (req,res)=>{
    const userId=req.user;
    let cart=await Cart.findOne({userId});
    if(!cart){
        cart=new Cart({items:[]});
    }else{
        cart.items=[];
    }
    await cart.save();
    res.json({message:'user cart cleared'});
}
//remove quantity
export const decreaseQuantity= async (req,res)=>{
const {productId,quantity}=req.body;
const userId=req.user;
let cart=await Cart.findOne({userId});
if(!cart) cart=new Cart({userId,items:[]});
const itemIndex=cart.items.findIndex(
    (item)=>item.productId.toString()==productId
);
if(itemIndex>-1){
 const item=cart.items[itemIndex];
 if(item.quantity>quantity){
    const pricePerUnit=item.price/item.quantity;
    item.quantity-=quantity;
    item.price-=pricePerUnit*quantity;
 }else{
    cart.items.splice(itemIndex,1);
 }
}else{
   return res.json({message:'invalid product id'});
}
await cart.save();
res.json({message:'quantity decreased successfully',cart,success:true});
}














// ye project->uber->cookies->mera_app->neo4j