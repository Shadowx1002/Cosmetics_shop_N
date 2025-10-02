import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgetPasswordPage() {
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Send OTP
  function handleSendOtp() {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users/send-otp", {
        email: email,
      })
      .then((response) => {
        setOtpSent(true);
        toast.success("OTP sent successfully, check your inbox!");
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to send OTP");
      });
  }

  // Verify OTP and reset password
  function verifyOtp() {
    if (!otp || !newPassword || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const otpNum = parseInt(otp, 10);

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users/reset-password", {
        email: email,
        otp: otpNum,
        newPassword: newPassword,
      })
      .then((response) => {
        toast.success("Password reset successfully!");
        console.log(response.data);
        setOtpSent(false);
        setEmail("");
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Invalid OTP or reset failed");
      });
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-[350px] text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Forget Password</h2>

        {!otpSent ? (
          // Email input + send OTP
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendOtp}
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition"
            >
              Send OTP
            </button>
          </div>
        ) : (
          // OTP + new password form
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={verifyOtp}
              className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold transition"
            >
              Reset Password
            </button>

            <button
              onClick={() => setOtpSent(false)}
              className="w-full bg-yellow-600 hover:bg-yellow-700 py-3 rounded-lg font-semibold transition"
            >
              Resend OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
