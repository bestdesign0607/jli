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
//     is_ambassador: false,
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
//     { id: "downline", label: "Downline", icon: <FaUser /> },
//     { id: "withdrawals", label: "Withdrawals", icon: <FaWallet /> },
//     { id: "notifications", label: "Notifications", icon: <FaBell /> },
//   ];

//   const token = localStorage.getItem("access_token");
//   const headers = token ? { Authorization: `Bearer ${token}` } : {};
//   const BASE_URL = "http://127.0.0.1:8000/network";

//   // -------------------- DATA FETCH ON MOUNT --------------------
//   useEffect(() => {
//     fetchProfile(); // fetch profile immediately on page load
//     fetchCategories();
//     fetchAllProducts();
//   }, []);

//   // Fetch orders, wallet, withdrawals, downline when tab changes
//   useEffect(() => {
//     if (active === "orders") fetchOrders(tab);
//     else if (active === "wallet") fetchWallet();
//     else if (active === "withdrawals") fetchWithdrawals();
//     else if (active === "downline") fetchDownline();
//   }, [active, tab]);

//   // -------------------- FETCH FUNCTIONS --------------------
//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(`http://127.0.0.1:8000/store/categories/`);
//       setCategories(res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch categories", err);
//     }
//   };

//   const fetchAllProducts = async () => {
//     try {
//       const res = await axios.get(`http://127.0.0.1:8000/store/products/`);
//       setAllProducts(res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch products", err);
//     }
//   };

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

//   // -------------------- ORDERS --------------------
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

//   // -------------------- PROFILE --------------------
//   const fetchProfile = async () => {
//     try {
//       const res = await axios.get(`http://127.0.0.1:8000/store/auth/profile/`, { headers });
//       const data = res.data;

//       const isAmbassador = data.is_ambassador === true || data.is_ambassador === "true";

//       setProfile({ ...data, is_ambassador: isAmbassador });

//       const incomplete =
//         !data.full_name ||
//         !data.phone ||
//         !data.street ||
//         !data.city ||
//         !data.state ||
//         !data.country;
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

//   // -------------------- RENDER HELPERS --------------------
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
//       {isProfileIncomplete && (
//         <p className="mt-2 text-red-500 text-center">
//           Please complete all required fields before proceeding.
//         </p>
//       )}
//     </div>
//   );

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

//   const [profile, setProfile] = useState({
//     full_name: "",
//     username: "",
//     phone: "",
//     street: "",
//     city: "",
//     state: "",
//     country: "",
//     is_ambassador: false,
//   });
//   const [savingProfile, setSavingProfile] = useState(false);
//   const [profileMessage, setProfileMessage] = useState("");
//   const [isProfileIncomplete, setIsProfileIncomplete] = useState(false);

//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [allProducts, setAllProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const [wallet, setWallet] = useState(null);
//   const [withdrawals, setWithdrawals] = useState([]);
//   const [withdrawalAmount, setWithdrawalAmount] = useState("");
//   const [bankName, setBankName] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [withdrawMessage, setWithdrawMessage] = useState("");
//   const [downlineTree, setDownlineTree] = useState(null);

//   const [token, setToken] = useState(localStorage.getItem("access_token"));
//   const [checkingAuth, setCheckingAuth] = useState(true);

//   const BASE_URL = "http://127.0.0.1:8000/network";

//   const menuItems = [
//     { id: "orders", label: "Your orders", icon: <FaFileInvoice /> },
//     { id: "reviews", label: "Your reviews", icon: <FaStar /> },
//     { id: "profile", label: "Your profile", icon: <FaUser /> },
//     { id: "wallet", label: "Wallet", icon: <FaWallet /> },
//     { id: "downline", label: "Downline", icon: <FaUser /> },
//     { id: "withdrawals", label: "Withdrawals", icon: <FaWallet /> },
//     { id: "notifications", label: "Notifications", icon: <FaBell /> },
//   ];

//   const headers = token ? { Authorization: `Bearer ${token}` } : {};

//   // -------------------- CHECK TOKEN ON MOUNT --------------------
//   useEffect(() => {
//     const storedToken = localStorage.getItem("access_token");
//     if (storedToken) {
//       setToken(storedToken);
//       fetchProfile();
//       fetchCategories();
//       fetchAllProducts();
//     } else {
//       // redirect to login if no token
//       setTimeout(() => (window.location.href = "/login"), 100);
//     }
//     setCheckingAuth(false);
//   }, []);

//   // Fetch orders, wallet, withdrawals, downline when tab changes
//   useEffect(() => {
//     if (!token) return;
//     if (active === "orders") fetchOrders(tab);
//     else if (active === "wallet") fetchWallet();
//     else if (active === "withdrawals") fetchWithdrawals();
//     else if (active === "downline") fetchDownline();
//   }, [active, tab, token]);

//   // -------------------- FETCH FUNCTIONS --------------------
//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(`http://127.0.0.1:8000/store/categories/`);
//       setCategories(res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch categories", err);
//     }
//   };

//   const fetchAllProducts = async () => {
//     try {
//       const res = await axios.get(`http://127.0.0.1:8000/store/products/`);
//       setAllProducts(res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch products", err);
//     }
//   };

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

//   // -------------------- ORDERS --------------------
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

//   // -------------------- PROFILE --------------------
//   const fetchProfile = async () => {
//     try {
//       const res = await axios.get(`http://127.0.0.1:8000/store/auth/profile/`, { headers });
//       const data = res.data;
//       setProfile({ ...data, is_ambassador: data.is_ambassador === true || data.is_ambassador === "true" });

//       const incomplete =
//         !data.full_name ||
//         !data.phone ||
//         !data.street ||
//         !data.city ||
//         !data.state ||
//         !data.country;
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
//       await axios.put(`http://127.0.0.1:8000/store/auth/profile/`, profile, { headers });
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

//   // -------------------- RENDER HELPERS --------------------
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
//       {isProfileIncomplete && (
//         <p className="mt-2 text-red-500 text-center">
//           Please complete all required fields before proceeding.
//         </p>
//       )}
//     </div>
//   );

//   const renderDownline = (node, nodes) => {
//     if (!node) return null;
//     return (
//       <ul className="ml-4">
//         <li>
//           {node.referral_code} (Level {node.level})
//           {node.children?.length > 0 &&
//             node.children.map((child) => renderDownline(nodes[child], nodes))}
//         </li>
//       </ul>
//     );
//   };

//   const handleViewProduct = (productId) => {
//     window.location.href = `/product/${productId}`;
//   };

//   // -------------------- MAIN RENDER --------------------
//   if (checkingAuth) {
//     return <p className="text-center mt-20">Checking login...</p>;
//   }

//   if (!token) return null;

//   return (
//     <div className="min-h-screen bg-gray-100">
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

//       <div className="flex w-full">
//         <div className="w-64 p-4">
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
//                   ${active === item.id ? "bg-orange-100 text-orange-600" : "hover:bg-gray-100"}`}
//               >
//                 <span className="text-lg">{item.icon}</span>
//                 <span className="text-sm">{item.label}</span>
//               </li>
//             ))}
//           </ul>
//         </div>

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
// import { FaFileInvoice, FaStar, FaUser, FaBell } from "react-icons/fa";
// import { StoreHeader } from "../components/StoreHeader";

// export default function AccountPage() {
//   const [active, setActive] = useState("orders");
//   const [tab, setTab] = useState("all");
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [profile, setProfile] = useState({
//     full_name: "",
//     username: "",
//     email: "",
//     phone: "",
//     street: "",
//     city: "",
//     state: "",
//     country: "",
//     is_ambassador: false,
//   });

//   const [formProfile, setFormProfile] = useState({ ...profile });
//   const [savingProfile, setSavingProfile] = useState(false);
//   const [profileMessage, setProfileMessage] = useState("");

//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [allProducts, setAllProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const [token, setToken] = useState(localStorage.getItem("access_token"));
//   const [checkingAuth, setCheckingAuth] = useState(true);

//   const headers = token ? { Authorization: `Bearer ${token}` } : {};
//   const BASE_URL = "http://127.0.0.1:8000/network";

//   const menuItems = [
//     { id: "orders", label: "Your orders", icon: <FaFileInvoice /> },
//     { id: "reviews", label: "Your reviews", icon: <FaStar /> },
//     { id: "profile", label: "Your profile", icon: <FaUser /> },
//     { id: "notifications", label: "Notifications", icon: <FaBell /> },
//   ];

//   // -------------------- CHECK TOKEN ON MOUNT --------------------
//   useEffect(() => {
//     const storedToken = localStorage.getItem("access_token");
//     if (storedToken) {
//       setToken(storedToken);
//       fetchProfile();
//       fetchCategories();
//       fetchAllProducts();
//     } else {
//       setTimeout(() => (window.location.href = "/login"), 100);
//     }
//     setCheckingAuth(false);
//   }, []);

//   // -------------------- FETCH FUNCTIONS --------------------
//   const fetchProfile = async () => {
//     try {
//       const res = await axios.get(`http://127.0.0.1:8000/store/auth/profile/`, { headers });
//       const data = res.data;
//       const formattedProfile = {
//         full_name: data.full_name || "",
//         username: data.username || "",
//         email: data.email || "",
//         phone: data.phone || "",
//         street: data.street || "",
//         city: data.city || "",
//         state: data.state || "",
//         country: data.country || "",
//         is_ambassador: data.is_ambassador || false,
//       };
//       setProfile(formattedProfile);
//       setFormProfile(formattedProfile);
//     } catch (err) {
//       console.error("Error fetching profile:", err);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(`http://127.0.0.1:8000/store/categories/`);
//       setCategories(res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch categories", err);
//     }
//   };

//   const fetchAllProducts = async () => {
//     try {
//       const res = await axios.get(`http://127.0.0.1:8000/store/products/`);
//       setAllProducts(res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch products", err);
//     }
//   };

//   const loadCategory = (id) => {
//     setSelectedCategory(id);
//     const url = id
//       ? `http://127.0.0.1:8000/store/products/?category=${id}`
//       : `http://127.0.0.1:8000/store/products/`;
//     axios.get(url).then((res) => setAllProducts(res.data || []));
//   };

//   const searchProducts = () => {
//     const url = searchValue
//       ? `http://127.0.0.1:8000/store/products/?search=${encodeURIComponent(searchValue)}`
//       : `http://127.0.0.1:8000/store/products/`;
//     axios.get(url).then((res) => setAllProducts(res.data || []));
//   };

//   const goHome = () => (window.location.href = "/");
//   const goToAccount = () => (window.location.href = "/signup");
//   const goToAmbassadorDashboard = () => {
//     window.location.href = "/ambassador/dashboard";
//   };

//   // -------------------- ORDERS --------------------
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

//   // -------------------- PROFILE FORM --------------------
//   const handleFormChange = (e) => {
//     setFormProfile({ ...formProfile, [e.target.name]: e.target.value });
//   };

//   const saveProfile = async (e) => {
//   e.preventDefault();
//   setSavingProfile(true);
//   try {
//     await axios.put(`http://127.0.0.1:8000/store/auth/profile/`, formProfile, { headers });

//     // Update right-side profile display
//     setProfile({ ...formProfile });

//     // Clear form fields after save
//     setFormProfile({
//       full_name: "",
//       username: "",
//       email: profile.email, // keep email
//       phone: "",
//       street: "",
//       city: "",
//       state: "",
//       country: "",
//       is_ambassador: profile.is_ambassador,
//     });

//     setProfileMessage("Profile updated successfully!");
//   } catch (err) {
//     console.error(err);
//     setProfileMessage("Failed to update profile.");
//   }
//   setSavingProfile(false);
// };


//   // -------------------- RENDER HELPERS --------------------
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
//     <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-2xl font-semibold mb-6">Your Profile</h2>
//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Left: Form */}
//         <div className="flex-1">
//           <form onSubmit={saveProfile} className="space-y-4 bg-gray-50 p-4 rounded">
//             {[
//               { name: "full_name", placeholder: "Full Name" },
//               { name: "username", placeholder: "Username" },
//               { name: "email", placeholder: "Email", disabled: true },
//               { name: "phone", placeholder: "Phone Number" },
//               { name: "street", placeholder: "Street Address" },
//               { name: "city", placeholder: "City" },
//               { name: "state", placeholder: "State" },
//               { name: "country", placeholder: "Country" },
//             ].map((field) => (
//               <input
//                 key={field.name}
//                 type="text"
//                 name={field.name}
//                 placeholder={field.placeholder}
//                 value={formProfile[field.name]}
//                 onChange={handleFormChange}
//                 disabled={field.disabled}
//                 className="w-full p-2 border rounded"
//               />
//             ))}
//             <button
//               type="submit"
//               disabled={savingProfile}
//               className="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700 transition"
//             >
//               {savingProfile ? "Saving..." : "Save Profile"}
//             </button>
//             {profileMessage && <p className="mt-2 text-center text-green-600">{profileMessage}</p>}
//           </form>
//         </div>

//         {/* Right: Display Profile */}
//         <div className="flex-1 bg-gray-50 p-4 rounded">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 font-medium">
//             <p>Full Name:</p>
//             <p>{profile.full_name || "-"}</p>

//             <p>Username:</p>
//             <p>{profile.username || "-"}</p>

//             <p>Email:</p>
//             <p>{profile.email || "-"}</p>

//             <p>Phone Number:</p>
//             <p>{profile.phone || "-"}</p>

//             <p>Street Address:</p>
//             <p>{profile.street || "-"}</p>

//             <p>City:</p>
//             <p>{profile.city || "-"}</p>

//             <p>State:</p>
//             <p>{profile.state || "-"}</p>

//             <p>Country:</p>
//             <p>{profile.country || "-"}</p>

//             <p>Ambassador Status:</p>
//             <p>{profile.is_ambassador ? "Yes" : "No"}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const handleViewProduct = (productId) => {
//     window.location.href = `/product/${productId}`;
//   };

//   // -------------------- MAIN RENDER --------------------
//   if (checkingAuth) return <p className="text-center mt-20">Checking login...</p>;
//   if (!token) return null;

//   return (
//     <div className="min-h-screen bg-gray-100">
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

//       <div className="flex w-full">
//         <div className="w-64 p-4">
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
//                 onClick={() => setActive(item.id)}
//                 className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
//                   ${active === item.id ? "bg-orange-100 text-orange-600" : "hover:bg-gray-100"}`}
//               >
//                 <span className="text-lg">{item.icon}</span>
//                 <span className="text-sm">{item.label}</span>
//               </li>
//             ))}
//           </ul>
//         </div>

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

//           <div className="max-w-6xl mx-auto mt-10 px-4">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">All Products</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {allProducts.map((product) => {
//                 const price = typeof product.price === "string" ? Number(product.price.replace(/[^\d.]/g, "")) : product.price;
//                 const oldPrice = typeof product.old_price === "string" ? Number(product.old_price.replace(/[^\d.]/g, "")) : product.old_price;

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
// import { FaFileInvoice, FaStar, FaUser, FaBell } from "react-icons/fa";
// import { StoreHeader } from "../components/StoreHeader";

// export default function AccountPage() {
//   const [active, setActive] = useState("orders");
//   const [tab, setTab] = useState("all");
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [profile, setProfile] = useState({
//     full_name: "",
//     username: "",
//     email: "",
//     phone: "",
//     street: "",
//     city: "",
//     state: "",
//     country: "",
//     is_ambassador: false,
//   });
//   const [formProfile, setFormProfile] = useState({ ...profile });
//   const [savingProfile, setSavingProfile] = useState(false);
//   const [profileMessage, setProfileMessage] = useState("");

//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [allProducts, setAllProducts] = useState([]);
//   const [purchasedProducts, setPurchasedProducts] = useState([]); // only purchased
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const [token, setToken] = useState(localStorage.getItem("access_token"));
//   const [checkingAuth, setCheckingAuth] = useState(true);

//   const [userReviews, setUserReviews] = useState([]);
//   const [reviewForm, setReviewForm] = useState({ product: "", text: "", rating: 5 });
//   const [savingReview, setSavingReview] = useState(false);

//   const headers = token ? { Authorization: `Bearer ${token}` } : {};
//   const BASE_URL = "http://127.0.0.1:8000/store";

//   const menuItems = [
//     { id: "orders", label: "Your orders", icon: <FaFileInvoice /> },
//     { id: "reviews", label: "Your reviews", icon: <FaStar /> },
//     { id: "profile", label: "Your profile", icon: <FaUser /> },
//     { id: "notifications", label: "Notifications", icon: <FaBell /> },
//   ];

//   // -------------------- CHECK TOKEN ON MOUNT --------------------
//   useEffect(() => {
//     const storedToken = localStorage.getItem("access_token");
//     if (storedToken) {
//       setToken(storedToken);
//       fetchProfile();
//       fetchCategories();
//       fetchAllProducts();
//       fetchOrders("all");
//       fetchUserReviews();
//     } else {
//       setTimeout(() => (window.location.href = "/login"), 100);
//     }
//     setCheckingAuth(false);
//   }, []);

//   // -------------------- FETCH FUNCTIONS --------------------
//   const fetchProfile = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/auth/profile/`, { headers });
//       const data = res.data;
//       const formattedProfile = {
//         full_name: data.full_name || "",
//         username: data.username || "",
//         email: data.email || "",
//         phone: data.phone || "",
//         street: data.street || "",
//         city: data.city || "",
//         state: data.state || "",
//         country: data.country || "",
//         is_ambassador: data.is_ambassador || false,
//       };
//       setProfile(formattedProfile);
//       setFormProfile(formattedProfile);
//     } catch (err) {
//       console.error("Error fetching profile:", err);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/categories/`);
//       setCategories(res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch categories", err);
//     }
//   };

//   const fetchAllProducts = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/products/`);
//       setAllProducts(res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch products", err);
//     }
//   };


//   const fetchOrders = async (status = "all") => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${BASE_URL}/orders/user/`, { headers });
//       let orderData = Array.isArray(res.data) ? res.data : [];

//       // ✅ Filter orders on frontend
//       if (status !== "all") {
//         orderData = orderData.filter(order => order.status === status);
//       }

//       setOrders(orderData);

//       // Build purchased products safely
//       const purchasedMap = {};
//       orderData.forEach(order => {
//         order.items?.forEach(item => {
//           const productId = item.product?.id || item.product_id || item.id;
//           const productTitle = item.product?.title || item.product_title || "Unknown Product";

//           if (productId && !purchasedMap[productId]) {
//             purchasedMap[productId] = { id: productId, title: productTitle };
//           }
//         });
//       });

//       setPurchasedProducts(Object.values(purchasedMap));
//     } catch (err) {
//       console.error("FETCH ORDERS ERROR:", err);
//       setOrders([]);
//       setPurchasedProducts([]);
//     }
//     setLoading(false);
//   };


//   const fetchUserReviews = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/user/reviews/`, { headers });
//       setUserReviews(res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch user reviews", err);
//     }
//   };

//   const loadCategory = (id) => {
//     setSelectedCategory(id);
//     const url = id ? `${BASE_URL}/products/?category=${id}` : `${BASE_URL}/products/`;
//     axios.get(url).then((res) => setAllProducts(res.data || []));
//   };

//   const searchProducts = () => {
//     const url = searchValue
//       ? `${BASE_URL}/products/?search=${encodeURIComponent(searchValue)}`
//       : `${BASE_URL}/products/`;
//     axios.get(url).then((res) => setAllProducts(res.data || []));
//   };

//   // -------------------- PROFILE FORM --------------------
//   const handleFormChange = (e) => {
//     setFormProfile({ ...formProfile, [e.target.name]: e.target.value });
//   };

//   const saveProfile = async (e) => {
//     e.preventDefault();
//     setSavingProfile(true);
//     try {
//       await axios.put(`${BASE_URL}/auth/profile/`, formProfile, { headers });
//       setProfile({ ...formProfile });
//       setFormProfile({ ...formProfile });
//       setProfileMessage("Profile updated successfully!");
//     } catch (err) {
//       console.error(err);
//       setProfileMessage("Failed to update profile.");
//     }
//     setSavingProfile(false);
//   };

//   // -------------------- REVIEW FORM --------------------
//   const handleReviewChange = (e) => {
//     setReviewForm({ ...reviewForm, [e.target.name]: e.target.value });
//   };

//   const submitReview = async (e) => {
//     e.preventDefault();
//     if (!reviewForm.product || !reviewForm.text || !reviewForm.rating) return;
//     setSavingReview(true);
//     try {
//       await axios.post(
//         `${BASE_URL}/products/${reviewForm.product}/reviews/`,
//         { text: reviewForm.text, rating: reviewForm.rating },
//         { headers }
//       );
//       setReviewForm({ product: "", text: "", rating: 5 });
//       fetchUserReviews(); // refresh user's reviews
//     } catch (err) {
//       console.error("Failed to submit review", err);
//     }
//     setSavingReview(false);
//   };

//   // -------------------- RENDER HELPERS --------------------
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
//     <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-2xl font-semibold mb-6">Your Profile</h2>
//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Left: Form */}
//         <div className="flex-1">
//           <form onSubmit={saveProfile} className="space-y-4 bg-gray-50 p-4 rounded">
//             {[
//               { name: "full_name", placeholder: "Full Name" },
//               { name: "username", placeholder: "Username" },
//               { name: "email", placeholder: "Email", disabled: true },
//               { name: "phone", placeholder: "Phone Number" },
//               { name: "street", placeholder: "Street Address" },
//               { name: "city", placeholder: "City" },
//               { name: "state", placeholder: "State" },
//               { name: "country", placeholder: "Country" },
//             ].map((field) => (
//               <input
//                 key={field.name}
//                 type="text"
//                 name={field.name}
//                 placeholder={field.placeholder}
//                 value={formProfile[field.name]}
//                 onChange={handleFormChange}
//                 disabled={field.disabled}
//                 className="w-full p-2 border rounded"
//               />
//             ))}
//             <button
//               type="submit"
//               disabled={savingProfile}
//               className="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700 transition"
//             >
//               {savingProfile ? "Saving..." : "Save Profile"}
//             </button>
//             {profileMessage && <p className="mt-2 text-center text-green-600">{profileMessage}</p>}
//           </form>
//         </div>

//         {/* Right: Display Profile */}
//         <div className="flex-1 bg-gray-50 p-4 rounded">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 font-medium">
//             <p>Full Name:</p>
//             <p>{profile.full_name || "-"}</p>
//             <p>Username:</p>
//             <p>{profile.username || "-"}</p>
//             <p>Email:</p>
//             <p>{profile.email || "-"}</p>
//             <p>Phone Number:</p>
//             <p>{profile.phone || "-"}</p>
//             <p>Street Address:</p>
//             <p>{profile.street || "-"}</p>
//             <p>City:</p>
//             <p>{profile.city || "-"}</p>
//             <p>State:</p>
//             <p>{profile.state || "-"}</p>
//             <p>Country:</p>
//             <p>{profile.country || "-"}</p>
//             <p>Ambassador Status:</p>
//             <p>{profile.is_ambassador ? "Yes" : "No"}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderReviews = () => {
//     return (
//       <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow space-y-6">
//         <h2 className="text-2xl font-semibold">Your Reviews</h2>

//         {/* ---------------- REVIEW FORM ---------------- */}
//         <form
//           onSubmit={submitReview}
//           className="bg-gray-50 p-4 rounded space-y-4"
//         >
//           <h3 className="text-lg font-semibold">Write a Review</h3>

//           <select
//             name="product"
//             value={reviewForm.product}
//             onChange={handleReviewChange}
//             className="w-full p-2 border rounded"
//             required
//           >
//             <option value="">Select a product</option>
//             {purchasedProducts.length === 0 && (
//               <option disabled>No purchased products found</option>
//             )}
//             {purchasedProducts.map((product) => (
//               <option key={product.id} value={product.id}>
//                 {product.title}
//               </option>
//             ))}
//           </select>


//           <textarea
//             name="text"
//             value={reviewForm.text}
//             onChange={handleReviewChange}
//             placeholder="Write your review..."
//             className="w-full p-2 border rounded"
//             rows={4}
//             required
//           />

//           <div className="flex items-center gap-1">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <FaStar
//                 key={star}
//                 className={`cursor-pointer transition ${star <= reviewForm.rating ? "text-yellow-400" : "text-gray-300"
//                   }`}
//                 onClick={() => setReviewForm({ ...reviewForm, rating: star })}
//                 size={20}
//               />
//             ))}
//           </div>

//           <button
//             type="submit"
//             disabled={savingReview}
//             className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
//           >
//             {savingReview ? "Submitting..." : "Submit Review"}
//           </button>
//         </form>

//         {/* ---------------- REVIEW LIST ---------------- */}
//         {!userReviews.length ? (
//           <p className="text-gray-500">No reviews yet.</p>
//         ) : (
//           <div className="space-y-4">
//             {userReviews.map((review) => (
//               <div key={review.id} className="border p-3 rounded bg-gray-50">
//                 <p className="font-semibold">
//                   {review.product_title ?? "Product"}
//                 </p>

//                 <p className="text-sm text-gray-700">
//                   {String(review.text)}
//                 </p>

//                 {/* <p className="text-sm text-yellow-600">
//                   Rating: {Number(review.rating)}
//                 </p> */}

//                 <p className="flex items-center gap-1 text-yellow-500">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <FaStar
//                       key={star}
//                       className={star <= review.rating ? "text-yellow-500" : "text-gray-300"}
//                     />
//                   ))}
//                 </p>


//                 <p className="text-xs text-gray-500">
//                   {review.date
//                     ? new Date(review.date).toLocaleString()
//                     : ""}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };



//   const handleViewProduct = (productId) => {
//     window.location.href = `/product/${productId}`;
//   };

//   if (checkingAuth) return <p className="text-center mt-20">Checking login...</p>;
//   if (!token) return null;

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <StoreHeader
//         searchValue={searchValue}
//         setSearchValue={setSearchValue}
//         searchProducts={searchProducts}
//         categories={categories}
//         loadCategory={loadCategory}
//         cartCount={0}
//         goHome={() => (window.location.href = "/")}
//         goToAccount={() => (window.location.href = "/signup")}
//         logo="/logo.png"
//         selectedCategory={selectedCategory}
//       />

//       <div className="flex w-full">
//         <div className="w-64 p-4">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-semibold">Account</h2>
//             {profile.is_ambassador && (
//               <button
//                 onClick={() => (window.location.href = "/ambassador/dashboard")}
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
//                 onClick={() => setActive(item.id)}
//                 className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
//                   ${active === item.id ? "bg-orange-100 text-orange-600" : "hover:bg-gray-100"}`}
//               >
//                 <span className="text-lg">{item.icon}</span>
//                 <span className="text-sm">{item.label}</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="flex-1 p-8">
//           {active === "orders" && (
//             <div>
//               <div className="flex gap-4 border-b mb-4">
//                 {["all", "shipped", "delivered"].map((t) => (
//                   <button
//                     key={t}
//                     onClick={() => {
//                       setTab(t);
//                       fetchOrders(t);
//                     }}
//                     className={`px-4 py-2 -mb-px border-b-2 font-medium transition
//             ${tab === t
//                         ? "border-orange-600 text-orange-600"
//                         : "border-transparent text-gray-600 hover:text-orange-500"
//                       }`}
//                   >
//                     {t.charAt(0).toUpperCase() + t.slice(1)}
//                   </button>
//                 ))}
//               </div>
//               {renderOrders()}
//             </div>
//           )}

//           {active === "profile" && renderProfile()}

//           {active === "reviews" && renderReviews()}

//           {/* Optional: Display all products */}
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
// import { FaFileInvoice, FaStar, FaUser, FaBell } from "react-icons/fa";
// import { StoreHeader } from "../components/StoreHeader";

// export default function AccountPage() {
//   const [active, setActive] = useState("orders");
//   const [tab, setTab] = useState("all");
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [notifications, setNotifications] = useState([]);

//   const [profile, setProfile] = useState({
//     full_name: "",
//     username: "",
//     email: "",
//     phone: "",
//     street: "",
//     city: "",
//     state: "",
//     country: "",
//     is_ambassador: false,
//   });
//   const [formProfile, setFormProfile] = useState({ ...profile });
//   const [savingProfile, setSavingProfile] = useState(false);
//   const [profileMessage, setProfileMessage] = useState("");

//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [allProducts, setAllProducts] = useState([]);
//   const [purchasedProducts, setPurchasedProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const [token, setToken] = useState(localStorage.getItem("access_token"));
//   const [checkingAuth, setCheckingAuth] = useState(true);

//   const [userReviews, setUserReviews] = useState([]);
//   const [reviewForm, setReviewForm] = useState({ product: "", text: "", rating: 5 });
//   const [savingReview, setSavingReview] = useState(false);

//   const headers = token ? { Authorization: `Bearer ${token}` } : {};
//   const BASE_URL = "http://127.0.0.1:8000/store";

//   const menuItems = [
//     { id: "orders", label: "Your orders", icon: <FaFileInvoice /> },
//     { id: "reviews", label: "Your reviews", icon: <FaStar /> },
//     { id: "profile", label: "Your profile", icon: <FaUser /> },
//     { id: "notifications", label: "Notifications", icon: <FaBell /> },
//   ];

//   // -------------------- CHECK TOKEN ON MOUNT --------------------
//   useEffect(() => {
//     const storedToken = localStorage.getItem("access_token");
//     if (storedToken) {
//       setToken(storedToken);
//       fetchProfile();
//       fetchCategories();
//       fetchAllProducts();
//       fetchOrders("all");
//       fetchUserReviews();
//     } else {
//       setTimeout(() => (window.location.href = "/login"), 100);
//     }
//     setCheckingAuth(false);
//   }, []);

//   // -------------------- FETCH FUNCTIONS --------------------
//   const fetchProfile = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/auth/profile/`, { headers });
//       const data = res.data;
//       const formattedProfile = {
//         full_name: data.full_name || "",
//         username: data.username || "",
//         email: data.email || "",
//         phone: data.phone || "",
//         street: data.street || "",
//         city: data.city || "",
//         state: data.state || "",
//         country: data.country || "",
//         is_ambassador: data.is_ambassador || false,
//       };
//       setProfile(formattedProfile);
//       setFormProfile(formattedProfile);
//     } catch (err) {
//       console.error("Error fetching profile:", err);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/categories/`);
//       setCategories(res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch categories", err);
//     }
//   };

//   const fetchAllProducts = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/products/`);
//       setAllProducts(res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch products", err);
//     }
//   };

//   const fetchOrders = async (status = "all") => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${BASE_URL}/orders/user/`, { headers });
//       let orderData = Array.isArray(res.data) ? res.data : [];

//       // Filter orders on frontend
//       if (status !== "all") {
//         orderData = orderData.filter(order => order.status === status);
//       }

//       setOrders(orderData);
//       buildNotifications(orderData);

//       // Build purchased products safely
//       const purchasedMap = {};
//       orderData.forEach(order => {
//         order.items?.forEach(item => {
//           const productId = item.product?.id || item.product_id || item.id;
//           const productTitle = item.product?.title || item.product_title || "Unknown Product";

//           if (productId && !purchasedMap[productId]) {
//             purchasedMap[productId] = { id: productId, title: productTitle };
//           }
//         });
//       });

//       setPurchasedProducts(Object.values(purchasedMap));
//     } catch (err) {
//       console.error("FETCH ORDERS ERROR:", err);
//       setOrders([]);
//       setPurchasedProducts([]);
//     }
//     setLoading(false);
//   };

//   // -------------------- BUILD NOTIFICATIONS --------------------
//   const buildNotifications = (orders) => {
//     const notifs = [];

//     orders.forEach((order) => {
//       // Order placed
//       notifs.push({
//         id: `placed-${order.id}`,
//         message: `Your order #${order.id} was placed with ${order.items.map(i => `${i.quantity} × ${i.product_title || i.product}`).join(", ")}.`,
//         date: order.created_at || order.date || new Date().toISOString(),
//       });

//       // Shipped
//       if (order.status === "shipped" || order.status === "delivered") {
//         notifs.push({
//           id: `shipped-${order.id}`,
//           message: `Your order #${order.id} has been shipped.`,
//           date: order.updated_at || new Date().toISOString(),
//         });
//       }

//       // Delivered
//       if (order.status === "delivered") {
//         notifs.push({
//           id: `delivered-${order.id}`,
//           message: `Your order #${order.id} has been delivered.`,
//           date: order.updated_at || new Date().toISOString(),
//         });
//       }
//     });

//     notifs.sort((a, b) => new Date(b.date) - new Date(a.date));
//     setNotifications(notifs);
//   };

//   const fetchUserReviews = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/user/reviews/`, { headers });
//       setUserReviews(res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch user reviews", err);
//     }
//   };

//   const loadCategory = (id) => {
//     setSelectedCategory(id);
//     const url = id ? `${BASE_URL}/products/?category=${id}` : `${BASE_URL}/products/`;
//     axios.get(url).then((res) => setAllProducts(res.data || []));
//   };

//   const searchProducts = () => {
//     const url = searchValue
//       ? `${BASE_URL}/products/?search=${encodeURIComponent(searchValue)}`
//       : `${BASE_URL}/products/`;
//     axios.get(url).then((res) => setAllProducts(res.data || []));
//   };

//   // -------------------- PROFILE FORM --------------------
//   const handleFormChange = (e) => {
//     setFormProfile({ ...formProfile, [e.target.name]: e.target.value });
//   };

//   const saveProfile = async (e) => {
//     e.preventDefault();
//     setSavingProfile(true);
//     try {
//       await axios.put(`${BASE_URL}/auth/profile/`, formProfile, { headers });
//       setProfile({ ...formProfile });
//       setFormProfile({ ...formProfile });
//       setProfileMessage("Profile updated successfully!");
//     } catch (err) {
//       console.error(err);
//       setProfileMessage("Failed to update profile.");
//     }
//     setSavingProfile(false);
//   };

//   // -------------------- REVIEW FORM --------------------
//   const handleReviewChange = (e) => {
//     setReviewForm({ ...reviewForm, [e.target.name]: e.target.value });
//   };

//   const submitReview = async (e) => {
//     e.preventDefault();
//     if (!reviewForm.product || !reviewForm.text || !reviewForm.rating) return;
//     setSavingReview(true);
//     try {
//       await axios.post(
//         `${BASE_URL}/products/${reviewForm.product}/reviews/`,
//         { text: reviewForm.text, rating: reviewForm.rating },
//         { headers }
//       );
//       setReviewForm({ product: "", text: "", rating: 5 });
//       fetchUserReviews();
//     } catch (err) {
//       console.error("Failed to submit review", err);
//     }
//     setSavingReview(false);
//   };

//   // -------------------- RENDER HELPERS --------------------
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

//   const renderNotifications = () => {
//     if (!notifications.length)
//       return (
//         <div className="text-center mt-20">
//           <img src="/empty-box.png" alt="empty" className="mx-auto w-28 opacity-60" />
//           <h3 className="text-lg mt-4 font-medium">No notifications</h3>
//         </div>
//       );

//     return (
//       <ul className="space-y-4 max-w-3xl mx-auto">
//         {notifications.map((notif) => (
//           <li
//             key={notif.id}
//             className="bg-white p-4 rounded shadow flex justify-between items-center"
//           >
//             <p>{notif.message}</p>
//             <span className="text-xs text-gray-400">
//               {new Date(notif.date).toLocaleString()}
//             </span>
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   const renderProfile = () => (
//     <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-2xl font-semibold mb-6">Your Profile</h2>
//       <div className="flex flex-col md:flex-row gap-8">
//         <div className="flex-1">
//           <form onSubmit={saveProfile} className="space-y-4 bg-gray-50 p-4 rounded">
//             {[
//               { name: "full_name", placeholder: "Full Name" },
//               { name: "username", placeholder: "Username" },
//               { name: "email", placeholder: "Email", disabled: true },
//               { name: "phone", placeholder: "Phone Number" },
//               { name: "street", placeholder: "Street Address" },
//               { name: "city", placeholder: "City" },
//               { name: "state", placeholder: "State" },
//               { name: "country", placeholder: "Country" },
//             ].map((field) => (
//               <input
//                 key={field.name}
//                 type="text"
//                 name={field.name}
//                 placeholder={field.placeholder}
//                 value={formProfile[field.name]}
//                 onChange={handleFormChange}
//                 disabled={field.disabled}
//                 className="w-full p-2 border rounded"
//               />
//             ))}
//             <button
//               type="submit"
//               disabled={savingProfile}
//               className="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700 transition"
//             >
//               {savingProfile ? "Saving..." : "Save Profile"}
//             </button>
//             {profileMessage && <p className="mt-2 text-center text-green-600">{profileMessage}</p>}
//           </form>
//         </div>

//         <div className="flex-1 bg-gray-50 p-4 rounded">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 font-medium">
//             <p>Full Name:</p>
//             <p>{profile.full_name || "-"}</p>
//             <p>Username:</p>
//             <p>{profile.username || "-"}</p>
//             <p>Email:</p>
//             <p>{profile.email || "-"}</p>
//             <p>Phone Number:</p>
//             <p>{profile.phone || "-"}</p>
//             <p>Street Address:</p>
//             <p>{profile.street || "-"}</p>
//             <p>City:</p>
//             <p>{profile.city || "-"}</p>
//             <p>State:</p>
//             <p>{profile.state || "-"}</p>
//             <p>Country:</p>
//             <p>{profile.country || "-"}</p>
//             <p>Ambassador Status:</p>
//             <p>{profile.is_ambassador ? "Yes" : "No"}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderReviews = () => {
//     return (
//       <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow space-y-6">
//         <h2 className="text-2xl font-semibold">Your Reviews</h2>

//         <form onSubmit={submitReview} className="bg-gray-50 p-4 rounded space-y-4">
//           <h3 className="text-lg font-semibold">Write a Review</h3>

//           <select
//             name="product"
//             value={reviewForm.product}
//             onChange={handleReviewChange}
//             className="w-full p-2 border rounded"
//             required
//           >
//             <option value="">Select a product</option>
//             {purchasedProducts.length === 0 && (
//               <option disabled>No purchased products found</option>
//             )}
//             {purchasedProducts.map((product) => (
//               <option key={product.id} value={product.id}>
//                 {product.title}
//               </option>
//             ))}
//           </select>

//           <textarea
//             name="text"
//             value={reviewForm.text}
//             onChange={handleReviewChange}
//             placeholder="Write your review..."
//             className="w-full p-2 border rounded"
//             rows={4}
//             required
//           />

//           <div className="flex items-center gap-1">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <FaStar
//                 key={star}
//                 className={`cursor-pointer transition ${star <= reviewForm.rating ? "text-yellow-400" : "text-gray-300"}`}
//                 onClick={() => setReviewForm({ ...reviewForm, rating: star })}
//                 size={20}
//               />
//             ))}
//           </div>

//           <button
//             type="submit"
//             disabled={savingReview}
//             className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
//           >
//             {savingReview ? "Submitting..." : "Submit Review"}
//           </button>
//         </form>

//         {!userReviews.length ? (
//           <p className="text-gray-500">No reviews yet.</p>
//         ) : (
//           <div className="space-y-4">
//             {userReviews.map((review) => (
//               <div key={review.id} className="border p-3 rounded bg-gray-50">
//                 <p className="font-semibold">{review.product_title ?? "Product"}</p>
//                 <p className="text-sm text-gray-700">{String(review.text)}</p>
//                 <p className="flex items-center gap-1 text-yellow-500">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <FaStar key={star} className={star <= review.rating ? "text-yellow-500" : "text-gray-300"} />
//                   ))}
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   {review.date ? new Date(review.date).toLocaleString() : ""}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const handleViewProduct = (productId) => {
//     window.location.href = `/product/${productId}`;
//   };

//   if (checkingAuth) return <p className="text-center mt-20">Checking login...</p>;
//   if (!token) return null;

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <StoreHeader
//         searchValue={searchValue}
//         setSearchValue={setSearchValue}
//         searchProducts={searchProducts}
//         categories={categories}
//         loadCategory={loadCategory}
//         cartCount={0}
//         goHome={() => (window.location.href = "/")}
//         goToAccount={() => (window.location.href = "/signup")}
//         logo="/logo.png"
//         selectedCategory={selectedCategory}
//       />

//       <div className="flex w-full">
//         <div className="w-64 p-4">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-semibold">Account</h2>
//             {profile.is_ambassador && (
//               <button
//                 onClick={() => (window.location.href = "/ambassador/dashboard")}
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
//                 onClick={() => setActive(item.id)}
//                 className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
//                   ${active === item.id ? "bg-orange-100 text-orange-600" : "hover:bg-gray-100"}`}
//               >
//                 <span className="text-lg">{item.icon}</span>
//                 <span className="text-sm">{item.label}</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="flex-1 p-8">
//           {active === "orders" && (
//             <div>
//               <div className="flex gap-4 border-b mb-4">
//                 {["all", "shipped", "delivered"].map((t) => (
//                   <button
//                     key={t}
//                     onClick={() => {
//                       setTab(t);
//                       fetchOrders(t);
//                     }}
//                     className={`px-4 py-2 -mb-px border-b-2 font-medium transition
//             ${tab === t
//                         ? "border-orange-600 text-orange-600"
//                         : "border-transparent text-gray-600 hover:text-orange-500"
//                       }`}
//                   >
//                     {t.charAt(0).toUpperCase() + t.slice(1)}
//                   </button>
//                 ))}
//               </div>
//               {renderOrders()}
//             </div>
//           )}

//           {active === "profile" && renderProfile()}

//           {active === "reviews" && renderReviews()}

//           {active === "notifications" && renderNotifications()}

//           {/* Optional: Display all products */}
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
// import { FaFileInvoice, FaStar, FaUser, FaBell } from "react-icons/fa";
// import { StoreHeader } from "../components/StoreHeader";

// export default function AccountPage() {
//   const [active, setActive] = useState("orders");
//   const [tab, setTab] = useState("all");
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [notifications, setNotifications] = useState([]);

//   const [profile, setProfile] = useState({
//     full_name: "",
//     username: "",
//     email: "",
//     phone: "",
//     street: "",
//     city: "",
//     state: "",
//     country: "",
//     is_ambassador: false,
//   });
//   const [formProfile, setFormProfile] = useState({ ...profile });
//   const [savingProfile, setSavingProfile] = useState(false);
//   const [profileMessage, setProfileMessage] = useState("");

//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [allProducts, setAllProducts] = useState([]);
//   const [purchasedProducts, setPurchasedProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const token = sessionStorage.getItem("access_token"); 
//   const [checkingAuth, setCheckingAuth] = useState(true);

//   const [userReviews, setUserReviews] = useState([]);
//   const [reviewForm, setReviewForm] = useState({ product: "", text: "", rating: 5 });
//   const [savingReview, setSavingReview] = useState(false);

//   const headers = token ? { Authorization: `Bearer ${token}` } : {};
//   const BASE_URL = "http://127.0.0.1:8000/store";

//   const menuItems = [
//     { id: "orders", label: "Your orders", icon: <FaFileInvoice /> },
//     { id: "reviews", label: "Your reviews", icon: <FaStar /> },
//     { id: "profile", label: "Your profile", icon: <FaUser /> },
//     { id: "notifications", label: "Notifications", icon: <FaBell /> },
//   ];

//   // -------------------- CHECK TOKEN ON MOUNT --------------------
//   useEffect(() => {
//     const storedToken = sessionStorage.getItem("access_token");
//     if (storedToken) {
//       setToken(storedToken);
//       fetchProfile();
//       fetchCategories();
//       fetchAllProducts();
//       fetchOrders("all");
//       fetchUserReviews();
//     } else {
//       setTimeout(() => (window.location.href = "/login"), 100);
//     }
//     setCheckingAuth(false);
//   }, []);

//   // -------------------- FETCH FUNCTIONS --------------------
//   const fetchProfile = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/auth/profile/`, { headers });
//       const data = res.data;
//       const formattedProfile = {
//         full_name: data.full_name || "",
//         username: data.username || "",
//         email: data.email || "",
//         phone: data.phone || "",
//         street: data.street || "",
//         city: data.city || "",
//         state: data.state || "",
//         country: data.country || "",
//         is_ambassador: data.is_ambassador || false,
//       };
//       setProfile(formattedProfile);
//       setFormProfile(formattedProfile);
//     } catch (err) {
//       console.error("Error fetching profile:", err);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/categories/`);
//       setCategories(res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch categories", err);
//     }
//   };

//   const fetchAllProducts = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/products/`);
//       setAllProducts(res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch products", err);
//     }
//   };

//   const fetchOrders = async (status = "all") => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${BASE_URL}/orders/user/`, { headers });
//       let orderData = Array.isArray(res.data) ? res.data : [];

//       if (status !== "all") {
//         orderData = orderData.filter(order => order.status === status);
//       }

//       setOrders(orderData);
//       buildNotifications(orderData);

//       const purchasedMap = {};
//       orderData.forEach(order => {
//         order.items?.forEach(item => {
//           const productId = item.product?.id || item.product_id || item.id;
//           const productTitle = item.product?.title || item.product_title || "Unknown Product";

//           if (productId && !purchasedMap[productId]) {
//             purchasedMap[productId] = { id: productId, title: productTitle };
//           }
//         });
//       });

//       setPurchasedProducts(Object.values(purchasedMap));
//     } catch (err) {
//       console.error("FETCH ORDERS ERROR:", err);
//       setOrders([]);
//       setPurchasedProducts([]);
//     }
//     setLoading(false);
//   };

//   const buildNotifications = (orders) => {
//     const notifs = [];

//     orders.forEach((order) => {
//       notifs.push({
//         id: `placed-${order.id}`,
//         message: `Your order #${order.id} was placed with ${order.items.map(i => `${i.quantity} × ${i.product_title || i.product}`).join(", ")}.`,
//         date: order.created_at || order.date || new Date().toISOString(),
//       });

//       if (order.status === "shipped" || order.status === "delivered") {
//         notifs.push({
//           id: `shipped-${order.id}`,
//           message: `Your order #${order.id} has been shipped.`,
//           date: order.updated_at || new Date().toISOString(),
//         });
//       }

//       if (order.status === "delivered") {
//         notifs.push({
//           id: `delivered-${order.id}`,
//           message: `Your order #${order.id} has been delivered.`,
//           date: order.updated_at || new Date().toISOString(),
//         });
//       }
//     });

//     notifs.sort((a, b) => new Date(b.date) - new Date(a.date));
//     setNotifications(notifs);
//   };

//   const fetchUserReviews = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/user/reviews/`, { headers });
//       setUserReviews(res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch user reviews", err);
//     }
//   };

//   const loadCategory = (id) => {
//     setSelectedCategory(id);
//     const url = id ? `${BASE_URL}/products/?category=${id}` : `${BASE_URL}/products/`;
//     axios.get(url).then((res) => setAllProducts(res.data || []));
//   };

//   const searchProducts = () => {
//     const url = searchValue
//       ? `${BASE_URL}/products/?search=${encodeURIComponent(searchValue)}`
//       : `${BASE_URL}/products/`;
//     axios.get(url).then((res) => setAllProducts(res.data || []));
//   };

//   // -------------------- PROFILE FORM --------------------
//   const handleFormChange = (e) => {
//     setFormProfile({ ...formProfile, [e.target.name]: e.target.value });
//   };

//   const saveProfile = async (e) => {
//     e.preventDefault();
//     setSavingProfile(true);
//     try {
//       await axios.put(`${BASE_URL}/auth/profile/`, formProfile, { headers });
//       setProfile({ ...formProfile });
//       setFormProfile({ ...formProfile });
//       setProfileMessage("Profile updated successfully!");
//     } catch (err) {
//       console.error(err);
//       setProfileMessage("Failed to update profile.");
//     }
//     setSavingProfile(false);
//   };

//   // -------------------- REVIEW FORM --------------------
//   const handleReviewChange = (e) => {
//     setReviewForm({ ...reviewForm, [e.target.name]: e.target.value });
//   };

//   const submitReview = async (e) => {
//     e.preventDefault();
//     if (!reviewForm.product || !reviewForm.text || !reviewForm.rating) return;
//     setSavingReview(true);
//     try {
//       await axios.post(
//         `${BASE_URL}/products/${reviewForm.product}/reviews/`,
//         { text: reviewForm.text, rating: reviewForm.rating },
//         { headers }
//       );
//       setReviewForm({ product: "", text: "", rating: 5 });
//       fetchUserReviews();
//     } catch (err) {
//       console.error("Failed to submit review", err);
//     }
//     setSavingReview(false);
//   };

//   // -------------------- RENDER HELPERS --------------------
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
//           <li
//             key={order.id}
//             className="bg-white p-4 rounded shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
//           >
//             <span>Order #{order.id}</span>
//             <span>Status: {order.status}</span>
//             <span>Total: ₦{order.total}</span>
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   const renderNotifications = () => {
//     if (!notifications.length)
//       return (
//         <div className="text-center mt-20">
//           <img src="/empty-box.png" alt="empty" className="mx-auto w-28 opacity-60" />
//           <h3 className="text-lg mt-4 font-medium">No notifications</h3>
//         </div>
//       );

//     return (
//       <ul className="space-y-4 max-w-3xl mx-auto">
//         {notifications.map((notif) => (
//           <li
//             key={notif.id}
//             className="bg-white p-4 rounded shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
//           >
//             <p>{notif.message}</p>
//             <span className="text-xs text-gray-400">{new Date(notif.date).toLocaleString()}</span>
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   const handleViewProduct = (productId) => {
//     window.location.href = `/product/${productId}`;
//   };

//   if (checkingAuth) return <p className="text-center mt-20">Checking login...</p>;
//   if (!token) return null;

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <StoreHeader
//         searchValue={searchValue}
//         setSearchValue={setSearchValue}
//         searchProducts={searchProducts}
//         categories={categories}
//         loadCategory={loadCategory}
//         cartCount={0}
//         goHome={() => (window.location.href = "/")}
//         goToAccount={() => (window.location.href = "/signup")}
//         logo="/logo.png"
//         selectedCategory={selectedCategory}
//       />

//       <div className="flex flex-col md:flex-row w-full">
//         {/* Sidebar */}
//         <div className="w-full md:w-64 p-4 flex-shrink-0">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-semibold">Account</h2>
//             {profile.is_ambassador && (
//               <button
//                 onClick={() => (window.location.href = "/ambassador/dashboard")}
//                 className="text-xs px-3 py-1 rounded bg-orange-600 text-white hover:bg-orange-700 transition"
//               >
//                 Dashboard
//               </button>
//             )}
//           </div>

//           <ul className="flex md:flex-col justify-around md:justify-start space-x-2 md:space-x-0 md:space-y-2">
//             {menuItems.map((item) => (
//               <li
//                 key={item.id}
//                 onClick={() => setActive(item.id)}
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
//         <div className="flex-1 p-4 md:p-8 overflow-x-hidden">
//           {active === "orders" && (
//             <div>
//               <div className="flex flex-wrap gap-2 md:gap-4 border-b mb-4">
//                 {["all", "shipped", "delivered"].map((t) => (
//                   <button
//                     key={t}
//                     onClick={() => {
//                       setTab(t);
//                       fetchOrders(t);
//                     }}
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

//           {active === "profile" && (
//             <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
//               <h2 className="text-2xl font-semibold mb-6">Your Profile</h2>
//               <div className="flex flex-col md:flex-row gap-8">
//                 <div className="flex-1">
//                   <form onSubmit={saveProfile} className="space-y-4 bg-gray-50 p-4 rounded">
//                     {[ "full_name", "username", "email", "phone", "street", "city", "state", "country" ].map((field) => (
//                       <input
//                         key={field}
//                         type="text"
//                         name={field}
//                         placeholder={field.replace("_", " ").toUpperCase()}
//                         value={formProfile[field]}
//                         onChange={handleFormChange}
//                         disabled={field === "email"}
//                         className="w-full p-2 border rounded"
//                       />
//                     ))}
//                     <button
//                       type="submit"
//                       disabled={savingProfile}
//                       className="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700 transition"
//                     >
//                       {savingProfile ? "Saving..." : "Save Profile"}
//                     </button>
//                     {profileMessage && <p className="mt-2 text-center text-green-600">{profileMessage}</p>}
//                   </form>
//                 </div>

//                 <div className="flex-1 bg-gray-50 p-4 rounded">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 font-medium">
//                     {Object.entries(profile).map(([key, value]) => (
//                       <React.Fragment key={key}>
//                         <p>{key.replace("_", " ").toUpperCase()}:</p>
//                         <p>{String(value) || "-"}</p>
//                       </React.Fragment>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {active === "reviews" && (
//             <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow space-y-6">
//               <h2 className="text-2xl font-semibold">Your Reviews</h2>
//               <form onSubmit={submitReview} className="bg-gray-50 p-4 rounded space-y-4">
//                 <h3 className="text-lg font-semibold">Write a Review</h3>
//                 <select
//                   name="product"
//                   value={reviewForm.product}
//                   onChange={handleReviewChange}
//                   className="w-full p-2 border rounded"
//                   required
//                 >
//                   <option value="">Select a product</option>
//                   {purchasedProducts.map((product) => (
//                     <option key={product.id} value={product.id}>{product.title}</option>
//                   ))}
//                 </select>

//                 <textarea
//                   name="text"
//                   value={reviewForm.text}
//                   onChange={handleReviewChange}
//                   placeholder="Write your review..."
//                   className="w-full p-2 border rounded"
//                   rows={4}
//                   required
//                 />

//                 <div className="flex items-center gap-1">
//                   {[1,2,3,4,5].map((star)=>(
//                     <FaStar
//                       key={star}
//                       className={`cursor-pointer transition ${star <= reviewForm.rating ? "text-yellow-400" : "text-gray-300"}`}
//                       onClick={()=>setReviewForm({...reviewForm,rating:star})}
//                       size={20}
//                     />
//                   ))}
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={savingReview}
//                   className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
//                 >
//                   {savingReview ? "Submitting..." : "Submit Review"}
//                 </button>
//               </form>

//               {!userReviews.length ? (
//                 <p className="text-gray-500">No reviews yet.</p>
//               ) : (
//                 <div className="space-y-4">
//                   {userReviews.map((review) => (
//                     <div key={review.id} className="border p-3 rounded bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
//                       <div>
//                         <p className="font-semibold">{review.product_title ?? "Product"}</p>
//                         <p className="text-sm text-gray-700">{String(review.text)}</p>
//                         <p className="flex items-center gap-1 text-yellow-500">
//                           {[1,2,3,4,5].map((star)=>(
//                             <FaStar key={star} className={star <= review.rating ? "text-yellow-500" : "text-gray-300"} />
//                           ))}
//                         </p>
//                       </div>
//                       <span className="text-xs text-gray-500">{review.date ? new Date(review.date).toLocaleString() : ""}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {active === "notifications" && renderNotifications()}

//           {/* All products */}
//           <div className="max-w-6xl mx-auto mt-10 px-2 md:px-4">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">All Products</h2>
//             <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//               {allProducts.map((product) => {
//                 const price = typeof product.price === "string" ? Number(product.price.replace(/[^\d.]/g, "")) : product.price;
//                 const oldPrice = typeof product.old_price === "string" ? Number(product.old_price.replace(/[^\d.]/g, "")) : product.old_price;

//                 return (
//                   <div
//                     key={product.id}
//                     className="bg-white rounded-lg shadow-sm border p-3 hover:shadow-md transition cursor-pointer"
//                     onClick={() => handleViewProduct(product.id)}
//                   >
//                     <div className="w-full h-40 bg-gray-100 rounded overflow-hidden">
//                       <img src={product.images?.[0]?.image} className="w-full h-full object-cover" alt={product.title} />
//                     </div>

//                     <h3 className="mt-2 text-sm font-semibold text-gray-800 line-clamp-2">
//                       {product.title}
//                     </h3>

//                     <div className="mt-1">
//                       <p className="text-red-600 font-bold">₦{price?.toLocaleString()}</p>
//                       {oldPrice && <p className="text-gray-400 line-through text-xs">₦{oldPrice?.toLocaleString()}</p>}
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
import { FaFileInvoice, FaStar, FaUser, FaBell } from "react-icons/fa";
import { StoreHeader } from "../components/StoreHeader";

export default function AccountPage() {
  const [active, setActive] = useState("orders");
  const [tab, setTab] = useState("all");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const [profile, setProfile] = useState({
    full_name: "",
    username: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    country: "",
    is_ambassador: false,
  });
  const [formProfile, setFormProfile] = useState({ ...profile });
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");

  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [checkingAuth, setCheckingAuth] = useState(true);

  const [userReviews, setUserReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ product: "", text: "", rating: 5 });
  const [savingReview, setSavingReview] = useState(false);

  const BASE_URL = "https://recabitesnetwork.com/store";

  const menuItems = [
    { id: "orders", label: "Your orders", icon: <FaFileInvoice /> },
    { id: "reviews", label: "Your reviews", icon: <FaStar /> },
    { id: "profile", label: "Your profile", icon: <FaUser /> },
    { id: "notifications", label: "Notifications", icon: <FaBell /> },
  ];

  const [token, setToken] = useState(sessionStorage.getItem("access_token"));
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  // -------------------- CHECK TOKEN ON MOUNT --------------------
  useEffect(() => {
    const currentToken = sessionStorage.getItem("access_token");
    if (!currentToken) {
      window.location.href = "/login";
      return;
    }

    setToken(currentToken); // store in state to persist for this tab

    const init = async () => {
      try {
        await fetchProfile();
        await fetchCategories();
        await fetchAllProducts();
        await fetchOrders("all");
        await fetchUserReviews();
      } catch (err) {
        console.error(err);
        sessionStorage.removeItem("access_token");
        window.location.href = "/login";
      } finally {
        setCheckingAuth(false);
      }
    };

    init();
  }, []);

  // -------------------- FETCH FUNCTIONS --------------------
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/auth/profile/`, { headers });
      const data = res.data;
      const formattedProfile = {
        full_name: data.full_name || "",
        username: data.username || "",
        email: data.email || "",
        phone: data.phone || "",
        street: data.street || "",
        city: data.city || "",
        state: data.state || "",
        country: data.country || "",
        is_ambassador: data.is_ambassador || false,
      };
      setProfile(formattedProfile);
      setFormProfile(formattedProfile);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/categories/`);
      setCategories(res.data || []);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/products/`);
      setAllProducts(res.data || []);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  const fetchOrders = async (status = "all") => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/orders/user/`, { headers });
      let orderData = Array.isArray(res.data) ? res.data : [];

      if (status !== "all") {
        orderData = orderData.filter(order => order.status === status);
      }

      setOrders(orderData);
      buildNotifications(orderData);

      const purchasedMap = {};
      orderData.forEach(order => {
        order.items?.forEach(item => {
          const productId = item.product?.id || item.product_id || item.id;
          const productTitle = item.product?.title || item.product_title || "Unknown Product";
          if (productId && !purchasedMap[productId]) {
            purchasedMap[productId] = { id: productId, title: productTitle };
          }
        });
      });
      setPurchasedProducts(Object.values(purchasedMap));
    } catch (err) {
      console.error("FETCH ORDERS ERROR:", err);
      setOrders([]);
      setPurchasedProducts([]);
    }
    setLoading(false);
  };

  const buildNotifications = (orders) => {
    const notifs = [];
    orders.forEach(order => {
      notifs.push({
        id: `placed-${order.id}`,
        message: `Your order #${order.id} was placed with ${order.items.map(i => `${i.quantity} × ${i.product_title || i.product}`).join(", ")}.`,
        date: order.created_at || order.date || new Date().toISOString(),
      });
      if (["shipped", "delivered"].includes(order.status)) {
        notifs.push({
          id: `shipped-${order.id}`,
          message: `Your order #${order.id} has been shipped.`,
          date: order.updated_at || new Date().toISOString(),
        });
      }
      if (order.status === "delivered") {
        notifs.push({
          id: `delivered-${order.id}`,
          message: `Your order #${order.id} has been delivered.`,
          date: order.updated_at || new Date().toISOString(),
        });
      }
    });
    notifs.sort((a, b) => new Date(b.date) - new Date(a.date));
    setNotifications(notifs);
  };

  const fetchUserReviews = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/reviews/`, { headers });
      setUserReviews(res.data || []);
    } catch (err) {
      console.error("Failed to fetch user reviews", err);
    }
  };

  const loadCategory = (id) => {
    setSelectedCategory(id);
    const url = id ? `${BASE_URL}/products/?category=${id}` : `${BASE_URL}/products/`;
    axios.get(url).then((res) => setAllProducts(res.data || []));
  };

  const searchProducts = () => {
    const url = searchValue
      ? `${BASE_URL}/products/?search=${encodeURIComponent(searchValue)}`
      : `${BASE_URL}/products/`;
    axios.get(url).then((res) => setAllProducts(res.data || []));
  };

  // -------------------- PROFILE FORM --------------------
  const handleFormChange = (e) => {
    setFormProfile({ ...formProfile, [e.target.name]: e.target.value });
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      await axios.put(`${BASE_URL}/auth/profile/`, formProfile, { headers });
      setProfile({ ...formProfile });
      setFormProfile({ ...formProfile });
      setProfileMessage("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setProfileMessage("Failed to update profile.");
    }
    setSavingProfile(false);
  };

  // -------------------- REVIEW FORM --------------------
  const handleReviewChange = (e) => {
    setReviewForm({ ...reviewForm, [e.target.name]: e.target.value });
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!reviewForm.product || !reviewForm.text || !reviewForm.rating) return;
    setSavingReview(true);
    try {
      await axios.post(
        `${BASE_URL}/products/${reviewForm.product}/reviews/`,
        { text: reviewForm.text, rating: reviewForm.rating },
        { headers }
      );
      setReviewForm({ product: "", text: "", rating: 5 });
      fetchUserReviews();
    } catch (err) {
      console.error("Failed to submit review", err);
    }
    setSavingReview(false);
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
          <li
            key={order.id}
            className="bg-white p-4 rounded shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
          >
            <span>Order #{order.id}</span>
            <span>Status: {order.status}</span>
            <span>Total: ₦{order.total}</span>
          </li>
        ))}
      </ul>
    );
  };

  const renderNotifications = () => {
    if (!notifications.length)
      return (
        <div className="text-center mt-20">
          <img src="/empty-box.png" alt="empty" className="mx-auto w-28 opacity-60" />
          <h3 className="text-lg mt-4 font-medium">No notifications</h3>
        </div>
      );

    return (
      <ul className="space-y-4 max-w-3xl mx-auto">
        {notifications.map((notif) => (
          <li
            key={notif.id}
            className="bg-white p-4 rounded shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
          >
            <p>{notif.message}</p>
            <span className="text-xs text-gray-400">{new Date(notif.date).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    );
  };

  const handleViewProduct = (productId) => {
    window.location.href = `/product/${productId}`;
  };

  if (checkingAuth) return <p className="text-center mt-20">Checking login...</p>;
  if (!token) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <StoreHeader
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchProducts={searchProducts}
        categories={categories}
        loadCategory={loadCategory}
        cartCount={0}
        goHome={() => (window.location.href = "/")}
        goToAccount={() => (window.location.href = "/account")}
        logo="/logo.png"
        selectedCategory={selectedCategory}
      />

      <div className="flex flex-col md:flex-row w-full">
        {/* Sidebar */}
        <div className="w-full md:w-64 p-4 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Account</h2>
            {profile.is_ambassador && (
              <button
                onClick={() => (window.location.href = "/ambassador/dashboard")}
                className="text-xs px-3 py-1 rounded bg-orange-600 text-white hover:bg-orange-700 transition"
              >
                Dashboard
              </button>
            )}
          </div>

          <ul className="flex md:flex-col justify-around md:justify-start space-x-2 md:space-x-0 md:space-y-2">
            {menuItems.map((item) => (
              <li
                key={item.id}
                onClick={() => setActive(item.id)}
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
        <div className="flex-1 p-4 md:p-8 overflow-x-hidden">
          {/* {active === "orders" && (
            <div>
              <div className="flex flex-wrap gap-2 md:gap-4 border-b mb-4">
                {["all orders", "processing", "shipped", "unpaid", "delivered"].map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTab(t);
                      fetchOrders(t);
                    }}
                    className={`px-4 py-2 -mb-px border-b-2 font-medium transition
                      ${tab === t ? "border-orange-600 text-orange-600" : "border-transparent text-gray-600 hover:text-orange-500"}`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
              {renderOrders()}
            </div>
          )} */}
          {active === "orders" && (
            <div>
              <div className="flex flex-wrap gap-2 md:gap-4 border-b mb-4">
                {[
                  { label: "All Orders", value: "all" },
                  { label: "Processing", value: "processing" },
                  { label: "Shipped", value: "shipped" },
                  { label: "Unpaid", value: "unpaid" },
                  { label: "Delivered", value: "delivered" },
                ].map((t) => (
                  <button
                    key={t.value}
                    onClick={() => {
                      setTab(t.value);
                      fetchOrders(t.value);
                    }}
                    className={`px-4 py-2 -mb-px border-b-2 font-medium transition
            ${tab === t.value
                        ? "border-orange-600 text-orange-600"
                        : "border-transparent text-gray-600 hover:text-orange-500"
                      }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {renderOrders()}
            </div>
          )}


          {active === "profile" && (
            <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
              <h2 className="text-2xl font-semibold mb-6">Your Profile</h2>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <form onSubmit={saveProfile} className="space-y-4 bg-gray-50 p-4 rounded">
                    {["full_name", "username", "email", "phone", "street", "city", "state", "country"].map((field) => (
                      <input
                        key={field}
                        type="text"
                        name={field}
                        placeholder={field.replace("_", " ").toUpperCase()}
                        value={formProfile[field]}
                        onChange={handleFormChange}
                        disabled={field === "email"}
                        className="w-full p-2 border rounded"
                      />
                    ))}
                    <button
                      type="submit"
                      disabled={savingProfile}
                      className="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700 transition"
                    >
                      {savingProfile ? "Saving..." : "Save Profile"}
                    </button>
                    {profileMessage && <p className="mt-2 text-center text-green-600">{profileMessage}</p>}
                  </form>
                </div>

                <div className="flex-1 bg-gray-50 p-4 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 font-medium">
                    {Object.entries(profile).map(([key, value]) => (
                      <React.Fragment key={key}>
                        <p>{key.replace("_", " ").toUpperCase()}:</p>
                        <p>{String(value) || "-"}</p>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {active === "reviews" && (
            <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow space-y-6">
              <h2 className="text-2xl font-semibold">Your Reviews</h2>
              <form onSubmit={submitReview} className="bg-gray-50 p-4 rounded space-y-4">
                <h3 className="text-lg font-semibold">Write a Review</h3>
                <select
                  name="product"
                  value={reviewForm.product}
                  onChange={handleReviewChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select a product</option>
                  {purchasedProducts.map((product) => (
                    <option key={product.id} value={product.id}>{product.title}</option>
                  ))}
                </select>

                <textarea
                  name="text"
                  value={reviewForm.text}
                  onChange={handleReviewChange}
                  placeholder="Write your review..."
                  className="w-full p-2 border rounded"
                  rows={4}
                  required
                />

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`cursor-pointer transition ${star <= reviewForm.rating ? "text-yellow-400" : "text-gray-300"}`}
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      size={20}
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={savingReview}
                  className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
                >
                  {savingReview ? "Submitting..." : "Submit Review"}
                </button>
              </form>

              {!userReviews.length ? (
                <p className="text-gray-500">No reviews yet.</p>
              ) : (
                <div className="space-y-4">
                  {userReviews.map((review) => (
                    <div key={review.id} className="border p-3 rounded bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <p className="font-semibold">{review.product_title ?? "Product"}</p>
                        <p className="text-sm text-gray-700">{String(review.text)}</p>
                        <p className="flex items-center gap-1 text-yellow-500">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar key={star} className={star <= review.rating ? "text-yellow-500" : "text-gray-300"} />
                          ))}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500">{review.date ? new Date(review.date).toLocaleString() : ""}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {active === "notifications" && renderNotifications()}

          {/* All products */}
          <div className="max-w-6xl mx-auto mt-10 px-2 md:px-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">All Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {allProducts.map((product) => {
                const price = typeof product.price === "string" ? Number(product.price.replace(/[^\d.]/g, "")) : product.price;
                const oldPrice = typeof product.old_price === "string" ? Number(product.old_price.replace(/[^\d.]/g, "")) : product.old_price;

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm border p-3 hover:shadow-md transition cursor-pointer"
                    onClick={() => handleViewProduct(product.id)}
                  >
                    <div className="w-full h-40 bg-gray-100 rounded overflow-hidden">
                      <img src={product.images?.[0]?.image} className="w-full h-full object-cover" alt={product.title} />
                    </div>

                    <h3 className="mt-2 text-sm font-semibold text-gray-800 line-clamp-2">
                      {product.title}
                    </h3>

                    <div className="mt-1">
                      <p className="text-red-600 font-bold">₦{price?.toLocaleString()}</p>
                      {oldPrice && <p className="text-gray-400 line-through text-xs">₦{oldPrice?.toLocaleString()}</p>}
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
