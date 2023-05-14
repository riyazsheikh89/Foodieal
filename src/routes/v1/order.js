import express from 'express';

import { placeOrder} from '../../controller/order-controller.js';
import { authenticate } from '../../middlewares/authentication.js';
import { authorization } from '../../middlewares/authorization.js';

const router = express.Router();


router.post('/create',authenticate, placeOrder);


export default router;