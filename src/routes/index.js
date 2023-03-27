import express from 'express';

import userRoutes from './v1/user.js';
import productsRoute from './v1/products.js'

const router = express.Router();

router.use('/users', userRoutes);
router.use('/products', productsRoute);

export default router;