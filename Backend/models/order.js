import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  total: {
    type: Number,
    required: true,
  },
  productList: [
    {
      productInfo: {
        productId: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        altNames: [
          {
            type: String,
            required: true,
          },
        ],
        description: {
          type: String,
          required: true,
        },
        images: {
          type: String,
          required: true,
        },
        LablePrice: {
          type: String,
          required: true,
        },
        price: {
          type: String,
          required: true,
        },
      },

      quantity: { type: Number, required: true },
    },
  ],
  date: {
    type: date,
    default: date.now,
  },
});

const Order = mongoose.model("Orders", orderSchema);

export default Order;
