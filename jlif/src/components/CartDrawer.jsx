// import React from "react";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";

// export const CartDrawer = () => {
//   const { cartItems, isOpen, setIsOpen, removeFromCart, clearCart } = useCart();
//   const navigate = useNavigate();

//   if (!isOpen) return null;

//   // Use cleaned numeric price for calculations
//   const total = cartItems.reduce(
//     (acc, item) => acc + item.cleaned_price * item.quantity,
//     0
//   );

//   // Format total to NGN currency format
//   const formattedTotal = total.toLocaleString("en-NG", {
//     style: "currency",
//     currency: "NGN",
//   });

//   const handleCheckout = () => {
//     setIsOpen(false);
//     navigate("/checkout");
//   };

//   return (
//     <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-4 z-50">

//       <button
//         onClick={() => setIsOpen(false)}
//         className="text-[#FF0000] font-bold mb-4"
//       >
//         Close
//       </button>

//       <h2 className="text-[#003366] text-xl font-bold mb-2">Your Cart</h2>

//       {cartItems.length === 0 ? (
//         <p className="text-gray-500">Cart is empty</p>
//       ) : (
//         <div className="flex flex-col gap-3">

//           {cartItems.map((item) => (
//             <div key={item.id} className="flex justify-between items-center">
//               <div>
//                 <p className="font-semibold">{item.title}</p>

//                 {/* Updated price formatting */}
//                 <p className="text-[#FF0000]">
//                   {item.formatted_price} x {item.quantity}
//                 </p>
//               </div>

//               <button
//                 onClick={() => removeFromCart(item.id)}
//                 className="text-[#FF0000] font-bold"
//               >
//                 X
//               </button>
//             </div>
//           ))}

//           {/* Updated total using formatted currency */}
//           <p className="font-bold mt-2">Total: {formattedTotal}</p>

//           {/* <button
//             onClick={handleCheckout}
//             className="mt-4 bg-[#003366] text-white px-4 py-2 rounded hover:bg-[#FF0000] transition"
//           >
//             Proceed to Checkout
//           </button> */}

//           <button
//             onClick={() => {
//               setIsOpen(false);
//               window.location.href = "/checkout/email";
//             }}
//             className="mt-4 bg-[#003366] text-white px-4 py-2 rounded hover:bg-[#002244]"
//           >
//             Proceed to Checkout
//           </button>

//           <button
//             onClick={clearCart}
//             className="mt-2 bg-[#FF0000] text-white px-4 py-2 rounded hover:bg-[#003366] transition"
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

// export const CartDrawer = () => {
//   const { cartItems, isOpen, setIsOpen, removeFromCart, clearCart } = useCart();
//   const navigate = useNavigate();

//   if (!isOpen) return null;

//   const total = cartItems.reduce(
//     (acc, item) => acc + item.cleaned_price * item.quantity,
//     0
//   );

//   const formattedTotal = total.toLocaleString("en-NG", {
//     style: "currency",
//     currency: "NGN",
//   });

//   const handleCheckout = () => {
//     setIsOpen(false);
//     navigate("/checkout/email");
//   };

//   return (
//     <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-4 z-50">

//       <button
//         onClick={() => setIsOpen(false)}
//         className="text-[#FF0000] font-bold mb-4"
//       >
//         Close
//       </button>

//       <h2 className="text-[#003366] text-xl font-bold mb-2">Your Cart</h2>

//       {cartItems.length === 0 ? (
//         <p className="text-gray-500">Cart is empty</p>
//       ) : (
//         <div className="flex flex-col gap-3">

//           {cartItems.map((item) => (
//             <div key={item.id} className="flex justify-between items-center">
//               <div>
//                 <p className="font-semibold">{item.title}</p>
//                 <p className="text-[#FF0000]">
//                   {item.formatted_price} x {item.quantity}
//                 </p>
//               </div>

//               <button
//                 onClick={() => removeFromCart(item.id)}
//                 className="text-[#FF0000] font-bold"
//               >
//                 X
//               </button>
//             </div>
//           ))}

//           <p className="font-bold mt-2">Total: {formattedTotal}</p>

//           <button
//             onClick={handleCheckout}
//             className="mt-4 bg-[#003366] text-white px-4 py-2 rounded hover:bg-[#002244]"
//           >
//             Proceed to Checkout
//           </button>

//           <button
//             onClick={clearCart}
//             className="mt-2 bg-[#FF0000] text-white px-4 py-2 rounded hover:bg-[#003366] transition"
//           >
//             Clear Cart
//           </button>

//         </div>
//       )}
//     </div>
//   );
// };
