import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/search/${search}`);
    }
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-gradient-to-r bg-accent text-white shadow-2xl w-full h-[100px]">
      {/* Logo */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src="/logo.png"
          alt="MyShop Logo"
          className="w-[80px] h-[80px] object-cover rounded-full shadow-lg mr-3"
        />
        <span className="text-4xl font-serif font-bold">Nero Cosmetics</span>
      </div>

      {/* Navigation */}
      <nav className="flex gap-6 text-lg md:text-xl font-semibold">
        <Link to="/" className="hover:text-yellow-300 transition-colors duration-300">
          Home
        </Link>
        <Link to="/Product" className="hover:text-yellow-300 transition-colors duration-300">
          Product
        </Link>
        <Link to="/About" className="hover:text-yellow-300 transition-colors duration-300">
          About
        </Link>
        <Link to="/Contact" className="hover:text-yellow-300 transition-colors duration-300">
          Contact
        </Link>
      </nav>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex items-center bg-white rounded-full overflow-hidden shadow-md w-[300px] md:w-[400px]"
      >
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow px-4 py-2 text-gray-800 outline-none"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-green-400 to-teal-500 px-4 py-2 text-white font-semibold hover:scale-105 transform transition duration-300"
        >
          Search
        </button>
      </form>
    </header>
  );
}
