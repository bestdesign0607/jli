// import React from "react";
// import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaPlus } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { verifyUser } from "../utils/auth";

// export const ProductCard = ({ product }) => {
//   const navigate = useNavigate();
//   const { addToCart, cartItems } = useCart();
//   const token = sessionStorage.getItem("access_token");

//   const formatNumber = (num) =>
//     new Intl.NumberFormat("en-NG", {
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(num);

//   const price =
//     typeof product.price === "string"
//       ? Number(product.price.replace(/[^\d.]/g, ""))
//       : product.price ?? 0;

//   const oldPrice = product.old_price ?? price * 1.7;
//   const reviews = Array.isArray(product.reviews)
//   ? product.reviews.length
//   : product.reviews ?? 0;
//   const sold = product.sold ?? 0;
//   const averageRating = product.average_rating ?? 4.0;

//   const renderStars = () => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       if (i <= Math.floor(averageRating))
//         stars.push(<FaStar key={i} className="text-yellow-400" />);
//       else if (i - averageRating < 1)
//         stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
//       else stars.push(<FaRegStar key={i} className="text-gray-300" />);
//     }
//     return stars;
//   };

//   const requireAuth = async (callback, redirectPath) => {
//     if (!token) {
//       navigate("/login", { state: { from: redirectPath } });
//       return;
//     }

//     const userExists = await verifyUser();
//     if (!userExists) {
//       navigate("/login", { state: { from: redirectPath } });
//       return;
//     }

//     callback();
//   };

//   const handleAddToCart = () => {
//     const redirectPath = `/product/${product.id}`;
//     requireAuth(() => {
//       addToCart({
//         id: product.id,
//         title: product.title,
//         cleaned_price: price,
//         formatted_price: "₦" + formatNumber(price),
//         quantity: 1,
//         image: product.images?.[0]?.image ?? "",
//       });
//     }, redirectPath);
//   };

//   const handleViewProduct = () => {
//     const redirectPath = `/product/${product.id}`;
//     requireAuth(() => navigate(redirectPath), redirectPath);
//   };

//   const handleGoToCart = () => {
//     requireAuth(() => navigate("/cart"), "/cart");
//   };

//   const cartCount = cartItems.find((item) => item.id === product.id)?.quantity || 0;

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
//       <div className="w-full h-52 bg-gray-100">
//         <img
//           src={product.images?.[0]?.image}
//           alt={product.images?.[0]?.alt ?? product.title}
//           className="w-full h-full object-cover"
//         />
//       </div>

//       <div className="p-3">
//         <h2 className="font-semibold text-gray-800 text-sm leading-tight line-clamp-2">
//           {product.title}
//         </h2>

//         <div className="mt-1 flex items-center justify-between">
//           <div>
//             <p className="text-red-600 font-bold text-lg">₦{formatNumber(price)}</p>
//             <p className="text-gray-400 line-through text-sm">₦{formatNumber(oldPrice)}</p>
//           </div>

//           <button
//             onClick={handleAddToCart}
//             className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition"
//             title="Add to Cart"
//           >
//             <FaPlus className="text-sm" />
//           </button>
//         </div>

//         <div className="flex items-center justify-between mt-2 relative">
//           <div className="flex items-center text-sm text-gray-600">
//             <div className="flex items-center">{renderStars()}</div>
//             <span className="ml-1 text-gray-500">({reviews})</span>
//           </div>

//           <button
//             onClick={handleGoToCart}
//             className="relative bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition"
//           >
//             <FaShoppingCart className="text-gray-700 text-lg" />
//             {cartCount > 0 && (
//               <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                 {cartCount}
//               </span>
//             )}
//           </button>
//         </div>

//         {/* ⭐ SOLD COUNT */}
//         <p className="text-gray-500 text-xs mt-1">
//           {sold > 0 ? `${sold}+ sold` : "0 sold"}
//         </p>

//         <button
//           onClick={handleViewProduct}
//           className="mt-2 w-full bg-[#ff9900] text-white py-2 rounded-md font-medium hover:bg-[#ff7a00] transition"
//         >
//           View Product
//         </button>
//       </div>
//     </div>
//   );
// };

















// import React from "react";
// import { FaShoppingCart, FaPlus } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { verifyUser } from "../utils/auth";
// import { StarRating } from "./StarRating";

// export const ProductCard = ({ product }) => {
//   const navigate = useNavigate();
//   const { addToCart, cartItems } = useCart();
//   const token = sessionStorage.getItem("access_token");

//   const formatNumber = (num) =>
//     new Intl.NumberFormat("en-NG", {
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(num);

//   const price =
//     typeof product.price === "string"
//       ? Number(product.price.replace(/[^\d.]/g, ""))
//       : product.price ?? 0;

//   const oldPrice = product.old_price ?? price * 1.7;
//   const sold = product.sold ?? 0;
//   const averageRating = Number(product.average_rating ?? 0);
//   const reviewsCount = Number(product.reviews_count ?? 0);

//   const requireAuth = async (callback, redirectPath) => {
//     if (!token) {
//       navigate("/login", { state: { from: redirectPath } });
//       return;
//     }

//     const userExists = await verifyUser();
//     if (!userExists) {
//       navigate("/login", { state: { from: redirectPath } });
//       return;
//     }

//     callback();
//   };

//   const handleAddToCart = () => {
//     const redirectPath = `/product/${product.id}`;
//     requireAuth(() => {
//       addToCart({
//         id: product.id,
//         title: product.title,
//         cleaned_price: price,
//         formatted_price: "₦" + formatNumber(price),
//         quantity: 1,
//         image: product.images?.[0]?.image ?? "",
//       });
//     }, redirectPath);
//   };

//   const handleViewProduct = () => {
//     const redirectPath = `/product/${product.id}`;
//     requireAuth(() => navigate(redirectPath), redirectPath);
//   };

//   const handleGoToCart = () => {
//     requireAuth(() => navigate("/cart"), "/cart");
//   };

//   const cartCount =
//     cartItems.find((item) => item.id === product.id)?.quantity || 0;

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
//       <div className="w-full h-52 bg-gray-100">
//         <img
//           src={product.images?.[0]?.image}
//           alt={product.images?.[0]?.alt ?? product.title}
//           className="w-full h-full object-cover"
//         />
//       </div>

//       <div className="p-3">
//         <h2 className="font-semibold text-gray-800 text-sm leading-tight line-clamp-2">
//           {product.title}
//         </h2>

//         <div className="mt-1 flex items-center justify-between">
//           <div>
//             <p className="text-red-600 font-bold text-lg">
//               ₦{formatNumber(price)}
//             </p>
//             <p className="text-gray-400 line-through text-sm">
//               ₦{formatNumber(oldPrice)}
//             </p>
//           </div>

//           <button
//             onClick={handleAddToCart}
//             className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition"
//             title="Add to Cart"
//           >
//             <FaPlus className="text-sm" />
//           </button>
//         </div>

//         {/* ⭐ STAR RATING */}
//         <div className="flex items-center justify-between mt-2">
//           <div className="flex items-center gap-2 text-sm">
//             <StarRating rating={averageRating} size="text-sm" />
//             <span className="font-medium text-gray-700">
//               {averageRating.toFixed(1)}
//             </span>
//             <span className="text-gray-500">
//               ({reviewsCount} review{reviewsCount !== 1 ? "s" : ""})
//             </span>
//           </div>

//           <button
//             onClick={handleGoToCart}
//             className="relative bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition"
//           >
//             <FaShoppingCart className="text-gray-700 text-lg" />
//             {cartCount > 0 && (
//               <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                 {cartCount}
//               </span>
//             )}
//           </button>
//         </div>

//         <button
//           onClick={handleViewProduct}
//           className="mt-3 w-full bg-[#ff9900] text-white py-2 rounded-md font-medium hover:bg-[#ff7a00] transition"
//         >
//           View Product
//         </button>
//       </div>
//     </div>
//   );
// };











// import { FaPlus, FaShoppingCart } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { StarRating } from "./StarRating";
// import { verifyUser } from "../utils/auth";

// export const ProductCard = ({ product }) => {
//   const navigate = useNavigate();
//   const { addToCart, cartItems } = useCart();
//   const token = sessionStorage.getItem("access_token");

//   const formatNumber = (num) =>
//     new Intl.NumberFormat("en-NG", {
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(num);

//   const price =
//     typeof product.price === "string"
//       ? Number(product.price.replace(/[^\d.]/g, ""))
//       : product.price ?? 0;

//   const oldPrice = product.old_price ?? price * 1.7;
//   const sold = product.sold ?? 0;
//   const averageRating = Number(product.average_rating ?? 0);
//   const reviewsCount = Number(product.reviews_count ?? 0);

//   const requireAuth = async (callback, redirectPath) => {
//     if (!token) {
//       navigate("/login", { state: { from: redirectPath } });
//       return;
//     }

//     const userExists = await verifyUser();
//     if (!userExists) {
//       navigate("/login", { state: { from: redirectPath } });
//       return;
//     }

//     callback();
//   };

//   const handleAddToCart = () => {
//     const redirectPath = `/product/${product.id}`;
//     requireAuth(() => {
//       addToCart({
//         id: product.id,
//         title: product.title,
//         cleaned_price: price,
//         formatted_price: "₦" + formatNumber(price),
//         quantity: 1,
//         image: product.images?.[0]?.image ?? "",
//       });
//     }, redirectPath);
//   };

//   const handleViewProduct = () => {
//     const redirectPath = `/product/${product.id}`;
//     requireAuth(() => navigate(redirectPath), redirectPath);
//   };

//   const handleGoToCart = () => {
//     requireAuth(() => navigate("/cart"), "/cart");
//   };

//   const cartCount =
//     cartItems.find((item) => item.id === product.id)?.quantity || 0;

//   const isDigital = product.product_type === "digital";

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
//       <div className="w-full h-52 bg-gray-100">
//         <img
//           src={product.images?.[0]?.image}
//           alt={product.images?.[0]?.alt ?? product.title}
//           className="w-full h-full object-cover"
//         />
//       </div>

//       <div className="p-3">
//         <h2 className="font-semibold text-gray-800 text-sm leading-tight line-clamp-2">
//           {product.title}
//         </h2>

//         <div className="mt-1 flex items-center justify-between">
//           <div>
//             <p className="text-red-600 font-bold text-lg">
//               ₦{formatNumber(price)}
//             </p>
//             <p className="text-gray-400 line-through text-sm">
//               ₦{formatNumber(oldPrice)}
//             </p>
//           </div>

//           {/* Add to Cart button only for physical products */}
//           {!isDigital && (
//             <button
//               onClick={handleAddToCart}
//               className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition"
//               title="Add to Cart"
//             >
//               <FaPlus className="text-sm" />
//             </button>
//           )}
//         </div>

//         {/* ⭐ STAR RATING */}
//         <div className="flex items-center justify-between mt-2">
//           <div className="flex items-center gap-2 text-sm">
//             <StarRating rating={averageRating} size="text-sm" />
//             <span className="font-medium text-gray-700">
//               {averageRating.toFixed(1)}
//             </span>
//             <span className="text-gray-500">
//               ({reviewsCount} review{reviewsCount !== 1 ? "s" : ""})
//             </span>
//           </div>

//           {/* Cart icon only for physical products */}
//           {!isDigital && (
//             <button
//               onClick={handleGoToCart}
//               className="relative bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition"
//             >
//               <FaShoppingCart className="text-gray-700 text-lg" />
//               {cartCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                   {cartCount}
//                 </span>
//               )}
//             </button>
//           )}
//         </div>

//         <button
//           onClick={handleViewProduct}
//           className="mt-3 w-full bg-[#ff9900] text-white py-2 rounded-md font-medium hover:bg-[#ff7a00] transition"
//         >
//           View Product
//         </button>
//       </div>
//     </div>
//   );
// };
















import { FaPlus, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { StarRating } from "./StarRating";
import { verifyUser } from "../utils/auth";

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const token = sessionStorage.getItem("access_token");

  // Ensure we correctly detect digital products
  const isDigital = String(product.product_type ?? "").toLowerCase() === "digital";

  const formatNumber = (num) =>
    new Intl.NumberFormat("en-NG", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);

  const price =
    typeof product.price === "string"
      ? Number(product.price.replace(/[^\d.]/g, ""))
      : product.price ?? 0;

  const oldPrice = product.old_price ?? price * 1.7;
  const averageRating = Number(product.average_rating ?? 0);
  const reviewsCount = Number(product.reviews_count ?? 0);

  const requireAuth = async (callback, redirectPath) => {
    if (!token) {
      navigate("/login", { state: { from: redirectPath } });
      return;
    }
    const userExists = await verifyUser();
    if (!userExists) {
      navigate("/login", { state: { from: redirectPath } });
      return;
    }
    callback();
  };

  const handleAddToCart = () => {
    const redirectPath = `/product/${product.id}`;
    requireAuth(() => {
      addToCart({
        id: product.id,
        title: product.title,
        cleaned_price: price,
        formatted_price: "₦" + formatNumber(price),
        quantity: 1,
        image: product.images?.[0]?.image ?? "",
      });
    }, redirectPath);
  };

  const handleViewProduct = () => {
    const redirectPath = `/product/${product.id}`;
    requireAuth(() => navigate(redirectPath), redirectPath);
  };

  const handleGoToCart = () => {
    requireAuth(() => navigate("/cart"), "/cart");
  };

  const cartCount =
    cartItems.find((item) => item.id === product.id)?.quantity || 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="w-full h-52 bg-gray-100">
        <img
          src={product.images?.[0]?.image}
          alt={product.images?.[0]?.alt ?? product.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-3">
        <h2 className="font-semibold text-gray-800 text-sm leading-tight line-clamp-2">
          {product.title}
        </h2>

        <div className="mt-1 flex items-center justify-between">
          <div>
            <p className="text-red-600 font-bold text-lg">₦{formatNumber(price)}</p>
            <p className="text-gray-400 line-through text-sm">₦{formatNumber(oldPrice)}</p>
          </div>

          {/* Only show Add to Cart for physical products */}
          {!isDigital && (
            <button
              onClick={handleAddToCart}
              className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition"
              title="Add to Cart"
            >
              <FaPlus className="text-sm" />
            </button>
          )}
        </div>

        {/* ⭐ STAR RATING */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2 text-sm">
            <StarRating rating={averageRating} size="text-sm" />
            <span className="font-medium text-gray-700">{averageRating.toFixed(1)}</span>
            <span className="text-gray-500">
              ({reviewsCount} review{reviewsCount !== 1 ? "s" : ""})
            </span>
          </div>

          {/* Only show Cart Icon for physical products */}
          {!isDigital && (
            <button
              onClick={handleGoToCart}
              className="relative bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition"
            >
              <FaShoppingCart className="text-gray-700 text-lg" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          )}
        </div>

        <button
          onClick={handleViewProduct}
          className="mt-3 w-full bg-[#ff9900] text-white py-2 rounded-md font-medium hover:bg-[#ff7a00] transition"
        >
          View Product
        </button>
      </div>
    </div>
  );
};
