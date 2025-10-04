import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function ProfileEditPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState(location.state?.email || "");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (!email) return;

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/getByEmail/${email}`
        );
        setUser(response.data);
        setFirstname(response.data.firstname);
        setLastname(response.data.lastname);
        setPhone(response.data.phone || "");
        setImage(response.data.image || "");
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [email]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        firstname,
        lastname,
        phone,
        image, // base64 string
      };

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/updateProfile/${email}`,
        formData
      );

      alert("Profile updated successfully!");
      navigate("/profile", { state: { email } });
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl text-gray-500 animate-pulse">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl text-gray-500">
        User not found
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 flex items-center justify-center">
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
            animate={{
              x: [startX, startX + deltaX, startX],
              y: [startY, startY + deltaY, startY],
            }}
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

      {/* Profile Edit Card */}
      <motion.div
        className="relative z-10 w-full max-w-3xl mx-auto p-10 bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-4xl font-bold mb-8 text-center text-indigo-600 tracking-wide">
          Edit Profile
        </h2>

        <form className="space-y-5" onSubmit={handleSave}>
          {/* Image Upload */}
          <div className="flex justify-center mb-5">
            <img
              src={image || "/default-avatar.png"}
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover border-4 border-indigo-400 shadow-md"
            />
          </div>
          <div className="flex justify-center mb-5">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer"
            />
          </div>

          {/* Name Fields */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-gray-800 font-semibold mb-2">
                First Name
              </label>
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-800 font-semibold mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Phone
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-6 mt-6">
            <motion.button
              type="submit"
              className="px-6 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save Changes
            </motion.button>

            <motion.button
              type="button"
              className="px-6 py-2 bg-gray-400 text-white rounded-lg shadow-md hover:bg-gray-500 hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/profile", { state: { email } })}
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
