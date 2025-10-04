import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";

export default function CheckOutPage() {
  const location = useLocation();
  const [cart, setCart] = useState(location.state?.cart || []);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Address, setAddress] = useState("");
  const [Phone, setPhone] = useState("");
  const navigate=useNavigate()

  const cartTotal = cart.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1),
    0
  );

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const changeQty = (index, quantity) => {
    const newQty = cart[index].quantity + quantity;
    if (newQty <= 0) {
      removeFromCart(index);
      return;
    } else {
      const newCart = [...cart];
      newCart[index].quantity = newQty;
      setCart(newCart);
    }
  };

  const placeOrder = async () => {



    const token = localStorage.getItem("token");
    const isloged=localStorage.getItem("isloged")
            if(!isloged){
              toast.error("Please Login first")
              navigate("/login")
              return
            }


    if (!Name || !Email || !Phone || !Address) {
      toast.error("Please fill all details");
      return;
    }
    if (!token) {
      toast.error("Please log in to place order");
      return;
    }
    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const userInfo = { name: Name, email: Email, phone: Phone, address: Address };
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
      orderId: "ORD" + Date.now(),
      ...userInfo,
      total: cartTotal,
      productList,
    };

    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders", orderInformation, {
        headers: { Authorization: "Bearer " + token },
      });
      toast.success("Order placed successfully!");
      setCart([]);
    } catch (err) {
      console.error(err);
      toast.error("Error placing order");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold text-gray-500">
        Your checkout is empty
      </div>
    );
  }

  return (
    <div className="min-h-screen  flex flex-col md:flex-row md:w-full gap-8 p-6 bg-gray-50">
      
      {/* Checkout Form */}
      <div className="md:w-1/3  bg-white rounded-2xl shadow-lg p-6 space-y-4 sticky top-4 h-max mx-auto">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">Checkout Form</h2>

        {["Full Name", "Email", "Phone", "Address"].map((label, idx) => {
          const stateSetters = [setName, setEmail, setPhone, setAddress];
          const values = [Name, Email, Phone, Address];
          const types = ["text", "email", "tel", "text"];
          return (
            <div key={idx} className="flex flex-col">
              <label className="mb-1 text-gray-600 font-medium">{label}</label>
              <input
                type={types[idx]}
                value={values[idx]}
                onChange={(e) => stateSetters[idx](e.target.value)}
                placeholder={`Enter your ${label.toLowerCase()}`}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
              />
            </div>
          );
        })}

        <button


          

          onClick={placeOrder}
          className="w-full bg-accent hover:bg-green-600 text-white hover:text-accent py-3 px-4 rounded-lg font-semibold transition"
        >



          Place Order



        </button>
      </div>

      {/* Cart Summary */}
      <div className="md:w-2/3 flex flex-col gap-4">
        <div className="p-4 bg-accent text-white rounded-3xl text-xl font-bold flex justify-between items-center shadow-lg">
          <span>Total:</span>
          <span className="text-green-400 font-semibold">Rs.{cartTotal.toFixed(2)}</span>
        </div>

        {cart.map((item, index) => {
          const price = Number(item.price) || 0;
          const labelPrice = Number(item.labelPrice) || 0;
          const total = price * item.quantity;

          return (
            <div
              key={item.productId}
              className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-md overflow-hidden p-4 gap-4"
            >
              <img src={item.image} alt={item.productName} className="w-full md:w-32 h-32 object-cover rounded-lg" />

              <div className="flex-1 flex flex-col justify-center gap-1 px-2">
                <h2 className="text-lg font-bold">{item.productName}</h2>
                <span className="text-sm text-gray-500">#{item.productId}</span>
                <div className="flex items-center gap-2 mt-1">
                  {labelPrice > price && <span className="line-through text-gray-400">Rs.{labelPrice.toFixed(2)}</span>}
                  <span className="text-red-500 font-bold">Rs.{price.toFixed(2)}</span>
                </div>
                <span className="text-gray-700 font-semibold">Total: Rs.{total.toFixed(2)}</span>
              </div>

              <div className="flex items-center gap-2 mt-2 md:mt-0">
                <button onClick={() => changeQty(index, -1)} className="w-10 h-10 rounded-full flex justify-center items-center hover:bg-red-600 hover:text-white transition">
                  <BiMinus size={20} />
                </button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <button onClick={() => changeQty(index, 1)} className="w-10 h-10 rounded-full flex justify-center items-center hover:bg-green-600 hover:text-white transition">
                  <BiPlus size={20} />
                </button>
              </div>

              <div className="flex justify-center items-center mt-2 md:mt-0">
                <button onClick={() => removeFromCart(index)} className="w-10 h-10 bg-gray-200 text-red-600 rounded-full flex justify-center items-center hover:bg-red-600 hover:text-white transition">
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
