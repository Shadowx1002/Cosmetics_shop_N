import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const goToEditPage = () => {
    
    navigate("/edit-profile", {
      state: { email: localStorage.getItem("email") }, // pass email or user info
    });
  };

  useEffect(() => {
    if (!email) return;

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/getByEmail/${email}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [email]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl text-gray-500 animate-pulse">
        Loading user details...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl text-gray-500">
        No user data found for {email}
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 flex flex-col items-center justify-center p-6">
      {/* Floating Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full mix-blend-multiply filter blur-xl opacity-30"
            style={{
              background: `radial-gradient(circle, 
                hsl(${Math.random() * 360}, 70%, 75%) 0%, 
                transparent 70%)`,
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.2, 1],
              opacity: [0.25, 0.4, 0.25],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* User Info Section */}
      <motion.div
        className="relative z-10 max-w-3xl w-full text-center text-gray-800"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Profile Image */}
        <motion.img
          src={user.image || "/default-avatar.png"}
          alt="Profile"
          className="mx-auto w-36 h-36 rounded-full object-cover border-4 border-indigo-400 shadow-lg mb-6 hover:scale-105 transition-transform duration-300"
          whileHover={{ scale: 1.05, rotate: 2 }}
        />

        {/* Name and Role */}
        <h1 className="text-4xl font-bold text-indigo-600 mb-2">
          {user.firstname} {user.lastname}
        </h1>
        <p className="text-lg font-medium text-gray-600 mb-1">{user.email}</p>
        <p className="text-sm text-gray-500 italic mb-6">Role: {user.role}</p>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-lg mx-auto bg-white bg-opacity-70 p-6 rounded-xl shadow-lg backdrop-blur-md">
          <p>
            <span className="font-semibold text-gray-900">First Name:</span>{" "}
            {user.firstname}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Last Name:</span>{" "}
            {user.lastname}
          </p>
          <p className="col-span-2">
            <span className="font-semibold text-gray-900">Email:</span>{" "}
            {user.email}
          </p>
          <p className="col-span-2">
            <span className="font-semibold text-gray-900">Phone:</span>{" "}
            {user.phone || "N/A"}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-6">
          <motion.button
            

            
            onClick={goToEditPage}
            className="px-6 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Edit Profile
          </motion.button>

          <motion.button
            className="px-6 py-2 bg-yellow-400 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-500 hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            My Orders
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
