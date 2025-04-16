import express from 'express';
import {addProduct,deleteProductById,getAllProducts, getProductById, updateProductById} from '../controllers/productController.js';
const router=express.Router();

router.post('/add',addProduct);
router.get('/allProducts',getAllProducts);
router.get('/:id',getProductById);
router.put('/:id',updateProductById);
router.delete('/:id',deleteProductById);

export default router; 
