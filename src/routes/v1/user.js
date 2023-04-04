import express from 'express';
import { signup, login } from '../../controller/user-controller.js';

const router = express.Router();

router.post('/create', signup);
router.post('/signin', login);

export default router;