// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
// import { useCart } from "../context/CartContext";
// import { ProductCard } from "./ProductCard";
// import { StoreLayout } from "../layouts/StoreLayout";

// export const ProductPage = () => {
//   const { id, slug } = useParams();
//   const productIdentifier = id || slug;

//   const navigate = useNavigate();
//   const { addToCart, cartItems } = useCart();

//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");

//   const [qty, setQty] = useState(1);
//   const BASE_URL = "http://127.0.0.1:8000/store";

//   // Fetch product, reviews, related products
//   useEffect(() => {
//     if (!productIdentifier) return;

//     axios.get(`${BASE_URL}/products/${productIdentifier}/`)
//       .then((res) => {
//         setProduct(res.data);
//         if (res.data.category?.id) {
//           axios.get(`${BASE_URL}/products/?category=${res.data.category.id}&exclude=${res.data.id}`)
//             .then(r => setRelatedProducts(r.data))
//             .catch(console.error);
//         }
//       })
//       .catch(console.error);

//     axios.get(`${BASE_URL}/products/${productIdentifier}/reviews/`)
//       .then((res) => setReviews(res.data.sort((a, b) => new Date(b.date) - new Date(a.date))))
//       .catch(console.error);
//   }, [productIdentifier]);

//   // Fetch categories for header
//   useEffect(() => {
//     axios.get(`${BASE_URL}/categories/`)
//       .then(res => setCategories(res.data || []))
//       .catch(console.error);
//   }, []);

//   if (!product) return <p>Loading...</p>;

//   const formatNumber = (num) =>
//     new Intl.NumberFormat("en-NG", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num);

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       if (i <= Math.floor(rating)) stars.push(<FaStar key={i} className="text-yellow-400" />);
//       else if (i - rating < 1) stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
//       else stars.push(<FaRegStar key={i} className="text-gray-300" />);
//     }
//     return stars;
//   };

//   const handleAddToCart = () => {
//     addToCart({
//       id: product.id,
//       title: product.title,
//       cleaned_price: Number(product.price),
//       formatted_price: "₦" + formatNumber(product.price),
//       image: product.images?.[0]?.image,
//     }, qty);
//     navigate("/cart");
//   };

//   const thisProductQty = cartItems.find((item) => item.id === product.id)?.quantity || 0;

//   const searchProducts = () => console.log("Search for:", searchValue);
//   const loadCategory = (id) => console.log("Load category:", id);
//   const goHome = () => (window.location.href = "/");
//   const goToAccount = () => (window.location.href = "/signup");

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
//       <div className="container mx-auto p-6 space-y-10">
//         {/* Product Section */}
//         <div className="flex flex-col lg:flex-row gap-6 bg-white rounded-lg shadow p-6">
//           <div className="lg:w-1/2 flex justify-center items-center">
//             <img
//               src={product.images?.[0]?.image}
//               alt={product.title}
//               className="w-full h-auto max-h-[400px] object-contain"
//             />
//           </div>

//           <div className="lg:w-1/2 space-y-4">
//             <h1 className="text-3xl font-bold text-[#003366]">{product.title}</h1>

//             <div className="flex items-center gap-4">
//               <p className="text-red-600 font-bold text-2xl">₦{formatNumber(product.price)}</p>
//               <p className="text-gray-400 line-through text-lg">
//                 ₦{formatNumber(product.old_price ?? product.price * 1.7)}
//               </p>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-1">{renderStars(product.average_rating)}</div>
//               <p className="text-gray-500 text-sm">{product.sold} sold</p>
//             </div>

//             <p className="text-gray-700">{product.description}</p>

//             {/* Quantity Selector */}
//             <div className="flex items-center gap-4 mt-4">
//               <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="bg-gray-200 px-3 py-1 rounded text-lg">-</button>
//               <span className="text-xl font-semibold">{qty}</span>
//               <button onClick={() => setQty((q) => q + 1)} className="bg-gray-200 px-3 py-1 rounded text-lg">+</button>
//               {thisProductQty > 0 && <span className="text-gray-700 font-semibold">In Cart: {thisProductQty}</span>}
//             </div>

//             <button onClick={handleAddToCart} className="bg-[#FF0000] text-white px-6 py-3 rounded hover:bg-[#003366] transition mt-4">Add to Cart</button>
//           </div>
//         </div>

//         {/* Reviews */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
//           {reviews.length === 0 ? <p>No reviews yet</p> : reviews.map((r) => (
//             <div key={r.id} className="border-b py-2">
//               <div className="flex justify-between items-center">
//                 <p className="font-semibold">{r.user_name}</p>
//                 <span className="text-gray-500 text-sm">{new Date(r.date).toLocaleDateString()}</span>
//               </div>
//               <div className="flex items-center">{renderStars(r.rating)}</div>
//               <p className="mt-1">{r.text}</p>
//             </div>
//           ))}
//         </div>

//         {/* Related Products */}
//         {relatedProducts.length > 0 && (
//           <div className="bg-white rounded-lg shadow p-6">
//             <h2 className="text-2xl font-bold mb-4">Related Products</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//               {relatedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
//             </div>
//           </div>
//         )}
//       </div>
//     </StoreLayout>
//   );
// };














// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
// import { useCart } from "../context/CartContext";
// import { ProductCard } from "./ProductCard";
// import { StoreLayout } from "../layouts/StoreLayout";

// export const ProductPage = () => {
//   const { id, slug } = useParams();
//   const productIdentifier = id || slug;

//   const navigate = useNavigate();
//   const { addToCart, cartItems } = useCart();

//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [qty, setQty] = useState(1);
//   const [mainImage, setMainImage] = useState(""); // Selected main image
//   const [selectedColor, setSelectedColor] = useState(null);

//   const BASE_URL = "http://127.0.0.1:8000/store";

//   useEffect(() => {
//     if (!productIdentifier) return;

//     axios.get(`${BASE_URL}/products/${productIdentifier}/`)
//       .then((res) => {
//         setProduct(res.data);
//         setMainImage(res.data.images?.[0]?.image || "");
//         if (res.data.category?.id) {
//           axios.get(`${BASE_URL}/products/?category=${res.data.category.id}&exclude=${res.data.id}`)
//             .then(r => setRelatedProducts(r.data))
//             .catch(console.error);
//         }
//       })
//       .catch(console.error);

//     axios.get(`${BASE_URL}/products/${productIdentifier}/reviews/`)
//       .then((res) => setReviews(res.data.sort((a, b) => new Date(b.date) - new Date(a.date))))
//       .catch(console.error);
//   }, [productIdentifier]);

//   useEffect(() => {
//     axios.get(`${BASE_URL}/categories/`)
//       .then(res => setCategories(res.data || []))
//       .catch(console.error);
//   }, []);

//   if (!product) return <p>Loading...</p>;

//   const formatNumber = (num) =>
//     new Intl.NumberFormat("en-NG", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num);

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       if (i <= Math.floor(rating)) stars.push(<FaStar key={i} className="text-yellow-400" />);
//       else if (i - rating < 1) stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
//       else stars.push(<FaRegStar key={i} className="text-gray-300" />);
//     }
//     return stars;
//   };

//   const handleAddToCart = () => {
//     addToCart({
//       id: product.id,
//       title: product.title,
//       cleaned_price: Number(product.price),
//       formatted_price: "₦" + formatNumber(product.price),
//       image: mainImage,
//       color: selectedColor,
//     }, qty);
//     navigate("/cart");
//   };

//   const thisProductQty = cartItems.find((item) => item.id === product.id)?.quantity || 0;

//   const searchProducts = () => console.log("Search for:", searchValue);
//   const loadCategory = (id) => console.log("Load category:", id);
//   const goHome = () => (window.location.href = "/");
//   const goToAccount = () => (window.location.href = "/signup");

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
//       <div className="container mx-auto p-6 space-y-10">
//         {/* Product Section */}
//         <div className="flex flex-col lg:flex-row gap-6 bg-white rounded-lg shadow p-6">
          
//           {/* Left: vertical thumbnails and main image */}
//           <div className="lg:w-1/2 flex gap-4">
//             <div className="flex flex-col gap-2">
//               {product.images?.slice(0, 4).map((img, idx) => (
//                 <img
//                   key={idx}
//                   src={img.image}
//                   alt={product.title}
//                   className={`w-20 h-20 object-contain rounded cursor-pointer border ${
//                     mainImage === img.image ? "border-blue-600" : "border-gray-200"
//                   }`}
//                   onClick={() => setMainImage(img.image)}
//                 />
//               ))}
//             </div>

//             <div className="flex-1 flex justify-center items-center">
//               <img
//                 src={mainImage}
//                 alt={product.title}
//                 className="w-full h-auto max-h-[500px] object-contain"
//               />
//             </div>
//           </div>

//           {/* Right: description and details */}
//           <div className="lg:w-1/2 space-y-4">
//             <h1 className="text-3xl font-bold text-[#003366]">{product.title}</h1>

//             <div className="flex items-center gap-4">
//               <p className="text-red-600 font-bold text-2xl">₦{formatNumber(product.price)}</p>
//               <p className="text-gray-400 line-through text-lg">
//                 ₦{formatNumber(product.old_price ?? product.price * 1.7)}
//               </p>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-1">{renderStars(product.average_rating)}</div>
//               <p className="text-gray-500 text-sm">{product.sold} sold</p>
//             </div>

//             <p className="text-gray-700">{product.description}</p>

//             {/* Color selection */}
//             {product.colors?.length > 0 && (
//               <div className="flex gap-2 mt-2">
//                 {product.colors.map((color, idx) => (
//                   <div
//                     key={idx}
//                     onClick={() => setSelectedColor(color)}
//                     className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
//                       selectedColor === color ? "border-blue-600" : "border-gray-300"
//                     }`}
//                     style={{ backgroundColor: color }}
//                   />
//                 ))}
//               </div>
//             )}

//             {/* Quantity Selector */}
//             <div className="flex items-center gap-4 mt-4">
//               <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="bg-gray-200 px-3 py-1 rounded text-lg">-</button>
//               <span className="text-xl font-semibold">{qty}</span>
//               <button onClick={() => setQty((q) => q + 1)} className="bg-gray-200 px-3 py-1 rounded text-lg">+</button>
//               {thisProductQty > 0 && <span className="text-gray-700 font-semibold">In Cart: {thisProductQty}</span>}
//             </div>

//             <button onClick={handleAddToCart} className="bg-[#FF0000] text-white px-6 py-3 rounded hover:bg-[#003366] transition mt-4">Add to Cart</button>
//           </div>
//         </div>

//         {/* Reviews */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
//           {reviews.length === 0 ? <p>No reviews yet</p> : reviews.map((r) => (
//             <div key={r.id} className="border-b py-2">
//               <div className="flex justify-between items-center">
//                 <p className="font-semibold">{r.user_name}</p>
//                 <span className="text-gray-500 text-sm">{new Date(r.date).toLocaleDateString()}</span>
//               </div>
//               <div className="flex items-center">{renderStars(r.rating)}</div>
//               <p className="mt-1">{r.text}</p>
//             </div>
//           ))}
//         </div>

//         {/* Related Products */}
//         {relatedProducts.length > 0 && (
//           <div className="bg-white rounded-lg shadow p-6">
//             <h2 className="text-2xl font-bold mb-4">Related Products</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//               {relatedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
//             </div>
//           </div>
//         )}
//       </div>
//     </StoreLayout>
//   );
// };












// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
// import { useCart } from "../context/CartContext";
// import { ProductCard } from "./ProductCard";
// import { StoreLayout } from "../layouts/StoreLayout";

// export const ProductPage = () => {
//   const { id, slug } = useParams();
//   const productIdentifier = id || slug;

//   const navigate = useNavigate();
//   const { addToCart, cartItems } = useCart();

//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [qty, setQty] = useState(1);
//   const [mainImage, setMainImage] = useState("");
//   const [selectedColor, setSelectedColor] = useState(null);

//   const BASE_URL = "http://127.0.0.1:8000/store";

//   useEffect(() => {
//     if (!productIdentifier) return;

//     axios.get(`${BASE_URL}/products/${productIdentifier}/`)
//       .then((res) => {
//         setProduct(res.data);
//         setMainImage(res.data.images?.[0]?.image || "");
//         if (res.data.category?.id) {
//           axios.get(`${BASE_URL}/products/?category=${res.data.category.id}&exclude=${res.data.id}`)
//             .then(r => setRelatedProducts(r.data))
//             .catch(console.error);
//         }
//       })
//       .catch(console.error);

//     axios.get(`${BASE_URL}/products/${productIdentifier}/reviews/`)
//       .then((res) => setReviews(res.data.sort((a, b) => new Date(b.date) - new Date(a.date))))
//       .catch(console.error);
//   }, [productIdentifier]);

//   useEffect(() => {
//     axios.get(`${BASE_URL}/categories/`)
//       .then(res => setCategories(res.data || []))
//       .catch(console.error);
//   }, []);

//   if (!product) return <p>Loading...</p>;

//   const formatNumber = (num) =>
//     new Intl.NumberFormat("en-NG", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num);

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       if (i <= Math.floor(rating)) stars.push(<FaStar key={i} className="text-yellow-400" />);
//       else if (i - rating < 1) stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
//       else stars.push(<FaRegStar key={i} className="text-gray-300" />);
//     }
//     return stars;
//   };

//   const handleAddToCart = () => {
//     addToCart({
//       id: product.id,
//       title: product.title,
//       cleaned_price: Number(product.price),
//       formatted_price: "₦" + formatNumber(product.price),
//       image: mainImage,
//       color: selectedColor,
//     }, qty);
//     navigate("/cart");
//   };

//   const thisProductQty = cartItems.find((item) => item.id === product.id)?.quantity || 0;

//   const searchProducts = () => console.log("Search for:", searchValue);
//   const loadCategory = (id) => console.log("Load category:", id);
//   const goHome = () => (window.location.href = "/");
//   const goToAccount = () => (window.location.href = "/signup");

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
//       <div className="container mx-auto p-6 space-y-10">
//         {/* Product Section */}
//         <div className="flex flex-col lg:flex-row gap-6 bg-white rounded-lg shadow p-6">
          
//           {/* Left: Thumbnails + Main Image */}
//           <div className="lg:w-1/2 flex gap-4">
//             <div className="hidden lg:flex flex-col gap-2">
//               {product.images?.slice(0, 4).map((img, idx) => (
//                 <img
//                   key={idx}
//                   src={img.image}
//                   alt={product.title}
//                   className={`w-20 h-20 object-contain rounded cursor-pointer border ${
//                     mainImage === img.image ? "border-blue-600" : "border-gray-200"
//                   }`}
//                   onClick={() => setMainImage(img.image)}
//                 />
//               ))}
//             </div>

//             <div className="flex-1 flex justify-center items-center">
//               <img
//                 src={mainImage}
//                 alt={product.title}
//                 className="w-full h-auto max-h-[500px] object-contain"
//               />
//             </div>
//           </div>

//           {/* Right: Product Info */}
//           <div className="lg:w-1/2 space-y-4">
//             <h1 className="text-3xl font-bold text-[#003366]">{product.title}</h1>

//             <div className="flex items-center gap-4">
//               <p className="text-red-600 font-bold text-2xl">₦{formatNumber(product.price)}</p>
//               <p className="text-gray-400 line-through text-lg">
//                 ₦{formatNumber(product.old_price ?? product.price * 1.7)}
//               </p>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-1">{renderStars(product.average_rating)}</div>
//               <p className="text-gray-500 text-sm">{product.sold} sold</p>
//             </div>

//             <p className="text-gray-700">{product.description}</p>

//             {/* Color Selection */}
//             {product.colors?.length > 0 && (
//               <div className="flex gap-2 mt-2">
//                 {product.colors.slice(0, 4).map((color, idx) => (
//                   <div
//                     key={idx}
//                     onClick={() => {
//                       setSelectedColor(color);
//                       const colorImage = product.images?.find(img => img.color === color);
//                       if (colorImage) setMainImage(colorImage.image);
//                     }}
//                     className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
//                       selectedColor === color ? "border-blue-600" : "border-gray-300"
//                     }`}
//                     style={{ backgroundColor: color }}
//                   />
//                 ))}
//               </div>
//             )}

//             {/* Quantity Selector */}
//             <div className="flex items-center gap-4 mt-4">
//               <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="bg-gray-200 px-3 py-1 rounded text-lg">-</button>
//               <span className="text-xl font-semibold">{qty}</span>
//               <button onClick={() => setQty((q) => q + 1)} className="bg-gray-200 px-3 py-1 rounded text-lg">+</button>
//               {thisProductQty > 0 && <span className="text-gray-700 font-semibold">In Cart: {thisProductQty}</span>}
//             </div>

//             <button onClick={handleAddToCart} className="bg-[#FF0000] text-white px-6 py-3 rounded hover:bg-[#003366] transition mt-4">Add to Cart</button>
//           </div>
//         </div>

//         {/* Reviews */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
//           {reviews.length === 0 ? <p>No reviews yet</p> : reviews.map((r) => (
//             <div key={r.id} className="border-b py-2">
//               <div className="flex justify-between items-center">
//                 <p className="font-semibold">{r.user_name}</p>
//                 <span className="text-gray-500 text-sm">{new Date(r.date).toLocaleDateString()}</span>
//               </div>
//               <div className="flex items-center">{renderStars(r.rating)}</div>
//               <p className="mt-1">{r.text}</p>
//             </div>
//           ))}
//         </div>

//         {/* Video Demo */}
//         {product.video_demo && (
//           <div className="bg-white rounded-lg shadow p-6">
//             <h2 className="text-2xl font-bold mb-4">Product Video Demo</h2>
//             <video
//               src={product.video_demo}
//               controls
//               className="w-full max-h-[500px] object-contain rounded"
//             />
//           </div>
//         )}

//         {/* Related Products */}
//         {relatedProducts.length > 0 && (
//           <div className="bg-white rounded-lg shadow p-6">
//             <h2 className="text-2xl font-bold mb-4">Related Products</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//               {relatedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
//             </div>
//           </div>
//         )}
//       </div>
//     </StoreLayout>
//   );
// };











// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
// import { useCart } from "../context/CartContext";
// import { ProductCard } from "./ProductCard";
// import { StoreLayout } from "../layouts/StoreLayout";

// export const ProductPage = () => {
//   const { id, slug } = useParams();
//   const productIdentifier = id || slug;

//   const navigate = useNavigate();
//   const { addToCart, cartItems } = useCart();

//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [qty, setQty] = useState(1);
//   const [mainImage, setMainImage] = useState("");
//   const [selectedColor, setSelectedColor] = useState(null);

//   const BASE_URL = "http://127.0.0.1:8000/store";

//   // Fetch product & reviews
//   useEffect(() => {
//     if (!productIdentifier) return;

//     axios.get(`${BASE_URL}/products/${productIdentifier}/`)
//       .then((res) => {
//         setProduct(res.data);
//         setMainImage(res.data.images?.[0]?.image || "");
//         if (res.data.category?.id) {
//           axios.get(`${BASE_URL}/products/?category=${res.data.category.id}&exclude=${res.data.id}`)
//             .then(r => setRelatedProducts(r.data))
//             .catch(console.error);
//         }
//       })
//       .catch(console.error);

//     axios.get(`${BASE_URL}/products/${productIdentifier}/reviews/`)
//       .then((res) => setReviews(res.data.sort((a, b) => new Date(b.date) - new Date(a.date))))
//       .catch(console.error);
//   }, [productIdentifier]);

//   // Fetch categories
//   useEffect(() => {
//     axios.get(`${BASE_URL}/categories/`)
//       .then(res => setCategories(res.data || []))
//       .catch(console.error);
//   }, []);

//   if (!product) return <p>Loading...</p>;

//   const formatNumber = (num) =>
//     new Intl.NumberFormat("en-NG", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num);

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       if (i <= Math.floor(rating)) stars.push(<FaStar key={i} className="text-yellow-400" />);
//       else if (i - rating < 1) stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
//       else stars.push(<FaRegStar key={i} className="text-gray-300" />);
//     }
//     return stars;
//   };

//   const handleAddToCart = () => {
//     addToCart({
//       id: product.id,
//       title: product.title,
//       cleaned_price: Number(product.price),
//       formatted_price: "₦" + formatNumber(product.price),
//       image: mainImage,
//       color: selectedColor,
//     }, qty);
//     navigate("/cart");
//   };

//   const thisProductQty = cartItems.find((item) => item.id === product.id)?.quantity || 0;

//   const searchProducts = () => console.log("Search for:", searchValue);
//   const loadCategory = (id) => console.log("Load category:", id);
//   const goHome = () => (window.location.href = "/");
//   const goToAccount = () => (window.location.href = "/signup");

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
//       <div className="container mx-auto p-6 space-y-10">

//         {/* Product Section */}
//         <div className="flex flex-col lg:flex-row gap-6 bg-white rounded-lg shadow p-6">
//           {/* Left: Thumbnails + Main Image */}
//           <div className="lg:w-1/2 flex gap-4">
//             <div className="hidden lg:flex flex-col gap-2">
//               {product.images?.slice(0, 4).map((img, idx) => (
//                 <img
//                   key={idx}
//                   src={img.image}
//                   alt={product.title}
//                   className={`w-20 h-20 object-contain rounded cursor-pointer border ${
//                     mainImage === img.image ? "border-blue-600" : "border-gray-200"
//                   }`}
//                   onClick={() => setMainImage(img.image)}
//                 />
//               ))}
//             </div>

//             <div className="flex-1 flex justify-center items-center">
//               <img
//                 src={mainImage}
//                 alt={product.title}
//                 className="w-full h-auto max-h-[500px] object-contain"
//               />
//             </div>
//           </div>

//           {/* Right: Product Info */}
//           <div className="lg:w-1/2 space-y-4">
//             <h1 className="text-3xl font-bold text-[#003366]">{product.title}</h1>

//             <div className="flex items-center gap-4">
//               <p className="text-red-600 font-bold text-2xl">₦{formatNumber(product.price)}</p>
//               <p className="text-gray-400 line-through text-lg">
//                 ₦{formatNumber(product.old_price ?? product.price * 1.7)}
//               </p>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-1">{renderStars(product.average_rating)}</div>
//               <p className="text-gray-500 text-sm">{product.sold} sold</p>
//             </div>

//             <p className="text-gray-700">{product.description}</p>

//             {/* Color Selection */}
//             {product.colors?.length > 0 && (
//               <div className="flex gap-2 mt-2">
//                 {product.colors.slice(0, 4).map((color, idx) => (
//                   <div
//                     key={idx}
//                     onClick={() => {
//                       setSelectedColor(color);
//                       const colorImage = product.images?.find(img => img.color === color);
//                       if (colorImage) setMainImage(colorImage.image);
//                     }}
//                     className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
//                       selectedColor === color ? "border-blue-600" : "border-gray-300"
//                     }`}
//                     style={{ backgroundColor: color }}
//                   />
//                 ))}
//               </div>
//             )}

//             {/* Quantity Selector */}
//             <div className="flex items-center gap-4 mt-4">
//               <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="bg-gray-200 px-3 py-1 rounded text-lg">-</button>
//               <span className="text-xl font-semibold">{qty}</span>
//               <button onClick={() => setQty((q) => q + 1)} className="bg-gray-200 px-3 py-1 rounded text-lg">+</button>
//               {thisProductQty > 0 && <span className="text-gray-700 font-semibold">In Cart: {thisProductQty}</span>}
//             </div>

//             <button onClick={handleAddToCart} className="bg-[#FF0000] text-white px-6 py-3 rounded hover:bg-[#003366] transition mt-4">Add to Cart</button>
//           </div>
//         </div>

//         {/* Reviews */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
//           {reviews.length === 0 ? <p>No reviews yet</p> : reviews.map((r) => (
//             <div key={r.id} className="border-b py-2">
//               <div className="flex justify-between items-center">
//                 <p className="font-semibold">{r.user_name}</p>
//                 <span className="text-gray-500 text-sm">{new Date(r.date).toLocaleDateString()}</span>
//               </div>
//               <div className="flex items-center">{renderStars(r.rating)}</div>
//               <p className="mt-1">{r.text}</p>
//             </div>
//           ))}
//         </div>

//         {/* Video Demo */}
//         {product.demo_video && (
//           <div className="bg-white rounded-lg shadow p-6">
//             <h2 className="text-2xl font-bold mb-4">Product Video Demo</h2>
//             <video
//               controls
//               className="w-full max-h-[500px] object-contain rounded"
//             >
//               <source src={product.demo_video} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         )}

//         {/* Related Products */}
//         {relatedProducts.length > 0 && (
//           <div className="bg-white rounded-lg shadow p-6">
//             <h2 className="text-2xl font-bold mb-4">Related Products</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//               {relatedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
//             </div>
//           </div>
//         )}

//       </div>
//     </StoreLayout>
//   );
// };














// /* TEMU STYLE PRODUCT PAGE */
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
// import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
// import { useCart } from "../context/CartContext";
// import { ProductCard } from "./ProductCard";
// import { StoreLayout } from "../layouts/StoreLayout";

// export const ProductPage = () => {
//   const { id, slug } = useParams();
//   const productIdentifier = id || slug;

//   const navigate = useNavigate();
//   const { addToCart, cartItems } = useCart();

//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [qty, setQty] = useState(1);
//   const [mainImage, setMainImage] = useState("");
//   const [selectedColor, setSelectedColor] = useState(null);

//   const BASE_URL = "http://127.0.0.1:8000/store";

//   useEffect(() => {
//     if (!productIdentifier) return;

//     axios.get(`${BASE_URL}/products/${productIdentifier}/`).then((res) => {
//       setProduct(res.data);
//       setMainImage(res.data.images?.[0]?.image || "");
//     });

//     axios
//       .get(`${BASE_URL}/products/${productIdentifier}/reviews/`)
//       .then((res) =>
//         setReviews(res.data.sort((a, b) => new Date(b.date) - new Date(a.date)))
//       );
//   }, [productIdentifier]);

//   const formatNumber = (num) =>
//     new Intl.NumberFormat("en-NG", { minimumFractionDigits: 0 }).format(num);

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       if (i <= Math.floor(rating))
//         stars.push(<FaStar key={i} className="text-yellow-400" />);
//       else if (i - rating < 1)
//         stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
//       else stars.push(<FaRegStar key={i} className="text-gray-300" />);
//     }
//     return stars;
//   };

//   const thisProductQty =
//     cartItems.find((item) => item.id === product?.id)?.quantity || 0;

//   if (!product) return <p>Loading...</p>;

//   return (
//     <StoreLayout
//       searchValue={searchValue}
//       setSearchValue={setSearchValue}
//       categories={categories}
//       cartCount={cartItems.length}
//       logo="/logo.png"
//     >
//       <div className="container mx-auto px-4 py-8">

//         {/* PRODUCT MAIN SECTION */}
//         <div className="flex flex-col lg:flex-row gap-8">

//           {/* LEFT: IMAGES */}
//           <div className="flex gap-4 lg:w-1/2">

//             {/* Thumbnails */}
//             <div className="hidden lg:flex flex-col gap-3">
//               {product.images?.slice(0, 6).map((img, i) => (
//                 <img
//                   key={i}
//                   src={img.image}
//                   onClick={() => setMainImage(img.image)}
//                   className={`w-20 h-20 rounded-xl object-cover border cursor-pointer ${
//                     mainImage === img.image
//                       ? "border-orange-500"
//                       : "border-gray-300"
//                   }`}
//                 />
//               ))}
//             </div>

//             {/* Main Image */}
//             <div className="flex-1 relative">
//               <img
//                 src={mainImage}
//                 className="w-full rounded-xl object-contain max-h-[550px]"
//               />

//               {/* Arrows */}
//               <button className="absolute left-2 top-1/2 bg-white shadow rounded-full p-2">
//                 <HiChevronLeft className="text-2xl" />
//               </button>
//               <button className="absolute right-2 top-1/2 bg-white shadow rounded-full p-2">
//                 <HiChevronRight className="text-2xl" />
//               </button>
//             </div>
//           </div>

//           {/* RIGHT: PRODUCT INFO */}
//           <div className="lg:w-1/2 space-y-4">

//             <h1 className="text-2xl font-bold leading-tight">{product.title}</h1>

//             {/* Rating + Sold */}
//             <div className="flex items-center gap-3 text-gray-700">
//               <div className="flex gap-1">{renderStars(product.average_rating)}</div>
//               <span className="text-gray-500">{product.sold} sold</span>
//             </div>

//             {/* Price Section */}
//             <div>
//               <p className="text-orange-600 font-bold text-3xl">
//                 ₦{formatNumber(product.price)}
//               </p>
//               <p className="text-gray-400 line-through">
//                 ₦{formatNumber(product.old_price || product.price * 1.7)}
//               </p>
//             </div>

//             {/* Color Selector Like Temu */}
//             {product.colors?.length > 0 && (
//               <div>
//                 <p className="font-medium mb-2">Color: {selectedColor}</p>
//                 <div className="grid grid-cols-4 gap-3">
//                   {product.colors.map((color, i) => (
//                     <div
//                       key={i}
//                       className={`border rounded-lg p-1 cursor-pointer ${
//                         selectedColor === color
//                           ? "border-orange-500"
//                           : "border-gray-300"
//                       }`}
//                       onClick={() => setSelectedColor(color)}
//                     >
//                       <div
//                         className="w-full h-14 rounded-md"
//                         style={{ backgroundColor: color }}
//                       ></div>
//                       <p className="text-center text-sm mt-1 capitalize">{color}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Quantity Like Temu */}
//             <div className="mt-3">
//               <p className="font-medium mb-1">Qty</p>
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={() => setQty((q) => Math.max(1, q - 1))}
//                   className="border px-3 py-1 rounded"
//                 >
//                   -
//                 </button>
//                 <span className="text-xl">{qty}</span>
//                 <button
//                   onClick={() => setQty((q) => q + 1)}
//                   className="border px-3 py-1 rounded"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>

//             {/* ADD TO CART BUTTON */}
//             <button
//               onClick={() =>
//                 addToCart(
//                   {
//                     id: product.id,
//                     title: product.title,
//                     price: product.price,
//                     image: mainImage,
//                     color: selectedColor,
//                   },
//                   qty
//                 )
//               }
//               className="w-full bg-orange-500 text-white py-4 rounded-full text-xl font-semibold mt-4"
//             >
//               -51% now! Add to cart!
//             </button>
//           </div>
//         </div>

//         {/* REVIEWS */}
//         <div className="mt-10 bg-white p-6 rounded-xl shadow">
//           <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
//           {reviews.length === 0 ? (
//             <p>No reviews yet</p>
//           ) : (
//             reviews.map((r) => (
//               <div key={r.id} className="border-b py-3">
//                 <div className="font-bold">{r.user_name}</div>
//                 <div className="flex gap-1">{renderStars(r.rating)}</div>
//                 <p>{r.text}</p>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Video Demo */}
//        {product.demo_video && (
//           <div className="bg-white rounded-lg shadow p-6">
//             <h2 className="text-2xl font-bold mb-4">Product Video Demo</h2>
//             <video
//               controls
//               className="w-full max-h-[500px] object-contain rounded"
//             >
//               <source src={product.demo_video} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         )}

//         {/* RELATED PRODUCTS */}
//         {relatedProducts.length > 0 && (
//           <div className="mt-10">
//             <h2 className="text-xl font-bold mb-3">Related Products</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {relatedProducts.map((p) => (
//                 <ProductCard key={p.id} product={p} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </StoreLayout>
//   );
// };













/* TEMU STYLE PRODUCT PAGE WITH VARIANT IMAGES */
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
// import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
// import { useCart } from "../context/CartContext";
// import { ProductCard } from "./ProductCard";
// import { StoreLayout } from "../layouts/StoreLayout";

// export const ProductPage = () => {
//   const { id, slug } = useParams();
//   const productIdentifier = id || slug;

//   const { addToCart, cartItems } = useCart();

//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [qty, setQty] = useState(1);
//   const [mainImage, setMainImage] = useState("");
//   const [selectedColor, setSelectedColor] = useState(null);

//   const BASE_URL = "http://127.0.0.1:8000/store";

//   useEffect(() => {
//     if (!productIdentifier) return;

//     // Fetch product
//     axios.get(`${BASE_URL}/products/${productIdentifier}/`)
//       .then((res) => {
//         setProduct(res.data);
//         setMainImage(res.data.images?.[0]?.image || "");
//       })
//       .catch(() => setProduct(null));

//     // Fetch reviews
//     axios.get(`${BASE_URL}/products/${productIdentifier}/reviews/`)
//       .then((res) =>
//         setReviews(res.data.sort((a, b) => new Date(b.date) - new Date(a.date)))
//       )
//       .catch(() => setReviews([]));

//     // Fetch related products
//     axios.get(`${BASE_URL}/products/${productIdentifier}/related/`)
//       .then((res) => setRelatedProducts(res.data))
//       .catch(() => setRelatedProducts([]));

//     // Fetch categories
//     axios.get(`${BASE_URL}/categories/`)
//       .then((res) => setCategories(res.data))
//       .catch(() => setCategories([]));

//   }, [productIdentifier]);

//   const formatNumber = (num) =>
//     new Intl.NumberFormat("en-NG", { minimumFractionDigits: 0 }).format(num);

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       if (i <= Math.floor(rating))
//         stars.push(<FaStar key={i} className="text-yellow-400" />);
//       else if (i - rating < 1)
//         stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
//       else stars.push(<FaRegStar key={i} className="text-gray-300" />);
//     }
//     return stars;
//   };

//   const thisProductQty = cartItems.find((item) => item.id === product?.id)?.quantity || 0;

//   if (!product) return <p className="text-center py-20">Loading...</p>;

//   return (
//     <StoreLayout
//       searchValue={searchValue}
//       setSearchValue={setSearchValue}
//       categories={categories}
//       cartCount={cartItems.length}
//       logo="/logo.png"
//     >
//       <div className="container mx-auto px-4 py-8">

//         {/* PRODUCT MAIN SECTION */}
//         <div className="flex flex-col lg:flex-row gap-8">

//           {/* LEFT: IMAGES */}
//           <div className="flex gap-4 lg:w-1/2">

//             {/* Thumbnails */}
//             <div className="hidden lg:flex flex-col gap-3">
//               {product.images?.slice(0, 6).map((img, i) => (
//                 <img
//                   key={i}
//                   src={img.image}
//                   onClick={() => setMainImage(img.image)}
//                   className={`w-20 h-20 rounded-xl object-cover border cursor-pointer ${mainImage === img.image ? "border-orange-500" : "border-gray-300"}`}
//                 />
//               ))}
//             </div>

//             {/* Main Image */}
//             <div className="flex-1 relative">
//               <img
//                 src={mainImage}
//                 alt={product.title}
//                 className="w-full rounded-xl object-contain max-h-[550px]"
//               />

//               {/* Arrows */}
//               <button className="absolute left-2 top-1/2 bg-white shadow rounded-full p-2 -translate-y-1/2">
//                 <HiChevronLeft className="text-2xl" />
//               </button>
//               <button className="absolute right-2 top-1/2 bg-white shadow rounded-full p-2 -translate-y-1/2">
//                 <HiChevronRight className="text-2xl" />
//               </button>
//             </div>
//           </div>

//           {/* RIGHT: PRODUCT INFO */}
//           <div className="lg:w-1/2 space-y-4">

//             <h1 className="text-2xl font-bold leading-tight">{product.title}</h1>

//             {/* Rating + Sold */}
//             <div className="flex items-center gap-3 text-gray-700">
//               <div className="flex gap-1">{renderStars(product.average_rating)}</div>
//               <span className="text-gray-500">{product.sold} sold</span>
//             </div>

//             {/* Price Section */}
//             <div>
//               <p className="text-orange-600 font-bold text-3xl">₦{formatNumber(product.price)}</p>
//               <p className="text-gray-400 line-through">₦{formatNumber(product.old_price || product.price * 1.7)}</p>
//             </div>

//             {/* Color Selector with Variant Image */}
//             {product.colors?.length > 0 && (
//               <div>
//                 <p className="font-medium mb-2">Color: {selectedColor || "Select"}</p>
//                 <div className="grid grid-cols-4 gap-3">
//                   {product.colors.map((color, i) => (
//                     <div
//                       key={i}
//                       className={`border rounded-lg p-1 cursor-pointer ${selectedColor === color ? "border-orange-500" : "border-gray-300"}`}
//                       onClick={() => {
//                         setSelectedColor(color);
//                         // Update main image to variant image
//                         const variantImage = product.images?.find(img => img.color === color)?.image;
//                         if (variantImage) setMainImage(variantImage);
//                       }}
//                     >
//                       <div
//                         className="w-full h-14 rounded-md"
//                         style={{ backgroundColor: color }}
//                       ></div>
//                       <p className="text-center text-sm mt-1 capitalize">{color}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Quantity Selector */}
//             <div className="mt-3">
//               <p className="font-medium mb-1">Qty</p>
//               <div className="flex items-center gap-3">
//                 <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="border px-3 py-1 rounded">-</button>
//                 <span className="text-xl">{qty}</span>
//                 <button onClick={() => setQty((q) => q + 1)} className="border px-3 py-1 rounded">+</button>
//               </div>
//             </div>

//             {/* ADD TO CART BUTTON */}
//             <button
//               onClick={() =>
//                 addToCart(
//                   {
//                     id: product.id,
//                     title: product.title,
//                     price: product.price,
//                     image: mainImage,
//                     color: selectedColor,
//                   },
//                   qty
//                 )
//               }
//               className="w-full bg-orange-500 text-white py-4 rounded-full text-xl font-semibold mt-4"
//             >
//               -51% now! Add to cart!
//             </button>
//           </div>
//         </div>

//         {/* REVIEWS */}
//         <div className="mt-10 bg-white p-6 rounded-xl shadow">
//           <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
//           {reviews.length === 0 ? (
//             <p>No reviews yet</p>
//           ) : (
//             reviews.map((r) => (
//               <div key={r.id} className="border-b py-3">
//                 <div className="font-bold">{r.user_name}</div>
//                 <div className="flex gap-1">{renderStars(r.rating)}</div>
//                 <p>{r.text}</p>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Video Demo */}
//         {product.demo_video && (
//           <div className="bg-white rounded-lg shadow p-6 mt-10">
//             <h2 className="text-2xl font-bold mb-4">Product Video Demo</h2>
//             <video controls className="w-full max-h-[500px] object-contain rounded">
//               <source src={product.demo_video} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         )}

//         {/* RELATED PRODUCTS */}
//         {relatedProducts.length > 0 && (
//           <div className="mt-10">
//             <h2 className="text-xl font-bold mb-3">Related Products</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {relatedProducts.map((p) => (
//                 <ProductCard key={p.id} product={p} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </StoreLayout>
//   );
// };












// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
// import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
// import { useCart } from "../context/CartContext";
// import { ProductCard } from "./ProductCard";
// import { StoreLayout } from "../layouts/StoreLayout";

// export const ProductPage = () => {
//   const { id, slug } = useParams();
//   const productIdentifier = id || slug;

//   const { addToCart, cartItems } = useCart();

//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [qty, setQty] = useState(1);
//   const [mainImage, setMainImage] = useState("");
//   const [selectedColor, setSelectedColor] = useState(null);

//   const BASE_URL = "http://127.0.0.1:8000/store";

//   useEffect(() => {
//     if (!productIdentifier) return;

//     axios
//       .get(`${BASE_URL}/products/${productIdentifier}/`)
//       .then((res) => {
//         setProduct(res.data);
//         setMainImage(res.data.images?.[0]?.image || "");
//       })
//       .catch(() => setProduct(null));

//     axios
//       .get(`${BASE_URL}/products/${productIdentifier}/reviews/`)
//       .then((res) =>
//         setReviews(res.data.sort((a, b) => new Date(b.date) - new Date(a.date)))
//       )
//       .catch(() => setReviews([]));

//     axios
//       .get(`${BASE_URL}/products/${productIdentifier}/related/`)
//       .then((res) => setRelatedProducts(res.data))
//       .catch(() => setRelatedProducts([]));

//     axios
//       .get(`${BASE_URL}/categories/`)
//       .then((res) => setCategories(res.data))
//       .catch(() => setCategories([]));
//   }, [productIdentifier]);

//   const formatNumber = (num) =>
//     new Intl.NumberFormat("en-NG", { minimumFractionDigits: 0 }).format(num);

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       if (i <= Math.floor(rating))
//         stars.push(<FaStar key={i} className="text-yellow-400" />);
//       else if (i - rating < 1)
//         stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
//       else stars.push(<FaRegStar key={i} className="text-gray-300" />);
//     }
//     return stars;
//   };

//   if (!product) return <p className="text-center py-20">Loading...</p>;

//   return (
//     <StoreLayout
//       searchValue={searchValue}
//       setSearchValue={setSearchValue}
//       categories={categories}
//       cartCount={cartItems.length}
//       logo="/logo.png"
//     >
//       <div className="container mx-auto px-4 py-8">
//         {/* PRODUCT MAIN SECTION */}
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* LEFT IMAGES */}
//           <div className="flex gap-4 lg:w-1/2">
//             {/* Thumbnails */}
//             <div className="hidden lg:flex flex-col gap-3">
//               {product.images?.slice(0, 6).map((img, i) => (
//                 <img
//                   key={i}
//                   src={img.image}
//                   onClick={() => setMainImage(img.image)}
//                   className={`w-20 h-20 rounded-xl object-cover border cursor-pointer ${
//                     mainImage === img.image
//                       ? "border-orange-500"
//                       : "border-gray-300"
//                   }`}
//                 />
//               ))}
//             </div>

//             {/* Main Image */}
//             <div className="flex-1 relative">
//               <img
//                 src={mainImage}
//                 alt={product.title}
//                 className="w-full rounded-xl object-contain max-h-[550px]"
//               />

//               <button className="absolute left-2 top-1/2 bg-white shadow rounded-full p-2 -translate-y-1/2">
//                 <HiChevronLeft className="text-2xl" />
//               </button>
//               <button className="absolute right-2 top-1/2 bg-white shadow rounded-full p-2 -translate-y-1/2">
//                 <HiChevronRight className="text-2xl" />
//               </button>
//             </div>
//           </div>

//           {/* RIGHT PRODUCT INFO */}
//           <div className="lg:w-1/2 space-y-4">
//             <h1 className="text-2xl font-bold leading-tight">{product.title}</h1>

//             <div className="flex items-center gap-3 text-gray-700">
//               <div className="flex gap-1">
//                 {renderStars(product.average_rating)}
//               </div>
//               <span className="text-gray-500">{product.sold} sold</span>
//             </div>

//             {/* Price */}
//             <div>
//               <p className="text-orange-600 font-bold text-3xl">
//                 ₦{formatNumber(product.price)}
//               </p>
//               <p className="text-gray-400 line-through">
//                 ₦{formatNumber(product.old_price || product.price * 1.7)}
//               </p>
//             </div>

//             {/* Description FIXED */}
//             {product.description && (
//               <p className="text-gray-700 leading-relaxed">
//                 {product.description}
//               </p>
//             )}

//             {/* COLORS WITH VARIANT IMAGES */}
//             {product.colors?.length > 0 && (
//               <div>
//                 <p className="font-medium mb-2">
//                   Color: {selectedColor || "Select"}
//                 </p>

//                 <div className="grid grid-cols-4 gap-3">
//                   {product.colors.map((color, i) => {
//                     const variantImage =
//                       product.images?.find((img) => img.color === color)?.image;

//                     return (
//                       <div
//                         key={i}
//                         className={`border rounded-lg p-1 cursor-pointer ${
//                           selectedColor === color
//                             ? "border-orange-500"
//                             : "border-gray-300"
//                         }`}
//                         onClick={() => {
//                           setSelectedColor(color);
//                           if (variantImage) setMainImage(variantImage);
//                         }}
//                       >
//                         {/* If variant image exists, show it. Else show color box */}
//                         {variantImage ? (
//                           <img
//                             src={variantImage}
//                             className="w-full h-14 object-cover rounded-md"
//                           />
//                         ) : (
//                           <div
//                             className="w-full h-14 rounded-md"
//                             style={{ backgroundColor: color }}
//                           ></div>
//                         )}

//                         <p className="text-center text-sm mt-1 capitalize">
//                           {color}
//                         </p>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Qty */}
//             <div className="mt-3">
//               <p className="font-medium mb-1">Qty</p>
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={() => setQty((q) => Math.max(1, q - 1))}
//                   className="border px-3 py-1 rounded"
//                 >
//                   -
//                 </button>
//                 <span className="text-xl">{qty}</span>
//                 <button
//                   onClick={() => setQty((q) => q + 1)}
//                   className="border px-3 py-1 rounded"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>

//             <button
//               onClick={() =>
//                 addToCart(
//                   {
//                     id: product.id,
//                     title: product.title,
//                     price: product.price,
//                     image: mainImage,
//                     color: selectedColor,
//                   },
//                   qty
//                 )
//               }
//               className="w-full bg-orange-500 text-white py-4 rounded-full text-xl font-semibold mt-4"
//             >
//               -51% now! Add to cart!
//             </button>
//           </div>
//         </div>

//         {/* REVIEWS */}
//         <div className="mt-10 bg-white p-6 rounded-xl shadow">
//           <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
//           {reviews.length === 0 ? (
//             <p>No reviews yet</p>
//           ) : (
//             reviews.map((r) => (
//               <div key={r.id} className="border-b py-3">
//                 <div className="font-bold">{r.user_name}</div>
//                 <div className="flex gap-1">{renderStars(r.rating)}</div>
//                 <p>{r.text}</p>
//               </div>
//             ))
//           )}
//         </div>

//         {/* VIDEO */}
//         {product.demo_video && (
//           <div className="bg-white rounded-lg shadow p-6 mt-10">
//             <h2 className="text-2xl font-bold mb-4">Product Video Demo</h2>
//             <video
//               controls
//               className="w-full max-h-[500px] object-contain rounded"
//             >
//               <source src={product.demo_video} type="video/mp4" />
//             </video>
//           </div>
//         )}

//         {/* RELATED */}
//         {relatedProducts.length > 0 && (
//           <div className="mt-10">
//             <h2 className="text-xl font-bold mb-3">Related Products</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {relatedProducts.map((p) => (
//                 <ProductCard key={p.id} product={p} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </StoreLayout>
//   );
// };














// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
// import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
// import { useCart } from "../context/CartContext";
// import { ProductCard } from "./ProductCard";
// import { StoreLayout } from "../layouts/StoreLayout";

// export const ProductPage = () => {
//   const { id, slug } = useParams();
//   const productIdentifier = id || slug;

//   const { addToCart, cartItems } = useCart();

//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [qty, setQty] = useState(1);
//   const [mainImage, setMainImage] = useState("");
//   const [selectedColor, setSelectedColor] = useState(null);

//   const BASE_URL = "http://127.0.0.1:8000/store";

//   useEffect(() => {
//     if (!productIdentifier) return;

//     axios
//       .get(`${BASE_URL}/products/${productIdentifier}/`)
//       .then((res) => {
//         setProduct(res.data);
//         setMainImage(res.data.images?.[0]?.image || "");
//       })
//       .catch(() => setProduct(null));

//     axios
//       .get(`${BASE_URL}/products/${productIdentifier}/reviews/`)
//       .then((res) =>
//         setReviews(res.data.sort((a, b) => new Date(b.date) - new Date(a.date)))
//       )
//       .catch(() => setReviews([]));

//     axios
//       .get(`${BASE_URL}/products/${productIdentifier}/related/`)
//       .then((res) => setRelatedProducts(res.data))
//       .catch(() => setRelatedProducts([]));

//     axios
//       .get(`${BASE_URL}/categories/`)
//       .then((res) => setCategories(res.data))
//       .catch(() => setCategories([]));
//   }, [productIdentifier]);

//   const formatNumber = (num) =>
//     new Intl.NumberFormat("en-NG", { minimumFractionDigits: 0 }).format(num);

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       if (i <= Math.floor(rating))
//         stars.push(<FaStar key={i} className="text-yellow-400" />);
//       else if (i - rating < 1)
//         stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
//       else stars.push(<FaRegStar key={i} className="text-gray-300" />);
//     }
//     return stars;
//   };

//   if (!product) return <p className="text-center py-20">Loading...</p>;

//   // 🔥 Extract unique colors from product.images[]
//   const extractedColors = [
//     ...new Set(product.images?.filter(img => img.color).map(img => img.color))
//   ];

//   return (
//     <StoreLayout
//       searchValue={searchValue}
//       setSearchValue={setSearchValue}
//       categories={categories}
//       cartCount={cartItems.length}
//       logo="/logo.png"
//     >
//       <div className="container mx-auto px-4 py-8">

//         {/* PRODUCT MAIN SECTION */}
//         <div className="flex flex-col lg:flex-row gap-8">

//           {/* LEFT IMAGES */}
//           <div className="flex gap-4 lg:w-1/2">
//             {/* Thumbnails */}
//             <div className="hidden lg:flex flex-col gap-3">
//               {product.images?.slice(0, 6).map((img, i) => (
//                 <img
//                   key={i}
//                   src={img.image}
//                   onClick={() => setMainImage(img.image)}
//                   className={`w-20 h-20 rounded-xl object-cover border cursor-pointer ${
//                     mainImage === img.image
//                       ? "border-orange-500"
//                       : "border-gray-300"
//                   }`}
//                 />
//               ))}
//             </div>

//             {/* Main Image */}
//             <div className="flex-1 relative">
//               <img
//                 src={mainImage}
//                 alt={product.title}
//                 className="w-full rounded-xl object-contain max-h-[550px]"
//               />

//               <button className="absolute left-2 top-1/2 bg-white shadow rounded-full p-2 -translate-y-1/2">
//                 <HiChevronLeft className="text-2xl" />
//               </button>
//               <button className="absolute right-2 top-1/2 bg-white shadow rounded-full p-2 -translate-y-1/2">
//                 <HiChevronRight className="text-2xl" />
//               </button>
//             </div>
//           </div>

//           {/* RIGHT PRODUCT INFO */}
//           <div className="lg:w-1/2 space-y-4">
//             <h1 className="text-2xl font-bold leading-tight">{product.title}</h1>

//             <div className="flex items-center gap-3 text-gray-700">
//               <div className="flex gap-1">{renderStars(product.average_rating)}</div>
//               <span className="text-gray-500">{product.sold} sold</span>
//             </div>

//             {/* Price */}
//             <div>
//               <p className="text-orange-600 font-bold text-3xl">
//                 ₦{formatNumber(product.price)}
//               </p>
//               <p className="text-gray-400 line-through">
//                 ₦{formatNumber(product.old_price || product.price * 1.7)}
//               </p>
//             </div>

//             {/* Description */}
//             {product.description && (
//               <p className="text-gray-700 leading-relaxed">
//                 {product.description}
//               </p>
//             )}

//             {/* 🔥 NEW COLOR SYSTEM — works without product.colors */}
//             {extractedColors.length > 0 && (
//               <div>
//                 <p className="font-medium mb-2">
//                   Color: {selectedColor || "Select"}
//                 </p>

//                 <div className="grid grid-cols-4 gap-3">
//                   {extractedColors.map((color, i) => {
//                     const variantImage =
//                       product.images?.find((img) => img.color === color)?.image;

//                     return (
//                       <div
//                         key={i}
//                         className={`border rounded-lg p-1 cursor-pointer ${
//                           selectedColor === color
//                             ? "border-orange-500"
//                             : "border-gray-300"
//                         }`}
//                         onClick={() => {
//                           setSelectedColor(color);
//                           if (variantImage) setMainImage(variantImage);
//                         }}
//                       >
//                         {variantImage ? (
//                           <img
//                             src={variantImage}
//                             className="w-full h-14 object-cover rounded-md"
//                           />
//                         ) : (
//                           <div
//                             className="w-full h-14 rounded-md"
//                             style={{ backgroundColor: color }}
//                           ></div>
//                         )}

//                         <p className="text-center text-sm mt-1 capitalize">
//                           {color}
//                         </p>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Qty */}
//             <div className="mt-3">
//               <p className="font-medium mb-1">Qty</p>
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={() => setQty((q) => Math.max(1, q - 1))}
//                   className="border px-3 py-1 rounded"
//                 >
//                   -
//                 </button>
//                 <span className="text-xl">{qty}</span>
//                 <button
//                   onClick={() => setQty((q) => q + 1)}
//                   className="border px-3 py-1 rounded"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>

//             <button
//               onClick={() =>
//                 addToCart(
//                   {
//                     id: product.id,
//                     title: product.title,
//                     price: product.price,
//                     image: mainImage,
//                     color: selectedColor,
//                   },
//                   qty
//                 )
//               }
//               className="w-full bg-orange-500 text-white py-4 rounded-full text-xl font-semibold mt-4"
//             >
//               -51% now! Add to cart!
//             </button>
//           </div>
//         </div>

//         {/* REVIEWS */}
//         <div className="mt-10 bg-white p-6 rounded-xl shadow">
//           <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
//           {reviews.length === 0 ? (
//             <p>No reviews yet</p>
//           ) : (
//             reviews.map((r) => (
//               <div key={r.id} className="border-b py-3">
//                 <div className="font-bold">{r.user_name}</div>
//                 <div className="flex gap-1">{renderStars(r.rating)}</div>
//                 <p>{r.text}</p>
//               </div>
//             ))
//           )}
//         </div>

//         {/* VIDEO */}
//         {product.demo_video && (
//           <div className="bg-white rounded-lg shadow p-6 mt-10">
//             <h2 className="text-2xl font-bold mb-4">Product Video Demo</h2>
//             <video
//               controls
//               className="w-full max-h-[500px] object-contain rounded"
//             >
//               <source src={product.demo_video} type="video/mp4" />
//             </video>
//           </div>
//         )}

//         {/* RELATED PRODUCTS */}
//         {relatedProducts.length > 0 && (
//           <div className="mt-10">
//             <h2 className="text-xl font-bold mb-3">Related Products</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {relatedProducts.map((p) => (
//                 <ProductCard key={p.id} product={p} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </StoreLayout>
//   );
// };











// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
// import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
// import { useCart } from "../context/CartContext";
// import { ProductCard } from "./ProductCard";
// import { StoreLayout } from "../layouts/StoreLayout";

// export const ProductPage = () => {
//   const { id, slug } = useParams();
//   const productIdentifier = id || slug;

//   const { addToCart, cartItems } = useCart();

//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [qty, setQty] = useState(1);
//   const [mainImage, setMainImage] = useState("");
//   const [selectedColor, setSelectedColor] = useState(null);

//   const BASE_URL = "http://127.0.0.1:8000/store";

//   useEffect(() => {
//     if (!productIdentifier) return;

//     // Fetch product details
//     axios
//       .get(`${BASE_URL}/products/${productIdentifier}/`)
//       .then((res) => {
//         setProduct(res.data);
//         setMainImage(res.data.images?.[0]?.image || "");
//       })
//       .catch(() => setProduct(null));

//     // Fetch product reviews
//     axios
//       .get(`${BASE_URL}/products/${productIdentifier}/reviews/`)
//       .then((res) =>
//         setReviews(res.data.sort((a, b) => new Date(b.date) - new Date(a.date)))
//       )
//       .catch(() => setReviews([]));

//     // Fetch related products
//     axios
//       .get(`${BASE_URL}/products/${productIdentifier}/related/`)
//       .then((res) => setRelatedProducts(res.data))
//       .catch(() => setRelatedProducts([]));

//     // Fetch categories
//     axios
//       .get(`${BASE_URL}/categories/`)
//       .then((res) => setCategories(res.data))
//       .catch(() => setCategories([]));
//   }, [productIdentifier]);

//   const formatNumber = (num) =>
//     new Intl.NumberFormat("en-NG", { minimumFractionDigits: 0 }).format(num);

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       if (i <= Math.floor(rating))
//         stars.push(<FaStar key={i} className="text-yellow-400" />);
//       else if (i - rating < 1)
//         stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
//       else stars.push(<FaRegStar key={i} className="text-gray-300" />);
//     }
//     return stars;
//   };

//   if (!product) return <p className="text-center py-20">Loading...</p>;

//   // 🔥 Extract unique colors from product.images
//   const extractedColors = [
//     ...new Set(product.images?.filter((img) => img.color).map((img) => img.color))
//   ];

//   // Filter thumbnails based on selected color (if any)
//   const thumbnails = selectedColor
//     ? product.images.filter((img) => img.color === selectedColor)
//     : product.images;

//   return (
//     <StoreLayout
//       searchValue={searchValue}
//       setSearchValue={setSearchValue}
//       categories={categories}
//       cartCount={cartItems.length}
//       logo="/logo.png"
//     >
//       <div className="container mx-auto px-4 py-8">

//         {/* PRODUCT MAIN SECTION */}
//         <div className="flex flex-col lg:flex-row gap-8">

//           {/* LEFT IMAGES */}
//           <div className="flex gap-4 lg:w-1/2">
//             {/* Thumbnails */}
//             <div className="hidden lg:flex flex-col gap-3">
//               {thumbnails?.slice(0, 6).map((img, i) => (
//                 <img
//                   key={i}
//                   src={img.image}
//                   onClick={() => setMainImage(img.image)}
//                   className={`w-20 h-20 rounded-xl object-cover border cursor-pointer ${
//                     mainImage === img.image ? "border-orange-500" : "border-gray-300"
//                   }`}
//                 />
//               ))}
//             </div>

//             {/* Main Image */}
//             <div className="flex-1 relative">
//               <img
//                 src={mainImage}
//                 alt={product.title}
//                 className="w-full rounded-xl object-contain max-h-[550px]"
//               />
//               <button className="absolute left-2 top-1/2 bg-white shadow rounded-full p-2 -translate-y-1/2">
//                 <HiChevronLeft className="text-2xl" />
//               </button>
//               <button className="absolute right-2 top-1/2 bg-white shadow rounded-full p-2 -translate-y-1/2">
//                 <HiChevronRight className="text-2xl" />
//               </button>
//             </div>
//           </div>

//           {/* RIGHT PRODUCT INFO */}
//           <div className="lg:w-1/2 space-y-4">
//             <h1 className="text-2xl font-bold leading-tight">{product.title}</h1>

//             <div className="flex items-center gap-3 text-gray-700">
//               <div className="flex gap-1">{renderStars(product.average_rating)}</div>
//               <span className="text-gray-500">{product.sold} sold</span>
//             </div>

//             {/* Price */}
//             <div>
//               <p className="text-orange-600 font-bold text-3xl">
//                 ₦{formatNumber(product.price)}
//               </p>
//               <p className="text-gray-400 line-through">
//                 ₦{formatNumber(product.old_price || product.price * 1.7)}
//               </p>
//             </div>

//             {/* Description */}
//             {product.description && (
//               <p className="text-gray-700 leading-relaxed">{product.description}</p>
//             )}

//             {/* 🔥 Color Selection */}
//             {extractedColors.length > 0 && (
//               <div>
//                 <p className="font-medium mb-2">
//                   Color: {selectedColor || "Select"}
//                 </p>
//                 <div className="grid grid-cols-4 gap-3">
//                   {extractedColors.map((color, i) => {
//                     const variantImage = product.images.find(
//                       (img) => img.color === color
//                     )?.image;

//                     return (
//                       <div
//                         key={i}
//                         className={`border rounded-lg p-1 cursor-pointer ${
//                           selectedColor === color ? "border-orange-500" : "border-gray-300"
//                         }`}
//                         onClick={() => {
//                           setSelectedColor(color);
//                           if (variantImage) setMainImage(variantImage);
//                         }}
//                       >
//                         {variantImage ? (
//                           <img
//                             src={variantImage}
//                             className="w-full h-14 object-cover rounded-md"
//                           />
//                         ) : (
//                           <div
//                             className="w-full h-14 rounded-md"
//                             style={{ backgroundColor: color }}
//                           />
//                         )}
//                         <p className="text-center text-sm mt-1 capitalize">{color}</p>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Qty */}
//             <div className="mt-3">
//               <p className="font-medium mb-1">Qty</p>
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={() => setQty((q) => Math.max(1, q - 1))}
//                   className="border px-3 py-1 rounded"
//                 >
//                   -
//                 </button>
//                 <span className="text-xl">{qty}</span>
//                 <button
//                   onClick={() => setQty((q) => q + 1)}
//                   className="border px-3 py-1 rounded"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>

//             {/* Add to Cart */}
//             <button
//               onClick={() =>
//                 addToCart(
//                   {
//                     id: product.id,
//                     title: product.title,
//                     price: product.price,
//                     image: mainImage,
//                     color: selectedColor,
//                   },
//                   qty
//                 )
//               }
//               className="w-full bg-orange-500 text-white py-4 rounded-full text-xl font-semibold mt-4"
//             >
//               Add to cart!
//             </button>
//           </div>
//         </div>

//         {/* REVIEWS */}
//         <div className="mt-10 bg-white p-6 rounded-xl shadow">
//           <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
//           {reviews.length === 0 ? (
//             <p>No reviews yet</p>
//           ) : (
//             reviews.map((r) => (
//               <div key={r.id} className="border-b py-3">
//                 <div className="font-bold">{r.user_name}</div>
//                 <div className="flex gap-1">{renderStars(r.rating)}</div>
//                 <p>{r.text}</p>
//               </div>
//             ))
//           )}
//         </div>

//         {/* VIDEO DEMO */}
//         {product.demo_video && (
//           <div className="bg-white rounded-lg shadow p-6 mt-10">
//             <h2 className="text-2xl font-bold mb-4">Product Video Demo</h2>
//             <video
//               controls
//               className="w-full max-h-[500px] object-contain rounded"
//             >
//               <source src={product.demo_video} type="video/mp4" />
//             </video>
//           </div>
//         )}

//         {/* RELATED PRODUCTS */}
//         {relatedProducts.length > 0 && (
//           <div className="mt-10">
//             <h2 className="text-xl font-bold mb-3">Related Products</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {relatedProducts.map((p) => (
//                 <ProductCard key={p.id} product={p} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </StoreLayout>
//   );
// };











// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
// import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
// import { useCart } from "../context/CartContext";
// import { ProductCard } from "./ProductCard";
// import { StoreLayout } from "../layouts/StoreLayout";

// export const ProductPage = () => {
//   const { id, slug } = useParams();
//   const productIdentifier = id || slug;

//   const navigate = useNavigate();
//   const { addToCart, cartItems } = useCart();

//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [qty, setQty] = useState(1);
//   const [mainImage, setMainImage] = useState("");
//   const [selectedColor, setSelectedColor] = useState(null);

//   const BASE_URL = "http://127.0.0.1:8000/store";

//   useEffect(() => {
//     if (!productIdentifier) return;

//     // Fetch product details
//     axios
//       .get(`${BASE_URL}/products/${productIdentifier}/`)
//       .then((res) => {
//         setProduct(res.data);
//         setMainImage(res.data.images?.[0]?.image || "");

//         // Load related products by category
//         if (res.data.category?.id) {
//           axios
//             .get(
//               `${BASE_URL}/products/?category=${res.data.category.id}&exclude=${res.data.id}`
//             )
//             .then((r) => setRelatedProducts(r.data))
//             .catch(console.error);
//         }
//       })
//       .catch(() => setProduct(null));

//     // Fetch product reviews
//     axios
//       .get(`${BASE_URL}/products/${productIdentifier}/reviews/`)
//       .then((res) =>
//         setReviews(
//           res.data.sort((a, b) => new Date(b.date) - new Date(a.date))
//         )
//       )
//       .catch(() => setReviews([]));

//     // Fetch categories
//     axios
//       .get(`${BASE_URL}/categories/`)
//       .then((res) => setCategories(res.data))
//       .catch(() => setCategories([]));
//   }, [productIdentifier]);

//   if (!product) return <p className="text-center py-20">Loading...</p>;

//   const formatNumber = (num) =>
//     new Intl.NumberFormat("en-NG", {
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(num);

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       if (i <= Math.floor(rating))
//         stars.push(<FaStar key={i} className="text-yellow-400" />);
//       else if (i - rating < 1)
//         stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
//       else stars.push(<FaRegStar key={i} className="text-gray-300" />);
//     }
//     return stars;
//   };

//   // 🔥 Extract unique colors
//   const extractedColors = [
//     ...new Set(product.images?.filter((img) => img.color).map((img) => img.color)),
//   ];

//   // Filter thumbnails by selected color
//   const thumbnails = selectedColor
//     ? product.images.filter((img) => img.color === selectedColor)
//     : product.images;

//   // New Add to Cart Handler
//   const handleAddToCart = () => {
//     addToCart(
//       {
//         id: product.id,
//         title: product.title,
//         cleaned_price: Number(product.price),
//         formatted_price: "₦" + formatNumber(product.price),
//         image: mainImage,
//         color: selectedColor,
//       },
//       qty
//     );
//     navigate("/cart");
//   };

//   // Quantity already in cart
//   const thisProductQty =
//     cartItems.find((item) => item.id === product.id)?.quantity || 0;

//   return (
//     <StoreLayout
//       searchValue={searchValue}
//       setSearchValue={setSearchValue}
//       categories={categories}
//       cartCount={cartItems.length}
//       logo="/logo.png"
//     >
//       <div className="container mx-auto px-4 py-8">
//         {/* PRODUCT MAIN SECTION */}
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* LEFT IMAGES */}
//           <div className="flex gap-4 lg:w-1/2">
//             <div className="hidden lg:flex flex-col gap-3">
//               {thumbnails?.slice(0, 6).map((img, i) => (
//                 <img
//                   key={i}
//                   src={img.image}
//                   onClick={() => setMainImage(img.image)}
//                   className={`w-20 h-20 rounded-xl object-cover border cursor-pointer ${
//                     mainImage === img.image ? "border-orange-500" : "border-gray-300"
//                   }`}
//                 />
//               ))}
//             </div>

//             <div className="flex-1 relative">
//               <img
//                 src={mainImage}
//                 alt={product.title}
//                 className="w-full rounded-xl object-contain max-h-[550px]"
//               />
//               <button className="absolute left-2 top-1/2 bg-white shadow rounded-full p-2 -translate-y-1/2">
//                 <HiChevronLeft className="text-2xl" />
//               </button>
//               <button className="absolute right-2 top-1/2 bg-white shadow rounded-full p-2 -translate-y-1/2">
//                 <HiChevronRight className="text-2xl" />
//               </button>
//             </div>
//           </div>

//           {/* RIGHT PRODUCT INFO */}
//           <div className="lg:w-1/2 space-y-4">
//             <h1 className="text-2xl font-bold leading-tight">{product.title}</h1>
//             <div className="flex items-center gap-3 text-gray-700">
//               <div className="flex gap-1">{renderStars(product.average_rating)}</div>
//               <span className="text-gray-500">{product.sold} sold</span>
//             </div>

//             {/* Price */}
//             <div>
//               <p className="text-orange-600 font-bold text-3xl">
//                 ₦{formatNumber(product.price)}
//               </p>
//               <p className="text-gray-400 line-through">
//                 ₦{formatNumber(product.old_price || product.price * 1.7)}
//               </p>
//             </div>

//             {/* Description */}
//             {product.description && (
//               <p className="text-gray-700 leading-relaxed">{product.description}</p>
//             )}

//             {/* Color Selection */}
//             {extractedColors.length > 0 && (
//               <div>
//                 <p className="font-medium mb-2">
//                   Color: {selectedColor || "Select"}
//                 </p>
//                 <div className="grid grid-cols-4 gap-3">
//                   {extractedColors.map((color, i) => {
//                     const variantImage = product.images.find(
//                       (img) => img.color === color
//                     )?.image;

//                     return (
//                       <div
//                         key={i}
//                         className={`border rounded-lg p-1 cursor-pointer ${
//                           selectedColor === color
//                             ? "border-orange-500"
//                             : "border-gray-300"
//                         }`}
//                         onClick={() => {
//                           setSelectedColor(color);
//                           if (variantImage) setMainImage(variantImage);
//                         }}
//                       >
//                         {variantImage ? (
//                           <img
//                             src={variantImage}
//                             className="w-full h-14 object-cover rounded-md"
//                           />
//                         ) : (
//                           <div
//                             className="w-full h-14 rounded-md"
//                             style={{ backgroundColor: color }}
//                           />
//                         )}
//                         <p className="text-center text-sm mt-1 capitalize">{color}</p>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Qty */}
//             <div className="mt-3 flex items-center gap-3">
//               <button
//                 onClick={() => setQty((q) => Math.max(1, q - 1))}
//                 className="border px-3 py-1 rounded"
//               >
//                 -
//               </button>
//               <span className="text-xl">{qty}</span>
//               <button
//                 onClick={() => setQty((q) => q + 1)}
//                 className="border px-3 py-1 rounded"
//               >
//                 +
//               </button>
//               {thisProductQty > 0 && (
//                 <span className="text-gray-700 font-semibold">
//                   In Cart: {thisProductQty}
//                 </span>
//               )}
//             </div>

//             {/* Add to Cart */}
//             <button
//               onClick={handleAddToCart}
//               className="w-full bg-orange-500 text-white py-4 rounded-full text-xl font-semibold mt-4"
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>

//         {/* REVIEWS */}
//         <div className="mt-10 bg-white p-6 rounded-xl shadow">
//           <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
//           {reviews.length === 0 ? (
//             <p>No reviews yet</p>
//           ) : (
//             reviews.map((r) => (
//               <div key={r.id} className="border-b py-3">
//                 <div className="font-bold">{r.user_name}</div>
//                 <div className="flex gap-1">{renderStars(r.rating)}</div>
//                 <p>{r.text}</p>
//               </div>
//             ))
//           )}
//         </div>

//         {/* VIDEO DEMO */}
//         {product.demo_video && (
//           <div className="bg-white rounded-lg shadow p-6 mt-10">
//             <h2 className="text-2xl font-bold mb-4">Product Video Demo</h2>
//             <video
//               controls
//               className="w-full max-h-[500px] object-contain rounded"
//             >
//               <source src={product.demo_video} type="video/mp4" />
//             </video>
//           </div>
//         )}

//         {/* RELATED PRODUCTS */}
//         {relatedProducts.length > 0 && (
//           <div className="mt-10">
//             <h2 className="text-xl font-bold mb-3">Related Products</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {relatedProducts.map((p) => (
//                 <ProductCard key={p.id} product={p} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </StoreLayout>
//   );
// };














// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
// import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
// import { useCart } from "../context/CartContext";
// import { ProductCard } from "./ProductCard";
// import { StoreLayout } from "../layouts/StoreLayout";

// export const ProductPage = () => {
//   const { id, slug } = useParams();
//   const productIdentifier = id || slug;

//   const navigate = useNavigate();
//   const { addToCart, cartItems } = useCart();

//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [qty, setQty] = useState(1);
//   const [mainImage, setMainImage] = useState("");
//   const [selectedColor, setSelectedColor] = useState(null);

//   const BASE_URL = "http://127.0.0.1:8000/store";

//   useEffect(() => {
//     if (!productIdentifier) return;

//     // Fetch product details
//     axios
//       .get(`${BASE_URL}/products/${productIdentifier}/`)
//       .then((res) => {
//         setProduct(res.data);
//         setMainImage(res.data.images?.[0]?.image || "");

//         // Load related products
//         if (res.data.category?.id) {
//           axios
//             .get(
//               `${BASE_URL}/products/?category=${res.data.category.id}&exclude=${res.data.id}`
//             )
//             .then((r) => setRelatedProducts(r.data))
//             .catch(console.error);
//         }
//       })
//       .catch(() => setProduct(null));

//     // Fetch reviews
//     axios
//       .get(`${BASE_URL}/products/${productIdentifier}/reviews/`)
//       .then((res) =>
//         setReviews(
//           res.data.sort((a, b) => new Date(b.date) - new Date(a.date))
//         )
//       );

//     // Fetch categories
//     axios
//       .get(`${BASE_URL}/categories/`)
//       .then((res) => setCategories(res.data));
//   }, [productIdentifier]);

//   if (!product) return <p className="text-center py-20">Loading...</p>;

//   const formatNumber = (num) =>
//     new Intl.NumberFormat("en-NG", {
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(num);

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       if (i <= Math.floor(rating))
//         stars.push(<FaStar key={i} className="text-yellow-400" />);
//       else if (i - rating < 1)
//         stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
//       else stars.push(<FaRegStar key={i} className="text-gray-300" />);
//     }
//     return stars;
//   };

//   // Extract available colors
//   const extractedColors = [
//     ...new Set(
//       product.images?.filter((img) => img.color).map((img) => img.color)
//     ),
//   ];

//   const thumbnails = selectedColor
//     ? product.images.filter((img) => img.color === selectedColor)
//     : product.images;

//   // Add to cart
//   const handleAddToCart = () => {
//     addToCart(
//       {
//         id: product.id,
//         title: product.title,
//         cleaned_price: Number(product.price),
//         formatted_price: "₦" + formatNumber(product.price),
//         image: mainImage,
//         color: selectedColor,
//       },
//       qty
//     );
//     navigate("/cart");
//   };

//   const thisProductQty =
//     cartItems.find((item) => item.id === product.id)?.quantity || 0;

//   const discount =
//     product.old_price &&
//     Math.round(((product.old_price - product.price) / product.old_price) * 100);

//   return (
//     <StoreLayout
//       searchValue={searchValue}
//       setSearchValue={setSearchValue}
//       categories={categories}
//       cartCount={cartItems.length}
//       logo="/logo.png"
//     >
//       <div className="container mx-auto px-4 py-8">

//         {/* MAIN PRODUCT SECTION */}
//         <div className="flex flex-col lg:flex-row gap-10">

//           {/* ---------------- LEFT GALLERY ---------------- */}
//           <div className="flex gap-4 lg:w-1/2">
//             {/* Thumbnails */}
//             <div className="hidden lg:flex flex-col gap-3">
//               {thumbnails.slice(0, 6).map((img, i) => (
//                 <div
//                   key={i}
//                   className={`relative w-20 h-20 border rounded-xl overflow-hidden cursor-pointer ${
//                     mainImage === img.image
//                       ? "border-orange-500"
//                       : "border-gray-300"
//                   }`}
//                   onClick={() => setMainImage(img.image)}
//                 >
//                   <img
//                     src={img.image}
//                     className="w-full h-full object-cover rounded-lg"
//                   />
//                 </div>
//               ))}
//             </div>

//             {/* Main Image */}
//             <div className="flex-1 relative">
//               <img
//                 src={mainImage}
//                 className="w-full rounded-xl object-contain max-h-[550px]"
//               />

//               <button className="absolute left-2 top-1/2 bg-white shadow rounded-full p-2 -translate-y-1/2">
//                 <HiChevronLeft className="text-2xl" />
//               </button>

//               <button className="absolute right-2 top-1/2 bg-white shadow rounded-full p-2 -translate-y-1/2">
//                 <HiChevronRight className="text-2xl" />
//               </button>
//             </div>
//           </div>

//           {/* ---------------- RIGHT INFO ---------------- */}
//           <div className="lg:w-1/2 space-y-6">

//             {/* Title */}
//             <h1 className="text-[26px] font-semibold leading-snug">
//               {product.title}
//             </h1>

//             {/* Rating & Sold */}
//             <div className="flex items-center gap-4">
//               <div className="flex gap-1">{renderStars(product.average_rating)}</div>
//               <span className="text-gray-600 font-medium">
//                 {product.average_rating}
//               </span>
//               <span className="text-gray-500">{product.sold}+ sold</span>
//             </div>

//             {/* Price Section */}
//             <div className="bg-[#fdf2e9] p-4 rounded-xl space-y-2">
//               <div className="flex items-center gap-3">
//                 <p className="text-orange-600 font-bold text-4xl">
//                   ₦{formatNumber(product.price)}
//                 </p>

//                 {product.old_price && (
//                   <span className="bg-orange-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
//                     {discount}% OFF
//                   </span>
//                 )}
//               </div>

//               {product.old_price && (
//                 <p className="text-gray-500 line-through text-lg">
//                   ₦{formatNumber(product.old_price)}
//                 </p>
//               )}

//               <div className="flex items-center gap-3 text-sm mt-2">
//                 <span className="text-green-600 font-semibold">
//                   ✔ Free shipping
//                 </span>
//                 <span className="text-gray-600">|</span>
//                 <span className="text-green-600 font-semibold">
//                   ✔ ₦1,600 credit for delay
//                 </span>
//               </div>
//             </div>

//             {/* Description */}
//             {product.description && (
//               <p className="text-gray-700 leading-relaxed">
//                 {product.description}
//               </p>
//             )}

//             {/* Color Selection */}
//             {extractedColors.length > 0 && (
//               <div>
//                 <p className="font-medium mb-2 text-gray-800">
//                   Color: {selectedColor || "Select"}
//                 </p>

//                 <div className="flex gap-4 flex-wrap">
//                   {extractedColors.map((color, i) => {
//                     const variantImage = product.images.find(
//                       (img) => img.color === color
//                     )?.image;

//                     return (
//                       <button
//                         key={i}
//                         className={`border rounded-xl p-1 ${
//                           selectedColor === color
//                             ? "border-orange-500"
//                             : "border-gray-300"
//                         }`}
//                         onClick={() => {
//                           setSelectedColor(color);
//                           if (variantImage) setMainImage(variantImage);
//                         }}
//                       >
//                         <img
//                           src={variantImage}
//                           className="w-16 h-16 object-cover rounded-lg"
//                         />
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Quantity */}
//             <div className="flex items-center gap-4 mt-3">
//               <button
//                 onClick={() => setQty((q) => Math.max(1, q - 1))}
//                 className="border px-4 py-1 rounded text-lg"
//               >
//                 -
//               </button>

//               <span className="text-xl">{qty}</span>

//               <button
//                 onClick={() => setQty((q) => q + 1)}
//                 className="border px-4 py-1 rounded text-lg"
//               >
//                 +
//               </button>

//               {thisProductQty > 0 && (
//                 <span className="text-gray-700 font-semibold">
//                   In cart: {thisProductQty}
//                 </span>
//               )}
//             </div>

//             {/* Add to Cart */}
//             <button
//               onClick={handleAddToCart}
//               className="w-full bg-orange-500 text-white text-xl py-4 rounded-full font-semibold mt-4"
//             >
//               Select an option
//             </button>
//           </div>
//         </div>

//         {/* ---------------- REVIEWS ---------------- */}
//         <div className="mt-12 bg-white p-6 rounded-xl shadow">
//           <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>

//           {reviews.length === 0 ? (
//             <p>No reviews yet</p>
//           ) : (
//             reviews.map((r) => (
//               <div key={r.id} className="border-b py-3">
//                 <div className="font-bold">{r.user_name}</div>
//                 <div className="flex gap-1">{renderStars(r.rating)}</div>
//                 <p className="text-gray-700">{r.text}</p>
//               </div>
//             ))
//           )}
//         </div>

//         {/* ---------------- DEMO VIDEO (UNCHANGED BY REQUEST) ---------------- */}
//         {product.demo_video && (
//           <div className="bg-white rounded-lg shadow p-6 mt-10">
//             <h2 className="text-2xl font-bold mb-4">Product Video Demo</h2>
//             <video
//               controls
//               className="w-full max-h-[500px] object-contain rounded"
//             >
//               <source src={product.demo_video} type="video/mp4" />
//             </video>
//           </div>
//         )}

//         {/* ---------------- RELATED PRODUCTS ---------------- */}
//         {relatedProducts.length > 0 && (
//           <div className="mt-12">
//             <h2 className="text-xl font-bold mb-3">Related Products</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {relatedProducts.map((p) => (
//                 <ProductCard key={p.id} product={p} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </StoreLayout>
//   );
// };









// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
// import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
// import { useCart } from "../context/CartContext";
// import { ProductCard } from "./ProductCard";
// import { StoreLayout } from "../layouts/StoreLayout";

// export const ProductPage = () => {
//   const { id, slug } = useParams();
//   const productIdentifier = id || slug;

//   const navigate = useNavigate();
//   const { addToCart, cartItems } = useCart();

//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [qty, setQty] = useState(1);

//   const [mainImage, setMainImage] = useState("");
//   const [imageIndex, setImageIndex] = useState(0);

//   const [selectedColor, setSelectedColor] = useState(null);

//   const BASE_URL = "http://127.0.0.1:8000/store";

//   // Fetch product + reviews + categories
//   useEffect(() => {
//     if (!productIdentifier) return;

//     axios
//       .get(`${BASE_URL}/products/${productIdentifier}/`)
//       .then((res) => {
//         const product = res.data;

//         setProduct(product);

//         // Safe default image
//         const firstImage = product.images?.[0]?.image || "";
//         setMainImage(firstImage);
//         setImageIndex(0);

//         // Related products
//         if (product.category?.id) {
//           axios
//             .get(
//               `${BASE_URL}/products/?category=${product.category.id}&exclude=${product.id}`
//             )
//             .then((r) => setRelatedProducts(r.data))
//             .catch(console.error);
//         }
//       })
//       .catch(() => setProduct(null));

//     axios
//       .get(`${BASE_URL}/products/${productIdentifier}/reviews/`)
//       .then((res) =>
//         setReviews(res.data.sort((a, b) => new Date(b.date) - new Date(a.date)))
//       );

//     axios.get(`${BASE_URL}/categories/`).then((res) => setCategories(res.data));
//   }, [productIdentifier]);

//   if (!product) return <p className="text-center py-20">Loading...</p>;

//   const formatNumber = (num) =>
//     new Intl.NumberFormat("en-NG", {
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(num);

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       if (i <= Math.floor(rating))
//         stars.push(<FaStar key={i} className="text-yellow-400" />);
//       else if (i - rating < 1)
//         stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
//       else stars.push(<FaRegStar key={i} className="text-gray-300" />);
//     }
//     return stars;
//   };

//   // Extract available colors from images
//   const extractedColors = [
//     ...new Set(product.images?.filter((img) => img.color).map((img) => img.color)),
//   ];

//   // Filter thumbnails by selected color
//   const thumbnails = selectedColor
//     ? product.images?.filter((img) => img.color === selectedColor)
//     : product.images || [];

//   // Handle next/previous image
//   const handleNext = () => {
//     if (!thumbnails.length) return;
//     const next = (imageIndex + 1) % thumbnails.length;
//     setImageIndex(next);
//     setMainImage(thumbnails[next].image);
//   };

//   const handlePrev = () => {
//     if (!thumbnails.length) return;
//     const prev = (imageIndex - 1 + thumbnails.length) % thumbnails.length;
//     setImageIndex(prev);
//     setMainImage(thumbnails[prev].image);
//   };

//   // Add to cart
//   const handleAddToCart = () => {
//     addToCart(
//       {
//         id: product.id,
//         title: product.title,
//         cleaned_price: Number(product.price),
//         formatted_price: "₦" + formatNumber(product.price),
//         image: mainImage,
//         color: selectedColor,
//       },
//       qty
//     );
//     navigate("/cart");
//   };

//   const thisProductQty =
//     cartItems.find((item) => item.id === product.id)?.quantity || 0;

//   const discount =
//     product.old_price &&
//     Math.round(((product.old_price - product.price) / product.old_price) * 100);

//   return (
//     <StoreLayout
//       searchValue={searchValue}
//       setSearchValue={setSearchValue}
//       categories={categories}
//       cartCount={cartItems.length}
//       logo="/logo.png"
//     >
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-10">
//           {/* LEFT GALLERY */}
//           <div className="flex gap-4 lg:w-1/2">
//             {/* Thumbnails */}
//             {/* <div className="flex flex-col gap-3">
//               {thumbnails.map((img, i) => (
//                 <div
//                   key={i}
//                   className={`relative w-20 h-20 border rounded-xl overflow-hidden cursor-pointer ${
//                     mainImage === img.image
//                       ? "border-orange-500"
//                       : "border-gray-300"
//                   }`}
//                   onClick={() => {
//                     setMainImage(img.image);
//                     setImageIndex(i);
//                   }}
//                 >
//                   <img
//                     src={img.image}
//                     className="w-full h-full object-cover rounded-lg"
//                     alt=""
//                   />
//                 </div>
//               ))}
//             </div> */}

//             <div className="flex lg:flex-col gap-3 overflow-x-auto max-w-full">
//   {thumbnails.map((img, i) => (
//     <div
//       key={i}
//       className={`relative w-20 h-20 border rounded-xl overflow-hidden cursor-pointer ${
//         mainImage === img.image ? "border-orange-500" : "border-gray-300"
//       }`}
//       onClick={() => {
//         setMainImage(img.image);
//         setImageIndex(i);
//       }}
//     >
//       <img
//         src={img.image}
//         className="w-full h-full object-cover rounded-lg"
//         alt=""
//       />
//     </div>
//   ))}
// </div>

//             {/* Main Image */}
//             <div className="flex-1 relative">
//               <img
//                 src={mainImage}
//                 className="w-full rounded-xl object-contain max-h-[550px]"
//                 alt=""
//               />

//               {/* Prev / Next Buttons */}
//               <button
//                 onClick={handlePrev}
//                 className="absolute left-2 top-1/2 bg-white shadow rounded-full p-2 -translate-y-1/2"
//               >
//                 <HiChevronLeft className="text-2xl" />
//               </button>

//               <button
//                 onClick={handleNext}
//                 className="absolute right-2 top-1/2 bg-white shadow rounded-full p-2 -translate-y-1/2"
//               >
//                 <HiChevronRight className="text-2xl" />
//               </button>
//             </div>
//           </div>

//           {/* RIGHT INFO */}
//           <div className="lg:w-1/2 space-y-6">
//             <h1 className="text-[26px] font-semibold leading-snug">
//               {product.title}
//             </h1>

//             <div className="flex items-center gap-4">
//               <div className="flex gap-1">
//                 {renderStars(product.average_rating)}
//               </div>
//               <span className="text-gray-600 font-medium">
//                 {product.average_rating}
//               </span>
//               <span className="text-gray-500">{product.sold}+ sold</span>
//             </div>

//             {/* PRICE */}
//             <div className="bg-[#fdf2e9] p-4 rounded-xl space-y-2">
//               <div className="flex items-center gap-3">
//                 <p className="text-orange-600 font-bold text-4xl">
//                   ₦{formatNumber(product.price)}
//                 </p>

//                 {product.old_price && (
//                   <span className="bg-orange-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
//                     {discount}% OFF
//                   </span>
//                 )}
//               </div>

//               {product.old_price && (
//                 <p className="text-gray-500 line-through text-lg">
//                   ₦{formatNumber(product.old_price)}
//                 </p>
//               )}
//             </div>

//             {/* DESCRIPTION */}
//             {product.description && (
//               <p className="text-gray-700 leading-relaxed">
//                 {product.description}
//               </p>
//             )}

//             {/* COLOR OPTIONS */}
//             {extractedColors.length > 0 && (
//               <div>
//                 <p className="font-medium mb-2 text-gray-800">
//                   Color: {selectedColor || "Select"}
//                 </p>

//                 <div className="flex gap-4 flex-wrap">
//                   {extractedColors.map((color, i) => {
//                     const variantImage = product.images.find(
//                       (img) => img.color === color
//                     )?.image;

//                     return (
//                       <button
//                         key={i}
//                         className={`border rounded-xl p-1 ${
//                           selectedColor === color
//                             ? "border-orange-500"
//                             : "border-gray-300"
//                         }`}
//                         onClick={() => {
//                           setSelectedColor(color);

//                           const newThumbs = product.images.filter(
//                             (img) => img.color === color
//                           );

//                           if (newThumbs.length > 0) {
//                             setMainImage(newThumbs[0].image);
//                             setImageIndex(0);
//                           }
//                         }}
//                       >
//                         <img
//                           src={variantImage}
//                           className="w-16 h-16 object-cover rounded-lg"
//                           alt=""
//                         />
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* QUANTITY */}
//             <div className="flex items-center gap-4 mt-3">
//               <button
//                 onClick={() => setQty((q) => Math.max(1, q - 1))}
//                 className="border px-4 py-1 rounded text-lg"
//               >
//                 -
//               </button>

//               <span className="text-xl">{qty}</span>

//               <button
//                 onClick={() => setQty((q) => q + 1)}
//                 className="border px-4 py-1 rounded text-lg"
//               >
//                 +
//               </button>

//               {thisProductQty > 0 && (
//                 <span className="text-gray-700 font-semibold">
//                   In cart: {thisProductQty}
//                 </span>
//               )}
//             </div>

//             {/* ADD TO CART */}
//             <button
//               onClick={handleAddToCart}
//               className="w-full bg-orange-500 text-white text-xl py-4 rounded-full font-semibold mt-4"
//             >
//               Select an option
//             </button>
//           </div>
//         </div>

//         {/* REVIEWS */}
//         <div className="mt-12 bg-white p-6 rounded-xl shadow">
//           <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>

//           {reviews.length === 0 ? (
//             <p>No reviews yet</p>
//           ) : (
//             reviews.map((r) => (
//               <div key={r.id} className="border-b py-3">
//                 <div className="font-bold">{r.user_name}</div>
//                 <div className="flex gap-1">{renderStars(r.rating)}</div>
//                 <p className="text-gray-700">{r.text}</p>
//               </div>
//             ))
//           )}
//         </div>

//         {/* DEMO VIDEO */}
//         {product.demo_video && (
//           <div className="bg-white rounded-lg shadow p-6 mt-10">
//             <h2 className="text-2xl font-bold mb-4">Product Video Demo</h2>
//             <video controls className="w-full max-h-[500px] object-contain rounded">
//               <source src={product.demo_video} type="video/mp4" />
//             </video>
//           </div>
//         )}

//         {/* RELATED PRODUCTS */}
//         {relatedProducts.length > 0 && (
//           <div className="mt-12">
//             <h2 className="text-xl font-bold mb-3">Related Products</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {relatedProducts.map((p) => (
//                 <ProductCard key={p.id} product={p} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </StoreLayout>
//   );
// };











// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
// import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
// import { useCart } from "../context/CartContext";
// import { ProductCard } from "./ProductCard";
// import { StoreLayout } from "../layouts/StoreLayout";

// export const ProductPage = () => {
//   const { id, slug } = useParams();
//   const productIdentifier = id || slug;

//   const navigate = useNavigate();
//   const { addToCart, cartItems } = useCart();

//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [qty, setQty] = useState(1);

//   const [mainImage, setMainImage] = useState("");
//   const [imageIndex, setImageIndex] = useState(0);

//   const [selectedColor, setSelectedColor] = useState(null);
//   const [selectedVariant, setSelectedVariant] = useState(null);

//   const BASE_URL = "http://127.0.0.1:8000/store";

//   useEffect(() => {
//     if (!productIdentifier) return;

//     axios
//       .get(`${BASE_URL}/products/${productIdentifier}/`)
//       .then((res) => {
//         const product = res.data;
//         setProduct(product);

//         // Default variant selection
//         const defaultVariant = product.variants?.[0] || null;
//         if (defaultVariant) {
//           setSelectedColor(defaultVariant.color);
//           setSelectedVariant(defaultVariant);
//           setMainImage(
//             product.images?.find((img) => img.color === defaultVariant.color)
//               ?.image || ""
//           );
//         } else {
//           // fallback
//           setMainImage(product.images?.[0]?.image || "");
//         }

//         // Related products
//         if (product.category?.id) {
//           axios
//             .get(
//               `${BASE_URL}/products/?category=${product.category.id}&exclude=${product.id}`
//             )
//             .then((r) => setRelatedProducts(r.data))
//             .catch(console.error);
//         }
//       })
//       .catch(() => setProduct(null));

//     axios
//       .get(`${BASE_URL}/products/${productIdentifier}/reviews/`)
//       .then((res) =>
//         setReviews(res.data.sort((a, b) => new Date(b.date) - new Date(a.date)))
//       );

//     axios.get(`${BASE_URL}/categories/`).then((res) => setCategories(res.data));
//   }, [productIdentifier]);

//   if (!product) return <p className="text-center py-20">Loading...</p>;

//   const formatNumber = (num) =>
//     new Intl.NumberFormat("en-NG", {
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(num);

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       if (i <= Math.floor(rating))
//         stars.push(<FaStar key={i} className="text-yellow-400" />);
//       else if (i - rating < 1)
//         stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
//       else stars.push(<FaRegStar key={i} className="text-gray-300" />);
//     }
//     return stars;
//   };

//   const extractedColors = [
//     ...new Set(product.images?.filter((img) => img.color).map((img) => img.color)),
//   ];

//   const thumbnails = selectedColor
//     ? product.images?.filter((img) => img.color === selectedColor)
//     : product.images || [];

//   const handleNext = () => {
//     if (!thumbnails.length) return;
//     const next = (imageIndex + 1) % thumbnails.length;
//     setImageIndex(next);
//     setMainImage(thumbnails[next].image);
//   };

//   const handlePrev = () => {
//     if (!thumbnails.length) return;
//     const prev = (imageIndex - 1 + thumbnails.length) % thumbnails.length;
//     setImageIndex(prev);
//     setMainImage(thumbnails[prev].image);
//   };

//   const handleAddToCart = () => {
//     if (!selectedVariant) {
//       alert("Please select a color first");
//       return;
//     }

//     addToCart(
//       {
//         id: product.id,
//         title: product.title,
//         cleaned_price: Number(selectedVariant.price),
//         formatted_price: "₦" + formatNumber(selectedVariant.price),
//         image: mainImage,
//         color: selectedColor,
//         variant_id: selectedVariant.id,
//       },
//       qty
//     );
//     navigate("/cart");
//   };

//   const thisProductQty =
//     cartItems.find(
//       (item) => item.id === product.id && item.variant_id === selectedVariant?.id
//     )?.quantity || 0;

//   const discount =
//     selectedVariant?.old_price &&
//     Math.round(
//       ((selectedVariant.old_price - selectedVariant.price) /
//         selectedVariant.old_price) *
//         100
//     );

//   return (
//     <StoreLayout
//       searchValue={searchValue}
//       setSearchValue={setSearchValue}
//       categories={categories}
//       cartCount={cartItems.length}
//       logo="/logo.png"
//     >
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-10">
//           {/* LEFT GALLERY */}
//           <div className="flex gap-4 lg:w-1/2">
//             <div className="flex lg:flex-col gap-3 overflow-x-auto max-w-full">
//               {thumbnails.map((img, i) => (
//                 <div
//                   key={i}
//                   className={`relative w-20 h-20 border rounded-xl overflow-hidden cursor-pointer ${
//                     mainImage === img.image ? "border-orange-500" : "border-gray-300"
//                   }`}
//                   onClick={() => {
//                     setMainImage(img.image);
//                     setImageIndex(i);
//                   }}
//                 >
//                   <img
//                     src={img.image}
//                     className="w-full h-full object-cover rounded-lg"
//                     alt=""
//                   />
//                 </div>
//               ))}
//             </div>

//             <div className="flex-1 relative">
//               <img
//                 src={mainImage}
//                 className="w-full rounded-xl object-contain max-h-[550px]"
//                 alt=""
//               />

//               <button
//                 onClick={handlePrev}
//                 className="absolute left-2 top-1/2 bg-white shadow rounded-full p-2 -translate-y-1/2"
//               >
//                 <HiChevronLeft className="text-2xl" />
//               </button>

//               <button
//                 onClick={handleNext}
//                 className="absolute right-2 top-1/2 bg-white shadow rounded-full p-2 -translate-y-1/2"
//               >
//                 <HiChevronRight className="text-2xl" />
//               </button>
//             </div>
//           </div>

//           {/* RIGHT INFO */}
//           <div className="lg:w-1/2 space-y-6">
//             <h1 className="text-[26px] font-semibold leading-snug">{product.title}</h1>

//             <div className="flex items-center gap-4">
//               <div className="flex gap-1">{renderStars(product.average_rating)}</div>
//               <span className="text-gray-600 font-medium">{product.average_rating}</span>
//               <span className="text-gray-500">{product.sold}+ sold</span>
//             </div>

//             {/* PRICE */}
//             <div className="bg-[#fdf2e9] p-4 rounded-xl space-y-2">
//               <div className="flex items-center gap-3">
//                 <p className="text-orange-600 font-bold text-4xl">
//                   ₦{formatNumber(selectedVariant?.price || product.price)}
//                 </p>
//                 {discount && (
//                   <span className="bg-orange-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
//                     {discount}% OFF
//                   </span>
//                 )}
//               </div>
//               {selectedVariant?.old_price && (
//                 <p className="text-gray-500 line-through text-lg">
//                   ₦{formatNumber(selectedVariant.old_price)}
//                 </p>
//               )}
//             </div>

//             {product.description && (
//               <p className="text-gray-700 leading-relaxed">{product.description}</p>
//             )}

//             {/* COLOR OPTIONS */}
//             {extractedColors.length > 0 && (
//               <div>
//                 <p className="font-medium mb-2 text-gray-800">
//                   Color: {selectedColor || "Select"}
//                 </p>
//                 <div className="flex gap-4 flex-wrap">
//                   {extractedColors.map((color, i) => {
//                     const variant = product.variants.find((v) => v.color === color);
//                     const variantImage = product.images.find((img) => img.color === color)?.image;

//                     return (
//                       <button
//                         key={i}
//                         className={`border rounded-xl p-1 ${
//                           selectedColor === color ? "border-orange-500" : "border-gray-300"
//                         }`}
//                         onClick={() => {
//                           setSelectedColor(color);
//                           setSelectedVariant(variant);
//                           const newThumbs = product.images.filter((img) => img.color === color);
//                           if (newThumbs.length > 0) {
//                             setMainImage(newThumbs[0].image);
//                             setImageIndex(0);
//                           }
//                         }}
//                       >
//                         <img
//                           src={variantImage}
//                           className="w-16 h-16 object-cover rounded-lg"
//                           alt=""
//                         />
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* QUANTITY */}
//             <div className="flex items-center gap-4 mt-3">
//               <button
//                 onClick={() => setQty((q) => Math.max(1, q - 1))}
//                 className="border px-4 py-1 rounded text-lg"
//               >
//                 -
//               </button>
//               <span className="text-xl">{qty}</span>
//               <button
//                 onClick={() => setQty((q) => q + 1)}
//                 className="border px-4 py-1 rounded text-lg"
//               >
//                 +
//               </button>
//               {thisProductQty > 0 && (
//                 <span className="text-gray-700 font-semibold">In cart: {thisProductQty}</span>
//               )}
//             </div>

//             {/* ADD TO CART */}
//             <button
//               onClick={handleAddToCart}
//               className="w-full bg-orange-500 text-white text-xl py-4 rounded-full font-semibold mt-4"
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>

//         {/* REVIEWS */}
//         <div className="mt-12 bg-white p-6 rounded-xl shadow">
//           <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
//           {reviews.length === 0 ? (
//             <p>No reviews yet</p>
//           ) : (
//             reviews.map((r) => (
//               <div key={r.id} className="border-b py-3">
//                 <div className="font-bold">{r.user_name}</div>
//                 <div className="flex gap-1">{renderStars(r.rating)}</div>
//                 <p className="text-gray-700">{r.text}</p>
//               </div>
//             ))
//           )}
//         </div>

//         {/* DEMO VIDEO */}
//         {product.demo_video && (
//           <div className="bg-white rounded-lg shadow p-6 mt-10">
//             <h2 className="text-2xl font-bold mb-4">Product Video Demo</h2>
//             <video controls className="w-full max-h-[500px] object-contain rounded">
//               <source src={product.demo_video} type="video/mp4" />
//             </video>
//           </div>
//         )}

//         {/* RELATED PRODUCTS */}
//         {relatedProducts.length > 0 && (
//           <div className="mt-12">
//             <h2 className="text-xl font-bold mb-3">Related Products</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {relatedProducts.map((p) => (
//                 <ProductCard key={p.id} product={p} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </StoreLayout>
//   );
// };














// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
// import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
// import { useCart } from "../context/CartContext";
// import { ProductCard } from "./ProductCard";
// import { StoreLayout } from "../layouts/StoreLayout";

// export const ProductPage = () => {
//   const { id, slug } = useParams();
//   const productIdentifier = id || slug;

//   const navigate = useNavigate();
//   const { addToCart, cartItems } = useCart();

//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [qty, setQty] = useState(1);

//   const [mainImage, setMainImage] = useState("");
//   const [imageIndex, setImageIndex] = useState(0);

//   const [selectedColor, setSelectedColor] = useState(null);
//   const [selectedVariant, setSelectedVariant] = useState(null);

//   const BASE_URL = "http://127.0.0.1:8000/store";

//   useEffect(() => {
//     if (!productIdentifier) return;

//     // Fetch product details
//     axios
//       .get(`${BASE_URL}/products/${productIdentifier}/`)
//       .then((res) => {
//         const productData = res.data;
//         setProduct(productData);

//         // Default variant
//         const defaultVariant = productData.variants?.[0] || null;
//         if (defaultVariant) {
//           setSelectedColor(defaultVariant.color);
//           setSelectedVariant(defaultVariant);

//           const defaultImage =
//             productData.images?.find((img) => img.color === defaultVariant.color)
//               ?.image || productData.images?.[0]?.image || "";
//           setMainImage(defaultImage);
//         } else {
//           setMainImage(productData.images?.[0]?.image || "");
//         }

//         // Fetch related products
//         if (productData.category?.id) {
//           axios
//             .get(
//               `${BASE_URL}/products/?category=${productData.category.id}&exclude=${productData.id}`
//             )
//             .then((r) => setRelatedProducts(r.data))
//             .catch(console.error);
//         }
//       })
//       .catch(() => setProduct(null));

//     // Fetch reviews
//     axios
//       .get(`${BASE_URL}/products/${productIdentifier}/reviews/`)
//       .then((res) =>
//         setReviews(res.data.sort((a, b) => new Date(b.date) - new Date(a.date)))
//       )
//       .catch(console.error);

//     // Fetch categories
//     axios
//       .get(`${BASE_URL}/categories/`)
//       .then((res) => setCategories(res.data))
//       .catch(console.error);
//   }, [productIdentifier]);

//   if (!product) return <p className="text-center py-20">Loading...</p>;

//   const formatNumber = (num) =>
//     new Intl.NumberFormat("en-NG", {
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(num);

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       if (i <= Math.floor(rating))
//         stars.push(<FaStar key={i} className="text-yellow-400" />);
//       else if (i - rating < 1)
//         stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
//       else stars.push(<FaRegStar key={i} className="text-gray-300" />);
//     }
//     return stars;
//   };

//   const extractedColors = [
//     ...new Set(
//       product.images?.filter((img) => img.color).map((img) => img.color) || []
//     ),
//   ];

//   const thumbnails = selectedColor
//     ? product.images?.filter((img) => img.color === selectedColor)
//     : product.images || [];

//   const handleNext = () => {
//     if (!thumbnails.length) return;
//     const next = (imageIndex + 1) % thumbnails.length;
//     setImageIndex(next);
//     setMainImage(thumbnails[next].image);
//   };

//   const handlePrev = () => {
//     if (!thumbnails.length) return;
//     const prev = (imageIndex - 1 + thumbnails.length) % thumbnails.length;
//     setImageIndex(prev);
//     setMainImage(thumbnails[prev].image);
//   };

//   const handleAddToCart = () => {
//     if (!selectedVariant) {
//       alert("Please select a variant/color first");
//       return;
//     }

//     addToCart(
//       {
//         id: product.id,
//         title: product.title,
//         cleaned_price: Number(selectedVariant.price),
//         formatted_price: "₦" + formatNumber(selectedVariant.price),
//         image: mainImage,
//         color: selectedColor,
//         variant_id: selectedVariant.id,
//       },
//       qty
//     );
//     navigate("/cart");
//   };

//   const thisProductQty =
//     cartItems.find(
//       (item) => item.id === product.id && item.variant_id === selectedVariant?.id
//     )?.quantity || 0;

//   const discount =
//     selectedVariant?.old_price &&
//     Math.round(
//       ((selectedVariant.old_price - selectedVariant.price) /
//         selectedVariant.old_price) *
//         100
//     );

//   return (
//     <StoreLayout
//       searchValue={searchValue}
//       setSearchValue={setSearchValue}
//       categories={categories}
//       cartCount={cartItems.length}
//       logo="/logo.png"
//     >
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-10">
//           {/* LEFT GALLERY */}
//           <div className="flex gap-4 lg:w-1/2">
//             <div className="flex lg:flex-col gap-3 overflow-x-auto max-w-full">
//               {thumbnails.map((img, i) => (
//                 <div
//                   key={i}
//                   className={`relative w-20 h-20 border rounded-xl overflow-hidden cursor-pointer ${
//                     mainImage === img.image ? "border-orange-500" : "border-gray-300"
//                   }`}
//                   onClick={() => {
//                     setMainImage(img.image);
//                     setImageIndex(i);
//                   }}
//                 >
//                   <img
//                     src={img.image}
//                     className="w-full h-full object-cover rounded-lg"
//                     alt=""
//                   />
//                 </div>
//               ))}
//             </div>

//             <div className="flex-1 relative">
//               <img
//                 src={mainImage}
//                 className="w-full rounded-xl object-contain max-h-[550px]"
//                 alt=""
//               />

//               <button
//                 onClick={handlePrev}
//                 className="absolute left-2 top-1/2 bg-white shadow rounded-full p-2 -translate-y-1/2"
//               >
//                 <HiChevronLeft className="text-2xl" />
//               </button>

//               <button
//                 onClick={handleNext}
//                 className="absolute right-2 top-1/2 bg-white shadow rounded-full p-2 -translate-y-1/2"
//               >
//                 <HiChevronRight className="text-2xl" />
//               </button>
//             </div>
//           </div>

//           {/* RIGHT INFO */}
//           <div className="lg:w-1/2 space-y-6">
//             <h1 className="text-[26px] font-semibold leading-snug">{product.title}</h1>

//             <div className="flex items-center gap-4">
//               <div className="flex gap-1">{renderStars(product.average_rating)}</div>
//               <span className="text-gray-600 font-medium">{product.average_rating}</span>
//               <span className="text-gray-500">{product.sold}+ sold</span>
//             </div>

//             {/* PRICE */}
//             <div className="bg-[#fdf2e9] p-4 rounded-xl space-y-2">
//               <div className="flex items-center gap-3">
//                 <p className="text-orange-600 font-bold text-4xl">
//                   ₦{formatNumber(selectedVariant?.price || product.price)}
//                 </p>
//                 {discount && (
//                   <span className="bg-orange-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
//                     {discount}% OFF
//                   </span>
//                 )}
//               </div>
//               {selectedVariant?.old_price && (
//                 <p className="text-gray-500 line-through text-lg">
//                   ₦{formatNumber(selectedVariant.old_price)}
//                 </p>
//               )}
//             </div>

//             {product.description && (
//               <p className="text-gray-700 leading-relaxed">{product.description}</p>
//             )}

//             {/* COLOR OPTIONS */}
//             {extractedColors.length > 0 && (
//               <div>
//                 <p className="font-medium mb-2 text-gray-800">
//                   Color: {selectedColor || "Select"}
//                 </p>
//                 <div className="flex gap-4 flex-wrap">
//                   {extractedColors.map((color, i) => {
//                     const variant = product.variants.find((v) => v.color === color);
//                     const variantImage = product.images.find(
//                       (img) => img.color === color
//                     )?.image;

//                     return (
//                       <button
//                         key={i}
//                         className={`border rounded-xl p-1 ${
//                           selectedColor === color ? "border-orange-500" : "border-gray-300"
//                         }`}
//                         onClick={() => {
//                           setSelectedColor(color);
//                           setSelectedVariant(variant);
//                           const newThumbs = product.images.filter(
//                             (img) => img.color === color
//                           );
//                           if (newThumbs.length > 0) {
//                             setMainImage(newThumbs[0].image);
//                             setImageIndex(0);
//                           }
//                         }}
//                       >
//                         <img
//                           src={variantImage}
//                           className="w-16 h-16 object-cover rounded-lg"
//                           alt=""
//                         />
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* QUANTITY */}
//             <div className="flex items-center gap-4 mt-3">
//               <button
//                 onClick={() => setQty((q) => Math.max(1, q - 1))}
//                 className="border px-4 py-1 rounded text-lg"
//               >
//                 -
//               </button>
//               <span className="text-xl">{qty}</span>
//               <button
//                 onClick={() => setQty((q) => q + 1)}
//                 className="border px-4 py-1 rounded text-lg"
//               >
//                 +
//               </button>
//               {thisProductQty > 0 && (
//                 <span className="text-gray-700 font-semibold">
//                   In cart: {thisProductQty}
//                 </span>
//               )}
//             </div>

//             {/* ADD TO CART */}
//             <button
//               onClick={handleAddToCart}
//               className="w-full bg-orange-500 text-white text-xl py-4 rounded-full font-semibold mt-4"
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>

//         {/* REVIEWS */}
//         <div className="mt-12 bg-white p-6 rounded-xl shadow">
//           <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
//           {reviews.length === 0 ? (
//             <p>No reviews yet</p>
//           ) : (
//             reviews.map((r) => (
//               <div key={r.id} className="border-b py-3">
//                 <div className="font-bold">{r.user_name}</div>
//                 <div className="flex gap-1">{renderStars(r.rating)}</div>
//                 <p className="text-gray-700">{r.text}</p>
//               </div>
//             ))
//           )}
//         </div>

//         {/* DEMO VIDEO */}
//         {product.demo_video && (
//           <div className="bg-white rounded-lg shadow p-6 mt-10">
//             <h2 className="text-2xl font-bold mb-4">Product Video Demo</h2>
//             <video controls className="w-full max-h-[500px] object-contain rounded">
//               <source src={product.demo_video} type="video/mp4" />
//             </video>
//           </div>
//         )}

//         {/* RELATED PRODUCTS */}
//         {relatedProducts.length > 0 && (
//           <div className="mt-12">
//             <h2 className="text-xl font-bold mb-3">Related Products</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {relatedProducts.map((p) => (
//                 <ProductCard key={p.id} product={p} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </StoreLayout>
//   );
// };















// import React, { useEffect, useState, useMemo } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
// import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
// import { useCart } from "../context/CartContext";
// import { ProductCard } from "./ProductCard";
// import { StoreLayout } from "../layouts/StoreLayout";

// export const ProductPage = () => {
//   const { id, slug } = useParams();
//   const productIdentifier = id || slug;
//   const navigate = useNavigate();
//   const { addToCart, cartItems } = useCart();

//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [qty, setQty] = useState(1);
//   const [mainImage, setMainImage] = useState("");
//   const [imageIndex, setImageIndex] = useState(0);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [selectedVariant, setSelectedVariant] = useState(null);

//   const BASE_URL = "http://127.0.0.1:8000/store";

//   // --- FETCH PRODUCT ---
//   useEffect(() => {
//     if (!productIdentifier) return;

//     axios
//       .get(`${BASE_URL}/products/${productIdentifier}/`)
//       .then((res) => {
//         const productData = res.data;
//         setProduct(productData);

//         // Default variant
//         const defaultVariant = productData.variants?.[0] || null;
//         if (defaultVariant) {
//           setSelectedColor(defaultVariant.color);
//           setSelectedVariant(defaultVariant);
//           const defaultImage =
//             productData.images?.find((img) => img.color === defaultVariant.color)
//               ?.image || productData.images?.[0]?.image || "";
//           setMainImage(defaultImage);
//           setImageIndex(productData.images.findIndex((img) => img.image === defaultImage));
//         } else {
//           setMainImage(productData.images?.[0]?.image || "");
//           setImageIndex(0);
//         }

//         // Fetch related products
//         if (productData.category?.id) {
//           axios
//             .get(
//               `${BASE_URL}/products/?category=${productData.category.id}&exclude=${productData.id}`
//             )
//             .then((r) => setRelatedProducts(r.data))
//             .catch(console.error);
//         }
//       })
//       .catch(() => setProduct(null));

//     // Reviews
//     axios
//       .get(`${BASE_URL}/products/${productIdentifier}/reviews/`)
//       .then((res) =>
//         setReviews(res.data.sort((a, b) => new Date(b.date) - new Date(a.date)))
//       )
//       .catch(console.error);

//     // Categories
//     axios
//       .get(`${BASE_URL}/categories/`)
//       .then((res) => setCategories(res.data))
//       .catch(console.error);
//   }, [productIdentifier]);

//   // --- COMPUTED VALUES ---
//   const extractedColors = useMemo(
//     () =>
//       product
//         ? [
//             ...new Set(product.images?.filter((img) => img.color).map((img) => img.color)),
//           ]
//         : [],
//     [product]
//   );

//   // **LEFT GALLERY always uses all images**
//   const galleryThumbnails = useMemo(() => product?.images || [], [product]);

//   // Variant buttons below description only change main image & selected variant
//   const handleVariantSelect = (variant) => {
//     setSelectedVariant(variant);
//     setSelectedColor(variant.color);

//     // Update main image to first image of this variant
//     const variantImage = product.images.find((img) => img.color === variant.color);
//     if (variantImage) {
//       setMainImage(variantImage.image);
//       const idx = galleryThumbnails.findIndex((img) => img.image === variantImage.image);
//       setImageIndex(idx >= 0 ? idx : 0);
//     }
//   };

//   const thisProductQty = useMemo(() => {
//     if (!selectedVariant) return 0;
//     return (
//       cartItems.find(
//         (item) => item.id === product?.id && item.variant_id === selectedVariant?.id
//       )?.quantity || 0
//     );
//   }, [cartItems, product, selectedVariant]);

//   const discount = useMemo(() => {
//     if (!selectedVariant?.old_price) return 0;
//     return Math.round(
//       ((selectedVariant.old_price - selectedVariant.price) / selectedVariant.old_price) * 100
//     );
//   }, [selectedVariant]);

//   if (!product) return <p className="text-center py-20">Loading...</p>;

//   // --- HELPER FUNCTIONS ---
//   const formatNumber = (num) =>
//     new Intl.NumberFormat("en-NG", {
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(num);

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       if (i <= Math.floor(rating)) stars.push(<FaStar key={i} className="text-yellow-400" />);
//       else if (i - rating < 1)
//         stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
//       else stars.push(<FaRegStar key={i} className="text-gray-300" />);
//     }
//     return stars;
//   };

//   const handleNext = () => {
//     if (!galleryThumbnails.length) return;
//     const next = (imageIndex + 1) % galleryThumbnails.length;
//     setImageIndex(next);
//     setMainImage(galleryThumbnails[next].image);
//   };

//   const handlePrev = () => {
//     if (!galleryThumbnails.length) return;
//     const prev = (imageIndex - 1 + galleryThumbnails.length) % galleryThumbnails.length;
//     setImageIndex(prev);
//     setMainImage(galleryThumbnails[prev].image);
//   };

//   const handleAddToCart = () => {
//     if (!selectedVariant) {
//       alert("Please select a variant/color first");
//       return;
//     }
//     addToCart(
//       {
//         id: product.id,
//         title: product.title,
//         cleaned_price: Number(selectedVariant.price),
//         formatted_price: "₦" + formatNumber(selectedVariant.price),
//         image: mainImage,
//         color: selectedColor,
//         variant_id: selectedVariant.id,
//       },
//       qty
//     );
//     navigate("/cart");
//   };

//   // --- RENDER ---
//   return (
//     <StoreLayout
//       searchValue={searchValue}
//       setSearchValue={setSearchValue}
//       categories={categories}
//       cartCount={cartItems.length}
//       logo="/logo.png"
//     >
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-10">
//           {/* LEFT GALLERY */}
//           <div className="flex gap-4 lg:w-1/2">
//             <div className="flex lg:flex-col gap-3 overflow-x-auto max-w-full">
//               {galleryThumbnails.map((img, i) => (
//                 <div
//                   key={i}
//                   className={`relative w-20 h-20 border rounded-xl overflow-hidden cursor-pointer ${
//                     mainImage === img.image ? "border-orange-500" : "border-gray-300"
//                   }`}
//                   onClick={() => {
//                     setMainImage(img.image);
//                     setImageIndex(i);
//                   }}
//                 >
//                   <img
//                     src={img.image}
//                     className="w-full h-full object-cover rounded-lg"
//                     alt=""
//                   />
//                 </div>
//               ))}
//             </div>

//             <div className="flex-1 relative">
//               <img
//                 src={mainImage}
//                 className="w-full rounded-xl object-contain max-h-[550px]"
//                 alt=""
//               />
//               <button
//                 onClick={handlePrev}
//                 className="absolute left-2 top-1/2 bg-white shadow rounded-full p-2 -translate-y-1/2"
//               >
//                 <HiChevronLeft className="text-2xl" />
//               </button>
//               <button
//                 onClick={handleNext}
//                 className="absolute right-2 top-1/2 bg-white shadow rounded-full p-2 -translate-y-1/2"
//               >
//                 <HiChevronRight className="text-2xl" />
//               </button>
//             </div>
//           </div>

//           {/* RIGHT INFO */}
//           <div className="lg:w-1/2 space-y-6">
//             <h1 className="text-[26px] font-semibold leading-snug">{product.title}</h1>
//             <div className="flex items-center gap-4">
//               <div className="flex gap-1">{renderStars(product.average_rating)}</div>
//               <span className="text-gray-600 font-medium">{product.average_rating}</span>
//               <span className="text-gray-500">{product.sold}+ sold</span>
//             </div>

//             {/* PRICE */}
//             <div className="bg-[#fdf2e9] p-4 rounded-xl space-y-2">
//               <div className="flex items-center gap-3">
//                 <p className="text-orange-600 font-bold text-4xl">
//                   ₦{formatNumber(selectedVariant?.price || product.price)}
//                 </p>
//                 {discount > 0 && (
//                   <span className="bg-orange-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
//                     {discount}% OFF
//                   </span>
//                 )}
//               </div>
//               {selectedVariant?.old_price && (
//                 <p className="text-gray-500 line-through text-lg">
//                   ₦{formatNumber(selectedVariant.old_price)}
//                 </p>
//               )}
//             </div>

//             {product.description && (
//               <p className="text-gray-700 leading-relaxed">{product.description}</p>
//             )}

//             {/* COLOR OPTIONS */}
//             {extractedColors.length > 0 && (
//               <div>
//                 <p className="font-medium mb-2 text-gray-800">
//                   Color: {selectedColor || "Select"}
//                 </p>
//                 <div className="flex gap-4 flex-wrap">
//                   {product.variants.map((variant, i) => {
//                     const variantImage = product.images.find(
//                       (img) => img.color === variant.color
//                     )?.image;
//                     return (
//                       <button
//                         key={i}
//                         className={`border rounded-xl p-1 ${
//                           selectedVariant?.id === variant.id
//                             ? "border-orange-500"
//                             : "border-gray-300"
//                         }`}
//                         onClick={() => handleVariantSelect(variant)}
//                       >
//                         <img
//                           src={variantImage}
//                           className="w-16 h-16 object-cover rounded-lg"
//                           alt=""
//                         />
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* QUANTITY */}
//             <div className="flex items-center gap-4 mt-3">
//               <button
//                 onClick={() => setQty((q) => Math.max(1, q - 1))}
//                 className="border px-4 py-1 rounded text-lg"
//               >
//                 -
//               </button>
//               <span className="text-xl">{qty}</span>
//               <button
//                 onClick={() => setQty((q) => q + 1)}
//                 className="border px-4 py-1 rounded text-lg"
//               >
//                 +
//               </button>
//               {thisProductQty > 0 && (
//                 <span className="text-gray-700 font-semibold">
//                   In cart: {thisProductQty}
//                 </span>
//               )}
//             </div>

//             {/* ADD TO CART */}
//             <button
//               onClick={handleAddToCart}
//               className="w-full bg-orange-500 text-white text-xl py-4 rounded-full font-semibold mt-4"
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>

//         {/* REVIEWS */}
//         <div className="mt-12 bg-white p-6 rounded-xl shadow">
//           <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
//           {reviews.length === 0 ? (
//             <p>No reviews yet</p>
//           ) : (
//             reviews.map((r) => (
//               <div key={r.id} className="border-b py-3">
//                 <div className="font-bold">{r.user_name}</div>
//                 <div className="flex gap-1">{renderStars(r.rating)}</div>
//                 <p className="text-gray-700">{r.text}</p>
//               </div>
//             ))
//           )}
//         </div>

//         {/* DEMO VIDEO */}
//         {product.demo_video && (
//           <div className="bg-white rounded-lg shadow p-6 mt-10">
//             <h2 className="text-2xl font-bold mb-4">Product Video Demo</h2>
//             <video controls className="w-full max-h-[500px] object-contain rounded">
//               <source src={product.demo_video} type="video/mp4" />
//             </video>
//           </div>
//         )}

//         {/* RELATED PRODUCTS */}
//         {relatedProducts.length > 0 && (
//           <div className="mt-12">
//             <h2 className="text-xl font-bold mb-3">Related Products</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {relatedProducts.map((p) => (
//                 <ProductCard key={p.id} product={p} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </StoreLayout>
//   );
// };












// import React, { useEffect, useState, useMemo } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
// import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
// import { useCart } from "../context/CartContext";
// import { ProductCard } from "./ProductCard";
// import { StoreLayout } from "../layouts/StoreLayout";

// export const ProductPage = () => {
//   const { id, slug } = useParams();
//   const productIdentifier = id || slug;

//   const navigate = useNavigate();
//   const { addToCart, cartItems } = useCart();

//   // --- STATE ---
//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [qty, setQty] = useState(1);

//   const [mainImage, setMainImage] = useState("");
//   const [imageIndex, setImageIndex] = useState(0);

//   const [selectedColor, setSelectedColor] = useState(null);
//   const [selectedVariant, setSelectedVariant] = useState(null);

//   const BASE_URL = "http://127.0.0.1:8000/store";

//   // --- FETCH PRODUCT ---
//   useEffect(() => {
//     if (!productIdentifier) return;

//     axios
//       .get(`${BASE_URL}/products/${productIdentifier}/`)
//       .then((res) => {
//         const productData = res.data;
//         setProduct(productData);

//         // Default variant
//         const defaultVariant = productData.variants?.[0] || null;
//         if (defaultVariant) {
//           setSelectedColor(defaultVariant.color);
//           setSelectedVariant(defaultVariant);

//           const defaultImage =
//             productData.images?.find((img) => img.color === defaultVariant.color)
//               ?.image || productData.images?.[0]?.image || "";
//           setMainImage(defaultImage);
//           setImageIndex(
//             productData.images.findIndex((img) => img.image === defaultImage)
//           );
//         } else {
//           setMainImage(productData.images?.[0]?.image || "");
//           setImageIndex(0);
//         }

//         // Related products
//         if (productData.category?.id) {
//           axios
//             .get(
//               `${BASE_URL}/products/?category=${productData.category.id}&exclude=${productData.id}`
//             )
//             .then((r) => setRelatedProducts(r.data))
//             .catch(console.error);
//         }
//       })
//       .catch(() => setProduct(null));

//     // Reviews
//     axios
//       .get(`${BASE_URL}/products/${productIdentifier}/reviews/`)
//       .then((res) =>
//         setReviews(res.data.sort((a, b) => new Date(b.date) - new Date(a.date)))
//       )
//       .catch(console.error);

//     // Categories
//     axios
//       .get(`${BASE_URL}/categories/`)
//       .then((res) => setCategories(res.data))
//       .catch(console.error);
//   }, [productIdentifier]);

//   // --- HOOKS SAFE COMPUTED VALUES ---
//   const extractedColors = useMemo(
//     () =>
//       product
//         ? [
//             ...new Set(
//               product.images?.filter((img) => img.color).map((img) => img.color)
//             ),
//           ]
//         : [],
//     [product]
//   );

//   const thumbnails = useMemo(() => product?.images || [], [product]);

//   const thisProductQty = useMemo(() => {
//     if (!selectedVariant) return 0;
//     return (
//       cartItems.find(
//         (item) => item.id === product?.id && item.variant_id === selectedVariant?.id
//       )?.quantity || 0
//     );
//   }, [cartItems, product, selectedVariant]);

//   const discount = useMemo(() => {
//     if (!selectedVariant?.old_price) return 0;
//     return Math.round(
//       ((selectedVariant.old_price - selectedVariant.price) / selectedVariant.old_price) *
//         100
//     );
//   }, [selectedVariant]);

//   // if (!product) return <p className="text-center py-20">Loading...</p>;

//   // --- HELPER FUNCTIONS ---
//   const formatNumber = (num) =>
//     new Intl.NumberFormat("en-NG", {
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(num);

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       if (i <= Math.floor(rating))
//         stars.push(<FaStar key={i} className="text-yellow-400" />);
//       else if (i - rating < 1)
//         stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
//       else stars.push(<FaRegStar key={i} className="text-gray-300" />);
//     }
//     return stars;
//   };

//   const handleNext = () => {
//     if (!thumbnails.length) return;
//     const next = (imageIndex + 1) % thumbnails.length;
//     setImageIndex(next);
//     setMainImage(thumbnails[next].image);
//   };

//   const handlePrev = () => {
//     if (!thumbnails.length) return;
//     const prev = (imageIndex - 1 + thumbnails.length) % thumbnails.length;
//     setImageIndex(prev);
//     setMainImage(thumbnails[prev].image);
//   };

//   const handleAddToCart = () => {

//   let variantToUse = selectedVariant;

//   // If no variant selected but product has variants, use first one
//   if (!variantToUse && product.variants?.length > 0) {
//     variantToUse = product.variants[0];
//     setSelectedVariant(variantToUse);
//     setSelectedColor(variantToUse.color);
//   }

//   // Determine correct price
//   const priceToSend = Number(
//     variantToUse?.price ??
//     variantToUse?.cleaned_price ??
//     product.price ?? 0
//   );

//   addToCart(
//     {
//       id: product.id,
//       title: product.title,
//       price: priceToSend,
//       formatted_price: "₦" + formatNumber(priceToSend),
//       image: mainImage || product.images?.[0]?.image,
//       color: variantToUse?.color || null,
//       variant_id: variantToUse?.id || null,
//     },
//     qty
//   );

//   setTimeout(() => navigate("/cart"), 10);
// };

//   // --- RENDER ---
//   return (
//     <StoreLayout
//       searchValue={searchValue}
//       setSearchValue={setSearchValue}
//       categories={categories}
//       cartCount={cartItems.length}
//       logo="/logo.png"
//     >
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-10">
//           {/* LEFT GALLERY */}
//           <div className="flex gap-4 lg:w-1/2">
//             <div className="flex lg:flex-col gap-3 overflow-x-auto max-w-full">
//               {thumbnails.map((img, i) => (
//                 <div
//                   key={i}
//                   className={`relative w-20 h-20 border rounded-xl overflow-hidden cursor-pointer ${
//                     mainImage === img.image ? "border-orange-500" : "border-gray-300"
//                   }`}
//                   onClick={() => {
//                     setMainImage(img.image);
//                     setImageIndex(i);
//                   }}
//                 >
//                   <img
//                     src={img.image}
//                     className="w-full h-full object-cover rounded-lg"
//                     alt=""
//                   />
//                 </div>
//               ))}
//             </div>

//             <div className="flex-1 relative">
//               <img
//                 src={mainImage}
//                 className="w-full rounded-xl object-contain max-h-[550px]"
//                 alt=""
//               />

//               <button
//                 onClick={handlePrev}
//                 className="absolute left-2 top-1/2 bg-white shadow rounded-full p-2 -translate-y-1/2"
//               >
//                 <HiChevronLeft className="text-2xl" />
//               </button>

//               <button
//                 onClick={handleNext}
//                 className="absolute right-2 top-1/2 bg-white shadow rounded-full p-2 -translate-y-1/2"
//               >
//                 <HiChevronRight className="text-2xl" />
//               </button>
//             </div>
//           </div>

//           {/* RIGHT INFO */}
//           <div className="lg:w-1/2 space-y-6">
//             <h1 className="text-[26px] font-semibold leading-snug">{product.title}</h1>

//             <div className="flex items-center gap-4">
//               <div className="flex gap-1">{renderStars(product.average_rating)}</div>
//               <span className="text-gray-600 font-medium">{product.average_rating}</span>
//               <span className="text-gray-500">{product.sold}+ sold</span>
//             </div>

//             {/* PRICE */}
//             <div className="bg-[#fdf2e9] p-4 rounded-xl space-y-2">
//               <div className="flex items-center gap-3">
//                 <p className="text-orange-600 font-bold text-4xl">
//                   ₦{formatNumber(selectedVariant?.price || product.price)}
//                 </p>
//                 {discount > 0 && (
//                   <span className="bg-orange-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
//                     {discount}% OFF
//                   </span>
//                 )}
//               </div>
//               {selectedVariant?.old_price && (
//                 <p className="text-gray-500 line-through text-lg">
//                   ₦{formatNumber(selectedVariant.old_price)}
//                 </p>
//               )}
//             </div>

//             {product.description && (
//               <p className="text-gray-700 leading-relaxed">{product.description}</p>
//             )}

//             {/* COLOR OPTIONS */}
//             {extractedColors.length > 0 && (
//               <div>
//                 <p className="font-medium mb-2 text-gray-800">
//                   Color: {selectedColor || "Select"}
//                 </p>
//                 <div className="flex gap-4 flex-wrap">
//                   {extractedColors.map((color, i) => {
//   const variant = product.variants.find((v) => v.color === color);
//   const variantImage = product.images.find((img) => img.color === color)?.image;

//   return (
//     <button
//       key={i}
//       className={`border rounded-xl p-1 ${
//         selectedColor === color ? "border-orange-500" : "border-gray-300"
//       }`}
//       onClick={() => {
//         setSelectedColor(color);
//         setSelectedVariant(variant);

//         const firstColorImage = product.images.find(img => img.color === color);

//         if (firstColorImage) {
//           setMainImage(firstColorImage.image);

//           // Find this image index inside *ALL* thumbnails
//           const idx = thumbnails.findIndex(t => t.image === firstColorImage.image);
//           setImageIndex(idx >= 0 ? idx : 0);
//         }
//       }}
//     >
//       <img
//         src={variantImage}
//         className="w-16 h-16 object-cover rounded-lg"
//         alt=""
//       />
//     </button>
//   );
// })}

//                 </div>
//               </div>
//             )}

//             {/* QUANTITY */}
//             <div className="flex items-center gap-4 mt-3">
//               <button
//                 onClick={() => setQty((q) => Math.max(1, q - 1))}
//                 className="border px-4 py-1 rounded text-lg"
//               >
//                 -
//               </button>
//               <span className="text-xl">{qty}</span>
//               <button
//                 onClick={() => setQty((q) => q + 1)}
//                 className="border px-4 py-1 rounded text-lg"
//               >
//                 +
//               </button>
//               {thisProductQty > 0 && (
//                 <span className="text-gray-700 font-semibold">
//                   In cart: {thisProductQty}
//                 </span>
//               )}
//             </div>

//             {/* ADD TO CART */}
//             <button
//               onClick={handleAddToCart}
//               className="w-full bg-orange-500 text-white text-xl py-4 rounded-full font-semibold mt-4"
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>

//         {/* REVIEWS */}
//         <div className="mt-12 bg-white p-6 rounded-xl shadow">
//           <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
//           {reviews.length === 0 ? (
//             <p>No reviews yet</p>
//           ) : (
//             reviews.map((r) => (
//               <div key={r.id} className="border-b py-3">
//                 <div className="font-bold">{r.user_name}</div>
//                 <div className="flex gap-1">{renderStars(r.rating)}</div>
//                 <p className="text-gray-700">{r.text}</p>
//               </div>
//             ))
//           )}
//         </div>

//         {/* DEMO VIDEO */}
//         {product.demo_video && (
//           <div className="bg-white rounded-lg shadow p-6 mt-10">
//             <h2 className="text-2xl font-bold mb-4">Product Video Demo</h2>
//             <video controls className="w-full max-h-[500px] object-contain rounded">
//               <source src={product.demo_video} type="video/mp4" />
//             </video>
//           </div>
//         )}

//         {/* RELATED PRODUCTS */}
//         {relatedProducts.length > 0 && (
//           <div className="mt-12">
//             <h2 className="text-xl font-bold mb-3">Related Products</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {relatedProducts.map((p) => (
//                 <ProductCard key={p.id} product={p} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </StoreLayout>
//   );
// };












// import React, { useEffect, useState, useMemo } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
// import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
// import { useCart } from "../context/CartContext";
// import { ProductCard } from "./ProductCard";
// import { StoreLayout } from "../layouts/StoreLayout";

// export const ProductPage = () => {
//   const { id, slug } = useParams();
//   const productIdentifier = id || slug;

//   const navigate = useNavigate();
//   const { addToCart, cartItems } = useCart();

//   // --- STATE ---
//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [qty, setQty] = useState(1);
//   const [mainImage, setMainImage] = useState("");
//   const [imageIndex, setImageIndex] = useState(0);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [selectedVariant, setSelectedVariant] = useState(null);

//   const BASE_URL = "http://127.0.0.1:8000/store";

//   // --- FETCH PRODUCT ---
//   useEffect(() => {
//     if (!productIdentifier) return;

//     // Fetch product
//     axios
//       .get(`${BASE_URL}/products/${productIdentifier}/`)
//       .then((res) => {
//         const data = res.data;
//         setProduct(data);

//         // Set default variant & image
//         const defaultVariant = data.variants?.[0] || null;
//         setSelectedVariant(defaultVariant);
//         setSelectedColor(defaultVariant?.color || null);

//         const defaultImage =
//           data.images?.find((img) => img.color === defaultVariant?.color)?.image ||
//           data.images?.[0]?.image ||
//           "";
//         setMainImage(defaultImage);
//         setImageIndex(
//           data.images?.findIndex((img) => img.image === defaultImage) || 0
//         );

//         // Fetch related products
//         if (data.category?.id) {
//           axios
//             .get(
//               `${BASE_URL}/products/?category=${data.category.id}&exclude=${data.id}`
//             )
//             .then((r) => setRelatedProducts(r.data))
//             .catch(console.error);
//         }
//       })
//       .catch(() => setProduct(null));

//     // Fetch reviews
//     axios
//       .get(`${BASE_URL}/products/${productIdentifier}/reviews/`)
//       .then((res) =>
//         setReviews(res.data.sort((a, b) => new Date(b.date) - new Date(a.date)))
//       )
//       .catch(console.error);

//     // Fetch categories
//     axios
//       .get(`${BASE_URL}/categories/`)
//       .then((res) => setCategories(res.data))
//       .catch(console.error);
//   }, [productIdentifier]);

//   // --- COMPUTED HOOKS ---
//   const extractedColors = useMemo(
//     () => [...new Set(product?.images?.filter((img) => img.color).map((img) => img.color) || [])],
//     [product]
//   );

//   const thumbnails = useMemo(() => product?.images || [], [product]);

//   const thisProductQty = useMemo(() => {
//     if (!selectedVariant || !product) return 0;
//     return (
//       cartItems.find(
//         (item) => item.id === product.id && item.variant_id === selectedVariant?.id
//       )?.quantity || 0
//     );
//   }, [cartItems, product, selectedVariant]);

//   const discount = useMemo(() => {
//     if (!selectedVariant?.old_price) return 0;
//     return Math.round(
//       ((selectedVariant.old_price - selectedVariant.price) / selectedVariant.old_price) *
//         100
//     );
//   }, [selectedVariant]);

//   // --- HELPERS ---
//   const formatNumber = (num) =>
//     new Intl.NumberFormat("en-NG", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num);

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       if (i <= Math.floor(rating)) stars.push(<FaStar key={i} className="text-yellow-400" />);
//       else if (i - rating < 1) stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
//       else stars.push(<FaRegStar key={i} className="text-gray-300" />);
//     }
//     return stars;
//   };

//   const handleNext = () => {
//     if (!thumbnails.length) return;
//     const next = (imageIndex + 1) % thumbnails.length;
//     setImageIndex(next);
//     setMainImage(thumbnails[next].image);
//   };

//   const handlePrev = () => {
//     if (!thumbnails.length) return;
//     const prev = (imageIndex - 1 + thumbnails.length) % thumbnails.length;
//     setImageIndex(prev);
//     setMainImage(thumbnails[prev].image);
//   };

//   const handleAddToCart = () => {
//     if (!product) return;

//     let variantToUse = selectedVariant;

//     if (!variantToUse && product.variants?.length > 0) {
//       variantToUse = product.variants[0];
//       setSelectedVariant(variantToUse);
//       setSelectedColor(variantToUse.color);
//     }

//     const priceToSend = Number(
//       variantToUse?.price ?? variantToUse?.cleaned_price ?? product.price ?? 0
//     );

//     addToCart(
//       {
//         id: product.id,
//         title: product.title,
//         price: priceToSend,
//         formatted_price: "₦" + formatNumber(priceToSend),
//         image: mainImage || product.images?.[0]?.image,
//         color: variantToUse?.color || null,
//         variant_id: variantToUse?.id || null,
//       },
//       qty
//     );

//     setTimeout(() => navigate("/cart"), 10);
//   };

//   // --- SAFE RENDER ---
//   if (!product) {
//     return <div className="text-center py-20 text-xl">Loading product...</div>;
//   }

//   return (
//     <StoreLayout
//       searchValue={searchValue}
//       setSearchValue={setSearchValue}
//       categories={categories}
//       cartCount={cartItems.length}
//       logo="/logo.png"
//     >
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-10">
//           {/* LEFT GALLERY */}
//           <div className="flex gap-4 lg:w-1/2">
//             <div className="flex lg:flex-col gap-3 overflow-x-auto max-w-full">
//               {thumbnails.map((img, i) => (
//                 <div
//                   key={i}
//                   className={`relative w-20 h-20 border rounded-xl overflow-hidden cursor-pointer ${
//                     mainImage === img.image ? "border-orange-500" : "border-gray-300"
//                   }`}
//                   onClick={() => {
//                     setMainImage(img.image);
//                     setImageIndex(i);
//                   }}
//                 >
//                   <img src={img.image} alt="" className="w-full h-full object-cover rounded-lg" />
//                 </div>
//               ))}
//             </div>

//             <div className="flex-1 relative">
//               <img
//                 src={mainImage}
//                 alt=""
//                 className="w-full rounded-xl object-contain max-h-[550px]"
//               />
//               <button
//                 onClick={handlePrev}
//                 className="absolute left-2 top-1/2 bg-white shadow rounded-full p-2 -translate-y-1/2"
//               >
//                 <HiChevronLeft className="text-2xl" />
//               </button>
//               <button
//                 onClick={handleNext}
//                 className="absolute right-2 top-1/2 bg-white shadow rounded-full p-2 -translate-y-1/2"
//               >
//                 <HiChevronRight className="text-2xl" />
//               </button>
//             </div>
//           </div>

//           {/* RIGHT INFO */}
//           <div className="lg:w-1/2 space-y-6">
//             <h1 className="text-[26px] font-semibold leading-snug">{product.title}</h1>

//             <div className="flex items-center gap-4">
//               <div className="flex gap-1">{renderStars(product.average_rating)}</div>
//               <span className="text-gray-600 font-medium">{product.average_rating}</span>
//               <span className="text-gray-500">{product.sold}+ sold</span>
//             </div>

//             {/* PRICE */}
//             <div className="bg-[#fdf2e9] p-4 rounded-xl space-y-2">
//               <div className="flex items-center gap-3">
//                 <p className="text-orange-600 font-bold text-4xl">
//                   ₦{formatNumber(selectedVariant?.price || product.price)}
//                 </p>
//                 {discount > 0 && (
//                   <span className="bg-orange-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
//                     {discount}% OFF
//                   </span>
//                 )}
//               </div>
//               {selectedVariant?.old_price && (
//                 <p className="text-gray-500 line-through text-lg">
//                   ₦{formatNumber(selectedVariant.old_price)}
//                 </p>
//               )}
//             </div>

//             {product.description && (
//               <p className="text-gray-700 leading-relaxed">{product.description}</p>
//             )}

//             {/* COLORS */}
//             {extractedColors.length > 0 && (
//               <div>
//                 <p className="font-medium mb-2 text-gray-800">
//                   Color: {selectedColor || "Select"}
//                 </p>
//                 <div className="flex gap-4 flex-wrap">
//                   {extractedColors.map((color, i) => {
//                     const variant = product.variants.find((v) => v.color === color);
//                     const variantImage = product.images.find((img) => img.color === color)?.image;

//                     return (
//                       <button
//                         key={i}
//                         className={`border rounded-xl p-1 ${
//                           selectedColor === color ? "border-orange-500" : "border-gray-300"
//                         }`}
//                         onClick={() => {
//                           setSelectedColor(color);
//                           setSelectedVariant(variant);

//                           const firstColorImage = product.images.find((img) => img.color === color);
//                           if (firstColorImage) {
//                             setMainImage(firstColorImage.image);
//                             const idx = thumbnails.findIndex(t => t.image === firstColorImage.image);
//                             setImageIndex(idx >= 0 ? idx : 0);
//                           }
//                         }}
//                       >
//                         <img src={variantImage} alt="" className="w-16 h-16 object-cover rounded-lg" />
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* QUANTITY */}
//             <div className="flex items-center gap-4 mt-3">
//               <button onClick={() => setQty(q => Math.max(1, q - 1))} className="border px-4 py-1 rounded text-lg">-</button>
//               <span className="text-xl">{qty}</span>
//               <button onClick={() => setQty(q => q + 1)} className="border px-4 py-1 rounded text-lg">+</button>
//               {thisProductQty > 0 && <span className="text-gray-700 font-semibold">In cart: {thisProductQty}</span>}
//             </div>

//             {/* ADD TO CART */}
//             <button
//               onClick={handleAddToCart}
//               className="w-full bg-orange-500 text-white text-xl py-4 rounded-full font-semibold mt-4"
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>

//         {/* REVIEWS */}
//         <div className="mt-12 bg-white p-6 rounded-xl shadow">
//           <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
//           {reviews.length === 0 ? (
//             <p>No reviews yet</p>
//           ) : (
//             reviews.map(r => (
//               <div key={r.id} className="border-b py-3">
//                 <div className="font-bold">{r.user_name}</div>
//                 <div className="flex gap-1">{renderStars(r.rating)}</div>
//                 <p className="text-gray-700">{r.text}</p>
//               </div>
//             ))
//           )}
//         </div>
//           {/* DEMO VIDEO */}
//       {product.demo_video && (
//         <div className="bg-white rounded-lg shadow p-6 mt-10">
//           <h2 className="text-2xl font-bold mb-4">Product Video Demo</h2>
//           <video controls className="w-full max-h-[500px] object-contain rounded">
//             <source src={product.demo_video} type="video/mp4" />
//           </video>
//         </div>
//       )}
//         {/* RELATED PRODUCTS */}
//         {relatedProducts.length > 0 && (
//           <div className="mt-12">
//             <h2 className="text-xl font-bold mb-3">Related Products</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {relatedProducts.map((p) => (
//                 <ProductCard key={p.id} product={p} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </StoreLayout>
//   );
// };












// import React, { useEffect, useState, useMemo } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
// import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
// import { useCart } from "../context/CartContext";
// import { StoreLayout } from "../layouts/StoreLayout";

// export const ProductPage = () => {
//   const { id, slug } = useParams();
//   const productIdentifier = id || slug;

//   const navigate = useNavigate();
//   const { addToCart, cartItems } = useCart();

//   // --- STATE ---
//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [qty, setQty] = useState(1);
//   const [mainImage, setMainImage] = useState("");
//   const [imageIndex, setImageIndex] = useState(0);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [allProducts, setAllProducts] = useState([]);

//   const BASE_URL = "http://127.0.0.1:8000/store";

//   // --- FETCH PRODUCT ---
//   useEffect(() => {
//     if (!productIdentifier) return;

//     axios.get(`${BASE_URL}/products/${productIdentifier}/`)
//       .then((res) => {
//         const data = res.data;
//         setProduct(data);

//         const defaultVariant = data.variants?.[0] || null;
//         setSelectedVariant(defaultVariant);
//         setSelectedColor(defaultVariant?.color || null);

//         const defaultImage =
//           data.images?.find((img) => img.color === defaultVariant?.color)?.image ||
//           data.images?.[0]?.image ||
//           "";
//         setMainImage(defaultImage);
//         setImageIndex(
//           data.images?.findIndex((img) => img.image === defaultImage) || 0
//         );
//       })
//       .catch(() => setProduct(null));

//     // Fetch reviews
//     axios.get(`${BASE_URL}/products/${productIdentifier}/reviews/`)
//       .then((res) =>
//         setReviews(res.data.sort((a, b) => new Date(b.date) - new Date(a.date)))
//       )
//       .catch(console.error);

//     // Fetch categories
//     axios.get(`${BASE_URL}/categories/`)
//       .then((res) => setCategories(res.data))
//       .catch(console.error);

//     // Fetch all products for display below demo video
//     axios.get(`${BASE_URL}/products/`)
//       .then((res) => setAllProducts(res.data || []))
//       .catch(console.error);
//   }, [productIdentifier]);

//   // --- COMPUTED HOOKS ---
//   const extractedColors = useMemo(
//     () => [...new Set(product?.images?.filter((img) => img.color).map((img) => img.color) || [])],
//     [product]
//   );

//   const thumbnails = useMemo(() => product?.images || [], [product]);

//   const thisProductQty = useMemo(() => {
//     if (!selectedVariant || !product) return 0;
//     return (
//       cartItems.find(
//         (item) => item.id === product.id && item.variant_id === selectedVariant?.id
//       )?.quantity || 0
//     );
//   }, [cartItems, product, selectedVariant]);

//   const discount = useMemo(() => {
//     if (!selectedVariant?.old_price) return 0;
//     return Math.round(
//       ((selectedVariant.old_price - selectedVariant.price) / selectedVariant.old_price) *
//         100
//     );
//   }, [selectedVariant]);

//   // --- HELPERS ---
//   const formatNumber = (num) =>
//     new Intl.NumberFormat("en-NG", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num);

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       if (i <= Math.floor(rating)) stars.push(<FaStar key={i} className="text-yellow-400" />);
//       else if (i - rating < 1) stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
//       else stars.push(<FaRegStar key={i} className="text-gray-300" />);
//     }
//     return stars;
//   };

//   const handleNext = () => {
//     if (!thumbnails.length) return;
//     const next = (imageIndex + 1) % thumbnails.length;
//     setImageIndex(next);
//     setMainImage(thumbnails[next].image);
//   };

//   const handlePrev = () => {
//     if (!thumbnails.length) return;
//     const prev = (imageIndex - 1 + thumbnails.length) % thumbnails.length;
//     setImageIndex(prev);
//     setMainImage(thumbnails[prev].image);
//   };

//   const handleAddToCart = () => {
//     if (!product) return;

//     let variantToUse = selectedVariant;

//     if (!variantToUse && product.variants?.length > 0) {
//       variantToUse = product.variants[0];
//       setSelectedVariant(variantToUse);
//       setSelectedColor(variantToUse.color);
//     }

//     const priceToSend = Number(
//       variantToUse?.price ?? variantToUse?.cleaned_price ?? product.price ?? 0
//     );

//     addToCart(
//       {
//         id: product.id,
//         title: product.title,
//         price: priceToSend,
//         formatted_price: "₦" + formatNumber(priceToSend),
//         image: mainImage || product.images?.[0]?.image,
//         color: variantToUse?.color || null,
//         variant_id: variantToUse?.id || null,
//       },
//       qty
//     );

//     setTimeout(() => navigate("/cart"), 10);
//   };

//   const handleViewProduct = (productId) => {
//     navigate(`/product/${productId}`);
//   };

//   if (!product) {
//     return <div className="text-center py-20 text-xl">Loading product...</div>;
//   }

//   return (
//     <StoreLayout
//       searchValue={searchValue}
//       setSearchValue={setSearchValue}
//       categories={categories}
//       cartCount={cartItems.length}
//       logo="/logo.png"
//     >
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-10">
//           {/* LEFT GALLERY */}
//           <div className="flex gap-4 lg:w-1/2">
//             <div className="flex lg:flex-col gap-3 overflow-x-auto max-w-full">
//               {thumbnails.map((img, i) => (
//                 <div
//                   key={i}
//                   className={`relative w-20 h-20 border rounded-xl overflow-hidden cursor-pointer ${
//                     mainImage === img.image ? "border-orange-500" : "border-gray-300"
//                   }`}
//                   onClick={() => {
//                     setMainImage(img.image);
//                     setImageIndex(i);
//                   }}
//                 >
//                   <img src={img.image} alt="" className="w-full h-full object-cover rounded-lg" />
//                 </div>
//               ))}
//             </div>

//             <div className="flex-1 relative">
//               <img
//                 src={mainImage}
//                 alt=""
//                 className="w-full rounded-xl object-contain max-h-[550px]"
//               />
//               <button
//                 onClick={handlePrev}
//                 className="absolute left-2 top-1/2 bg-white shadow rounded-full p-2 -translate-y-1/2"
//               >
//                 <HiChevronLeft className="text-2xl" />
//               </button>
//               <button
//                 onClick={handleNext}
//                 className="absolute right-2 top-1/2 bg-white shadow rounded-full p-2 -translate-y-1/2"
//               >
//                 <HiChevronRight className="text-2xl" />
//               </button>
//             </div>
//           </div>

//           {/* RIGHT INFO */}
//           <div className="lg:w-1/2 space-y-6">
//             <h1 className="text-[26px] font-semibold leading-snug">{product.title}</h1>

//             <div className="flex items-center gap-4">
//               <div className="flex gap-1">{renderStars(product.average_rating)}</div>
//               <span className="text-gray-600 font-medium">{product.average_rating}</span>
//               <span className="text-gray-500">{product.sold}+ sold</span>
//             </div>

//             {/* PRICE */}
//             <div className="bg-[#fdf2e9] p-4 rounded-xl space-y-2">
//               <div className="flex items-center gap-3">
//                 <p className="text-orange-600 font-bold text-4xl">
//                   ₦{formatNumber(selectedVariant?.price || product.price)}
//                 </p>
//                 {discount > 0 && (
//                   <span className="bg-orange-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
//                     {discount}% OFF
//                   </span>
//                 )}
//               </div>
//               {selectedVariant?.old_price && (
//                 <p className="text-gray-500 line-through text-lg">
//                   ₦{formatNumber(selectedVariant.old_price)}
//                 </p>
//               )}
//             </div>

//             {product.description && (
//               <p className="text-gray-700 leading-relaxed">{product.description}</p>
//             )}

//             {/* COLORS */}
//             {extractedColors.length > 0 && (
//               <div>
//                 <p className="font-medium mb-2 text-gray-800">
//                   Color: {selectedColor || "Select"}
//                 </p>
//                 <div className="flex gap-4 flex-wrap">
//                   {extractedColors.map((color, i) => {
//                     const variant = product.variants.find((v) => v.color === color);
//                     const variantImage = product.images.find((img) => img.color === color)?.image;

//                     return (
//                       <button
//                         key={i}
//                         className={`border rounded-xl p-1 ${
//                           selectedColor === color ? "border-orange-500" : "border-gray-300"
//                         }`}
//                         onClick={() => {
//                           setSelectedColor(color);
//                           setSelectedVariant(variant);

//                           const firstColorImage = product.images.find((img) => img.color === color);
//                           if (firstColorImage) {
//                             setMainImage(firstColorImage.image);
//                             const idx = thumbnails.findIndex(t => t.image === firstColorImage.image);
//                             setImageIndex(idx >= 0 ? idx : 0);
//                           }
//                         }}
//                       >
//                         <img src={variantImage} alt="" className="w-16 h-16 object-cover rounded-lg" />
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* QUANTITY */}
//             <div className="flex items-center gap-4 mt-3">
//               <button onClick={() => setQty(q => Math.max(1, q - 1))} className="border px-4 py-1 rounded text-lg">-</button>
//               <span className="text-xl">{qty}</span>
//               <button onClick={() => setQty(q => q + 1)} className="border px-4 py-1 rounded text-lg">+</button>
//               {thisProductQty > 0 && <span className="text-gray-700 font-semibold">In cart: {thisProductQty}</span>}
//             </div>

//             {/* ADD TO CART */}
//             <button
//               onClick={handleAddToCart}
//               className="w-full bg-orange-500 text-white text-xl py-4 rounded-full font-semibold mt-4"
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>

//         {/* REVIEWS */}
//         <div className="mt-12 bg-white p-6 rounded-xl shadow">
//           <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
//           {reviews.length === 0 ? (
//             <p>No reviews yet</p>
//           ) : (
//             reviews.map(r => (
//               <div key={r.id} className="border-b py-3">
//                 <div className="font-bold">{r.user_name}</div>
//                 <div className="flex gap-1">{renderStars(r.rating)}</div>
//                 <p className="text-gray-700">{r.text}</p>
//               </div>
//             ))
//           )}
//         </div>

//         {/* DEMO VIDEO */}
//         {product.demo_video && (
//           <div className="bg-white rounded-lg shadow p-6 mt-10">
//             <h2 className="text-2xl font-bold mb-4">Product Video Demo</h2>
//             <video controls className="w-full max-h-[500px] object-contain rounded">
//               <source src={product.demo_video} type="video/mp4" />
//             </video>
//           </div>
//         )}

//         {/* ALL PRODUCTS BELOW DEMO VIDEO */}
//         {allProducts.length > 0 && (
//           <div className="mt-10">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">All Products</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {allProducts.map((p) => {
//                 const price = typeof p.price === "string"
//                   ? Number(p.price.replace(/[^\d.]/g, ""))
//                   : p.price;
//                 const oldPrice = typeof p.old_price === "string"
//                   ? Number(p.old_price.replace(/[^\d.]/g, ""))
//                   : p.old_price;

//                 return (
//                   <div
//                     key={p.id}
//                     className="bg-white rounded-lg shadow-sm border p-3 hover:shadow-md transition cursor-pointer"
//                     onClick={() => handleViewProduct(p.id)}
//                   >
//                     <div className="w-full h-40 bg-gray-100 rounded overflow-hidden">
//                       <img
//                         src={p.images?.[0]?.image}
//                         className="w-full h-full object-cover"
//                         alt={p.title}
//                       />
//                     </div>

//                     <h3 className="mt-2 text-sm font-semibold text-gray-800 line-clamp-2">
//                       {p.title}
//                     </h3>

//                     <div className="mt-1">
//                       <p className="text-red-600 font-bold">
//                         ₦{price?.toLocaleString()}
//                       </p>
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
//         )}

//       </div>
//     </StoreLayout>
//   );
// };








// import React, { useEffect, useState, useMemo } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
// import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
// import { useCart } from "../context/CartContext";
// import { StoreLayout } from "../layouts/StoreLayout";

// export const ProductPage = () => {
//   const { id, slug } = useParams();
//   const productIdentifier = id || slug;

//   const navigate = useNavigate();
//   const { addToCart, cartItems } = useCart();

//   // --- STATE ---
//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [qty, setQty] = useState(1);
//   const [mainImage, setMainImage] = useState("");
//   const [imageIndex, setImageIndex] = useState(0);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [allProducts, setAllProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null); // <-- New state

//   const BASE_URL = "http://127.0.0.1:8000/store";

//   // --- FETCH PRODUCT, REVIEWS, CATEGORIES ---
//   useEffect(() => {
//     if (!productIdentifier) return;

//     // Fetch main product
//     axios.get(`${BASE_URL}/products/${productIdentifier}/`)
//       .then((res) => {
//         const data = res.data;
//         setProduct(data);

//         const defaultVariant = data.variants?.[0] || null;
//         setSelectedVariant(defaultVariant);
//         setSelectedColor(defaultVariant?.color || null);

//         const defaultImage =
//           data.images?.find((img) => img.color === defaultVariant?.color)?.image ||
//           data.images?.[0]?.image ||
//           "";
//         setMainImage(defaultImage);
//         setImageIndex(
//           data.images?.findIndex((img) => img.image === defaultImage) || 0
//         );
//       })
//       .catch(() => setProduct(null));

//     // Fetch reviews
//     axios.get(`${BASE_URL}/products/${productIdentifier}/reviews/`)
//       .then((res) =>
//         setReviews(res.data.sort((a, b) => new Date(b.date) - new Date(a.date)))
//       )
//       .catch(console.error);

//     // Fetch categories
//     axios.get(`${BASE_URL}/categories/`)
//       .then((res) => setCategories(res.data))
//       .catch(console.error);

//   }, [productIdentifier]);

//   // --- FETCH ALL PRODUCTS OR FILTERED BY CATEGORY ---
//   useEffect(() => {
//     let url = `${BASE_URL}/products/`;
//     if (selectedCategory) url += `?category=${selectedCategory}`;

//     axios.get(url)
//       .then((res) => setAllProducts(res.data || []))
//       .catch(console.error);
//   }, [selectedCategory]);

//   // --- COMPUTED HOOKS ---
//   const extractedColors = useMemo(
//     () => [...new Set(product?.images?.filter((img) => img.color).map((img) => img.color) || [])],
//     [product]
//   );

//   const thumbnails = useMemo(() => product?.images || [], [product]);

//   const thisProductQty = useMemo(() => {
//     if (!selectedVariant || !product) return 0;
//     return (
//       cartItems.find(
//         (item) => item.id === product.id && item.variant_id === selectedVariant?.id
//       )?.quantity || 0
//     );
//   }, [cartItems, product, selectedVariant]);

//   const discount = useMemo(() => {
//     if (!selectedVariant?.old_price) return 0;
//     return Math.round(
//       ((selectedVariant.old_price - selectedVariant.price) / selectedVariant.old_price) *
//         100
//     );
//   }, [selectedVariant]);

//   // --- HELPERS ---
//   const formatNumber = (num) =>
//     new Intl.NumberFormat("en-NG", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num);

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       if (i <= Math.floor(rating)) stars.push(<FaStar key={i} className="text-yellow-400" />);
//       else if (i - rating < 1) stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
//       else stars.push(<FaRegStar key={i} className="text-gray-300" />);
//     }
//     return stars;
//   };

//   const handleNext = () => {
//     if (!thumbnails.length) return;
//     const next = (imageIndex + 1) % thumbnails.length;
//     setImageIndex(next);
//     setMainImage(thumbnails[next].image);
//   };

//   const handlePrev = () => {
//     if (!thumbnails.length) return;
//     const prev = (imageIndex - 1 + thumbnails.length) % thumbnails.length;
//     setImageIndex(prev);
//     setMainImage(thumbnails[prev].image);
//   };

//   const handleAddToCart = () => {
//     if (!product) return;

//     let variantToUse = selectedVariant;

//     if (!variantToUse && product.variants?.length > 0) {
//       variantToUse = product.variants[0];
//       setSelectedVariant(variantToUse);
//       setSelectedColor(variantToUse.color);
//     }

//     const priceToSend = Number(
//       variantToUse?.price ?? variantToUse?.cleaned_price ?? product.price ?? 0
//     );

//     addToCart(
//       {
//         id: product.id,
//         title: product.title,
//         price: priceToSend,
//         formatted_price: "₦" + formatNumber(priceToSend),
//         image: mainImage || product.images?.[0]?.image,
//         color: variantToUse?.color || null,
//         variant_id: variantToUse?.id || null,
//       },
//       qty
//     );

//     setTimeout(() => navigate("/cart"), 10);
//   };

//   const handleViewProduct = (productId) => {
//     navigate(`/product/${productId}`);
//   };

//   if (!product) {
//     return <div className="text-center py-20 text-xl">Loading product...</div>;
//   }

//   return (
//     <StoreLayout
//       searchValue={searchValue}
//       setSearchValue={setSearchValue}
//       // categories={categories}
//       cartCount={cartItems.length}
//       logo="/logo.png"
//     >
//       <div className="container mx-auto px-4 py-8">
//         {/* CATEGORY FILTER */}
//         <div className="flex gap-4 flex-wrap mb-6">
//           <button
//             className={`px-3 py-1 rounded-full border ${
//               selectedCategory === null ? "bg-orange-500 text-white" : "border-gray-300"
//             }`}
//             onClick={() => setSelectedCategory(null)}
//           >
//             All
//           </button>
//           {categories.map(cat => (
//             <button
//               key={cat.id}
//               className={`px-3 py-1 rounded-full border ${
//                 selectedCategory === cat.id ? "bg-orange-500 text-white" : "border-gray-300"
//               }`}
//               onClick={() => setSelectedCategory(cat.id)}
//             >
//               {cat.name}
//             </button>
//           ))}
//         </div>

//         <div className="flex flex-col lg:flex-row gap-10">
//           {/* LEFT GALLERY */}
//           <div className="flex gap-4 lg:w-1/2">
//             <div className="flex lg:flex-col gap-3 overflow-x-auto max-w-full">
//               {thumbnails.map((img, i) => (
//                 <div
//                   key={i}
//                   className={`relative w-20 h-20 border rounded-xl overflow-hidden cursor-pointer ${
//                     mainImage === img.image ? "border-orange-500" : "border-gray-300"
//                   }`}
//                   onClick={() => {
//                     setMainImage(img.image);
//                     setImageIndex(i);
//                   }}
//                 >
//                   <img src={img.image} alt="" className="w-full h-full object-cover rounded-lg" />
//                 </div>
//               ))}
//             </div>

//             <div className="flex-1 relative">
//               <img
//                 src={mainImage}
//                 alt=""
//                 className="w-full rounded-xl object-contain max-h-[550px]"
//               />
//               <button
//                 onClick={handlePrev}
//                 className="absolute left-2 top-1/2 bg-white shadow rounded-full p-2 -translate-y-1/2"
//               >
//                 <HiChevronLeft className="text-2xl" />
//               </button>
//               <button
//                 onClick={handleNext}
//                 className="absolute right-2 top-1/2 bg-white shadow rounded-full p-2 -translate-y-1/2"
//               >
//                 <HiChevronRight className="text-2xl" />
//               </button>
//             </div>
//           </div>

//           {/* RIGHT INFO */}
//           <div className="lg:w-1/2 space-y-6">
//             <h1 className="text-[26px] font-semibold leading-snug">{product.title}</h1>

//             <div className="flex items-center gap-4">
//               <div className="flex gap-1">{renderStars(product.average_rating)}</div>
//               <span className="text-gray-600 font-medium">{product.average_rating}</span>
//               <span className="text-gray-500">{product.sold}+ sold</span>
//             </div>

//             {/* PRICE */}
//             <div className="bg-[#fdf2e9] p-4 rounded-xl space-y-2">
//               <div className="flex items-center gap-3">
//                 <p className="text-orange-600 font-bold text-4xl">
//                   ₦{formatNumber(selectedVariant?.price || product.price)}
//                 </p>
//                 {discount > 0 && (
//                   <span className="bg-orange-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
//                     {discount}% OFF
//                   </span>
//                 )}
//               </div>
//               {selectedVariant?.old_price && (
//                 <p className="text-gray-500 line-through text-lg">
//                   ₦{formatNumber(selectedVariant.old_price)}
//                 </p>
//               )}
//             </div>

//             {product.description && (
//               <p className="text-gray-700 leading-relaxed">{product.description}</p>
//             )}

//             {/* COLORS */}
//             {extractedColors.length > 0 && (
//               <div>
//                 <p className="font-medium mb-2 text-gray-800">
//                   Color: {selectedColor || "Select"}
//                 </p>
//                 <div className="flex gap-4 flex-wrap">
//                   {extractedColors.map((color, i) => {
//                     const variant = product.variants.find((v) => v.color === color);
//                     const variantImage = product.images.find((img) => img.color === color)?.image;

//                     return (
//                       <button
//                         key={i}
//                         className={`border rounded-xl p-1 ${
//                           selectedColor === color ? "border-orange-500" : "border-gray-300"
//                         }`}
//                         onClick={() => {
//                           setSelectedColor(color);
//                           setSelectedVariant(variant);

//                           const firstColorImage = product.images.find((img) => img.color === color);
//                           if (firstColorImage) {
//                             setMainImage(firstColorImage.image);
//                             const idx = thumbnails.findIndex(t => t.image === firstColorImage.image);
//                             setImageIndex(idx >= 0 ? idx : 0);
//                           }
//                         }}
//                       >
//                         <img src={variantImage} alt="" className="w-16 h-16 object-cover rounded-lg" />
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* QUANTITY */}
//             <div className="flex items-center gap-4 mt-3">
//               <button onClick={() => setQty(q => Math.max(1, q - 1))} className="border px-4 py-1 rounded text-lg">-</button>
//               <span className="text-xl">{qty}</span>
//               <button onClick={() => setQty(q => q + 1)} className="border px-4 py-1 rounded text-lg">+</button>
//               {thisProductQty > 0 && <span className="text-gray-700 font-semibold">In cart: {thisProductQty}</span>}
//             </div>

//             {/* ADD TO CART */}
//             <button
//               onClick={handleAddToCart}
//               className="w-full bg-orange-500 text-white text-xl py-4 rounded-full font-semibold mt-4"
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>

//         {/* REVIEWS */}
//         <div className="mt-12 bg-white p-6 rounded-xl shadow">
//           <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
//           {reviews.length === 0 ? (
//             <p>No reviews yet</p>
//           ) : (
//             reviews.map(r => (
//               <div key={r.id} className="border-b py-3">
//                 <div className="font-bold">{r.user_name}</div>
//                 <div className="flex gap-1">{renderStars(r.rating)}</div>
//                 <p className="text-gray-700">{r.text}</p>
//               </div>
//             ))
//           )}
//         </div>

//         {/* DEMO VIDEO */}
//         {product.demo_video && (
//           <div className="bg-white rounded-lg shadow p-6 mt-10">
//             <h2 className="text-2xl font-bold mb-4">Product Video Demo</h2>
//             <video controls className="w-full max-h-[500px] object-contain rounded">
//               <source src={product.demo_video} type="video/mp4" />
//             </video>
//           </div>
//         )}

//         {/* ALL PRODUCTS BELOW DEMO VIDEO */}
//         {allProducts.length > 0 && (
//           <div className="mt-10">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">Products</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {allProducts.map((p) => {
//                 const price = typeof p.price === "string"
//                   ? Number(p.price.replace(/[^\d.]/g, ""))
//                   : p.price;
//                 const oldPrice = typeof p.old_price === "string"
//                   ? Number(p.old_price.replace(/[^\d.]/g, ""))
//                   : p.old_price;

//                 return (
//                   <div
//                     key={p.id}
//                     className="bg-white rounded-lg shadow-sm border p-3 hover:shadow-md transition cursor-pointer"
//                     onClick={() => handleViewProduct(p.id)}
//                   >
//                     <div className="w-full h-40 bg-gray-100 rounded overflow-hidden">
//                       <img
//                         src={p.images?.[0]?.image}
//                         className="w-full h-full object-cover"
//                         alt={p.title}
//                       />
//                     </div>

//                     <h3 className="mt-2 text-sm font-semibold text-gray-800 line-clamp-2">
//                       {p.title}
//                     </h3>

//                     <div className="mt-1">
//                       <p className="text-red-600 font-bold">
//                         ₦{price?.toLocaleString()}
//                       </p>
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
//         )}

//       </div>
//     </StoreLayout>
//   );
// };










import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useCart } from "../context/CartContext";
import { StoreLayout } from "../layouts/StoreLayout";

export const ProductPage = () => {
  const { id, slug } = useParams();
  const productIdentifier = id || slug;

  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();

  // --- STATE ---
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [qty, setQty] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const BASE_URL = "http://127.0.0.1:8000/store";

  // --- FETCH PRODUCT, REVIEWS, CATEGORIES ---
  useEffect(() => {
    if (!productIdentifier) return;

    axios.get(`${BASE_URL}/products/${productIdentifier}/`)
      .then((res) => {
        const data = res.data;
        setProduct(data);

        const defaultVariant = data.variants?.[0] || null;
        setSelectedVariant(defaultVariant);
        setSelectedColor(defaultVariant?.color || null);

        const defaultImage =
          data.images?.find((img) => img.color === defaultVariant?.color)?.image ||
          data.images?.[0]?.image ||
          "";
        setMainImage(defaultImage);
        setImageIndex(
          data.images?.findIndex((img) => img.image === defaultImage) || 0
        );
      })
      .catch(() => setProduct(null));

    axios.get(`${BASE_URL}/products/${productIdentifier}/reviews/`)
      .then((res) =>
        setReviews(res.data.sort((a, b) => new Date(b.date) - new Date(a.date)))
      )
      .catch(console.error);

    axios.get(`${BASE_URL}/categories/`)
      .then((res) => setCategories(res.data))
      .catch(console.error);
  }, [productIdentifier]);

  // --- FETCH PRODUCTS (CATEGORY OR SEARCH FILTERED) ---
  const fetchProducts = (categoryId = null, searchQuery = "") => {
    let url = `${BASE_URL}/products/`;
    if (categoryId) url += `?category=${categoryId}`;
    if (searchQuery) url += categoryId ? `&search=${encodeURIComponent(searchQuery)}` : `?search=${encodeURIComponent(searchQuery)}`;

    axios.get(url)
      .then(res => setAllProducts(res.data || []))
      .catch(console.error);
  };

  useEffect(() => {
    fetchProducts(selectedCategory, searchValue);
  }, [selectedCategory]);

  // --- COMPUTED HOOKS ---
  const extractedColors = useMemo(
    () => [...new Set(product?.images?.filter((img) => img.color).map((img) => img.color) || [])],
    [product]
  );

  const thumbnails = useMemo(() => product?.images || [], [product]);

  const thisProductQty = useMemo(() => {
    if (!selectedVariant || !product) return 0;
    return (
      cartItems.find(
        (item) => item.id === product.id && item.variant_id === selectedVariant?.id
      )?.quantity || 0
    );
  }, [cartItems, product, selectedVariant]);

  const discount = useMemo(() => {
    if (!selectedVariant?.old_price) return 0;
    return Math.round(
      ((selectedVariant.old_price - selectedVariant.price) / selectedVariant.old_price) *
        100
    );
  }, [selectedVariant]);

  // --- HELPERS ---
  const formatNumber = (num) =>
    new Intl.NumberFormat("en-NG", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) stars.push(<FaStar key={i} className="text-yellow-400" />);
      else if (i - rating < 1) stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      else stars.push(<FaRegStar key={i} className="text-gray-300" />);
    }
    return stars;
  };

  const handleNext = () => {
    if (!thumbnails.length) return;
    const next = (imageIndex + 1) % thumbnails.length;
    setImageIndex(next);
    setMainImage(thumbnails[next].image);
  };

  const handlePrev = () => {
    if (!thumbnails.length) return;
    const prev = (imageIndex - 1 + thumbnails.length) % thumbnails.length;
    setImageIndex(prev);
    setMainImage(thumbnails[prev].image);
  };

  const handleAddToCart = () => {
    if (!product) return;

    let variantToUse = selectedVariant;
    if (!variantToUse && product.variants?.length > 0) {
      variantToUse = product.variants[0];
      setSelectedVariant(variantToUse);
      setSelectedColor(variantToUse.color);
    }

    const priceToSend = Number(
      variantToUse?.price ?? variantToUse?.cleaned_price ?? product.price ?? 0
    );

    addToCart(
      {
        id: product.id,
        title: product.title,
        price: priceToSend,
        formatted_price: "₦" + formatNumber(priceToSend),
        image: mainImage || product.images?.[0]?.image,
        color: variantToUse?.color || null,
        variant_id: variantToUse?.id || null,
      },
      qty
    );

    setTimeout(() => navigate("/cart"), 10);
  };

  const handleViewProduct = (productId) => navigate(`/product/${productId}`);

  if (!product) return <div className="text-center py-20 text-xl">Loading product...</div>;

  return (
    <StoreLayout
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      cartCount={cartItems.length}
      logo="/logo.png"
      searchProducts={() => {
        setSelectedCategory(null);
        fetchProducts(null, searchValue);
      }}
      categories={categories}
      loadCategory={(categoryId) => setSelectedCategory(categoryId)}
    >
      <div className="container mx-auto px-4 py-8">
        {/* CATEGORY FILTER */}
        <div className="flex gap-4 flex-wrap mb-6">
          <button
            className={`px-3 py-1 rounded-full border ${selectedCategory === null ? "bg-orange-500 text-white" : "border-gray-300"}`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`px-3 py-1 rounded-full border ${selectedCategory === cat.id ? "bg-orange-500 text-white" : "border-gray-300"}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT GALLERY */}
          <div className="flex gap-4 lg:w-1/2">
            <div className="flex lg:flex-col gap-3 overflow-x-auto max-w-full">
              {thumbnails.map((img, i) => (
                <div
                  key={i}
                  className={`relative w-20 h-20 border rounded-xl overflow-hidden cursor-pointer ${mainImage === img.image ? "border-orange-500" : "border-gray-300"}`}
                  onClick={() => { setMainImage(img.image); setImageIndex(i); }}
                >
                  <img src={img.image} alt="" className="w-full h-full object-cover rounded-lg" />
                </div>
              ))}
            </div>

            <div className="flex-1 relative">
              <img
                src={mainImage}
                alt=""
                className="w-full rounded-xl object-contain max-h-[550px]"
              />
              <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 bg-white shadow rounded-full p-2 -translate-y-1/2"
              >
                <HiChevronLeft className="text-2xl" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 bg-white shadow rounded-full p-2 -translate-y-1/2"
              >
                <HiChevronRight className="text-2xl" />
              </button>
            </div>
          </div>

          {/* RIGHT INFO */}
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-[26px] font-semibold leading-snug">{product.title}</h1>

            <div className="flex items-center gap-4">
              <div className="flex gap-1">{renderStars(product.average_rating)}</div>
              <span className="text-gray-600 font-medium">{product.average_rating}</span>
              <span className="text-gray-500">{product.sold}+ sold</span>
            </div>

            {/* PRICE */}
            <div className="bg-[#fdf2e9] p-4 rounded-xl space-y-2">
              <div className="flex items-center gap-3">
                <p className="text-orange-600 font-bold text-4xl">
                  ₦{formatNumber(selectedVariant?.price || product.price)}
                </p>
                {discount > 0 && (
                  <span className="bg-orange-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                    {discount}% OFF
                  </span>
                )}
              </div>
              {selectedVariant?.old_price && (
                <p className="text-gray-500 line-through text-lg">
                  ₦{formatNumber(selectedVariant.old_price)}
                </p>
              )}
            </div>

            {product.description && (
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            )}

            {/* COLORS */}
            {extractedColors.length > 0 && (
              <div>
                <p className="font-medium mb-2 text-gray-800">Color: {selectedColor || "Select"}</p>
                <div className="flex gap-4 flex-wrap">
                  {extractedColors.map((color, i) => {
                    const variant = product.variants.find((v) => v.color === color);
                    const variantImage = product.images.find((img) => img.color === color)?.image;

                    return (
                      <button
                        key={i}
                        className={`border rounded-xl p-1 ${selectedColor === color ? "border-orange-500" : "border-gray-300"}`}
                        onClick={() => {
                          setSelectedColor(color);
                          setSelectedVariant(variant);
                          const firstColorImage = product.images.find((img) => img.color === color);
                          if (firstColorImage) {
                            setMainImage(firstColorImage.image);
                            const idx = thumbnails.findIndex(t => t.image === firstColorImage.image);
                            setImageIndex(idx >= 0 ? idx : 0);
                          }
                        }}
                      >
                        <img src={variantImage} alt="" className="w-16 h-16 object-cover rounded-lg" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* QUANTITY */}
            <div className="flex items-center gap-4 mt-3">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="border px-4 py-1 rounded text-lg">-</button>
              <span className="text-xl">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="border px-4 py-1 rounded text-lg">+</button>
              {thisProductQty > 0 && <span className="text-gray-700 font-semibold">In cart: {thisProductQty}</span>}
            </div>

            {/* ADD TO CART */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-orange-500 text-white text-xl py-4 rounded-full font-semibold mt-4"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* REVIEWS */}
        <div className="mt-12 bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
          {reviews.length === 0 ? (
            <p>No reviews yet</p>
          ) : (
            reviews.map(r => (
              <div key={r.id} className="border-b py-3">
                <div className="font-bold">{r.user_name}</div>
                <div className="flex gap-1">{renderStars(r.rating)}</div>
                <p className="text-gray-700">{r.text}</p>
              </div>
            ))
          )}
        </div>

        {/* DEMO VIDEO */}
        {product.demo_video && (
          <div className="bg-white rounded-lg shadow p-6 mt-10">
            <h2 className="text-2xl font-bold mb-4">Product Video Demo</h2>
            <video controls className="w-full max-h-[500px] object-contain rounded">
              <source src={product.demo_video} type="video/mp4" />
            </video>
          </div>
        )}

        {/* ALL PRODUCTS BELOW DEMO VIDEO */}
        {allProducts.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {allProducts.map((p) => {
                const price = typeof p.price === "string" ? Number(p.price.replace(/[^\d.]/g, "")) : p.price;
                const oldPrice = typeof p.old_price === "string" ? Number(p.old_price.replace(/[^\d.]/g, "")) : p.old_price;

                return (
                  <div
                    key={p.id}
                    className="bg-white rounded-lg shadow-sm border p-3 hover:shadow-md transition cursor-pointer"
                    onClick={() => handleViewProduct(p.id)}
                  >
                    <div className="w-full h-40 bg-gray-100 rounded overflow-hidden">
                      <img src={p.images?.[0]?.image} className="w-full h-full object-cover" alt={p.title} />
                    </div>
                    <h3 className="mt-2 text-sm font-semibold text-gray-800 line-clamp-2">{p.title}</h3>
                    <div className="mt-1">
                      <p className="text-red-600 font-bold">₦{price?.toLocaleString()}</p>
                      {oldPrice && <p className="text-gray-400 line-through text-xs">₦{oldPrice?.toLocaleString()}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </StoreLayout>
  );
};










// import React, { useEffect, useState, useMemo } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
// import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
// import { useCart } from "../context/CartContext";
// import { ProductCard } from "./ProductCard";
// import { StoreLayout } from "../layouts/StoreLayout";

// export const ProductPage = () => {
//   const { id, slug } = useParams();
//   const productIdentifier = id || slug;
//   const navigate = useNavigate();
//   const { addToCart, cartItems } = useCart();

//   const [product, setProduct] = useState(null);
//   const [allProducts, setAllProducts] = useState([]);
//   const [reviews, setReviews] = useState([]);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [qty, setQty] = useState(1);
//   const [mainImage, setMainImage] = useState("");
//   const [imageIndex, setImageIndex] = useState(0);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [selectedVariant, setSelectedVariant] = useState(null);

//   const BASE_URL = "http://127.0.0.1:8000/store";

//   useEffect(() => {
//     if (!productIdentifier) return;

//     // Fetch product
//     axios.get(`${BASE_URL}/products/${productIdentifier}/`)
//       .then(res => {
//         const data = res.data;
//         setProduct(data);
//         const defaultVariant = data.variants?.[0] || null;
//         setSelectedVariant(defaultVariant);
//         setSelectedColor(defaultVariant?.color || null);

//         const defaultImage =
//           data.images?.find(img => img.color === defaultVariant?.color)?.image ||
//           data.images?.[0]?.image || "";
//         setMainImage(defaultImage);
//         setImageIndex(data.images?.findIndex(img => img.image === defaultImage) || 0);

//         if (data.category?.id) {
//           axios.get(`${BASE_URL}/products/?category=${data.category.id}&exclude=${data.id}`)
//             .then(r => setRelatedProducts(r.data))
//             .catch(console.error);
//         }
//       })
//       .catch(() => setProduct(null));

//     // Fetch reviews
//     axios.get(`${BASE_URL}/products/${productIdentifier}/reviews/`)
//       .then(res => setReviews(res.data.sort((a,b)=> new Date(b.date)-new Date(a.date))))
//       .catch(console.error);

//     // Fetch categories
//     axios.get(`${BASE_URL}/categories/`)
//       .then(res => setCategories(res.data))
//       .catch(console.error);

//     // Fetch all products for filtering
//     axios.get(`${BASE_URL}/products/`)
//       .then(res => setAllProducts(res.data))
//       .catch(console.error);

//   }, [productIdentifier]);

//   // ---------------- FILTER FUNCTIONS ----------------
//   const fetchBestSelling = () => setAllProducts([...allProducts].sort((a,b)=>b.sold - a.sold));
//   const fetchFiveStar = () => setAllProducts(allProducts.filter(p=>Math.round(p.average_rating)===5));
//   const fetchNewIn = () => setAllProducts([...allProducts].sort((a,b)=>new Date(b.created_at)-new Date(a.created_at)));
//   const loadCategory = (catId) => setAllProducts(allProducts.filter(p=>p.category?.id===catId));
//   const searchProducts = () => setAllProducts(allProducts.filter(p=>p.title.toLowerCase().includes(searchValue.toLowerCase())));

//   // ---------------- HELPER HOOKS ----------------
//   const extractedColors = useMemo(() => [...new Set(product?.images?.filter(img=>img.color).map(img=>img.color) || [])], [product]);
//   const thumbnails = useMemo(()=>product?.images || [], [product]);

//   const thisProductQty = useMemo(()=>{
//     if(!selectedVariant || !product) return 0;
//     return cartItems.find(item=>item.id===product.id && item.variant_id===selectedVariant?.id)?.quantity || 0;
//   }, [cartItems, product, selectedVariant]);

//   const discount = useMemo(()=>{
//     if(!selectedVariant?.old_price) return 0;
//     return Math.round(((selectedVariant.old_price-selectedVariant.price)/selectedVariant.old_price)*100);
//   }, [selectedVariant]);

//   const formatNumber = (num)=>new Intl.NumberFormat("en-NG",{minimumFractionDigits:0,maximumFractionDigits:0}).format(num);

//   const renderStars = rating=>{
//     const stars=[];
//     for(let i=1;i<=5;i++){
//       if(i<=Math.floor(rating)) stars.push(<FaStar key={i} className="text-yellow-400"/>);
//       else if(i-rating<1) stars.push(<FaStarHalfAlt key={i} className="text-yellow-400"/>);
//       else stars.push(<FaRegStar key={i} className="text-gray-300"/>);
//     }
//     return stars;
//   };

//   const handleAddToCart = ()=>{
//     if(!product) return;
//     const variant = selectedVariant || product.variants?.[0] || null;
//     const price = variant?.price ?? product.price ?? 0;
//     addToCart({
//       id: product.id,
//       title: product.title,
//       price,
//       formatted_price:"₦"+formatNumber(price),
//       image: mainImage || product.images?.[0]?.image,
//       color: variant?.color || null,
//       variant_id: variant?.id || null
//     }, qty);
//   };

//   if(!product) return <div className="text-center py-20 text-xl">Loading product...</div>;

//   return (
//     <StoreLayout
//       searchValue={searchValue}
//       setSearchValue={setSearchValue}
//       searchProducts={searchProducts}
//       categories={categories}
//       loadCategory={loadCategory}
//       fetchBestSelling={fetchBestSelling}
//       fetchFiveStar={fetchFiveStar}
//       fetchNewIn={fetchNewIn}
//       cartCount={cartItems.length}
//       logo="/logo.png"
//     >
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-10">
//           {/* LEFT GALLERY */}
//           <div className="flex gap-4 lg:w-1/2">
//             <div className="flex lg:flex-col gap-3 overflow-x-auto max-w-full">
//               {thumbnails.map((img, i) => (
//                 <div key={i} className={`relative w-20 h-20 border rounded-xl overflow-hidden cursor-pointer ${mainImage===img.image ? "border-orange-500":"border-gray-300"}`}
//                      onClick={()=>{setMainImage(img.image); setImageIndex(i)}}>
//                   <img src={img.image} alt="" className="w-full h-full object-cover rounded-lg" />
//                 </div>
//               ))}
//             </div>

//             <div className="flex-1 relative">
//               <img src={mainImage} alt="" className="w-full rounded-xl object-contain max-h-[550px]" />
//               <button onClick={()=>setImageIndex(i=>{const next=(i+1)%thumbnails.length; setMainImage(thumbnails[next].image); return next;})}
//                       className="absolute left-2 top-1/2 bg-white shadow rounded-full p-2 -translate-y-1/2">
//                 <HiChevronLeft className="text-2xl"/>
//               </button>
//               <button onClick={()=>setImageIndex(i=>{const next=(i-1+thumbnails.length)%thumbnails.length; setMainImage(thumbnails[next].image); return next;})}
//                       className="absolute right-2 top-1/2 bg-white shadow rounded-full p-2 -translate-y-1/2">
//                 <HiChevronRight className="text-2xl"/>
//               </button>
//             </div>
//           </div>

//           {/* RIGHT INFO */}
//           <div className="lg:w-1/2 space-y-6">
//             <h1 className="text-[26px] font-semibold leading-snug">{product.title}</h1>
//             <div className="flex items-center gap-4">
//               <div className="flex gap-1">{renderStars(product.average_rating)}</div>
//               <span className="text-gray-600 font-medium">{product.average_rating}</span>
//               <span className="text-gray-500">{product.sold}+ sold</span>
//             </div>

//             <div className="bg-[#fdf2e9] p-4 rounded-xl space-y-2">
//               <div className="flex items-center gap-3">
//                 <p className="text-orange-600 font-bold text-4xl">₦{formatNumber(selectedVariant?.price || product.price)}</p>
//                 {discount>0 && <span className="bg-orange-500 text-white px-2 py-1 rounded-md text-sm font-semibold">{discount}% OFF</span>}
//               </div>
//               {selectedVariant?.old_price && <p className="text-gray-500 line-through text-lg">₦{formatNumber(selectedVariant.old_price)}</p>}
//             </div>

//             {product.description && <p className="text-gray-700 leading-relaxed">{product.description}</p>}

//             {/* COLORS */}
//             {extractedColors.length>0 && (
//               <div>
//                 <p className="font-medium mb-2 text-gray-800">Color: {selectedColor || "Select"}</p>
//                 <div className="flex gap-4 flex-wrap">
//                   {extractedColors.map((color,i)=>{
//                     const variant=product.variants.find(v=>v.color===color);
//                     const variantImage=product.images.find(img=>img.color===color)?.image;
//                     return (
//                       <button key={i} className={`border rounded-xl p-1 ${selectedColor===color?"border-orange-500":"border-gray-300"}`}
//                               onClick={()=>{
//                                 setSelectedColor(color);
//                                 setSelectedVariant(variant);
//                                 const firstColorImage=product.images.find(img=>img.color===color);
//                                 if(firstColorImage){setMainImage(firstColorImage.image); const idx=thumbnails.findIndex(t=>t.image===firstColorImage.image); setImageIndex(idx>=0?idx:0);}
//                               }}>
//                         <img src={variantImage} alt="" className="w-16 h-16 object-cover rounded-lg"/>
//                       </button>
//                     )
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* QUANTITY */}
//             <div className="flex items-center gap-4 mt-3">
//               <button onClick={()=>setQty(q=>Math.max(1,q-1))} className="border px-4 py-1 rounded text-lg">-</button>
//               <span className="text-xl">{qty}</span>
//               <button onClick={()=>setQty(q=>q+1)} className="border px-4 py-1 rounded text-lg">+</button>
//               {thisProductQty>0 && <span className="text-gray-700 font-semibold">In cart: {thisProductQty}</span>}
//             </div>

//             {/* ADD TO CART */}
//             <button onClick={handleAddToCart} className="w-full bg-orange-500 text-white text-xl py-4 rounded-full font-semibold mt-4">Add to Cart</button>
//           </div>
//         </div>

//         {/* REVIEWS */}
//         <div className="mt-12 bg-white p-6 rounded-xl shadow">
//           <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
//           {reviews.length===0?<p>No reviews yet</p>:reviews.map(r=>(
//             <div key={r.id} className="border-b py-3">
//               <div className="font-bold">{r.user_name}</div>
//               <div className="flex gap-1">{renderStars(r.rating)}</div>
//               <p className="text-gray-700">{r.text}</p>
//             </div>
//           ))}
//         </div>

//         {/* DEMO VIDEO */}
//         {product.demo_video && (
//           <div className="bg-white rounded-lg shadow p-6 mt-10">
//             <h2 className="text-2xl font-bold mb-4">Product Video Demo</h2>
//             <video controls className="w-full max-h-[500px] object-contain rounded">
//               <source src={product.demo_video} type="video/mp4"/>
//             </video>
//           </div>
//         )}

//         {/* RELATED PRODUCTS */}
//         {relatedProducts.length>0 && (
//           <div className="mt-12">
//             <h2 className="text-xl font-bold mb-3">Related Products</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {relatedProducts.map(p=><ProductCard key={p.id} product={p}/>)}
//             </div>
//           </div>
//         )}

//         {/* FILTERED PRODUCTS (Best Selling / 5-Star / New In / Categories) */}
//         {allProducts.length>0 && (
//           <div className="mt-12">
//             <h2 className="text-xl font-bold mb-3">Filtered Products</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {allProducts.map(p=><ProductCard key={p.id} product={p}/>)}
//             </div>
//           </div>
//         )}
//       </div>
//     </StoreLayout>
//   )
// };