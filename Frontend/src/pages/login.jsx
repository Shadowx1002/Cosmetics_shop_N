import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { BsCart3 } from "react-icons/bs";
import { FiMenu, FiX } from "react-icons/fi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const navigate = useNavigate();

  const navigate1 = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

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
        navigate1(`/search/${search}`);
      }, 500);
      return () => clearTimeout(delay);
    }
  }, [search, navigate1]);

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
    navigate1("/login");
  };

  async function setDetails() {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/login",
        { email, password }
      );
      toast.success("Success");

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("isloged", "true");

      if (response.data.role === "admin") {
        window.location.href = "/admin/Products";

        localStorage.setItem("role", "admin");

        toast.success("Success");
      } else {
        if (response.data.role === "customer") {
          window.location.href = "/";

          toast.success("Success");
          localStorage.setItem("role", "customer");
        } else {
          window.location.href = "/login";
          toast.error("Login Failed");
        }
      }
    } catch (e) {
      console.log(e.response?.data || e.message);
      toast.error("Incorrect Username or Password");
    }
  }

  const LoginWithGoole = useGoogleLogin({
    onSuccess: (response) => {
      const accessToken = response.access_token;
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/users/login/google", {
          accessToken: accessToken,
        })
        .then((response) => {
          const token = response.data.token;

          localStorage.setItem("token", token);

          if (response.data.role == "admin") {
            localStorage.setItem("role", "admin");

            window.location.href = "/admin/Products";
          } else {
            localStorage.setItem("role", "customer");
            window.location.href = "/";
          }
        });
    },
  });

  return (
    <div className="w-full h-screen flex  flex-col bg-cover bg-[url('https://nvcaocehiqlliupqmhxu.supabase.co/storage/v1/object/public/images/top-view-frame-with-mascara-copy-space.jpg')]">
      <header className="flex items-center justify-between px-6 md:px-10 py-4 bg-gradient-to-r  text-black w-full h-[80px] relative">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer  rounded-full px-2 hover:bg-black"
          onClick={() => navigate1("/")}
        >
          <img
            src="/logo.png"
            alt="MyShop Logo"
            className="w-[50px] h-[50px] object-cover rounded-full shadow-lg mr-2"
          />
          <span className="text-2xl md:text-3xl font-serif font-bold text-white ">
            Nero Cosmetics
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-lg font-semibold">
          <Link
            to="/"
            className="hover:text-white transition-colors duration-300 hover:bg-black px-4 py-1 rounded-full"
          >
            Home
          </Link>
          <Link
            to="/Product"
            className="hover:text-white transition-colors duration-300 hover:bg-black px-4 py-1 rounded-full"
          >
            Product
          </Link>
          <Link
            to="/About"
            className="hover:text-white transition-colors duration-300 hover:bg-black px-4 py-1 rounded-full"
          >
            About
          </Link>
          <Link
            to="/Contact"
            className="hover:text-white transition-colors duration-300 hover:bg-black px-4 py-1 rounded-full"
          >
            Contact
          </Link>
          {/* Extra buttons */}
          {user && (
            <>
              {user === "customer" && (
                <Link
                  to={"/profile/" + localStorage.email}
                  className="hover:text-yellow-300 transition-colors duration-300"
                >
                  Profile
                </Link>
              )}

              {user === "admin" && (
                <Link
                  to="/admin"
                  className="hover:text-white transition-colors duration-300 hover:bg-black px-4 py-1 rounded-full"
                >
                  Admin Panel
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="hover:text-white transition-colors duration-300 hover:bg-black px-4 py-1 rounded-full"
              >
                Logout
              </button>
            </>
          )}
          {!user && (
            <Link
              to="/register"
              className="hover:text-white transition-colors duration-300 hover:bg-black px-4 py-1 rounded-full"
            >
              Register
            </Link>
          )}
        </nav>

        {/* Search + Cart (Desktop Only) */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center bg-white  rounded-full overflow-hidden shadow-md w-[220px] lg:w-[300px]">
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

            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="mt-3"
            >
              <BsCart3 className="text-3xl" />
            </Link>
          </div>
        )}
      </header>

      <div className=" justify-center items-center flex flex-col h-full">
        <div className="w-full max-w-md mx-auto justify-center items-center rounded-2xl shadow-2xl p-8 backdrop-blur-md bg-white/10 border border-white/20">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full mb-4 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 placeholder-gray-500"
          />

          <input
            value={password}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full mb-6 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 placeholder-gray-500"
          />

          <button
            onClick={setDetails}
            state={{ email }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-200"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-400 hover:underline">
              Sign up
            </a>
          </p>
          <button
            onClick={LoginWithGoole}
            className="cursor-pointer flex flex-row items-center justify-center w-full gap-2 hover:scale-105 transition-transform duration-200"
          >
            <FaGoogle className="text-3xl" />
            <span> Login with google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
