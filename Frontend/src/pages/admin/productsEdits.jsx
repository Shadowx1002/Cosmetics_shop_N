import { useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import mediaUpload from "../../utils/mediaUpload";

export default function EditProductPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [productId, setProductId] = useState(location.state.productId);
  const [productName, setProductName] = useState(location.state.productName);
  const [altNames, setAltNames] = useState(location.state.altNames.join(","));
  const [description, setDescription] = useState(location.state.description);
  const [images, setImage] = useState([]);
  const [lablePrice, setLablePrice] = useState(location.state.lablePrice);
  const [Price, setPrice] = useState(location.state.Price);
  const [stock, setStock] = useState(location.state.stock);
  const [isAvailable, setIsAvailable] = useState(location.state.isAvailable);

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

  async function UpdateProduct() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

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

    let imageUrls = location.state.images;
    const promiseArray = [];

    for (let i = 0; i < images.length; i++) {
      promiseArray[i] = mediaUpload(images[i]);
    }

    try {
      if (images.length > 0) {
        imageUrls = await Promise.all(promiseArray);
      }
    } catch (err) {
      console.log(err);
      return;
    }

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

    axios
      .put(
        import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId,
        product,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then(() => {
        toast.success("Product updated successfully");
        navigate("/admin/Products");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error updating product");
      });
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-50 p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">
          ✏️ Edit Product
        </h2>

        {/* Product ID + Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <label className="flex flex-col">
            <span className="text-gray-600 font-medium">Product ID *</span>
            <input
              disabled
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="border p-2 rounded mt-1 bg-gray-100 cursor-not-allowed"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-600 font-medium">Product Name *</span>
            <input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="border p-2 rounded mt-1"
              placeholder="Product name"
            />
          </label>
        </div>

        {/* Alternative Names */}
        <label className="flex flex-col mb-4">
          <span className="text-gray-600 font-medium">
            Alternative Names (comma separated)
          </span>
          <input
            value={altNames}
            onChange={(e) => setAltNames(e.target.value)}
            className="border p-2 rounded mt-1"
            placeholder="alt1, alt2, alt3"
          />
        </label>

        {/* Description */}
        <label className="flex flex-col mb-4">
          <span className="text-gray-600 font-medium">Description *</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded mt-1"
            rows={4}
            placeholder="Short description"
          />
        </label>

        {/* File Upload */}
        <label className="flex flex-col mb-4">
          <span className="text-gray-600 font-medium">Upload Images</span>
          <input
            type="file"
            multiple
            onChange={(e) => setImage(e.target.files)}
            className="border p-2 rounded mt-1"
          />
        </label>

        {/* Image Preview */}
        {location.state.images?.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-4">
            {location.state.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="preview"
                className="w-20 h-20 object-cover rounded border"
              />
            ))}
          </div>
        )}

        {/* Prices and Stock */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <label className="flex flex-col">
            <span className="text-gray-600 font-medium">Label Price *</span>
            <input
              value={lablePrice}
              onChange={(e) => setLablePrice(e.target.value)}
              className="border p-2 rounded mt-1"
              placeholder="0"
              inputMode="numeric"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-600 font-medium">Price *</span>
            <input
              value={Price}
              onChange={(e) => setPrice(e.target.value)}
              className="border p-2 rounded mt-1"
              placeholder="0"
              inputMode="numeric"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-600 font-medium">Stock *</span>
            <input
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="border p-2 rounded mt-1"
              placeholder="0"
              inputMode="numeric"
            />
          </label>
        </div>

        {/* Availability */}
        <label className="flex items-center gap-3 mb-4">
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
          />
          <span className="text-gray-600 font-medium">Available</span>
        </label>

        {/* Buttons */}
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={UpdateProduct}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Reset
          </button>

          <Link to="/admin/Products" className="text-blue-600 underline">
            Back to Products
          </Link>
        </div>

        {/* Error / Success Message */}
        {message && (
          <div
            className={`mt-3 ${
              message.type === "success"
                ? "text-green-700"
                : "text-red-700"
            } font-medium`}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}
