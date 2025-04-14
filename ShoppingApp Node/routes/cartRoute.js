import express from 'express';
import { addToCart, clearCart, decreaseQuantity, removeProductFromCart, userCart } from '../controllers/cartController.js';
import { isAuthenticated } from '../middlewares/auth.js';
const router=express.Router();

router.post('/add',isAuthenticated,addToCart);
router.get('/userCart',isAuthenticated,userCart);
router.delete('/remove/:productId',isAuthenticated,removeProductFromCart);
router.delete('/clear',isAuthenticated,clearCart);
router.post('/decrease',isAuthenticated,decreaseQuantity);
export default router; 