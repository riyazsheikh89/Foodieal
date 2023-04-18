import ProductRepository from "../repository/products-repository.js";
import { deleteFile } from '../utils/s3-operations.js';

class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  // Create a new Product
  async createNewProduct(data) {
    try {
      const response = await this.productRepository.create(data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Delete a Product by ID
  async deleteById(id) {
    try {
      // find the product by id, and delete the images from S3 bucket
      const product = await this.productRepository.get(id);
      for (let image of product.images) {
        await deleteFile(image);
      }
      // Delete the product from Database
      const response = await this.productRepository.destroy(id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Get product by ID
  async getProductById(id) {
    try {
      const product = await this.productRepository.get(id);
      return product;
    } catch (error) {
      throw error;
    }
  }

  // Get all products
  async getAllProducts() {
    try {
      const response = await this.productRepository.getAll();
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductService;