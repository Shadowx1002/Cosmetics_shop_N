import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageSliderPage({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="w-[500px] h-[600px] relative bg-new2 rounded-3xl  p-4 flex flex-col items-center">
      {/* Main Image Section */}
      <div className="relative w-full h-[500px] overflow-hidden rounded-2xl shadow-lg">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[currentIndex]}
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            className="w-full h-full object-cover rounded-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        {/* Left & Right Arrows */}
        <button
          onClick={() =>
            setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
          }
          className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/70 transition"
        >
          ❮
        </button>
        <button
          onClick={() =>
            setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
          }
          className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/70 transition"
        >
          ❯
        </button>
      </div>

      {/* Thumbnail Gallery */}
      <div className="w-full h-[100px] mt-4 flex justify-center items-center gap-3 overflow-x-auto scrollbar-hide">
        {images?.map((image, index) => (
          <motion.div
            key={index}
            className={`relative cursor-pointer rounded-lg overflow-hidden shadow-md ${
              index === currentIndex ? "ring-4 bg-accent scale-100" : "hover:scale-105"
            } transition-transform duration-300`}
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.1 }}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-[90px] h-[90px] object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
