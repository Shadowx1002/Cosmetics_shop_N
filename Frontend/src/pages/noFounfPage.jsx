import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br  text-center px-6">
      {/* Big 404 with animation */}
      <h1 className="text-8xl md:text-9xl font-extrabold text-accent drop-shadow-lg animate-bounce">
        404
      </h1>

      {/* Error message */}
      <p className="mt-4 text-lg md:text-xl text-accent">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      {/* Sub text */}
      <p className="mt-2 text-sm md:text-base text-gray-400">
        It might have been moved or deleted.
      </p>

      {/* Back button */}
      <Link
        to="/"
        className="mt-8 px-6 py-3 bg-amber-950 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-accent hover:scale-105 transform transition-all duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
}
