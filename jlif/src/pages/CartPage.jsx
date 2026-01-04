// import React from "react";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";

// export const CartPage = () => {
//   const { cartItems, removeFromCart, clearCart } = useCart();
//   const navigate = useNavigate();

//   const total = cartItems.reduce(
//     (acc, item) => acc + item.cleaned_price * item.quantity,
//     0
//   );

//   const formattedTotal = total.toLocaleString("en-NG", {
//     style: "currency",
//     currency: "NGN",
//   });

//   const goToCheckout = () => navigate("/checkout/email");

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold text-[#003366] mb-4">Your Cart</h1>

//       {cartItems.length === 0 ? (
//         <p className="text-gray-500">Your cart is empty.</p>
//       ) : (
//         <div className="space-y-4">
//           {cartItems.map((item) => (
//             <div
//               key={item.id}
//               className="flex justify-between items-center border-b pb-2"
//             >
//               <div>
//                 <p className="font-semibold">{item.title}</p>
//                 <p className="text-[#FF0000]">
//                   {item.formatted_price} × {item.quantity}
//                 </p>
//               </div>

//               <button
//                 onClick={() => removeFromCart(item.id)}
//                 className="text-[#FF0000] font-bold"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}

//           <p className="text-xl font-bold mt-4">Total: {formattedTotal}</p>

//           <button
//             onClick={goToCheckout}
//             className="mt-4 bg-[#003366] text-white px-6 py-3 rounded hover:bg-[#002244]"
//           >
//             Proceed to Checkout
//           </button>

//           <button
//             onClick={clearCart}
//             className="mt-2 bg-[#FF0000] text-white px-6 py-3 rounded hover:bg-[#003366]"
//           >
//             Clear Cart
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };














// import React from "react";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";

// export const CartPage = () => {
//   const { cartItems, removeFromCart, clearCart } = useCart();
//   const navigate = useNavigate();

//   // FIXED: use item.price instead of item.cleaned_price
//   const total = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   const formattedTotal = total.toLocaleString("en-NG", {
//     style: "currency",
//     currency: "NGN",
//   });

//   const goToCheckout = () => navigate("/checkout/email");

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold text-[#003366] mb-4">Your Cart</h1>

//       {cartItems.length === 0 ? (
//         <p className="text-gray-500">Your cart is empty.</p>
//       ) : (
//         <div className="space-y-4">
//           {cartItems.map((item) => (
//             <div
//               key={item.id}
//               className="flex justify-between items-center border-b pb-2"
//             >
//               <div>
//                 <p className="font-semibold">{item.title}</p>

//                 {/* SHOW subtotal per item */}
//                 <p className="text-[#FF0000]">
//                   {item.formatted_price} × {item.quantity} ={" "}
//                   <span className="font-bold">
//                     ₦{(item.price * item.quantity).toLocaleString()}
//                   </span>
//                 </p>
//               </div>

//               <button
//                 onClick={() => removeFromCart(item.id)}
//                 className="text-[#FF0000] font-bold"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}

//           {/* FIXED TOTAL */}
//           <p className="text-xl font-bold mt-4">Total: {formattedTotal}</p>

//           <button
//             onClick={goToCheckout}
//             className="mt-4 bg-[#003366] text-white px-6 py-3 rounded hover:bg-[#002244]"
//           >
//             Proceed to Checkout
//           </button>

//           <button
//             onClick={clearCart}
//             className="mt-2 bg-[#FF0000] text-white px-6 py-3 rounded hover:bg-[#003366]"
//           >
//             Clear Cart
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };













// import React from "react";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";

// export const CartPage = () => {
//   const { cartItems, removeFromCart, clearCart, addToCart } = useCart();
//   const navigate = useNavigate();

//   const getPrice = (item) =>
//     item.cleaned_price ?? item.unit_price ?? 0;

//   const total = cartItems.reduce(
//     (acc, item) => acc + getPrice(item) * item.quantity,
//     0
//   );

//   const formattedTotal = total.toLocaleString("en-NG", {
//     style: "currency",
//     currency: "NGN",
//   });

//   const goToCheckout = () => navigate("/checkout/email");

//   return (
//     <div className="min-h-screen bg-gray-100 pb-28">
//       {/* HEADER */}
//       <div className="p-4 bg-[#003366] text-white text-xl font-bold shadow">
//         My Cart ({cartItems.length})
//       </div>

//       <div className="container mx-auto p-4 space-y-4">
//         {cartItems.length === 0 ? (
//           <p className="text-center text-gray-500 mt-10 text-lg">
//             Your cart is empty.
//           </p>
//         ) : (
//           cartItems.map((item) => (
//             <div
//               key={item.id}
//               className="bg-white shadow rounded-md p-4 flex gap-4"
//             >
//               {/* IMAGE */}
//               <div className="w-24 h-24 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="object-cover w-full h-full"
//                 />
//               </div>

//               {/* DETAILS */}
//               <div className="flex-1 flex flex-col justify-between">
//                 <div>
//                   <h2 className="font-semibold text-gray-800 line-clamp-2">
//                     {item.title}
//                   </h2>

//                   {/* PRICES */}
//                   <p className="text-[#FF0000] font-bold text-lg mt-1">
//                     ₦{getPrice(item).toLocaleString()}
//                   </p>

//                   <p className="text-gray-500 text-sm">
//                     Subtotal:{" "}
//                     <span className="font-semibold">
//                       ₦{(getPrice(item) * item.quantity).toLocaleString()}
//                     </span>
//                   </p>
//                 </div>

//                 {/* QUANTITY CONTROLS */}
//                 <div className="flex items-center gap-3 mt-2">
//                   <button
//                     onClick={() =>
//                       addToCart({ ...item }, -1)
//                     }
//                     disabled={item.quantity <= 1}
//                     className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
//                   >
//                     -
//                   </button>

//                   <span className="font-semibold text-gray-700">
//                     {item.quantity}
//                   </span>

//                   <button
//                     onClick={() => addToCart(item, 1)}
//                     className="w-8 h-8 rounded-full bg-[#003366] text-white flex items-center justify-center"
//                   >
//                     +
//                   </button>

//                   <button
//                     onClick={() => removeFromCart(item.id)}
//                     className="ml-auto text-red-500 font-semibold"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* STICKY FOOTER BAR */}
//       {cartItems.length > 0 && (
//         <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl p-4 border-t">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-sm">Total</p>
//               <p className="text-2xl font-bold text-[#FF0000]">
//                 {formattedTotal}
//               </p>
//             </div>

//             <button
//               onClick={goToCheckout}
//               className="bg-[#ff9900] hover:bg-[#ff7a00] text-white px-6 py-3 rounded-lg font-semibold text-lg transition"
//             >
//               Checkout
//             </button>
//           </div>

//           <button
//             onClick={clearCart}
//             className="mt-3 text-red-600 underline text-sm"
//           >
//             Clear Cart
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };














// import React from "react";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import { StoreHeader } from "../components/StoreHeader"; // <-- NEW IMPORT

// export const CartPage = ({
//   searchValue,
//   setSearchValue,
//   searchProducts,
//   categories,
//   loadCategory,
//   goHome,
//   goToAccount,
// }) => {
//   const { cartItems, removeFromCart, clearCart, addToCart } = useCart();
//   const navigate = useNavigate();

//   const getPrice = (item) =>
//     item.cleaned_price ?? item.unit_price ?? 0;

//   const total = cartItems.reduce(
//     (acc, item) => acc + getPrice(item) * item.quantity,
//     0
//   );

//   const formattedTotal = total.toLocaleString("en-NG", {
//     style: "currency",
//     currency: "NGN",
//   });

//   const goToCheckout = () => navigate("/checkout/email");

//   return (
//     <div className="min-h-screen bg-gray-100 pb-28">
//       {/* 🟦 STORE HEADER APPEARS HERE */}
//       <StoreHeader
//         searchValue={searchValue}
//         setSearchValue={setSearchValue}
//         searchProducts={searchProducts}
//         categories={categories}
//         loadCategory={loadCategory}
//         cartCount={cartItems.length}
//         goHome={goHome}
//         goToAccount={goToAccount}
//       />

//       <div className="container mx-auto p-4 space-y-4">
//         {cartItems.length === 0 ? (
//           <p className="text-center text-gray-500 mt-10 text-lg">
//             Your cart is empty.
//           </p>
//         ) : (
//           cartItems.map((item) => (
//             <div
//               key={item.id}
//               className="bg-white shadow rounded-md p-4 flex gap-4"
//             >
//               {/* IMAGE */}
//               <div className="w-24 h-24 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="object-cover w-full h-full"
//                 />
//               </div>

//               {/* DETAILS */}
//               <div className="flex-1 flex flex-col justify-between">
//                 <div>
//                   <h2 className="font-semibold text-gray-800 line-clamp-2">
//                     {item.title}
//                   </h2>

//                   <p className="text-[#FF0000] font-bold text-lg mt-1">
//                     ₦{getPrice(item).toLocaleString()}
//                   </p>

//                   <p className="text-gray-500 text-sm">
//                     Subtotal:{" "}
//                     <span className="font-semibold">
//                       ₦{(getPrice(item) * item.quantity).toLocaleString()}
//                     </span>
//                   </p>
//                 </div>

//                 {/* QUANTITY CONTROLS */}
//                 <div className="flex items-center gap-3 mt-2">
//                   <button
//                     onClick={() => addToCart({ ...item }, -1)}
//                     disabled={item.quantity <= 1}
//                     className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-40"
//                   >
//                     -
//                   </button>

//                   <span className="font-semibold text-gray-700">
//                     {item.quantity}
//                   </span>

//                   <button
//                     onClick={() => addToCart(item, 1)}
//                     className="w-8 h-8 rounded-full bg-[#003366] text-white flex items-center justify-center"
//                   >
//                     +
//                   </button>

//                   <button
//                     onClick={() => removeFromCart(item.id)}
//                     className="ml-auto text-red-500 font-semibold"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* STICKY FOOTER BAR */}
//       {cartItems.length > 0 && (
//         <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl p-4 border-t">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-sm">Total</p>
//               <p className="text-2xl font-bold text-[#FF0000]">
//                 {formattedTotal}
//               </p>
//             </div>

//             <button
//               onClick={goToCheckout}
//               className="bg-[#ff9900] hover:bg-[#ff7a00] text-white px-6 py-3 rounded-lg font-semibold text-lg transition"
//             >
//               Checkout
//             </button>
//           </div>

//           <button
//             onClick={clearCart}
//             className="mt-3 text-red-600 underline text-sm"
//           >
//             Clear Cart
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };












// import React from "react";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import { StoreHeader } from "../components/StoreHeader";

// export const CartPage = ({
//   searchValue = "",
//   setSearchValue = () => {},
//   searchProducts = () => {},
//   categories = [],
//   loadCategory = () => {},
//   goHome = () => (window.location.href = "/"),
//   goToAccount = () => (window.location.href = "/signup"),
// }) => {
//   const { cartItems, removeFromCart, clearCart, addToCart } = useCart();
//   const navigate = useNavigate();

//   const getPrice = (item) => item.cleaned_price ?? item.unit_price ?? 0;

//   const total = cartItems.reduce(
//     (acc, item) => acc + getPrice(item) * item.quantity,
//     0
//   );

//   const formattedTotal = total.toLocaleString("en-NG", {
//     style: "currency",
//     currency: "NGN",
//   });

//   const goToCheckout = () => navigate("/checkout/email");

//   return (
//     <div className="min-h-screen bg-gray-100 pb-28">
//       {/* 🟦 STORE HEADER */}
//       <StoreHeader
//         searchValue={searchValue}
//         setSearchValue={setSearchValue}
//         searchProducts={searchProducts}
//         categories={categories}
//         loadCategory={loadCategory}
//         cartCount={cartItems.length}
//         goHome={goHome}
//         goToAccount={goToAccount}
//       />

//       <div className="container mx-auto p-4 space-y-4">
//         {cartItems.length === 0 ? (
//           <p className="text-center text-gray-500 mt-10 text-lg">
//             Your cart is empty.
//           </p>
//         ) : (
//           cartItems.map((item) => (
//             <div
//               key={item.id}
//               className="bg-white shadow rounded-md p-4 flex gap-4"
//             >
//               {/* IMAGE */}
//               <div className="w-24 h-24 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="object-cover w-full h-full"
//                 />
//               </div>

//               {/* DETAILS */}
//               <div className="flex-1 flex flex-col justify-between">
//                 <div>
//                   <h2 className="font-semibold text-gray-800 line-clamp-2">
//                     {item.title}
//                   </h2>

//                   <p className="text-[#FF0000] font-bold text-lg mt-1">
//                     ₦{getPrice(item).toLocaleString()}
//                   </p>

//                   <p className="text-gray-500 text-sm">
//                     Subtotal:{" "}
//                     <span className="font-semibold">
//                       ₦{(getPrice(item) * item.quantity).toLocaleString()}
//                     </span>
//                   </p>
//                 </div>

//                 {/* QUANTITY CONTROLS */}
//                 <div className="flex items-center gap-3 mt-2">
//                   <button
//                     onClick={() => addToCart({ ...item }, -1)}
//                     disabled={item.quantity <= 1}
//                     className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-40"
//                   >
//                     -
//                   </button>

//                   <span className="font-semibold text-gray-700">
//                     {item.quantity}
//                   </span>

//                   <button
//                     onClick={() => addToCart(item, 1)}
//                     className="w-8 h-8 rounded-full bg-[#003366] text-white flex items-center justify-center"
//                   >
//                     +
//                   </button>

//                   <button
//                     onClick={() => removeFromCart(item.id)}
//                     className="ml-auto text-red-500 font-semibold"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* STICKY FOOTER BAR */}
//       {cartItems.length > 0 && (
//         <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl p-4 border-t">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-sm">Total</p>
//               <p className="text-2xl font-bold text-[#FF0000]">{formattedTotal}</p>
//             </div>

//             <button
//               onClick={goToCheckout}
//               className="bg-[#ff9900] hover:bg-[#ff7a00] text-white px-6 py-3 rounded-lg font-semibold text-lg transition"
//             >
//               Checkout
//             </button>
//           </div>

//           <button
//             onClick={clearCart}
//             className="mt-3 text-red-600 underline text-sm"
//           >
//             Clear Cart
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };














// import React from "react";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import { StoreLayout } from "../layouts/StoreLayout";

// export const CartPage = ({
//   searchValue = "",
//   setSearchValue = () => {},
//   searchProducts = () => {},
//   categories = [],
//   loadCategory = () => {},
//   goHome = () => (window.location.href = "/"),
//   goToAccount = () => (window.location.href = "/signup"),
// }) => {
//   const { cartItems, removeFromCart, clearCart, addToCart } = useCart();
//   const navigate = useNavigate();

//   const getPrice = (item) => item.cleaned_price ?? item.unit_price ?? 0;
//   const total = cartItems.reduce(
//     (acc, item) => acc + getPrice(item) * item.quantity,
//     0
//   );
//   const formattedTotal = total.toLocaleString("en-NG", {
//     style: "currency",
//     currency: "NGN",
//   });

//   const goToCheckout = () => navigate("/checkout/email");

//   return (
//     <StoreLayout
//       searchValue={searchValue}
//       setSearchValue={setSearchValue}
//       searchProducts={searchProducts}
//       categories={categories}
//       loadCategory={loadCategory}
//       cartCount={cartItems.length}
//       goHome={goHome}
//       goToAccount={goToAccount}
//     >
//       <div className="container mx-auto p-4 space-y-4">
//         {cartItems.length === 0 ? (
//           <p className="text-center text-gray-500 mt-10 text-lg">
//             Your cart is empty.
//           </p>
//         ) : (
//           cartItems.map((item) => (
//             <div
//               key={item.id}
//               className="bg-white shadow rounded-md p-4 flex gap-4"
//             >
//               {/* IMAGE */}
//               <div className="w-24 h-24 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="object-cover w-full h-full"
//                 />
//               </div>

//               {/* DETAILS */}
//               <div className="flex-1 flex flex-col justify-between">
//                 <div>
//                   <h2 className="font-semibold text-gray-800 line-clamp-2">
//                     {item.title}
//                   </h2>

//                   <p className="text-[#FF0000] font-bold text-lg mt-1">
//                     ₦{getPrice(item).toLocaleString()}
//                   </p>

//                   <p className="text-gray-500 text-sm">
//                     Subtotal:{" "}
//                     <span className="font-semibold">
//                       ₦{(getPrice(item) * item.quantity).toLocaleString()}
//                     </span>
//                   </p>
//                 </div>

//                 {/* QUANTITY CONTROLS */}
//                 <div className="flex items-center gap-3 mt-2">
//                   <button
//                     onClick={() => addToCart({ ...item }, -1)}
//                     disabled={item.quantity <= 1}
//                     className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-40"
//                   >
//                     -
//                   </button>

//                   <span className="font-semibold text-gray-700">
//                     {item.quantity}
//                   </span>

//                   <button
//                     onClick={() => addToCart(item, 1)}
//                     className="w-8 h-8 rounded-full bg-[#003366] text-white flex items-center justify-center"
//                   >
//                     +
//                   </button>

//                   <button
//                     onClick={() => removeFromCart(item.id)}
//                     className="ml-auto text-red-500 font-semibold"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* STICKY FOOTER BAR */}
//       {cartItems.length > 0 && (
//         <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl p-4 border-t">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-sm">Total</p>
//               <p className="text-2xl font-bold text-[#FF0000]">{formattedTotal}</p>
//             </div>

//             <button
//               onClick={goToCheckout}
//               className="bg-[#ff9900] hover:bg-[#ff7a00] text-white px-6 py-3 rounded-lg font-semibold text-lg transition"
//             >
//               Checkout
//             </button>
//           </div>

//           <button
//             onClick={clearCart}
//             className="mt-3 text-red-600 underline text-sm"
//           >
//             Clear Cart
//           </button>
//         </div>
//       )}
//     </StoreLayout>
//   );
// };














// import React from "react";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import { StoreLayout } from "../layouts/StoreLayout";

// export const CartPage = ({
//   searchValue = "",
//   setSearchValue = () => {},
//   searchProducts = () => {},
//   categories = [],
//   loadCategory = () => {},
//   goHome = () => (window.location.href = "/"),
//   goToAccount = () => (window.location.href = "/signup"),
// }) => {
//   const { cartItems, removeFromCart, clearCart, addToCart } = useCart();
//   const navigate = useNavigate();

//   const getPrice = (item) => item.cleaned_price ?? item.unit_price ?? 0;

//   const total = cartItems.reduce(
//     (acc, item) => acc + getPrice(item) * item.quantity,
//     0
//   );

//   const formattedTotal = total.toLocaleString("en-NG", {
//     style: "currency",
//     currency: "NGN",
//   });

//   const goToCheckout = () => navigate("/checkout/email");

//   return (
//     <StoreLayout
//       searchValue={searchValue}
//       setSearchValue={setSearchValue}
//       searchProducts={searchProducts}
//       categories={categories}       // ✅ Pass categories to layout
//       loadCategory={loadCategory}   // ✅ Pass category click handler
//       cartCount={cartItems.length}
//       goHome={goHome}
//       goToAccount={goToAccount}
//       logo="/logo.png"              // ✅ Use logo from public folder
//     >
//       <div className="container mx-auto p-4 space-y-4">
//         {cartItems.length === 0 ? (
//           <p className="text-center text-gray-500 mt-10 text-lg">
//             Your cart is empty.
//           </p>
//         ) : (
//           cartItems.map((item) => (
//             <div
//               key={item.id}
//               className="bg-white shadow rounded-md p-4 flex gap-4"
//             >
//               {/* IMAGE */}
//               <div className="w-24 h-24 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="object-cover w-full h-full"
//                 />
//               </div>

//               {/* DETAILS */}
//               <div className="flex-1 flex flex-col justify-between">
//                 <div>
//                   <h2 className="font-semibold text-gray-800 line-clamp-2">
//                     {item.title}
//                   </h2>

//                   <p className="text-[#FF0000] font-bold text-lg mt-1">
//                     ₦{getPrice(item).toLocaleString()}
//                   </p>

//                   <p className="text-gray-500 text-sm">
//                     Subtotal:{" "}
//                     <span className="font-semibold">
//                       ₦{(getPrice(item) * item.quantity).toLocaleString()}
//                     </span>
//                   </p>
//                 </div>

//                 {/* QUANTITY CONTROLS */}
//                 <div className="flex items-center gap-3 mt-2">
//                   <button
//                     onClick={() => addToCart({ ...item }, -1)}
//                     disabled={item.quantity <= 1}
//                     className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-40"
//                   >
//                     -
//                   </button>

//                   <span className="font-semibold text-gray-700">
//                     {item.quantity}
//                   </span>

//                   <button
//                     onClick={() => addToCart(item, 1)}
//                     className="w-8 h-8 rounded-full bg-[#003366] text-white flex items-center justify-center"
//                   >
//                     +
//                   </button>

//                   <button
//                     onClick={() => removeFromCart(item.id)}
//                     className="ml-auto text-red-500 font-semibold"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* STICKY FOOTER BAR */}
//       {cartItems.length > 0 && (
//         <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl p-4 border-t">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-sm">Total</p>
//               <p className="text-2xl font-bold text-[#FF0000]">{formattedTotal}</p>
//             </div>

//             <button
//               onClick={goToCheckout}
//               className="bg-[#ff9900] hover:bg-[#ff7a00] text-white px-6 py-3 rounded-lg font-semibold text-lg transition"
//             >
//               Checkout
//             </button>
//           </div>

//           <button
//             onClick={clearCart}
//             className="mt-3 text-red-600 underline text-sm"
//           >
//             Clear Cart
//           </button>
//         </div>
//       )}
//     </StoreLayout>
//   );
// };
















// import React, { useEffect, useState } from "react";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import { StoreLayout } from "../layouts/StoreLayout";
// import axios from "axios";

// export const CartPage = () => {
//   const { cartItems, removeFromCart, clearCart, addToCart } = useCart();
//   const navigate = useNavigate();

//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");

//   const BASE_URL = "http://127.0.0.1:8000/store";

//   // Fetch categories for header
//   useEffect(() => {
//     axios.get(`${BASE_URL}/categories/`)
//       .then((res) => setCategories(res.data || []))
//       .catch(console.error);
//   }, []);

//   const searchProducts = () => console.log("Search for:", searchValue);
//   const loadCategory = (id) => console.log("Load category:", id);
//   const goHome = () => (window.location.href = "/");
//   const goToAccount = () => (window.location.href = "/signup");

//   const getPrice = (item) => item.cleaned_price ?? item.unit_price ?? 0;
//   const total = cartItems.reduce((acc, item) => acc + getPrice(item) * item.quantity, 0);
//   const formattedTotal = total.toLocaleString("en-NG", { style: "currency", currency: "NGN" });

//   const goToCheckout = () => navigate("/checkout/email");

//   return (
//     <StoreLayout
//       searchValue={searchValue}
//       setSearchValue={setSearchValue}
//       searchProducts={searchProducts}
//       categories={categories}
//       loadCategory={loadCategory}
//       cartCount={cartItems.length}
//       goHome={goHome}
//       goToAccount={goToAccount}
//       logo="/logo.png"
//     >
//       <div className="container mx-auto p-4 space-y-4">
//         {cartItems.length === 0 ? (
//           <p className="text-center text-gray-500 mt-10 text-lg">Your cart is empty.</p>
//         ) : (
//           cartItems.map((item) => (
//             <div key={item.id} className="bg-white shadow rounded-md p-4 flex gap-4">
//               {/* IMAGE */}
//               <div className="w-24 h-24 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
//                 <img src={item.image} alt={item.title} className="object-cover w-full h-full" />
//               </div>

//               {/* DETAILS */}
//               <div className="flex-1 flex flex-col justify-between">
//                 <div>
//                   <h2 className="font-semibold text-gray-800 line-clamp-2">{item.title}</h2>

//                   <p className="text-[#FF0000] font-bold text-lg mt-1">₦{getPrice(item).toLocaleString()}</p>
//                   <p className="text-gray-500 text-sm">
//                     Subtotal: <span className="font-semibold">₦{(getPrice(item) * item.quantity).toLocaleString()}</span>
//                   </p>
//                 </div>

//                 {/* QUANTITY CONTROLS */}
//                 <div className="flex items-center gap-3 mt-2">
//                   <button
//                     onClick={() => addToCart({ ...item }, -1)}
//                     disabled={item.quantity <= 1}
//                     className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-40"
//                   >
//                     -
//                   </button>

//                   <span className="font-semibold text-gray-700">{item.quantity}</span>

//                   <button
//                     onClick={() => addToCart(item, 1)}
//                     className="w-8 h-8 rounded-full bg-[#003366] text-white flex items-center justify-center"
//                   >
//                     +
//                   </button>

//                   <button
//                     onClick={() => removeFromCart(item.id)}
//                     className="ml-auto text-red-500 font-semibold"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* STICKY FOOTER BAR */}
//       {cartItems.length > 0 && (
//         <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl p-4 border-t">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-sm">Total</p>
//               <p className="text-2xl font-bold text-[#FF0000]">{formattedTotal}</p>
//             </div>

//             <button
//               onClick={goToCheckout}
//               className="bg-[#ff9900] hover:bg-[#ff7a00] text-white px-6 py-3 rounded-lg font-semibold text-lg transition"
//             >
//               Checkout
//             </button>
//           </div>

//           <button onClick={clearCart} className="mt-3 text-red-600 underline text-sm">
//             Clear Cart
//           </button>
//         </div>
//       )}
//     </StoreLayout>
//   );
// };











// import React, { useEffect, useState } from "react";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import { StoreLayout } from "../layouts/StoreLayout";
// import axios from "axios";
// import { FaCheck, FaTrash } from "react-icons/fa";

// export const CartPage = () => {
//   const { cartItems, removeFromCart, clearCart, addToCart } = useCart();
//   const navigate = useNavigate();

//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [selectAll, setSelectAll] = useState(true);

//   const BASE_URL = "http://127.0.0.1:8000/store";

//   useEffect(() => {
//     axios
//       .get(`${BASE_URL}/categories/`)
//       .then((res) => setCategories(res.data || []))
//       .catch(console.error);
//   }, []);

//   const searchProducts = () => console.log("Search:", searchValue);
//   const loadCategory = (id) => console.log("Category:", id);
//   const goHome = () => (window.location.href = "/");
//   const goToAccount = () => (window.location.href = "/signup");

//   const getPrice = (item) => item.cleaned_price ?? item.unit_price ?? 0;

//   const total = cartItems.reduce(
//     (acc, item) => acc + getPrice(item) * item.quantity,
//     0
//   );

//   const formattedTotal = total.toLocaleString("en-NG", {
//     style: "currency",
//     currency: "NGN",
//   });

//   const originalTotal = cartItems.reduce(
//     (acc, item) => acc + (item.old_price || getPrice(item)) * item.quantity,
//     0
//   );

//   const discount = originalTotal - total;

//   const goToCheckout = () => navigate("/checkout/email");

//   return (
//     <StoreLayout
//       searchValue={searchValue}
//       setSearchValue={setSearchValue}
//       searchProducts={searchProducts}
//       categories={categories}
//       loadCategory={loadCategory}
//       cartCount={cartItems.length}
//       goHome={goHome}
//       goToAccount={goToAccount}
//       logo="/logo.png"
//     >
//       {/* TOP BANNER */}
//       <div className="bg-green-100 text-green-700 p-4 flex items-center gap-3 mt-3 rounded-md">
//         <FaCheck />
//         <p className="font-medium">Free shipping special for you</p>
//         <span className="ml-auto text-sm text-green-600">Limited-time offer</span>
//       </div>

//       {/* SELECT ALL */}
//       <div className="flex items-center gap-3 mt-4 px-2">
//         <button
//           className={`w-6 h-6 rounded-full border flex items-center justify-center ${
//             selectAll ? "bg-green-600 border-green-600 text-white" : "border-gray-400"
//           }`}
//           onClick={() => setSelectAll(!selectAll)}
//         >
//           {selectAll && <FaCheck size={12} />}
//         </button>
//         <p className="font-medium">Select all ({cartItems.length})</p>
//       </div>

//       {/* ITEMS LIST */}
//       <div className="mt-3 space-y-4 pb-40">
//         {cartItems.map((item) => (
//           <div key={item.id} className="bg-white shadow-sm border rounded-md p-4 flex gap-4">
//             {/* Checkbox */}
//             <button
//               className={`w-5 h-5 mt-8 rounded-full border flex items-center justify-center ${
//                 selectAll ? "bg-green-600 border-green-600 text-white" : "border-gray-400"
//               }`}
//             >
//               {selectAll && <FaCheck size={10} />}
//             </button>

//             {/* IMAGE */}
//             <div className="w-24 h-24 rounded bg-gray-100 overflow-hidden">
//               <img src={item.image} alt={item.title} className="object-cover w-full h-full" />
//             </div>

//             {/* DETAILS */}
//             <div className="flex-1 flex flex-col justify-between">
//               <h2 className="font-semibold text-gray-800 line-clamp-2">
//                 {item.title}
//               </h2>

//               {/* PRICE SECTION */}
//               <div className="mt-2">
//                 <div className="flex items-center gap-3">
//                   <span className="bg-orange-500 text-white text-xs px-2 py-[2px] rounded">
//                     -{Math.round(((item.old_price - getPrice(item)) / item.old_price) * 100)}%
//                   </span>

//                   <p className="line-through text-gray-400 text-sm">
//                     ₦{(item.old_price || 0).toLocaleString()}
//                   </p>
//                 </div>

//                 <p className="text-orange-600 font-bold text-lg mt-1">
//                   ₦{getPrice(item).toLocaleString()}
//                 </p>
//               </div>

//               {/* QUANTITY CONTROLS */}
//               <div className="flex items-center gap-3 mt-3">
//                 <button
//                   onClick={() => addToCart(item, -1)}
//                   disabled={item.quantity <= 1}
//                   className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-40"
//                 >
//                   -
//                 </button>

//                 <span className="font-semibold text-gray-700">{item.quantity}</span>

//                 <button
//                   onClick={() => addToCart(item, 1)}
//                   className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center"
//                 >
//                   +
//                 </button>

//                 <button
//                   onClick={() => removeFromCart(item.id)}
//                   className="ml-auto text-red-500"
//                 >
//                   <FaTrash />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ORDER SUMMARY BAR */}
//       {cartItems.length > 0 && (
//         <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl p-4 border-t">
//           <p className="text-gray-600 text-sm">Order Summary</p>

//           <div className="flex justify-between mt-2">
//             <p className="text-gray-500">Item(s) total:</p>
//             <p className="line-through text-gray-400">
//               ₦{originalTotal.toLocaleString()}
//             </p>
//           </div>

//           <div className="flex justify-between">
//             <p className="text-gray-500">Item(s) discount:</p>
//             <p className="text-orange-600 font-semibold">
//               -₦{discount.toLocaleString()}
//             </p>
//           </div>

//           <hr className="my-3" />

//           <div className="flex justify-between items-center">
//             <p className="text-xl font-bold">₦{total.toLocaleString()}</p>
//           </div>

//           <button
//             onClick={goToCheckout}
//             className="bg-orange-500 hover:bg-orange-600 text-white w-full mt-3 py-3 rounded-lg font-semibold flex items-center justify-center"
//           >
//             ⚡ Last day for 73.2% off — Checkout ({cartItems.length})
//           </button>

//           <button
//             onClick={clearCart}
//             className="text-red-600 underline text-sm mt-2 block text-center"
//           >
//             Clear Cart
//           </button>
//         </div>
//       )}
//     </StoreLayout>
//   );
// };













// import React, { useEffect, useState } from "react";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import { StoreLayout } from "../layouts/StoreLayout";
// import axios from "axios";
// import { FaTrash, FaPlus } from "react-icons/fa";

// export const CartPage = () => {
//   const { cartItems, removeFromCart, clearCart, addToCart } = useCart();
//   const navigate = useNavigate();

//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [allProducts, setAllProducts] = useState([]);

//   const BASE_URL = "http://127.0.0.1:8000/store";

//   useEffect(() => {
//     axios.get(`${BASE_URL}/categories/`).then((res) => setCategories(res.data || []));
//     axios.get(`${BASE_URL}/products/`).then((res) => setAllProducts(res.data || []));
//   }, []);

//   const searchProducts = () => console.log("Search:", searchValue);
//   const loadCategory = (id) => console.log("Category:", id);
//   const goHome = () => (window.location.href = "/");
//   const goToAccount = () => (window.location.href = "/signup");

//   const getPrice = (item) => Number(item.cleaned_price ?? 0);

//   const totalPrice = cartItems.reduce(
//     (acc, item) => acc + getPrice(item) * item.quantity,
//     0
//   );

//   const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

//   const goToCheckout = () => navigate("/checkout/email");

//   // ⭐ OPEN PRODUCT DIRECTLY (NO AUTH)
//   const handleViewProduct = (productId) => {
//     navigate(`/product/${productId}`);
//   };

//   // ⭐ ADD PRODUCT TO CART FROM "More Products"
//   const handleAddToCart = (product) => {
//     const price =
//       typeof product.price === "string"
//         ? Number(product.price.replace(/[^\d.]/g, ""))
//         : product.price ?? 0;

//     addToCart({
//       id: product.id,
//       title: product.title,
//       cleaned_price: price,
//       formatted_price: "₦" + price.toLocaleString(),
//       quantity: 1,
//       image: product.images?.[0]?.image ?? "",
//     });
//   };

//   return (
//     <StoreLayout
//       searchValue={searchValue}
//       setSearchValue={setSearchValue}
//       searchProducts={searchProducts}
//       categories={categories}
//       loadCategory={loadCategory}
//       cartCount={cartItems.length}
//       goHome={goHome}
//       goToAccount={goToAccount}
//       logo="/logo.png"
//     >
//       <div className="mt-6 pb-40 grid grid-cols-1 md:grid-cols-3 gap-6">
        
//         {/* -------------------- CART ITEMS -------------------- */}
//         <div className="md:col-span-2 space-y-4">
//           {cartItems.length === 0 && (
//             <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
//           )}

//           {cartItems.map((item) => {
//             const price = getPrice(item);

//             return (
//               <div
//                 key={item.id}
//                 className="bg-white shadow-sm border rounded-md p-4 flex gap-4"
//               >
//                 {/* IMAGE */}
//                 <div
//                   className="w-24 h-24 rounded bg-gray-100 overflow-hidden cursor-pointer"
//                   onClick={() => handleViewProduct(item.id)}
//                 >
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="object-cover w-full h-full"
//                   />
//                 </div>

//                 {/* DETAILS */}
//                 <div className="flex-1 flex flex-col justify-between">
//                   <h2
//                     onClick={() => handleViewProduct(item.id)}
//                     className="font-semibold text-gray-800 line-clamp-2 cursor-pointer"
//                   >
//                     {item.title}
//                   </h2>

//                   <p className="text-orange-600 font-bold text-lg mt-1">
//                     ₦{price.toLocaleString()}
//                   </p>

//                   {/* QUANTITY CONTROLS */}
//                   <div className="flex items-center gap-3 mt-3">
//                     <button
//                       onClick={() => addToCart(item, -1)}
//                       disabled={item.quantity <= 1}
//                       className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-40"
//                     >
//                       -
//                     </button>

//                     <span className="font-semibold text-gray-700">{item.quantity}</span>

//                     <button
//                       onClick={() => addToCart(item, 1)}
//                       className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center"
//                     >
//                       +
//                     </button>

//                     <button
//                       onClick={() => removeFromCart(item.id)}
//                       className="ml-auto text-red-500"
//                     >
//                       <FaTrash />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* -------------------- ORDER SUMMARY -------------------- */}
//         {cartItems.length > 0 && (
//           <div className="bg-white shadow-lg border rounded-lg p-6 h-fit">
//             <h2 className="text-lg font-semibold text-gray-700">Order Summary</h2>

//             <div className="mt-4 space-y-3">
//               <div className="flex justify-between">
//                 <p className="text-gray-600">Total items:</p>
//                 <p className="font-medium">{totalItems}</p>
//               </div>

//               <div className="flex justify-between">
//                 <p className="text-gray-600">Total price:</p>
//                 <p className="font-bold text-orange-600 text-xl">
//                   ₦{totalPrice.toLocaleString()}
//                 </p>
//               </div>
//             </div>

//             <button
//               onClick={goToCheckout}
//               className="bg-orange-500 hover:bg-orange-600 text-white w-full mt-6 py-3 rounded-lg font-semibold"
//             >
//               Checkout ({cartItems.length})
//             </button>

//             <button
//               onClick={clearCart}
//               className="text-red-600 underline text-sm mt-3 block text-center"
//             >
//               Clear Cart
//             </button>
//           </div>
//         )}
//       </div>

//       {/* -------------------- MORE PRODUCTS -------------------- */}
// <div className="mt-10">
//   <h2 className="text-xl font-semibold text-gray-800 mb-4">More Products</h2>

//   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//     {allProducts.map((product) => {
//       const price =
//         typeof product.price === "string"
//           ? Number(product.price.replace(/[^\d.]/g, ""))
//           : product.price;

//       const oldPrice =
//         typeof product.old_price === "string"
//           ? Number(product.old_price.replace(/[^\d.]/g, ""))
//           : product.old_price;

//       return (
//         <div
//           key={product.id}
//           className="bg-white rounded-lg shadow-sm border p-3 hover:shadow-md transition cursor-pointer"
//         >
//           <div
//             onClick={() => handleViewProduct(product.id)}
//             className="w-full h-40 bg-gray-100 rounded overflow-hidden"
//           >
//             <img
//               src={product.images?.[0]?.image}
//               className="w-full h-full object-cover"
//               alt=""
//             />
//           </div>

//           <h3
//             className="mt-2 text-sm font-semibold text-gray-800 line-clamp-2 cursor-pointer"
//             onClick={() => handleViewProduct(product.id)}
//           >
//             {product.title}
//           </h3>

//           <div className="mt-1">
//             <p className="text-red-600 font-bold">
//               ₦{price?.toLocaleString()}
//             </p>

//             {oldPrice && (
//               <p className="text-gray-400 line-through text-xs">
//                 ₦{oldPrice?.toLocaleString()}
//               </p>
//             )}
//           </div>
//         </div>
//       );
//     })}
//   </div>
// </div>

//     </StoreLayout>
//   );
// };











import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { StoreLayout } from "../layouts/StoreLayout";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

export const CartPage = () => {
  const { cartItems, removeFromCart, clearCart, addToCart } = useCart();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // for highlighting

  const BASE_URL = "https://recabitesnetwork.com/store";

  // Fetch categories and all products
  useEffect(() => {
    axios.get(`${BASE_URL}/categories/`).then((res) => setCategories(res.data || []));
    axios.get(`${BASE_URL}/products/`).then((res) => setAllProducts(res.data || []));
  }, []);

  // Load products by category or all
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

  const goHome = () => navigate("/");
  const goToAccount = () => navigate("/signup");
  const goToCheckout = () => navigate("/checkout/email");

  const getPrice = (item) => Number(item.cleaned_price ?? 0);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + getPrice(item) * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleViewProduct = (productId) => navigate(`/product/${productId}`);

  const handleAddToCart = (product) => {
    const price =
      typeof product.price === "string"
        ? Number(product.price.replace(/[^\d.]/g, ""))
        : product.price ?? 0;

    addToCart({
      id: product.id,
      title: product.title,
      cleaned_price: price,
      formatted_price: "₦" + price.toLocaleString(),
      quantity: 1,
      image: product.images?.[0]?.image ?? "",
    });
  };

  return (
    <StoreLayout
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchProducts={searchProducts}
      categories={categories}
      loadCategory={loadCategory}
      cartCount={cartItems.length}
      goHome={goHome}
      goToAccount={goToAccount}
      logo="/logo.png"
      selectedCategory={selectedCategory} // pass for highlighting
    >
      <div className="mt-6 pb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* -------------------- CART ITEMS -------------------- */}
        <div className="md:col-span-2 space-y-4">
          {cartItems.length === 0 && (
            <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
          )}

          {cartItems.map((item) => {
            const price = getPrice(item);
            return (
              <div
                key={item.id}
                className="bg-white shadow-sm border rounded-md p-4 flex gap-4"
              >
                {/* IMAGE */}
                <div
                  className="w-24 h-24 rounded bg-gray-100 overflow-hidden cursor-pointer"
                  onClick={() => handleViewProduct(item.id)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* DETAILS */}
                <div className="flex-1 flex flex-col justify-between">
                  <h2
                    onClick={() => handleViewProduct(item.id)}
                    className="font-semibold text-gray-800 line-clamp-2 cursor-pointer"
                  >
                    {item.title}
                  </h2>

                  <p className="text-orange-600 font-bold text-lg mt-1">
                    ₦{price.toLocaleString()}
                  </p>

                  {/* QUANTITY CONTROLS */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => addToCart(item, -1)}
                      disabled={item.quantity <= 1}
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-40"
                    >
                      -
                    </button>

                    <span className="font-semibold text-gray-700">{item.quantity}</span>

                    <button
                      onClick={() => addToCart(item, 1)}
                      className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* -------------------- ORDER SUMMARY -------------------- */}
        {cartItems.length > 0 && (
          <div className="bg-white shadow-lg border rounded-lg p-6 h-fit">
            <h2 className="text-lg font-semibold text-gray-700">Order Summary</h2>

            <div className="mt-4 space-y-3">
              <div className="flex justify-between">
                <p className="text-gray-600">Total items:</p>
                <p className="font-medium">{totalItems}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-600">Total price:</p>
                <p className="font-bold text-orange-600 text-xl">
                  ₦{totalPrice.toLocaleString()}
                </p>
              </div>
            </div>

            <button
              onClick={goToCheckout}
              className="bg-orange-500 hover:bg-orange-600 text-white w-full mt-6 py-3 rounded-lg font-semibold"
            >
              Checkout ({cartItems.length})
            </button>

            <button
              onClick={clearCart}
              className="text-red-600 underline text-sm mt-3 block text-center"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>

      {/* -------------------- MORE PRODUCTS -------------------- */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">More Products</h2>

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
              >
                <div
                  onClick={() => handleViewProduct(product.id)}
                  className="w-full h-40 bg-gray-100 rounded overflow-hidden"
                >
                  <img
                    src={product.images?.[0]?.image}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>

                <h3
                  className="mt-2 text-sm font-semibold text-gray-800 line-clamp-2 cursor-pointer"
                  onClick={() => handleViewProduct(product.id)}
                >
                  {product.title}
                </h3>

                <div className="mt-1">
                  <p className="text-red-600 font-bold">
                    ₦{price?.toLocaleString()}
                  </p>

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
    </StoreLayout>
  );
};
