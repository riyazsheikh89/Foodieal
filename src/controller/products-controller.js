import multer from "multer";
import crypto from 'crypto';

import ProductsRepository from "../repository/products-repository.js";
import { uploadFile, getObjectSignedUrl, deleteFile } from '../config/s3_file_upload-config.js';

// crypto -> generates random string, using it for unique file name
const generateFileName = (bytes = 16) => crypto.randomBytes(bytes).toString('hex')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// it will upload file to the Memory temporary
const multipleUploader = upload.array('images', 3);


const productsService = new ProductsRepository();

// create a food product
export const createProduct = async (req, res) => {
    try {
        multipleUploader(req, res, async ()=> {

            // UPLOADING files to S3 Bucket
            const response = req.files;
            const images = [];
            response.forEach(async (files) => {
              const imageName = generateFileName();
              images.push(imageName);
              const fileBuffer = files.buffer;
              await uploadFile(fileBuffer, imageName, files.mimetype);
            });

            // create the prdoct
            const productData = {
                name: req.body.name,
                price: req.body.price,
                category: req.body.category,
                description: req.body.description,
            }
            const product = await productsService.create(productData);

            // generating signedURLs for files, and storing it on Database
            // also storing the images name in the database for further usage
            const imagesUrl = await createImageUrl(images);
            images.forEach((imageName, index) => {
                const url = imagesUrl[index];
                product.images.push(imageName);
                product.urls.push(url);
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

// generates signedUrl for images uploaded on S3
async function createImageUrl(files) {
    const imagesURL = [];
    for (let file of files) {
        const url = await getObjectSignedUrl(file);
        imagesURL.push(url);
    }
    return imagesURL;
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
        // then delete the product from Database
        const product = await productsService.get(req.body.id);
        for (let image of product.images) {
            await deleteFile(image);
        }
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