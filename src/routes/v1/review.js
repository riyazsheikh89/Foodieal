import express from 'express';

import { makeReview } from '../../controller/review-controller.js';

import { authenticate } from '../../middlewares/authentication.js';

const router = express.Router();

router.post('/create',authenticate, makeReview);


export default router;