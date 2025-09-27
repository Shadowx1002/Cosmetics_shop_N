import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister() {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/",
        { email, firstname, lastname, password }
      );

      toast.success("Registration successful 🎉");
      console.log(response.data);

      // redirect to login page after success
      navigate("/login");
    } catch (e) {
      console.log(e.response?.data || e.message);
      toast.error(e.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="w-full h-screen flex justify-evenly items-center bg-center bg-cover bg-[url('login1.jpg')]">
      <div className="w-full max-w-md mx-auto rounded-2xl shadow-2xl p-8 backdrop-blur-md bg-white/10 border border-white/20">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Create an Account ✨
        </h2>

        <input
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          type="text"
          placeholder="First Name"
          className="w-full mb-4 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 placeholder-gray-500"
        />

        <input
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          type="text"
          placeholder="Last Name"
          className="w-full mb-4 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 placeholder-gray-500"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 placeholder-gray-500"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 placeholder-gray-500"
        />

        <button
          onClick={handleRegister}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-700 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-200"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-200 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
