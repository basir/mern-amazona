import mongoose from "mongoose";

const accessorySchema = new mongoose.Schema({
    name: {type: String, required: true},
    slug: {type: String, required: true},
    price: {type: Number, required: true},
    photo: {type: String, required: true},
    inStock: {type: Number, required: true},
    category: {type: String, required: true}
})

const Accessory = mongoose.model('Accessory', accessorySchema)
export default Accessory