// import React from "react";

// export default function CheckoutSuccess() {
//   return (
//     <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow text-center">
//       <h2 className="text-2xl font-bold text-green-600 mb-2">
//         🎉 Order Completed!
//       </h2>
//       <p className="text-gray-600">Thank you for your purchase.</p>
//     </div>
//   );
// }






// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { StoreHeader } from "../components/StoreHeader";
// import { useNavigate } from "react-router-dom";

// export default function CheckoutSuccess() {
//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [allProducts, setAllProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const navigate = useNavigate();
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

//   const handleViewProduct = (productId) => {
//     navigate(`/product/${productId}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 pb-10">
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

//       {/* SUCCESS MESSAGE */}
//       <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow text-center">
//         <h2 className="text-2xl font-bold text-green-600 mb-2">
//           🎉 Order Completed!
//         </h2>
//         <p className="text-gray-600">Thank you for your purchase.</p>
//       </div>

//       {/* ALL PRODUCTS BELOW */}
//       <div className="max-w-6xl mx-auto mt-10 px-4">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">All Products</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {allProducts.map((product) => {
//             const price =
//               typeof product.price === "string"
//                 ? Number(product.price.replace(/[^\d.]/g, ""))
//                 : product.price;

//             const oldPrice =
//               typeof product.old_price === "string"
//                 ? Number(product.old_price.replace(/[^\d.]/g, ""))
//                 : product.old_price;

//             return (
//               <div
//                 key={product.id}
//                 className="bg-white rounded-lg shadow-sm border p-3 hover:shadow-md transition cursor-pointer"
//                 onClick={() => handleViewProduct(product.id)}
//               >
//                 <div className="w-full h-40 bg-gray-100 rounded overflow-hidden">
//                   <img
//                     src={product.images?.[0]?.image}
//                     className="w-full h-full object-cover"
//                     alt={product.title}
//                   />
//                 </div>

//                 <h3 className="mt-2 text-sm font-semibold text-gray-800 line-clamp-2">
//                   {product.title}
//                 </h3>

//                 <div className="mt-1">
//                   <p className="text-red-600 font-bold">₦{price?.toLocaleString()}</p>
//                   {oldPrice && (
//                     <p className="text-gray-400 line-through text-xs">
//                       ₦{oldPrice?.toLocaleString()}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }










// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { StoreHeader } from "../components/StoreHeader";
// import { useNavigate, useLocation } from "react-router-dom";
// import { QualificationModal } from "../components/QualificationModal";

// export default function CheckoutSuccess() {
//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [allProducts, setAllProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [qualifies, setQualifies] = useState(false);
//   const [profit, setProfit] = useState(0);
//   const [showModal, setShowModal] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const BASE_URL = "http://127.0.0.1:8000/store";

//   // Get orderId from query params
//   const searchParams = new URLSearchParams(location.search);
//   const orderId = searchParams.get("order_id");

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

//   // Confirm payment and check qualification
//   useEffect(() => {
//     if (!orderId) return;

//     const confirmPayment = async () => {
//       try {
//         const res = await axios.post(`${BASE_URL}/confirm-payment/`, {
//           order_id: orderId,
//         });

//         if (res.data?.qualifies) {
//           setQualifies(true);
//           setProfit(res.data.profit);
//           setShowModal(true); // show modal if qualifies
//         }
//       } catch (err) {
//         console.error("Payment confirmation failed", err);
//       }
//     };

//     confirmPayment();
//   }, [orderId]);

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

//   const handleViewProduct = (productId) => {
//     navigate(`/product/${productId}`);
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//   };

//   const handleSubscribe = async (formData) => {
//     try {
//       // send ambassador signup request to backend
//       await axios.post("http://127.0.0.1:8000/network/ambassador/signup/", {
//         ...formData,
//         profit,
//         order_id: orderId,
//       });

//       alert("Successfully subscribed as an Ambassador!");
//       setShowModal(false);
//     } catch (err) {
//       console.error("Subscription failed:", err);
//       alert("Failed to subscribe. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 pb-10">
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

//       {/* SUCCESS MESSAGE */}
//       <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow text-center">
//         <h2 className="text-2xl font-bold text-green-600 mb-2">🎉 Order Completed!</h2>
//         <p className="text-gray-600">Thank you for your purchase.</p>

//         {/* Qualifying message */}
//         {qualifies && (
//           <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
//             <p className="text-yellow-800 font-medium">
//               Your purchase qualifies for our Ambassador program!
//             </p>
//             <button
//               onClick={() => setShowModal(true)}
//               className="mt-2 px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
//             >
//               Become an Ambassador
//             </button>
//           </div>
//         )}
//       </div>

//       {/* ALL PRODUCTS BELOW */}
//       <div className="max-w-6xl mx-auto mt-10 px-4">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">All Products</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {allProducts.map((product) => {
//             const price =
//               typeof product.price === "string"
//                 ? Number(product.price.replace(/[^\d.]/g, ""))
//                 : product.price;

//             const oldPrice =
//               typeof product.old_price === "string"
//                 ? Number(product.old_price.replace(/[^\d.]/g, ""))
//                 : product.old_price;

//             return (
//               <div
//                 key={product.id}
//                 className="bg-white rounded-lg shadow-sm border p-3 hover:shadow-md transition cursor-pointer"
//                 onClick={() => handleViewProduct(product.id)}
//               >
//                 <div className="w-full h-40 bg-gray-100 rounded overflow-hidden">
//                   <img
//                     src={product.images?.[0]?.image}
//                     className="w-full h-full object-cover"
//                     alt={product.title}
//                   />
//                 </div>

//                 <h3 className="mt-2 text-sm font-semibold text-gray-800 line-clamp-2">
//                   {product.title}
//                 </h3>

//                 <div className="mt-1">
//                   <p className="text-red-600 font-bold">₦{price?.toLocaleString()}</p>
//                   {oldPrice && (
//                     <p className="text-gray-400 line-through text-xs">₦{oldPrice?.toLocaleString()}</p>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Qualification Modal */}
//       {showModal && (
//         <QualificationModal
//           onClose={handleModalClose}
//           onSubscribe={handleSubscribe}
//         />
//       )}
//     </div>
//   );
// }
 










// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { StoreHeader } from "../components/StoreHeader";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function CheckoutSuccess() {
//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [allProducts, setAllProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const [qualifies, setQualifies] = useState(false);
//   const [profit, setProfit] = useState(0);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const BASE_URL = "http://127.0.0.1:8000/store";

//   // Get orderId from query params
//   const searchParams = new URLSearchParams(location.search);
//   const orderId = searchParams.get("order_id");

//   /**
//    * Fetch header data
//    */
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

//   /**
//    * Confirm payment + qualification
//    */
//   useEffect(() => {
//     if (!orderId) return;

//     const confirmPayment = async () => {
//       try {
//         const res = await axios.post(`${BASE_URL}/confirm-payment/`, {
//           order_id: orderId,
//         });

//         if (res.data?.qualifies) {
//           setQualifies(true);
//           setProfit(res.data.profit);
//         }
//       } catch (err) {
//         console.error("Payment confirmation failed", err);
//       }
//     };

//     confirmPayment();
//   }, [orderId]);

//   /**
//    * Filters & search
//    */
//   const loadCategory = (id) => {
//     setSelectedCategory(id);
//     const url = id
//       ? `${BASE_URL}/products/?category=${id}`
//       : `${BASE_URL}/products/`;
//     axios.get(url).then((res) => setAllProducts(res.data || []));
//   };

//   const searchProducts = () => {
//     const url = searchValue
//       ? `${BASE_URL}/products/?search=${encodeURIComponent(searchValue)}`
//       : `${BASE_URL}/products/`;
//     axios.get(url).then((res) => setAllProducts(res.data || []));
//   };

//   const goHome = () => (window.location.href = "/");
//   const goToAccount = () => (window.location.href = "/signup");

//   const handleViewProduct = (productId) => {
//     navigate(`/product/${productId}`);
//   };

//   /**
//    * ✅ Navigate to Ambassador Signup page
//    */
//   const goToAmbassadorSignup = () => {
//     navigate("/ambassador/signup", {
//       state: {
//         profit,
//         order_id: orderId,
//       },
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 pb-10">
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

//       {/* SUCCESS MESSAGE */}
//       <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow text-center">
//         <h2 className="text-2xl font-bold text-green-600 mb-2">
//           🎉 Order Completed!
//         </h2>
//         <p className="text-gray-600">Thank you for your purchase.</p>

//         {/* ✅ Qualification CTA */}
//         {qualifies && (
//           <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
//             <p className="text-yellow-800 font-medium">
//               Your purchase qualifies you to become an Ambassador 🎯
//             </p>

//             <button
//               onClick={goToAmbassadorSignup}
//               className="mt-3 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
//             >
//               Become an Ambassador
//             </button>
//           </div>
//         )}
//       </div>

//       {/* ALL PRODUCTS */}
//       <div className="max-w-6xl mx-auto mt-10 px-4">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">
//           Continue Shopping
//         </h2>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {allProducts.map((product) => {
//             const price = Number(
//               typeof product.price === "string"
//                 ? product.price.replace(/[^\d.]/g, "")
//                 : product.price
//             );

//             const oldPrice = product.old_price
//               ? Number(
//                   typeof product.old_price === "string"
//                     ? product.old_price.replace(/[^\d.]/g, "")
//                     : product.old_price
//                 )
//               : null;

//             return (
//               <div
//                 key={product.id}
//                 className="bg-white rounded-lg shadow-sm border p-3 hover:shadow-md transition cursor-pointer"
//                 onClick={() => handleViewProduct(product.id)}
//               >
//                 <div className="w-full h-40 bg-gray-100 rounded overflow-hidden">
//                   <img
//                     src={product.images?.[0]?.image}
//                     className="w-full h-full object-cover"
//                     alt={product.title}
//                   />
//                 </div>

//                 <h3 className="mt-2 text-sm font-semibold text-gray-800 line-clamp-2">
//                   {product.title}
//                 </h3>

//                 <div className="mt-1">
//                   <p className="text-red-600 font-bold">
//                     ₦{price?.toLocaleString()}
//                   </p>
//                   {oldPrice && (
//                     <p className="text-gray-400 line-through text-xs">
//                       ₦{oldPrice?.toLocaleString()}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }











import React, { useState, useEffect } from "react";
import axios from "axios";
import { StoreHeader } from "../components/StoreHeader";
import { useNavigate, useLocation } from "react-router-dom";

export default function CheckoutSuccess() {
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [qualifies, setQualifies] = useState(false);
  const [profit, setProfit] = useState(0);
  const [loadingOrder, setLoadingOrder] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const BASE_URL = "http://127.0.0.1:8000/store";
  const token = localStorage.getItem("access_token");

  // ✅ get order_id from URL
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");

  /* ----------------------------------
     Header data
  ---------------------------------- */
  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          axios.get(`${BASE_URL}/categories/`),
          axios.get(`${BASE_URL}/products/`),
        ]);

        setCategories(catRes.data || []);
        setAllProducts(prodRes.data || []);
      } catch (err) {
        console.error("Header fetch failed", err);
      }
    };

    fetchHeaderData();
  }, []);

  /* ----------------------------------
     ✅ Fetch order status ONLY
  ---------------------------------- */
  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/orders/${orderId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setQualifies(Boolean(res.data.is_qualifying));
        setProfit(res.data.profit || 0);
      } catch (err) {
        console.error("Failed to fetch order", err);
      } finally {
        setLoadingOrder(false);
      }
    };

    fetchOrder();
  }, [orderId, token]);

  /* ----------------------------------
     Filters & navigation
  ---------------------------------- */
  const loadCategory = (id) => {
    setSelectedCategory(id);
    const url = id
      ? `${BASE_URL}/products/?category=${id}`
      : `${BASE_URL}/products/`;

    axios.get(url).then((res) => setAllProducts(res.data || []));
  };

  const searchProducts = () => {
    const url = searchValue
      ? `${BASE_URL}/products/?search=${encodeURIComponent(searchValue)}`
      : `${BASE_URL}/products/`;

    axios.get(url).then((res) => setAllProducts(res.data || []));
  };

  const goHome = () => navigate("/");
  const goToAccount = () => navigate("/signup");

  const handleViewProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  /* ----------------------------------
     ✅ Ambassador CTA
  ---------------------------------- */
  const goToAmbassadorSignup = () => {
    navigate("/ambassador/signup", {
      state: {
        order_id: orderId,
        profit,
      },
    });
  };

  /* ----------------------------------
     UI
  ---------------------------------- */
  return (
    <div className="min-h-screen bg-gray-100 pb-10">
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

      {/* SUCCESS CARD */}
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-2">
          🎉 Order Completed!
        </h2>

        <p className="text-gray-600 mb-3">
          Thank you for your purchase.
        </p>

        {loadingOrder && (
          <p className="text-sm text-gray-400">Checking qualification…</p>
        )}

        {/* ✅ QUALIFICATION CTA */}
        {!loadingOrder && qualifies && (
          <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <p className="text-yellow-800 font-medium">
              Your purchase qualifies you to become an Ambassador 🎯
            </p>

            <p className="text-sm text-gray-600 mt-1">
              Earn from referral rewards and level commissions.
            </p>

            <button
              onClick={goToAmbassadorSignup}
              className="mt-3 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
            >
              Become an Ambassador
            </button>
          </div>
        )}
      </div>

      {/* PRODUCTS */}
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Continue Shopping
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {allProducts.map((product) => {
            const price = Number(product.price || 0);
            const oldPrice = product.old_price
              ? Number(product.old_price)
              : null;

            return (
              <div
                key={product.id}
                onClick={() => handleViewProduct(product.id)}
                className="bg-white rounded-lg shadow-sm border p-3 hover:shadow-md transition cursor-pointer"
              >
                <div className="w-full h-40 bg-gray-100 rounded overflow-hidden">
                  <img
                    src={product.images?.[0]?.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="mt-2 text-sm font-semibold text-gray-800 line-clamp-2">
                  {product.title}
                </h3>

                <div className="mt-1">
                  <p className="text-red-600 font-bold">
                    ₦{price.toLocaleString()}
                  </p>

                  {oldPrice && (
                    <p className="text-gray-400 line-through text-xs">
                      ₦{oldPrice.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
