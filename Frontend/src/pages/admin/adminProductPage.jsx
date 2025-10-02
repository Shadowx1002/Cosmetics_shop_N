import axios from "axios";
import { Sampleproducts } from "../../assets/sampleData";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

export default function AdminProductPage() {
  const [products, setProducts] = useState(Sampleproducts);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products/")
        .then((res) => {
          setProducts(res.data);
          setIsLoading(false);
        })
        .catch(() => {
          toast.error("Error fetching products");
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  function deleteProduct(productId) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }
    axios
      .delete(
        import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then(() => {
        toast.success("Product deleted successfully");
        setIsLoading(true);
      })
      .catch(() => toast.error("Error deleting product"));
  }

  return (
    <div className="w-full h-full max-h-full overflow-y-scroll relative p-6 bg-new2">
      {/* Add Product Button */}
      <Link
        to="/admin/Add-Product"
        className="absolute bottom-30 right-6 cursor-pointer rounded-xl bg-accent text-white px-6 py-3 shadow-md hover:bg-secondary transition"
      >
        + Add Product
      </Link>

      {/* Loading Spinner */}
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-accent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-accent text-white">
              <tr>
                <th className="p-3 text-left">Product ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Label Price</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-new transition"
                >
                  <td className="p-3">{item.productId}</td>
                  <td className="p-3 font-semibold text-secondary">
                    {item.productName}
                  </td>
                  <td className="p-3">
                    {item.images.length > 0 ? (
                      <img
                        src={item.images[0]}
                        alt={item.productName}
                        className="w-20 h-20 object-cover rounded-md border"
                      />
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </td>
                  <td className="p-3 text-gray-600">
                    {item.lablePrice}
                  </td>
                  <td className="p-3 font-bold text-accent">
                    {item.Price}
                  </td>
                  <td className="p-3">{item.stock}</td>
                  <td className="p-3">
                    <div className="flex items-center justify-center gap-4">
                      <FaTrash
                        onClick={() => deleteProduct(item.productId)}
                        className="text-red-600 hover:text-red-800 cursor-pointer transition"
                        title="Delete"
                      />
                      <FaEdit
                        onClick={() =>
                          navigate("/admin/edit-Product", { state: item })
                        }
                        className="text-blue-600 hover:text-blue-800 cursor-pointer transition"
                        title="Edit"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
