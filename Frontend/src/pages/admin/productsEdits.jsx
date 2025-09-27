import { useState } from "react";
import axios from "axios";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
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
  const [isAvailable, setIsAvailable] = useState(true);

  const [loading, setLoading] = useState(false);
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
    console.log(token);
    if (token == null) {
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
    let imageUrls=location.state.images;
    const promiseArray = [];
    for (let i = 0; i < images.length; i++) {
      promiseArray[i] = mediaUpload(images[i]);
    }
    
    try {
            if(images.length>0){
                    imageUrls = await Promise.all(promiseArray);
            }
      
      
    } catch (res) {
      console.log(res);
      return;
    }
    const altNamesArray = altNames.split(",");
    const product = {
      productId: productId,
      productName: productName,
      altNames: altNamesArray,
      description: description,
      images: imageUrls,
      lablePrice: Number(lablePrice),
      Price: Number(Price),
      stock: Number(stock),
      isAvailable: isAvailable,
    };
    axios
      .put(
        import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId,
        product,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        toast.success("Product edited successfully");
        console.log(imageUrls);
        navigate("/admin/Products");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error editing product");
      });
  }

  return (
    <div className="w-full min-h-screen  flex flex-col justify-center items-center p-6">
      <div className="w-full h-full ">
        <h2 className="text-xl font-semibold">Add Product</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col">
            Product ID *
            <input
              disabled
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="border p-2 rounded mt-1"
              placeholder="e.g. PROD123"
            />
          </label>

          <label className="flex flex-col">
            Product Name *
            <input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="border p-2 rounded mt-1"
              placeholder="Product name"
            />
          </label>
        </div>

        <label className="flex flex-col">
          Alternative Names (comma separated)
          <input
            value={altNames}
            onChange={(e) => setAltNames(e.target.value)}
            className="border p-2 rounded mt-1"
            placeholder="alt1, alt2, alt3"
          />
        </label>

        <label className="flex flex-col">
          Description *
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded mt-1"
            rows={4}
            placeholder="Short description"
          />
        </label>

        <label className="flex flex-col">
          <input
            type="file"
            multiple
            onChange={(e) => setImage(e.target.files)}
            className="border p-2 rounded mt-1"
            placeholder="https://..."
          />
        </label>

        {images && (
          <div className="flex items-center gap-4">
            <img
              src={images}
              alt="preview"
              className="w-20 h-20 object-cover rounded"
            />
            <span className="text-sm text-gray-600">Preview</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="flex flex-col">
            Label Price *
            <input
              value={lablePrice}
              onChange={(e) => setLablePrice(e.target.value)}
              className="border p-2 rounded mt-1"
              placeholder="0"
              inputMode="numeric"
            />
          </label>

          <label className="flex flex-col">
            Price *
            <input
              value={Price}
              onChange={(e) => setPrice(e.target.value)}
              className="border p-2 rounded mt-1"
              placeholder="0"
              inputMode="numeric"
            />
          </label>

          <label className="flex flex-col">
            Stock *
            <input
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="border p-2 rounded mt-1"
              placeholder="0"
              inputMode="numeric"
            />
          </label>
        </div>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
          />
          Available
        </label>

        <div className="flex items-center gap-3">
          <button
            onClick={UpdateProduct}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
          >
            Edit Product
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Reset
          </button>
          <Link to="/admin/Products" className="text-blue-600 underline">
            Back to Products
          </Link>

          {message && (
            <div
              className={
                message.type === "success"
                  ? "text-green-700 font-medium"
                  : "text-red-700 font-medium"
              }
            >
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
