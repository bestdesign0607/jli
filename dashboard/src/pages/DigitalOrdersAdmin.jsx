// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function DigitalOrdersAdmin() {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const [updateStatus, setUpdateStatus] = useState({});
//     const token = localStorage.getItem("access_token");

//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const res = await axios.get(
//                     "http://127.0.0.1:8000/store/admin/digital-orders/",
//                     { headers: { Authorization: `Bearer ${token}` } }
//                 );
//                 setOrders(res.data);
//             } catch (err) {
//                 console.error(err);
//                 setError("Failed to fetch digital orders");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchOrders();
//     }, [token]);

//     const handleChange = (orderId, field, value) => {
//         setUpdateStatus((prev) => ({
//             ...prev,
//             [orderId]: { ...prev[orderId], [field]: value },
//         }));
//     };

//     const handleUpdate = async (orderId) => {
//         const updates = updateStatus[orderId];
//         if (!updates) return;

//         try {
//             await axios.patch(
//                 `http://127.0.0.1:8000/store/digital-orders/${orderId}/`,
//                 updates,
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             // Refresh orders
//             const res = await axios.get(
//                 "http://127.0.0.1:8000/store/admin/digital-orders/",
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             setOrders(res.data);
//             alert("Order updated successfully");
//         } catch (err) {
//             console.error(err);
//             alert("Failed to update order");
//         }
//     };

//     if (loading) return <p>Loading digital orders...</p>;
//     if (error) return <p className="text-red-500">{error}</p>;

//     return (
//         <div className="space-y-6">
//             <h2 className="text-2xl font-bold mb-4">Digital Orders</h2>

//             {orders.length === 0 && <p>No digital orders yet.</p>}

//             {orders.map((order) => (
//                 <div
//                     key={order.id}
//                     className="border p-4 rounded shadow space-y-2 bg-white"
//                 >
//                     <p>
//                         <strong>Product:</strong> {order.product_title}
//                     </p>
//                     <p>
//                         <strong>Full Name:</strong> {order.full_name}
//                     </p>
//                     <p>
//                         <strong>Email:</strong> {order.email}
//                     </p>
//                     <p>
//                         <strong>Username:</strong> {order.username || "-"}
//                     </p>
//                     <p>
//                         <strong>Status:</strong> {order.status}
//                     </p>
//                     <p>
//                         <strong>Requirements:</strong>{" "}
//                         <pre>{JSON.stringify(JSON.parse(order.requirements), null, 2)}</pre>
//                     </p>
//                     {order.payment_proof && (
//                         <p>
//                             <strong>Payment Proof:</strong>{" "}
//                             <a href={order.payment_proof} target="_blank" rel="noreferrer">
//                                 View
//                             </a>
//                         </p>
//                     )}
//                     <div className="flex flex-col md:flex-row gap-2 mt-2">
//                         <select
//                             value={updateStatus[order.id]?.status || order.status}
//                             onChange={(e) =>
//                                 handleChange(order.id, "status", e.target.value)
//                             }
//                             className="border p-1 rounded"
//                         >
//                             <option value="pending">Pending</option>
//                             <option value="confirmed">Confirmed</option>
//                             <option value="rejected">Rejected</option>
//                         </select>
//                         <input
//                             type="text"
//                             placeholder="Fulfillment link"
//                             value={updateStatus[order.id]?.fulfillment_link || order.fulfillment_link}
//                             onChange={(e) =>
//                                 handleChange(order.id, "fulfillment_link", e.target.value)
//                             }
//                             className="border p-1 rounded flex-1"
//                         />
//                         <button
//                             onClick={() => handleUpdate(order.id)}
//                             className="bg-green-600 text-white px-3 py-1 rounded"
//                         >
//                             Update
//                         </button>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// }
















// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function DigitalOrdersAdmin() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [updateStatus, setUpdateStatus] = useState({});

//   // Detect image files
//   const isImage = (url) => /\.(jpg|jpeg|png|gif|webp)$/i.test(url);

//   // Fetch orders
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get(
//           "http://127.0.0.1:8000/store/admin/digital-orders/"
//         );
//         setOrders(res.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch digital orders");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   // Handle admin input changes
//   const handleChange = (orderId, field, value) => {
//     setUpdateStatus((prev) => ({
//       ...prev,
//       [orderId]: { ...prev[orderId], [field]: value },
//     }));
//   };

//   // Update order
//   const handleUpdate = async (orderId) => {
//     const updates = updateStatus[orderId];
//     if (!updates) return;

//     try {
//       await axios.post(
//         `http://127.0.0.1:8000/store/admin/digital-orders/${orderId}/confirm/`,
//         updates
//       );

//       const res = await axios.get(
//         "http://127.0.0.1:8000/store/admin/digital-orders/"
//       );
//       setOrders(res.data);
//       alert("Order updated successfully");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update order");
//     }
//   };

//   if (loading) return <p>Loading digital orders...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold mb-4">Digital Orders</h2>

//       {orders.length === 0 && <p>No digital orders yet.</p>}

//       {orders.map((order) => {
//         const fileFields = [
//           "id_card",
//           "signature_director",
//           "signature_witness",
//           "nin",
//         ];

//         const coreFields = [
//           "id",
//           "product",
//           "product_title",
//           "full_name",
//           "email",
//           "username",
//           "status",
//           "fulfillment_link",
//           "created_at",
//           "confirmed_at",
//           ...fileFields,
//         ];

//         // Any extra field coming from backend = user submitted text
//         const textFields = Object.keys(order).filter(
//           (key) => !coreFields.includes(key)
//         );

//         return (
//           <div
//             key={order.id}
//             className="border p-4 rounded shadow bg-white space-y-3"
//           >
//             {/* Core info */}
//             <p><strong>Product:</strong> {order.product_title}</p>
//             <p><strong>Full Name:</strong> {order.full_name}</p>
//             <p><strong>Email:</strong> {order.email}</p>
//             <p><strong>Username:</strong> {order.username || "-"}</p>
//             <p><strong>Status:</strong> {order.status}</p>

//             {/* All submitted text fields */}
//             {textFields.map((key) => (
//               <p key={key}>
//                 <strong>
//                   {key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}:
//                 </strong>{" "}
//                 {order[key] || "-"}
//               </p>
//             ))}

//             {/* Uploaded files */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//               {fileFields.map((field) => {
//                 const fileUrl = order[field];
//                 if (!fileUrl) return null;

//                 const label = field
//                   .replace(/_/g, " ")
//                   .replace(/\b\w/g, l => l.toUpperCase());

//                 return (
//                   <div key={field}>
//                     <p className="font-semibold mb-1">{label}</p>

//                     {isImage(fileUrl) ? (
//                       <div className="relative inline-block">
//                         <img
//                           src={fileUrl}
//                           alt={label}
//                           className="max-w-xs border rounded"
//                         />
//                         <a
//                           href={fileUrl}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition"
//                         >
//                           <span className="bg-white text-black px-3 py-1 rounded shadow">
//                             ⬇ Download
//                           </span>
//                         </a>
//                       </div>
//                     ) : (
//                       <a
//                         href={fileUrl}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="inline-block bg-gray-100 border px-3 py-2 rounded hover:bg-gray-200"
//                       >
//                         ⬇ Download File
//                       </a>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Admin actions */}
//             <div className="flex flex-col md:flex-row gap-2 mt-4">
//               <select
//                 value={updateStatus[order.id]?.status || order.status}
//                 onChange={(e) =>
//                   handleChange(order.id, "status", e.target.value)
//                 }
//                 className="border p-1 rounded"
//               >
//                 <option value="pending">Pending</option>
//                 <option value="confirmed">Confirmed</option>
//                 <option value="rejected">Rejected</option>
//               </select>

//               <input
//                 type="text"
//                 placeholder="Fulfillment link"
//                 value={
//                   updateStatus[order.id]?.fulfillment_link ||
//                   order.fulfillment_link ||
//                   ""
//                 }
//                 onChange={(e) =>
//                   handleChange(order.id, "fulfillment_link", e.target.value)
//                 }
//                 className="border p-1 rounded flex-1"
//               />

//               <button
//                 onClick={() => handleUpdate(order.id)}
//                 className="bg-green-600 text-white px-4 py-1 rounded"
//               >
//                 Update
//               </button>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }











// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function DigitalOrdersAdmin() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [expandedOrders, setExpandedOrders] = useState({}); // Track expanded state

//   const normalizeUrl = (url) =>
//     typeof url === "string" ? url.replace("127.0.0.1", "localhost") : "";

//   const isImage = (url) =>
//     typeof url === "string" && /\.(jpg|jpeg|png|gif|webp)$/i.test(url);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:8000/store/admin/digital-orders/"
//         );
//         setOrders(res.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch digital orders");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   const handleDownload = async (url, filename) => {
//     const normalizedUrl = normalizeUrl(url);
//     if (!normalizedUrl) return alert("Invalid file URL");

//     try {
//       const res = await fetch(normalizedUrl);
//       const blob = await res.blob();
//       const blobUrl = window.URL.createObjectURL(blob);

//       const link = document.createElement("a");
//       link.href = blobUrl;
//       link.download = filename || "file";
//       document.body.appendChild(link);
//       link.click();
//       link.remove();

//       window.URL.revokeObjectURL(blobUrl);
//     } catch (err) {
//       console.error("Download failed", err);
//       alert("Download failed. Check console for details.");
//     }
//   };

//   const toggleOrder = (id) => {
//     setExpandedOrders((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   if (loading) return <p>Loading digital orders...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold mb-4">Digital Orders</h2>
//       {orders.length === 0 && <p>No digital orders yet.</p>}

//       {orders.map((order) => {
//         let requirements = {};
//         try {
//           requirements = order.requirements ? JSON.parse(order.requirements) : {};
//         } catch (e) {
//           console.error("Failed to parse requirements", order.id);
//         }

//         const fileFields = [
//           { key: "id_card", label: "ID Card" },
//           { key: "signature_director", label: "Director Signature" },
//           { key: "signature_witness", label: "Witness Signature" },
//           { key: "nin", label: "NIN" },
//           { key: "payment_proof", label: "Payment Proof" },
//         ];

//         return (
//           <div
//             key={order.id}
//             className="border p-4 rounded shadow bg-white space-y-4"
//           >
//             {/* Order header */}
//             <div
//               className="cursor-pointer bg-gray-100 p-2 rounded flex justify-between items-center"
//               onClick={() => toggleOrder(order.id)}
//             >
//               <p className="font-semibold">
//                 {order.full_name} - {order.product_title} ({order.status})
//               </p>
//               <span>{expandedOrders[order.id] ? "▲" : "▼"}</span>
//             </div>

//             {expandedOrders[order.id] && (
//               <div className="space-y-4 mt-2">
//                 {/* Top-level info */}
//                 <div className="space-y-1">
//                   <p><strong>Email:</strong> {order.email || "-"}</p>
//                   <p><strong>Phone:</strong> {order.phone || "-"}</p>
//                   <p><strong>Username:</strong> {order.username || "-"}</p>
//                   <p><strong>Fulfillment Link:</strong> {order.fulfillment_link || "-"}</p>
//                 </div>

//                 {/* Sections */}
//                 {[
//                   { title: "Director Details", fields: ["surname","firstname","othername","dob","gender","phone"] },
//                   { title: "Home Address", fields: ["home_state","home_lga","home_city","home_house","home_street"] },
//                   { title: "Company Address", fields: ["company_state","company_lga","company_city","company_house","company_street","company_email"] },
//                   { title: "Business Names", fields: ["business_name1","business_name2","personal_email"] },
//                   { title: "Object of Memorandum", fields: ["object1","object2","object3","object4"] },
//                   { title: "Witness Details", fields: ["witness_surname","witness_firstname","witness_othername","witness_dob","witness_gender","witness_phone","witness_state","witness_lga","witness_city","witness_house","witness_street"] },
//                 ].map((section) => (
//                   <div key={section.title} className="bg-gray-50 p-3 rounded space-y-1">
//                     <h4 className="font-semibold mb-1">{section.title}</h4>
//                     {section.fields.map((f) => (
//                       <p key={f}><strong>{f.replace("_"," ").toUpperCase()}:</strong> {requirements[f] || "-"}</p>
//                     ))}
//                   </div>
//                 ))}

//                 {/* File Uploads */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                   {fileFields.map((file) => {
//                     const fileUrl = order[file.key];
//                     if (!fileUrl) return null;
//                     return (
//                       <div key={file.key} className="relative">
//                         <p className="font-semibold mb-1">{file.label}</p>
//                         {isImage(fileUrl) ? (
//                           <div className="relative inline-block">
//                             <img
//                               src={normalizeUrl(fileUrl)}
//                               alt={file.label}
//                               className="max-w-xs border rounded"
//                             />
//                             <button
//                               onClick={() => handleDownload(fileUrl, file.label)}
//                               className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded hover:bg-black/70 transition"
//                               title="Download"
//                             >
//                               ⬇
//                             </button>
//                           </div>
//                         ) : (
//                           <button
//                             onClick={() => handleDownload(fileUrl, file.label)}
//                             className="inline-block bg-gray-100 border px-3 py-2 rounded hover:bg-gray-200"
//                           >
//                             ⬇ Download File
//                           </button>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }














// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function DigitalOrdersAdmin() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [expandedOrders, setExpandedOrders] = useState({}); // Track expanded state

//   // Convert backend URLs if needed
//   const normalizeUrl = (url) =>
//     typeof url === "string" ? url.replace("127.0.0.1", "localhost") : "";

//   // Check if URL points to an image
//   const isImage = (url) =>
//     typeof url === "string" && /\.(jpg|jpeg|png|gif|webp)$/i.test(url);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:8000/store/admin/digital-orders/"
//         );
//         setOrders(res.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch digital orders");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   const handleDownload = async (url, filename) => {
//     const normalizedUrl = normalizeUrl(url);
//     if (!normalizedUrl) return alert("Invalid file URL");

//     try {
//       const res = await fetch(normalizedUrl);
//       const blob = await res.blob();
//       const blobUrl = window.URL.createObjectURL(blob);

//       const link = document.createElement("a");
//       link.href = blobUrl;
//       link.download = filename || "file";
//       document.body.appendChild(link);
//       link.click();
//       link.remove();

//       window.URL.revokeObjectURL(blobUrl);
//     } catch (err) {
//       console.error("Download failed", err);
//       alert("Download failed. Check console for details.");
//     }
//   };

//   const toggleOrder = (id) => {
//     setExpandedOrders((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   if (loading) return <p>Loading digital orders...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold mb-4">Digital Orders</h2>
//       {orders.length === 0 && <p>No digital orders yet.</p>}

//       {orders.map((order) => {
//         // Parse requirements JSON safely
//         let requirements = {};
//         try {
//           requirements = order.requirements ? JSON.parse(order.requirements) : {};
//         } catch (e) {
//           console.error("Failed to parse requirements", order.id);
//         }

//         // Get all dynamic file fields from order
//         const fileFields = Object.keys(order).filter(
//           (key) =>
//             order[key] &&
//             (key.endsWith("_card") ||
//               key.endsWith("_signature") ||
//               key === "nin" ||
//               key === "payment_proof")
//         );

//         return (
//           <div
//             key={order.id}
//             className="border p-4 rounded shadow bg-white space-y-4"
//           >
//             {/* Order header */}
//             <div
//               className="cursor-pointer bg-gray-100 p-2 rounded flex justify-between items-center"
//               onClick={() => toggleOrder(order.id)}
//             >
//               <p className="font-semibold">
//                 {order.full_name} - {order.product_title} ({order.status})
//               </p>
//               <span>{expandedOrders[order.id] ? "▲" : "▼"}</span>
//             </div>

//             {expandedOrders[order.id] && (
//               <div className="space-y-4 mt-2">
//                 {/* Top-level info */}
//                 <div className="space-y-1">
//                   <p><strong>Email:</strong> {order.email || "-"}</p>
//                   <p><strong>Phone:</strong> {order.phone || "-"}</p>
//                   <p><strong>Username:</strong> {order.username || "-"}</p>
//                   <p><strong>Status:</strong> {order.status || "-"}</p>
//                 </div>

//                 {/* Dynamic requirements fields */}
//                 {Object.keys(requirements).length > 0 && (
//                   <div className="bg-gray-50 p-3 rounded space-y-1">
//                     <h4 className="font-semibold mb-1">Requirements</h4>
//                     {Object.entries(requirements).map(([key, value]) => (
//                       <p key={key}>
//                         <strong>{key.replace("_", " ").toUpperCase()}:</strong>{" "}
//                         {value || "-"}
//                       </p>
//                     ))}
//                   </div>
//                 )}

//                 {/* File uploads */}
//                 {fileFields.length > 0 && (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                     {fileFields.map((field) => {
//                       const fileUrl = order[field];
//                       if (!fileUrl) return null;
//                       const label = field.replace("_", " ").toUpperCase();
//                       return (
//                         <div key={field} className="relative">
//                           <p className="font-semibold mb-1">{label}</p>
//                           {isImage(fileUrl) ? (
//                             <div className="relative inline-block">
//                               <img
//                                 src={normalizeUrl(fileUrl)}
//                                 alt={label}
//                                 className="max-w-xs border rounded"
//                               />
//                               <button
//                                 onClick={() => handleDownload(fileUrl, label)}
//                                 className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded hover:bg-black/70 transition"
//                                 title="Download"
//                               >
//                                 ⬇
//                               </button>
//                             </div>
//                           ) : (
//                             <button
//                               onClick={() => handleDownload(fileUrl, label)}
//                               className="inline-block bg-gray-100 border px-3 py-2 rounded hover:bg-gray-200"
//                             >
//                               ⬇ Download File
//                             </button>
//                           )}
//                         </div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }













// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function DigitalOrdersAdmin() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [expandedOrders, setExpandedOrders] = useState({});

//   // Convert backend URL for local dev
//   const normalizeUrl = (url) =>
//     typeof url === "string" ? url.replace("127.0.0.1", "localhost") : "";

//   // Detect if a URL points to an image
//   const isImage = (url) =>
//     typeof url === "string" && /\.(jpg|jpeg|png|gif|webp)$/i.test(url);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:8000/store/admin/digital-orders/"
//         );
//         setOrders(res.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch digital orders");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   const handleDownload = async (url, filename) => {
//     const normalizedUrl = normalizeUrl(url);
//     if (!normalizedUrl) return alert("Invalid file URL");

//     try {
//       const res = await fetch(normalizedUrl);
//       const blob = await res.blob();
//       const blobUrl = window.URL.createObjectURL(blob);

//       const link = document.createElement("a");
//       link.href = blobUrl;
//       link.download = filename || "file";
//       document.body.appendChild(link);
//       link.click();
//       link.remove();

//       window.URL.revokeObjectURL(blobUrl);
//     } catch (err) {
//       console.error("Download failed", err);
//       alert("Download failed. Check console for details.");
//     }
//   };

//   const toggleOrder = (id) => {
//     setExpandedOrders((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   if (loading) return <p>Loading digital orders...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold mb-4">Digital Orders</h2>
//       {orders.length === 0 && <p>No digital orders yet.</p>}

//       {orders.map((order) => {
//         // Parse requirements safely
//         let requirements = {};
//         try {
//           requirements =
//             typeof order.requirements === "string"
//               ? JSON.parse(order.requirements)
//               : order.requirements || {};
//         } catch (e) {
//           console.error("Failed to parse requirements", order.id);
//         }

//         const fileFields = [
//           { key: "id_card", label: "ID Card" },
//           { key: "signature_director", label: "Director Signature" },
//           { key: "signature_witness", label: "Witness Signature" },
//           { key: "nin", label: "NIN" },
//           { key: "payment_proof", label: "Payment Proof" },
//         ];

//         return (
//           <div
//             key={order.id}
//             className="border p-4 rounded shadow bg-white space-y-4"
//           >
//             {/* Header */}
//             <div
//               className="cursor-pointer bg-gray-100 p-2 rounded flex justify-between items-center"
//               onClick={() => toggleOrder(order.id)}
//             >
//               <p className="font-semibold">
//                 {order.full_name} - {order.product_title} ({order.status})
//               </p>
//               <span>{expandedOrders[order.id] ? "▲" : "▼"}</span>
//             </div>

//             {expandedOrders[order.id] && (
//               <div className="space-y-4 mt-2">
//                 {/* Top-level info */}
//                 <div className="space-y-1">
//                   <p>
//                     <strong>Email:</strong> {order.email || "-"}
//                   </p>
//                   <p>
//                     <strong>Phone:</strong> {order.phone || "-"}
//                   </p>
//                   <p>
//                     <strong>Username:</strong> {order.username || "-"}
//                   </p>
//                 </div>

//                 {/* Sections */}
//                 {[
//                   {
//                     title: "Director Details",
//                     fields: [
//                       "surname",
//                       "firstname",
//                       "othername",
//                       "dob",
//                       "gender",
//                       "phone",
//                     ],
//                   },
//                   {
//                     title: "Home Address",
//                     fields: [
//                       "home_state",
//                       "home_lga",
//                       "home_city",
//                       "home_house",
//                       "home_street",
//                     ],
//                   },
//                   {
//                     title: "Company Address",
//                     fields: [
//                       "company_state",
//                       "company_lga",
//                       "company_city",
//                       "company_house",
//                       "company_street",
//                       "company_email",
//                     ],
//                   },
//                   {
//                     title: "Business Names",
//                     fields: ["business_name1", "business_name2", "personal_email"],
//                   },
//                   {
//                     title: "Object of Memorandum",
//                     fields: ["object1", "object2", "object3", "object4"],
//                   },
//                   {
//                     title: "Witness Details",
//                     fields: [
//                       "witness_surname",
//                       "witness_firstname",
//                       "witness_othername",
//                       "witness_dob",
//                       "witness_gender",
//                       "witness_phone",
//                       "witness_state",
//                       "witness_lga",
//                       "witness_city",
//                       "witness_house",
//                       "witness_street",
//                     ],
//                   },
//                 ].map((section) => (
//                   <div
//                     key={section.title}
//                     className="bg-gray-50 p-3 rounded space-y-1"
//                   >
//                     <h4 className="font-semibold mb-1">{section.title}</h4>
//                     {section.fields.map((f) => (
//                       <p key={f}>
//                         <strong>{f.replace("_", " ").toUpperCase()}:</strong>{" "}
//                         {requirements[f] || "-"}
//                       </p>
//                     ))}
//                   </div>
//                 ))}

//                 {/* File fields */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                   {fileFields.map((file) => {
//                     const fileUrl = order[file.key];
//                     if (!fileUrl) return null;
//                     return (
//                       <div key={file.key} className="relative">
//                         <p className="font-semibold mb-1">{file.label}</p>
//                         {isImage(fileUrl) ? (
//                           <div className="relative inline-block">
//                             <img
//                               src={normalizeUrl(fileUrl)}
//                               alt={file.label}
//                               className="max-w-xs border rounded"
//                             />
//                             <button
//                               onClick={() =>
//                                 handleDownload(fileUrl, file.label)
//                               }
//                               className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded hover:bg-black/70 transition"
//                               title="Download"
//                             >
//                               ⬇
//                             </button>
//                           </div>
//                         ) : (
//                           <button
//                             onClick={() =>
//                               handleDownload(fileUrl, file.label)
//                             }
//                             className="inline-block bg-gray-100 border px-3 py-2 rounded hover:bg-gray-200"
//                           >
//                             ⬇ Download File
//                           </button>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }




















// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function DigitalOrdersAdmin() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [expandedOrders, setExpandedOrders] = useState({});

//   // Convert backend URL for local dev
//   const normalizeUrl = (url) =>
//     typeof url === "string" ? url.replace("127.0.0.1", "localhost") : "";

//   // Detect if a URL points to an image
//   const isImage = (url) =>
//     typeof url === "string" && /\.(jpg|jpeg|png|gif|webp)$/i.test(url);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:8000/store/admin/digital-orders/"
//         );
//         setOrders(res.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch digital orders");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   const handleDownload = async (url, filename) => {
//     const normalizedUrl = normalizeUrl(url);
//     if (!normalizedUrl) return alert("Invalid file URL");

//     try {
//       const res = await fetch(normalizedUrl);
//       const blob = await res.blob();
//       const blobUrl = window.URL.createObjectURL(blob);

//       const link = document.createElement("a");
//       link.href = blobUrl;
//       link.download = filename || "file";
//       document.body.appendChild(link);
//       link.click();
//       link.remove();

//       window.URL.revokeObjectURL(blobUrl);
//     } catch (err) {
//       console.error("Download failed", err);
//       alert("Download failed. Check console for details.");
//     }
//   };

//   const toggleOrder = (id) => {
//     setExpandedOrders((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   if (loading) return <p>Loading digital orders...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold mb-4">Digital Orders</h2>
//       {orders.length === 0 && <p>No digital orders yet.</p>}

//       {orders.map((order) => {
//         // Define all file fields
//         const fileFields = [
//           { key: "id_card", label: "ID Card" },
//           { key: "signature_director", label: "Director Signature" },
//           { key: "signature_witness", label: "Witness Signature" },
//           { key: "nin", label: "NIN" },
//           { key: "payment_proof", label: "Payment Proof" },
//         ];

//         return (
//           <div
//             key={order.id}
//             className="border p-4 rounded shadow bg-white space-y-4"
//           >
//             {/* Header */}
//             <div
//               className="cursor-pointer bg-gray-100 p-2 rounded flex justify-between items-center"
//               onClick={() => toggleOrder(order.id)}
//             >
//               <p className="font-semibold">
//                 {order.full_name} - {order.product_title} ({order.status})
//               </p>
//               <span>{expandedOrders[order.id] ? "▲" : "▼"}</span>
//             </div>

//             {expandedOrders[order.id] && (
//               <div className="space-y-4 mt-2">
//                 {/* Top-level info */}
//                 <div className="space-y-1">
//                   <p>
//                     <strong>Email:</strong> {order.email || "-"}
//                   </p>
//                   <p>
//                     <strong>Phone:</strong> {order.phone || "-"}
//                   </p>
//                   <p>
//                     <strong>Username:</strong> {order.username || "-"}
//                   </p>
//                 </div>

//                 {/* Sections */}
//                 {[
//                   {
//                     title: "Director Details",
//                     fields: ["surname","firstname","othername","dob","gender","phone"],
//                   },
//                   {
//                     title: "Home Address",
//                     fields: ["home_state","home_lga","home_city","home_house","home_street"],
//                   },
//                   {
//                     title: "Company Address",
//                     fields: ["company_state","company_lga","company_city","company_house","company_street","company_email"],
//                   },
//                   {
//                     title: "Business Names",
//                     fields: ["business_name1","business_name2","personal_email"],
//                   },
//                   {
//                     title: "Object of Memorandum",
//                     fields: ["object1","object2","object3","object4"],
//                   },
//                   {
//                     title: "Witness Details",
//                     fields: [
//                       "witness_surname","witness_firstname","witness_othername","witness_dob",
//                       "witness_gender","witness_phone","witness_state","witness_lga",
//                       "witness_city","witness_house","witness_street"
//                     ],
//                   },
//                 ].map((section) => (
//                   <div key={section.title} className="bg-gray-50 p-3 rounded space-y-1">
//                     <h4 className="font-semibold mb-1">{section.title}</h4>
//                     {section.fields.map((f) => (
//                       <p key={f}>
//                         <strong>{f.replace("_"," ").toUpperCase()}:</strong>{" "}
//                         {order[f] || "-"}
//                       </p>
//                     ))}
//                   </div>
//                 ))}

//                 {/* File uploads */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                   {fileFields.map((file) => {
//                     const fileUrl = order[file.key];
//                     if (!fileUrl) return null;
//                     return (
//                       <div key={file.key} className="relative">
//                         <p className="font-semibold mb-1">{file.label}</p>
//                         {isImage(fileUrl) ? (
//                           <div className="relative inline-block">
//                             <img
//                               src={normalizeUrl(fileUrl)}
//                               alt={file.label}
//                               className="max-w-xs border rounded"
//                             />
//                             <button
//                               onClick={() => handleDownload(fileUrl, file.label)}
//                               className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded hover:bg-black/70 transition"
//                               title="Download"
//                             >
//                               ⬇
//                             </button>
//                           </div>
//                         ) : (
//                           <button
//                             onClick={() => handleDownload(fileUrl, file.label)}
//                             className="inline-block bg-gray-100 border px-3 py-2 rounded hover:bg-gray-200"
//                           >
//                             ⬇ Download File
//                           </button>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }



















// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function DigitalOrdersAdmin() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [expandedOrders, setExpandedOrders] = useState({});

//   // Convert backend URL for local dev
//   const normalizeUrl = (url) =>
//     typeof url === "string" ? url.replace("127.0.0.1", "localhost") : "";

//   // Detect if a URL points to an image
//   const isImage = (url) =>
//     typeof url === "string" && /\.(jpg|jpeg|png|gif|webp)$/i.test(url);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:8000/store/admin/digital-orders/"
//         );
//         setOrders(res.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch digital orders");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   const handleDownload = async (url, filename) => {
//     const normalizedUrl = normalizeUrl(url);
//     if (!normalizedUrl) return alert("Invalid file URL");

//     try {
//       const res = await fetch(normalizedUrl);
//       const blob = await res.blob();
//       const blobUrl = window.URL.createObjectURL(blob);

//       const link = document.createElement("a");
//       link.href = blobUrl;
//       link.download = filename || "file";
//       document.body.appendChild(link);
//       link.click();
//       link.remove();

//       window.URL.revokeObjectURL(blobUrl);
//     } catch (err) {
//       console.error("Download failed", err);
//       alert("Download failed. Check console for details.");
//     }
//   };

//   const toggleOrder = (id) => {
//     setExpandedOrders((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   if (loading) return <p>Loading digital orders...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold mb-4">Digital Orders</h2>
//       {orders.length === 0 && <p>No digital orders yet.</p>}

//       {orders.map((order) => {
//         // SAFELY parse requirements
//         let requirements = {};
//         try {
//           if (typeof order.requirements === "string") {
//             // Convert single quotes to double quotes if needed
//             const jsonStr = order.requirements.replace(/'/g, '"');
//             requirements = JSON.parse(jsonStr);
//           } else if (typeof order.requirements === "object" && order.requirements !== null) {
//             requirements = order.requirements;
//           }
//         } catch (e) {
//           console.error("Failed to parse requirements for order", order.id, e);
//           requirements = {};
//         }

//         // Define all file fields
//         const fileFields = [
//           { key: "id_card", label: "ID Card" },
//           { key: "signature_director", label: "Director Signature" },
//           { key: "signature_witness", label: "Witness Signature" },
//           { key: "nin", label: "NIN" },
//           { key: "payment_proof", label: "Payment Proof" },
//         ];

//         return (
//           <div
//             key={order.id}
//             className="border p-4 rounded shadow bg-white space-y-4"
//           >
//             {/* Header */}
//             <div
//               className="cursor-pointer bg-gray-100 p-2 rounded flex justify-between items-center"
//               onClick={() => toggleOrder(order.id)}
//             >
//               <p className="font-semibold">
//                 {order.full_name} - {order.product_title} ({order.status})
//               </p>
//               <span>{expandedOrders[order.id] ? "▲" : "▼"}</span>
//             </div>

//             {expandedOrders[order.id] && (
//               <div className="space-y-4 mt-2">
//                 {/* Top-level info */}
//                 <div className="space-y-1">
//                   <p>
//                     <strong>Email:</strong> {order.email || requirements.email || "-"}
//                   </p>
//                   <p>
//                     <strong>Phone:</strong> {order.phone || requirements.phone || "-"}
//                   </p>
//                   <p>
//                     <strong>Username:</strong> {order.username || requirements.username || "-"}
//                   </p>
//                 </div>

//                 {/* Sections */}
//                 {[
//                   {
//                     title: "Director Details",
//                     fields: ["surname","firstname","othername","dob","gender","phone","email"],
//                   },
//                   {
//                     title: "Home Address",
//                     fields: ["home_state","home_lga","home_city","home_house","home_street"],
//                   },
//                   {
//                     title: "Company Address",
//                     fields: ["company_state","company_lga","company_city","company_house","company_street","company_email"],
//                   },
//                   {
//                     title: "Business Names",
//                     fields: ["business_name1","business_name2","personal_email"],
//                   },
//                   {
//                     title: "Object of Memorandum",
//                     fields: ["object1","object2","object3","object4"],
//                   },
//                   {
//                     title: "Witness Details",
//                     fields: [
//                       "witness_surname","witness_firstname","witness_othername","witness_dob",
//                       "witness_gender","witness_phone","witness_state","witness_lga",
//                       "witness_city","witness_house","witness_street"
//                     ],
//                   },
//                 ].map((section) => (
//                   <div key={section.title} className="bg-gray-50 p-3 rounded space-y-1">
//                     <h4 className="font-semibold mb-1">{section.title}</h4>
//                     {section.fields.map((f) => (
//                       <p key={f}>
//                         <strong>{f.replace("_"," ").toUpperCase()}:</strong>{" "}
//                         {requirements[f] || "-"}
//                       </p>
//                     ))}
//                   </div>
//                 ))}

//                 {/* File uploads */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                   {fileFields.map((file) => {
//                     const fileUrl = order[file.key];
//                     if (!fileUrl) return null;
//                     return (
//                       <div key={file.key} className="relative">
//                         <p className="font-semibold mb-1">{file.label}</p>
//                         {isImage(fileUrl) ? (
//                           <div className="relative inline-block">
//                             <img
//                               src={normalizeUrl(fileUrl)}
//                               alt={file.label}
//                               className="max-w-xs border rounded"
//                             />
//                             <button
//                               onClick={() => handleDownload(fileUrl, file.label)}
//                               className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded hover:bg-black/70 transition"
//                               title="Download"
//                             >
//                               ⬇
//                             </button>
//                           </div>
//                         ) : (
//                           <button
//                             onClick={() => handleDownload(fileUrl, file.label)}
//                             className="inline-block bg-gray-100 border px-3 py-2 rounded hover:bg-gray-200"
//                           >
//                             ⬇ Download File
//                           </button>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }















import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DigitalOrdersAdmin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedOrders, setExpandedOrders] = useState({});

  const normalizeUrl = (url) =>
    typeof url === "string" ? url.replace("127.0.0.1", "localhost") : "";

  const isImage = (url) =>
    typeof url === "string" && /\.(jpg|jpeg|png|gif|webp)$/i.test(url);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          https://recabitesnetwork.com/store/admin/digital-orders/"
        );
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch digital orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const toggleOrder = (id) => {
    setExpandedOrders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDownload = async (url, filename) => {
    const normalizedUrl = normalizeUrl(url);
    if (!normalizedUrl) return alert("Invalid file URL");

    try {
      const res = await fetch(normalizedUrl);
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename || "file";
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error(err);
      alert("Download failed");
    }
  };

  if (loading) return <p>Loading digital orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Digital Orders</h2>
      {orders.length === 0 && <p>No digital orders yet.</p>}

      {orders.map((order) => {
        const schema = order.schema || {};
        const data = order.data || {};

        return (
          <div
            key={order.id}
            className="border p-4 rounded shadow bg-white space-y-4"
          >
            {/* Header */}
            <div
              className="cursor-pointer bg-gray-100 p-2 rounded flex justify-between items-center"
              onClick={() => toggleOrder(order.id)}
            >
              <p className="font-semibold">
                {order.full_name || "-"} – {order.product_title} ({order.status})
              </p>
              <span>{expandedOrders[order.id] ? "▲" : "▼"}</span>
            </div>

            {expandedOrders[order.id] && (
              <div className="space-y-6 mt-2">
                {/* Basic Info */}
                <div className="space-y-1">
                  <p><strong>Email:</strong> {order.email || "-"}</p>
                  <p><strong>Phone:</strong> {order.phone || "-"}</p>
                  <p><strong>Username:</strong> {order.username || "-"}</p>
                </div>

                {/* TEXT FIELDS */}
                {schema.text_fields?.length > 0 && (
                  <div className="bg-gray-50 p-3 rounded space-y-1">
                    <h4 className="font-semibold mb-2">Submitted Information</h4>
                    {schema.text_fields.map((field) => (
                      <p key={field}>
                        <strong>{field.replace(/_/g, " ").toUpperCase()}:</strong>{" "}
                        {data[field] || "-"}
                      </p>
                    ))}
                  </div>
                )}

                {/* FILE FIELDS */}
                {schema.file_fields?.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {schema.file_fields.map((field) => {
                      const fileValue = data[field];
                      if (!fileValue) return null;

                      const files = Array.isArray(fileValue) ? fileValue : [fileValue];

                      return (
                        <div key={field}>
                          <p className="font-semibold mb-1">
                            {field.replace(/_/g, " ").toUpperCase()}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {files.map((fileUrl, idx) =>
                              isImage(fileUrl) ? (
                                <div key={idx} className="relative inline-block">
                                  <img
                                    src={normalizeUrl(fileUrl)}
                                    alt={`${field}-${idx}`}
                                    className="max-w-xs border rounded"
                                  />
                                  <button
                                    onClick={() => handleDownload(fileUrl, `${field}-${idx}`)}
                                    className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded"
                                  >
                                    ⬇
                                  </button>
                                </div>
                              ) : (
                                <button
                                  key={idx}
                                  onClick={() => handleDownload(fileUrl, `${field}-${idx}`)}
                                  className="bg-gray-100 border px-3 py-2 rounded"
                                >
                                  ⬇ Download File
                                </button>
                              )
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
