import express from 'express';
import { signup, signin } from '../../controller/user-controller.js';

const router = express.Router();

router.post('/create', signup);
router.post('/signin', signin);

export default router;