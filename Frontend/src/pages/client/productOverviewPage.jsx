import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ImageSliderPage from "../../components/imageSlider";
import LoadingAnimation from "../../components/loadingAnimation";
import { AddToCart, getCart } from "../../utils/cart";

export default function ProductOverviewPage() {
  const params = useParams();
  const productId = params.id;
  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
      .then((res) => {
        setProduct(res.data);
        setStatus("success");
      })
      .catch((err) => {
        console.log(err);
        setStatus("error");
        toast.error("Something went wrong: " + err.message);
      });
  }, []);

  return (
    <>
      {status === "success" && (
        <div className="w-full h-full flex p-6">
          {/* Left Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-[50%] h-full flex items-center justify-center"
          >
            <ImageSliderPage images={product.images} />
          </motion.div>

          {/* Right Product Details */}
          <motion.div
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
  className="w-[50%] h-full flex justify-center items-center"
>
  <div className="w-[500px] h-[600px] flex flex-col bg-white rounded-3xl shadow-xl p-6">
    
    {/* Product Name */}
    <motion.h1
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-4xl font-bold text-secondary text-center"
    >
      {product.productName}
      {product.altNames.map((altName, index) => (
        <span
          key={index}
          className="text-2xl font-normal text-gray-500"
        >
          {" | " + altName}
        </span>
      ))}
    </motion.h1>

    {/* Product ID */}
    <motion.h2
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="text-center my-2 text-md text-gray-600 font-semibold"
    >
      {product.productId}
    </motion.h2>

    {/* Description */}
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="text-center my-2 text-gray-700 leading-relaxed"
    >
      {product.description}
    </motion.p>

    {/* Prices */}
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="mt-4 text-center"
    >
      {product.lablePrice > product.Price ? (
        <div>
          <span className="text-gray-400 line-through text-lg">
            ${product.lablePrice}
          </span>
          <span className="text-3xl font-bold text-red-500 ml-4">
            ${product.Price}
          </span>
        </div>
      ) : (
        <span className="text-3xl font-bold text-red-500 ml-4">
          ${product.Price}
        </span>
      )}
    </motion.div>

    {/* Buttons fixed to bottom */}
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1 }}
      className="mt-auto flex gap-6 justify-center"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-[200px] h-[50px] bg-gradient-to-r from-pink-500 to-red-500 
                   text-white rounded-2xl shadow-lg font-semibold 
                   transition-all duration-300 cursor-pointer"
        onClick={()=>{
            
            AddToCart(product,1)
            

        }}
      >
        Add to Cart
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-[200px] h-[50px] bg-gradient-to-r from-green-500 to-teal-500 
                   text-white rounded-2xl shadow-lg font-semibold 
                   transition-all duration-300 cursor-pointer"
      >
        Buy Now
      </motion.button>
    </motion.div>
  </div>
</motion.div>

        </div>
      )}

      {status === "loading" && <LoadingAnimation />}

      {status === "error" && (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-red-500 text-lg">Error loading product</p>
        </div>
      )}
    </>
  );
}
