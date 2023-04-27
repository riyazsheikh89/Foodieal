import CrudRepository from './crud-repository.js';
import Products from '../models/products.js';

class ProductRepository extends CrudRepository {
    constructor() {
        super(Products);
    }

    async find(id) {
        try {
            const response = await Products.findById(id).populate('reviews');
            return response;
        } catch (error) {
            throw error;
        }
    }

}

export default ProductRepository;