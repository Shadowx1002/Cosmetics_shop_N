import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { BsCart3 } from "react-icons/bs";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const email=localStorage.getItem("email")

  // 🔥 Check user on load
  useEffect(() => {
    const storedUser = localStorage.getItem("role");
    setUser(storedUser);
    console.log(user);
  }, []);

  // 🔥 Debounce live search
  useEffect(() => {
    if (search.trim() !== "") {
      const delay = setTimeout(() => {
        navigate(`/search/${search}`);
      }, 500);
      return () => clearTimeout(delay);
    }
  }, [search, navigate]);

  // 🔥 Reset search bar when changing page
  useEffect(() => {
    if (!location.pathname.startsWith("/search")) {
      setSearch("");
    }
  }, [location]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between px-6 md:px-10 py-4 bg-gradient-to-r bg-accent text-white shadow-2xl w-full h-[80px] relative">
      {/* Logo */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src="/logo.png"
          alt="MyShop Logo"
          className="w-[50px] h-[50px] object-cover rounded-full shadow-lg mr-2"
        />
        <span className="text-2xl md:text-3xl font-serif font-bold">
          Nero Cosmetics
        </span>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-6 text-lg font-semibold">
        <Link
          to="/"
          className="hover:text-yellow-300 transition-colors duration-300"
        >
          Home
        </Link>
        <Link
          to="/Product"
          className="hover:text-yellow-300 transition-colors duration-300"
        >
          Product
        </Link>
        <Link
          to="/About"
          className="hover:text-yellow-300 transition-colors duration-300"
        >
          About
        </Link>
        <Link
          to="/Contact"
          className="hover:text-yellow-300 transition-colors duration-300"
        >
          Contact
        </Link>
        {/* Extra buttons */}
        {user && (
          <>
            {user === "customer" && (
              <Link
              state={{ email }}
                to="/profile"
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                Profile
              </Link>
            )}

            {user === "admin" && (
              <Link
                to="/admin"
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                Admin Panel
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="hover:text-red-400 transition-colors duration-300"
            >
              Logout
            </button>
          </>
        )}
        {!user && (
          <Link
            to="/login"
            className="hover:text-yellow-300 transition-colors duration-300"
          >
            Login
          </Link>
        )}
      </nav>

      {/* Search + Cart (Desktop Only) */}
      <div className="hidden md:flex items-center space-x-4">
        <div className="flex items-center bg-white rounded-full overflow-hidden shadow-md w-[220px] lg:w-[300px]">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow px-4 py-2 text-gray-800 outline-none text-sm"
          />
        </div>
        <Link to="/cart" className="text-[20px] font-bold">
          <BsCart3 className="text-3xl" />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-3xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-[80px] left-0 w-full bg-indigo-700 text-white flex flex-col items-center gap-4 py-6 md:hidden shadow-lg z-50">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-yellow-300"
          >
            Home
          </Link>
          <Link
            to="/Product"
            onClick={() => setMenuOpen(false)}
            className="hover:text-yellow-300"
          >
            Product
          </Link>
          <Link
            to="/About"
            onClick={() => setMenuOpen(false)}
            className="hover:text-yellow-300"
          >
            About
          </Link>
          <Link
            to="/Contact"
            onClick={() => setMenuOpen(false)}
            className="hover:text-yellow-300"
          >
            Contact
          </Link>

          {/* Mobile User Buttons */}
          {user && (
            <>
              <Link
                to="/profile"

                onClick={() => setMenuOpen(false)}
                state={{ email }}
                className="hover:text-yellow-300"
              >
                Profile
              </Link>
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-yellow-300"
                >
                  Admin Panel
                </Link>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="hover:text-red-400"
              >
                Logout
              </button>
            </>
          )}
          {!user && (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="hover:text-yellow-300"
            >
              Login
            </Link>
          )}

          {/* Mobile Search */}
          <div className="flex items-center bg-white rounded-full overflow-hidden shadow-md w-[85%] mt-4">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow px-4 py-2 text-gray-800 outline-none text-sm"
            />
          </div>

          <Link to="/cart" onClick={() => setMenuOpen(false)} className="mt-3">
            <BsCart3 className="text-3xl" />
          </Link>
        </div>
      )}
    </header>
  );
}
