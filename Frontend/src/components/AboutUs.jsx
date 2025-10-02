import { motion } from "framer-motion";

export default function AboutUs() {
  const colors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#FF6EC7"];

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden bg-gradient-to-br ">
      
      {/* Floating Circles */}
      {Array.from({ length: 20 }).map((_, i) => {
        const size = Math.random() * 50 + 20;
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

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 mb-6 tracking-wide"
      >
        About Nero Cosmetics
      </motion.h2>

      {/* Paragraph */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-10 text-center max-w-3xl text-lg md:text-xl text-gray-800 font-medium leading-relaxed"
      >
        At Nero Cosmetics, we don’t just sell beauty products — we craft confidence. 
        Every formula is designed to enhance your natural glow, empowering you to feel 
        radiant and unique. Our mission is to merge innovation, quality, and style in every product.
      </motion.p>

      {/* Decorative floating rectangles */}
      {Array.from({ length: 10 }).map((_, i) => {
        const width = Math.random() * 50 + 20;
        const height = Math.random() * 10 + 5;
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const rotate = Math.random() * 360;
        const duration = Math.random() * 25 + 10;

        return (
          <motion.div
            key={`rect-${i}`}
            initial={{ x: startX, y: startY, rotate }}
            animate={{ y: [startY, startY + 100, startY], rotate: [rotate, rotate + 180, rotate] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              width,
              height,
              borderRadius: "2px",
              backgroundColor: colors[Math.floor(Math.random() * colors.length)],
              opacity: 0.3,
              zIndex: 0,
            }}
          />
        );
      })}
    </section>
  );
}
