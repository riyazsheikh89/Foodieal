import express from 'express';

import { 
    placeOrder,
    getOrderDetails,
    getMyOrders,
    getAllOrders,
} from '../../controller/order-controller.js';

import { authenticate } from '../../middlewares/authentication.js';
import { authorization } from '../../middlewares/authorization.js';

const router = express.Router();


router.post('/create',authenticate, placeOrder);
router.get('/get/:orderId',authenticate, getOrderDetails);  //get a order details
router.get('/my-orders',authenticate, getMyOrders);         //get all my orders

// ADMIN ONLY
router.get('/admin/get-all-orders', authenticate, authorization, getAllOrders);

export default router;