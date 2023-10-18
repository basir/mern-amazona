import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    sku: {type: String, required: true, unique: true},
    image: { type: String, required: true },
    images: [String],
    featured: {type: Boolean, default: false},
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    reviews: [reviewSchema],
    accessories: [
    {
      name: {type: String, required: true},
      price: {type: Number, required: true},
      photo: {type: String, required: true},
      inStock:{type: Number, required: true},
      accessory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Accessory',
      required: true,
      }
    }
  ]

  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
