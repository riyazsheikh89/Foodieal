import CrudRepository from './crud-repository.js';
import Products from '../models/products.js';

class ProductsRepository extends CrudRepository {
    constructor() {
        super(Products);
    }

    async getByCategory(filter) {
       try {
        const products = await Products.find({category: filter});
        return products;
       } catch (error) {
        throw error;
       }
    }
}

export default ProductsRepository;