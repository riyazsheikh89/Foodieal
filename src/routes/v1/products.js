import express from 'express';

import { 
    createProduct, 
    getAllProducts, 
    getProduct, 
    getByCategory, 
    deleteProduct,
    searchProducts
} from '../../controller/products-controller.js';
import { authenticate } from '../../middlewares/authentication.js';
import { authorization } from '../../middlewares/authorization.js';

const router = express.Router();

// these tasks can be performed by the 'admin' role only
router.post('/createProduct',authenticate,authorization, createProduct);    // create a product
router.delete('/delete',authenticate,authorization, deleteProduct);         // delete a product

router.get('/product/:id', getProduct);     // get a particular product by it's id
router.get('/get-all', getAllProducts);    // get all products from DB
router.get('/category', getByCategory);     // get products by a category
router.get('/search-products', searchProducts);


export default router;