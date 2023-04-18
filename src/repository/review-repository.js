import CrudRepository from './crud-repository.js';
import Review from '../models/products.js';

class ReviewRepository extends CrudRepository {
    constructor() {
        super(Review);
    }

}

export default ReviewRepository;