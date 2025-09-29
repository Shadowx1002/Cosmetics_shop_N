import { useState, useEffect } from "react";

import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { useLocation } from "react-router-dom";

export default function CheckOutPage() {
    const location=useLocation()
  const [cart, setCart] = useState(location.state?.cart || []);

  //gettotal
  console.log(cart)
  function getTotal(){
    let Total=0;
    cart.forEach((item)=>{
        Total+=item.price*item.quantity
    })
    return Total;
  }
  function removeFromCart(index){
    const newCart=cart.filter(
        (item,i)=>
            i!== index)
        setCart(newCart)
    
    
  }

  function changeQty(index ,quantity){
    const newQty=cart[index].quantity+quantity
    if(newQty<=0){
        removeFromCart(index)
        return
    }else{
        const newCart =[...cart]
        cart[index].quantity=newQty
        setCart(newCart)
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

  return (
    
    <div className="w-full h-full flex flex-col items-center pt-4 pb-8">
      {/* Cart Total */}
      
      <div className="w-[650px] mb-10 p-4 bg-accent text-white rounded-3xl text-xl font-bold flex justify-between items-center shadow-lg">
        <span className="text-3xl">
          Total:{" "}
          <span className="text-lg text-green-500">
            Rs.{cartTotal.toFixed(2)}
          </span>
        </span>
        
         <span><button className=" hover:bg-green-600 hover:text-white transition p-2 rounded-2xl">Place Order</button></span>

      </div>
      
      {cart.map((item , index) => {
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
                  <span className="text-gray-400 line-through">Rs.{labelPrice.toFixed(2)}</span>
                  <span className="text-red-500 font-bold">Rs.{price.toFixed(2)}</span>
                </div>
              ) : (
                <span className="text-red-500 font-bold">Rs.{price.toFixed(2)}</span>
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
                onClick={()=>{
                  changeQty(index ,-1)
                  
                  
                }
                  
                }
                
                className="w-8 h-8 text-accent rounded-full flex justify-center items-center hover:bg-red-600 hover:text-white transition">
                  <BiMinus/>
                </button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <button 
                onClick={()=>{
                  changeQty(index ,1)
                 
                }
                  
                }
                className="w-8 h-8 text-accent rounded-full flex justify-center items-center hover:bg-green-600 hover:text-white transition">
                  <BiPlus/>
                </button>
              </div>

              {/* Remove Button */}
              
            </div>
            <div className="flex flex-col justify-center items-center px-4"><button
                onClick={() => {removeFromCart(index)}}
                className="mt-2 w-10 h-10 bg-gray-300 text-red-600 rounded-full flex justify-center items-center hover:bg-red-600 hover:text-white transition"
              >
                <BiTrash size={22} />
              </button></div>
          </div>
        );
      })}

      
    </div>
  );
}
