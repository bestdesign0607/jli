// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function CheckoutAddress() {
//   const navigate = useNavigate();
//   const storedEmail = localStorage.getItem("checkoutEmail");

//   useEffect(() => {
//     if (!storedEmail) navigate("/checkout/email"); // enforce email first
//   }, [storedEmail, navigate]);

//   const [address, setAddress] = useState({
//     fullname: "",
//     phone: "",
//     street: "",
//     city: "",
//     state: "",
//     country: "",
//   });

//   const handleNext = () => {
//     const empty = Object.values(address).some((v) => !v.trim());
//     if (empty) return alert("Please fill all fields");
//     localStorage.setItem("checkoutAddress", JSON.stringify(address));
//     navigate("/checkout/payment");
//   };

//   return (
//     <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow space-y-3">
//       <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
//       {Object.keys(address).map((key) => (
//         <input
//           key={key}
//           placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
//           value={address[key]}
//           onChange={(e) =>
//             setAddress({ ...address, [key]: e.target.value })
//           }
//           className="w-full border p-3 rounded"
//         />
//       ))}
//       <button
//         onClick={handleNext}
//         className="w-full bg-[#003366] text-white py-3 rounded"
//       >
//         Next
//       </button>
//     </div>
//   );
// }











// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function CheckoutAddress() {
//   const navigate = useNavigate();
//   const storedEmail = localStorage.getItem("checkoutEmail");

//   // Ensure user verified email before accessing address
//   useEffect(() => {
//     if (!storedEmail) navigate("/checkout/email");
//   }, [storedEmail, navigate]);

//   const [address, setAddress] = useState({
//     fullname: "",
//     phone: "",
//     street: "",
//     city: "",
//     state: "",
//     country: "",
//   });

//   const handleNext = () => {
//     const empty = Object.values(address).some((v) => !v.trim());
//     if (empty) return alert("Please fill all fields");
//     localStorage.setItem("checkoutAddress", JSON.stringify(address));
//     navigate("/checkout/payment"); // go to payment step
//   };

//   return (
//     <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow space-y-3">
//       <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
//       {Object.keys(address).map((key) => (
//         <input
//           key={key}
//           placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
//           value={address[key]}
//           onChange={(e) =>
//             setAddress({ ...address, [key]: e.target.value })
//           }
//           className="w-full border p-3 rounded"
//         />
//       ))}
//       <button
//         onClick={handleNext}
//         className="w-full bg-[#003366] text-white py-3 rounded"
//       >
//         Proceed to Payment
//       </button>
//     </div>
//   );
// }









// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { StoreHeader } from "../components/StoreHeader";

// export default function CheckoutAddress() {
//   const navigate = useNavigate();
//   const storedEmail = localStorage.getItem("checkoutEmail");

//   // Ensure user verified email before accessing address
//   useEffect(() => {
//     if (!storedEmail) navigate("/checkout/email");
//   }, [storedEmail, navigate]);

//   const [address, setAddress] = useState({
//     fullname: "",
//     phone: "",
//     street: "",
//     city: "",
//     state: "",
//     country: "",
//   });

//   const handleNext = () => {
//     const empty = Object.values(address).some((v) => !v.trim());
//     if (empty) return alert("Please fill all fields");
//     localStorage.setItem("checkoutAddress", JSON.stringify(address));
//     navigate("/checkout/payment"); // go to payment step
//   };

//   // Header & Products state
//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [allProducts, setAllProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);

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

//       {/* SHIPPING ADDRESS FORM */}
//       <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow space-y-3">
//         <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
//         {Object.keys(address).map((key) => (
//           <input
//             key={key}
//             placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
//             value={address[key]}
//             onChange={(e) => setAddress({ ...address, [key]: e.target.value })}
//             className="w-full border p-3 rounded"
//           />
//         ))}
//         <button
//           onClick={handleNext}
//           className="w-full bg-[#003366] text-white py-3 rounded"
//         >
//           Proceed to Payment
//         </button>
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









import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreHeader } from "../components/StoreHeader";

export default function CheckoutAddress() {
  const navigate = useNavigate();
  const storedEmail = localStorage.getItem("checkoutEmail");

  useEffect(() => {
    if (!storedEmail) navigate("/checkout/email");
  }, [storedEmail, navigate]);

  const [address, setAddress] = useState({
    fullname: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    country: "",
  });

  const handleNext = () => {
    const empty = Object.values(address).some((v) => !v.trim());
    if (empty) return alert("Please fill all fields");
    localStorage.setItem("checkoutAddress", JSON.stringify(address));
    navigate("/checkout/payment");
  };

  // Header & Products
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const BASE_URL = "http://127.0.0.1:8000/store";

  useEffect(() => {
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

    fetchCategories();
    fetchAllProducts();
  }, []);

  const loadCategory = (id) => {
    setSelectedCategory(id || "all");
    const url = id ? `${BASE_URL}/products/?category=${id}` : `${BASE_URL}/products/`;
    axios.get(url).then((res) => setAllProducts(res.data || []));
  };

  const searchProducts = () => {
    const url = searchValue
      ? `${BASE_URL}/products/?search=${encodeURIComponent(searchValue)}`
      : `${BASE_URL}/products/`;
    axios.get(url).then((res) => setAllProducts(res.data || []));
  };

  const goHome = () => (window.location.href = "/");
  const goToAccount = () => (window.location.href = "/signup");

  const handleViewProduct = (productId) => navigate(`/product/${productId}`);

  return (
    <div className="min-h-screen bg-gray-100 pb-10">
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

      {/* SHIPPING ADDRESS FORM */}
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow space-y-3">
        <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
        {Object.keys(address).map((key) => (
          <input
            key={key}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            value={address[key]}
            onChange={(e) => setAddress({ ...address, [key]: e.target.value })}
            className="w-full border p-3 rounded"
          />
        ))}
        <button
          onClick={handleNext}
          className="w-full bg-[#003366] text-white py-3 rounded"
        >
          Proceed to Payment
        </button>
      </div>

      {/* ALL PRODUCTS BELOW */}
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
                    src={product.images?.[0]?.image || "/placeholder.png"}
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
  );
}
