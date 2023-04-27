import ReviewService from "../services/review-service.js";

const reviewService = new ReviewService();

export const makeReview = async (req, res) => {
    try {
        const review = await reviewService.createReview(
            req.body.data,
            req.body.rating,
            req.body.productId,
            req.user.id
            );
        return res.status(200).json({
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

export const deleteReview = async (req, res) => {
    try {
        const response = await reviewService.deleteById(req.body.reviewId);
        return res.status(200).json({
            success: true,
            message: 'Successfully deleted the review',
            data: response,
            err: {}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to deleted the review',
            data: {},
            err: error
        })
    }
}

// Update the review content only
export const updateReview = async (req, res) => {
    try {
        const response = await reviewService.updateById(req.body.id, req.body.content);
        return res.status(200).json({
            success: true,
            message: 'Successfully updated the review',
            data: response,
            err: {}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to update the review',
            data: {},
            err: error
        })
    }
}

// Get all the reviews of a product
export const getAllReviews = async (req, res) => {
    try {
        const response = await reviewService.getProductAllReviews(req.body.productId);
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched all the reviews',
            data: response,
            err: {}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to get all review',
            data: {},
            err: error
        })
    }
}