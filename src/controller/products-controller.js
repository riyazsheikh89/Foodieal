import multer from "multer";

import ProductsRepository from "../repository/products-repository.js";
import { multipleUploader } from '../config/multer-config.js';
import { AWS_BUCKET_NAME } from '../config/env-variables.js';
import { s3 } from "../config/s3_file_upload-config.js";


const productsService = new ProductsRepository();

// create a food product
export const createProduct = async (req, res) => {
    try {
        multipleUploader(req, res, async ()=> {
            // create the prdoct
            const {name, price, category, description} = req.body;
            const product = await productsService.create({name, price, category, description});

            // store the each image name and url
            const response = req.files; // array of uploaded files
            response.forEach( element => {
                product.images.push(element.key);
                product.urls.push(element.location);
            });
            product.save();

            return res.status(201).json({
                success: true,
                data: product,
                message: 'Successfully created the products',
                err: {}
            });
        });
    } catch (error) {
        return res.status(201).json({
            success: false,
            data: {},
            message: 'something went wrong at creating the product',
            err: error
        });
    }
}


// get all food products
export const getAllProducts = async (req, res) => {
    try {
        const products = await productsService.getAll();
        return res.status(201).json({
            success: true,
            message: 'successfuly fetched all products',
            data: products,
            err: {}
        });
    } catch (error) {
        return res.status(201).json({
            success: false,
            message: 'something went wrong, at fetching all the products!',
            data: {},
            err: error
        });
    }
}


// get a specified product
export const getProduct = async (req, res) => {
    try {
        const product = await productsService.get(req.params.id);
        return res.status(201).json({
            success: true,
            message: 'successfuly fetched the products',
            data: product,
            err: {}
        });
    } catch (error) {
        return res.status(201).json({
            success: false,
            message: 'something went wrong, at fetching the product!',
            data: {},
            err: error
        });
    }
}


// get products by Category
export const getByCategory = async (req, res) => {
    try {
        const product = await productsService.getByCategory(req.body.category);
        return res.status(201).json({
            success: true,
            message: 'successfuly fetched the products',
            data: product,
            err: {}
        });
    } catch (error) {
        return res.status(201).json({
            success: false,
            message: 'something went wrong, at fetching the product!',
            data: {},
            err: error
        });
    }
}


// delete a product
export const deleteProduct = async (req, res) => {
    try {
        // find the product by id, and delete the images from S3 bucket
        const product = await productsService.get(req.body.id);
        for (let image of product.images) {
            await s3.deleteObject({Bucket: AWS_BUCKET_NAME, Key: image}).promise();
        }
        // Delete the product from Database
        const response = await productsService.destroy(req.body.id);

        return res.status(201).json({
            success: true,
            message: 'successfuly deleted the products',
            data: response,
            err: {}
        });
    } catch (error) {
        return res.status(201).json({
            success: false,
            message: 'something went wrong, at deleting the product!',
            data: {},
            err: error
        });
    }
}