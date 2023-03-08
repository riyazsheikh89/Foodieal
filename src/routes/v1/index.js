import express from 'express';
import { signup } from '../../controller/user-controller.js';

const router = express.Router();

router.post('/create', signup);

export default router;