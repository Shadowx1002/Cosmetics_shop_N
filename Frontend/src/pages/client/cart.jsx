import { useState, useEffect } from "react";
import { getCart, RemoveFromCart } from "../../utils/cart";
import { BiTrash } from "react-icons/bi";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  // Load cart on mount
  useEffect(() => {
    setCart(getCart() || []);
  }, []);

  // Remove item and update state
  const handleRemove = (productId) => {
    RemoveFromCart(productId);
    setCart(getCart() || []);
  };

  // Calculate total of all items
  const cartTotal = cart.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1),
    0
  );

  if (cart.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-2xl font-semibold text-gray-500">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center pt-4 pb-8">
      {cart.map((item) => {
        const price = Number(item.price) || 0;
        const labelPrice = Number(item.labelPrice) || 0;
        const total = price * (item.quantity || 1);

        return (
          <div
            key={item.productId}
            className="w-[650px] rounded-3xl bg-gray-100 shadow-lg flex flex-row mb-4 overflow-hidden"
          >
            {/* Product Image */}
            <img
              src={item.image}
              alt={item.productName}
              className="w-[120px] h-[120px] object-cover"
            />

            {/* Product Info */}
            <div className="flex-1 flex flex-col justify-center px-4 py-2">
              <h1 className="text-lg font-bold text-secondary">
                {item.productName}
              </h1>
              <h2 className="text-sm text-gray-600 mb-2">#{item.productId}</h2>

              {/* Price */}
              {labelPrice > price ? (
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 line-through">${labelPrice.toFixed(2)}</span>
                  <span className="text-red-500 font-bold">${price.toFixed(2)}</span>
                </div>
              ) : (
                <span className="text-red-500 font-bold">${price.toFixed(2)}</span>
              )}

              {/* Total */}
              <span className="mt-1 text-gray-700 font-semibold">
                Total: ${total.toFixed(2)}
              </span>
            </div>

            {/* Quantity Controls */}
            <div className="flex flex-col justify-center items-center px-4">
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 text-accent rounded-full flex justify-center items-center">
                  -
                </button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <button className="w-8 h-8 text-accent rounded-full flex justify-center items-center">
                  +
                </button>
              </div>

              {/* Remove Button */}
              
            </div>
            <div className="flex flex-col justify-center items-center px-4"><button
                onClick={() => handleRemove(item.productId)}
                className="mt-2 w-10 h-10 bg-gray-300 text-red-600 rounded-full flex justify-center items-center hover:bg-red-600 hover:text-white transition"
              >
                <BiTrash size={22} />
              </button></div>
          </div>
        );
      })}

      {/* Cart Total */}
      <div className="w-[650px] mt-6 p-4 bg-accent text-white rounded-3xl text-xl font-bold flex justify-between items-center shadow-lg">
        <span>Total:</span>
        <span>${cartTotal.toFixed(2)}</span>
      </div>
    </div>
  );
}
