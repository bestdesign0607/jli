// import React from "react";
// import { FaSearch, FaUserCircle, FaHeadset } from "react-icons/fa";
// import { HiShoppingCart } from "react-icons/hi";

// export const StoreHeader = ({
//   categories,
//   searchValue,
//   setSearchValue,
//   searchProducts,
//   fetchBestSelling,
//   fetchFiveStar,
//   fetchNewIn,
//   loadCategory,
//   cartCount,
// }) => {
//   const goHome = () => (window.location.href = "/");
//   const goToAccount = () => (window.location.href = "/signup");

//   return (
//     <header className="w-full bg-white shadow px-4 py-3 flex items-center gap-6">
//       {/* LEFT SECTION */}
//       <div className="flex items-center gap-4">
//         <div className="w-12 rounded-full cursor-pointer" onClick={goHome}>
//           <img src="logo.png" className="rounded-3xl" alt="Logo" />
//         </div>

//         <span className="text-sm font-medium cursor-pointer" onClick={fetchBestSelling}>
//           👍 Best-Selling Items
//         </span>
//         <span className="text-sm font-medium cursor-pointer" onClick={fetchFiveStar}>
//           ⭐ 5-Star Rated
//         </span>
//         <span className="text-sm font-medium cursor-pointer" onClick={fetchNewIn}>
//           New In
//         </span>

//         {/* Categories */}
//         <div className="relative group">
//           <span className="text-sm font-medium cursor-pointer">Categories ▼</span>
//           <div className="absolute hidden group-hover:block bg-white shadow-lg border rounded-md mt-1 p-2 z-20">
//             {categories.map((cat) => (
//               <div
//                 key={cat.id}
//                 className="px-3 py-1 hover:bg-gray-200 cursor-pointer text-sm"
//                 onClick={() => loadCategory(cat.id)}
//               >
//                 {cat.name}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* SEARCH */}
//       <div className="flex-1 flex items-center">
//         <div className="w-full flex items-center border border-gray-400 rounded-full px-4 py-2">
//           <input
//             className="flex-1 outline-none"
//             type="text"
//             placeholder="Search Product"
//             value={searchValue}
//             onChange={(e) => setSearchValue(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && searchProducts()}
//           />
//           <FaSearch className="text-xl cursor-pointer" onClick={searchProducts} />
//         </div>
//       </div>

//       {/* RIGHT ICONS */}
//       <div className="flex items-center gap-8">
//         <div className="flex flex-col items-center text-sm cursor-pointer" onClick={goToAccount}>
//           <FaUserCircle className="text-2xl" />
//           <span>Orders & Account</span>
//         </div>

//         <div className="flex flex-col items-center text-sm cursor-pointer">
//           <FaHeadset className="text-2xl" />
//           <span>Support</span>
//         </div>

//         <div className="relative cursor-pointer">
//           <HiShoppingCart className="text-3xl" />
//           {cartCount > 0 && (
//             <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
//               {cartCount}
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };












// import React from "react";
// import { FaSearch, FaUserCircle, FaHeadset } from "react-icons/fa";
// import { HiShoppingCart } from "react-icons/hi";
// import { useCart } from "../context/CartContext";


// export const StoreHeader = ({

//   categories = [],
//   searchValue = "",
//   setSearchValue = () => { },
//   searchProducts = () => { },
//   fetchBestSelling = () => { },
//   fetchFiveStar = () => { },
//   fetchNewIn = () => { },
//   loadCategory = () => { },
//   cartCount = 0,
//   logo = "/logo.png", // default logo from public folder
// }) => {
//   const goHome = () => (window.location.href = "/");
//   const goToAccount = () => (window.location.href = "/signup");
//   const goToCart = () => (window.location.href = "/cart");
//   const { cartItems } = useCart();
//   const cartCount = cartItems.length;



//   return (
//     <header className="w-full bg-white shadow px-4 py-3 flex items-center gap-6 flex-wrap">
//       {/* LEFT SECTION */}
//       <div className="flex items-center gap-4 flex-wrap">
//         <div className="w-12 rounded-full cursor-pointer" onClick={goHome}>
//           <img src={logo} className="rounded-3xl" alt="Logo" />
//         </div>

//         <span className="text-sm font-medium cursor-pointer" onClick={fetchBestSelling}>
//           👍 Best-Selling Items
//         </span>
//         <span className="text-sm font-medium cursor-pointer" onClick={fetchFiveStar}>
//           ⭐ 5-Star Rated
//         </span>
//         <span className="text-sm font-medium cursor-pointer" onClick={fetchNewIn}>
//           New In
//         </span>

//         {/* Categories Dropdown */}
//         {categories.length > 0 && (
//           <div className="relative group">
//             <span className="text-sm font-medium cursor-pointer">Categories ▼</span>
//             <div className="absolute hidden group-hover:block bg-white shadow-lg border rounded-md mt-1 p-2 z-20 min-w-[150px]">
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
//         )}
//       </div>

//       {/* SEARCH */}
//       <div className="flex-1 flex items-center min-w-[200px]">
//         <div className="w-full flex items-center border border-gray-400 rounded-full px-4 py-2">
//           <input
//             className="flex-1 outline-none"
//             type="text"
//             placeholder="Search Product"
//             value={searchValue}
//             onChange={(e) => setSearchValue(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && searchProducts()}
//           />
//           <FaSearch className="text-xl cursor-pointer" onClick={searchProducts} />
//         </div>
//       </div>

//       {/* RIGHT ICONS */}
//       <div className="flex items-center gap-8 flex-wrap">
//         <div className="flex flex-col items-center text-sm cursor-pointer" onClick={goToAccount}>
//           <FaUserCircle className="text-2xl" />
//           <span>Orders & Account</span>
//         </div>

//         <div className="flex flex-col items-center text-sm cursor-pointer">
//           <FaHeadset className="text-2xl" />
//           <span>Support</span>
//         </div>

//         <div className="relative cursor-pointer" onClick={goToCart}>
//           <HiShoppingCart className="text-3xl" />
//           {cartCount > 0 && (
//             <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
//               {cartCount}
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };








// import React from "react";
// import { FaSearch, FaUserCircle, FaHeadset } from "react-icons/fa";
// import { HiShoppingCart } from "react-icons/hi";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";


// export const StoreHeader = ({
//   categories = [],
//   searchValue = "",
//   setSearchValue = () => { },
//   searchProducts = () => { },
//   fetchBestSelling = () => { },
//   fetchFiveStar = () => { },
//   fetchNewIn = () => { },
//   loadCategory = () => { },
//   logo = "/logo.png", // default logo from public folder
// }) => {
//   const goHome = () => navigate("/");

//   const goToAccount = () => navigate("/signup");
//   const navigate = useNavigate();
//   const goToCart = () => navigate("/cart");

//   const { cartItems } = useCart();
//   const cartCount = cartItems.length; // get cart count from context

//   return (
//     <header className="w-full bg-white shadow px-4 py-3 flex items-center gap-6 flex-wrap">
//       {/* LEFT SECTION */}
//       <div className="flex items-center gap-4 flex-wrap">
//         <div className="w-12 rounded-full cursor-pointer" onClick={goHome}>
//           <img src={logo} className="rounded-3xl" alt="Logo" />
//         </div>

//         <span className="text-sm font-medium cursor-pointer" onClick={fetchBestSelling}>
//           👍 Best-Selling Items
//         </span>
//         <span className="text-sm font-medium cursor-pointer" onClick={fetchFiveStar}>
//           ⭐ 5-Star Rated
//         </span>
//         <span className="text-sm font-medium cursor-pointer" onClick={fetchNewIn}>
//           New In
//         </span>

//         {/* Categories Dropdown */}
//         {categories.length > 0 && (
//           <div className="relative group">
//             <span className="text-sm font-medium cursor-pointer">Categories ▼</span>
//             <div className="absolute hidden group-hover:block bg-white shadow-lg border rounded-md mt-1 p-2 z-20 min-w-[150px]">
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
//         )}
//       </div>

//       {/* SEARCH */}
//       <div className="flex-1 flex items-center min-w-[200px]">
//         <div className="w-full flex items-center border border-gray-400 rounded-full px-4 py-2">
//           <input
//             className="flex-1 outline-none"
//             type="text"
//             placeholder="Search Product"
//             value={searchValue}
//             onChange={(e) => setSearchValue(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && searchProducts()}
//           />
//           <FaSearch className="text-xl cursor-pointer" onClick={searchProducts} />
//         </div>
//       </div>

//       {/* RIGHT ICONS */}
//       <div className="flex items-center gap-8 flex-wrap">
//         <div className="flex flex-col items-center text-sm cursor-pointer" onClick={goToAccount}>
//           <FaUserCircle className="text-2xl" />
//           <span>Orders & Account</span>
//         </div>

//         <div className="flex flex-col items-center text-sm cursor-pointer">
//           <FaHeadset className="text-2xl" />
//           <span>Support</span>
//         </div>

//         {/* CART ICON - improved to match ProductCard style */}
//         <div
//           onClick={goToCart}
//           className="relative bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition cursor-pointer"
//           title="View Cart"
//         >
//           <HiShoppingCart className="text-gray-700 text-2xl" />

//           {cartCount > 0 && (
//             <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//               {cartCount}
//             </span>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };












// import React from "react";
// import { FaSearch, FaUserCircle, FaHeadset } from "react-icons/fa";
// import { HiShoppingCart } from "react-icons/hi";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";

// export const StoreHeader = ({
//   categories = [],
//   searchValue = "",
//   setSearchValue = () => {},
//   searchProducts = () => {},
//   fetchBestSelling = () => {},
//   fetchFiveStar = () => {},
//   fetchNewIn = () => {},
//   loadCategory = () => {},
//   logo = "/logo.png",
// }) => {
  
//   const navigate = useNavigate();
  
//   const goHome = () => navigate("/");
//   const goToAccount = () => navigate("/signup");
//   const goToCart = () => navigate("/cart");

//   const { cartItems } = useCart();
//   const cartCount = cartItems.length;

//   return (
//     <header className="w-full bg-white shadow px-4 py-3 flex items-center gap-6 flex-wrap">
//       {/* LEFT SECTION */}
//       <div className="flex items-center gap-4 flex-wrap">
//         <div className="w-12 rounded-full cursor-pointer" onClick={goHome}>
//           <img src={logo} className="rounded-3xl" alt="Logo" />
//         </div>

//         <span className="text-sm font-medium cursor-pointer" onClick={fetchBestSelling}>
//           👍 Best-Selling Items
//         </span>
//         <span className="text-sm font-medium cursor-pointer" onClick={fetchFiveStar}>
//           ⭐ 5-Star Rated
//         </span>
//         <span className="text-sm font-medium cursor-pointer" onClick={fetchNewIn}>
//           New In
//         </span>

//         {/* {categories.length > 0 && (
//           <div className="relative group">
//             <span className="text-sm font-medium cursor-pointer">Categories ▼</span>
//             <div className="absolute hidden group-hover:block bg-white shadow-lg border rounded-md mt-1 p-2 z-20 min-w-[150px]">
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
//         )} */}

//         {categories.length > 0 && (
//   <div className="flex gap-3 overflow-x-auto mt-3">
//     {categories.map((cat) => (
//       <button
//         key={cat.id}
//         onClick={() => loadCategory(cat.slug)}  // ✅ Important
//         className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
//       >
//         {cat.name}
//       </button>
//     ))}
//   </div>
// )}
//       </div>

//       {/* SEARCH */}
//       <div className="flex-1 flex items-center min-w-[200px]">
//         <div className="w-full flex items-center border border-gray-400 rounded-full px-4 py-2">
//           <input
//             className="flex-1 outline-none"
//             type="text"
//             placeholder="Search Product"
//             value={searchValue}
//             onChange={(e) => setSearchValue(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && searchProducts()}
//           />
//           <FaSearch className="text-xl cursor-pointer" onClick={searchProducts} />
//         </div>
//       </div>

//       {/* RIGHT ICONS */}
//       <div className="flex items-center gap-8 flex-wrap">
//         <div className="flex flex-col items-center text-sm cursor-pointer" onClick={goToAccount}>
//           <FaUserCircle className="text-2xl" />
//           <span>Orders & Account</span>
//         </div>

//         <div className="flex flex-col items-center text-sm cursor-pointer">
//           <FaHeadset className="text-2xl" />
//           <span>Support</span>
//         </div>

//         <div className="relative cursor-pointer" onClick={goToCart}>
//           <HiShoppingCart className="text-3xl" />
//           {cartCount > 0 && (
//             <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
//               {cartCount}
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };












// import React from "react";
// import { FaSearch, FaUserCircle, FaHeadset } from "react-icons/fa";
// import { HiShoppingCart } from "react-icons/hi";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";

// export const StoreHeader = ({
//   categories = [],
//   searchValue = "",
//   setSearchValue = () => {},
//   searchProducts = () => {},
//   fetchBestSelling = () => {},
//   fetchFiveStar = () => {},
//   fetchNewIn = () => {},
//   loadCategory = () => {},
//   logo = "/logo.png",
// }) => {
//   const navigate = useNavigate();

//   const goHome = () => navigate("/");
//   const goToAccount = () => navigate("/signup");
//   const goToCart = () => navigate("/cart");

//   const { cartItems } = useCart();
//   const cartCount = cartItems.length;

//   return (
//     <header className="w-full bg-white shadow px-4 py-3 flex items-center gap-6 flex-wrap">
//       {/* LEFT SECTION */}
//       <div className="flex items-center gap-4 flex-wrap">
//         <div className="w-12 rounded-full cursor-pointer" onClick={goHome}>
//           <img src={logo} className="rounded-3xl" alt="Logo" />
//         </div>

//         <span className="text-sm font-medium cursor-pointer" onClick={fetchBestSelling}>
//           👍 Best-Selling Items
//         </span>
//         <span className="text-sm font-medium cursor-pointer" onClick={fetchFiveStar}>
//           ⭐ 5-Star Rated
//         </span>
//         <span className="text-sm font-medium cursor-pointer" onClick={fetchNewIn}>
//           New In
//         </span>

//         {/* CATEGORIES DROPDOWN */}
//         {categories.length > 0 && (
//           <div className="relative group">
//             <span className="text-sm font-medium cursor-pointer">
//               Categories ▼
//             </span>
//             <div className="absolute hidden group-hover:block bg-white shadow-lg border rounded-md mt-1 p-2 z-20 min-w-[150px]">
//               {categories.map((cat) => (
//                 <div
//                   key={cat.id}
//                   className="px-3 py-1 hover:bg-gray-200 cursor-pointer text-sm"
//                   onClick={() => loadCategory(cat.id)} // use slug to filter
//                 >
//                   {cat.name}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* SEARCH */}
//       <div className="flex-1 flex items-center min-w-[200px]">
//         <div className="w-full flex items-center border border-gray-400 rounded-full px-4 py-2">
//           <input
//             className="flex-1 outline-none"
//             type="text"
//             placeholder="Search Product"
//             value={searchValue}
//             onChange={(e) => setSearchValue(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && searchProducts()}
//           />
//           <FaSearch className="text-xl cursor-pointer" onClick={searchProducts} />
//         </div>
//       </div>

//       {/* RIGHT ICONS */}
//       <div className="flex items-center gap-8 flex-wrap">
//         <div className="flex flex-col items-center text-sm cursor-pointer" onClick={goToAccount}>
//           <FaUserCircle className="text-2xl" />
//           <span>Orders & Account</span>
//         </div>

//         <div className="flex flex-col items-center text-sm cursor-pointer">
//           <FaHeadset className="text-2xl" />
//           <span>Support</span>
//         </div>

//         <div className="relative cursor-pointer" onClick={goToCart}>
//           <HiShoppingCart className="text-3xl" />
//           {cartCount > 0 && (
//             <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
//               {cartCount}
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };












// import React from "react";
// import { FaSearch, FaUserCircle, FaHeadset } from "react-icons/fa";
// import { HiShoppingCart } from "react-icons/hi";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";

// export const StoreHeader = ({
//   categories = [],
//   searchValue = "",
//   setSearchValue = () => {},
//   searchProducts = () => {},
//   fetchBestSelling = () => {},
//   fetchFiveStar = () => {},
//   fetchNewIn = () => {},
//   loadCategory = () => {},
//   logo = "/logo.png",
// }) => {
//   const navigate = useNavigate();
//   const { cartItems } = useCart();
//   const cartCount = cartItems.length;

//   const goHome = () => navigate("/");
//   const goToAccount = () => navigate("/signup");
//   const goToCart = () => navigate("/cart");

//   return (
//     <header className="w-full bg-white shadow px-4 py-3 flex items-center gap-6 flex-wrap">
//       {/* LEFT SECTION */}
//       <div className="flex items-center gap-4 flex-wrap">
//         <div className="w-12 rounded-full cursor-pointer" onClick={goHome}>
//           <img src={logo} className="rounded-3xl" alt="Logo" />
//         </div>

//         <span className="text-sm font-medium cursor-pointer" onClick={fetchBestSelling}>
//           👍 Best-Selling Items
//         </span>
//         <span className="text-sm font-medium cursor-pointer" onClick={fetchFiveStar}>
//           ⭐ 5-Star Rated
//         </span>
//         <span className="text-sm font-medium cursor-pointer" onClick={fetchNewIn}>
//           New In
//         </span>

//         {/* CATEGORIES DROPDOWN */}
//         {categories.length > 0 && (
//           <div className="relative group">
//             <span className="text-sm font-medium cursor-pointer">Categories ▼</span>
//             <div className="absolute hidden group-hover:block bg-white shadow-lg border rounded-md mt-1 p-2 z-20 min-w-[150px]">
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
//         )}
//       </div>

//       {/* SEARCH */}
//       <div className="flex-1 flex items-center min-w-[200px]">
//         <div className="w-full flex items-center border border-gray-400 rounded-full px-4 py-2">
//           <input
//             className="flex-1 outline-none"
//             type="text"
//             placeholder="Search Product"
//             value={searchValue}
//             onChange={(e) => setSearchValue(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && searchProducts()}
//           />
//           <FaSearch className="text-xl cursor-pointer" onClick={searchProducts} />
//         </div>
//       </div>

//       {/* RIGHT ICONS */}
//       <div className="flex items-center gap-8 flex-wrap">
//         <div className="flex flex-col items-center text-sm cursor-pointer" onClick={goToAccount}>
//           <FaUserCircle className="text-2xl" />
//           <span>Orders & Account</span>
//         </div>

//         <div className="flex flex-col items-center text-sm cursor-pointer">
//           <FaHeadset className="text-2xl" />
//           <span>Support</span>
//         </div>

//         <div className="relative cursor-pointer" onClick={goToCart}>
//           <HiShoppingCart className="text-3xl" />
//           {cartCount > 0 && (
//             <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
//               {cartCount}
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };










// import React from "react";
// import { FaSearch, FaUserCircle, FaHeadset } from "react-icons/fa";
// import { HiShoppingCart } from "react-icons/hi";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";

// export const StoreHeader = ({
//   categories = [],
//   searchValue = "",
//   setSearchValue = () => {},
//   searchProducts = () => {},
//   fetchBestSelling = () => {},
//   fetchFiveStar = () => {},
//   fetchNewIn = () => {},
//   loadCategory = () => {},
//   logo = "/logo.png",
// }) => {
//   const navigate = useNavigate();
//   const { cartItems } = useCart();
//   const cartCount = cartItems.length;

//   const goHome = () => navigate("/");
//   const goToAccount = () => navigate("/signup");
//   const goToCart = () => navigate("/cart");

//   // Wrapper to handle search + clear input
//   const handleSearch = () => {
//     searchProducts();
//     setSearchValue(""); // clear input after search
//   };

//   const handleBestSelling = () => {
//     fetchBestSelling();
//     setSearchValue("");
//   };

//   const handleFiveStar = () => {
//     fetchFiveStar();
//     setSearchValue("");
//   };

//   const handleNewIn = () => {
//     fetchNewIn();
//     setSearchValue("");
//   };

//   return (
//     <header className="w-full bg-white shadow px-4 py-3 flex items-center gap-6 flex-wrap">
//       {/* LEFT SECTION */}
//       <div className="flex items-center gap-4 flex-wrap">
//         <div className="w-12 rounded-full cursor-pointer" onClick={goHome}>
//           <img src={logo} className="rounded-3xl" alt="Logo" />
//         </div>

//         {/* <span className="text-sm font-medium cursor-pointer" onClick={handleBestSelling}>
//           👍 Best-Selling Items
//         </span>
//         <span className="text-sm font-medium cursor-pointer" onClick={handleFiveStar}>
//           ⭐ 5-Star Rated
//         </span> */}
//         <span className="text-sm font-medium cursor-pointer" onClick={handleNewIn}>
//           New In
//         </span>

//         {/* CATEGORIES DROPDOWN */}
//         {categories.length > 0 && (
//           <div className="relative group">
//             <span className="text-sm font-medium cursor-pointer">Categories ▼</span>
//             <div className="absolute hidden group-hover:block bg-white shadow-lg border rounded-md mt-1 p-2 z-20 min-w-[150px]">
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
//         )}
//       </div>

//       {/* SEARCH */}
//       <div className="flex-1 flex items-center min-w-[200px]">
//         <div className="w-full flex items-center border border-gray-400 rounded-full px-4 py-2">
//           <input
//             className="flex-1 outline-none"
//             type="text"
//             placeholder="Search Product"
//             value={searchValue}
//             onChange={(e) => setSearchValue(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//           />
//           <FaSearch className="text-xl cursor-pointer" onClick={handleSearch} />
//         </div>
//       </div>

//       {/* RIGHT ICONS */}
//       <div className="flex items-center gap-8 flex-wrap">
//         <div className="flex flex-col items-center text-sm cursor-pointer" onClick={goToAccount}>
//           <FaUserCircle className="text-2xl" />
//           <span>Orders & Account</span>
//         </div>

//         <div className="flex flex-col items-center text-sm cursor-pointer">
//           <FaHeadset className="text-2xl" />
//           <span>Support</span>
//         </div>

//         <div className="relative cursor-pointer" onClick={goToCart}>
//           <HiShoppingCart className="text-3xl" />
//           {cartCount > 0 && (
//             <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
//               {cartCount}
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };








// import React from "react";
// import { FaSearch, FaUserCircle, FaHeadset } from "react-icons/fa";
// import { HiShoppingCart } from "react-icons/hi";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";

// export const StoreHeader = ({
//   categories = [],
//   searchValue = "",
//   setSearchValue = () => {},
//   searchProducts = () => {},
//   fetchBestSelling = () => {},
//   fetchFiveStar = () => {},
//   fetchNewIn = () => {},
//   loadCategory = () => {},
//   logo = "/logo.png",
// }) => {
//   const navigate = useNavigate();
//   const { cartItems } = useCart();
//   const cartCount = cartItems.length;

//   const goHome = () => navigate("/store");
//   const goToAccount = () => navigate("/signup");
//   const goToCart = () => navigate("/cart");

//   // Wrapper to handle search + clear input
//   const handleSearch = () => {
//     searchProducts();
//     setSearchValue(""); // clear input after search
//   };

//   const handleBestSelling = () => {
//     fetchBestSelling();
//     setSearchValue("");
//   };

//   const handleFiveStar = () => {
//     fetchFiveStar();
//     setSearchValue("");
//   };

//   const handleNewIn = () => {
//     fetchNewIn();
//     setSearchValue("");
//   };

//   return (
//     <header className="w-full bg-white shadow px-4 py-3 flex items-center gap-6 flex-wrap">
//       {/* LEFT SECTION */}
//       <div className="flex items-center gap-4 flex-wrap">
//         <div className="w-12 rounded-full cursor-pointer" onClick={goHome}>
//           <img src={logo} className="rounded-3xl" alt="Logo" />
//         </div>

//         <span className="text-sm font-medium cursor-pointer" onClick={handleNewIn}>
//           New In
//         </span>

//         {/* CATEGORIES DROPDOWN */}
//         {categories.length > 0 && (
//           <div className="relative group">
//             <span className="text-sm font-medium cursor-pointer">Categories ▼</span>
//             <div className="absolute hidden group-hover:block bg-white shadow-lg border rounded-md mt-1 p-2 z-20 min-w-[150px]">
//               {/* ALL PRODUCTS */}
//               <div
//                 className="px-3 py-1 hover:bg-gray-200 cursor-pointer text-sm font-semibold"
//                 onClick={() => loadCategory(null)}
//               >
//                 All
//               </div>

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
//         )}
//       </div>

//       {/* SEARCH */}
//       <div className="flex-1 flex items-center min-w-[200px]">
//         <div className="w-full flex items-center border border-gray-400 rounded-full px-4 py-2">
//           <input
//             className="flex-1 outline-none"
//             type="text"
//             placeholder="Search Product"
//             value={searchValue}
//             onChange={(e) => setSearchValue(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//           />
//           <FaSearch className="text-xl cursor-pointer" onClick={handleSearch} />
//         </div>
//       </div>

//       {/* RIGHT ICONS */}
//       <div className="flex items-center gap-8 flex-wrap">
//         <div className="flex flex-col items-center text-sm cursor-pointer" onClick={goToAccount}>
//           <FaUserCircle className="text-2xl" />
//           <span>Orders & Account</span>
//         </div>

//         <div className="flex flex-col items-center text-sm cursor-pointer">
//           <FaHeadset className="text-2xl" />
//           <span>Support</span>
//         </div>

//         <div className="relative cursor-pointer" onClick={goToCart}>
//           <HiShoppingCart className="text-3xl" />
//           {cartCount > 0 && (
//             <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
//               {cartCount}
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };















// import React from "react";
// import { FaUserCircle, FaHeadset, FaSearch } from "react-icons/fa";
// import { HiShoppingCart } from "react-icons/hi";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";

// export const StoreHeader = ({
//   categories = [],
//   searchValue = "",
//   setSearchValue = () => {},
//   searchProducts = () => {},
//   fetchBestSelling = () => {},
//   fetchFiveStar = () => {},
//   loadCategory = () => {},
//   logo = "/logo.png",
// }) => {
//   const navigate = useNavigate();
//   const { cartItems } = useCart();
//   const cartCount = cartItems.length;

//   const goHome = () => navigate("/store");
//   const goToAccount = () => navigate("/signup");
//   const goToCart = () => navigate("/cart");

//   const handleSearch = () => {
//     searchProducts();
//     setSearchValue("");
//   };

//   const handleBestSelling = () => {
//     fetchBestSelling();
//     setSearchValue("");
//   };

//   const handleFiveStar = () => {
//     fetchFiveStar();
//     setSearchValue("");
//   };

//   return (
//     <header className="w-full bg-white shadow flex flex-col gap-3 p-4">
//       {/* SEARCH BAR ON TOP */}
//       <div className="w-full">
//         <div className="w-full flex items-center border border-gray-400 rounded-full px-4 py-2">
//           <input
//             className="flex-1 outline-none"
//             type="text"
//             placeholder="Search Product"
//             value={searchValue}
//             onChange={(e) => setSearchValue(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//           />
//           <FaSearch className="text-xl cursor-pointer" onClick={handleSearch} />
//         </div>
//       </div>

//       {/* LOGO, CATEGORIES, ORDERS/ACCOUNT, SUPPORT, CART */}
//       <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
//         {/* LOGO */}
//         <div className="flex items-center cursor-pointer" onClick={goHome}>
//           <img src={logo} alt="Logo" className="w-12 h-12 object-contain rounded-3xl" />
//         </div>

//         {/* CATEGORIES */}
//         {categories.length > 0 && (
//           <div className="relative group">
//             <span className="text-sm font-medium cursor-pointer">Categories ▼</span>
//             <div className="absolute hidden group-hover:block bg-white shadow-lg border rounded-md mt-1 p-2 z-20 min-w-[150px]">
//               <div
//                 className="px-3 py-1 hover:bg-gray-200 cursor-pointer text-sm font-semibold"
//                 onClick={() => loadCategory(null)}
//               >
//                 All
//               </div>
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
//         )}

//         {/* ORDERS & ACCOUNT */}
//         <div className="flex flex-col items-center text-sm cursor-pointer" onClick={goToAccount}>
//           <FaUserCircle className="text-2xl" />
//           <span>Orders & Account</span>
//         </div>

//         {/* SUPPORT */}
//         <div className="flex flex-col items-center text-sm cursor-pointer">
//           <FaHeadset className="text-2xl" />
//           <span>Support</span>
//         </div>

//         {/* CART */}
//         <div className="relative cursor-pointer" onClick={goToCart}>
//           <HiShoppingCart className="text-3xl" />
//           {cartCount > 0 && (
//             <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
//               {cartCount}
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };


















import React from "react";
import { FaUserCircle, FaHeadset, FaSearch } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export const StoreHeader = ({
  categories = [],
  searchValue = "",
  setSearchValue = () => {},
  searchProducts = () => {},
  fetchBestSelling = () => {},
  fetchFiveStar = () => {},
  loadCategory = () => {},
  logo = "/logo.png",
}) => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const cartCount = cartItems.length;

  const goHome = () => navigate("/store");
  const goToAccount = () => navigate("/account");
  const goToCart = () => navigate("/cart");

  const handleSearch = () => {
    searchProducts();
    setSearchValue("");
  };

  const handleSupport = () => {
    // Replace your number below with international format (without + or spaces)
    const phoneNumber = "2348083692774"; 
    const message = encodeURIComponent("Hello! I need support regarding my order.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <header className="w-full bg-white shadow flex flex-col gap-3 p-4">
      {/* SEARCH BAR ON TOP */}
      <div className="w-full">
        <div className="w-full flex items-center border border-gray-400 rounded-full px-4 py-2">
          <input
            className="flex-1 outline-none"
            type="text"
            placeholder="Search Product"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <FaSearch className="text-xl cursor-pointer" onClick={handleSearch} />
        </div>
      </div>

      {/* LOGO, CATEGORIES, ORDERS/ACCOUNT, SUPPORT, CART */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
        {/* LOGO */}
        <div className="flex items-center cursor-pointer" onClick={goHome}>
          <img src={logo} alt="Logo" className="w-12 h-12 object-contain rounded-3xl" />
        </div>

        {/* CATEGORIES */}
        {categories.length > 0 && (
          <div className="relative group">
            <span className="text-sm font-medium cursor-pointer">Categories ▼</span>
            <div className="absolute hidden group-hover:block bg-white shadow-lg border rounded-md mt-1 p-2 z-20 min-w-[150px]">
              <div
                className="px-3 py-1 hover:bg-gray-200 cursor-pointer text-sm font-semibold"
                onClick={() => loadCategory(null)}
              >
                All
              </div>
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="px-3 py-1 hover:bg-gray-200 cursor-pointer text-sm"
                  onClick={() => loadCategory(cat.id)}
                >
                  {cat.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ORDERS & ACCOUNT */}
        <div className="flex flex-col items-center text-sm cursor-pointer" onClick={goToAccount}>
          <FaUserCircle className="text-2xl" />
          <span>Orders & Account</span>
        </div>

        {/* SUPPORT */}
        <div className="flex flex-col items-center text-sm cursor-pointer" onClick={handleSupport}>
          <FaHeadset className="text-2xl" />
          <span>Support</span>
        </div>

        {/* CART */}
        <div className="relative cursor-pointer" onClick={goToCart}>
          <HiShoppingCart className="text-3xl" />
          {cartCount > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
              {cartCount}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
