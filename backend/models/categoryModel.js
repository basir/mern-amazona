import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    products:[
        {
            sku: {type: String},
            slug:{type: String},
            name: {type: String, required: true},
            price: {type: Number, required: true},
            inStock: {type: Number, required: true},
            image: {type: String, required: true},
            product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true}
        }
    ]
})

const Category = mongoose.model('Category', categorySchema)
export default Category