import { useEffect, useState } from "react";
import api from "../services/api";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    const response = await api.get(`/orders?userId=${user.id}`);
    setOrders(response.data);
  }

  return (
    <div>
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <div className="empty-box">
          <h2>No orders yet</h2>
          <p>Your placed orders will appear here.</p>
        </div>
      ) : (
        <div className="orders">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <h2>Order #{order.id}</h2>
              <p>Date: {order.date}</p>
              <p>Status: {order.status}</p>
              <p className="price">Total: ₹ {order.total}</p>

              <div className="order-items">
                {order.items.map((item) => (
                  <div className="order-item" key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <span>{item.name}</span>
                    <strong>₹ {item.price}</strong>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;