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
      fetchReviews(); // refresh list
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p className="p-4">Loading reviews...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Reviews Management</h2>
      <table className="w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Product ID</th>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Rating</th>
            <th className="p-2 border">Comment</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((r) => (
            <tr key={r._id} className="text-center">
              <td className="p-2 border">{r.productId}</td>
              <td className="p-2 border">
                {r.user?.firstname} {r.user?.lastname}
              </td>
              <td className="p-2 border">{r.rating} ⭐</td>
              <td className="p-2 border">{r.comment}</td>
              <td className="p-2 border">
                <button
                  onClick={() => deleteReview(r._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
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
