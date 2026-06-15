import { useEffect, useState } from "react";
import api from "../services/api";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getCartItems();
  }, []);

  async function getCartItems() {
    const response = await api.get(`/cart?userId=${user.id}`);
    setCartItems(response.data);
  }

  async function removeFromCart(id) {
    await api.delete(`/cart/${id}`);
    alert("Removed from cart");
    getCartItems();
  }

  async function placeOrder() {
    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    const total = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

    await api.post("/orders", {
      userId: user.id,
      items: cartItems,
      total: total,
      date: new Date().toLocaleDateString(),
      status: "Order Placed"
    });

    for (const item of cartItems) {
      await api.delete(`/cart/${item.id}`);
    }

    alert("Order placed successfully");
    getCartItems();
  }

  return (
    <div>
      <h1>My Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-box">
          <h2>Your cart is empty</h2>
          <p>Add products from product details page.</p>
        </div>
      ) : (
        <>
          <div className="products">
            {cartItems.map((item) => (
              <div className="card" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="card-body">
                  <h3>{item.name}</h3>
                  <p className="price">₹ {item.price}</p>

                  <button
                    className="delete-btn full-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="submit-btn order-btn" onClick={placeOrder}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;