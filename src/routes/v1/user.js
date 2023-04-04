import express from 'express';

import { 
    signup,
    login,
    getUser,
    logout 
} from '../../controller/user-controller.js';
import { authenticate } from '../../middlewares/authentication.js';

const router = express.Router();

router.post('/create', signup);
router.post('/signin', login);
router.get('/logout', logout);
router.get('/user',authenticate, getUser);

export default router;