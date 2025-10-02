import { motion } from "framer-motion";
import FeaturedProducts from "../components/FeaturedProducts";
import ReviewsSection from "../components/ReviewsSection";
import AboutUs from "../components/AboutUs";

export default function HomePagec() {
  return (
    <div className="w-full flex flex-col scroll-smooth">
      {/* Landing Page */}
      <section className="w-full h-screen flex flex-row items-center justify-center bg-white overflow-hidden">
        <div className="w-1/2 h-full flex justify-center items-center relative">
          {/* Decorative floating shapes */}
          <div className="absolute top-10 right-20 w-24 h-24 bg-accent rounded-full animate-pulse blur-3xl"></div>
          <div className="absolute bottom-10 left-16 w-32 h-32 bg-accent rounded-full animate-pulse blur-2xl"></div>

          {/* Main landing image */}
          <img
            src="Landing.jpg"
            alt="Landing visual"
            className="object-cover h-[500px] w-[600px] rounded-4xl shadow-2xl transform transition-transform duration-700 hover:scale-105 hover:rotate-1"
          />

          {/* Optional animated overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-pink-500/10 to-transparent  pointer-events-none"></div>
        </div>

        <div className="w-1/2 h-full flex flex-col justify-center items-start p-10 gap-6 relative overflow-hidden bg-gradient-to-br from-accent via-new2 to-new  shadow-xl">
          {/* Floating decorative circles */}
          <div className="absolute top-10 left-10 w-16 h-16 bg-white/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>

          {/* Heading */}
          <h1 className="text-6xl font-serif text-white font-extrabold tracking-tight drop-shadow-lg">
            Welcome to <span className="text-accent">Nero Cosmetics</span>
          </h1>

          {/* Underline accent */}
          <div className="w-32 h-1 bg-yellow-300 rounded-full"></div>

          {/* Paragraph */}
          <p className="text-lg text-accent/90 max-w-lg leading-relaxed drop-shadow-md">
            Discover premium cosmetic products curated for your beauty and
            confidence. Experience smooth skin, vibrant looks, and luxurious
            self-care.
          </p>

          {/* Call-to-action button */}
          <button className="px-6 py-3 bg-yellow-300 text-black font-semibold rounded-full hover:bg-yellow-400 transition-all duration-300 shadow-lg">
            Explore Products
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full min-h-screen bg-white flex flex-col items-center justify-center p-6 overflow-hidden">
  {/* Add the FeaturedProducts component */}
      <FeaturedProducts />
</section>


      {/* Reviews Section */}
      <section className="w-full min-h-screen bg-white bg-opacity-70 flex flex-col items-center justify-center p-6 relative">
        <ReviewsSection/>
      </section>

      {/* About Us */}
      <section className="w-full min-h-screen bg-white flex flex-col items-center justify-center p-6">
       <AboutUs/>
      </section>
    </div>
  );
}
