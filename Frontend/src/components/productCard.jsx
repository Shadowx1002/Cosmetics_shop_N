import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  return (
    <motion.div
      className="w-[300px] h-[420px] bg-white shadow-lg rounded-2xl overflow-hidden m-4 flex flex-col cursor-pointer group"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      {/* Product Image */}
      <div className="relative w-full h-2/3 overflow-hidden">
        <motion.img
          src={product.images[0]}
          alt={product.productName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Stock Badge */}
        {!product.isAvailable || product.stock <= 0 ? (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Out of Stock
          </span>
        ) : (
          <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            In Stock
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col justify-between p-4 h-1/3">
        {/* Name */}
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.productName}
        </h3>
        {/* Description */}
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>

        {/* Prices */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 line-through text-sm">
              ${product.lablePrice}
            </span>
            <span className="text-lg font-bold text-red-500">
              ${product.Price}
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="w-full mt-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold py-2 rounded-lg shadow-md hover:from-red-500 hover:to-pink-500 transition"
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}
