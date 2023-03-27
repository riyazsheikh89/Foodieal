import ProductsRepository from "../repository/products-repository.js";

const productsService = new ProductsRepository();

export const createProduct = async (req, res) => {
    try {
        const payLoad = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            description: req.body.description,
        }
        const response = await productsService.create(payLoad);
        return res.status(201).json({
            success: true,
            data: response,
            message: 'Successfully created the products',
            err: {}
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