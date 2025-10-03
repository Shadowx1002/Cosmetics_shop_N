import { useEffect, useState } from "react";
import axios from "axios";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/users/userdetailsa",
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const toggleBlock = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        import.meta.env.VITE_BACKEND_URL + `/api/users/${id}/toggle-block`,
        {},
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      fetchUsers(); // refresh list
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p className="p-4">Loading users...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Users Management</h2>
      <table className="w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Blocked</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="text-center">
              <td className="p-2 border">
                {u.firstname} {u.lastname}
              </td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">{u.role}</td>
              <td className="p-2 border">
                {u.isBlocked ? "Yes" : "No"}
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => toggleBlock(u._id)}
                  className={`px-3 py-1 rounded ${
                    u.isBlocked ? "bg-green-500" : "bg-red-500"
                  } text-white`}
                >
                  {u.isBlocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
