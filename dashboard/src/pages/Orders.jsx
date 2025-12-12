import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const res = await axios.get("http://127.0.0.1:8000/store/orders/all/");
    setOrders(res.data.orders);
  };

  const markDelivered = async (id) => {
    await axios.get(`http://127.0.0.1:8000/store/orders/deliver/${id}/`);
    loadOrders();
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Customer Orders</h1>

      {orders.map((order) => (
        <div key={order.id} className="bg-white p-4 shadow rounded mb-4">
          <h2 className="font-bold text-lg">Order #{order.id}</h2>
          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total:</strong> ₦{order.total}</p>

          <h3 className="font-semibold mt-3">Items:</h3>
          <ul className="list-disc ml-6">
            {order.items.map((i, index) => (
              <li key={index}>
                {i.product} — {i.quantity} × ₦{i.unit_price}
              </li>
            ))}
          </ul>

          <h3 className="font-semibold mt-3">Shipping:</h3>
          <p>{order.shipping.fullname}, {order.shipping.phone}</p>
          <p>
            {order.shipping.street}, {order.shipping.city}, {order.shipping.state},{" "}
            {order.shipping.country}
          </p>

          {order.status !== "delivered" && (
            <button
              onClick={() => markDelivered(order.id)}
              className="bg-green-600 text-white px-4 py-2 mt-3 rounded"
            >
              Mark as Delivered
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
