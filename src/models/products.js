import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [
        { 
            key: String,
            url: String
        }
    ],
    reviews: [
        {type: String}
    ]
}, ({timestamps: true}));

const Products = mongoose.model('Products', productSchema);

export default Products;