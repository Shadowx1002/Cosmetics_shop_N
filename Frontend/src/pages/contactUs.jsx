import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/contact", formData);
      setSuccess("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setSuccess("Failed to send message.");
    }
    setLoading(false);
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 overflow-hidden">
      
      {/* Animated Background Circles */}
      {Array.from({ length: 15 }).map((_, i) => {
        const size = Math.random() * 60 + 20;
        const colors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#FF6EC7"];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
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

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 text-4xl md:text-5xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500"
      >
        Contact Us
      </motion.h2>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md rounded-xl p-6 md:p-8 flex flex-col gap-4 shadow-xl"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 h-32 resize-none"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-2 p-3 bg-yellow-300 text-black font-bold rounded-full hover:bg-yellow-400 transition-all duration-300 shadow-lg"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
        {success && <p className={`mt-2 text-center font-semibold ${success.includes("successfully") ? "text-green-600" : "text-red-600"}`}>{success}</p>}
      </motion.form>
    </section>
  );
}
