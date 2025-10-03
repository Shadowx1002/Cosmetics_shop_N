import { useEffect, useState } from "react";
import axios from "axios";

export default function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/reviews",
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      setReviews(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const deleteReview = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        import.meta.env.VITE_BACKEND_URL + `/api/reviews/${id}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p className="p-4 text-center">Loading reviews...</p>;

  if (reviews.length === 0)
    return <p className="p-4 text-center">No reviews available.</p>;

  return (
    <div className="p-4 md:p-6 overflow-x-auto">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
        Reviews Management
      </h2>
      <table className="w-full min-w-[600px] border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border text-left">Product ID</th>
            <th className="p-3 border text-left">User</th>
            <th className="p-3 border text-left">Rating</th>
            <th className="p-3 border text-left">Comment</th>
            <th className="p-3 border text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((r) => (
            <tr key={r._id} className="hover:bg-gray-50 transition">
              <td className="p-2 border">{r.productId}</td>
              <td className="p-2 border">
                {r.user?.firstname} {r.user?.lastname}
              </td>
              <td className="p-2 border">{r.rating} ⭐</td>
              <td className="p-2 border">{r.comment}</td>
              <td className="p-2 border text-center">
                <button
                  onClick={() => deleteReview(r._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
