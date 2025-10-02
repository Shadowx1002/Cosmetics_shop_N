import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import mediaUpload from "../../utils/mediaUpload";

export default function AddProductPage() {
  const navigate = useNavigate();

  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [altNames, setAltNames] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImage] = useState([]);
  const [lablePrice, setLablePrice] = useState(0);
  const [Price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);

  const [message, setMessage] = useState(null);

  const resetForm = () => {
    setProductId("");
    setProductName("");
    setAltNames("");
    setDescription("");
    setImage([]);
    setLablePrice(0);
    setPrice(0);
    setStock(0);
    setIsAvailable(true);
  };

  async function AddProduct() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    // Basic validation
    if (!productId || !productName || !description) {
      setMessage({ type: "error", text: "Please fill required fields." });
      return;
    }
    if (
      isNaN(Number(lablePrice)) ||
      isNaN(Number(Price)) ||
      isNaN(Number(stock))
    ) {
      setMessage({
        type: "error",
        text: "Price, label price and stock must be numbers.",
      });
      return;
    }
    if (images.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    try {
      const promiseArray = Array.from(images).map((img) => mediaUpload(img));
      const imageUrls = await Promise.all(promiseArray);

      const altNamesArray = altNames.split(",");
      const product = {
        productId,
        productName,
        altNames: altNamesArray,
        description,
        images: imageUrls,
        lablePrice: Number(lablePrice),
        Price: Number(Price),
        stock: Number(stock),
        isAvailable,
      };

      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/products/",
        product,
        { headers: { Authorization: "Bearer " + token } }
      );

      toast.success("Product added successfully");
      navigate("/admin/Products");
    } catch (err) {
      console.log(err);
      toast.error("Error adding product");
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-new2 p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-accent mb-6">➕ Add Product</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col text-sm font-medium text-secondary">
            Product ID *
            <input
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="e.g. PROD123"
            />
          </label>

          <label className="flex flex-col text-sm font-medium text-secondary">
            Product Name *
            <input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Product name"
            />
          </label>
        </div>

        <label className="flex flex-col text-sm font-medium text-secondary mt-4">
          Alternative Names (comma separated)
          <input
            value={altNames}
            onChange={(e) => setAltNames(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="alt1, alt2, alt3"
          />
        </label>

        <label className="flex flex-col text-sm font-medium text-secondary mt-4">
          Description *
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-accent"
            rows={4}
            placeholder="Short description"
          />
        </label>

        <label className="flex flex-col text-sm font-medium text-secondary mt-4">
          Upload Images *
          <input
            type="file"
            multiple
            onChange={(e) => setImage(e.target.files)}
            className="border border-gray-300 p-2 rounded-lg mt-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </label>

        {images && images.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-3">
            {Array.from(images).map((img, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(img)}
                alt="preview"
                className="w-20 h-20 object-cover rounded-lg border"
              />
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <label className="flex flex-col text-sm font-medium text-secondary">
            Label Price *
            <input
              value={lablePrice}
              onChange={(e) => setLablePrice(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="0"
              inputMode="numeric"
            />
          </label>

          <label className="flex flex-col text-sm font-medium text-secondary">
            Price *
            <input
              value={Price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="0"
              inputMode="numeric"
            />
          </label>

          <label className="flex flex-col text-sm font-medium text-secondary">
            Stock *
            <input
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="0"
              inputMode="numeric"
            />
          </label>
        </div>

        <label className="flex items-center gap-3 mt-6 text-sm font-medium text-secondary">
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
            className="w-4 h-4 text-accent focus:ring-accent border-gray-300 rounded"
          />
          Available
        </label>

        <div className="flex flex-wrap items-center gap-4 mt-8">
          <button
            onClick={AddProduct}
            className="bg-accent hover:bg-secondary text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Add Product
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-lg transition"
          >
            Reset
          </button>

          <Link
            to="/admin/Products"
            className="text-accent hover:underline font-medium"
          >
            ← Back to Products
          </Link>

          {message && (
            <div
              className={`${
                message.type === "success"
                  ? "text-green-600"
                  : "text-red-600"
              } font-medium`}
            >
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
