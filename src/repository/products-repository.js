import CrudRepository from './crud-repository.js';
import Products from '../models/products.js';

class ProductRepository extends CrudRepository {
    constructor() {
        super(Products);
    }

    async find(data) {
        try {
            const response = await Products.find(data);
            return response;
        } catch (error) {
            throw error;
        }
    }

}

export default ProductRepository;