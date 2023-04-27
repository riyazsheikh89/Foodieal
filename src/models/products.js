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
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    rating: {       // Average Rating of the product
        type: Number,
        default: 0
    }
}, ({timestamps: true}));

const Products = mongoose.model('Products', productSchema);

export default Products;