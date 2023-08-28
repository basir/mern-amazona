import mongoose from "mongoose";


const CategoryModel = new mongoose.Schema({
    name:{type: String, required: true},
    products: [{type: mongoose.Schema.Types.ObjectId, ref:"Product"}]
})

const Category = mongoose.model('Category', CategoryModel)
module.exports = Category