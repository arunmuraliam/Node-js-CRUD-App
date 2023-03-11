import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productCategory: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,   
        required: true 
    },
    userid: {
        type: String,   
        required: true 
    },
})

export default mongoose.model("Product", ProductSchema);