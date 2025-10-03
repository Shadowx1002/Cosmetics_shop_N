import { motion } from "framer-motion";
import FeaturedProducts from "../components/FeaturedProducts";
import ReviewsSection from "../components/ReviewsSection";
import AboutUs from "../components/AboutUs";
import { useNavigate } from "react-router-dom";

export default function HomePagec() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col scroll-smooth">
      {/* Landing Page */}
      <section className="w-full h-screen flex flex-col md:flex-row items-center justify-center bg-white overflow-hidden relative">
        {/* Left side - Image */}
        <div className="w-full md:w-1/2 h-full flex justify-center items-center relative">
          {/* Floating decorative shapes */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute top-10 right-20 w-24 h-24 bg-accent rounded-full blur-3xl opacity-70"
          ></motion.div>
          <motion.div 
            animate={{ x: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="absolute bottom-10 left-16 w-32 h-32 bg-accent rounded-full blur-2xl opacity-50"
          ></motion.div>

          {/* Landing image */}
          <motion.img
            src="Landing.jpg"
            alt="Landing visual"
            className="object-cover h-[400px] md:h-[500px] w-[300px] md:w-[600px] rounded-3xl shadow-2xl"
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ duration: 0.7 }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-pink-500/10 to-transparent pointer-events-none"></div>
        </div>

        {/* Right side - Text */}
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-start p-6 md:p-10 gap-6 relative overflow-hidden bg-gradient-to-br from-accent via-new2 to-new shadow-xl">
          {/* Decorative circles */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-10 left-10 w-16 h-16 bg-white/20 rounded-full"
          ></motion.div>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full"
          ></motion.div>

          <h1 className="text-4xl md:text-6xl font-serif text-white font-extrabold tracking-tight drop-shadow-lg">
            Welcome to <span className="text-accent">Nero Cosmetics</span>
          </h1>

          {/* Underline accent */}
          <div className="w-24 md:w-32 h-1 bg-yellow-300 rounded-full"></div>

          <p className="text-sm md:text-lg text-accent/90 max-w-lg leading-relaxed drop-shadow-md">
            Discover premium cosmetic products curated for your beauty and confidence. 
            Experience smooth skin, vibrant looks, and luxurious self-care.
          </p>

          <motion.button
            onClick={() => navigate("/product")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-yellow-300 text-black font-semibold rounded-full hover:bg-yellow-400 transition-all duration-300 shadow-lg"
          >
            Explore Products
          </motion.button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full min-h-screen bg-white flex flex-col items-center justify-center p-6 overflow-hidden">
        <FeaturedProducts />
      </section>

      {/* Reviews Section */}
      <section className="w-full min-h-screen bg-white bg-opacity-70 flex flex-col items-center justify-center p-6 relative">
        <ReviewsSection />
      </section>

      {/* About Us */}
      <section className="w-full min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <AboutUs />
      </section>
    </div>
  );
}
