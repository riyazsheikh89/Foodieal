import express from 'express';

import { 
    signup, login, myProfile, logout, forgotPassword, resetPassword, updatePassword, updateAvatar,
    getAllUsers, updateUserRole
} from '../../controller/user-controller.js';
import { authenticate } from '../../middlewares/authentication.js';
import { authorization } from '../../middlewares/authorization.js';

const router = express.Router();

router.post('/create', signup);
router.post('/signin', login);
router.post('/logout', logout);
router.get('/profile', authenticate, myProfile);

router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);  // patch: as it ia a partial update
router.patch('/update-password', authenticate, updatePassword);
router.patch('/update-avatar', authenticate, updateAvatar)

// ADMIN only access
router.get('/admin/get-all-users',authenticate, authorization, getAllUsers);
router.patch('/admin/update-user-role',authenticate, authorization, updateUserRole);

export default router;