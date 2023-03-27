import CrudRepository from './crud-repository.js';
import Products from '../models/products.js';

class ProductsRepository extends CrudRepository {
    constructor() {
        super(Products);
    }
}

export default ProductsRepository;