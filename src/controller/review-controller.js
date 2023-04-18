import ReviewService from "../services/review-service.js";

const reviewService = new ReviewService();

export const makeReview = async (req, res) => {
    try {
        const review = await reviewService.createReview(
            req.body.data,
            req.body.rating,
            req.body.productId,
            req.body.userId
            );
        return res.status(500).json({
            success: true,
            message: 'Successfully post a review',
            data: review,
            err: {}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Unable to make a review',
            data: {},
            err: error
        })
    }
}