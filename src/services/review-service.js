import ReviewRepository from "../repository/review-repository.js";
import ProductRepository from "../repository/products-repository.js";
import Review from "../models/Review.js";

class ReviewService {
    constructor() {
        this.reviewRepository = new ReviewRepository();
        this.productRepository = new ProductRepository();
    }

    async createReview(body, rating, productId, userId) {
        try {
            let product = await this.productRepository.get(productId);
            const review = await Review.create({ body, rating, productId, userId });
            // Save the review _id inside reviews of Products Collection
            product.reviews.push(review._id);
            await product.save();
            return review;
        } catch (error) {
            throw error;
        }
    }
}


export default ReviewService;