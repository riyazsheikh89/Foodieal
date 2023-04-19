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

            // calculate the avg. rating of the product and save
            const reviewsBelongToProduct = await Review.find({ productId });
            const length = reviewsBelongToProduct.length;
            let totalRatings = 0;
            reviewsBelongToProduct.forEach((element) => {
              totalRatings += element.rating;
            });
            product.rating = Math.floor(totalRatings / length);
            await product.save();

            return review;
        } catch (error) {
            throw error;
        }
    }
}


export default ReviewService;