import express from 'express';

import { 
    signup, login, myProfile, logout, forgotPassword, resetPassword,
} from '../../controller/user-controller.js';
import { authenticate } from '../../middlewares/authentication.js';

const router = express.Router();

router.post('/create', signup);
router.post('/signin', login);
router.get('/logout', logout);
router.get('/profile',authenticate, myProfile);

router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);  // patch: as it ia a partial update

export default router;