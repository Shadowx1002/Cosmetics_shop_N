import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard";
import Header from "../../components/header";
import { motion } from "framer-motion";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Get window size
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    if (isLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          setProducts(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 overflow-hidden">
      {/* Animated Background Circles */}
      {Array.from({ length: 15 }).map((_, i) => {
        const size = Math.random() * 60 + 20;
        const colors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#FF6EC7"];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const startX = Math.random() * windowSize.width;
        const startY = Math.random() * windowSize.height;
        const deltaX = (Math.random() - 0.5) * 300;
        const deltaY = (Math.random() - 0.5) * 300;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.3 + 0.2;

        return (
          <motion.div
            key={i}
            initial={{ x: startX, y: startY }}
            animate={{ x: [startX, startX + deltaX, startX], y: [startY, startY + deltaY, startY] }}
            transition={{ repeat: Infinity, repeatType: "loop", duration, delay, ease: "easeInOut" }}
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

      {/* Header */}
      <div className="w-full relative z-10">
        <Header />
      </div>

      {/* Products */}
      <div className="relative z-10 flex flex-wrap justify-center  gap-6 mt-25 px-4">
        {isLoading ? (
          <p className="text-center w-full text-lg font-semibold">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center w-full text-lg font-semibold">No products found.</p>
        ) : (
          products.map((product) => <ProductCard key={product.productId} product={product} />)
        )}
      </div>
    </div>
  );
}
