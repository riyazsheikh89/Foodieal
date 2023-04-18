import express from 'express';

import { makeReview } from '../../controller/review-controller.js';


const router = express.Router();

router.post('/create', makeReview);


export default router;