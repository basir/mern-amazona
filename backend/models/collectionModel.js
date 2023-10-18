import mongoose from "mongoose";


const CollectionSchema = new mongoose.Schema({
    name:{type: String, required: true},
    categories: [
        {
            name: {type: String, required: true},
            collectionPhoto: {type: String, required: true},
            category: {type: mongoose.Schema.Types.ObjectId, ref:'Category', required: true}
        }
    ],
})

const Collection = mongoose.model('Collection', CollectionSchema)
export default Collection