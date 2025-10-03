import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Assuming you store user info in localStorage after login
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  if (!user) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl text-gray-500">
        No user data found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Profile</h2>

      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Profile Image */}
        <img
          src={user.image || "/default-avatar.png"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 shadow-md"
        />

        {/* User Info */}
        <div className="flex-1 space-y-3">
          <p>
            <span className="font-semibold">First Name:</span> {user.firstname}
          </p>
          <p>
            <span className="font-semibold">Last Name:</span> {user.lastname}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Role:</span> {user.role}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {user.phone || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
