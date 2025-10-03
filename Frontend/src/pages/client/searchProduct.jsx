import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/productCard";

export default function SearchProductPage() {
  const { query } = useParams(); // 🔥 dynamic search term
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/search/${query}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="w-full h-full flex flex-wrap justify-center items-center p-4">
      {loading ? (
        <p className="text-gray-500 text-lg">Searching...</p>
      ) : products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))
      ) : (
        <p className="text-gray-500 text-lg">No products found</p>
      )}
    </div>
  );
}
