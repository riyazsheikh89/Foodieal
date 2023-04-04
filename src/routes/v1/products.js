import express from 'express';

import { 
    createProduct, 
    getAllProducts, 
    getProduct, 
    getByCategory, 
    deleteProduct 
} from '../../controller/products-controller.js';
import { authenticate } from '../../middlewares/authentication.js';

const router = express.Router();

router.post('/createProduct', createProduct);
router.get('/product/:id', getProduct);
router.get('/products', getAllProducts);
router.get('/category', getByCategory);
router.delete('/delete', deleteProduct);


export default router;