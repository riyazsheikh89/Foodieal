import multer from "multer";
import crypto from 'crypto';

import ProductsRepository from "../repository/products-repository.js";
import { uploadFile, getObjectSignedUrl } from '../config/s3_file_upload-config.js';

// crypto -> generates random string, using it for unique file name
const generateFileName = (bytes = 16) => crypto.randomBytes(bytes).toString('hex')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const multipleUploader = upload.array('images', 3);


const productsService = new ProductsRepository();

// create a food product
export const createProduct = async (req, res) => {
    try {
        multipleUploader(req, res, async ()=> {

            // UPLOADING files to S3 Bucket
            const imagesToBeUploaded = req.files;
            const images = [];
            imagesToBeUploaded.forEach(async (files) => {
              const imageName = generateFileName();
              images.push(imageName);
              const fileBuffer = files.buffer;
              await uploadFile(fileBuffer, imageName, files.mimetype);
            });

            // generating signedURLs for files, and storing it on Database
            const imagesUrl = await createImageUrl(images);
            const productData = {
                name: req.body.name,
                price: req.body.price,
                category: req.body.category,
                description: req.body.description,
            }
            const response = await productsService.create(productData);
            for (let url of imagesUrl) {
                response.images.push(url);
            }
            response.save();

            return res.status(201).json({
                success: true,
                data: response,
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