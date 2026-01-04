// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function Orders() {
//   const [orders, setOrders] = useState([]);

//   const loadOrders = async () => {
//     const res = await axios.get("http://127.0.0.1:8000/store/orders/all/");
//     setOrders(res.data.orders);
//   };

//   const markDelivered = async (id) => {
//     await axios.get(`http://127.0.0.1:8000/store/orders/deliver/${id}/`);
//     loadOrders();
//   };

//   useEffect(() => {
//     loadOrders();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">Customer Orders</h1>

//       {orders.map((order) => (
//         <div key={order.id} className="bg-white p-4 shadow rounded mb-4">
//           <h2 className="font-bold text-lg">Order #{order.id}</h2>
//           <p><strong>Email:</strong> {order.email}</p>
//           <p><strong>Status:</strong> {order.status}</p>
//           <p><strong>Total:</strong> ₦{order.total}</p>

//           <h3 className="font-semibold mt-3">Items:</h3>
//           <ul className="list-disc ml-6">
//             {order.items.map((i, index) => (
//               <li key={index}>
//                 {i.product} — {i.quantity} × ₦{i.unit_price}
//               </li>
//             ))}
//           </ul>

//           <h3 className="font-semibold mt-3">Shipping:</h3>
//           <p>{order.shipping.fullname}, {order.shipping.phone}</p>
//           <p>
//             {order.shipping.street}, {order.shipping.city}, {order.shipping.state},{" "}
//             {order.shipping.country}
//           </p>

//           {order.status !== "delivered" && (
//             <button
//               onClick={() => markDelivered(order.id)}
//               className="bg-green-600 text-white px-4 py-2 mt-3 rounded"
//             >
//               Mark as Delivered
//             </button>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }











// import React, { useEffect, useState } from "react"; 
// import axios from "axios";

// export default function Orders() {
//   const [orders, setOrders] = useState([]);

//   const loadOrders = async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/store/orders/all/");
//       setOrders(res.data.orders || []);
//     } catch (err) {
//       console.error("Failed to load orders:", err);
//     }
//   };

//   const markShipped = async (id) => {
//     try {
//       await axios.get(`http://127.0.0.1:8000/store/orders/ship/${id}/`);
//       loadOrders();
//     } catch (err) {
//       console.error("Failed to mark as shipped:", err);
//     }
//   };

//   const markDelivered = async (id) => {
//     try {
//       await axios.get(`http://127.0.0.1:8000/store/orders/deliver/${id}/`);
//       loadOrders();
//     } catch (err) {
//       console.error("Failed to mark as delivered:", err);
//     }
//   };

//   useEffect(() => {
//     loadOrders();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">Customer Orders</h1>

//       {orders.map((order) => (
//         <div key={order.id} className="bg-white p-4 shadow rounded mb-4">
//           <h2 className="font-bold text-lg">Order #{order.id}</h2>
//           <p><strong>Email:</strong> {order.email}</p>
//           <p><strong>Status:</strong> {order.status}</p>
//           <p><strong>Total:</strong> ₦{order.total}</p>

//           <h3 className="font-semibold mt-3">Items:</h3>
//           <ul className="list-disc ml-6">
//             {order.items.map((i, index) => (
//               <li key={index}>
//                 {i.product} — {i.quantity} × ₦{i.unit_price}
//               </li>
//             ))}
//           </ul>

//           <h3 className="font-semibold mt-3">Shipping:</h3>
//           <p>{order.shipping.fullname}, {order.shipping.phone}</p>
//           <p>
//             {order.shipping.street}, {order.shipping.city}, {order.shipping.state},{" "}
//             {order.shipping.country}
//           </p>

//           <div className="mt-3 flex gap-2">
//             {order.status === "processing" && (
//               <button
//                 onClick={() => markShipped(order.id)}
//                 className="bg-blue-600 text-white px-4 py-2 rounded"
//               >
//                 Mark as Shipped
//               </button>
//             )}

//             {order.status !== "delivered" && (
//               <button
//                 onClick={() => markDelivered(order.id)}
//                 className="bg-green-600 text-white px-4 py-2 rounded"
//               >
//                 Mark as Delivered
//               </button>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }












// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function Orders() {
//   const [orders, setOrders] = useState([]);

//   const loadOrders = async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/store/orders/all/");
//       setOrders(res.data.orders || []);
//     } catch (err) {
//       console.error("Failed to load orders:", err);
//     }
//   };

//   const markShipped = async (id) => {
//     try {
//       await axios.get(`http://127.0.0.1:8000/store/orders/ship/${id}/`);
//       loadOrders();
//     } catch (err) {
//       console.error("Failed to mark as shipped:", err);
//     }
//   };

//   const markDelivered = async (id) => {
//     try {
//       await axios.get(`http://127.0.0.1:8000/store/orders/deliver/${id}/`);
//       loadOrders();
//     } catch (err) {
//       console.error("Failed to mark as delivered:", err);
//     }
//   };

//   const confirmPayment = async (id) => {
//     try {
//       await axios.post(`http://127.0.0.1:8000/store/orders/confirm-payment/${id}/`);
//       loadOrders();
//     } catch (err) {
//       console.error("Failed to confirm payment:", err);
//     }
//   };

//   useEffect(() => {
//     loadOrders();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">Customer Orders</h1>

//       {orders.length === 0 && <p>No orders yet.</p>}

//       {orders.map((order) => (
//         <div key={order.id} className="bg-white p-4 shadow rounded mb-4">
//           <h2 className="font-bold text-lg">Order #{order.id}</h2>
//           <p><strong>Email:</strong> {order.email}</p>
//           <p><strong>Status:</strong> {order.status}</p>
//           <p><strong>Total:</strong> ₦{order.total}</p>

//           <h3 className="font-semibold mt-3">Items:</h3>
//           <ul className="list-disc ml-6">
//             {order.items.map((item, index) => (
//               <li key={index}>
//                 {item.product} — {item.quantity} × ₦{item.unit_price}{" "}
//                 {item.product_type === "digital" && item.download_link && order.status === "delivered" && (
//                   <a
//                     href={item.download_link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 ml-2 underline"
//                   >
//                     Download
//                   </a>
//                 )}
//               </li>
//             ))}
//           </ul>

//           <h3 className="font-semibold mt-3">Shipping:</h3>
//           {order.shipping ? (
//             <>
//               <p>{order.shipping.fullname}, {order.shipping.phone}</p>
//               <p>
//                 {order.shipping.street}, {order.shipping.city}, {order.shipping.state},{" "}
//                 {order.shipping.country}
//               </p>
//             </>
//           ) : (
//             <p>Digital Order – No shipping required</p>
//           )}

//           {order.payment_proof && (
//             <div className="mt-3">
//               <p className="font-semibold">Payment Proof:</p>
//               <img
//                 src={order.payment_proof}
//                 alt="Payment Proof"
//                 className="w-48 h-auto border rounded mt-1"
//               />
//             </div>
//           )}

//           <div className="mt-3 flex gap-2 flex-wrap">
//             {order.status === "pending" && (
//               <button
//                 onClick={() => confirmPayment(order.id)}
//                 className="bg-yellow-600 text-white px-4 py-2 rounded"
//               >
//                 Confirm Payment
//               </button>
//             )}

//             {order.status === "processing" && order.shipping && (
//               <button
//                 onClick={() => markShipped(order.id)}
//                 className="bg-blue-600 text-white px-4 py-2 rounded"
//               >
//                 Mark as Shipped
//               </button>
//             )}

//             {order.status !== "delivered" && (
//               <button
//                 onClick={() => markDelivered(order.id)}
//                 className="bg-green-600 text-white px-4 py-2 rounded"
//               >
//                 Mark as Delivered
//               </button>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


















// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function Orders() {
//   const [orders, setOrders] = useState([]);

//   const loadOrders = async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/store/orders/all/");
//       setOrders(res.data.orders || []);
//     } catch (err) {
//       console.error("Failed to load orders:", err);
//     }
//   };

//   const updateStatus = async (order, newStatus) => {
//     try {
//       const type = order.shipping ? "physical" : "digital";

//       await axios.post(`http://127.0.0.1:8000/store/orders/update-status/${type}/${order.id}/`, {
//         status: newStatus,
//       });
//       loadOrders();
//     } catch (err) {
//       console.error("Failed to update status:", err);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "pending":
//         return "bg-yellow-500";
//       case "processing":
//         return "bg-orange-500";
//       case "shipped":
//         return "bg-blue-500";
//       case "delivered":
//         return "bg-green-500";
//       case "cancelled":
//         return "bg-red-500";
//       default:
//         return "bg-gray-500";
//     }
//   };

//   useEffect(() => {
//     loadOrders();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">Customer Orders</h1>

//       {orders.length === 0 && <p>No orders yet.</p>}

//       {orders.map((order) => (
//         <div key={order.id} className="bg-white p-4 shadow rounded mb-4">
//           <div className="flex justify-between items-center">
//             <h2 className="font-bold text-lg">Order #{order.id}</h2>
//             <span
//               className={`text-white px-3 py-1 rounded-full ${getStatusColor(order.status)}`}
//             >
//               {order.status.toUpperCase()}
//             </span>
//           </div>

//           <p><strong>Email:</strong> {order.email}</p>
//           <p><strong>Total:</strong> ₦{order.total}</p>

//           <h3 className="font-semibold mt-3">Items:</h3>
//           <ul className="list-disc ml-6">
//             {order.items.map((item, index) => (
//               <li key={index}>
//                 {item.product} — {item.quantity} × ₦{item.unit_price}{" "}
//                 {item.product_type === "digital" && item.download_link && order.status === "delivered" && (
//                   <a
//                     href={item.download_link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 ml-2 underline"
//                   >
//                     Download
//                   </a>
//                 )}
//               </li>
//             ))}
//           </ul>

//           <h3 className="font-semibold mt-3">Shipping:</h3>
//           {order.shipping ? (
//             <>
//               <p>{order.shipping.fullname}, {order.shipping.phone}</p>
//               <p>
//                 {order.shipping.street}, {order.shipping.city}, {order.shipping.state},{" "}
//                 {order.shipping.country}
//               </p>
//             </>
//           ) : (
//             <p>Digital Order – No shipping required</p>
//           )}

//           {order.payment_proof && (
//             <div className="mt-3">
//               <p className="font-semibold">Payment Proof:</p>
//               <img
//                 src={order.payment_proof}
//                 alt="Payment Proof"
//                 className="w-48 h-auto border rounded mt-1"
//               />
//             </div>
//           )}

//           <div className="mt-3 flex gap-2 flex-wrap">
//             {order.status === "pending" && (
//               <button
//                 onClick={() => updateStatus(order, "processing")}
//                 className="bg-yellow-600 text-white px-4 py-2 rounded"
//               >
//                 Mark as Processing
//               </button>
//             )}

//             {order.status === "processing" && order.shipping && (
//               <button
//                 onClick={() => updateStatus(order, "shipped")}
//                 className="bg-blue-600 text-white px-4 py-2 rounded"
//               >
//                 Mark as Shipped
//               </button>
//             )}

//             {order.status !== "delivered" && (
//               <button
//                 onClick={() => updateStatus(order, "delivered")}
//                 className="bg-green-600 text-white px-4 py-2 rounded"
//               >
//                 Mark as Delivered
//               </button>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }











import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const res = await axios.get("https://recabitesnetwork.com/store/orders/all/");
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Failed to load orders:", err);
    }
  };

  const updateStatus = async (order, newStatus) => {
    try {
      const orderType = order.is_digital ? "digital" : "physical"; // Assuming API returns is_digital flag
      await axios.post(
        `http://127.0.0.1:8000/store/orders/update-status/${orderType}/${order.id}/`,
        { status: newStatus }
      );
      loadOrders();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "paid": return "bg-green-800";
      case "unpaid": return "bg-red-800";
      case "processing": return "bg-orange-500";
      case "shipped": return "bg-blue-500";
      case "delivered": return "bg-green-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>

      {orders.length === 0 && <p>No orders yet.</p>}

      {orders.map((order) => (
        <div key={order.id} className="bg-white p-4 shadow rounded mb-4">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg">
              Order #{order.id} {order.is_digital && "(Digital)"}
            </h2>
            <span className={`text-white px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
              {order.status.toUpperCase()}
            </span>
          </div>

          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>Total:</strong> ₦{order.total}</p>

          {order.items && (
            <>
              <h3 className="font-semibold mt-3">Items:</h3>
              <ul className="list-disc ml-6">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.product} — {item.quantity} × ₦{item.unit_price}
                    {order.is_digital && item.download_link && order.status === "delivered" && (
                      <a href={item.download_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 ml-2 underline">
                        Download
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}

          {order.shipping ? (
            <>
              <h3 className="font-semibold mt-3">Shipping:</h3>
              <p>{order.shipping.fullname}, {order.shipping.phone}</p>
              <p>{order.shipping.street}, {order.shipping.city}, {order.shipping.state}, {order.shipping.country}</p>
            </>
          ) : (
            <p>Digital Order – No shipping required</p>
          )}

          <div className="mt-3 flex gap-2 flex-wrap">
            {["pending", "processing", "shipped", "paid", "unpaid"].map((status) => (
              status !== order.status && (
                <button
                  key={status}
                  onClick={() => updateStatus(order, status)}
                  className={`px-4 py-2 rounded text-white ${
                    status === "pending" ? "bg-yellow-600" :
                    status === "processing" ? "bg-orange-600" :
                    status === "shipped" ? "bg-blue-600" :
                    status === "paid" ? "bg-green-800" :
                    status === "unpaid" ? "bg-red-800" :
                    "bg-green-600"
                  }`}
                >
                  Mark as {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              )
            ))}
            {order.status !== "delivered" && (
              <button
                onClick={() => updateStatus(order, "delivered")}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Mark as Delivered
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
