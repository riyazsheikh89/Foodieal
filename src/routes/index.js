import express from 'express';

import userRoutes from './v1/user.js';
import productsRoute from './v1/products.js'
import reviewRoute from './v1/review.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/products', productsRoute);
router.use('/products/review', reviewRoute);

export default router;