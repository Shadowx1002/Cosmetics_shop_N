import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState(""); // for dropdown

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please Login first");
      return;
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setOrders(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleUpdateStatus = async () => {
    if (!newStatus || !selectedOrder) return;

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/${selectedOrder._id}`,
        { status: newStatus },
        { headers: { Authorization: "Bearer " + token } }
      );

      // Update UI instantly
      setOrders((prev) =>
        prev.map((o) =>
          o._id === selectedOrder._id ? { ...o, status: newStatus } : o
        )
      );

      setSelectedOrder({ ...selectedOrder, status: newStatus });
      alert("Order status updated!");
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Customer</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="border p-2">{order.orderId}</td>
                <td className="border p-2">{order.name}</td>
                <td className="border p-2">{order.status}</td>
                <td className="border p-2">Rs {order.total}</td>
                <td className="border p-2">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setNewStatus(order.status);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-[#00000040] flex items-center justify-center z-50">
          <div className="bg-white w-3/4 max-h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Order Details</h3>

            <div className="mb-4">
              <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
              <p><strong>Name:</strong> {selectedOrder.name}</p>
              <p><strong>Email:</strong> {selectedOrder.email}</p>
              <p><strong>Phone:</strong> {selectedOrder.phone}</p>
              <p><strong>Address:</strong> {selectedOrder.address}</p>
              <p><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleString()}</p>
              <p><strong>Total:</strong> Rs {selectedOrder.total}</p>
            </div>

            <h4 className="text-lg font-semibold mb-2">Products</h4>
            <table className="w-full border border-gray-200 text-sm mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Image</th>
                  <th className="border p-2">Product</th>
                  <th className="border p-2">Price</th>
                  <th className="border p-2">Qty</th>
                  <th className="border p-2">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.productList.map((item) => (
                  <tr key={item._id}>
                    <td className="border p-2">
                      <img
                        src={item.productInfo.images}
                        alt={item.productInfo.name}
                        className="h-12 w-12 object-cover rounded"
                      />
                    </td>
                    <td className="border p-2">{item.productInfo.name}</td>
                    <td className="border p-2">Rs {item.productInfo.price}</td>
                    <td className="border p-2">{item.quantity}</td>
                    <td className="border p-2">
                      Rs {item.quantity * item.productInfo.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Status Update Section */}
            <div className="mb-4">
              <label className="font-semibold mr-2">Change Status:</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="border p-2 rounded"
              >
                <option>Pending</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
              <button
                onClick={handleUpdateStatus}
                className="ml-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Update
              </button>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
