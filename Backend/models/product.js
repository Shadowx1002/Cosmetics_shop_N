import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  productName: { type: String, required: true },
  altNames: [{ type: String }],
  description: { type: String, required: true },
  images: [{ type: String }],
  lablePrice: { type: Number, required: true },
  Price: { type: Number, required: true },
  stock: { type: Number, required: true },
  isAvailable: { type: Boolean, required: true, default: true }

});

const Product = mongoose.model("Products", productSchema);

export default Product;
