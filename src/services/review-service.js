import ReviewRepository from "../repository/review-repository.js";
import ProductRepository from "../repository/products-repository.js";
import Review from "../models/review.js";

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
            product.rating = Math.round(totalRatings / length);
            await product.save();

            return review;
        } catch (error) {
            throw error;
        }
    }


    async deleteById(id) {
        try {
            // delete from review model
            const review = await this.reviewRepository.destroy(id);
            // find the product associated with the review
            const product = await this.productRepository.get(review.productId);

            // delete the review from te Product reviews array
            for (let i=0; i<product.reviews.length; i++) {
                if (product.reviews[i] == review._id) {
                    product.reviews.splice(i, i);
                    await product.save();
                    break;
                }
            }
            return review;
        } catch (error) {
            throw error;
        }
    }
}


export default ReviewService;