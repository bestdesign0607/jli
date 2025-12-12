// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   FaFileInvoice,
//   FaStar,
//   FaUser,
//   FaWallet,
//   FaStore,
//   FaHistory,
//   FaMapMarkerAlt,
//   FaGlobe,
//   FaCreditCard,
//   FaShieldAlt,
//   FaKey,
//   FaBell,
// } from "react-icons/fa";

// export default function AccountPage() {
//   const [active, setActive] = useState("orders");
//   const [tab, setTab] = useState("all"); // Orders tab: all, processing, shipped, delivered
//   const [orders, setOrders] = useState([]); // Always an array
//   const [loading, setLoading] = useState(false);

//   const menuItems = [
//     { id: "orders", label: "Your orders", icon: <FaFileInvoice /> },
//     { id: "reviews", label: "Your reviews", icon: <FaStar /> },
//     { id: "profile", label: "Your profile", icon: <FaUser /> },
//     { id: "wallet", label: "Wallet", icon: <FaWallet /> },
//     { id: "notifications", label: "Notifications", icon: <FaBell /> },
//   ];

//   const token = localStorage.getItem("access_token");
//   const headers = token ? { Authorization: `Bearer ${token}` } : {};

//   // Fetch orders whenever tab changes
//   useEffect(() => {
//     if (active === "orders") {
//       fetchOrders(tab);
//     }
//   }, [active, tab]);

//   const fetchOrders = async (status) => {
//     setLoading(true);
//     try {
//       let url = "http://127.0.0.1:8000/store/orders/all/";
//       if (status !== "all") {
//         url = `http://127.0.0.1:8000/store/orders/?status=${status}`;
//       }
//       const res = await axios.get(url, { headers });

//       // Normalize response to array
//       if (Array.isArray(res.data)) {
//         setOrders(res.data);
//       } else if (res.data.results) {
//         setOrders(res.data.results);
//       } else {
//         setOrders([]);
//       }
//     } catch (err) {
//       console.error(err);
//       setOrders([]);
//     }
//     setLoading(false);
//   };

//   const renderOrders = () => {
//     if (loading) return <p className="text-center mt-20">Loading orders...</p>;
//     if (!orders.length)
//       return (
//         <div className="text-center mt-20">
//           <img
//             src="/empty-box.png"
//             alt="empty"
//             className="mx-auto w-28 opacity-60"
//           />
//           <h3 className="text-lg mt-4 font-medium">
//             No {tab} orders found
//           </h3>
//         </div>
//       );

//     return (
//       <ul className="space-y-4">
//         {orders.map((order) => (
//           <li
//             key={order.id}
//             className="bg-white p-4 rounded shadow flex justify-between items-center"
//           >
//             <span>Order #{order.id}</span>
//             <span>Status: {order.status}</span>
//             <span>Total: ₦{order.total}</span>
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   return (
//     <div className="flex w-full min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-white shadow-md p-4">
//         <h2 className="text-xl font-semibold mb-4">Account</h2>

//         <ul className="space-y-2">
//           {menuItems.map((item) => (
//             <li
//               key={item.id}
//               onClick={() => setActive(item.id)}
//               className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
//                 ${active === item.id ? "bg-orange-100 text-orange-600" : "hover:bg-gray-100"}
//               `}
//             >
//               <span className="text-lg">{item.icon}</span>
//               <span className="text-sm">{item.label}</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8">
//         {active === "orders" && (
//           <div>
//             {/* Tabs */}
//             <div className="flex gap-4 border-b mb-4">
//               {["all", "processing", "shipped", "delivered"].map((t) => (
//                 <button
//                   key={t}
//                   onClick={() => setTab(t)}
//                   className={`px-4 py-2 -mb-px border-b-2 font-medium transition
//                     ${tab === t ? "border-orange-600 text-orange-600" : "border-transparent text-gray-600 hover:text-orange-500"}`}
//                 >
//                   {t.charAt(0).toUpperCase() + t.slice(1)}
//                 </button>
//               ))}
//             </div>

//             {/* Orders List */}
//             {renderOrders()}
//           </div>
//         )}

//         {active !== "orders" && (
//           <div className="text-gray-400 text-xl text-center mt-20">
//             {menuItems.find((m) => m.id === active)?.label}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }









// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   FaFileInvoice,
//   FaStar,
//   FaUser,
//   FaWallet,
//   FaBell,
// } from "react-icons/fa";

// export default function AccountPage() {
//   const [active, setActive] = useState("orders");
//   const [tab, setTab] = useState("all");
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Profile state
//   const [profile, setProfile] = useState({
//     full_name: "",
//     username: "",
//     phone: "",
//     street: "",
//     city: "",
//     state: "",
//     country: "",
//   });
//   const [savingProfile, setSavingProfile] = useState(false);
//   const [profileMessage, setProfileMessage] = useState("");

//   const menuItems = [
//     { id: "orders", label: "Your orders", icon: <FaFileInvoice /> },
//     { id: "reviews", label: "Your reviews", icon: <FaStar /> },
//     { id: "profile", label: "Your profile", icon: <FaUser /> },
//     { id: "wallet", label: "Wallet", icon: <FaWallet /> },
//     { id: "notifications", label: "Notifications", icon: <FaBell /> },
//   ];

//   const token = localStorage.getItem("access_token");
//   const headers = token ? { Authorization: `Bearer ${token}` } : {};

//   // Fetch orders whenever tab changes
//   useEffect(() => {
//     if (active === "orders") {
//       fetchOrders(tab);
//     } else if (active === "profile") {
//       fetchProfile();
//     }
//   }, [active, tab]);

//   const fetchOrders = async (status) => {
//     setLoading(true);
//     try {
//       let url = "http://127.0.0.1:8000/store/orders/all/";
//       if (status !== "all") {
//         url = `http://127.0.0.1:8000/store/orders/?status=${status}`;
//       }
//       const res = await axios.get(url, { headers });
//       if (Array.isArray(res.data)) setOrders(res.data);
//       else if (res.data.results) setOrders(res.data.results);
//       else setOrders([]);
//     } catch (err) {
//       console.error(err);
//       setOrders([]);
//     }
//     setLoading(false);
//   };

//   const fetchProfile = async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/store/auth/profile/", { headers });
//       setProfile(res.data);
//     } catch (err) {
//       console.error("Error fetching profile:", err);
//     }
//   };

//   const handleProfileChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   const saveProfile = async (e) => {
//     e.preventDefault();
//     setSavingProfile(true);
//     try {
//       const res = await axios.put(
//         "http://127.0.0.1:8000/store/auth/profile/",
//         profile,
//         { headers }
//       );
//       setProfileMessage("Profile updated successfully!");
//     } catch (err) {
//       console.error("Error saving profile:", err);
//       setProfileMessage("Failed to update profile.");
//     }
//     setSavingProfile(false);
//   };

//   const renderOrders = () => {
//     if (loading) return <p className="text-center mt-20">Loading orders...</p>;
//     if (!orders.length)
//       return (
//         <div className="text-center mt-20">
//           <img
//             src="/empty-box.png"
//             alt="empty"
//             className="mx-auto w-28 opacity-60"
//           />
//           <h3 className="text-lg mt-4 font-medium">No {tab} orders found</h3>
//         </div>
//       );

//     return (
//       <ul className="space-y-4">
//         {orders.map((order) => (
//           <li
//             key={order.id}
//             className="bg-white p-4 rounded shadow flex justify-between items-center"
//           >
//             <span>Order #{order.id}</span>
//             <span>Status: {order.status}</span>
//             <span>Total: ₦{order.total}</span>
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   const renderProfile = () => (
//     <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
//       <form onSubmit={saveProfile} className="space-y-4">
//         <input
//           type="text"
//           name="full_name"
//           placeholder="Full Name"
//           value={profile.full_name}
//           onChange={handleProfileChange}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={profile.username}
//           onChange={handleProfileChange}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone Number"
//           value={profile.phone}
//           onChange={handleProfileChange}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           name="street"
//           placeholder="Street Address"
//           value={profile.street}
//           onChange={handleProfileChange}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           name="city"
//           placeholder="City"
//           value={profile.city}
//           onChange={handleProfileChange}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           name="state"
//           placeholder="State"
//           value={profile.state}
//           onChange={handleProfileChange}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           name="country"
//           placeholder="Country"
//           value={profile.country}
//           onChange={handleProfileChange}
//           className="w-full p-2 border rounded"
//         />
//         <button
//           type="submit"
//           disabled={savingProfile}
//           className="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700 transition"
//         >
//           {savingProfile ? "Saving..." : "Save Profile"}
//         </button>
//       </form>
//       {profileMessage && <p className="mt-2 text-center">{profileMessage}</p>}
//     </div>
//   );

//   return (
//     <div className="flex w-full min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-white shadow-md p-4">
//         <h2 className="text-xl font-semibold mb-4">Account</h2>
//         <ul className="space-y-2">
//           {menuItems.map((item) => (
//             <li
//               key={item.id}
//               onClick={() => setActive(item.id)}
//               className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
//                 ${active === item.id ? "bg-orange-100 text-orange-600" : "hover:bg-gray-100"}`}
//             >
//               <span className="text-lg">{item.icon}</span>
//               <span className="text-sm">{item.label}</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8">
//         {active === "orders" && (
//           <div>
//             <div className="flex gap-4 border-b mb-4">
//               {["all", "processing", "shipped", "delivered"].map((t) => (
//                 <button
//                   key={t}
//                   onClick={() => setTab(t)}
//                   className={`px-4 py-2 -mb-px border-b-2 font-medium transition
//                     ${tab === t ? "border-orange-600 text-orange-600" : "border-transparent text-gray-600 hover:text-orange-500"}`}
//                 >
//                   {t.charAt(0).toUpperCase() + t.slice(1)}
//                 </button>
//               ))}
//             </div>
//             {renderOrders()}
//           </div>
//         )}

//         {active === "profile" && renderProfile()}

//         {active !== "orders" && active !== "profile" && (
//           <div className="text-gray-400 text-xl text-center mt-20">
//             {menuItems.find((m) => m.id === active)?.label}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }













// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   FaFileInvoice,
//   FaStar,
//   FaUser,
//   FaWallet,
//   FaBell,
// } from "react-icons/fa";

// export default function AccountPage() {
//   const [active, setActive] = useState("orders");
//   const [tab, setTab] = useState("all");
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Profile state
//   const [profile, setProfile] = useState({
//     full_name: "",
//     username: "",
//     phone: "",
//     street: "",
//     city: "",
//     state: "",
//     country: "",
//   });
//   const [savingProfile, setSavingProfile] = useState(false);
//   const [profileMessage, setProfileMessage] = useState("");
//   const [isProfileIncomplete, setIsProfileIncomplete] = useState(false);

//   const menuItems = [
//     { id: "orders", label: "Your orders", icon: <FaFileInvoice /> },
//     { id: "reviews", label: "Your reviews", icon: <FaStar /> },
//     { id: "profile", label: "Your profile", icon: <FaUser /> },
//     { id: "wallet", label: "Wallet", icon: <FaWallet /> },
//     { id: "notifications", label: "Notifications", icon: <FaBell /> },
//   ];

//   const token = localStorage.getItem("access_token");
//   const headers = token ? { Authorization: `Bearer ${token}` } : {};

//   useEffect(() => {
//     if (active === "orders") fetchOrders(tab);
//     else if (active === "profile") fetchProfile();
//   }, [active, tab]);

//   const fetchOrders = async (status) => {
//     setLoading(true);
//     try {
//       let url = "http://127.0.0.1:8000/store/orders/all/";
//       if (status !== "all") url = `http://127.0.0.1:8000/store/orders/?status=${status}`;
//       const res = await axios.get(url, { headers });
//       if (Array.isArray(res.data)) setOrders(res.data);
//       else if (res.data.results) setOrders(res.data.results);
//       else setOrders([]);
//     } catch (err) {
//       console.error(err);
//       setOrders([]);
//     }
//     setLoading(false);
//   };

//   const fetchProfile = async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/store/auth/profile/", { headers });
//       setProfile(res.data);

//       // Check if profile is incomplete (for Google-auth users)
//       const incomplete =
//         !res.data.full_name ||
//         !res.data.phone ||
//         !res.data.street ||
//         !res.data.city ||
//         !res.data.state ||
//         !res.data.country;
//       setIsProfileIncomplete(incomplete);
//     } catch (err) {
//       console.error("Error fetching profile:", err);
//     }
//   };

//   const handleProfileChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   const saveProfile = async (e) => {
//     e.preventDefault();
//     setSavingProfile(true);
//     try {
//       await axios.put(
//         "http://127.0.0.1:8000/store/auth/profile/",
//         profile,
//         { headers }
//       );
//       setProfileMessage("Profile updated successfully!");

//       // Re-check if profile is still incomplete
//       const incomplete =
//         !profile.full_name ||
//         !profile.phone ||
//         !profile.street ||
//         !profile.city ||
//         !profile.state ||
//         !profile.country;
//       setIsProfileIncomplete(incomplete);
//     } catch (err) {
//       console.error("Error saving profile:", err);
//       setProfileMessage("Failed to update profile.");
//     }
//     setSavingProfile(false);
//   };

//   const renderOrders = () => {
//     if (loading) return <p className="text-center mt-20">Loading orders...</p>;
//     if (!orders.length)
//       return (
//         <div className="text-center mt-20">
//           <img src="/empty-box.png" alt="empty" className="mx-auto w-28 opacity-60" />
//           <h3 className="text-lg mt-4 font-medium">No {tab} orders found</h3>
//         </div>
//       );
//     return (
//       <ul className="space-y-4">
//         {orders.map((order) => (
//           <li key={order.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
//             <span>Order #{order.id}</span>
//             <span>Status: {order.status}</span>
//             <span>Total: ₦{order.total}</span>
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   const renderProfile = () => (
//     <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
//       <form onSubmit={saveProfile} className="space-y-4">
//         {[
//           { name: "full_name", placeholder: "Full Name" },
//           { name: "username", placeholder: "Username" },
//           { name: "phone", placeholder: "Phone Number" },
//           { name: "street", placeholder: "Street Address" },
//           { name: "city", placeholder: "City" },
//           { name: "state", placeholder: "State" },
//           { name: "country", placeholder: "Country" },
//         ].map((field) => (
//           <input
//             key={field.name}
//             type="text"
//             name={field.name}
//             placeholder={field.placeholder}
//             value={profile[field.name]}
//             onChange={handleProfileChange}
//             className={`w-full p-2 border rounded ${
//               isProfileIncomplete && !profile[field.name] ? "border-red-500" : ""
//             }`}
//           />
//         ))}
//         <button
//           type="submit"
//           disabled={savingProfile}
//           className="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700 transition"
//         >
//           {savingProfile ? "Saving..." : "Save Profile"}
//         </button>
//       </form>
//       {profileMessage && <p className="mt-2 text-center">{profileMessage}</p>}
//       {isProfileIncomplete && <p className="mt-2 text-red-500 text-center">Please complete all required fields before proceeding.</p>}
//     </div>
//   );

//   return (
//     <div className="flex w-full min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-white shadow-md p-4">
//         <h2 className="text-xl font-semibold mb-4">Account</h2>
//         <ul className="space-y-2">
//           {menuItems.map((item) => (
//             <li
//               key={item.id}
//               onClick={() => {
//                 // Prevent switching tabs if profile incomplete
//                 if (isProfileIncomplete && item.id !== "profile") {
//                   alert("Please complete your profile first!");
//                   return;
//                 }
//                 setActive(item.id);
//               }}
//               className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
//                 ${active === item.id ? "bg-orange-100 text-orange-600" : "hover:bg-gray-100"}`}
//             >
//               <span className="text-lg">{item.icon}</span>
//               <span className="text-sm">{item.label}</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8">
//         {active === "orders" && <div>
//           <div className="flex gap-4 border-b mb-4">
//             {["all", "processing", "shipped", "delivered"].map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`px-4 py-2 -mb-px border-b-2 font-medium transition
//                     ${tab === t ? "border-orange-600 text-orange-600" : "border-transparent text-gray-600 hover:text-orange-500"}`}
//               >
//                 {t.charAt(0).toUpperCase() + t.slice(1)}
//               </button>
//             ))}
//           </div>
//           {renderOrders()}
//         </div>}

//         {active === "profile" && renderProfile()}

//         {active !== "orders" && active !== "profile" && (
//           <div className="text-gray-400 text-xl text-center mt-20">
//             {menuItems.find((m) => m.id === active)?.label}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }










// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   FaFileInvoice,
//   FaStar,
//   FaUser,
//   FaWallet,
//   FaBell,
// } from "react-icons/fa";
// import { StoreHeader } from "../components/StoreHeader";

// export default function AccountPage() {
//   const [active, setActive] = useState("orders");
//   const [tab, setTab] = useState("all");
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Profile state
//   const [profile, setProfile] = useState({
//     full_name: "",
//     username: "",
//     phone: "",
//     street: "",
//     city: "",
//     state: "",
//     country: "",
//   });
//   const [savingProfile, setSavingProfile] = useState(false);
//   const [profileMessage, setProfileMessage] = useState("");
//   const [isProfileIncomplete, setIsProfileIncomplete] = useState(false);

//   // Categories & search state for header
//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");

//   const menuItems = [
//     { id: "orders", label: "Your orders", icon: <FaFileInvoice /> },
//     { id: "reviews", label: "Your reviews", icon: <FaStar /> },
//     { id: "profile", label: "Your profile", icon: <FaUser /> },
//     { id: "wallet", label: "Wallet", icon: <FaWallet /> },
//     { id: "notifications", label: "Notifications", icon: <FaBell /> },
//   ];

//   const token = localStorage.getItem("access_token");
//   const headers = token ? { Authorization: `Bearer ${token}` } : {};

//   // Fetch categories for header
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get("http://127.0.0.1:8000/store/categories/");
//         setCategories(res.data || []);
//       } catch (err) {
//         console.error("Failed to fetch categories", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     if (active === "orders") fetchOrders(tab);
//     else if (active === "profile") fetchProfile();
//   }, [active, tab]);

//   const fetchOrders = async (status) => {
//     setLoading(true);
//     try {
//       let url = "http://127.0.0.1:8000/store/orders/all/";
//       if (status !== "all") url = `http://127.0.0.1:8000/store/orders/?status=${status}`;
//       const res = await axios.get(url, { headers });
//       if (Array.isArray(res.data)) setOrders(res.data);
//       else if (res.data.results) setOrders(res.data.results);
//       else setOrders([]);
//     } catch (err) {
//       console.error(err);
//       setOrders([]);
//     }
//     setLoading(false);
//   };

//   const fetchProfile = async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/store/auth/profile/", { headers });
//       setProfile(res.data);

//       const incomplete =
//         !res.data.full_name ||
//         !res.data.phone ||
//         !res.data.street ||
//         !res.data.city ||
//         !res.data.state ||
//         !res.data.country;
//       setIsProfileIncomplete(incomplete);
//     } catch (err) {
//       console.error("Error fetching profile:", err);
//     }
//   };

//   const handleProfileChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   const saveProfile = async (e) => {
//     e.preventDefault();
//     setSavingProfile(true);
//     try {
//       await axios.put(
//         "http://127.0.0.1:8000/store/auth/profile/",
//         profile,
//         { headers }
//       );
//       setProfileMessage("Profile updated successfully!");

//       const incomplete =
//         !profile.full_name ||
//         !profile.phone ||
//         !profile.street ||
//         !profile.city ||
//         !profile.state ||
//         !profile.country;
//       setIsProfileIncomplete(incomplete);
//     } catch (err) {
//       console.error("Error saving profile:", err);
//       setProfileMessage("Failed to update profile.");
//     }
//     setSavingProfile(false);
//   };

//   const renderOrders = () => {
//     if (loading) return <p className="text-center mt-20">Loading orders...</p>;
//     if (!orders.length)
//       return (
//         <div className="text-center mt-20">
//           <img src="/empty-box.png" alt="empty" className="mx-auto w-28 opacity-60" />
//           <h3 className="text-lg mt-4 font-medium">No {tab} orders found</h3>
//         </div>
//       );
//     return (
//       <ul className="space-y-4">
//         {orders.map((order) => (
//           <li key={order.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
//             <span>Order #{order.id}</span>
//             <span>Status: {order.status}</span>
//             <span>Total: ₦{order.total}</span>
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   const renderProfile = () => (
//     <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
//       <form onSubmit={saveProfile} className="space-y-4">
//         {[
//           { name: "full_name", placeholder: "Full Name" },
//           { name: "username", placeholder: "Username" },
//           { name: "phone", placeholder: "Phone Number" },
//           { name: "street", placeholder: "Street Address" },
//           { name: "city", placeholder: "City" },
//           { name: "state", placeholder: "State" },
//           { name: "country", placeholder: "Country" },
//         ].map((field) => (
//           <input
//             key={field.name}
//             type="text"
//             name={field.name}
//             placeholder={field.placeholder}
//             value={profile[field.name]}
//             onChange={handleProfileChange}
//             className={`w-full p-2 border rounded ${
//               isProfileIncomplete && !profile[field.name] ? "border-red-500" : ""
//             }`}
//           />
//         ))}
//         <button
//           type="submit"
//           disabled={savingProfile}
//           className="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700 transition"
//         >
//           {savingProfile ? "Saving..." : "Save Profile"}
//         </button>
//       </form>
//       {profileMessage && <p className="mt-2 text-center">{profileMessage}</p>}
//       {isProfileIncomplete && <p className="mt-2 text-red-500 text-center">Please complete all required fields before proceeding.</p>}
//     </div>
//   );

//   const searchProducts = () => console.log("Search:", searchValue);
//   const loadCategory = (id) => console.log("Load category:", id);
//   const goHome = () => (window.location.href = "/");
//   const goToAccount = () => (window.location.href = "/signup");

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* STORE HEADER */}
//       <StoreHeader
//         searchValue={searchValue}
//         setSearchValue={setSearchValue}
//         searchProducts={searchProducts}
//         categories={categories}
//         loadCategory={loadCategory}
//         cartCount={0}
//         goHome={goHome}
//         goToAccount={goToAccount}
//         logo="/logo.png"
//       />

//       {/* MAIN LAYOUT */}
//       <div className="flex w-full">
//         {/* Sidebar */}
//         <div className="w-64 p-4">
//           <h2 className="text-xl font-semibold mb-4">Account</h2>
//           <ul className="space-y-2">
//             {menuItems.map((item) => (
//               <li
//                 key={item.id}
//                 onClick={() => {
//                   if (isProfileIncomplete && item.id !== "profile") {
//                     alert("Please complete your profile first!");
//                     return;
//                   }
//                   setActive(item.id);
//                 }}
//                 className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
//                   ${active === item.id ? "bg-orange-100 text-orange-600" : "hover:bg-gray-100"}`}
//               >
//                 <span className="text-lg">{item.icon}</span>
//                 <span className="text-sm">{item.label}</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 p-8">
//           {active === "orders" && (
//             <div>
//               <div className="flex gap-4 border-b mb-4">
//                 {["all", "processing", "shipped", "delivered"].map((t) => (
//                   <button
//                     key={t}
//                     onClick={() => setTab(t)}
//                     className={`px-4 py-2 -mb-px border-b-2 font-medium transition
//                       ${tab === t ? "border-orange-600 text-orange-600" : "border-transparent text-gray-600 hover:text-orange-500"}`}
//                   >
//                     {t.charAt(0).toUpperCase() + t.slice(1)}
//                   </button>
//                 ))}
//               </div>
//               {renderOrders()}
//             </div>
//           )}

//           {active === "profile" && renderProfile()}

//           {active !== "orders" && active !== "profile" && (
//             <div className="text-gray-400 text-xl text-center mt-20">
//               {menuItems.find((m) => m.id === active)?.label}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }











// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   FaFileInvoice,
//   FaStar,
//   FaUser,
//   FaWallet,
//   FaBell,
// } from "react-icons/fa";
// import { StoreHeader } from "../components/StoreHeader";
// import { useNavigate } from "react-router-dom";

// export default function AccountPage() {
//   const [active, setActive] = useState("orders");
//   const [tab, setTab] = useState("all");
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Profile state
//   const [profile, setProfile] = useState({
//     full_name: "",
//     username: "",
//     phone: "",
//     street: "",
//     city: "",
//     state: "",
//     country: "",
//   });
//   const [savingProfile, setSavingProfile] = useState(false);
//   const [profileMessage, setProfileMessage] = useState("");
//   const [isProfileIncomplete, setIsProfileIncomplete] = useState(false);

//   // Categories & search state for header
//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [allProducts, setAllProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const menuItems = [
//   { id: "orders", label: "Your orders", icon: <FaFileInvoice /> },
//   { id: "reviews", label: "Your reviews", icon: <FaStar /> },
//   { id: "profile", label: "Your profile", icon: <FaUser /> },
//   { id: "wallet", label: "Wallet", icon: <FaWallet /> },
//   { id: "downline", label: "Downline", icon: <FaUser /> }, // new
//   { id: "withdrawals", label: "Withdrawals", icon: <FaWallet /> }, // new
//   { id: "notifications", label: "Notifications", icon: <FaBell /> },
// ];

//   const token = localStorage.getItem("access_token");
//   const headers = token ? { Authorization: `Bearer ${token}` } : {};
//   const BASE_URL = "http://127.0.0.1:8000/store";

//   // Fetch categories and products
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get(`${BASE_URL}/categories/`);
//         setCategories(res.data || []);
//       } catch (err) {
//         console.error("Failed to fetch categories", err);
//       }
//     };

//     const fetchAllProducts = async () => {
//       try {
//         const res = await axios.get(`${BASE_URL}/products/`);
//         setAllProducts(res.data || []);
//       } catch (err) {
//         console.error("Failed to fetch products", err);
//       }
//     };

//     fetchCategories();
//     fetchAllProducts();
//   }, []);

//   // Load products by category
//   const loadCategory = (id) => {
//     setSelectedCategory(id);
//     const url = id ? `${BASE_URL}/products/?category=${id}` : `${BASE_URL}/products/`;
//     axios.get(url).then((res) => setAllProducts(res.data || []));
//   };

//   // Search products
//   const searchProducts = () => {
//     const url = searchValue
//       ? `${BASE_URL}/products/?search=${encodeURIComponent(searchValue)}`
//       : `${BASE_URL}/products/`;
//     axios.get(url).then((res) => setAllProducts(res.data || []));
//   };

//   const goHome = () => (window.location.href = "/");
//   const goToAccount = () => (window.location.href = "/signup");

//   useEffect(() => {
//     if (active === "orders") fetchOrders(tab);
//     else if (active === "profile") fetchProfile();
//   }, [active, tab]);

//   const fetchOrders = async (status) => {
//     setLoading(true);
//     try {
//       let url = `${BASE_URL}/orders/all/`;
//       if (status !== "all") url = `${BASE_URL}/orders/?status=${status}`;
//       const res = await axios.get(url, { headers });
//       if (Array.isArray(res.data)) setOrders(res.data);
//       else if (res.data.results) setOrders(res.data.results);
//       else setOrders([]);
//     } catch (err) {
//       console.error(err);
//       setOrders([]);
//     }
//     setLoading(false);
//   };

//   const fetchProfile = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/auth/profile/`, { headers });
//       setProfile(res.data);

//       const incomplete =
//         !res.data.full_name ||
//         !res.data.phone ||
//         !res.data.street ||
//         !res.data.city ||
//         !res.data.state ||
//         !res.data.country;
//       setIsProfileIncomplete(incomplete);
//     } catch (err) {
//       console.error("Error fetching profile:", err);
//     }
//   };

//   const handleProfileChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   const saveProfile = async (e) => {
//     e.preventDefault();
//     setSavingProfile(true);
//     try {
//       await axios.put(`${BASE_URL}/auth/profile/`, profile, { headers });
//       setProfileMessage("Profile updated successfully!");

//       const incomplete =
//         !profile.full_name ||
//         !profile.phone ||
//         !profile.street ||
//         !profile.city ||
//         !profile.state ||
//         !profile.country;
//       setIsProfileIncomplete(incomplete);
//     } catch (err) {
//       console.error("Error saving profile:", err);
//       setProfileMessage("Failed to update profile.");
//     }
//     setSavingProfile(false);
//   };

//   const renderOrders = () => {
//     if (loading) return <p className="text-center mt-20">Loading orders...</p>;
//     if (!orders.length)
//       return (
//         <div className="text-center mt-20">
//           <img src="/empty-box.png" alt="empty" className="mx-auto w-28 opacity-60" />
//           <h3 className="text-lg mt-4 font-medium">No {tab} orders found</h3>
//         </div>
//       );
//     return (
//       <ul className="space-y-4">
//         {orders.map((order) => (
//           <li key={order.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
//             <span>Order #{order.id}</span>
//             <span>Status: {order.status}</span>
//             <span>Total: ₦{order.total}</span>
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   const renderProfile = () => (
//     <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
//       <form onSubmit={saveProfile} className="space-y-4">
//         {[
//           { name: "full_name", placeholder: "Full Name" },
//           { name: "username", placeholder: "Username" },
//           { name: "phone", placeholder: "Phone Number" },
//           { name: "street", placeholder: "Street Address" },
//           { name: "city", placeholder: "City" },
//           { name: "state", placeholder: "State" },
//           { name: "country", placeholder: "Country" },
//         ].map((field) => (
//           <input
//             key={field.name}
//             type="text"
//             name={field.name}
//             placeholder={field.placeholder}
//             value={profile[field.name]}
//             onChange={handleProfileChange}
//             className={`w-full p-2 border rounded ${
//               isProfileIncomplete && !profile[field.name] ? "border-red-500" : ""
//             }`}
//           />
//         ))}
//         <button
//           type="submit"
//           disabled={savingProfile}
//           className="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700 transition"
//         >
//           {savingProfile ? "Saving..." : "Save Profile"}
//         </button>
//       </form>
//       {profileMessage && <p className="mt-2 text-center">{profileMessage}</p>}
//       {isProfileIncomplete && <p className="mt-2 text-red-500 text-center">Please complete all required fields before proceeding.</p>}
//     </div>
//   );

//   const handleViewProduct = (productId) => {
//     window.location.href = `/product/${productId}`;
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* STORE HEADER */}
//       <StoreHeader
//         searchValue={searchValue}
//         setSearchValue={setSearchValue}
//         searchProducts={searchProducts}
//         categories={categories}
//         loadCategory={loadCategory}
//         cartCount={0}
//         goHome={goHome}
//         goToAccount={goToAccount}
//         logo="/logo.png"
//         selectedCategory={selectedCategory}
//       />

//       {/* MAIN LAYOUT */}
//       <div className="flex w-full">
//         {/* Sidebar */}
//         <div className="w-64 p-4">
//           <h2 className="text-xl font-semibold mb-4">Account</h2>
//           <ul className="space-y-2">
//             {menuItems.map((item) => (
//               <li
//                 key={item.id}
//                 onClick={() => {
//                   if (isProfileIncomplete && item.id !== "profile") {
//                     alert("Please complete your profile first!");
//                     return;
//                   }
//                   setActive(item.id);
//                 }}
//                 className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
//                   ${active === item.id ? "bg-orange-100 text-orange-600" : "hover:bg-gray-100"}`}
//               >
//                 <span className="text-lg">{item.icon}</span>
//                 <span className="text-sm">{item.label}</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 p-8">
//           {active === "orders" && (
//             <div>
//               <div className="flex gap-4 border-b mb-4">
//                 {["all", "processing", "shipped", "delivered"].map((t) => (
//                   <button
//                     key={t}
//                     onClick={() => setTab(t)}
//                     className={`px-4 py-2 -mb-px border-b-2 font-medium transition
//                       ${tab === t ? "border-orange-600 text-orange-600" : "border-transparent text-gray-600 hover:text-orange-500"}`}
//                   >
//                     {t.charAt(0).toUpperCase() + t.slice(1)}
//                   </button>
//                 ))}
//               </div>
//               {renderOrders()}
//             </div>
//           )}

//           {active === "profile" && renderProfile()}

//           {active !== "orders" && active !== "profile" && (
//             <div className="text-gray-400 text-xl text-center mt-20">
//               {menuItems.find((m) => m.id === active)?.label}
//             </div>
//           )}

//           {/* -------------------- ALL PRODUCTS BELOW -------------------- */}
//           <div className="max-w-6xl mx-auto mt-10 px-4">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">All Products</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {allProducts.map((product) => {
//                 const price =
//                   typeof product.price === "string"
//                     ? Number(product.price.replace(/[^\d.]/g, ""))
//                     : product.price;

//                 const oldPrice =
//                   typeof product.old_price === "string"
//                     ? Number(product.old_price.replace(/[^\d.]/g, ""))
//                     : product.old_price;

//                 return (
//                   <div
//                     key={product.id}
//                     className="bg-white rounded-lg shadow-sm border p-3 hover:shadow-md transition cursor-pointer"
//                     onClick={() => handleViewProduct(product.id)}
//                   >
//                     <div className="w-full h-40 bg-gray-100 rounded overflow-hidden">
//                       <img
//                         src={product.images?.[0]?.image}
//                         className="w-full h-full object-cover"
//                         alt={product.title}
//                       />
//                     </div>

//                     <h3 className="mt-2 text-sm font-semibold text-gray-800 line-clamp-2">
//                       {product.title}
//                     </h3>

//                     <div className="mt-1">
//                       <p className="text-red-600 font-bold">₦{price?.toLocaleString()}</p>
//                       {oldPrice && (
//                         <p className="text-gray-400 line-through text-xs">
//                           ₦{oldPrice?.toLocaleString()}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   FaFileInvoice,
//   FaStar,
//   FaUser,
//   FaWallet,
//   FaBell,
// } from "react-icons/fa";
// import { StoreHeader } from "../components/StoreHeader";

// export default function AccountPage() {
//   const [active, setActive] = useState("orders");
//   const [tab, setTab] = useState("all");
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Profile state
//   const [profile, setProfile] = useState({
//     full_name: "",
//     username: "",
//     phone: "",
//     street: "",
//     city: "",
//     state: "",
//     country: "",
//   });
//   const [savingProfile, setSavingProfile] = useState(false);
//   const [profileMessage, setProfileMessage] = useState("");
//   const [isProfileIncomplete, setIsProfileIncomplete] = useState(false);

//   // Categories & search state for header
//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [allProducts, setAllProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   // Network state
//   const [wallet, setWallet] = useState(null);
//   const [withdrawals, setWithdrawals] = useState([]);
//   const [withdrawalAmount, setWithdrawalAmount] = useState("");
//   const [bankName, setBankName] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [withdrawMessage, setWithdrawMessage] = useState("");
//   const [downlineTree, setDownlineTree] = useState(null);

//   const menuItems = [
//     { id: "orders", label: "Your orders", icon: <FaFileInvoice /> },
//     { id: "reviews", label: "Your reviews", icon: <FaStar /> },
//     { id: "profile", label: "Your profile", icon: <FaUser /> },
//     { id: "wallet", label: "Wallet", icon: <FaWallet /> },
//     { id: "downline", label: "Downline", icon: <FaUser /> }, // new
//     { id: "withdrawals", label: "Withdrawals", icon: <FaWallet /> }, // new
//     { id: "notifications", label: "Notifications", icon: <FaBell /> },
//   ];

//   const token = localStorage.getItem("access_token");
//   const headers = token ? { Authorization: `Bearer ${token}` } : {};
//   const BASE_URL = "http://127.0.0.1:8000/network"; // point to network API

//   // Fetch categories and products
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get(`http://127.0.0.1:8000/store/categories/`);
//         setCategories(res.data || []);
//       } catch (err) {
//         console.error("Failed to fetch categories", err);
//       }
//     };

//     const fetchAllProducts = async () => {
//       try {
//         const res = await axios.get(`http://127.0.0.1:8000/store/products/`);
//         setAllProducts(res.data || []);
//       } catch (err) {
//         console.error("Failed to fetch products", err);
//       }
//     };

//     fetchCategories();
//     fetchAllProducts();
//   }, []);

//   const loadCategory = (id) => {
//     setSelectedCategory(id);
//     const url = id
//       ? `http://127.0.0.1:8000/store/products/?category=${id}`
//       : `http://127.0.0.1:8000/store/products/`;
//     axios.get(url).then((res) => setAllProducts(res.data || []));
//   };

//   const searchProducts = () => {
//     const url = searchValue
//       ? `http://127.0.0.1:8000/store/products/?search=${encodeURIComponent(
//           searchValue
//         )}`
//       : `http://127.0.0.1:8000/store/products/`;
//     axios.get(url).then((res) => setAllProducts(res.data || []));
//   };

//   const goHome = () => (window.location.href = "/");
//   const goToAccount = () => (window.location.href = "/signup");
//   const goToAmbassadorDashboard = () => {
//   window.location.href = "/ambassador/dashboard";
// };

//   // Fetch orders, profile, network
//   useEffect(() => {
//     if (active === "orders") fetchOrders(tab);
//     else if (active === "profile") fetchProfile();
//     else if (active === "wallet") fetchWallet();
//     else if (active === "withdrawals") fetchWithdrawals();
//     else if (active === "downline") fetchDownline();
//   }, [active, tab]);

//   // Orders
//   const fetchOrders = async (status) => {
//     setLoading(true);
//     try {
//       let url = `http://127.0.0.1:8000/store/orders/all/`;
//       if (status !== "all") url = `http://127.0.0.1:8000/store/orders/?status=${status}`;
//       const res = await axios.get(url, { headers });
//       if (Array.isArray(res.data)) setOrders(res.data);
//       else if (res.data.results) setOrders(res.data.results);
//       else setOrders([]);
//     } catch (err) {
//       console.error(err);
//       setOrders([]);
//     }
//     setLoading(false);
//   };

//   // Profile
//   const fetchProfile = async () => {
//     try {
//       const res = await axios.get(`http://127.0.0.1:8000/store/auth/profile/`, { headers });
//       setProfile(res.data);
//       const incomplete =
//         !res.data.full_name ||
//         !res.data.phone ||
//         !res.data.street ||
//         !res.data.city ||
//         !res.data.state ||
//         !res.data.country;
//       setIsProfileIncomplete(incomplete);
//     } catch (err) {
//       console.error("Error fetching profile:", err);
//     }
//   };

//   const handleProfileChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   const saveProfile = async (e) => {
//     e.preventDefault();
//     setSavingProfile(true);
//     try {
//       await axios.put(`${BASE_URL}/auth/profile/`, profile, { headers });
//       setProfileMessage("Profile updated successfully!");
//       const incomplete =
//         !profile.full_name ||
//         !profile.phone ||
//         !profile.street ||
//         !profile.city ||
//         !profile.state ||
//         !profile.country;
//       setIsProfileIncomplete(incomplete);
//     } catch (err) {
//       console.error("Error saving profile:", err);
//       setProfileMessage("Failed to update profile.");
//     }
//     setSavingProfile(false);
//   };

//   const renderOrders = () => {
//     if (loading) return <p className="text-center mt-20">Loading orders...</p>;
//     if (!orders.length)
//       return (
//         <div className="text-center mt-20">
//           <img src="/empty-box.png" alt="empty" className="mx-auto w-28 opacity-60" />
//           <h3 className="text-lg mt-4 font-medium">No {tab} orders found</h3>
//         </div>
//       );
//     return (
//       <ul className="space-y-4">
//         {orders.map((order) => (
//           <li key={order.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
//             <span>Order #{order.id}</span>
//             <span>Status: {order.status}</span>
//             <span>Total: ₦{order.total}</span>
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   const renderProfile = () => (
//     <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
//       <form onSubmit={saveProfile} className="space-y-4">
//         {[
//           { name: "full_name", placeholder: "Full Name" },
//           { name: "username", placeholder: "Username" },
//           { name: "phone", placeholder: "Phone Number" },
//           { name: "street", placeholder: "Street Address" },
//           { name: "city", placeholder: "City" },
//           { name: "state", placeholder: "State" },
//           { name: "country", placeholder: "Country" },
//         ].map((field) => (
//           <input
//             key={field.name}
//             type="text"
//             name={field.name}
//             placeholder={field.placeholder}
//             value={profile[field.name]}
//             onChange={handleProfileChange}
//             className={`w-full p-2 border rounded ${
//               isProfileIncomplete && !profile[field.name] ? "border-red-500" : ""
//             }`}
//           />
//         ))}
//         <button
//           type="submit"
//           disabled={savingProfile}
//           className="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700 transition"
//         >
//           {savingProfile ? "Saving..." : "Save Profile"}
//         </button>
//       </form>
//       {profileMessage && <p className="mt-2 text-center">{profileMessage}</p>}
//       {isProfileIncomplete && <p className="mt-2 text-red-500 text-center">Please complete all required fields before proceeding.</p>}
//     </div>
//   );

//   // -------------------- NETWORK FUNCTIONS --------------------
//   const fetchWallet = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/wallet/`, { headers });
//       setWallet(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchWithdrawals = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/wallet/ledger/`, { headers });
//       setWithdrawals(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const requestWithdrawal = async () => {
//     try {
//       await axios.post(
//         `${BASE_URL}/withdraw/`,
//         {
//           amount: withdrawalAmount,
//           bank_name: bankName,
//           account_number: accountNumber,
//         },
//         { headers }
//       );
//       setWithdrawMessage("Withdrawal requested successfully!");
//       setWithdrawalAmount("");
//       setBankName("");
//       setAccountNumber("");
//       fetchWithdrawals();
//     } catch (err) {
//       setWithdrawMessage(err.response?.data?.error || "Error requesting withdrawal");
//     }
//   };

//   const fetchDownline = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/downline/`, { headers });
//       setDownlineTree(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const renderDownline = (node, nodes) => {
//     if (!node) return null;
//     return (
//       <ul className="ml-4">
//         <li>
//           {node.referral_code} (Level {node.level})
//           {node.children?.length > 0 && node.children.map((child) => renderDownline(nodes[child], nodes))}
//         </li>
//       </ul>
//     );
//   };

//   const handleViewProduct = (productId) => {
//     window.location.href = `/product/${productId}`;
//   };

//   // -------------------- RENDER --------------------
//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* STORE HEADER */}
//       <StoreHeader
//         searchValue={searchValue}
//         setSearchValue={setSearchValue}
//         searchProducts={searchProducts}
//         categories={categories}
//         loadCategory={loadCategory}
//         cartCount={0}
//         goHome={goHome}
//         goToAccount={goToAccount}
//         logo="/logo.png"
//         selectedCategory={selectedCategory}
//       />

//       {/* MAIN LAYOUT */}
//       <div className="flex w-full">
//         {/* Sidebar */}
//         {/* <div className="w-64 p-4">
//           <h2 className="text-xl font-semibold mb-4">Account</h2>
//           <ul className="space-y-2">
//             {menuItems.map((item) => (
//               <li
//                 key={item.id}
//                 onClick={() => {
//                   if (isProfileIncomplete && item.id !== "profile") {
//                     alert("Please complete your profile first!");
//                     return;
//                   }
//                   setActive(item.id);
//                 }}
//                 className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
//                   ${active === item.id ? "bg-orange-100 text-orange-600" : "hover:bg-gray-100"}`}
//               >
//                 <span className="text-lg">{item.icon}</span>
//                 <span className="text-sm">{item.label}</span>
//               </li>
//             ))}
//           </ul>
//         </div> */}
        
//         <div className="w-64 p-4">
//   {/* Account header + ambassador button */}
//   <div className="flex items-center justify-between mb-4">
//     <h2 className="text-xl font-semibold">Account</h2>

//     {profile?.is_ambassador === true && (
//       <button
//         onClick={() => (window.location.href = "/ambassador/dashboard")}
//         className="text-xs px-3 py-1 rounded bg-orange-600 text-white hover:bg-orange-700 transition"
//       >
//         Dashboard
//       </button>
//     )}
//   </div>

//   <ul className="space-y-2">
//     {menuItems.map((item) => (
//       <li
//         key={item.id}
//         onClick={() => {
//           if (isProfileIncomplete && item.id !== "profile") {
//             alert("Please complete your profile first!");
//             return;
//           }
//           setActive(item.id);
//         }}
//         className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
//           ${
//             active === item.id
//               ? "bg-orange-100 text-orange-600"
//               : "hover:bg-gray-100"
//           }`}
//       >
//         <span className="text-lg">{item.icon}</span>
//         <span className="text-sm">{item.label}</span>
//       </li>
//     ))}
//   </ul>
// </div>

//         {/* Main Content */}
//         <div className="flex-1 p-8">
//           {active === "orders" && (
//             <div>
//               <div className="flex gap-4 border-b mb-4">
//                 {["all", "processing", "shipped", "delivered"].map((t) => (
//                   <button
//                     key={t}
//                     onClick={() => setTab(t)}
//                     className={`px-4 py-2 -mb-px border-b-2 font-medium transition
//                       ${tab === t ? "border-orange-600 text-orange-600" : "border-transparent text-gray-600 hover:text-orange-500"}`}
//                   >
//                     {t.charAt(0).toUpperCase() + t.slice(1)}
//                   </button>
//                 ))}
//               </div>
//               {renderOrders()}
//             </div>
//           )}

//           {active === "profile" && renderProfile()}

//           {active === "wallet" && wallet && (
//             <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
//               <h2 className="text-xl font-semibold mb-4">Wallet Balance</h2>
//               <p className="text-green-600 font-bold text-lg">₦{wallet.balance}</p>
//             </div>
//           )}

//           {active === "withdrawals" && (
//             <div className="max-w-lg mx-auto space-y-4">
//               <h2 className="text-xl font-semibold mb-4">Request Withdrawal</h2>
//               <input
//                 type="number"
//                 placeholder="Amount"
//                 value={withdrawalAmount}
//                 onChange={(e) => setWithdrawalAmount(e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//               <input
//                 type="text"
//                 placeholder="Bank Name"
//                 value={bankName}
//                 onChange={(e) => setBankName(e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//               <input
//                 type="text"
//                 placeholder="Account Number"
//                 value={accountNumber}
//                 onChange={(e) => setAccountNumber(e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//               <button
//                 onClick={requestWithdrawal}
//                 className="w-full bg-blue-600 text-white p-2 rounded"
//               >
//                 Request Withdrawal
//               </button>
//               {withdrawMessage && <p className="mt-2 text-center">{withdrawMessage}</p>}

//               <h2 className="text-xl font-semibold mt-6">Withdrawal Ledger</h2>
//               <ul className="space-y-2">
//                 {withdrawals.map((tx) => (
//                   <li key={tx.id} className="flex justify-between p-2 border rounded">
//                     <span>{tx.tx_type}</span>
//                     <span>₦{tx.amount}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {active === "downline" && downlineTree && (
//             <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
//               <h2 className="text-xl font-semibold mb-4">Downline Tree</h2>
//               {renderDownline(
//                 { referral_code: downlineTree.root, level: 0, children: downlineTree.nodes[downlineTree.root].children },
//                 downlineTree.nodes
//               )}
//             </div>
//           )}

//           {active !== "orders" && active !== "profile" && active !== "wallet" && active !== "withdrawals" && active !== "downline" && (
//             <div className="text-gray-400 text-xl text-center mt-20">
//               {menuItems.find((m) => m.id === active)?.label}
//             </div>
//           )}

//           {/* -------------------- ALL PRODUCTS BELOW -------------------- */}
//           <div className="max-w-6xl mx-auto mt-10 px-4">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">All Products</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {allProducts.map((product) => {
//                 const price =
//                   typeof product.price === "string"
//                     ? Number(product.price.replace(/[^\d.]/g, ""))
//                     : product.price;

//                 const oldPrice =
//                   typeof product.old_price === "string"
//                     ? Number(product.old_price.replace(/[^\d.]/g, ""))
//                     : product.old_price;

//                 return (
//                   <div
//                     key={product.id}
//                     className="bg-white rounded-lg shadow-sm border p-3 hover:shadow-md transition cursor-pointer"
//                     onClick={() => handleViewProduct(product.id)}
//                   >
//                     <div className="w-full h-40 bg-gray-100 rounded overflow-hidden">
//                       <img
//                         src={product.images?.[0]?.image}
//                         className="w-full h-full object-cover"
//                         alt={product.title}
//                       />
//                     </div>

//                     <h3 className="mt-2 text-sm font-semibold text-gray-800 line-clamp-2">
//                       {product.title}
//                     </h3>

//                     <div className="mt-1">
//                       <p className="text-red-600 font-bold">₦{price?.toLocaleString()}</p>
//                       {oldPrice && (
//                         <p className="text-gray-400 line-through text-xs">
//                           ₦{oldPrice?.toLocaleString()}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   FaFileInvoice,
//   FaStar,
//   FaUser,
//   FaWallet,
//   FaBell,
// } from "react-icons/fa";
// import { StoreHeader } from "../components/StoreHeader";

// export default function AccountPage() {
//   const [active, setActive] = useState("orders");
//   const [tab, setTab] = useState("all");
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Profile state
//   const [profile, setProfile] = useState({
//     full_name: "",
//     username: "",
//     phone: "",
//     street: "",
//     city: "",
//     state: "",
//     country: "",
//     is_ambassador: false, // <-- add default
//   });
//   const [savingProfile, setSavingProfile] = useState(false);
//   const [profileMessage, setProfileMessage] = useState("");
//   const [isProfileIncomplete, setIsProfileIncomplete] = useState(false);

//   // Categories & search state for header
//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [allProducts, setAllProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   // Network state
//   const [wallet, setWallet] = useState(null);
//   const [withdrawals, setWithdrawals] = useState([]);
//   const [withdrawalAmount, setWithdrawalAmount] = useState("");
//   const [bankName, setBankName] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [withdrawMessage, setWithdrawMessage] = useState("");
//   const [downlineTree, setDownlineTree] = useState(null);

//   const menuItems = [
//     { id: "orders", label: "Your orders", icon: <FaFileInvoice /> },
//     { id: "reviews", label: "Your reviews", icon: <FaStar /> },
//     { id: "profile", label: "Your profile", icon: <FaUser /> },
//     { id: "wallet", label: "Wallet", icon: <FaWallet /> },
//     { id: "downline", label: "Downline", icon: <FaUser /> }, // new
//     { id: "withdrawals", label: "Withdrawals", icon: <FaWallet /> }, // new
//     { id: "notifications", label: "Notifications", icon: <FaBell /> },
//   ];

//   const token = localStorage.getItem("access_token");
//   const headers = token ? { Authorization: `Bearer ${token}` } : {};
//   const BASE_URL = "http://127.0.0.1:8000/network"; // point to network API

//   // Fetch categories and products
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get(`http://127.0.0.1:8000/store/categories/`);
//         setCategories(res.data || []);
//       } catch (err) {
//         console.error("Failed to fetch categories", err);
//       }
//     };

//     const fetchAllProducts = async () => {
//       try {
//         const res = await axios.get(`http://127.0.0.1:8000/store/products/`);
//         setAllProducts(res.data || []);
//       } catch (err) {
//         console.error("Failed to fetch products", err);
//       }
//     };

//     fetchCategories();
//     fetchAllProducts();
//   }, []);

//   const loadCategory = (id) => {
//     setSelectedCategory(id);
//     const url = id
//       ? `http://127.0.0.1:8000/store/products/?category=${id}`
//       : `http://127.0.0.1:8000/store/products/`;
//     axios.get(url).then((res) => setAllProducts(res.data || []));
//   };

//   const searchProducts = () => {
//     const url = searchValue
//       ? `http://127.0.0.1:8000/store/products/?search=${encodeURIComponent(
//           searchValue
//         )}`
//       : `http://127.0.0.1:8000/store/products/`;
//     axios.get(url).then((res) => setAllProducts(res.data || []));
//   };

//   const goHome = () => (window.location.href = "/");
//   const goToAccount = () => (window.location.href = "/signup");
//   const goToAmbassadorDashboard = () => {
//     window.location.href = "/ambassador/dashboard";
//   };

//   // Fetch orders, profile, network
//   useEffect(() => {
//     if (active === "orders") fetchOrders(tab);
//     else if (active === "profile") fetchProfile();
//     else if (active === "wallet") fetchWallet();
//     else if (active === "withdrawals") fetchWithdrawals();
//     else if (active === "downline") fetchDownline();
//   }, [active, tab]);

//   // Orders
//   const fetchOrders = async (status) => {
//     setLoading(true);
//     try {
//       let url = `http://127.0.0.1:8000/store/orders/all/`;
//       if (status !== "all") url = `http://127.0.0.1:8000/store/orders/?status=${status}`;
//       const res = await axios.get(url, { headers });
//       if (Array.isArray(res.data)) setOrders(res.data);
//       else if (res.data.results) setOrders(res.data.results);
//       else setOrders([]);
//     } catch (err) {
//       console.error(err);
//       setOrders([]);
//     }
//     setLoading(false);
//   };

//   // Profile
//   // Profile fetch
// const fetchProfile = async () => {
//   try {
//     const res = await axios.get(`http://127.0.0.1:8000/store/auth/profile/`, { headers });
//     const data = res.data;

//     // Normalize is_ambassador to boolean
//     const isAmbassador =
//       data.is_ambassador === true || data.is_ambassador === "true";

//     setProfile({
//       ...data,
//       is_ambassador: isAmbassador,
//     });

//     const incomplete =
//       !data.full_name ||
//       !data.phone ||
//       !data.street ||
//       !data.city ||
//       !data.state ||
//       !data.country;
//     setIsProfileIncomplete(incomplete);
//   } catch (err) {
//     console.error("Error fetching profile:", err);
//   }
// };


//   const handleProfileChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   const saveProfile = async (e) => {
//     e.preventDefault();
//     setSavingProfile(true);
//     try {
//       await axios.put(`${BASE_URL}/auth/profile/`, profile, { headers });
//       setProfileMessage("Profile updated successfully!");
//       const incomplete =
//         !profile.full_name ||
//         !profile.phone ||
//         !profile.street ||
//         !profile.city ||
//         !profile.state ||
//         !profile.country;
//       setIsProfileIncomplete(incomplete);
//     } catch (err) {
//       console.error("Error saving profile:", err);
//       setProfileMessage("Failed to update profile.");
//     }
//     setSavingProfile(false);
//   };

//   const renderOrders = () => {
//     if (loading) return <p className="text-center mt-20">Loading orders...</p>;
//     if (!orders.length)
//       return (
//         <div className="text-center mt-20">
//           <img src="/empty-box.png" alt="empty" className="mx-auto w-28 opacity-60" />
//           <h3 className="text-lg mt-4 font-medium">No {tab} orders found</h3>
//         </div>
//       );
//     return (
//       <ul className="space-y-4">
//         {orders.map((order) => (
//           <li key={order.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
//             <span>Order #{order.id}</span>
//             <span>Status: {order.status}</span>
//             <span>Total: ₦{order.total}</span>
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   const renderProfile = () => (
//     <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
//       <form onSubmit={saveProfile} className="space-y-4">
//         {[
//           { name: "full_name", placeholder: "Full Name" },
//           { name: "username", placeholder: "Username" },
//           { name: "phone", placeholder: "Phone Number" },
//           { name: "street", placeholder: "Street Address" },
//           { name: "city", placeholder: "City" },
//           { name: "state", placeholder: "State" },
//           { name: "country", placeholder: "Country" },
//         ].map((field) => (
//           <input
//             key={field.name}
//             type="text"
//             name={field.name}
//             placeholder={field.placeholder}
//             value={profile[field.name]}
//             onChange={handleProfileChange}
//             className={`w-full p-2 border rounded ${
//               isProfileIncomplete && !profile[field.name] ? "border-red-500" : ""
//             }`}
//           />
//         ))}
//         <button
//           type="submit"
//           disabled={savingProfile}
//           className="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700 transition"
//         >
//           {savingProfile ? "Saving..." : "Save Profile"}
//         </button>
//       </form>
//       {profileMessage && <p className="mt-2 text-center">{profileMessage}</p>}
//       {isProfileIncomplete && <p className="mt-2 text-red-500 text-center">Please complete all required fields before proceeding.</p>}
//     </div>
//   );

//   // -------------------- NETWORK FUNCTIONS --------------------
//   const fetchWallet = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/wallet/`, { headers });
//       setWallet(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchWithdrawals = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/wallet/ledger/`, { headers });
//       setWithdrawals(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const requestWithdrawal = async () => {
//     try {
//       await axios.post(
//         `${BASE_URL}/withdraw/`,
//         {
//           amount: withdrawalAmount,
//           bank_name: bankName,
//           account_number: accountNumber,
//         },
//         { headers }
//       );
//       setWithdrawMessage("Withdrawal requested successfully!");
//       setWithdrawalAmount("");
//       setBankName("");
//       setAccountNumber("");
//       fetchWithdrawals();
//     } catch (err) {
//       setWithdrawMessage(err.response?.data?.error || "Error requesting withdrawal");
//     }
//   };

//   const fetchDownline = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/downline/`, { headers });
//       setDownlineTree(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const renderDownline = (node, nodes) => {
//     if (!node) return null;
//     return (
//       <ul className="ml-4">
//         <li>
//           {node.referral_code} (Level {node.level})
//           {node.children?.length > 0 && node.children.map((child) => renderDownline(nodes[child], nodes))}
//         </li>
//       </ul>
//     );
//   };

//   const handleViewProduct = (productId) => {
//     window.location.href = `/product/${productId}`;
//   };

//   // -------------------- RENDER --------------------
//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* STORE HEADER */}
//       <StoreHeader
//         searchValue={searchValue}
//         setSearchValue={setSearchValue}
//         searchProducts={searchProducts}
//         categories={categories}
//         loadCategory={loadCategory}
//         cartCount={0}
//         goHome={goHome}
//         goToAccount={goToAccount}
//         logo="/logo.png"
//         selectedCategory={selectedCategory}
//       />

//       {/* MAIN LAYOUT */}
//       <div className="flex w-full">
//         {/* Sidebar */}
//         <div className="w-64 p-4">
//           {/* Account header + ambassador button */}
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-semibold">Account</h2>

//             {profile.is_ambassador && (
//               <button
//                 onClick={goToAmbassadorDashboard}
//                 className="text-xs px-3 py-1 rounded bg-orange-600 text-white hover:bg-orange-700 transition"
//               >
//                 Dashboard
//               </button>
//             )}
//           </div>

//           <ul className="space-y-2">
//             {menuItems.map((item) => (
//               <li
//                 key={item.id}
//                 onClick={() => {
//                   if (isProfileIncomplete && item.id !== "profile") {
//                     alert("Please complete your profile first!");
//                     return;
//                   }
//                   setActive(item.id);
//                 }}
//                 className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
//                   ${
//                     active === item.id
//                       ? "bg-orange-100 text-orange-600"
//                       : "hover:bg-gray-100"
//                   }`}
//               >
//                 <span className="text-lg">{item.icon}</span>
//                 <span className="text-sm">{item.label}</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 p-8">
//           {active === "orders" && (
//             <div>
//               <div className="flex gap-4 border-b mb-4">
//                 {["all", "processing", "shipped", "delivered"].map((t) => (
//                   <button
//                     key={t}
//                     onClick={() => setTab(t)}
//                     className={`px-4 py-2 -mb-px border-b-2 font-medium transition
//                       ${tab === t ? "border-orange-600 text-orange-600" : "border-transparent text-gray-600 hover:text-orange-500"}`}
//                   >
//                     {t.charAt(0).toUpperCase() + t.slice(1)}
//                   </button>
//                 ))}
//               </div>
//               {renderOrders()}
//             </div>
//           )}

//           {active === "profile" && renderProfile()}

//           {active === "wallet" && wallet && (
//             <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
//               <h2 className="text-xl font-semibold mb-4">Wallet Balance</h2>
//               <p className="text-green-600 font-bold text-lg">₦{wallet.balance}</p>
//             </div>
//           )}

//           {active === "withdrawals" && (
//             <div className="max-w-lg mx-auto space-y-4">
//               <h2 className="text-xl font-semibold mb-4">Request Withdrawal</h2>
//               <input
//                 type="number"
//                 placeholder="Amount"
//                 value={withdrawalAmount}
//                 onChange={(e) => setWithdrawalAmount(e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//               <input
//                 type="text"
//                 placeholder="Bank Name"
//                 value={bankName}
//                 onChange={(e) => setBankName(e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//               <input
//                 type="text"
//                 placeholder="Account Number"
//                 value={accountNumber}
//                 onChange={(e) => setAccountNumber(e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//               <button
//                 onClick={requestWithdrawal}
//                 className="w-full bg-blue-600 text-white p-2 rounded"
//               >
//                 Request Withdrawal
//               </button>
//               {withdrawMessage && <p className="mt-2 text-center">{withdrawMessage}</p>}

//               <h2 className="text-xl font-semibold mt-6">Withdrawal Ledger</h2>
//               <ul className="space-y-2">
//                 {withdrawals.map((tx) => (
//                   <li key={tx.id} className="flex justify-between p-2 border rounded">
//                     <span>{tx.tx_type}</span>
//                     <span>₦{tx.amount}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {active === "downline" && downlineTree && (
//             <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
//               <h2 className="text-xl font-semibold mb-4">Downline Tree</h2>
//               {renderDownline(
//                 { referral_code: downlineTree.root, level: 0, children: downlineTree.nodes[downlineTree.root].children },
//                 downlineTree.nodes
//               )}
//             </div>
//           )}

//           {active !== "orders" && active !== "profile" && active !== "wallet" && active !== "withdrawals" && active !== "downline" && (
//             <div className="text-gray-400 text-xl text-center mt-20">
//               {menuItems.find((m) => m.id === active)?.label}
//             </div>
//           )}

//           {/* -------------------- ALL PRODUCTS BELOW -------------------- */}
//           <div className="max-w-6xl mx-auto mt-10 px-4">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">All Products</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {allProducts.map((product) => {
//                 const price =
//                   typeof product.price === "string"
//                     ? Number(product.price.replace(/[^\d.]/g, ""))
//                     : product.price;

//                 const oldPrice =
//                   typeof product.old_price === "string"
//                     ? Number(product.old_price.replace(/[^\d.]/g, ""))
//                     : product.old_price;

//                 return (
//                   <div
//                     key={product.id}
//                     className="bg-white rounded-lg shadow-sm border p-3 hover:shadow-md transition cursor-pointer"
//                     onClick={() => handleViewProduct(product.id)}
//                   >
//                     <div className="w-full h-40 bg-gray-100 rounded overflow-hidden">
//                       <img
//                         src={product.images?.[0]?.image}
//                         className="w-full h-full object-cover"
//                         alt={product.title}
//                       />
//                     </div>

//                     <h3 className="mt-2 text-sm font-semibold text-gray-800 line-clamp-2">
//                       {product.title}
//                     </h3>

//                     <div className="mt-1">
//                       <p className="text-red-600 font-bold">₦{price?.toLocaleString()}</p>
//                       {oldPrice && (
//                         <p className="text-gray-400 line-through text-xs">
//                           ₦{oldPrice?.toLocaleString()}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }













import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaFileInvoice,
  FaStar,
  FaUser,
  FaWallet,
  FaBell,
} from "react-icons/fa";
import { StoreHeader } from "../components/StoreHeader";

export default function AccountPage() {
  const [active, setActive] = useState("orders");
  const [tab, setTab] = useState("all");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Profile state
  const [profile, setProfile] = useState({
    full_name: "",
    username: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    country: "",
    is_ambassador: false,
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");
  const [isProfileIncomplete, setIsProfileIncomplete] = useState(false);

  // Categories & search state for header
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Network state
  const [wallet, setWallet] = useState(null);
  const [withdrawals, setWithdrawals] = useState([]);
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [withdrawMessage, setWithdrawMessage] = useState("");
  const [downlineTree, setDownlineTree] = useState(null);

  const menuItems = [
    { id: "orders", label: "Your orders", icon: <FaFileInvoice /> },
    { id: "reviews", label: "Your reviews", icon: <FaStar /> },
    { id: "profile", label: "Your profile", icon: <FaUser /> },
    { id: "wallet", label: "Wallet", icon: <FaWallet /> },
    { id: "downline", label: "Downline", icon: <FaUser /> },
    { id: "withdrawals", label: "Withdrawals", icon: <FaWallet /> },
    { id: "notifications", label: "Notifications", icon: <FaBell /> },
  ];

  const token = localStorage.getItem("access_token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const BASE_URL = "http://127.0.0.1:8000/network";

  // -------------------- DATA FETCH ON MOUNT --------------------
  useEffect(() => {
    fetchProfile(); // fetch profile immediately on page load
    fetchCategories();
    fetchAllProducts();
  }, []);

  // Fetch orders, wallet, withdrawals, downline when tab changes
  useEffect(() => {
    if (active === "orders") fetchOrders(tab);
    else if (active === "wallet") fetchWallet();
    else if (active === "withdrawals") fetchWithdrawals();
    else if (active === "downline") fetchDownline();
  }, [active, tab]);

  // -------------------- FETCH FUNCTIONS --------------------
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/store/categories/`);
      setCategories(res.data || []);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/store/products/`);
      setAllProducts(res.data || []);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  const loadCategory = (id) => {
    setSelectedCategory(id);
    const url = id
      ? `http://127.0.0.1:8000/store/products/?category=${id}`
      : `http://127.0.0.1:8000/store/products/`;
    axios.get(url).then((res) => setAllProducts(res.data || []));
  };

  const searchProducts = () => {
    const url = searchValue
      ? `http://127.0.0.1:8000/store/products/?search=${encodeURIComponent(
          searchValue
        )}`
      : `http://127.0.0.1:8000/store/products/`;
    axios.get(url).then((res) => setAllProducts(res.data || []));
  };

  const goHome = () => (window.location.href = "/");
  const goToAccount = () => (window.location.href = "/signup");
  const goToAmbassadorDashboard = () => {
    window.location.href = "/ambassador/dashboard";
  };

  // -------------------- ORDERS --------------------
  const fetchOrders = async (status) => {
    setLoading(true);
    try {
      let url = `http://127.0.0.1:8000/store/orders/all/`;
      if (status !== "all") url = `http://127.0.0.1:8000/store/orders/?status=${status}`;
      const res = await axios.get(url, { headers });
      if (Array.isArray(res.data)) setOrders(res.data);
      else if (res.data.results) setOrders(res.data.results);
      else setOrders([]);
    } catch (err) {
      console.error(err);
      setOrders([]);
    }
    setLoading(false);
  };

  // -------------------- PROFILE --------------------
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/store/auth/profile/`, { headers });
      const data = res.data;

      const isAmbassador = data.is_ambassador === true || data.is_ambassador === "true";

      setProfile({ ...data, is_ambassador: isAmbassador });

      const incomplete =
        !data.full_name ||
        !data.phone ||
        !data.street ||
        !data.city ||
        !data.state ||
        !data.country;
      setIsProfileIncomplete(incomplete);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      await axios.put(`${BASE_URL}/auth/profile/`, profile, { headers });
      setProfileMessage("Profile updated successfully!");
      const incomplete =
        !profile.full_name ||
        !profile.phone ||
        !profile.street ||
        !profile.city ||
        !profile.state ||
        !profile.country;
      setIsProfileIncomplete(incomplete);
    } catch (err) {
      console.error("Error saving profile:", err);
      setProfileMessage("Failed to update profile.");
    }
    setSavingProfile(false);
  };

  // -------------------- NETWORK FUNCTIONS --------------------
  const fetchWallet = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/wallet/`, { headers });
      setWallet(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchWithdrawals = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/wallet/ledger/`, { headers });
      setWithdrawals(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const requestWithdrawal = async () => {
    try {
      await axios.post(
        `${BASE_URL}/withdraw/`,
        {
          amount: withdrawalAmount,
          bank_name: bankName,
          account_number: accountNumber,
        },
        { headers }
      );
      setWithdrawMessage("Withdrawal requested successfully!");
      setWithdrawalAmount("");
      setBankName("");
      setAccountNumber("");
      fetchWithdrawals();
    } catch (err) {
      setWithdrawMessage(err.response?.data?.error || "Error requesting withdrawal");
    }
  };

  const fetchDownline = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/downline/`, { headers });
      setDownlineTree(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // -------------------- RENDER HELPERS --------------------
  const renderOrders = () => {
    if (loading) return <p className="text-center mt-20">Loading orders...</p>;
    if (!orders.length)
      return (
        <div className="text-center mt-20">
          <img src="/empty-box.png" alt="empty" className="mx-auto w-28 opacity-60" />
          <h3 className="text-lg mt-4 font-medium">No {tab} orders found</h3>
        </div>
      );
    return (
      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <span>Order #{order.id}</span>
            <span>Status: {order.status}</span>
            <span>Total: ₦{order.total}</span>
          </li>
        ))}
      </ul>
    );
  };

  const renderProfile = () => (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
      <form onSubmit={saveProfile} className="space-y-4">
        {[
          { name: "full_name", placeholder: "Full Name" },
          { name: "username", placeholder: "Username" },
          { name: "phone", placeholder: "Phone Number" },
          { name: "street", placeholder: "Street Address" },
          { name: "city", placeholder: "City" },
          { name: "state", placeholder: "State" },
          { name: "country", placeholder: "Country" },
        ].map((field) => (
          <input
            key={field.name}
            type="text"
            name={field.name}
            placeholder={field.placeholder}
            value={profile[field.name]}
            onChange={handleProfileChange}
            className={`w-full p-2 border rounded ${
              isProfileIncomplete && !profile[field.name] ? "border-red-500" : ""
            }`}
          />
        ))}
        <button
          type="submit"
          disabled={savingProfile}
          className="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700 transition"
        >
          {savingProfile ? "Saving..." : "Save Profile"}
        </button>
      </form>
      {profileMessage && <p className="mt-2 text-center">{profileMessage}</p>}
      {isProfileIncomplete && (
        <p className="mt-2 text-red-500 text-center">
          Please complete all required fields before proceeding.
        </p>
      )}
    </div>
  );

  const renderDownline = (node, nodes) => {
    if (!node) return null;
    return (
      <ul className="ml-4">
        <li>
          {node.referral_code} (Level {node.level})
          {node.children?.length > 0 && node.children.map((child) => renderDownline(nodes[child], nodes))}
        </li>
      </ul>
    );
  };

  const handleViewProduct = (productId) => {
    window.location.href = `/product/${productId}`;
  };

  // -------------------- RENDER --------------------
  return (
    <div className="min-h-screen bg-gray-100">
      {/* STORE HEADER */}
      <StoreHeader
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchProducts={searchProducts}
        categories={categories}
        loadCategory={loadCategory}
        cartCount={0}
        goHome={goHome}
        goToAccount={goToAccount}
        logo="/logo.png"
        selectedCategory={selectedCategory}
      />

      {/* MAIN LAYOUT */}
      <div className="flex w-full">
        {/* Sidebar */}
        <div className="w-64 p-4">
          {/* Account header + ambassador button */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Account</h2>

            {profile.is_ambassador && (
              <button
                onClick={goToAmbassadorDashboard}
                className="text-xs px-3 py-1 rounded bg-orange-600 text-white hover:bg-orange-700 transition"
              >
                Dashboard
              </button>
            )}
          </div>

          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  if (isProfileIncomplete && item.id !== "profile") {
                    alert("Please complete your profile first!");
                    return;
                  }
                  setActive(item.id);
                }}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
                  ${active === item.id ? "bg-orange-100 text-orange-600" : "hover:bg-gray-100"}`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {active === "orders" && (
            <div>
              <div className="flex gap-4 border-b mb-4">
                {["all", "processing", "shipped", "delivered"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`px-4 py-2 -mb-px border-b-2 font-medium transition
                      ${tab === t ? "border-orange-600 text-orange-600" : "border-transparent text-gray-600 hover:text-orange-500"}`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
              {renderOrders()}
            </div>
          )}

          {active === "profile" && renderProfile()}

          {active === "wallet" && wallet && (
            <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Wallet Balance</h2>
              <p className="text-green-600 font-bold text-lg">₦{wallet.balance}</p>
            </div>
          )}

          {active === "withdrawals" && (
            <div className="max-w-lg mx-auto space-y-4">
              <h2 className="text-xl font-semibold mb-4">Request Withdrawal</h2>
              <input
                type="number"
                placeholder="Amount"
                value={withdrawalAmount}
                onChange={(e) => setWithdrawalAmount(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Bank Name"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Account Number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <button
                onClick={requestWithdrawal}
                className="w-full bg-blue-600 text-white p-2 rounded"
              >
                Request Withdrawal
              </button>
              {withdrawMessage && <p className="mt-2 text-center">{withdrawMessage}</p>}

              <h2 className="text-xl font-semibold mt-6">Withdrawal Ledger</h2>
              <ul className="space-y-2">
                {withdrawals.map((tx) => (
                  <li key={tx.id} className="flex justify-between p-2 border rounded">
                    <span>{tx.tx_type}</span>
                    <span>₦{tx.amount}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {active === "downline" && downlineTree && (
            <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Downline Tree</h2>
              {renderDownline(
                { referral_code: downlineTree.root, level: 0, children: downlineTree.nodes[downlineTree.root].children },
                downlineTree.nodes
              )}
            </div>
          )}

          {active !== "orders" && active !== "profile" && active !== "wallet" && active !== "withdrawals" && active !== "downline" && (
            <div className="text-gray-400 text-xl text-center mt-20">
              {menuItems.find((m) => m.id === active)?.label}
            </div>
          )}

          {/* -------------------- ALL PRODUCTS BELOW -------------------- */}
          <div className="max-w-6xl mx-auto mt-10 px-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">All Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {allProducts.map((product) => {
                const price =
                  typeof product.price === "string"
                    ? Number(product.price.replace(/[^\d.]/g, ""))
                    : product.price;

                const oldPrice =
                  typeof product.old_price === "string"
                    ? Number(product.old_price.replace(/[^\d.]/g, ""))
                    : product.old_price;

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm border p-3 hover:shadow-md transition cursor-pointer"
                    onClick={() => handleViewProduct(product.id)}
                  >
                    <div className="w-full h-40 bg-gray-100 rounded overflow-hidden">
                      <img
                        src={product.images?.[0]?.image}
                        className="w-full h-full object-cover"
                        alt={product.title}
                      />
                    </div>

                    <h3 className="mt-2 text-sm font-semibold text-gray-800 line-clamp-2">
                      {product.title}
                    </h3>

                    <div className="mt-1">
                      <p className="text-red-600 font-bold">₦{price?.toLocaleString()}</p>
                      {oldPrice && (
                        <p className="text-gray-400 line-through text-xs">
                          ₦{oldPrice?.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
