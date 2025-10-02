import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const colors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#FF6EC7", "#FFA500", "#00CED1"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products");
        setProducts(res.data.slice(0, 10)); // limit to 10 products
      } catch (err) {
        console.log("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden"
      style={{
        backgroundImage: "url('/Fimg.JPG')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Animated circles */}
      {Array.from({ length: 50 }).map((_, i) => {
        const size = Math.floor(Math.random() * 80) + 20;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const deltaX = (Math.random() - 0.5) * window.innerWidth * 2;
        const deltaY = (Math.random() - 0.5) * window.innerHeight * 2;
        const duration = Math.random() * 30 + 10;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.5 + 0.2;

        return (
          <motion.div
            key={i}
            initial={{ x: startX, y: startY }}
            animate={{ x: [startX, startX + deltaX, startX], y: [startY, startY + deltaY, startY] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration,
              delay,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: color,
              opacity,
              zIndex: 0,
            }}
          />
        );
      })}

      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative text-[100px] font-serif mb-6 w-full text-center z-10 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 tracking-wide"
      >
        Featured Products
      </motion.h2>

      {/* Horizontal Products Slider */}
      <div className="relative w-full max-w-[1200px] flex items-center z-10 overflow-x-hidden">
        <div className="flex gap-6 px-6 overflow-x-scroll scroll-smooth scrollbar-hide">
          {products.map((product, i) => (
            <motion.div
              key={product._id || i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white bg-opacity-80 h-64 rounded shadow flex flex-col items-center justify-center backdrop-blur-sm p-4 flex-shrink-0 min-w-[250px]"
            >
              <img
                src={product.images[0] || ""}
                alt={product.productName}
                className="w-32 h-32 object-cover mb-2 rounded-lg"
              />
              <h3 className="font-bold text-lg">{product.productName}</h3>
              <p className="text-sm text-gray-700">{product.lablePrice} LKR</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Explore Button */}
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-4xl font-serif mt-6 relative z-10"
      >
        <button className="p-2 bg-yellow-300 text-black serif rounded-full hover:bg-yellow-400 transition-all duration-300 shadow-lg">
          Explore Products
        </button>
      </motion.h2>
    </section>
  );
}
