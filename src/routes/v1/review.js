import express from 'express';

import { makeReview, deleteReview } from '../../controller/review-controller.js';

import { authenticate } from '../../middlewares/authentication.js';

const router = express.Router();

router.post('/create',authenticate, makeReview);
router.delete('/delete',authenticate, deleteReview);


export default router;