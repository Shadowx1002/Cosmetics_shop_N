import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { useLocation } from "react-router-dom";

export default function CheckOutPage() {
  const location = useLocation();
  const [cart, setCart] = useState(location.state?.cart || []);
  const[Name,setName]=useState("");
  const[Email,setEmail]=useState("");
  const[Address,setAddress]=useState("");
  const[Phone,setPhone]=useState("");
  
console.log(Name)
console.log(Email)
console.log(Address)
console.log(Phone)

  //gettotal
  console.log(cart);
  function getTotal() {
    let Total = 0;
    cart.forEach((item) => {
      Total += item.price * item.quantity;
    });
    return Total;
  }
  function removeFromCart(index) {
    const newCart = cart.filter((item, i) => i !== index);
    setCart(newCart);
  }

  function changeQty(index, quantity) {
    const newQty = cart[index].quantity + quantity;
    if (newQty <= 0) {
      removeFromCart(index);
      return;
    } else {
      const newCart = [...cart];
      cart[index].quantity = newQty;
      setCart(newCart);
    }
  }

  // Calculate total of all items
  const cartTotal = cart.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1),
    0
  );

  if (cart.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-2xl font-semibold text-gray-500">
        Your checkout is empty
      </div>
    );
  }

  async function placeOrder() {

    const token = localStorage.getItem("token");
    if(Name==null || Email==null || Phone==null || Address==null){
      toast.error("Please fill all details");
      return
    }
    if (!token) {
      toast.error("Please log in to place order");
      return;
    }

    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    // Replace these with real user info if available
    const userInfo = {
      name: Name,
      email: Email,
      phone: Phone,
      address: Address,
    };

    // Prepare productList
    const productList = cart.map((item) => ({
      productInfo: {
        productId: item.productId,
        name: item.productName,
        altNames: item.altNames || [],
        description: item.description || "",
        images: item.image,
        LablePrice: item.labelPrice?.toString() || item.price.toString(),
        price: item.price.toString(),
      },
      quantity: item.quantity,
    }));

    const orderInformation = {
      orderId: "ORD" + Date.now(), // simple unique orderId
      ...userInfo,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      productList,
    };

    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/orders",
        orderInformation,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("Order placed successfully!");
      setCart([]); // Clear cart after successful order
    } catch (err) {
      console.error(err);
      toast.error("Error placing order");
    }
  }

  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="max-w-md mt-20    p-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-700 text-center">
          Checkout Form
        </h2>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-600 font-medium">Full Name</label>
          <input
          value={Name}
              onChange={(e) => setName(e.target.value)}
            type="text"
            className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-2 rounded-lg outline-none transition"
            placeholder="Enter your full name"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-600 font-medium">Email</label>
          <input
          value={Email}
              onChange={(e) => setEmail(e.target.value)}
            
            type="email"
            className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-2 rounded-lg outline-none transition"
            placeholder="Enter your email"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-600 font-medium">Phone</label>
          <input
          value={Phone}
              onChange={(e) => setPhone(e.target.value)}
            
            type="tel"
            className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-2 rounded-lg outline-none transition"
            placeholder="Enter your phone number"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-600 font-medium">Address</label>
          <input
          value={Address}
              onChange={(e) => setAddress(e.target.value)}
            type="text"
            className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-2 rounded-lg outline-none transition"
            placeholder="Enter your address"
          />
        </div>

        <button
          onClick={placeOrder}
          className="w-full bg-accent hover:bg-green-600 text-white hover:text-accent transition py-2 px-4 rounded-lg font-semibold transition"
        >
          Place Order
        </button>
      </div>

      <div className="w-[70%] flex flex-col items-center justify-center">
        {/* Cart Total */}

        <div className="w-[650px] mb-10 p-4 bg-accent text-white rounded-3xl text-xl font-bold flex justify-between items-center shadow-lg">
          <span className="text-3xl">
            Total:{" "}
            
          </span>
          <span className="text-xl text-green-500">
              Rs.{cartTotal.toFixed(2)}
            </span>

          
        </div>

        {cart.map((item, index) => {
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
                <h2 className="text-sm text-gray-600 mb-2">
                  #{item.productId}
                </h2>

                {/* Price */}
                {labelPrice > price ? (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 line-through">
                      Rs.{labelPrice.toFixed(2)}
                    </span>
                    <span className="text-red-500 font-bold">
                      Rs.{price.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-red-500 font-bold">
                    Rs.{price.toFixed(2)}
                  </span>
                )}

                {/* Total */}
                <span className="mt-1 text-gray-700 font-semibold">
                  Total: Rs.{total.toFixed(2)}
                </span>
              </div>

              {/* Quantity Controls */}
              <div className="flex flex-col justify-center items-center px-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      changeQty(index, -1);
                    }}
                    className="w-8 h-8 text-accent rounded-full flex justify-center items-center hover:bg-red-600 hover:text-white transition"
                  >
                    <BiMinus />
                  </button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => {
                      changeQty(index, 1);
                    }}
                    className="w-8 h-8 text-accent rounded-full flex justify-center items-center hover:bg-green-600 hover:text-white transition"
                  >
                    <BiPlus />
                  </button>
                </div>

                {/* Remove Button */}
              </div>
              <div className="flex flex-col justify-center items-center px-4">
                <button
                  onClick={() => {
                    removeFromCart(index);
                  }}
                  className="mt-2 w-10 h-10 bg-gray-300 text-red-600 rounded-full flex justify-center items-center hover:bg-red-600 hover:text-white transition"
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

//..
