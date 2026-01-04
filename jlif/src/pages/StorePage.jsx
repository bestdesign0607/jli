// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ProductCard } from "../components/ProductCard";
// import { ProductPage } from "../components/ProductPage";
// // import { CartDrawer } from "../components/CartDrawer";

// import { FaSearch, FaUserCircle, FaHeadset } from "react-icons/fa";
// import { HiShoppingCart } from "react-icons/hi";

// export const StorePage = () => {
//   const [allProducts, setAllProducts] = useState([]);
//   const [bestSelling, setBestSelling] = useState([]);
//   const [fiveStar, setFiveStar] = useState([]);
//   const [newIn, setNewIn] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [searchValue, setSearchValue] = useState("");
//   const [cartCount, setCartCount] = useState(0);

//   const BASE_URL = "http://127.0.0.1:8000/store";

//   // -------------------------------
//   // Helpers
//   // -------------------------------
//   const formatNumber = (num) =>
//     new Intl.NumberFormat("en-NG", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(num);

//   const cleanPrice = (raw) => {
//     if (!raw) return 0;
//     const numeric =
//       typeof raw === "string"
//         ? Number(raw.replace(/[^\d.]/g, ""))
//         : Number(raw);
//     return numeric || 0;
//   };

//   const formatProducts = (products) =>
//     products.map((product) => {
//       const raw =
//         product.unit_price ?? product.price ?? product.amount ?? product.cost ?? 0;
//       const cleaned = cleanPrice(raw);
//       return {
//         ...product,
//         cleaned_price: cleaned,
//         formatted_price: `NGN ${formatNumber(cleaned)}`,
//       };
//     });

//   // -------------------------------
//   // Fetch functions
//   // -------------------------------
//   const fetchAllProducts = () => {
//     axios
//       .get(`${BASE_URL}/products/`)
//       .then((res) => setAllProducts(formatProducts(res.data)))
//       .catch((err) => console.error(err));
//   };

//   const fetchBestSelling = () => {
//     axios
//       .get(`${BASE_URL}/products/best-selling/`)
//       .then((res) => {
//         const filtered = res.data.filter((p) => p.sold > 0);
//         setBestSelling(formatProducts(filtered));
//       })
//       .catch((err) => console.error(err));
//   };

//   const fetchFiveStar = () => {
//     axios
//       .get(`${BASE_URL}/products/top-rated/`)
//       .then((res) => setFiveStar(formatProducts(res.data)))
//       .catch((err) => console.error(err));
//   };

//   const fetchNewIn = () => {
//     axios
//       .get(`${BASE_URL}/products/new/`)
//       .then((res) => setNewIn(formatProducts(res.data)))
//       .catch((err) => console.error(err));
//   };

//   const fetchCategories = () => {
//     axios
//       .get(`${BASE_URL}/categories/`)
//       .then((res) => setCategories(res.data))
//       .catch((err) => console.error(err));
//   };

//   const searchProducts = () => {
//     if (searchValue.trim().length === 0) return;
//     axios
//       .get(`${BASE_URL}/products/?search=${searchValue.trim()}`)
//       .then((res) => setAllProducts(formatProducts(res.data)))
//       .catch((err) => console.error(err));
//   };

//   const loadCategory = (catId) => {
//     axios
//       .get(`${BASE_URL}/products/?category=${catId}`)
//       .then((res) => setAllProducts(formatProducts(res.data)))
//       .catch((err) => console.error(err));
//   };

//   useEffect(() => {
//   fetchAllProducts();
//   fetchBestSelling();
//   fetchFiveStar();
//   fetchNewIn();
//   fetchCategories();

//   // FIXED: load previous cart correctly
//   const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
//   setCartCount(savedCart.length);
// }, []);

// // Listen to changes in localStorage cart (from CartContext)
// useEffect(() => {
//   const syncCart = () => {
//     const saved = JSON.parse(localStorage.getItem("cart") || "[]");
//     setCartCount(saved.length);
//   };

//   window.addEventListener("storage", syncCart);
//   return () => window.removeEventListener("storage", syncCart);
// }, []);
//   const goHome = () => (window.location.href = "/");
//   const goToAccount = () => (window.location.href = "/signup");

//   // -------------------------------
//   // Render
//   // -------------------------------
//   return (
//     <div className="bg-[#f7f7f7] min-h-screen">
//       {/* HEADER */}
//       <header className="w-full bg-white shadow px-4 py-3 flex items-center gap-6">
//         <div className="flex items-center gap-4">
//           <div className="w-12 rounded-full cursor-pointer" onClick={goHome}>
//             <img src="logo.png" className="rounded-3xl" alt="Logo" />
//           </div>

//           <span className="text-sm font-medium cursor-pointer" onClick={fetchBestSelling}>
//             👍 Best-Selling Items
//           </span>
//           <span className="text-sm font-medium cursor-pointer" onClick={fetchFiveStar}>
//             ⭐ 5-Star Rated
//           </span>
//           <span className="text-sm font-medium cursor-pointer" onClick={fetchNewIn}>
//             New In
//           </span>

//           {/* Categories */}
//           <div className="relative group">
//             <span className="text-sm font-medium cursor-pointer">Categories ▼</span>
//             <div className="absolute hidden group-hover:block bg-white shadow-lg border rounded-md mt-1 p-2 z-20">
//               {categories.map((cat) => (
//                 <div
//                   key={cat.id}
//                   className="px-3 py-1 hover:bg-gray-200 cursor-pointer text-sm"
//                   onClick={() => loadCategory(cat.id)}
//                 >
//                   {cat.name}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* SEARCH */}
//         <div className="flex-1 flex items-center">
//           <div className="w-full flex items-center border border-gray-400 rounded-full px-4 py-2">
//             <input
//               className="flex-1 outline-none"
//               type="text"
//               placeholder="Search Product"
//               value={searchValue}
//               onChange={(e) => setSearchValue(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && searchProducts()}
//             />
//             <FaSearch className="text-xl cursor-pointer" onClick={searchProducts} />
//           </div>
//         </div>

//         {/* RIGHT ICONS */}
//         <div className="flex items-center gap-8">
//           <div className="flex flex-col items-center text-sm cursor-pointer" onClick={goToAccount}>
//             <FaUserCircle className="text-2xl" />
//             <span>Orders & Account</span>
//           </div>
//           <div className="flex flex-col items-center text-sm cursor-pointer">
//             <FaHeadset className="text-2xl" />
//             <span>Support</span>
//           </div>
//           <div className="relative cursor-pointer">
//             <HiShoppingCart className="text-3xl" />
//             {cartCount > 0 && (
//               <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
//                 {cartCount}
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* PRODUCT SECTIONS */}
//       <div className="p-6 bg-[#003366] min-h-screen space-y-10">
//         {bestSelling.length > 0 && (
//           <section>
//             <h2 className="text-2xl font-bold text-white mb-4">👍 Best-Selling Items</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {bestSelling.map((product) => (
//                 <ProductCard key={product.id} product={product} onView={setSelectedProduct} />
//               ))}
//             </div>
//           </section>
//         )}

//         {fiveStar.length > 0 && (
//           <section>
//             <h2 className="text-2xl font-bold text-white mb-4">⭐ 5-Star Rated</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {fiveStar.map((product) => (
//                 <ProductCard key={product.id} product={product} onView={setSelectedProduct} />
//               ))}
//             </div>
//           </section>
//         )}

//         {newIn.length > 0 && (
//           <section>
//             <h2 className="text-2xl font-bold text-white mb-4">New In</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {newIn.map((product) => (
//                 <ProductCard key={product.id} product={product} onView={setSelectedProduct} />
//               ))}
//             </div>
//           </section>
//         )}
//       </div>

//       <ProductPage product={selectedProduct} onClose={() => setSelectedProduct(null)} />
//       {/* <CartDrawer /> */}
//     </div>
//   );
// };













// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ProductCard } from "../components/ProductCard";
// import { ProductPage } from "../components/ProductPage";
// import { StoreHeader } from "../components/StoreHeader";
// import { StoreLayout } from "../layouts/StoreLayout";

// export const StorePage = () => {
//   const [allProducts, setAllProducts] = useState([]);
//   const [bestSelling, setBestSelling] = useState([]);
//   const [fiveStar, setFiveStar] = useState([]);
//   const [newIn, setNewIn] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [searchValue, setSearchValue] = useState("");
//   const [cartCount, setCartCount] = useState(0);

//   const BASE_URL = "http://127.0.0.1:8000/store";

//   // --------------------------------------
//   // Helper functions
//   // --------------------------------------
//   const formatNumber = (num) =>
//     new Intl.NumberFormat("en-NG", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(num);

//   const cleanPrice = (raw) => {
//     if (!raw) return 0;
//     const numeric =
//       typeof raw === "string" ? Number(raw.replace(/[^\d.]/g, "")) : Number(raw);
//     return numeric || 0;
//   };

//   const formatProducts = (products) =>
//     products.map((product) => {
//       const raw =
//         product.unit_price ?? product.price ?? product.amount ?? product.cost ?? 0;
//       const cleaned = cleanPrice(raw);
//       return {
//         ...product,
//         cleaned_price: cleaned,
//         formatted_price: `NGN ${formatNumber(cleaned)}`,
//       };
//     });

//   // --------------------------------------
//   // API calls
//   // --------------------------------------
//   const fetchAllProducts = () => {
//     axios
//       .get(`${BASE_URL}/products/`)
//       .then((res) => setAllProducts(formatProducts(res.data)))
//       .catch(console.error);
//   };

//   const fetchBestSelling = () => {
//     axios
//       .get(`${BASE_URL}/products/best-selling/`)
//       .then((res) => {
//         const filtered = res.data.filter((p) => p.sold > 0);
//         setBestSelling(formatProducts(filtered));
//       })
//       .catch(console.error);
//   };

//   const fetchFiveStar = () => {
//     axios
//       .get(`${BASE_URL}/products/top-rated/`)
//       .then((res) => setFiveStar(formatProducts(res.data)))
//       .catch(console.error);
//   };

//   const fetchNewIn = () => {
//     axios
//       .get(`${BASE_URL}/products/new/`)
//       .then((res) => setNewIn(formatProducts(res.data)))
//       .catch(console.error);
//   };

//   const fetchCategories = () => {
//     axios
//       .get(`${BASE_URL}/categories/`)
//       .then((res) => setCategories(res.data))
//       .catch(console.error);
//   };

//   const searchProducts = () => {
//     if (searchValue.trim() === "") return;
//     axios
//       .get(`${BASE_URL}/products/?search=${searchValue.trim()}`)
//       .then((res) => setAllProducts(formatProducts(res.data)))
//       .catch(console.error);
//   };

//   const loadCategory = (catId) => {
//     axios
//       .get(`${BASE_URL}/products/?category=${catId}`)
//       .then((res) => setAllProducts(formatProducts(res.data)))
//       .catch(console.error);
//   };

//   // --------------------------------------
//   // On Mount
//   // --------------------------------------
//   useEffect(() => {
//     fetchAllProducts();
//     fetchBestSelling();
//     fetchFiveStar();
//     fetchNewIn();
//     fetchCategories();

//     // Load previous cart
//     const saved = JSON.parse(localStorage.getItem("cart") || "[]");
//     setCartCount(saved.length);
//   }, []);

//   // Sync cart count from other tabs/components
//   useEffect(() => {
//     const syncCart = () => {
//       const saved = JSON.parse(localStorage.getItem("cart") || "[]");
//       setCartCount(saved.length);
//     };
//     window.addEventListener("storage", syncCart);
//     return () => window.removeEventListener("storage", syncCart);
//   }, []);

//   // --------------------------------------
//   // Render
//   // --------------------------------------
//   return (
//     <div className="bg-[#f7f7f7] min-h-screen">
//       {/* REFACTORED HEADER */}
//       <StoreHeader
//         categories={categories}
//         searchValue={searchValue}
//         setSearchValue={setSearchValue}
//         searchProducts={searchProducts}
//         fetchBestSelling={fetchBestSelling}
//         fetchFiveStar={fetchFiveStar}
//         fetchNewIn={fetchNewIn}
//         loadCategory={loadCategory}
//         cartCount={cartCount}
//       />

//       {/* PRODUCT SECTIONS */}
//       <div className="p-6 bg-[#003366] min-h-screen space-y-10">
//         {/* BEST SELLING */}
//         {bestSelling.length > 0 && (
//           <section>
//             <h2 className="text-2xl font-bold text-white mb-4">👍 Best-Selling Items</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {bestSelling.map((product) => (
//                 <ProductCard key={product.id} product={product} onView={setSelectedProduct} />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* FIVE STAR */}
//         {fiveStar.length > 0 && (
//           <section>
//             <h2 className="text-2xl font-bold text-white mb-4">⭐ 5-Star Rated</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {fiveStar.map((product) => (
//                 <ProductCard key={product.id} product={product} onView={setSelectedProduct} />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* NEW IN */}
//         {newIn.length > 0 && (
//           <section>
//             <h2 className="text-2xl font-bold text-white mb-4">New In</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {newIn.map((product) => (
//                 <ProductCard key={product.id} product={product} onView={setSelectedProduct} />
//               ))}
//             </div>
//           </section>
//         )}
//       </div>

//       <ProductPage product={selectedProduct} onClose={() => setSelectedProduct(null)} />
//     </div>
//   );
// };









// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ProductCard } from "../components/ProductCard";
// import { ProductPage } from "../components/ProductPage";
// import { StoreHeader } from "../components/StoreHeader";

// export const StorePage = () => {
//   const [allProducts, setAllProducts] = useState([]);
//   const [bestSelling, setBestSelling] = useState([]);
//   const [fiveStar, setFiveStar] = useState([]);
//   const [newIn, setNewIn] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [searchValue, setSearchValue] = useState("");
//   const [cartCount, setCartCount] = useState(0);
//   const [activeCategory, setActiveCategory] = useState(null); // 🔹 Track selected category

//   const BASE_URL = "http://127.0.0.1:8000/store";

//   // --------------------------------------
//   // Helper functions
//   // --------------------------------------
//   const formatNumber = (num) =>
//     new Intl.NumberFormat("en-NG", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(num);

//   const cleanPrice = (raw) => {
//     if (!raw) return 0;
//     const numeric =
//       typeof raw === "string" ? Number(raw.replace(/[^\d.]/g, "")) : Number(raw);
//     return numeric || 0;
//   };

//   const formatProducts = (products) =>
//     products.map((product) => {
//       const raw =
//         product.unit_price ?? product.price ?? product.amount ?? product.cost ?? 0;
//       const cleaned = cleanPrice(raw);
//       return {
//         ...product,
//         cleaned_price: cleaned,
//         formatted_price: `NGN ${formatNumber(cleaned)}`,
//       };
//     });

//   // --------------------------------------
//   // API calls
//   // --------------------------------------
//   const fetchAllProducts = () => {
//     axios
//       .get(`${BASE_URL}/products/`)
//       .then((res) => setAllProducts(formatProducts(res.data)))
//       .catch(console.error);
//   };

//   const fetchBestSelling = () => {
//     axios
//       .get(`${BASE_URL}/products/best-selling/`)
//       .then((res) => {
//         const filtered = res.data.filter((p) => p.sold > 0);
//         setBestSelling(formatProducts(filtered));
//       })
//       .catch(console.error);
//   };

//   const fetchFiveStar = () => {
//     axios
//       .get(`${BASE_URL}/products/top-rated/`)
//       .then((res) => setFiveStar(formatProducts(res.data)))
//       .catch(console.error);
//   };

//   const fetchNewIn = () => {
//     axios
//       .get(`${BASE_URL}/products/new/`)
//       .then((res) => setNewIn(formatProducts(res.data)))
//       .catch(console.error);
//   };

//   const fetchCategories = () => {
//     axios
//       .get(`${BASE_URL}/categories/`)
//       .then((res) => setCategories(res.data))
//       .catch(console.error);
//   };

//   const searchProducts = () => {
//     if (searchValue.trim() === "") return;
//     axios
//       .get(`${BASE_URL}/products/?search=${searchValue.trim()}`)
//       .then((res) => {
//         setAllProducts(formatProducts(res.data));
//         setActiveCategory(null); // 🔹 Clear category when searching
//       })
//       .catch(console.error);
//   };

//   const loadCategory = (catSlug) => {
//     axios
//       .get(`${BASE_URL}/products/?category=${catSlug}`)
//       .then((res) => {
//         setAllProducts(formatProducts(res.data));
//         setActiveCategory(catSlug);
//         // Optionally hide other sections when category selected
//         setBestSelling([]);
//         setFiveStar([]);
//         setNewIn([]);
//       })
//       .catch(console.error);
//   };

//   // --------------------------------------
//   // On Mount
//   // --------------------------------------
//   useEffect(() => {
//     fetchAllProducts();
//     fetchBestSelling();
//     fetchFiveStar();
//     fetchNewIn();
//     fetchCategories();

//     // Load previous cart
//     const saved = JSON.parse(localStorage.getItem("cart") || "[]");
//     setCartCount(saved.length);
//   }, []);

//   // Sync cart count from other tabs/components
//   useEffect(() => {
//     const syncCart = () => {
//       const saved = JSON.parse(localStorage.getItem("cart") || "[]");
//       setCartCount(saved.length);
//     };
//     window.addEventListener("storage", syncCart);
//     return () => window.removeEventListener("storage", syncCart);
//   }, []);

//   // --------------------------------------
//   // Render
//   // --------------------------------------
//   return (
//     <div className="bg-[#f7f7f7] min-h-screen">
//       <StoreHeader
//         categories={categories}
//         searchValue={searchValue}
//         setSearchValue={setSearchValue}
//         searchProducts={searchProducts}
//         fetchBestSelling={fetchBestSelling}
//         fetchFiveStar={fetchFiveStar}
//         fetchNewIn={fetchNewIn}
//         loadCategory={loadCategory}
//         cartCount={cartCount}
//       />

//       <div className="p-6 bg-[#003366] min-h-screen space-y-10">
//         {/* CATEGORY / ALL PRODUCTS */}
//         {allProducts.length > 0 && (
//           <section>
//             <h2 className="text-2xl font-bold text-white mb-4">
//               {activeCategory ? `Category: ${categories.find(c => c.id === activeCategory)?.name}` : "All Products"}
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {allProducts.map((product) => (
//                 <ProductCard key={product.id} product={product} onView={setSelectedProduct} />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* BEST SELLING */}
//         {bestSelling.length > 0 && (
//           <section>
//             <h2 className="text-2xl font-bold text-white mb-4">👍 Best-Selling Items</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {bestSelling.map((product) => (
//                 <ProductCard key={product.id} product={product} onView={setSelectedProduct} />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* FIVE STAR */}
//         {fiveStar.length > 0 && (
//           <section>
//             <h2 className="text-2xl font-bold text-white mb-4">⭐ 5-Star Rated</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {fiveStar.map((product) => (
//                 <ProductCard key={product.id} product={product} onView={setSelectedProduct} />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* NEW IN */}
//         {newIn.length > 0 && (
//           <section>
//             <h2 className="text-2xl font-bold text-white mb-4">New In</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {newIn.map((product) => (
//                 <ProductCard key={product.id} product={product} onView={setSelectedProduct} />
//               ))}
//             </div>
//           </section>
//         )}
//       </div>

//       <ProductPage product={selectedProduct} onClose={() => setSelectedProduct(null)} />
//     </div>
//   );
// };











// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ProductCard } from "../components/ProductCard";
// import { ProductPage } from "../components/ProductPage";
// import { StoreHeader } from "../components/StoreHeader";

// export const StorePage = () => {
//   const [allProducts, setAllProducts] = useState([]);
//   const [bestSelling, setBestSelling] = useState([]);
//   const [fiveStar, setFiveStar] = useState([]);
//   const [newIn, setNewIn] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [searchValue, setSearchValue] = useState("");
//   const [cartCount, setCartCount] = useState(0);
//   const [activeCategory, setActiveCategory] = useState(null); // Selected category ID
//   const [categoryProducts, setCategoryProducts] = useState([]); // Products in selected category

//   const BASE_URL = "http://127.0.0.1:8000/store";

//   // -------------------------------
//   // Helpers
//   // -------------------------------
//   const formatNumber = (num) =>
//     new Intl.NumberFormat("en-NG", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(num);

//   const cleanPrice = (raw) => {
//     if (!raw) return 0;
//     const numeric =
//       typeof raw === "string" ? Number(raw.replace(/[^\d.]/g, "")) : Number(raw);
//     return numeric || 0;
//   };

//   const formatProducts = (products) =>
//     products.map((product) => {
//       const raw =
//         product.unit_price ?? product.price ?? product.amount ?? product.cost ?? 0;
//       const cleaned = cleanPrice(raw);
//       return {
//         ...product,
//         cleaned_price: cleaned,
//         formatted_price: `NGN ${formatNumber(cleaned)}`,
//       };
//     });

//   // -------------------------------
//   // API calls
//   // -------------------------------
//   const fetchAllProducts = () => {
//     axios
//       .get(`${BASE_URL}/products/`)
//       .then((res) => setAllProducts(formatProducts(res.data)))
//       .catch(console.error);
//   };

//   const fetchBestSelling = () => {
//     axios
//       .get(`${BASE_URL}/products/best-selling/`)
//       .then((res) => {
//         const filtered = res.data.filter((p) => p.sold > 0);
//         setBestSelling(formatProducts(filtered));
//       })
//       .catch(console.error);
//   };

//   const fetchFiveStar = () => {
//     axios
//       .get(`${BASE_URL}/products/top-rated/`)
//       .then((res) => setFiveStar(formatProducts(res.data)))
//       .catch(console.error);
//   };

//   const fetchNewIn = () => {
//     axios
//       .get(`${BASE_URL}/products/new/`)
//       .then((res) => setNewIn(formatProducts(res.data)))
//       .catch(console.error);
//   };

//   const fetchCategories = () => {
//     axios
//       .get(`${BASE_URL}/categories/`)
//       .then((res) => setCategories(res.data))
//       .catch(console.error);
//   };

//   const searchProducts = () => {
//     if (searchValue.trim() === "") return;
//     axios
//       .get(`${BASE_URL}/products/?search=${searchValue.trim()}`)
//       .then((res) => {
//         setAllProducts(formatProducts(res.data));
//         setActiveCategory(null);
//         setCategoryProducts([]);
//       })
//       .catch(console.error);
//   };

//   const loadCategory = (catId) => {
//     const selectedCat = categories.find((c) => c.id === catId);
//     if (!selectedCat) return;

//     axios
//       .get(`${BASE_URL}/products/?category=${catId}`)
//       .then((res) => {
//         const formatted = formatProducts(res.data);
//         setCategoryProducts(formatted);
//         setActiveCategory(catId);
//       })
//       .catch(console.error);
//   };

//   // -------------------------------
//   // On Mount
//   // -------------------------------
//   useEffect(() => {
//     fetchAllProducts();
//     fetchBestSelling();
//     fetchFiveStar();
//     fetchNewIn();
//     fetchCategories();

//     const saved = JSON.parse(localStorage.getItem("cart") || "[]");
//     setCartCount(saved.length);
//   }, []);

//   useEffect(() => {
//     const syncCart = () => {
//       const saved = JSON.parse(localStorage.getItem("cart") || "[]");
//       setCartCount(saved.length);
//     };
//     window.addEventListener("storage", syncCart);
//     return () => window.removeEventListener("storage", syncCart);
//   }, []);

//   // -------------------------------
//   // Render
//   // -------------------------------
//   return (
//     <div className="bg-[#f7f7f7] min-h-screen">
//       <StoreHeader
//         categories={categories}
//         searchValue={searchValue}
//         setSearchValue={setSearchValue}
//         searchProducts={searchProducts}
//         fetchBestSelling={fetchBestSelling}
//         fetchFiveStar={fetchFiveStar}
//         fetchNewIn={fetchNewIn}
//         loadCategory={loadCategory}
//         cartCount={cartCount}
//       />

//       <div className="p-6 bg-[#003366] min-h-screen space-y-10">
//         {/* Selected Category Products */}
//         {activeCategory && categoryProducts.length > 0 && (
//           <section>
//             <h2 className="text-2xl font-bold text-white mb-4">
//               Category: {categories.find((c) => c.id === activeCategory)?.name || "Unknown"}
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {categoryProducts.map((product) => (
//                 <ProductCard
//                   key={product.id}
//                   product={product}
//                   onView={setSelectedProduct}
//                 />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* All Products Below */}
//         {allProducts.length > 0 && (
//           <section>
//             <h2 className="text-2xl font-bold text-white mb-4">
//               All Products
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {allProducts.map((product) => (
//                 <ProductCard
//                   key={product.id}
//                   product={product}
//                   onView={setSelectedProduct}
//                 />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* BEST SELLING */}
//         {bestSelling.length > 0 && (
//           <section>
//             <h2 className="text-2xl font-bold text-white mb-4">👍 Best-Selling Items</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {bestSelling.map((product) => (
//                 <ProductCard
//                   key={product.id}
//                   product={product}
//                   onView={setSelectedProduct}
//                 />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* FIVE STAR */}
//         {fiveStar.length > 0 && (
//           <section>
//             <h2 className="text-2xl font-bold text-white mb-4">⭐ 5-Star Rated</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {fiveStar.map((product) => (
//                 <ProductCard
//                   key={product.id}
//                   product={product}
//                   onView={setSelectedProduct}
//                 />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* NEW IN */}
//         {newIn.length > 0 && (
//           <section>
//             <h2 className="text-2xl font-bold text-white mb-4">New In</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {newIn.map((product) => (
//                 <ProductCard
//                   key={product.id}
//                   product={product}
//                   onView={setSelectedProduct}
//                 />
//               ))}
//             </div>
//           </section>
//         )}
//       </div>

//       <ProductPage product={selectedProduct} onClose={() => setSelectedProduct(null)} />
//     </div>
//   );
// };
















// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ProductCard } from "../components/ProductCard";
// import { ProductPage } from "../components/ProductPage";
// import { StoreHeader } from "../components/StoreHeader";

// export const StorePage = () => {
//   const [allProducts, setAllProducts] = useState([]);
//   const [bestSelling, setBestSelling] = useState([]);
//   const [fiveStar, setFiveStar] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [searchValue, setSearchValue] = useState("");
//   const [cartCount, setCartCount] = useState(0);
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [categoryProducts, setCategoryProducts] = useState([]);

//   const BASE_URL = "http://127.0.0.1:8000/store";

//   // -------------------------------
//   // Helpers
//   // -------------------------------
//   const formatNumber = (num) =>
//     new Intl.NumberFormat("en-NG", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(num);

//   const cleanPrice = (raw) => {
//     if (!raw) return 0;
//     const numeric =
//       typeof raw === "string" ? Number(raw.replace(/[^\d.]/g, "")) : Number(raw);
//     return numeric || 0;
//   };

//   const formatProducts = (products) =>
//     products.map((product) => {
//       const raw =
//         product.unit_price ?? product.price ?? product.amount ?? product.cost ?? 0;
//       const cleaned = cleanPrice(raw);
//       return {
//         ...product,
//         cleaned_price: cleaned,
//         formatted_price: `NGN ${formatNumber(cleaned)}`,
//       };
//     });

//   // -------------------------------
//   // API calls
//   // -------------------------------
//   const fetchAllProducts = () => {
//     axios
//       .get(`${BASE_URL}/products/`)
//       .then((res) => setAllProducts(formatProducts(res.data)))
//       .catch(console.error);
//   };

//   const fetchBestSelling = () => {
//     axios
//       .get(`${BASE_URL}/products/best-selling/`)
//       .then((res) => {
//         const filtered = res.data.filter((p) => p.sold > 0);
//         setBestSelling(formatProducts(filtered));
//       })
//       .catch(console.error);
//   };

//   const fetchFiveStar = () => {
//     axios
//       .get(`${BASE_URL}/products/top-rated/`)
//       .then((res) => setFiveStar(formatProducts(res.data)))
//       .catch(console.error);
//   };

//   const fetchCategories = () => {
//     axios
//       .get(`${BASE_URL}/categories/`)
//       .then((res) => setCategories(res.data))
//       .catch(console.error);
//   };

//   const searchProducts = () => {
//     if (searchValue.trim() === "") return;
//     axios
//       .get(`${BASE_URL}/products/?search=${searchValue.trim()}`)
//       .then((res) => {
//         setAllProducts(formatProducts(res.data));
//         setActiveCategory(null);
//         setCategoryProducts([]);
//       })
//       .catch(console.error);
//   };

//   const loadCategory = (catId) => {
//     const selectedCat = categories.find((c) => c.id === catId);
//     if (!selectedCat) return;

//     axios
//       .get(`${BASE_URL}/products/?category=${catId}`)
//       .then((res) => {
//         const formatted = formatProducts(res.data);
//         setCategoryProducts(formatted);
//         setActiveCategory(catId);
//       })
//       .catch(console.error);
//   };

//   // -------------------------------
//   // On Mount
//   // -------------------------------
//   useEffect(() => {
//     fetchAllProducts();
//     fetchBestSelling();
//     fetchFiveStar();
//     fetchCategories();

//     const saved = JSON.parse(localStorage.getItem("cart") || "[]");
//     setCartCount(saved.length);
//   }, []);

//   useEffect(() => {
//     const syncCart = () => {
//       const saved = JSON.parse(localStorage.getItem("cart") || "[]");
//       setCartCount(saved.length);
//     };
//     window.addEventListener("storage", syncCart);
//     return () => window.removeEventListener("storage", syncCart);
//   }, []);

//   // -------------------------------
//   // Render
//   // -------------------------------
//   return (
//     <div className="bg-[#f7f7f7] min-h-screen">
//       <StoreHeader
//         categories={categories}
//         searchValue={searchValue}
//         setSearchValue={setSearchValue}
//         searchProducts={searchProducts}
//         fetchBestSelling={fetchBestSelling}
//         fetchFiveStar={fetchFiveStar}
//         loadCategory={loadCategory}
//         cartCount={cartCount}
//       />

//       <div className="p-6 bg-[#003366] min-h-screen space-y-10">
//         {/* Selected Category Products */}
//         {activeCategory && categoryProducts.length > 0 && (
//           <section>
//             <h2 className="text-2xl font-bold text-white mb-4">
//               Category: {categories.find((c) => c.id === activeCategory)?.name || "Unknown"}
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {categoryProducts.map((product) => (
//                 <ProductCard
//                   key={product.id}
//                   product={product}
//                   onView={setSelectedProduct}
//                 />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* All Products Below */}
//         {allProducts.length > 0 && (
//           <section>
//             <h2 className="text-2xl font-bold text-white mb-4">All Products</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {allProducts.map((product) => (
//                 <ProductCard
//                   key={product.id}
//                   product={product}
//                   onView={setSelectedProduct}
//                 />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* BEST SELLING */}
//         {bestSelling.length > 0 && (
//           <section>
//             <h2 className="text-2xl font-bold text-white mb-4">👍 Best-Selling Items</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {bestSelling.map((product) => (
//                 <ProductCard
//                   key={product.id}
//                   product={product}
//                   onView={setSelectedProduct}
//                 />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* FIVE STAR */}
//         {fiveStar.length > 0 && (
//           <section>
//             <h2 className="text-2xl font-bold text-white mb-4">⭐ 5-Star Rated</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {fiveStar.map((product) => (
//                 <ProductCard
//                   key={product.id}
//                   product={product}
//                   onView={setSelectedProduct}
//                 />
//               ))}
//             </div>
//           </section>
//         )}
//       </div>

//       <ProductPage product={selectedProduct} onClose={() => setSelectedProduct(null)} />
//     </div>
//   );
// };












// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ProductCard } from "../components/ProductCard";
// import { ProductPage } from "../components/ProductPage";
// import { StoreHeader } from "../components/StoreHeader";

// export const StorePage = () => {
//   const [allProducts, setAllProducts] = useState([]);
//   const [categoryProducts, setCategoryProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [searchValue, setSearchValue] = useState("");
//   const [cartCount, setCartCount] = useState(0);
//   const [activeCategory, setActiveCategory] = useState(null); // Track selected category

//   const BASE_URL = "http://127.0.0.1:8000/store";

//   // Helper functions
//   const formatNumber = (num) =>
//     new Intl.NumberFormat("en-NG", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(num);

//   const cleanPrice = (raw) => {
//     if (!raw) return 0;
//     const numeric =
//       typeof raw === "string" ? Number(raw.replace(/[^\d.]/g, "")) : Number(raw);
//     return numeric || 0;
//   };

//   const formatProducts = (products) =>
//     products.map((product) => {
//       const raw =
//         product.unit_price ?? product.price ?? product.amount ?? product.cost ?? 0;
//       const cleaned = cleanPrice(raw);
//       return {
//         ...product,
//         cleaned_price: cleaned,
//         formatted_price: `NGN ${formatNumber(cleaned)}`,
//       };
//     });

//   // API calls
//   const fetchAllProducts = () => {
//     axios
//       .get(`${BASE_URL}/products/`)
//       .then((res) => setAllProducts(formatProducts(res.data)))
//       .catch(console.error);
//   };

//   const fetchCategories = () => {
//     axios
//       .get(`${BASE_URL}/categories/`)
//       .then((res) => setCategories(res.data))
//       .catch(console.error);
//   };

//   const searchProducts = () => {
//     if (searchValue.trim() === "") return;
//     axios
//       .get(`${BASE_URL}/products/?search=${searchValue.trim()}`)
//       .then((res) => {
//         setAllProducts(formatProducts(res.data));
//         setActiveCategory(null); // Clear category when searching
//         setCategoryProducts([]);
//       })
//       .catch(console.error);
//   };

//   const loadCategory = (catId) => {
//     axios
//       .get(`${BASE_URL}/products/?category=${catId}`)
//       .then((res) => {
//         setCategoryProducts(formatProducts(res.data));
//         setActiveCategory(catId);
//       })
//       .catch(console.error);
//   };

//   // On mount
//   useEffect(() => {
//     fetchAllProducts();
//     fetchCategories();

//     const saved = JSON.parse(localStorage.getItem("cart") || "[]");
//     setCartCount(saved.length);
//   }, []);

//   // Sync cart count from other tabs/components
//   useEffect(() => {
//     const syncCart = () => {
//       const saved = JSON.parse(localStorage.getItem("cart") || "[]");
//       setCartCount(saved.length);
//     };
//     window.addEventListener("storage", syncCart);
//     return () => window.removeEventListener("storage", syncCart);
//   }, []);

//   return (
//     <div className="bg-[#f7f7f7] min-h-screen">
//       <StoreHeader
//         categories={categories}
//         searchValue={searchValue}
//         setSearchValue={setSearchValue}
//         searchProducts={searchProducts}
//         loadCategory={loadCategory}
//         cartCount={cartCount}
//       />

//       <div className="p-6 bg-[#003366] min-h-screen space-y-10">
//         {/* Selected Category Products */}
//         {activeCategory && categoryProducts.length > 0 && (
//           <section>
//             <h2 className="text-2xl font-bold text-white mb-4">
//               Category:{" "}
//               {categories.find((c) => c.id === activeCategory)?.name || "Unknown"}
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {categoryProducts.map((product) => (
//                 <ProductCard
//                   key={product.id}
//                   product={product}
//                   onView={setSelectedProduct}
//                 />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* All Products */}
//         <section>
//           <h2 className="text-2xl font-bold text-white mb-4">All Products</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {allProducts.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 product={product}
//                 onView={setSelectedProduct}
//               />
//             ))}
//           </div>
//         </section>
//       </div>

//       <ProductPage
//         product={selectedProduct}
//         onClose={() => setSelectedProduct(null)}
//       />
//     </div>
//   );
// };










// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ProductCard } from "../components/ProductCard";
// import { ProductPage } from "../components/ProductPage";
// import { StoreHeader } from "../components/StoreHeader";

// export const StorePage = () => {
//   const [allProducts, setAllProducts] = useState([]);
//   const [categoryProducts, setCategoryProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [searchValue, setSearchValue] = useState("");
//   const [cartCount, setCartCount] = useState(0);
//   const [activeCategory, setActiveCategory] = useState(null); // Track selected category

//   const BASE_URL = "http://127.0.0.1:8000/store";

//   // Helper functions
//   const formatNumber = (num) =>
//     new Intl.NumberFormat("en-NG", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(num);

//   const cleanPrice = (raw) => {
//     if (!raw) return 0;
//     const numeric =
//       typeof raw === "string" ? Number(raw.replace(/[^\d.]/g, "")) : Number(raw);
//     return numeric || 0;
//   };

//   const formatProducts = (products) =>
//     products.map((product) => {
//       const raw =
//         product.unit_price ?? product.price ?? product.amount ?? product.cost ?? 0;
//       const cleaned = cleanPrice(raw);
//       return {
//         ...product,
//         cleaned_price: cleaned,
//         formatted_price: `NGN ${formatNumber(cleaned)}`,
//       };
//     });

//   // API calls
//   const fetchAllProducts = () => {
//     axios
//       .get(`${BASE_URL}/products/`)
//       .then((res) => setAllProducts(formatProducts(res.data)))
//       .catch(console.error);
//   };

//   const fetchCategories = () => {
//     axios
//       .get(`${BASE_URL}/categories/`)
//       .then((res) => setCategories(res.data))
//       .catch(console.error);
//   };

//   const searchProducts = () => {
//     if (searchValue.trim() === "") return;
//     axios
//       .get(`${BASE_URL}/products/?search=${searchValue.trim()}`)
//       .then((res) => {
//         setAllProducts(formatProducts(res.data));
//         setActiveCategory(null); // Clear category when searching
//         setCategoryProducts([]);
//       })
//       .catch(console.error);
//   };

//   const loadCategory = (catId) => {
//     axios
//       .get(`${BASE_URL}/products/?category=${catId}`)
//       .then((res) => {
//         setCategoryProducts(formatProducts(res.data));
//         setActiveCategory(catId);
//       })
//       .catch(console.error);
//   };

//   // On mount
//   useEffect(() => {
//     fetchAllProducts();
//     fetchCategories();

//     const saved = JSON.parse(localStorage.getItem("cart") || "[]");
//     setCartCount(saved.length);
//   }, []);

//   // Sync cart count from other tabs/components
//   useEffect(() => {
//     const syncCart = () => {
//       const saved = JSON.parse(localStorage.getItem("cart") || "[]");
//       setCartCount(saved.length);
//     };
//     window.addEventListener("storage", syncCart);
//     return () => window.removeEventListener("storage", syncCart);
//   }, []);

//   return (
//     <div className="bg-[#f7f7f7] min-h-screen">
//       <StoreHeader
//         categories={categories}
//         searchValue={searchValue}
//         setSearchValue={setSearchValue}
//         searchProducts={searchProducts}
//         loadCategory={loadCategory}
//         cartCount={cartCount}
//       />

//       <div className="p-6 bg-[#003366] min-h-screen space-y-10">
//         {/* Selected Category Products */}
//         {activeCategory && categoryProducts.length > 0 && (
//           <section>
//             <h2 className="text-2xl font-bold text-white mb-4">
//               Category:{" "}
//               {categories.find((c) => c.id === activeCategory)?.name || "Unknown"}
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {categoryProducts.map((product) => (
//                 <ProductCard
//                   key={product.id}
//                   product={product}
//                   onView={setSelectedProduct}
//                 />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* All Products */}
//         <section>
//           <h2 className="text-2xl font-bold text-white mb-4">All Products</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {allProducts.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 product={product}
//                 onView={setSelectedProduct}
//               />
//             ))}
//           </div>
//         </section>
//       </div>

//       {/* Only render ProductPage when a product is selected */}
//       {selectedProduct && (
//         <ProductPage
//           product={selectedProduct}
//           onClose={() => setSelectedProduct(null)}
//         />
//       )}
//     </div>
//   );
// };












// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ProductCard } from "../components/ProductCard";
// import { ProductPage } from "../components/ProductPage";
// import { StoreHeader } from "../components/StoreHeader";

// export const StorePage = () => {
//   const [allProducts, setAllProducts] = useState([]);
//   const [categoryProducts, setCategoryProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [searchValue, setSearchValue] = useState("");
//   const [cartCount, setCartCount] = useState(0);
//   const [activeCategory, setActiveCategory] = useState(null); // Track selected category

//   const BASE_URL = "http://127.0.0.1:8000/store";

//   // Helper functions
//   const formatNumber = (num) =>
//     new Intl.NumberFormat("en-NG", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(num);

//   const cleanPrice = (raw) => {
//     if (!raw) return 0;
//     const numeric =
//       typeof raw === "string" ? Number(raw.replace(/[^\d.]/g, "")) : Number(raw);
//     return numeric || 0;
//   };

//   const formatProducts = (products) =>
//     products.map((product) => {
//       const raw =
//         product.unit_price ?? product.price ?? product.amount ?? product.cost ?? 0;
//       const cleaned = cleanPrice(raw);
//       return {
//         ...product,
//         cleaned_price: cleaned,
//         formatted_price: `NGN ${formatNumber(cleaned)}`,
//       };
//     });

//   // ---------------------
//   // API Calls
//   // ---------------------
//   const fetchAllProducts = () => {
//     axios
//       .get(`${BASE_URL}/products/`)
//       .then((res) => setAllProducts(formatProducts(res.data)))
//       .catch(console.error);
//   };

//   const fetchCategories = () => {
//     axios
//       .get(`${BASE_URL}/categories/`)
//       .then((res) => setCategories(res.data))
//       .catch(console.error);
//   };

//   const searchProducts = () => {
//     if (searchValue.trim() === "") return;
//     axios
//       .get(`${BASE_URL}/products/?search=${searchValue.trim()}`)
//       .then((res) => {
//         setAllProducts(formatProducts(res.data));
//         setActiveCategory(null);
//         setCategoryProducts([]);
//       })
//       .catch(console.error);
//   };

//   const loadCategory = (catId) => {
//     axios
//       .get(`${BASE_URL}/products/?category=${catId}`)
//       .then((res) => {
//         setCategoryProducts(formatProducts(res.data));
//         setActiveCategory(catId);
//       })
//       .catch(console.error);
//   };

//   // 🔹 New: Best-Selling, 5-Star, New In filters
//   const fetchBestSelling = () => {
//     axios
//       .get(`${BASE_URL}/products/best-selling/`)
//       .then((res) => {
//         const filtered = res.data.filter((p) => p.sold > 0);
//         setAllProducts(formatProducts(filtered));
//         setActiveCategory(null);
//         setCategoryProducts([]);
//       })
//       .catch(console.error);
//   };

//   const fetchFiveStar = () => {
//     axios
//       .get(`${BASE_URL}/products/top-rated/`)
//       .then((res) => {
//         setAllProducts(formatProducts(res.data));
//         setActiveCategory(null);
//         setCategoryProducts([]);
//       })
//       .catch(console.error);
//   };

//   const fetchNewIn = () => {
//     axios
//       .get(`${BASE_URL}/products/new/`)
//       .then((res) => {
//         setAllProducts(formatProducts(res.data));
//         setActiveCategory(null);
//         setCategoryProducts([]);
//       })
//       .catch(console.error);
//   };

//   // ---------------------
//   // On mount
//   // ---------------------
//   useEffect(() => {
//     fetchAllProducts();
//     fetchCategories();

//     const saved = JSON.parse(localStorage.getItem("cart") || "[]");
//     setCartCount(saved.length);
//   }, []);

//   // Sync cart count from other tabs/components
//   useEffect(() => {
//     const syncCart = () => {
//       const saved = JSON.parse(localStorage.getItem("cart") || "[]");
//       setCartCount(saved.length);
//     };
//     window.addEventListener("storage", syncCart);
//     return () => window.removeEventListener("storage", syncCart);
//   }, []);

//   // ---------------------
//   // Render
//   // ---------------------
//   return (
//     <div className="bg-[#f7f7f7] min-h-screen">
//       <StoreHeader
//         categories={categories}
//         searchValue={searchValue}
//         setSearchValue={setSearchValue}
//         searchProducts={searchProducts}
//         loadCategory={loadCategory}
//         fetchBestSelling={fetchBestSelling}
//         fetchFiveStar={fetchFiveStar}
//         fetchNewIn={fetchNewIn}
//         cartCount={cartCount}
//       />

//       <div className="p-6 bg-[#003366] min-h-screen space-y-10">
//         {/* Selected Category Products */}
//         {activeCategory && categoryProducts.length > 0 && (
//           <section>
//             <h2 className="text-2xl font-bold text-white mb-4">
//               Category:{" "}
//               {categories.find((c) => c.id === activeCategory)?.name || "Unknown"}
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {categoryProducts.map((product) => (
//                 <ProductCard
//                   key={product.id}
//                   product={product}
//                   onView={setSelectedProduct}
//                 />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* All Products */}
//         <section>
//           <h2 className="text-2xl font-bold text-white mb-4">All Products</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {allProducts.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 product={product}
//                 onView={setSelectedProduct}
//               />
//             ))}
//           </div>
//         </section>
//       </div>

//       {/* Only render ProductPage when a product is selected */}
//       {selectedProduct && (
//         <ProductPage
//           product={selectedProduct}
//           onClose={() => setSelectedProduct(null)}
//         />
//       )}
//     </div>
//   );
// };











// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ProductCard } from "../components/ProductCard";
// import { ProductPage } from "../components/ProductPage";
// import { StoreHeader } from "../components/StoreHeader";

// export const StorePage = () => {
//   const [allProducts, setAllProducts] = useState([]);
//   const [categoryProducts, setCategoryProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [searchValue, setSearchValue] = useState("");
//   const [cartCount, setCartCount] = useState(0);
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [noResults, setNoResults] = useState(false);

//   const BASE_URL = "http://127.0.0.1:8000/store";

//   const formatNumber = (num) =>
//     new Intl.NumberFormat("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num);

//   const cleanPrice = (raw) => {
//     if (!raw) return 0;
//     const numeric = typeof raw === "string" ? Number(raw.replace(/[^\d.]/g, "")) : Number(raw);
//     return numeric || 0;
//   };

//   const formatProducts = (products) =>
//     products.map((product) => {
//       const raw = product.unit_price ?? product.price ?? product.amount ?? product.cost ?? 0;
//       const cleaned = cleanPrice(raw);
//       return { ...product, cleaned_price: cleaned, formatted_price: `NGN ${formatNumber(cleaned)}` };
//     });

//   // -----------------------------
//   // API Calls
//   // -----------------------------
//   const fetchAllProducts = () => {
//     axios.get(`${BASE_URL}/products/`)
//       .then((res) => setAllProducts(formatProducts(res.data)))
//       .catch(console.error);
//   };

//   const fetchCategories = () => {
//     axios.get(`${BASE_URL}/categories/`)
//       .then((res) => setCategories(res.data))
//       .catch(console.error);
//   };

//   const searchProducts = () => {
//     if (searchValue.trim() === "") {
//       setNoResults(false);
//       fetchAllProducts();
//       setActiveCategory(null);
//       setCategoryProducts([]);
//       return;
//     }

//     // Search by term
//     axios.get(`${BASE_URL}/products/?search=${searchValue.trim()}`)
//       .then((res) => {
//         const results = formatProducts(res.data);
//         setAllProducts(results);
//         setCategoryProducts([]);
//         setActiveCategory(null);
//         setNoResults(results.length === 0);
//       })
//       .catch(console.error);
//   };

//   const loadCategory = (catId) => {
//     axios.get(`${BASE_URL}/products/?category=${catId}`)
//       .then((res) => {
//         const results = formatProducts(res.data);
//         setCategoryProducts(results);
//         setActiveCategory(catId);
//         setAllProducts([]);
//         setNoResults(results.length === 0);
//       })
//       .catch(console.error);
//   };

//   // -----------------------------
//   // On mount
//   // -----------------------------
//   useEffect(() => {
//     fetchAllProducts();
//     fetchCategories();

//     const saved = JSON.parse(localStorage.getItem("cart") || "[]");
//     setCartCount(saved.length);
//   }, []);

//   useEffect(() => {
//     const syncCart = () => {
//       const saved = JSON.parse(localStorage.getItem("cart") || "[]");
//       setCartCount(saved.length);
//     };
//     window.addEventListener("storage", syncCart);
//     return () => window.removeEventListener("storage", syncCart);
//   }, []);

//   // -----------------------------
//   // Render
//   // -----------------------------
//   return (
//     <div className="bg-[#f7f7f7] min-h-screen">
//       <StoreHeader
//         categories={categories}
//         searchValue={searchValue}
//         setSearchValue={setSearchValue}
//         searchProducts={searchProducts}
//         loadCategory={loadCategory}
//         cartCount={cartCount}
//       />

//       <div className="p-6 bg-[#003366] min-h-screen space-y-10">
//         {/* Category Products */}
//         {activeCategory && categoryProducts.length > 0 && (
//           <section>
//             <h2 className="text-2xl font-bold text-white mb-4">
//               Category: {categories.find((c) => c.id === activeCategory)?.name || "Unknown"}
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {categoryProducts.map((product) => (
//                 <ProductCard key={product.id} product={product} onView={setSelectedProduct} />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* All Products */}
//         {!activeCategory && allProducts.length > 0 && (
//           <section>
//             <h2 className="text-2xl font-bold text-white mb-4">All Products</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {allProducts.map((product) => (
//                 <ProductCard key={product.id} product={product} onView={setSelectedProduct} />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* No Products Found */}
//         {noResults && (
//           <p className="text-white text-center text-xl mt-10">
//             No products found for "{searchValue}"
//           </p>
//         )}
//       </div>

//       {/* Product Page Modal */}
//       {selectedProduct && (
//         <ProductPage product={selectedProduct} onClose={() => setSelectedProduct(null)} />
//       )}
//     </div>
//   );
// };
















import React, { useEffect, useState } from "react";
import axios from "axios";
import { ProductCard } from "../components/ProductCard";
import { ProductPage } from "../components/ProductPage";
import { StoreHeader } from "../components/StoreHeader";

export const StorePage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const BASE_URL = "https://recabitesnetwork.com/store";

  /** --------------------------
   * PRICE CLEANER / FORMATTER
   ---------------------------*/
  const formatNumber = (num) =>
    new Intl.NumberFormat("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);

  const cleanPrice = (raw) => {
    if (!raw) return 0;
    const numeric =
      typeof raw === "string" ? Number(raw.replace(/[^\d.]/g, "")) : Number(raw);
    return numeric || 0;
  };

  const formatProducts = (products) =>
    products.map((p) => {
      const raw = p.unit_price ?? p.price ?? p.amount ?? p.cost ?? 0;
      const cleaned = cleanPrice(raw);
      return {
        ...p,
        cleaned_price: cleaned,
        formatted_price: `NGN ${formatNumber(cleaned)}`,
      };
    });

  /** --------------------------
   * FETCH FUNCTIONS
   ---------------------------*/

  // All products
  const fetchAllProducts = () => {
    axios.get(`${BASE_URL}/products/`)
      .then((res) => setAllProducts(formatProducts(res.data)))
      .catch(console.error);
  };

  // Categories
  const fetchCategories = () => {
    axios.get(`${BASE_URL}/categories/`)
      .then((res) => setCategories(res.data))
      .catch(console.error);
  };

  // SEARCH
  const searchProducts = () => {
    if (searchValue.trim() === "") return;

    axios.get(`${BASE_URL}/products/?search=${searchValue.trim()}`)
      .then((res) => {
        setAllProducts(formatProducts(res.data));
      })
      .catch(console.error);
  };

  // BEST SELLING
  const fetchBestSelling = () => {
    axios.get(`${BASE_URL}/products/?ordering=-sold_count`)
      .then((res) => setAllProducts(formatProducts(res.data)))
      .catch(console.error);
  };

  // 5-STAR RATED
  const fetchFiveStar = () => {
    axios.get(`${BASE_URL}/products/?rating=5`)
      .then((res) => setAllProducts(formatProducts(res.data)))
      .catch(console.error);
  };

  // NEW IN (last 10 added)
  const fetchNewIn = () => {
    axios.get(`${BASE_URL}/products/?ordering=-created_at`)
      .then((res) => setAllProducts(formatProducts(res.data)))
      .catch(console.error);
  };

  // CATEGORY
  const loadCategory = (catId) => {
    axios.get(`${BASE_URL}/products/?category=${catId}`)
      .then((res) => setAllProducts(formatProducts(res.data)))
      .catch(console.error);
  };

  /** --------------------------
   * EFFECT – ON MOUNT
   ---------------------------*/
  useEffect(() => {
    fetchAllProducts();
    fetchCategories();

    const saved = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(saved.length);
  }, []);

  /** --------------------------
   * SYNC CART
   ---------------------------*/
  useEffect(() => {
    const syncCart = () => {
      const saved = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(saved.length);
    };
    window.addEventListener("storage", syncCart);
    return () => window.removeEventListener("storage", syncCart);
  }, []);

  /** --------------------------
   * UI
   ---------------------------*/
  return (
    <div className="bg-[#f7f7f7] min-h-screen">
      <StoreHeader
        categories={categories}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchProducts={searchProducts}
        fetchBestSelling={fetchBestSelling}
        fetchFiveStar={fetchFiveStar}
        fetchNewIn={fetchNewIn}
        loadCategory={loadCategory}
        cartCount={cartCount}
      />

      <div className="p-6 bg-[#f7f7f7] min-h-screen space-y-10">

        {/* ALL PRODUCTS */}
        <section>
          <h2 className="text-2xl font-bold text-gray-600 mb-4">All Products</h2>

          {allProducts.length === 0 ? (
            <p className="text-white text-lg">No products found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {allProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onView={setSelectedProduct}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {selectedProduct && (
        <ProductPage product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
};
