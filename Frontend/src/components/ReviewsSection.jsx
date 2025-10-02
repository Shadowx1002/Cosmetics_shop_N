import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const sliderRef = useRef(null);
  const colors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#FF6EC7", "#FFA500", "#00CED1"];

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/reviews");
        setReviews(res.data);
      } catch (err) {
        console.log("Error fetching reviews:", err);
      }
    };
    fetchReviews();
  }, []);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-new bg-opacity-70 flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Animated background circles */}
      {Array.from({ length: 30 }).map((_, i) => {
        const size = Math.floor(Math.random() * 60) + 20;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const deltaX = (Math.random() - 0.5) * window.innerWidth * 2;
        const deltaY = (Math.random() - 0.5) * window.innerHeight * 2;
        const duration = Math.random() * 40 + 20;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.5 + 0.2;

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

      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative text-[60px] md:text-[80px] font-serif mb-6 text-center w-full z-10 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 tracking-wide"
      >
        Customer Reviews
        <span className="absolute top-0 left-0 w-full h-full text-white opacity-20 blur-xl animate-pulse">
          Customer Reviews
        </span>
      </motion.h2>

      {/* Horizontal Slider */}
      <div className="relative w-full max-w-[1000px] flex items-center mt-6 z-10">
        <button
          onClick={scrollLeft}
          className="absolute left-0 z-20 p-3 bg-white rounded-full shadow-lg hover:bg-gray-200 transition-all"
        >
          ◀
        </button>

        <div ref={sliderRef} className="flex gap-6 overflow-x-hidden scroll-smooth px-12">
          {reviews.map((rev) => (
            <motion.div
              key={rev._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,0,0,0.3)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-2xl shadow-lg w-64 flex-shrink-0 flex flex-col justify-between"
            >
              <p className="text-gray-800 mb-4 italic">"{rev.comment}"</p>
              <p className="font-bold text-sm text-gray-600 text-right">{rev.userName}</p>
            </motion.div>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 z-20 p-3 bg-white rounded-full shadow-lg hover:bg-gray-200 transition-all"
        >
          ▶
        </button>
      </div>
    </section>
  );
}
