import express from 'express';

import { 
    placeOrder,
    getOrderDetails,
} from '../../controller/order-controller.js';

import { authenticate } from '../../middlewares/authentication.js';
import { authorization } from '../../middlewares/authorization.js';

const router = express.Router();


router.post('/create',authenticate, placeOrder);
router.get('/get/:orderId', getOrderDetails);


export default router;