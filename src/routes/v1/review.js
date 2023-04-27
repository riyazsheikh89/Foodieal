import express from 'express';

import { makeReview, deleteReview, updateReview, getAllReviews } from '../../controller/review-controller.js';

import { authenticate } from '../../middlewares/authentication.js';

const router = express.Router();

router.post('/create',authenticate, makeReview);
router.delete('/delete',authenticate, deleteReview);
router.patch('/update',authenticate, updateReview);
router.get('/get-reviews', getAllReviews);


export default router;