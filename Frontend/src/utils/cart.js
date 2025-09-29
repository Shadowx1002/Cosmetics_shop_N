export function getCart() {
  let cart = localStorage.getItem("cart");
  
  if (!cart) {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  else{
    cart = JSON.parse(cart);
  }       
  return cart;
}

export function RemoveFromCart(productId) {
  let cart = getCart();
  const newCart = cart.filter((item) => item.productId !== productId);
  localStorage.setItem("cart", JSON.stringify(newCart));
}

export function AddToCart(product, qty) {
  let cart = getCart();
  let index = cart.findIndex((item) => item.productId === product.productId);

  if (index === -1) {
    // New item
    cart.push({
      productId: product.productId,
      productName: product.productName,
      image: product.images[0],
      price: product.Price,           // keep uppercase P because model uses it
      labelPrice: product.lablePrice, // fix typo to match model
      quantity: qty
    });
  } else {
    const newQty = cart[index].quantity + qty;
    
    if(newQty>0){
      if (newQty > product.stock) {
      cart[index].quantity = product.stock;
      console.log(newQty)
    } else {
      cart[index].quantity = newQty;
      
    }
    }else{
      RemoveFromCart(product.productId)
      
      
      return
  }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}



export function ClearCart() {
  let cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
}

// 🔹 New function: Calculate total
export function getCartTotal() {
  let cart = getCart();
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}
