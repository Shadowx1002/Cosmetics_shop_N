import { useState, useEffect } from "react";
import { AddToCart, getCart, RemoveFromCart } from "../../utils/cart";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState(getCart() || []);

  // Load cart on mount
  useEffect(() => {
    setCart(getCart() || []);
  }, []);

  // Remove item
  const handleRemove = (productId) => {
    RemoveFromCart(productId);
    setCart(getCart() || []);
  };

  // Calculate total
  const cartTotal = cart.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1),
    0
  );

  if (!cart.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl md:text-2xl font-semibold text-gray-500 p-4">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center pt-6 pb-10 px-4 md:px-0 bg-gray-50">
      
      {/* Cart Total */}
      <div className="w-full max-w-3xl mb-6 p-4 bg-accent text-white rounded-3xl flex flex-col md:flex-row justify-between items-center shadow-lg gap-4">
        <span className="text-xl md:text-2xl font-bold">
          Total: <span className="text-green-400">Rs.{cartTotal.toFixed(2)}</span>
        </span>
        <Link
          to="/checkout"
          state={{ cart }}
          className="px-4 py-2 bg-green-500 text-white rounded-2xl hover:bg-green-600 transition font-semibold text-center w-full md:w-auto"
        >
          Checkout
        </Link>
      </div>

      {/* Cart Items */}
      <div className="w-full max-w-3xl flex flex-col gap-4">
        {cart.map((item) => {
          const price = Number(item.price) || 0;
          const labelPrice = Number(item.labelPrice) || 0;
          const total = price * (item.quantity || 1);

          return (
            <div
              key={item.productId}
              className="flex flex-col md:flex-row items-center bg-white rounded-3xl shadow-md overflow-hidden p-4 gap-4"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.productName}
                className="w-full md:w-32 h-32 object-cover rounded-lg"
              />

              {/* Product Info */}
              <div className="flex-1 flex flex-col justify-center gap-1 px-2">
                <h2 className="text-lg font-bold text-secondary">{item.productName}</h2>
                <span className="text-sm text-gray-500">#{item.productId}</span>

                <div className="flex items-center gap-2 mt-1">
                  {labelPrice > price && (
                    <span className="line-through text-gray-400">Rs.{labelPrice.toFixed(2)}</span>
                  )}
                  <span className="text-red-500 font-bold">Rs.{price.toFixed(2)}</span>
                </div>

                <span className="mt-1 text-gray-700 font-semibold">
                  Total: Rs.{total.toFixed(2)}
                </span>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2 mt-2 md:mt-0">
                <button
                  onClick={() => { AddToCart(item, -1); setCart(getCart()); }}
                  className="w-8 h-8 text-accent rounded-full flex justify-center items-center hover:bg-red-600 hover:text-white transition"
                >
                  <BiMinus />
                </button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <button
                  onClick={() => { AddToCart(item, 1); setCart(getCart()); }}
                  className="w-8 h-8 text-accent rounded-full flex justify-center items-center hover:bg-green-600 hover:text-white transition"
                >
                  <BiPlus />
                </button>
              </div>

              {/* Remove Button */}
              <div className="flex justify-center items-center mt-2 md:mt-0">
                <button
                  onClick={() => handleRemove(item.productId)}
                  className="w-10 h-10 bg-gray-200 text-red-600 rounded-full flex justify-center items-center hover:bg-red-600 hover:text-white transition"
                >
                  <BiTrash size={22} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
