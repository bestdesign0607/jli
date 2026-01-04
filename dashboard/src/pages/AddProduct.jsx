// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function AddProduct() {
//   const BASE_URL = "http://127.0.0.1:8000/store";

//   const [form, setForm] = useState({
//     title: "",
//     slug: "",
//     description: "",
//     price: "",
//     stock: "",
//     old_price: "",
//     category: "",
//   });

//   const [categories, setCategories] = useState([]);
//   const [images, setImages] = useState([]);
//   const [demoVideo, setDemoVideo] = useState(null);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

//   const cleanNumber = (val) => {
//     const num =
//       typeof val === "string" ? Number(val.replace(/[^\d.]/g, "")) : Number(val);
//     return isNaN(num) ? 0 : num;
//   };

//   // Fetch categories
//   useEffect(() => {
//     axios
//       .get(`${BASE_URL}/categories/`)
//       .then((res) => setCategories(res.data))
//       .catch((err) => console.error("Category fetch failed:", err));
//   }, []);

//   const submit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (
//       !form.title ||
//       !form.slug ||
//       !form.description ||
//       !form.price ||
//       !form.stock ||
//       !form.category
//     ) {
//       setMessage("All fields are required");
//       return;
//     }

//     const priceValue = cleanNumber(form.price);
//     const stockValue = cleanNumber(form.stock);
//     const oldPriceValue = form.old_price ? cleanNumber(form.old_price) : undefined;

//     if (!priceValue || !stockValue) {
//       setMessage("Price & Stock must be valid numbers");
//       return;
//     }

//     setLoading(true);

//     try {
//       // Create product
//       const payload = {
//         ...form,
//         price: priceValue,
//         stock: stockValue,
//         ...(oldPriceValue && { old_price: oldPriceValue }),
//       };

//       const res = await axios.post(`${BASE_URL}/products/create/`, payload, {
//         headers: { "Content-Type": "application/json" },
//       });

//       const productId = res.data.id;

//       // Upload all images
//       if (images.length > 0) {
//         await Promise.all(
//           images.map((img) => {
//             const fd = new FormData();
//             fd.append("product", productId);
//             fd.append("image", img);
//             return axios.post(`${BASE_URL}/products/upload-image/`, fd, {
//               headers: { "Content-Type": "multipart/form-data" },
//             });
//           })
//         );
//       }

//       // Upload demo video
//       if (demoVideo) {
//         const fd = new FormData();
//         fd.append("product", productId);
//         fd.append("demo_video", demoVideo);

//         await axios.post(`${BASE_URL}/products/upload-demo-video/`, fd, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       }

//       // Reset form
//       setMessage("✅ Product created successfully!");
//       setForm({
//         title: "",
//         slug: "",
//         description: "",
//         price: "",
//         stock: "",
//         old_price: "",
//         category: "",
//       });
//       setImages([]);
//       setDemoVideo(null);
//     } catch (err) {
//       console.error("Upload failed → ", err?.response?.data ?? err);
//       setMessage(
//         "❌ Upload failed: " +
//           JSON.stringify(err?.response?.data ?? err?.message)
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full flex justify-center p-10 bg-[#f5f7fb]">
//       <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8 border border-[#003366]/20">
//         <h2 className="text-3xl font-bold mb-6 text-[#003366] tracking-wide">
//           ➕ Add New Product
//         </h2>

//         {message && (
//           <p
//             className={`mb-4 font-semibold text-center ${
//               message.includes("✅") ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {message}
//           </p>
//         )}

//         <form onSubmit={submit} className="grid grid-cols-2 gap-6">
//           <input
//             className="col-span-2 border p-3 rounded-lg shadow-sm focus:outline-[#003366]"
//             placeholder="Product Title"
//             value={form.title}
//             onChange={(e) => update("title", e.target.value)}
//           />

//           <input
//             className="border p-3 rounded-lg shadow-sm focus:outline-[#003366]"
//             placeholder="Slug"
//             value={form.slug}
//             onChange={(e) => update("slug", e.target.value)}
//           />

//           <input
//             className="border p-3 rounded-lg shadow-sm focus:outline-[#003366]"
//             placeholder="Price"
//             value={form.price}
//             onChange={(e) => update("price", e.target.value)}
//           />

//           <input
//             className="border p-3 rounded-lg shadow-sm focus:outline-[#003366]"
//             placeholder="Old Price (optional)"
//             value={form.old_price}
//             onChange={(e) => update("old_price", e.target.value)}
//           />

//           <input
//             className="border p-3 rounded-lg shadow-sm focus:outline-[#003366]"
//             placeholder="Stock"
//             value={form.stock}
//             onChange={(e) => update("stock", e.target.value)}
//           />

//           <select
//             className="border p-3 rounded-lg shadow-sm focus:outline-[#003366]"
//             value={form.category}
//             onChange={(e) => update("category", e.target.value)}
//           >
//             <option value="">Select Category</option>

//             {categories.length === 0 && (
//               <option disabled>Loading...</option>
//             )}

//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>

//           <textarea
//             className="col-span-2 border p-3 rounded-lg shadow-sm h-32 focus:outline-[#003366]"
//             placeholder="Description"
//             value={form.description}
//             onChange={(e) => update("description", e.target.value)}
//           />

//           {/* Images */}
//           <div className="col-span-2">
//             <label className="block text-sm font-semibold mb-2 text-[#003366]">
//               Upload Images
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={(e) => setImages(Array.from(e.target.files))}
//               className="border p-3 rounded-lg shadow-sm w-full"
//             />
//           </div>

//           {/* Demo Video */}
//           <div className="col-span-2">
//             <label className="block text-sm font-semibold mb-2 text-[#003366]">
//               Upload Demo Video
//             </label>
//             <input
//               type="file"
//               accept="video/*"
//               onChange={(e) => setDemoVideo(e.target.files[0])}
//               className="border p-3 rounded-lg shadow-sm w-full"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="col-span-2 bg-[#FF0000] py-4 rounded-lg shadow text-white text-xl font-bold hover:bg-red-600 transition-all disabled:opacity-50"
//           >
//             {loading ? "Saving..." : "SAVE PRODUCT"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }












// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function AddProduct() {
//   const BASE_URL = "http://127.0.0.1:8000/store";

//   const [form, setForm] = useState({
//     title: "",
//     slug: "",
//     description: "",
//     price: "",
//     stock: "",
//     old_price: "",
//     category: "",
//     colors: [], // NEW
//   });

//   const [categories, setCategories] = useState([]);
//   const [images, setImages] = useState([]);
//   const [demoVideo, setDemoVideo] = useState(null);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [colorInput, setColorInput] = useState("");

//   const update = (key, value) =>
//     setForm((prev) => ({ ...prev, [key]: value }));

//   const cleanNumber = (val) => {
//     const num =
//       typeof val === "string" ? Number(val.replace(/[^\d.]/g, "")) : Number(val);
//     return isNaN(num) ? 0 : num;
//   };

//   useEffect(() => {
//     axios
//       .get(`${BASE_URL}/categories/`)
//       .then((res) => setCategories(res.data))
//       .catch((err) => console.error("Category fetch failed:", err));
//   }, []);

//   const addColor = () => {
//     if (colorInput && !form.colors.includes(colorInput)) {
//       setForm((prev) => ({ ...prev, colors: [...prev.colors, colorInput] }));
//       setColorInput("");
//     }
//   };

//   const submit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (
//       !form.title ||
//       !form.slug ||
//       !form.description ||
//       !form.price ||
//       !form.stock ||
//       !form.category
//     ) {
//       setMessage("All fields are required");
//       return;
//     }

//     const priceValue = cleanNumber(form.price);
//     const stockValue = cleanNumber(form.stock);
//     const oldPriceValue = form.old_price ? cleanNumber(form.old_price) : undefined;

//     if (!priceValue || !stockValue) {
//       setMessage("Price & Stock must be valid numbers");
//       return;
//     }

//     setLoading(true);

//     try {
//       const payload = {
//         ...form,
//         price: priceValue,
//         stock: stockValue,
//         ...(oldPriceValue && { old_price: oldPriceValue }),
//       };

//       // CREATE PRODUCT
//       const res = await axios.post(`${BASE_URL}/products/create/`, payload, {
//         headers: { "Content-Type": "application/json" },
//       });

//       const productId = res.data.id;

//       // UPLOAD IMAGES
//       if (images.length > 0) {
//         await Promise.all(
//           images.map((img) => {
//             const fd = new FormData();
//             fd.append("product", productId);
//             fd.append("image", img);
//             return axios.post(`${BASE_URL}/products/upload-image/`, fd, {
//               headers: { "Content-Type": "multipart/form-data" },
//             });
//           })
//         );
//       }

//       // UPLOAD DEMO VIDEO
//       if (demoVideo) {
//         const fd = new FormData();
//         fd.append("product", productId);
//         fd.append("demo_video", demoVideo);
//         await axios.post(`${BASE_URL}/products/upload-demo-video/`, fd, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       }

//       setMessage("✅ Product created successfully!");
//       setForm({
//         title: "",
//         slug: "",
//         description: "",
//         price: "",
//         stock: "",
//         old_price: "",
//         category: "",
//         colors: [],
//       });
//       setImages([]);
//       setDemoVideo(null);
//       setColorInput("");
//     } catch (err) {
//       console.error("Upload failed → ", err?.response?.data ?? err);
//       setMessage(
//         "❌ Upload failed: " + JSON.stringify(err?.response?.data ?? err?.message)
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full flex justify-center p-10 bg-[#f5f7fb]">
//       <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8 border border-[#003366]/20">
//         <h2 className="text-3xl font-bold mb-6 text-[#003366] tracking-wide">
//           ➕ Add New Product
//         </h2>

//         {message && (
//           <p
//             className={`mb-4 font-semibold text-center ${
//               message.includes("✅") ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {message}
//           </p>
//         )}

//         <form onSubmit={submit} className="grid grid-cols-2 gap-6">
//           <input
//             className="col-span-2 border p-3 rounded-lg shadow-sm focus:outline-[#003366]"
//             placeholder="Product Title"
//             value={form.title}
//             onChange={(e) => update("title", e.target.value)}
//           />
//           <input
//             className="border p-3 rounded-lg shadow-sm focus:outline-[#003366]"
//             placeholder="Slug"
//             value={form.slug}
//             onChange={(e) => update("slug", e.target.value)}
//           />
//           <input
//             className="border p-3 rounded-lg shadow-sm focus:outline-[#003366]"
//             placeholder="Price"
//             value={form.price}
//             onChange={(e) => update("price", e.target.value)}
//           />
//           <input
//             className="border p-3 rounded-lg shadow-sm focus:outline-[#003366]"
//             placeholder="Old Price (optional)"
//             value={form.old_price}
//             onChange={(e) => update("old_price", e.target.value)}
//           />
//           <input
//             className="border p-3 rounded-lg shadow-sm focus:outline-[#003366]"
//             placeholder="Stock"
//             value={form.stock}
//             onChange={(e) => update("stock", e.target.value)}
//           />
//           <select
//             className="border p-3 rounded-lg shadow-sm focus:outline-[#003366]"
//             value={form.category}
//             onChange={(e) => update("category", e.target.value)}
//           >
//             <option value="">Select Category</option>
//             {categories.length === 0 && <option disabled>Loading...</option>}
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>

//           <textarea
//             className="col-span-2 border p-3 rounded-lg shadow-sm h-32 focus:outline-[#003366]"
//             placeholder="Description"
//             value={form.description}
//             onChange={(e) => update("description", e.target.value)}
//           />

//           {/* Colors */}
//           <div className="col-span-2">
//             <label className="block text-sm font-semibold mb-2 text-[#003366]">
//               Colors (optional)
//             </label>
//             <div className="flex gap-2 mb-2">
//               <input
//                 type="text"
//                 className="border p-2 rounded w-full"
//                 value={colorInput}
//                 onChange={(e) => setColorInput(e.target.value)}
//                 placeholder="Enter color name or hex"
//               />
//               <button
//                 type="button"
//                 className="bg-[#003366] text-white px-4 rounded"
//                 onClick={addColor}
//               >
//                 Add
//               </button>
//             </div>
//             <div className="flex gap-2 flex-wrap">
//               {form.colors.map((color, idx) => (
//                 <span
//                   key={idx}
//                   className="bg-gray-200 px-2 py-1 rounded-full text-sm"
//                 >
//                   {color}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Images */}
//           <div className="col-span-2">
//             <label className="block text-sm font-semibold mb-2 text-[#003366]">
//               Upload Images
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={(e) => setImages(Array.from(e.target.files))}
//               className="border p-3 rounded-lg shadow-sm w-full"
//             />
//           </div>

//           {/* Demo Video */}
//           <div className="col-span-2">
//             <label className="block text-sm font-semibold mb-2 text-[#003366]">
//               Upload Demo Video
//             </label>
//             <input
//               type="file"
//               accept="video/*"
//               onChange={(e) => setDemoVideo(e.target.files[0])}
//               className="border p-3 rounded-lg shadow-sm w-full"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="col-span-2 bg-[#FF0000] py-4 rounded-lg shadow text-white text-xl font-bold hover:bg-red-600 transition-all disabled:opacity-50"
//           >
//             {loading ? "Saving..." : "SAVE PRODUCT"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }












// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function AddProduct() {
//   const BASE_URL = "http://127.0.0.1:8000/store";

//   const [form, setForm] = useState({
//     title: "",
//     slug: "",
//     description: "",
//     price: "",
//     stock: "",
//     old_price: "",
//     flash_sale_price: "",
//     category: "",
//     colors: [],
//     is_flash_sale: false,
//     is_new: false,
//     is_featured: false,
//     badge_text: "",
//     tags: [],
//   });

//   const [categories, setCategories] = useState([]);
//   const [images, setImages] = useState([]);
//   const [demoVideo, setDemoVideo] = useState(null);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [colorInput, setColorInput] = useState("");
//   const [tagInput, setTagInput] = useState("");

//   const update = (key, value) =>
//     setForm((prev) => ({ ...prev, [key]: value }));

//   const cleanNumber = (val) => {
//     const num =
//       typeof val === "string" ? Number(val.replace(/[^\d.]/g, "")) : Number(val);
//     return isNaN(num) ? 0 : num;
//   };

//   // AUTO-GENERATE SLUG FROM TITLE
//   const autoSlug = (text) =>
//     text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

//   useEffect(() => {
//     axios
//       .get(`${BASE_URL}/categories/`)
//       .then((res) => setCategories(res.data))
//       .catch((err) => console.error("Category fetch failed:", err));
//   }, []);

//   const addColor = () => {
//     if (colorInput && !form.colors.includes(colorInput)) {
//       setForm((prev) => ({ ...prev, colors: [...prev.colors, colorInput] }));
//       setColorInput("");
//     }
//   };

//   const addTag = () => {
//     if (tagInput && !form.tags.includes(tagInput)) {
//       setForm((prev) => ({ ...prev, tags: [...prev.tags, tagInput] }));
//       setTagInput("");
//     }
//   };

//   // SUBMIT PRODUCT
//   const submit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (
//       !form.title ||
//       !form.slug ||
//       !form.description ||
//       !form.price ||
//       !form.stock ||
//       !form.category
//     ) {
//       setMessage("All fields are required");
//       return;
//     }

//     const priceValue = cleanNumber(form.price);
//     const stockValue = cleanNumber(form.stock);
//     const oldPriceValue = form.old_price ? cleanNumber(form.old_price) : undefined;
//     const flashSaleValue = form.flash_sale_price
//       ? cleanNumber(form.flash_sale_price)
//       : undefined;

//     if (!priceValue || !stockValue) {
//       setMessage("Price & Stock must be valid numbers");
//       return;
//     }

//     setLoading(true);

//     try {
//       const payload = {
//         ...form,
//         price: priceValue,
//         stock: stockValue,
//         ...(oldPriceValue && { old_price: oldPriceValue }),
//         ...(flashSaleValue && { flash_sale_price: flashSaleValue }),
//       };

//       // CREATE PRODUCT
//       const res = await axios.post(`${BASE_URL}/products/create/`, payload, {
//         headers: { "Content-Type": "application/json" },
//       });

//       const productId = res.data.id;

//       // UPLOAD IMAGES
//       if (images.length > 0) {
//         await Promise.all(
//           images.map((img) => {
//             const fd = new FormData();
//             fd.append("product", productId);
//             fd.append("image", img);
//             return axios.post(`${BASE_URL}/products/upload-image/`, fd, {
//               headers: { "Content-Type": "multipart/form-data" },
//             });
//           })
//         );
//       }

//       // UPLOAD DEMO VIDEO
//       if (demoVideo) {
//         const fd = new FormData();
//         fd.append("product", productId);
//         fd.append("demo_video", demoVideo);
//         await axios.post(`${BASE_URL}/products/upload-demo-video/`, fd, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       }

//       setMessage("✅ Product created successfully!");
//       setForm({
//         title: "",
//         slug: "",
//         description: "",
//         price: "",
//         stock: "",
//         old_price: "",
//         flash_sale_price: "",
//         category: "",
//         colors: [],
//         is_flash_sale: false,
//         is_new: false,
//         is_featured: false,
//         badge_text: "",
//         tags: [],
//       });
//       setImages([]);
//       setDemoVideo(null);
//       setColorInput("");
//       setTagInput("");
//     } catch (err) {
//       console.error("Upload failed → ", err?.response?.data ?? err);
//       setMessage(
//         "❌ Upload failed: " + JSON.stringify(err?.response?.data ?? err?.message)
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full flex justify-center p-10 bg-[#f5f7fb]">
//       <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8 border border-[#003366]/20">
//         <h2 className="text-3xl font-bold mb-6 text-[#003366] tracking-wide">
//           ➕ Add New Product
//         </h2>

//         {message && (
//           <p
//             className={`mb-4 font-semibold text-center ${
//               message.includes("✅") ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {message}
//           </p>
//         )}

//         <form onSubmit={submit} className="grid grid-cols-2 gap-6">

//           {/* Title */}
//           <input
//             className="col-span-2 border p-3 rounded-lg shadow-sm"
//             placeholder="Product Title"
//             value={form.title}
//             onChange={(e) => {
//               update("title", e.target.value);
//               update("slug", autoSlug(e.target.value));
//             }}
//           />

//           {/* Slug */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Slug"
//             value={form.slug}
//             onChange={(e) => update("slug", autoSlug(e.target.value))}
//           />

//           {/* Price */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Price"
//             value={form.price}
//             onChange={(e) => update("price", e.target.value)}
//           />

//           {/* Old Price */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Old Price (optional)"
//             value={form.old_price}
//             onChange={(e) => update("old_price", e.target.value)}
//           />

//           {/* Flash Sale Price */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Flash Sale Price"
//             value={form.flash_sale_price}
//             onChange={(e) => update("flash_sale_price", e.target.value)}
//           />

//           {/* Stock */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Stock"
//             value={form.stock}
//             onChange={(e) => update("stock", e.target.value)}
//           />

//           {/* Category */}
//           <select
//             className="border p-3 rounded-lg shadow-sm"
//             value={form.category}
//             onChange={(e) => update("category", e.target.value)}
//           >
//             <option value="">Select Category</option>
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>

//           {/* Badges */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Badge Text (e.g., NEW, HOT, -50%)"
//             value={form.badge_text}
//             onChange={(e) => update("badge_text", e.target.value)}
//           />

//           {/* Flags */}
//           <div className="col-span-2 flex gap-6">
//             <label>
//               <input
//                 type="checkbox"
//                 checked={form.is_flash_sale}
//                 onChange={(e) => update("is_flash_sale", e.target.checked)}
//               />{" "}
//               Flash Sale
//             </label>

//             <label>
//               <input
//                 type="checkbox"
//                 checked={form.is_new}
//                 onChange={(e) => update("is_new", e.target.checked)}
//               />{" "}
//               New Arrival
//             </label>

//             <label>
//               <input
//                 type="checkbox"
//                 checked={form.is_featured}
//                 onChange={(e) => update("is_featured", e.target.checked)}
//               />{" "}
//               Featured
//             </label>
//           </div>

//           {/* Description */}
//           <textarea
//             className="col-span-2 border p-3 rounded-lg shadow-sm h-32"
//             placeholder="Description"
//             value={form.description}
//             onChange={(e) => update("description", e.target.value)}
//           />

//           {/* Colors */}
//           <div className="col-span-2">
//             <label className="block text-sm font-semibold mb-2 text-[#003366]">
//               Colors
//             </label>
//             <div className="flex gap-2 mb-2">
//               <input
//                 className="border p-2 rounded w-full"
//                 value={colorInput}
//                 onChange={(e) => setColorInput(e.target.value)}
//                 placeholder="Enter color name or hex"
//               />
//               <button
//                 type="button"
//                 className="bg-[#003366] text-white px-4 rounded"
//                 onClick={addColor}
//               >
//                 Add
//               </button>
//             </div>

//             <div className="flex gap-2 flex-wrap">
//               {form.colors.map((color, idx) => (
//                 <span key={idx} className="bg-gray-200 px-2 py-1 rounded">
//                   {color}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Tags */}
//           <div className="col-span-2">
//             <label className="block text-sm font-semibold mb-2 text-[#003366]">
//               Tags
//             </label>
//             <div className="flex gap-2 mb-2">
//               <input
//                 className="border p-2 rounded w-full"
//                 value={tagInput}
//                 onChange={(e) => setTagInput(e.target.value)}
//                 placeholder="Enter tag"
//               />
//               <button
//                 type="button"
//                 className="bg-[#003366] text-white px-4 rounded"
//                 onClick={addTag}
//               >
//                 Add
//               </button>
//             </div>

//             <div className="flex gap-2 flex-wrap">
//               {form.tags.map((tag, idx) => (
//                 <span key={idx} className="bg-blue-200 px-2 py-1 rounded">
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Images */}
//           <div className="col-span-2">
//             <label className="font-semibold text-[#003366] block mb-2">
//               Upload Images
//             </label>
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={(e) => setImages(Array.from(e.target.files))}
//               className="border p-3 w-full rounded"
//             />
//           </div>

//           {/* Demo Video */}
//           <div className="col-span-2">
//             <label className="font-semibold text-[#003366] block mb-2">
//               Upload Demo Video
//             </label>
//             <input
//               type="file"
//               accept="video/*"
//               onChange={(e) => setDemoVideo(e.target.files[0])}
//               className="border p-3 w-full rounded"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="col-span-2 bg-red-600 py-4 rounded-lg text-white text-lg font-bold hover:bg-red-700 transition"
//           >
//             {loading ? "Saving..." : "SAVE PRODUCT"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }












// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function AddProduct() {
//   const BASE_URL = "http://127.0.0.1:8000/store";

//   const [form, setForm] = useState({
//     title: "",
//     slug: "",
//     description: "",
//     price: "",
//     stock: "",
//     old_price: "",
//     flash_sale_price: "",
//     category: "",
//     colors: [],
//     is_flash_sale: false,
//     is_new: false,
//     is_featured: false,
//     badge_text: "",
//     tags: [],
//   });

//   const [categories, setCategories] = useState([]);
//   const [images, setImages] = useState([]);
//   const [demoVideo, setDemoVideo] = useState(null);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [colorInput, setColorInput] = useState("");
//   const [tagInput, setTagInput] = useState("");

//   const update = (key, value) =>
//     setForm((prev) => ({ ...prev, [key]: value }));

//   const cleanNumber = (val) => {
//     const num =
//       typeof val === "string" ? Number(val.replace(/[^\d.]/g, "")) : Number(val);
//     return isNaN(num) ? 0 : num;
//   };

//   const autoSlug = (text) =>
//     text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

//   useEffect(() => {
//     axios
//       .get(`${BASE_URL}/categories/`)
//       .then((res) => setCategories(res.data))
//       .catch((err) => console.error("Category fetch failed:", err));
//   }, []);

//   const addColor = () => {
//     if (colorInput && !form.colors.includes(colorInput)) {
//       setForm((prev) => ({ ...prev, colors: [...prev.colors, colorInput] }));
//       setColorInput("");
//     }
//   };

//   const addTag = () => {
//     if (tagInput && !form.tags.includes(tagInput)) {
//       setForm((prev) => ({ ...prev, tags: [...prev.tags, tagInput] }));
//       setTagInput("");
//     }
//   };

//   // SUBMIT PRODUCT — FIXED WITH FORMDATA
//   const submit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (
//       !form.title ||
//       !form.slug ||
//       !form.description ||
//       !form.price ||
//       !form.stock ||
//       !form.category
//     ) {
//       setMessage("All fields are required");
//       return;
//     }

//     const priceValue = cleanNumber(form.price);
//     const stockValue = cleanNumber(form.stock);
//     const oldPriceValue = form.old_price ? cleanNumber(form.old_price) : "";
//     const flashSaleValue = form.flash_sale_price
//       ? cleanNumber(form.flash_sale_price)
//       : "";

//     if (!priceValue || !stockValue) {
//       setMessage("Price & Stock must be valid numbers");
//       return;
//     }

//     setLoading(true);

//     try {
//       // 🔥🔥🔥 USE FORMDATA HERE (Fixes 415 Unsupported Media Type)
//       const fd = new FormData();
//       fd.append("title", form.title);
//       fd.append("slug", form.slug);
//       fd.append("description", form.description);
//       fd.append("price", priceValue);
//       fd.append("stock", stockValue);
//       fd.append("category", form.category);
//       fd.append("is_flash_sale", form.is_flash_sale);
//       fd.append("is_new", form.is_new);
//       fd.append("is_featured", form.is_featured);
//       fd.append("badge_text", form.badge_text);

//       if (oldPriceValue) fd.append("old_price", oldPriceValue);
//       if (flashSaleValue) fd.append("flash_sale_price", flashSaleValue);

//       // Convert arrays → JSON strings
//       fd.append("colors", JSON.stringify(form.colors));
//       fd.append("tags", JSON.stringify(form.tags));

//       // CREATE PRODUCT
//       const res = await axios.post(`${BASE_URL}/products/create/`, fd, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       const productId = res.data.id;

//       // UPLOAD IMAGES
//       if (images.length > 0) {
//         await Promise.all(
//           images.map((img) => {
//             const imgFD = new FormData();
//             imgFD.append("product", productId);
//             imgFD.append("image", img);
//             return axios.post(`${BASE_URL}/products/upload-image/`, imgFD, {
//               headers: { "Content-Type": "multipart/form-data" },
//             });
//           })
//         );
//       }

//       // UPLOAD VIDEO
//       if (demoVideo) {
//         const videoFD = new FormData();
//         videoFD.append("product", productId);
//         videoFD.append("demo_video", demoVideo);
//         await axios.post(`${BASE_URL}/products/upload-demo-video/`, videoFD, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       }

//       setMessage("✅ Product created successfully!");
//       setForm({
//         title: "",
//         slug: "",
//         description: "",
//         price: "",
//         stock: "",
//         old_price: "",
//         flash_sale_price: "",
//         category: "",
//         colors: [],
//         is_flash_sale: false,
//         is_new: false,
//         is_featured: false,
//         badge_text: "",
//         tags: [],
//       });
//       setImages([]);
//       setDemoVideo(null);
//     } catch (err) {
//       console.error("Upload failed → ", err?.response?.data ?? err);
//       setMessage(
//         "❌ Upload failed: " + JSON.stringify(err?.response?.data ?? err?.message)
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full flex justify-center p-10 bg-[#f5f7fb]">
//       <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8 border border-[#003366]/20">
//         <h2 className="text-3xl font-bold mb-6 text-[#003366] tracking-wide">
//           ➕ Add New Product
//         </h2>

//         {message && (
//           <p
//             className={`mb-4 font-semibold text-center ${
//               message.includes("✅") ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {message}
//           </p>
//         )}

//         {/* FORM UI - UNCHANGED */}
//         <form onSubmit={submit} className="grid grid-cols-2 gap-6">
//           {/* Title */}
//           <input
//             className="col-span-2 border p-3 rounded-lg shadow-sm"
//             placeholder="Product Title"
//             value={form.title}
//             onChange={(e) => {
//               update("title", e.target.value);
//               update("slug", autoSlug(e.target.value));
//             }}
//           />

//           {/* Slug */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Slug"
//             value={form.slug}
//             onChange={(e) => update("slug", autoSlug(e.target.value))}
//           />

//           {/* Price */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Price"
//             value={form.price}
//             onChange={(e) => update("price", e.target.value)}
//           />

//           {/* Old Price */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Old Price (optional)"
//             value={form.old_price}
//             onChange={(e) => update("old_price", e.target.value)}
//           />

//           {/* Flash Sale Price */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Flash Sale Price"
//             value={form.flash_sale_price}
//             onChange={(e) => update("flash_sale_price", e.target.value)}
//           />

//           {/* Stock */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Stock"
//             value={form.stock}
//             onChange={(e) => update("stock", e.target.value)}
//           />

//           {/* Category */}
//           <select
//             className="border p-3 rounded-lg shadow-sm"
//             value={form.category}
//             onChange={(e) => update("category", e.target.value)}
//           >
//             <option value="">Select Category</option>
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>

//           {/* Badges */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Badge Text (e.g., NEW, HOT, -50%)"
//             value={form.badge_text}
//             onChange={(e) => update("badge_text", e.target.value)}
//           />

//           {/* Flags */}
//           <div className="col-span-2 flex gap-6">
//             <label>
//               <input
//                 type="checkbox"
//                 checked={form.is_flash_sale}
//                 onChange={(e) => update("is_flash_sale", e.target.checked)}
//               />{" "}
//               Flash Sale
//             </label>

//             <label>
//               <input
//                 type="checkbox"
//                 checked={form.is_new}
//                 onChange={(e) => update("is_new", e.target.checked)}
//               />{" "}
//               New Arrival
//             </label>

//             <label>
//               <input
//                 type="checkbox"
//                 checked={form.is_featured}
//                 onChange={(e) => update("is_featured", e.target.checked)}
//               />{" "}
//               Featured
//             </label>
//           </div>

//           {/* Description */}
//           <textarea
//             className="col-span-2 border p-3 rounded-lg shadow-sm h-32"
//             placeholder="Description"
//             value={form.description}
//             onChange={(e) => update("description", e.target.value)}
//           />

//           {/* Colors */}
//           <div className="col-span-2">
//             <label className="block text-sm font-semibold mb-2 text-[#003366]">
//               Colors
//             </label>
//             <div className="flex gap-2 mb-2">
//               <input
//                 className="border p-2 rounded w-full"
//                 value={colorInput}
//                 onChange={(e) => setColorInput(e.target.value)}
//                 placeholder="Enter color name or hex"
//               />
//               <button
//                 type="button"
//                 className="bg-[#003366] text-white px-4 rounded"
//                 onClick={addColor}
//               >
//                 Add
//               </button>
//             </div>

//             <div className="flex gap-2 flex-wrap">
//               {form.colors.map((color, idx) => (
//                 <span key={idx} className="bg-gray-200 px-2 py-1 rounded">
//                   {color}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Tags */}
//           <div className="col-span-2">
//             <label className="block text-sm font-semibold mb-2 text-[#003366]">
//               Tags
//             </label>
//             <div className="flex gap-2 mb-2">
//               <input
//                 className="border p-2 rounded w-full"
//                 value={tagInput}
//                 onChange={(e) => setTagInput(e.target.value)}
//                 placeholder="Enter tag"
//               />
//               <button
//                 type="button"
//                 className="bg-[#003366] text-white px-4 rounded"
//                 onClick={addTag}
//               >
//                 Add
//               </button>
//             </div>

//             <div className="flex gap-2 flex-wrap">
//               {form.tags.map((tag, idx) => (
//                 <span key={idx} className="bg-blue-200 px-2 py-1 rounded">
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Images */}
//           <div className="col-span-2">
//             <label className="font-semibold text-[#003366] block mb-2">
//               Upload Images
//             </label>
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={(e) => setImages(Array.from(e.target.files))}
//               className="border p-3 w-full rounded"
//             />
//           </div>

//           {/* Demo Video */}
//           <div className="col-span-2">
//             <label className="font-semibold text-[#003366] block mb-2">
//               Upload Demo Video
//             </label>
//             <input
//               type="file"
//               accept="video/*"
//               onChange={(e) => setDemoVideo(e.target.files[0])}
//               className="border p-3 w-full rounded"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="col-span-2 bg-red-600 py-4 rounded-lg text-white text-lg font-bold hover:bg-red-700 transition"
//           >
//             {loading ? "Saving..." : "SAVE PRODUCT"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }














// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function AddProduct() {
//   const BASE_URL = "http://127.0.0.1:8000/store";

//   const [form, setForm] = useState({
//     title: "",
//     slug: "",
//     description: "",
//     price: "",
//     stock: "",
//     old_price: "",
//     flash_sale_price: "",
//     category: "",
//     colors: [],
//     is_flash_sale: false,
//     is_new: false,
//     is_featured: false,
//     badge_text: "",
//     tags: [],
//   });

//   const [categories, setCategories] = useState([]);
//   const [images, setImages] = useState([]); // normal images
//   const [demoVideo, setDemoVideo] = useState(null);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [colorInput, setColorInput] = useState("");
//   const [tagInput, setTagInput] = useState("");

//   const update = (key, value) =>
//     setForm((prev) => ({ ...prev, [key]: value }));

//   const cleanNumber = (val) => {
//     const num =
//       typeof val === "string" ? Number(val.replace(/[^\d.]/g, "")) : Number(val);
//     return isNaN(num) ? 0 : num;
//   };

//   const autoSlug = (text) =>
//     text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

//   // FETCH CATEGORIES
//   useEffect(() => {
//     axios
//       .get(`${BASE_URL}/categories/`)
//       .then((res) => setCategories(res.data))
//       .catch((err) => console.error("Category fetch failed:", err));
//   }, []);

//   // ADD COLOR
//   const addColor = () => {
//     if (colorInput.trim() !== "" && !form.colors.includes(colorInput)) {
//       update("colors", [...form.colors, colorInput]);
//       setColorInput("");
//     }
//   };

//   // ADD TAG
//   const addTag = () => {
//     if (tagInput.trim() !== "" && !form.tags.includes(tagInput)) {
//       update("tags", [...form.tags, tagInput]);
//       setTagInput("");
//     }
//   };

//   // SUBMIT PRODUCT
//   const submit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (
//       !form.title ||
//       !form.slug ||
//       !form.description ||
//       !form.price ||
//       !form.stock ||
//       !form.category
//     ) {
//       setMessage("All fields are required");
//       return;
//     }

//     const priceValue = cleanNumber(form.price);
//     const stockValue = cleanNumber(form.stock);
//     const oldPriceValue = form.old_price ? cleanNumber(form.old_price) : "";
//     const flashSaleValue = form.flash_sale_price
//       ? cleanNumber(form.flash_sale_price)
//       : "";

//     if (!priceValue || !stockValue) {
//       setMessage("Price & Stock must be valid numbers");
//       return;
//     }

//     setLoading(true);

//     try {
//       // FORM DATA TO CREATE PRODUCT
//       const fd = new FormData();
//       fd.append("title", form.title);
//       fd.append("slug", form.slug);
//       fd.append("description", form.description);
//       fd.append("price", priceValue);
//       fd.append("stock", stockValue);
//       fd.append("category", form.category);
//       fd.append("is_flash_sale", form.is_flash_sale);
//       fd.append("is_new", form.is_new);
//       fd.append("is_featured", form.is_featured);
//       fd.append("badge_text", form.badge_text);

//       if (oldPriceValue) fd.append("old_price", oldPriceValue);
//       if (flashSaleValue) fd.append("flash_sale_price", flashSaleValue);

//       // arrays → JSON
//       fd.append("colors", JSON.stringify(form.colors));
//       fd.append("tags", JSON.stringify(form.tags));

//       // 1️⃣ CREATE PRODUCT
//       const res = await axios.post(`${BASE_URL}/products/create/`, fd, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       const productId = res.data.id;

//       // 2️⃣ UPLOAD IMAGES
//       if (images.length > 0) {
//         await Promise.all(
//           images.map((img) => {
//             const imgFD = new FormData();
//             imgFD.append("product", productId);
//             imgFD.append("image", img);
//             return axios.post(`${BASE_URL}/products/upload-image/`, imgFD, {
//               headers: { "Content-Type": "multipart/form-data" },
//             });
//           })
//         );
//       }

//       // 3️⃣ UPLOAD DEMO VIDEO
//       if (demoVideo) {
//         const videoFD = new FormData();
//         videoFD.append("product", productId);
//         videoFD.append("demo_video", demoVideo);

//         await axios.post(`${BASE_URL}/products/upload-demo-video/`, videoFD, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       }

//       // RESET ALL
//       setMessage("✅ Product created successfully!");

//       setForm({
//         title: "",
//         slug: "",
//         description: "",
//         price: "",
//         stock: "",
//         old_price: "",
//         flash_sale_price: "",
//         category: "",
//         colors: [],
//         is_flash_sale: false,
//         is_new: false,
//         is_featured: false,
//         badge_text: "",
//         tags: [],
//       });

//       setImages([]);
//       setDemoVideo(null);
//     } catch (err) {
//       console.error("Upload failed → ", err?.response?.data ?? err);
//       setMessage(
//         "❌ Upload failed: " + JSON.stringify(err?.response?.data ?? err?.message)
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full flex justify-center p-10 bg-[#f5f7fb]">
//       <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8 border border-[#003366]/20">
//         <h2 className="text-3xl font-bold mb-6 text-[#003366] tracking-wide">
//           ➕ Add New Product
//         </h2>

//         {message && (
//           <p
//             className={`mb-4 font-semibold text-center ${
//               message.includes("✅") ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {message}
//           </p>
//         )}

//         <form onSubmit={submit} className="grid grid-cols-2 gap-6">
//           {/* Title */}
//           <input
//             className="col-span-2 border p-3 rounded-lg shadow-sm"
//             placeholder="Product Title"
//             value={form.title}
//             onChange={(e) => {
//               update("title", e.target.value);
//               update("slug", autoSlug(e.target.value));
//             }}
//           />

//           {/* Slug */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Slug"
//             value={form.slug}
//             onChange={(e) => update("slug", autoSlug(e.target.value))}
//           />

//           {/* Price */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Price"
//             value={form.price}
//             onChange={(e) => update("price", e.target.value)}
//           />

//           {/* Old Price */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Old Price (optional)"
//             value={form.old_price}
//             onChange={(e) => update("old_price", e.target.value)}
//           />

//           {/* Flash Sale Price */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Flash Sale Price"
//             value={form.flash_sale_price}
//             onChange={(e) => update("flash_sale_price", e.target.value)}
//           />

//           {/* Stock */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Stock"
//             value={form.stock}
//             onChange={(e) => update("stock", e.target.value)}
//           />

//           {/* Category */}
//           <select
//             className="border p-3 rounded-lg shadow-sm"
//             value={form.category}
//             onChange={(e) => update("category", e.target.value)}
//           >
//             <option value="">Select Category</option>
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>

//           {/* Badge */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Badge Text (e.g., NEW, HOT, -50%)"
//             value={form.badge_text}
//             onChange={(e) => update("badge_text", e.target.value)}
//           />

//           {/* Flags */}
//           <div className="col-span-2 flex gap-6">
//             <label>
//               <input
//                 type="checkbox"
//                 checked={form.is_flash_sale}
//                 onChange={(e) =>
//                   update("is_flash_sale", e.target.checked)
//                 }
//               />{" "}
//               Flash Sale
//             </label>

//             <label>
//               <input
//                 type="checkbox"
//                 checked={form.is_new}
//                 onChange={(e) => update("is_new", e.target.checked)}
//               />{" "}
//               New Arrival
//             </label>

//             <label>
//               <input
//                 type="checkbox"
//                 checked={form.is_featured}
//                 onChange={(e) => update("is_featured", e.target.checked)}
//               />{" "}
//               Featured
//             </label>
//           </div>

//           {/* Description */}
//           <textarea
//             className="col-span-2 border p-3 rounded-lg shadow-sm h-32"
//             placeholder="Description"
//             value={form.description}
//             onChange={(e) => update("description", e.target.value)}
//           />

//           {/* Colors */}
//           <div className="col-span-2">
//             <label className="text-sm font-semibold text-[#003366]">
//               Colors
//             </label>
//             <div className="flex gap-2 mb-2">
//               <input
//                 className="border p-2 rounded w-full"
//                 value={colorInput}
//                 onChange={(e) => setColorInput(e.target.value)}
//                 placeholder="Enter color name or hex value"
//               />
//               <button
//                 type="button"
//                 onClick={addColor}
//                 className="bg-[#003366] text-white px-4 rounded"
//               >
//                 Add
//               </button>
//             </div>

//             <div className="flex flex-wrap gap-2">
//               {form.colors.map((c, i) => (
//                 <span key={i} className="bg-gray-200 px-2 py-1 rounded">
//                   {c}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Tags */}
//           <div className="col-span-2">
//             <label className="text-sm font-semibold text-[#003366]">
//               Tags
//             </label>
//             <div className="flex gap-2 mb-2">
//               <input
//                 className="border p-2 rounded w-full"
//                 value={tagInput}
//                 onChange={(e) => setTagInput(e.target.value)}
//                 placeholder="Enter tag"
//               />
//               <button
//                 type="button"
//                 onClick={addTag}
//                 className="bg-[#003366] text-white px-4 rounded"
//               >
//                 Add
//               </button>
//             </div>

//             <div className="flex flex-wrap gap-2">
//               {form.tags.map((t, i) => (
//                 <span key={i} className="bg-blue-200 px-2 py-1 rounded">
//                   {t}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Images */}
//           <div className="col-span-2">
//             <label className="font-semibold text-[#003366] block mb-2">
//               Upload Product Images
//             </label>
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={(e) => setImages(Array.from(e.target.files))}
//               className="border p-3 rounded w-full"
//             />
//           </div>

//           {/* Demo Video */}
//           <div className="col-span-2">
//             <label className="font-semibold text-[#003366] block mb-2">
//               Upload Demo Video
//             </label>
//             <input
//               type="file"
//               accept="video/*"
//               onChange={(e) => setDemoVideo(e.target.files[0])}
//               className="border p-3 rounded w-full"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="col-span-2 bg-red-600 py-4 rounded-lg text-white text-lg font-bold hover:bg-red-700 transition"
//           >
//             {loading ? "Saving..." : "SAVE PRODUCT"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }















// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function AddProduct() {
//   const BASE_URL = "http://127.0.0.1:8000/store";

//   const [form, setForm] = useState({
//     title: "",
//     slug: "",
//     description: "",
//     price: "",
//     stock: "",
//     old_price: "",
//     flash_sale_price: "",
//     category: "",
//     colors: [],
//     is_flash_sale: false,
//     is_new: false,
//     is_featured: false,
//     badge_text: "",
//     tags: [],
//   });

//   const [categories, setCategories] = useState([]);
//   const [images, setImages] = useState([]); // general thumbnails
//   const [variantImages, setVariantImages] = useState({}); // { colorName: [File, File] }
//   const [demoVideo, setDemoVideo] = useState(null);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [colorInput, setColorInput] = useState("");
//   const [tagInput, setTagInput] = useState("");

//   const update = (key, value) =>
//     setForm((prev) => ({ ...prev, [key]: value }));

//   const cleanNumber = (val) => {
//     const num =
//       typeof val === "string" ? Number(val.replace(/[^\d.]/g, "")) : Number(val);
//     return isNaN(num) ? 0 : num;
//   };

//   const autoSlug = (text) =>
//     text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

//   // FETCH CATEGORIES
//   useEffect(() => {
//     axios
//       .get(`${BASE_URL}/categories/`)
//       .then((res) => setCategories(res.data))
//       .catch((err) => console.error("Category fetch failed:", err));
//   }, []);

//   // ADD COLOR
//   const addColor = () => {
//     if (colorInput.trim() !== "" && !form.colors.includes(colorInput)) {
//       update("colors", [...form.colors, colorInput]);
//       setColorInput("");
//     }
//   };

//   // ADD TAG
//   const addTag = () => {
//     if (tagInput.trim() !== "" && !form.tags.includes(tagInput)) {
//       update("tags", [...form.tags, tagInput]);
//       setTagInput("");
//     }
//   };

//   // HANDLE VARIANT IMAGE UPLOAD
//   const handleVariantImages = (color, files) => {
//     setVariantImages((prev) => ({
//       ...prev,
//       [color]: Array.from(files),
//     }));
//   };

//   // SUBMIT PRODUCT
//   const submit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (
//       !form.title ||
//       !form.slug ||
//       !form.description ||
//       !form.price ||
//       !form.stock ||
//       !form.category
//     ) {
//       setMessage("All required fields must be filled");
//       return;
//     }

//     const priceValue = cleanNumber(form.price);
//     const stockValue = cleanNumber(form.stock);
//     const oldPriceValue = form.old_price ? cleanNumber(form.old_price) : "";
//     const flashSaleValue = form.flash_sale_price
//       ? cleanNumber(form.flash_sale_price)
//       : "";

//     if (!priceValue || !stockValue) {
//       setMessage("Price & Stock must be valid numbers");
//       return;
//     }

//     setLoading(true);

//     try {
//       // CREATE PRODUCT
//       const fd = new FormData();
//       fd.append("title", form.title);
//       fd.append("slug", form.slug);
//       fd.append("description", form.description);
//       fd.append("price", priceValue);
//       fd.append("stock", stockValue);
//       fd.append("category", form.category);
//       fd.append("is_flash_sale", form.is_flash_sale);
//       fd.append("is_new", form.is_new);
//       fd.append("is_featured", form.is_featured);
//       fd.append("badge_text", form.badge_text);

//       if (oldPriceValue) fd.append("old_price", oldPriceValue);
//       if (flashSaleValue) fd.append("flash_sale_price", flashSaleValue);

//       fd.append("colors", JSON.stringify(form.colors));
//       fd.append("tags", JSON.stringify(form.tags));

//       const res = await axios.post(`${BASE_URL}/products/create/`, fd, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       const productId = res.data.id;

//       // UPLOAD GENERAL THUMBNAIL IMAGES
//       if (images.length > 0) {
//         await Promise.all(
//           images.map((img) => {
//             const imgFD = new FormData();
//             imgFD.append("product", productId);
//             imgFD.append("image", img);
//             return axios.post(`${BASE_URL}/products/upload-image/`, imgFD, {
//               headers: { "Content-Type": "multipart/form-data" },
//             });
//           })
//         );
//       }

//       // UPLOAD VARIANT-COLORED IMAGES
//       for (const color of Object.keys(variantImages)) {
//         const files = variantImages[color];
//         await Promise.all(
//           files.map((file) => {
//             const imgFD = new FormData();
//             imgFD.append("product", productId);
//             imgFD.append("image", file);
//             imgFD.append("color", color);
//             return axios.post(`${BASE_URL}/products/upload-image/`, imgFD, {
//               headers: { "Content-Type": "multipart/form-data" },
//             });
//           })
//         );
//       }

//       // UPLOAD DEMO VIDEO
//       if (demoVideo) {
//         const videoFD = new FormData();
//         videoFD.append("product", productId);
//         videoFD.append("demo_video", demoVideo);

//         await axios.post(`${BASE_URL}/products/upload-demo-video/`, videoFD, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       }

//       // RESET FORM
//       setMessage("✅ Product created successfully!");
//       setForm({
//         title: "",
//         slug: "",
//         description: "",
//         price: "",
//         stock: "",
//         old_price: "",
//         flash_sale_price: "",
//         category: "",
//         colors: [],
//         is_flash_sale: false,
//         is_new: false,
//         is_featured: false,
//         badge_text: "",
//         tags: [],
//       });
//       setImages([]);
//       setVariantImages({});
//       setDemoVideo(null);
//       setColorInput("");
//       setTagInput("");
//     } catch (err) {
//       console.error("Upload failed → ", err?.response?.data ?? err);
//       setMessage(
//         "❌ Upload failed: " + JSON.stringify(err?.response?.data ?? err?.message)
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full flex justify-center p-10 bg-[#f5f7fb]">
//       <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8 border border-[#003366]/20">
//         <h2 className="text-3xl font-bold mb-6 text-[#003366] tracking-wide">
//           ➕ Add New Product
//         </h2>

//         {message && (
//           <p
//             className={`mb-4 font-semibold text-center ${
//               message.includes("✅") ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {message}
//           </p>
//         )}

//         <form onSubmit={submit} className="grid grid-cols-2 gap-6">
//           {/* Title */}
//           <input
//             className="col-span-2 border p-3 rounded-lg shadow-sm"
//             placeholder="Product Title"
//             value={form.title}
//             onChange={(e) => {
//               update("title", e.target.value);
//               update("slug", autoSlug(e.target.value));
//             }}
//           />

//           {/* Slug */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Slug"
//             value={form.slug}
//             onChange={(e) => update("slug", autoSlug(e.target.value))}
//           />

//           {/* Price */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Price"
//             value={form.price}
//             onChange={(e) => update("price", e.target.value)}
//           />

//           {/* Old Price */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Old Price (optional)"
//             value={form.old_price}
//             onChange={(e) => update("old_price", e.target.value)}
//           />

//           {/* Flash Sale Price */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Flash Sale Price"
//             value={form.flash_sale_price}
//             onChange={(e) => update("flash_sale_price", e.target.value)}
//           />

//           {/* Stock */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Stock"
//             value={form.stock}
//             onChange={(e) => update("stock", e.target.value)}
//           />

//           {/* Category */}
//           <select
//             className="border p-3 rounded-lg shadow-sm"
//             value={form.category}
//             onChange={(e) => update("category", e.target.value)}
//           >
//             <option value="">Select Category</option>
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>

//           {/* Badge */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Badge Text (e.g., NEW, HOT, -50%)"
//             value={form.badge_text}
//             onChange={(e) => update("badge_text", e.target.value)}
//           />

//           {/* Flags */}
//           <div className="col-span-2 flex gap-6">
//             <label>
//               <input
//                 type="checkbox"
//                 checked={form.is_flash_sale}
//                 onChange={(e) => update("is_flash_sale", e.target.checked)}
//               />{" "}
//               Flash Sale
//             </label>

//             <label>
//               <input
//                 type="checkbox"
//                 checked={form.is_new}
//                 onChange={(e) => update("is_new", e.target.checked)}
//               />{" "}
//               New Arrival
//             </label>

//             <label>
//               <input
//                 type="checkbox"
//                 checked={form.is_featured}
//                 onChange={(e) => update("is_featured", e.target.checked)}
//               />{" "}
//               Featured
//             </label>
//           </div>

//           {/* Description */}
//           <textarea
//             className="col-span-2 border p-3 rounded-lg shadow-sm h-32"
//             placeholder="Description"
//             value={form.description}
//             onChange={(e) => update("description", e.target.value)}
//           />

//           {/* Colors */}
//           <div className="col-span-2">
//             <label className="text-sm font-semibold text-[#003366]">Colors</label>
//             <div className="flex gap-2 mb-2">
//               <input
//                 className="border p-2 rounded w-full"
//                 value={colorInput}
//                 onChange={(e) => setColorInput(e.target.value)}
//                 placeholder="Enter color name or hex value"
//               />
//               <button
//                 type="button"
//                 onClick={addColor}
//                 className="bg-[#003366] text-white px-4 rounded"
//               >
//                 Add
//               </button>
//             </div>

//             <div className="flex flex-wrap gap-2">
//               {form.colors.map((c, i) => (
//                 <span key={i} className="bg-gray-200 px-2 py-1 rounded">
//                   {c}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Tags */}
//           <div className="col-span-2">
//             <label className="text-sm font-semibold text-[#003366]">Tags</label>
//             <div className="flex gap-2 mb-2">
//               <input
//                 className="border p-2 rounded w-full"
//                 value={tagInput}
//                 onChange={(e) => setTagInput(e.target.value)}
//                 placeholder="Enter tag"
//               />
//               <button
//                 type="button"
//                 onClick={addTag}
//                 className="bg-[#003366] text-white px-4 rounded"
//               >
//                 Add
//               </button>
//             </div>

//             <div className="flex flex-wrap gap-2">
//               {form.tags.map((t, i) => (
//                 <span key={i} className="bg-blue-200 px-2 py-1 rounded">
//                   {t}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* General Images */}
//           <div className="col-span-2">
//             <label className="font-semibold text-[#003366] block mb-2">
//               Upload Product Thumbnails
//             </label>
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={(e) => setImages(Array.from(e.target.files))}
//               className="border p-3 rounded w-full"
//             />
//           </div>

//           {/* Variant Images */}
//           {form.colors.length > 0 && (
//             <div className="col-span-2">
//               <label className="font-semibold text-[#003366] block mb-2">
//                 Upload Variant Images by Color
//               </label>
//               {form.colors.map((color) => (
//                 <div key={color} className="mb-4">
//                   <p className="font-medium">{color}</p>
//                   <input
//                     type="file"
//                     multiple
//                     accept="image/*"
//                     onChange={(e) =>
//                       handleVariantImages(color, e.target.files)
//                     }
//                     className="border p-2 rounded w-full"
//                   />
//                   {variantImages[color]?.length > 0 && (
//                     <div className="flex gap-2 mt-2 flex-wrap">
//                       {variantImages[color].map((f, i) => (
//                         <span
//                           key={i}
//                           className="px-2 py-1 bg-gray-200 rounded text-sm"
//                         >
//                           {f.name}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Demo Video */}
//           <div className="col-span-2">
//             <label className="font-semibold text-[#003366] block mb-2">
//               Upload Demo Video
//             </label>
//             <input
//               type="file"
//               accept="video/*"
//               onChange={(e) => setDemoVideo(e.target.files[0])}
//               className="border p-3 rounded w-full"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="col-span-2 bg-red-600 py-4 rounded-lg text-white text-lg font-bold hover:bg-red-700 transition"
//           >
//             {loading ? "Saving..." : "SAVE PRODUCT"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }













// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function AddProduct() {
//   const BASE_URL = "http://127.0.0.1:8000/store";

//   const [form, setForm] = useState({
//     title: "",
//     slug: "",
//     description: "",
//     price: "",
//     stock: "",
//     old_price: "",
//     flash_sale_price: "",
//     category: "",
//     colors: [],
//     is_flash_sale: false,
//     is_new: false,
//     is_featured: false,
//     badge_text: "",
//     tags: [],
//   });

//   const [categories, setCategories] = useState([]);
//   const [images, setImages] = useState([]); // General thumbnails
//   const [variantImages, setVariantImages] = useState({}); // { red: [File], blue: [File] }
//   const [demoVideo, setDemoVideo] = useState(null);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [colorInput, setColorInput] = useState("");
//   const [tagInput, setTagInput] = useState("");

//   const update = (key, value) =>
//     setForm((prev) => ({ ...prev, [key]: value }));

//   const cleanNumber = (val) => {
//     const num =
//       typeof val === "string" ? Number(val.replace(/[^\d.]/g, "")) : Number(val);
//     return isNaN(num) ? 0 : num;
//   };

//   // ✔ Updated SEO-friendly slug
//   const autoSlug = (text) =>
//     text
//       .toLowerCase()
//       .trim()
//       .replace(/[^a-z0-9\s-]/g, "")
//       .replace(/\s+/g, "-");

//   // FETCH CATEGORIES
//   useEffect(() => {
//     axios
//       .get(`${BASE_URL}/categories/`)
//       .then((res) => setCategories(res.data))
//       .catch((err) => console.error("Category fetch failed:", err));
//   }, []);

//   // ADD COLOR
//   const addColor = () => {
//     if (colorInput.trim() !== "" && !form.colors.includes(colorInput)) {
//       update("colors", [...form.colors, colorInput]);
//       setColorInput("");
//     }
//   };

//   // ADD TAG
//   const addTag = () => {
//     if (tagInput.trim() !== "" && !form.tags.includes(tagInput)) {
//       update("tags", [...form.tags, tagInput]);
//       setTagInput("");
//     }
//   };

//   // ✔ UPDATED — Variant images append instead of replace
//   const handleVariantImages = (color, files) => {
//     setVariantImages((prev) => ({
//       ...prev,
//       [color]: [...(prev[color] || []), ...Array.from(files)],
//     }));
//   };

//   // SUBMIT PRODUCT
//   const submit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (
//       !form.title ||
//       !form.slug ||
//       !form.description ||
//       !form.price ||
//       !form.stock ||
//       !form.category
//     ) {
//       setMessage("All required fields must be filled");
//       return;
//     }

//     const priceValue = cleanNumber(form.price);
//     const stockValue = cleanNumber(form.stock);
//     const oldPriceValue = form.old_price ? cleanNumber(form.old_price) : "";
//     const flashSaleValue = form.flash_sale_price
//       ? cleanNumber(form.flash_sale_price)
//       : "";

//     if (!priceValue || !stockValue) {
//       setMessage("Price & Stock must be valid numbers");
//       return;
//     }

//     setLoading(true);

//     try {
//       // CREATE PRODUCT
//       const fd = new FormData();
//       fd.append("title", form.title);
//       fd.append("slug", form.slug);
//       fd.append("description", form.description);
//       fd.append("price", priceValue);
//       fd.append("stock", stockValue);
//       fd.append("category", form.category);
//       fd.append("is_flash_sale", form.is_flash_sale);
//       fd.append("is_new", form.is_new);
//       fd.append("is_featured", form.is_featured);
//       fd.append("badge_text", form.badge_text);

//       if (oldPriceValue) fd.append("old_price", oldPriceValue);
//       if (flashSaleValue) fd.append("flash_sale_price", flashSaleValue);

//       fd.append("colors", JSON.stringify(form.colors));
//       fd.append("tags", JSON.stringify(form.tags));

//       const res = await axios.post(`${BASE_URL}/products/create/`, fd, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       const productId = res.data.id;

//       // ✔ UPLOAD GENERAL THUMBNAILS (append-compatible with ProductPage)
//       if (images.length > 0) {
//         await Promise.all(
//           images.map((img) => {
//             const imgFD = new FormData();
//             imgFD.append("product", productId);
//             imgFD.append("image", img);
//             return axios.post(`${BASE_URL}/products/upload-image/`, imgFD, {
//               headers: { "Content-Type": "multipart/form-data" },
//             });
//           })
//         );
//       }

//       // ✔ UPLOAD VARIANT-COLORED IMAGES (append)
//       for (const color of Object.keys(variantImages)) {
//         const files = variantImages[color];
//         await Promise.all(
//           files.map((file) => {
//             const imgFD = new FormData();
//             imgFD.append("product", productId);
//             imgFD.append("image", file);
//             imgFD.append("color", color);
//             return axios.post(`${BASE_URL}/products/upload-image/`, imgFD, {
//               headers: { "Content-Type": "multipart/form-data" },
//             });
//           })
//         );
//       }

//       // ✔ Upload demo video
//       if (demoVideo) {
//         const videoFD = new FormData();
//         videoFD.append("product", productId);
//         videoFD.append("demo_video", demoVideo);

//         await axios.post(`${BASE_URL}/products/upload-demo-video/`, videoFD, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       }

//       // RESET
//       setMessage("✅ Product created successfully!");
//       setForm({
//         title: "",
//         slug: "",
//         description: "",
//         price: "",
//         stock: "",
//         old_price: "",
//         flash_sale_price: "",
//         category: "",
//         colors: [],
//         is_flash_sale: false,
//         is_new: false,
//         is_featured: false,
//         badge_text: "",
//         tags: [],
//       });
//       setImages([]);
//       setVariantImages({});
//       setDemoVideo(null);
//       setColorInput("");
//       setTagInput("");
//     } catch (err) {
//       console.error("Upload failed → ", err?.response?.data ?? err);
//       setMessage(
//         "❌ Upload failed: " + JSON.stringify(err?.response?.data ?? err?.message)
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full flex justify-center p-10 bg-[#f5f7fb]">
//       <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8 border border-[#003366]/20">
//         <h2 className="text-3xl font-bold mb-6 text-[#003366]">➕ Add New Product</h2>

//         {message && (
//           <p
//             className={`mb-4 font-semibold text-center ${
//               message.includes("✅") ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {message}
//           </p>
//         )}

//         <form onSubmit={submit} className="grid grid-cols-2 gap-6">
//           {/* Title */}
//           <input
//             className="col-span-2 border p-3 rounded-lg shadow-sm"
//             placeholder="Product Title"
//             value={form.title}
//             onChange={(e) => {
//               update("title", e.target.value);
//               update("slug", autoSlug(e.target.value));
//             }}
//           />

//           {/* Slug */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Slug"
//             value={form.slug}
//             onChange={(e) => update("slug", autoSlug(e.target.value))}
//           />

//           {/* Price */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Price"
//             value={form.price}
//             onChange={(e) => update("price", e.target.value)}
//           />

//           {/* Old Price */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Old Price (optional)"
//             value={form.old_price}
//             onChange={(e) => update("old_price", e.target.value)}
//           />

//           {/* Flash Sale Price */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Flash Sale Price"
//             value={form.flash_sale_price}
//             onChange={(e) => update("flash_sale_price", e.target.value)}
//           />

//           {/* Stock */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Stock"
//             value={form.stock}
//             onChange={(e) => update("stock", e.target.value)}
//           />

//           {/* Category */}
//           <select
//             className="border p-3 rounded-lg shadow-sm"
//             value={form.category}
//             onChange={(e) => update("category", e.target.value)}
//           >
//             <option value="">Select Category</option>
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>

//           {/* Badge Text */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Badge Text (e.g., NEW, HOT, -50%)"
//             value={form.badge_text}
//             onChange={(e) => update("badge_text", e.target.value)}
//           />

//           {/* Flags */}
//           <div className="col-span-2 flex gap-6">
//             <label>
//               <input
//                 type="checkbox"
//                 checked={form.is_flash_sale}
//                 onChange={(e) => update("is_flash_sale", e.target.checked)}
//               />{" "}
//               Flash Sale
//             </label>

//             <label>
//               <input
//                 type="checkbox"
//                 checked={form.is_new}
//                 onChange={(e) => update("is_new", e.target.checked)}
//               />{" "}
//               New Arrival
//             </label>

//             <label>
//               <input
//                 type="checkbox"
//                 checked={form.is_featured}
//                 onChange={(e) => update("is_featured", e.target.checked)}
//               />{" "}
//               Featured
//             </label>
//           </div>

//           {/* Description */}
//           <textarea
//             className="col-span-2 border p-3 rounded-lg shadow-sm h-32"
//             placeholder="Description"
//             value={form.description}
//             onChange={(e) => update("description", e.target.value)}
//           />

//           {/* Colors */}
//           <div className="col-span-2">
//             <label className="text-sm font-semibold text-[#003366]">Colors</label>
//             <div className="flex gap-2 mb-2">
//               <input
//                 className="border p-2 rounded w-full"
//                 value={colorInput}
//                 onChange={(e) => setColorInput(e.target.value)}
//                 placeholder="Enter color name"
//               />
//               <button
//                 type="button"
//                 onClick={addColor}
//                 className="bg-[#003366] text-white px-4 rounded"
//               >
//                 Add
//               </button>
//             </div>

//             <div className="flex flex-wrap gap-2">
//               {form.colors.map((c, i) => (
//                 <span key={i} className="bg-gray-200 px-2 py-1 rounded">
//                   {c}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Tags */}
//           <div className="col-span-2">
//             <label className="text-sm font-semibold text-[#003366]">Tags</label>
//             <div className="flex gap-2 mb-2">
//               <input
//                 className="border p-2 rounded w-full"
//                 value={tagInput}
//                 onChange={(e) => setTagInput(e.target.value)}
//                 placeholder="Enter tag"
//               />
//               <button
//                 type="button"
//                 onClick={addTag}
//                 className="bg-[#003366] text-white px-4 rounded"
//               >
//                 Add
//               </button>
//             </div>

//             <div className="flex flex-wrap gap-2">
//               {form.tags.map((t, i) => (
//                 <span key={i} className="bg-blue-200 px-2 py-1 rounded">
//                   {t}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* General Thumbnail Images */}
//           <div className="col-span-2">
//             <label className="font-semibold text-[#003366] block mb-2">
//               Upload Product Thumbnails
//             </label>
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={(e) =>
//                 setImages((prev) => [...prev, ...Array.from(e.target.files)])
//               }
//               className="border p-3 rounded w-full"
//             />

//             {/* Thumbnail preview */}
//             {images.length > 0 && (
//               <div className="flex gap-2 mt-3 flex-wrap">
//                 {images.map((f, i) => (
//                   <span
//                     key={i}
//                     className="px-2 py-1 bg-blue-100 border border-blue-300 text-sm rounded"
//                   >
//                     {f.name}
//                   </span>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Variant Images */}
//           {form.colors.length > 0 && (
//             <div className="col-span-2">
//               <label className="font-semibold text-[#003366] block mb-2">
//                 Upload Variant Images by Color
//               </label>

//               {form.colors.map((color) => (
//                 <div key={color} className="mb-5 p-4 border rounded-lg bg-gray-50">
//                   <p className="font-medium text-lg mb-2">{color}</p>

//                   <input
//                     type="file"
//                     accept="image/*"
//                     multiple
//                     onChange={(e) =>
//                       handleVariantImages(color, e.target.files)
//                     }
//                     className="border p-2 rounded w-full"
//                   />

//                   {/* Preview variant file names */}
//                   {variantImages[color]?.length > 0 && (
//                     <div className="flex gap-2 mt-3 flex-wrap">
//                       {variantImages[color].map((f, i) => (
//                         <span
//                           key={i}
//                           className="px-2 py-1 bg-yellow-100 border border-yellow-300 text-sm rounded"
//                         >
//                           {f.name}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Demo Video */}
//           <div className="col-span-2">
//             <label className="font-semibold text-[#003366] block mb-2">
//               Upload Demo Video
//             </label>
//             <input
//               type="file"
//               accept="video/*"
//               onChange={(e) => setDemoVideo(e.target.files[0])}
//               className="border p-3 rounded w-full"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="col-span-2 bg-red-600 py-4 rounded-lg text-white text-lg font-bold hover:bg-red-700 transition"
//           >
//             {loading ? "Saving..." : "SAVE PRODUCT"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }














// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function AddProduct() {
//   const BASE_URL = "http://127.0.0.1:8000/store";

//   const [form, setForm] = useState({
//     title: "",
//     slug: "",
//     description: "",
//     price: "",
//     stock: "",
//     old_price: "",
//     flash_sale_price: "",
//     category: "",
//     colors: [],
//     is_flash_sale: false,
//     is_new: false,
//     is_featured: false,
//     badge_text: "",
//     tags: [],
//   });

//   const [categories, setCategories] = useState([]);
//   const [images, setImages] = useState([]); // General thumbnails
//   const [variantData, setVariantData] = useState({}); // { red: { price, stock, size, images: [] } }
//   const [demoVideo, setDemoVideo] = useState(null);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [colorInput, setColorInput] = useState("");
//   const [tagInput, setTagInput] = useState("");

//   const update = (key, value) =>
//     setForm((prev) => ({ ...prev, [key]: value }));

//   const cleanNumber = (val) => {
//     const num =
//       typeof val === "string" ? Number(val.replace(/[^\d.]/g, "")) : Number(val);
//     return isNaN(num) ? 0 : num;
//   };

//   const autoSlug = (text) =>
//     text
//       .toLowerCase()
//       .trim()
//       .replace(/[^a-z0-9\s-]/g, "")
//       .replace(/\s+/g, "-");

//   useEffect(() => {
//     axios
//       .get(`${BASE_URL}/categories/`)
//       .then((res) => setCategories(res.data))
//       .catch((err) => console.error("Category fetch failed:", err));
//   }, []);

//   const addColor = () => {
//     if (colorInput.trim() !== "" && !form.colors.includes(colorInput)) {
//       update("colors", [...form.colors, colorInput]);
//       setVariantData((prev) => ({
//         ...prev,
//         [colorInput]: { price: "", stock: "", size: "", images: [] },
//       }));
//       setColorInput("");
//     }
//   };

//   const addTag = () => {
//     if (tagInput.trim() !== "" && !form.tags.includes(tagInput)) {
//       update("tags", [...form.tags, tagInput]);
//       setTagInput("");
//     }
//   };

//   const handleVariantInput = (color, key, value) => {
//     setVariantData((prev) => ({
//       ...prev,
//       [color]: { ...prev[color], [key]: value },
//     }));
//   };

//   const handleVariantImages = (color, files) => {
//     setVariantData((prev) => ({
//       ...prev,
//       [color]: {
//         ...prev[color],
//         images: [...(prev[color].images || []), ...Array.from(files)],
//       },
//     }));
//   };

//   // const submit = async (e) => {
//   //   e.preventDefault();
//   //   setMessage("");

//   //   if (
//   //     !form.title ||
//   //     !form.slug ||
//   //     !form.description ||
//   //     !form.price ||
//   //     !form.stock ||
//   //     !form.category
//   //   ) {
//   //     setMessage("All required fields must be filled");
//   //     return;
//   //   }

//   //   const priceValue = cleanNumber(form.price);
//   //   const stockValue = cleanNumber(form.stock);
//   //   const oldPriceValue = form.old_price ? cleanNumber(form.old_price) : "";
//   //   const flashSaleValue = form.flash_sale_price
//   //     ? cleanNumber(form.flash_sale_price)
//   //     : "";

//   //   if (!priceValue || !stockValue) {
//   //     setMessage("Price & Stock must be valid numbers");
//   //     return;
//   //   }

//   //   setLoading(true);

//   //   try {
//   //     // CREATE PRODUCT
//   //     const fd = new FormData();
//   //     fd.append("title", form.title);
//   //     fd.append("slug", form.slug);
//   //     fd.append("description", form.description);
//   //     fd.append("price", priceValue);
//   //     fd.append("stock", stockValue);
//   //     fd.append("category", form.category);
//   //     fd.append("is_flash_sale", form.is_flash_sale);
//   //     fd.append("is_new", form.is_new);
//   //     fd.append("is_featured", form.is_featured);
//   //     fd.append("badge_text", form.badge_text);

//   //     if (oldPriceValue) fd.append("old_price", oldPriceValue);
//   //     if (flashSaleValue) fd.append("flash_sale_price", flashSaleValue);

//   //     fd.append("colors", JSON.stringify(form.colors));
//   //     fd.append("tags", JSON.stringify(form.tags));

//   //     const res = await axios.post(`${BASE_URL}/products/create/`, fd, {
//   //       headers: { "Content-Type": "multipart/form-data" },
//   //     });

//   //     const productId = res.data.id;

//   //     // UPLOAD GENERAL THUMBNAILS
//   //     if (images.length > 0) {
//   //       await Promise.all(
//   //         images.map((img) => {
//   //           const imgFD = new FormData();
//   //           imgFD.append("product", productId);
//   //           imgFD.append("image", img);
//   //           return axios.post(`${BASE_URL}/products/upload-image/`, imgFD, {
//   //             headers: { "Content-Type": "multipart/form-data" },
//   //           });
//   //         })
//   //       );
//   //     }

//   //     // UPLOAD VARIANT DATA + IMAGES
//   //     const variantsArray = [];
//   //     for (const color of Object.keys(variantData)) {
//   //       const v = variantData[color];
//   //       variantsArray.push({
//   //         color,
//   //         price: cleanNumber(v.price),
//   //         stock: cleanNumber(v.stock),
//   //         size: v.size,
//   //       });

//   //       if (v.images && v.images.length > 0) {
//   //         await Promise.all(
//   //           v.images.map((file) => {
//   //             const imgFD = new FormData();
//   //             imgFD.append("product", productId);
//   //             imgFD.append("image", file);
//   //             imgFD.append("color", color);
//   //             return axios.post(`${BASE_URL}/products/upload-image/`, imgFD, {
//   //               headers: { "Content-Type": "multipart/form-data" },
//   //             });
//   //           })
//   //         );
//   //       }
//   //     }

//   //     // Send variants JSON to backend if needed
//   //     if (variantsArray.length > 0) {
//   //       await axios.post(
//   //         `${BASE_URL}/products/add-variants/${productId}/`,
//   //         { variants: variantsArray }
//   //       );
//   //     }

//   //     // UPLOAD demo video
//   //     if (demoVideo) {
//   //       const videoFD = new FormData();
//   //       videoFD.append("product", productId);
//   //       videoFD.append("demo_video", demoVideo);

//   //       await axios.post(`${BASE_URL}/products/upload-demo-video/`, videoFD, {
//   //         headers: { "Content-Type": "multipart/form-data" },
//   //       });
//   //     }

//   //     // RESET FORM
//   //     setMessage("✅ Product created successfully!");
//   //     setForm({
//   //       title: "",
//   //       slug: "",
//   //       description: "",
//   //       price: "",
//   //       stock: "",
//   //       old_price: "",
//   //       flash_sale_price: "",
//   //       category: "",
//   //       colors: [],
//   //       is_flash_sale: false,
//   //       is_new: false,
//   //       is_featured: false,
//   //       badge_text: "",
//   //       tags: [],
//   //     });
//   //     setImages([]);
//   //     setVariantData({});
//   //     setDemoVideo(null);
//   //     setColorInput("");
//   //     setTagInput("");
//   //   } catch (err) {
//   //     console.error("Upload failed → ", err?.response?.data ?? err);
//   //     setMessage(
//   //       "❌ Upload failed: " + JSON.stringify(err?.response?.data ?? err?.message)
//   //     );
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const submit = async (e) => {
//   e.preventDefault();
//   setMessage("");

//   if (!form.title || !form.slug || !form.description || !form.price || !form.stock || !form.category) {
//     setMessage("All required fields must be filled");
//     return;
//   }

//   const priceValue = cleanNumber(form.price);
//   const stockValue = cleanNumber(form.stock);
//   const oldPriceValue = form.old_price ? cleanNumber(form.old_price) : "";
//   const flashSaleValue = form.flash_sale_price ? cleanNumber(form.flash_sale_price) : "";

//   if (!priceValue || !stockValue) {
//     setMessage("Price & Stock must be valid numbers");
//     return;
//   }

//   setLoading(true);

//   try {
//     // CREATE PRODUCT
//     const fd = new FormData();
//     fd.append("title", form.title);
//     fd.append("slug", form.slug);
//     fd.append("description", form.description);
//     fd.append("price", priceValue);
//     fd.append("stock", stockValue);
//     fd.append("category", form.category);
//     fd.append("is_flash_sale", form.is_flash_sale);
//     fd.append("is_new", form.is_new);
//     fd.append("is_featured", form.is_featured);
//     fd.append("badge_text", form.badge_text);

//     if (oldPriceValue) fd.append("old_price", oldPriceValue);
//     if (flashSaleValue) fd.append("flash_sale_price", flashSaleValue);

//     fd.append("colors", JSON.stringify(form.colors));
//     fd.append("tags", JSON.stringify(form.tags));

//     const res = await axios.post(`${BASE_URL}/products/create/`, fd, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     const productId = res.data.id;

//     // UPLOAD GENERAL THUMBNAILS
//     if (images.length > 0) {
//       await Promise.all(
//         images.map((img) => {
//           const imgFD = new FormData();
//           imgFD.append("product", productId);
//           imgFD.append("image", img);
//           return axios.post(`${BASE_URL}/products/upload-image/`, imgFD, {
//             headers: { "Content-Type": "multipart/form-data" },
//           });
//         })
//       );
//     }

//     // UPLOAD VARIANT IMAGES PER COLOR
//     for (const color of Object.keys(variantData)) {
//       const v = variantData[color];

//       // Upload each image for this color
//       if (v.images && v.images.length > 0) {
//         await Promise.all(
//           v.images.map((file) => {
//             const imgFD = new FormData();
//             imgFD.append("product", productId);
//             imgFD.append("image", file);
//             imgFD.append("color", color);
//             return axios.post(`${BASE_URL}/products/upload-variant-image/`, imgFD, {
//               headers: { "Content-Type": "multipart/form-data" },
//             });
//           })
//         );
//       }

//       // If your backend requires variant JSON data (price, stock, size), you can also send it here
//       await axios.post(`${BASE_URL}/products/create/`, {
//         product: productId,
//         color: color,
//         price: cleanNumber(v.price),
//         stock: cleanNumber(v.stock),
//         size: v.size,
//       });
//     }

//     // UPLOAD demo video
//     if (demoVideo) {
//       const videoFD = new FormData();
//       videoFD.append("product", productId);
//       videoFD.append("demo_video", demoVideo);

//       await axios.post(`${BASE_URL}/products/upload-demo-video/`, videoFD, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//     }

//     // RESET FORM
//     setMessage("✅ Product created successfully!");
//     setForm({
//       title: "",
//       slug: "",
//       description: "",
//       price: "",
//       stock: "",
//       old_price: "",
//       flash_sale_price: "",
//       category: "",
//       colors: [],
//       is_flash_sale: false,
//       is_new: false,
//       is_featured: false,
//       badge_text: "",
//       tags: [],
//     });
//     setImages([]);
//     setVariantData({});
//     setDemoVideo(null);
//     setColorInput("");
//     setTagInput("");
//   } catch (err) {
//     console.error("Upload failed → ", err?.response?.data ?? err);
//     setMessage(
//       "❌ Upload failed: " + JSON.stringify(err?.response?.data ?? err?.message)
//     );
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="w-full flex justify-center p-10 bg-[#f5f7fb]">
//       <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8 border border-[#003366]/20">
//         <h2 className="text-3xl font-bold mb-6 text-[#003366]">➕ Add New Product</h2>

//         {message && (
//           <p
//             className={`mb-4 font-semibold text-center ${
//               message.includes("✅") ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {message}
//           </p>
//         )}

//         <form onSubmit={submit} className="grid grid-cols-2 gap-6">
//           {/* Title */}
//           <input
//             className="col-span-2 border p-3 rounded-lg shadow-sm"
//             placeholder="Product Title"
//             value={form.title}
//             onChange={(e) => {
//               update("title", e.target.value);
//               update("slug", autoSlug(e.target.value));
//             }}
//           />

//           {/* Slug */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Slug"
//             value={form.slug}
//             onChange={(e) => update("slug", autoSlug(e.target.value))}
//           />

//           {/* Price */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Price"
//             value={form.price}
//             onChange={(e) => update("price", e.target.value)}
//           />

//           {/* Old Price */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Old Price (optional)"
//             value={form.old_price}
//             onChange={(e) => update("old_price", e.target.value)}
//           />

//           {/* Flash Sale Price */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Flash Sale Price"
//             value={form.flash_sale_price}
//             onChange={(e) => update("flash_sale_price", e.target.value)}
//           />

//           {/* Stock */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Stock"
//             value={form.stock}
//             onChange={(e) => update("stock", e.target.value)}
//           />

//           {/* Category */}
//           <select
//             className="border p-3 rounded-lg shadow-sm"
//             value={form.category}
//             onChange={(e) => update("category", e.target.value)}
//           >
//             <option value="">Select Category</option>
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>

//           {/* Badge Text */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Badge Text (e.g., NEW, HOT, -50%)"
//             value={form.badge_text}
//             onChange={(e) => update("badge_text", e.target.value)}
//           />

//           {/* Flags */}
//           <div className="col-span-2 flex gap-6">
//             <label>
//               <input
//                 type="checkbox"
//                 checked={form.is_flash_sale}
//                 onChange={(e) => update("is_flash_sale", e.target.checked)}
//               />{" "}
//               Flash Sale
//             </label>

//             <label>
//               <input
//                 type="checkbox"
//                 checked={form.is_new}
//                 onChange={(e) => update("is_new", e.target.checked)}
//               />{" "}
//               New Arrival
//             </label>

//             <label>
//               <input
//                 type="checkbox"
//                 checked={form.is_featured}
//                 onChange={(e) => update("is_featured", e.target.checked)}
//               />{" "}
//               Featured
//             </label>
//           </div>

//           {/* Description */}
//           <textarea
//             className="col-span-2 border p-3 rounded-lg shadow-sm h-32"
//             placeholder="Description"
//             value={form.description}
//             onChange={(e) => update("description", e.target.value)}
//           />

//           {/* Colors */}
//           <div className="col-span-2">
//             <label className="text-sm font-semibold text-[#003366]">Colors</label>
//             <div className="flex gap-2 mb-2">
//               <input
//                 className="border p-2 rounded w-full"
//                 value={colorInput}
//                 onChange={(e) => setColorInput(e.target.value)}
//                 placeholder="Enter color name"
//               />
//               <button
//                 type="button"
//                 onClick={addColor}
//                 className="bg-[#003366] text-white px-4 rounded"
//               >
//                 Add
//               </button>
//             </div>

//             <div className="flex flex-wrap gap-2">
//               {form.colors.map((c, i) => (
//                 <span key={i} className="bg-gray-200 px-2 py-1 rounded">
//                   {c}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Tags */}
//           <div className="col-span-2">
//             <label className="text-sm font-semibold text-[#003366]">Tags</label>
//             <div className="flex gap-2 mb-2">
//               <input
//                 className="border p-2 rounded w-full"
//                 value={tagInput}
//                 onChange={(e) => setTagInput(e.target.value)}
//                 placeholder="Enter tag"
//               />
//               <button
//                 type="button"
//                 onClick={addTag}
//                 className="bg-[#003366] text-white px-4 rounded"
//               >
//                 Add
//               </button>
//             </div>

//             <div className="flex flex-wrap gap-2">
//               {form.tags.map((t, i) => (
//                 <span key={i} className="bg-blue-200 px-2 py-1 rounded">
//                   {t}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* General Thumbnail Images */}
//           <div className="col-span-2">
//             <label className="font-semibold text-[#003366] block mb-2">
//               Upload Product Thumbnails
//             </label>
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={(e) =>
//                 setImages((prev) => [...prev, ...Array.from(e.target.files)])
//               }
//               className="border p-3 rounded w-full"
//             />

//             {images.length > 0 && (
//               <div className="flex gap-2 mt-3 flex-wrap">
//                 {images.map((f, i) => (
//                   <span
//                     key={i}
//                     className="px-2 py-1 bg-blue-100 border border-blue-300 text-sm rounded"
//                   >
//                     {f.name}
//                   </span>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Variant Inputs */}
//           {form.colors.length > 0 && (
//             <div className="col-span-2">
//               <label className="font-semibold text-[#003366] block mb-2">
//                 Variant Details by Color
//               </label>

//               {form.colors.map((color) => (
//                 <div key={color} className="mb-5 p-4 border rounded-lg bg-gray-50">
//                   <p className="font-medium text-lg mb-2">{color}</p>

//                   <input
//                     type="text"
//                     placeholder="Size (optional)"
//                     className="border p-2 rounded mb-2 w-full"
//                     value={variantData[color]?.size || ""}
//                     onChange={(e) =>
//                       handleVariantInput(color, "size", e.target.value)
//                     }
//                   />

//                   <input
//                     type="text"
//                     placeholder="Price"
//                     className="border p-2 rounded mb-2 w-full"
//                     value={variantData[color]?.price || ""}
//                     onChange={(e) =>
//                       handleVariantInput(color, "price", e.target.value)
//                     }
//                   />

//                   <input
//                     type="text"
//                     placeholder="Stock"
//                     className="border p-2 rounded mb-2 w-full"
//                     value={variantData[color]?.stock || ""}
//                     onChange={(e) =>
//                       handleVariantInput(color, "stock", e.target.value)
//                     }
//                   />

//                   <input
//                     type="file"
//                     accept="image/*"
//                     multiple
//                     onChange={(e) =>
//                       handleVariantImages(color, e.target.files)
//                     }
//                     className="border p-2 rounded w-full"
//                   />

//                   {variantData[color]?.images?.length > 0 && (
//                     <div className="flex gap-2 mt-3 flex-wrap">
//                       {variantData[color].images.map((f, i) => (
//                         <span
//                           key={i}
//                           className="px-2 py-1 bg-yellow-100 border border-yellow-300 text-sm rounded"
//                         >
//                           {f.name}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Demo Video */}
//           <div className="col-span-2">
//             <label className="font-semibold text-[#003366] block mb-2">
//               Upload Demo Video
//             </label>
//             <input
//               type="file"
//               accept="video/*"
//               onChange={(e) => setDemoVideo(e.target.files[0])}
//               className="border p-3 rounded w-full"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="col-span-2 bg-red-600 py-4 rounded-lg text-white text-lg font-bold hover:bg-red-700 transition"
//           >
//             {loading ? "Saving..." : "SAVE PRODUCT"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }













// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function AddProduct() {
//   const BASE_URL = "http://127.0.0.1:8000/store";

//   const [form, setForm] = useState({
//     title: "",
//     slug: "",
//     description: "",
//     price: "",
//     stock: "",
//     old_price: "",
//     flash_sale_price: "",
//     category: "",
//     colors: [],
//     is_flash_sale: false,
//     is_new: false,
//     is_featured: false,
//     badge_text: "",
//     tags: [],
//   });

//   const [categories, setCategories] = useState([]);
//   const [images, setImages] = useState([]); // General thumbnails
//   const [variantData, setVariantData] = useState({}); // { red: { price, stock, size, images: [] } }
//   const [demoVideo, setDemoVideo] = useState(null);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [colorInput, setColorInput] = useState("");
//   const [tagInput, setTagInput] = useState("");

//   const update = (key, value) =>
//     setForm((prev) => ({ ...prev, [key]: value }));

//   const cleanNumber = (val) => {
//     const num =
//       typeof val === "string" ? Number(val.replace(/[^\d.]/g, "")) : Number(val);
//     return isNaN(num) ? 0 : num;
//   };

//   const autoSlug = (text) =>
//     text
//       .toLowerCase()
//       .trim()
//       .replace(/[^a-z0-9\s-]/g, "")
//       .replace(/\s+/g, "-");

//   useEffect(() => {
//     axios
//       .get(`${BASE_URL}/categories/`)
//       .then((res) => setCategories(res.data))
//       .catch((err) => console.error("Category fetch failed:", err));
//   }, []);

//   const addColor = () => {
//     if (colorInput.trim() !== "" && !form.colors.includes(colorInput)) {
//       update("colors", [...form.colors, colorInput]);
//       setVariantData((prev) => ({
//         ...prev,
//         [colorInput]: { price: "", stock: "", size: "", images: [] },
//       }));
//       setColorInput("");
//     }
//   };

//   const addTag = () => {
//     if (tagInput.trim() !== "" && !form.tags.includes(tagInput)) {
//       update("tags", [...form.tags, tagInput]);
//       setTagInput("");
//     }
//   };

//   const handleVariantInput = (color, key, value) => {
//     setVariantData((prev) => ({
//       ...prev,
//       [color]: { ...prev[color], [key]: value },
//     }));
//   };

//   const handleVariantImages = (color, files) => {
//     setVariantData((prev) => ({
//       ...prev,
//       [color]: {
//         ...prev[color],
//         images: [...(prev[color].images || []), ...Array.from(files)],
//       },
//     }));
//   };

//   const submit = async (e) => {
//   e.preventDefault();
//   setMessage("");

//   // Basic validation
//   if (!form.title || !form.slug || !form.description || !form.price || !form.stock || !form.category) {
//     setMessage("All required fields must be filled");
//     return;
//   }

//   const priceValue = cleanNumber(form.price);
//   const stockValue = cleanNumber(form.stock);
//   const oldPriceValue = form.old_price ? cleanNumber(form.old_price) : "";
//   const flashSaleValue = form.flash_sale_price ? cleanNumber(form.flash_sale_price) : "";

//   if (!priceValue || !stockValue) {
//     setMessage("Price & Stock must be valid numbers");
//     return;
//   }

//   setLoading(true);

//   try {
//     // 1️⃣ CREATE PRODUCT
//     const fd = new FormData();
//     fd.append("title", form.title);
//     fd.append("slug", form.slug);
//     fd.append("description", form.description);
//     fd.append("price", priceValue);
//     fd.append("stock", stockValue);
//     fd.append("category", form.category);
//     fd.append("is_flash_sale", form.is_flash_sale);
//     fd.append("is_new", form.is_new);
//     fd.append("is_featured", form.is_featured);
//     fd.append("badge_text", form.badge_text);

//     if (oldPriceValue) fd.append("old_price", oldPriceValue);
//     if (flashSaleValue) fd.append("flash_sale_price", flashSaleValue);

//     fd.append("colors", JSON.stringify(form.colors));
//     fd.append("tags", JSON.stringify(form.tags));

//     const res = await axios.post(`${BASE_URL}/products/create/`, fd, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     const productId = res.data.id;

//     // 2️⃣ UPLOAD GENERAL THUMBNAILS
//     if (images.length > 0) {
//       await Promise.all(
//         images.map((img) => {
//           const imgFD = new FormData();
//           imgFD.append("product", productId);
//           imgFD.append("image", img);
//           return axios.post(`${BASE_URL}/products/upload-image/`, imgFD, {
//             headers: { "Content-Type": "multipart/form-data" },
//           });
//         })
//       );
//     }

//     // 3️⃣ UPLOAD VARIANT IMAGES PER COLOR
//     for (const color of Object.keys(variantData)) {
//       const v = variantData[color];

//       if (v.images && v.images.length > 0) {
//         await Promise.all(
//           v.images.map((file) => {
//             const imgFD = new FormData();
//             imgFD.append("product", productId);
//             imgFD.append("image", file);
//             imgFD.append("color", color);
//             return axios.post(`${BASE_URL}/products/upload-variant-image/`, imgFD, {
//               headers: { "Content-Type": "multipart/form-data" },
//             });
//           })
//         );
//       }

//       // Send variant details directly via product update endpoint if supported
//       // If backend doesn't handle variant JSON, skip this
//       if (v.price || v.stock || v.size) {
//         await axios.patch(`${BASE_URL}/products/${productId}/`, {
//           variants: [
//             {
//               color,
//               price: cleanNumber(v.price),
//               stock: cleanNumber(v.stock),
//               size: v.size,
//             },
//           ],
//         });
//       }
//     }

//     // 4️⃣ UPLOAD DEMO VIDEO
//     if (demoVideo) {
//       const videoFD = new FormData();
//       videoFD.append("product", productId);
//       videoFD.append("demo_video", demoVideo);

//       await axios.post(`${BASE_URL}/products/upload-demo-video/`, videoFD, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//     }

//     // ✅ RESET FORM
//     setMessage("✅ Product created successfully!");
//     setForm({
//       title: "",
//       slug: "",
//       description: "",
//       price: "",
//       stock: "",
//       old_price: "",
//       flash_sale_price: "",
//       category: "",
//       colors: [],
//       is_flash_sale: false,
//       is_new: false,
//       is_featured: false,
//       badge_text: "",
//       tags: [],
//     });
//     setImages([]);
//     setVariantData({});
//     setDemoVideo(null);
//     setColorInput("");
//     setTagInput("");
//   } catch (err) {
//     console.error("Upload failed → ", err?.response?.data ?? err);
//     setMessage(
//       "❌ Upload failed: " + JSON.stringify(err?.response?.data ?? err?.message)
//     );
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="w-full flex justify-center p-10 bg-[#f5f7fb]">
//       <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8 border border-[#003366]/20">
//         <h2 className="text-3xl font-bold mb-6 text-[#003366]">➕ Add New Product</h2>

//         {message && (
//           <p
//             className={`mb-4 font-semibold text-center ${
//               message.includes("✅") ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {message}
//           </p>
//         )}

//         <form onSubmit={submit} className="grid grid-cols-2 gap-6">
//           {/* --- Product Inputs (Title, Slug, Price, Stock, etc.) --- */}
//           <input
//             className="col-span-2 border p-3 rounded-lg shadow-sm"
//             placeholder="Product Title"
//             value={form.title}
//             onChange={(e) => {
//               update("title", e.target.value);
//               update("slug", autoSlug(e.target.value));
//             }}
//           />
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Slug"
//             value={form.slug}
//             onChange={(e) => update("slug", autoSlug(e.target.value))}
//           />
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Price"
//             value={form.price}
//             onChange={(e) => update("price", e.target.value)}
//           />
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Old Price (optional)"
//             value={form.old_price}
//             onChange={(e) => update("old_price", e.target.value)}
//           />
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Flash Sale Price"
//             value={form.flash_sale_price}
//             onChange={(e) => update("flash_sale_price", e.target.value)}
//           />
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Stock"
//             value={form.stock}
//             onChange={(e) => update("stock", e.target.value)}
//           />
//           <select
//             className="border p-3 rounded-lg shadow-sm"
//             value={form.category}
//             onChange={(e) => update("category", e.target.value)}
//           >
//             <option value="">Select Category</option>
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Badge Text (e.g., NEW, HOT, -50%)"
//             value={form.badge_text}
//             onChange={(e) => update("badge_text", e.target.value)}
//           />
//           <div className="col-span-2 flex gap-6">
//             <label>
//               <input
//                 type="checkbox"
//                 checked={form.is_flash_sale}
//                 onChange={(e) => update("is_flash_sale", e.target.checked)}
//               />{" "}
//               Flash Sale
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={form.is_new}
//                 onChange={(e) => update("is_new", e.target.checked)}
//               />{" "}
//               New Arrival
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={form.is_featured}
//                 onChange={(e) => update("is_featured", e.target.checked)}
//               />{" "}
//               Featured
//             </label>
//           </div>
//           <textarea
//             className="col-span-2 border p-3 rounded-lg shadow-sm h-32"
//             placeholder="Description"
//             value={form.description}
//             onChange={(e) => update("description", e.target.value)}
//           />

//           {/* --- Colors, Tags, Images, Variants, Demo Video --- */}
//           {/* Colors */}
//           <div className="col-span-2">
//             <label className="text-sm font-semibold text-[#003366]">Colors</label>
//             <div className="flex gap-2 mb-2">
//               <input
//                 className="border p-2 rounded w-full"
//                 value={colorInput}
//                 onChange={(e) => setColorInput(e.target.value)}
//                 placeholder="Enter color name"
//               />
//               <button
//                 type="button"
//                 onClick={addColor}
//                 className="bg-[#003366] text-white px-4 rounded"
//               >
//                 Add
//               </button>
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {form.colors.map((c, i) => (
//                 <span key={i} className="bg-gray-200 px-2 py-1 rounded">
//                   {c}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Tags */}
//           <div className="col-span-2">
//             <label className="text-sm font-semibold text-[#003366]">Tags</label>
//             <div className="flex gap-2 mb-2">
//               <input
//                 className="border p-2 rounded w-full"
//                 value={tagInput}
//                 onChange={(e) => setTagInput(e.target.value)}
//                 placeholder="Enter tag"
//               />
//               <button
//                 type="button"
//                 onClick={addTag}
//                 className="bg-[#003366] text-white px-4 rounded"
//               >
//                 Add
//               </button>
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {form.tags.map((t, i) => (
//                 <span key={i} className="bg-blue-200 px-2 py-1 rounded">
//                   {t}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* General Images */}
//           <div className="col-span-2">
//             <label className="font-semibold text-[#003366] block mb-2">
//               Upload Product Thumbnails
//             </label>
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={(e) =>
//                 setImages((prev) => [...prev, ...Array.from(e.target.files)])
//               }
//               className="border p-3 rounded w-full"
//             />
//             {images.length > 0 && (
//               <div className="flex gap-2 mt-3 flex-wrap">
//                 {images.map((f, i) => (
//                   <span
//                     key={i}
//                     className="px-2 py-1 bg-blue-100 border border-blue-300 text-sm rounded"
//                   >
//                     {f.name}
//                   </span>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Variant Inputs */}
//           {form.colors.length > 0 && (
//             <div className="col-span-2">
//               <label className="font-semibold text-[#003366] block mb-2">
//                 Variant Details by Color
//               </label>
//               {form.colors.map((color) => (
//                 <div key={color} className="mb-5 p-4 border rounded-lg bg-gray-50">
//                   <p className="font-medium text-lg mb-2">{color}</p>
//                   <input
//                     type="text"
//                     placeholder="Size (optional)"
//                     className="border p-2 rounded mb-2 w-full"
//                     value={variantData[color]?.size || ""}
//                     onChange={(e) =>
//                       handleVariantInput(color, "size", e.target.value)
//                     }
//                   />
//                   <input
//                     type="text"
//                     placeholder="Price"
//                     className="border p-2 rounded mb-2 w-full"
//                     value={variantData[color]?.price || ""}
//                     onChange={(e) =>
//                       handleVariantInput(color, "price", e.target.value)
//                     }
//                   />
//                   <input
//                     type="text"
//                     placeholder="Stock"
//                     className="border p-2 rounded mb-2 w-full"
//                     value={variantData[color]?.stock || ""}
//                     onChange={(e) =>
//                       handleVariantInput(color, "stock", e.target.value)
//                     }
//                   />
//                   <input
//                     type="file"
//                     accept="image/*"
//                     multiple
//                     onChange={(e) =>
//                       handleVariantImages(color, e.target.files)
//                     }
//                     className="border p-2 rounded w-full"
//                   />
//                   {variantData[color]?.images?.length > 0 && (
//                     <div className="flex gap-2 mt-3 flex-wrap">
//                       {variantData[color].images.map((f, i) => (
//                         <span
//                           key={i}
//                           className="px-2 py-1 bg-yellow-100 border border-yellow-300 text-sm rounded"
//                         >
//                           {f.name}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Demo Video */}
//           <div className="col-span-2">
//             <label className="font-semibold text-[#003366] block mb-2">
//               Upload Demo Video
//             </label>
//             <input
//               type="file"
//               accept="video/*"
//               onChange={(e) => setDemoVideo(e.target.files[0])}
//               className="border p-3 rounded w-full"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="col-span-2 bg-red-600 py-4 rounded-lg text-white text-lg font-bold hover:bg-red-700 transition"
//           >
//             {loading ? "Saving..." : "SAVE PRODUCT"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }












// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function AddProduct() {
//   const BASE_URL = "http://127.0.0.1:8000/store";

//   const [form, setForm] = useState({
//     product_type: "physical", // physical or digital
//     digital_category: "",
//     title: "",
//     slug: "",
//     description: "",
//     price: "",
//     stock: "",
//     old_price: "",
//     flash_sale_price: "",
//     category: "",
//     colors: [],
//     is_flash_sale: false,
//     is_new: false,
//     is_featured: false,
//     badge_text: "",
//     tags: [],
//   });

//   const [categories, setCategories] = useState([]);
//   const [images, setImages] = useState([]); 
//   const [variantData, setVariantData] = useState({}); 
//   const [demoVideo, setDemoVideo] = useState(null);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [colorInput, setColorInput] = useState("");
//   const [tagInput, setTagInput] = useState("");

//   const update = (key, value) =>
//     setForm((prev) => ({ ...prev, [key]: value }));

//   const cleanNumber = (val) => {
//     const num =
//       typeof val === "string" ? Number(val.replace(/[^\d.]/g, "")) : Number(val);
//     return isNaN(num) ? 0 : num;
//   };

//   const autoSlug = (text) =>
//     text
//       .toLowerCase()
//       .trim()
//       .replace(/[^a-z0-9\s-]/g, "")
//       .replace(/\s+/g, "-");

//   useEffect(() => {
//     axios
//       .get(`${BASE_URL}/categories/`)
//       .then((res) => setCategories(res.data))
//       .catch((err) => console.error("Category fetch failed:", err));
//   }, []);

//   const addColor = () => {
//     if (colorInput.trim() !== "" && !form.colors.includes(colorInput)) {
//       update("colors", [...form.colors, colorInput]);
//       setVariantData((prev) => ({
//         ...prev,
//         [colorInput]: { price: "", stock: "", size: "", images: [] },
//       }));
//       setColorInput("");
//     }
//   };

//   const addTag = () => {
//     if (tagInput.trim() !== "" && !form.tags.includes(tagInput)) {
//       update("tags", [...form.tags, tagInput]);
//       setTagInput("");
//     }
//   };

//   const handleVariantInput = (color, key, value) => {
//     setVariantData((prev) => ({
//       ...prev,
//       [color]: { ...prev[color], [key]: value },
//     }));
//   };

//   const handleVariantImages = (color, files) => {
//     setVariantData((prev) => ({
//       ...prev,
//       [color]: {
//         ...prev[color],
//         images: [...(prev[color].images || []), ...Array.from(files)],
//       },
//     }));
//   };

//   const submit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (!form.title || !form.slug || !form.description || !form.price || !form.category) {
//       setMessage("All required fields must be filled");
//       return;
//     }

//     if (form.product_type === "physical" && !form.stock) {
//       setMessage("Stock must be provided for physical products");
//       return;
//     }

//     const priceValue = cleanNumber(form.price);
//     const stockValue = cleanNumber(form.stock);
//     const oldPriceValue = form.old_price ? cleanNumber(form.old_price) : "";
//     const flashSaleValue = form.flash_sale_price ? cleanNumber(form.flash_sale_price) : "";

//     setLoading(true);

//     try {
//       const fd = new FormData();
//       fd.append("product_type", form.product_type);
//       fd.append("title", form.title);
//       fd.append("slug", form.slug);
//       fd.append("description", form.description);
//       fd.append("price", priceValue);
//       if (form.product_type === "physical") fd.append("stock", stockValue);
//       fd.append("category", form.category);
//       fd.append("is_flash_sale", form.is_flash_sale);
//       fd.append("is_new", form.is_new);
//       fd.append("is_featured", form.is_featured);
//       fd.append("badge_text", form.badge_text);

//       if (oldPriceValue) fd.append("old_price", oldPriceValue);
//       if (flashSaleValue) fd.append("flash_sale_price", flashSaleValue);

//       fd.append("colors", JSON.stringify(form.colors));
//       fd.append("tags", JSON.stringify(form.tags));

//       const res = await axios.post(`${BASE_URL}/products/create/`, fd, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       const productId = res.data.id;

//       // Upload general thumbnails
//       if (images.length > 0) {
//         await Promise.all(
//           images.map((img) => {
//             const imgFD = new FormData();
//             imgFD.append("product", productId);
//             imgFD.append("image", img);
//             return axios.post(`${BASE_URL}/products/upload-image/`, imgFD, {
//               headers: { "Content-Type": "multipart/form-data" },
//             });
//           })
//         );
//       }

//       // Upload variant images
//       for (const color of Object.keys(variantData)) {
//         const v = variantData[color];

//         if (v.images && v.images.length > 0) {
//           await Promise.all(
//             v.images.map((file) => {
//               const imgFD = new FormData();
//               imgFD.append("product", productId);
//               imgFD.append("image", file);
//               imgFD.append("color", color);
//               return axios.post(`${BASE_URL}/products/upload-variant-image/`, imgFD, {
//                 headers: { "Content-Type": "multipart/form-data" },
//               });
//             })
//           );
//         }

//         if (v.price || v.stock || v.size) {
//           await axios.patch(`${BASE_URL}/products/${productId}/`, {
//             variants: [
//               {
//                 color,
//                 price: cleanNumber(v.price),
//                 stock: cleanNumber(v.stock),
//                 size: v.size,
//               },
//             ],
//           });
//         }
//       }

//       // Upload demo video
//       if (demoVideo) {
//         const videoFD = new FormData();
//         videoFD.append("product", productId);
//         videoFD.append("demo_video", demoVideo);

//         await axios.post(`${BASE_URL}/products/upload-demo-video/`, videoFD, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       }

//       // Reset form
//       setMessage("✅ Product created successfully!");
//       setForm({
//         product_type: "physical",
//         title: "",
//         slug: "",
//         description: "",
//         price: "",
//         stock: "",
//         old_price: "",
//         flash_sale_price: "",
//         category: "",
//         colors: [],
//         is_flash_sale: false,
//         is_new: false,
//         is_featured: false,
//         badge_text: "",
//         tags: [],
//       });
//       setImages([]);
//       setVariantData({});
//       setDemoVideo(null);
//       setColorInput("");
//       setTagInput("");
//     } catch (err) {
//       console.error("Upload failed → ", err?.response?.data ?? err);
//       setMessage(
//         "❌ Upload failed: " + JSON.stringify(err?.response?.data ?? err?.message)
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full flex justify-center p-10 bg-[#f5f7fb]">
//       <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8 border border-[#003366]/20">
//         <h2 className="text-3xl font-bold mb-6 text-[#003366]">➕ Add New Product</h2>

//         {message && (
//           <p
//             className={`mb-4 font-semibold text-center ${
//               message.includes("✅") ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {message}
//           </p>
//         )}

//         <form onSubmit={submit} className="grid grid-cols-2 gap-6">
//           {/* Product Type */}
//           <select
//             className="border p-3 rounded-lg shadow-sm col-span-2"
//             value={form.product_type}
//             onChange={(e) => update("product_type", e.target.value)}
//           >
//             <option value="physical">Physical</option>
//             <option value="digital">Digital</option>
//           </select>

//           {/* Product Inputs */}
//           <input
//             className="col-span-2 border p-3 rounded-lg shadow-sm"
//             placeholder="Product Title"
//             value={form.title}
//             onChange={(e) => {
//               update("title", e.target.value);
//               update("slug", autoSlug(e.target.value));
//             }}
//           />
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Slug"
//             value={form.slug}
//             onChange={(e) => update("slug", autoSlug(e.target.value))}
//           />
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Price"
//             value={form.price}
//             onChange={(e) => update("price", e.target.value)}
//           />
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Old Price (optional)"
//             value={form.old_price}
//             onChange={(e) => update("old_price", e.target.value)}
//           />
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Flash Sale Price"
//             value={form.flash_sale_price}
//             onChange={(e) => update("flash_sale_price", e.target.value)}
//           />

//           {form.product_type === "physical" && (
//             <input
//               className="border p-3 rounded-lg shadow-sm"
//               placeholder="Stock"
//               value={form.stock}
//               onChange={(e) => update("stock", e.target.value)}
//             />
//           )}

//           <select
//             className="border p-3 rounded-lg shadow-sm"
//             value={form.category}
//             onChange={(e) => update("category", e.target.value)}
//           >
//             <option value="">Select Category</option>
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Badge Text (e.g., NEW, HOT, -50%)"
//             value={form.badge_text}
//             onChange={(e) => update("badge_text", e.target.value)}
//           />

//           <div className="col-span-2 flex gap-6">
//             <label>
//               <input
//                 type="checkbox"
//                 checked={form.is_flash_sale}
//                 onChange={(e) => update("is_flash_sale", e.target.checked)}
//               />{" "}
//               Flash Sale
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={form.is_new}
//                 onChange={(e) => update("is_new", e.target.checked)}
//               />{" "}
//               New Arrival
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={form.is_featured}
//                 onChange={(e) => update("is_featured", e.target.checked)}
//               />{" "}
//               Featured
//             </label>
//           </div>

//           <textarea
//             className="col-span-2 border p-3 rounded-lg shadow-sm h-32"
//             placeholder="Description"
//             value={form.description}
//             onChange={(e) => update("description", e.target.value)}
//           />

//           {/* Colors, Tags, Images, Variants */}
//           <div className="col-span-2">
//             <label className="text-sm font-semibold text-[#003366]">Colors</label>
//             <div className="flex gap-2 mb-2">
//               <input
//                 className="border p-2 rounded w-full"
//                 value={colorInput}
//                 onChange={(e) => setColorInput(e.target.value)}
//                 placeholder="Enter color name"
//               />
//               <button
//                 type="button"
//                 onClick={addColor}
//                 className="bg-[#003366] text-white px-4 rounded"
//               >
//                 Add
//               </button>
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {form.colors.map((c, i) => (
//                 <span key={i} className="bg-gray-200 px-2 py-1 rounded">
//                   {c}
//                 </span>
//               ))}
//             </div>
//           </div>

//           <div className="col-span-2">
//             <label className="text-sm font-semibold text-[#003366]">Tags</label>
//             <div className="flex gap-2 mb-2">
//               <input
//                 className="border p-2 rounded w-full"
//                 value={tagInput}
//                 onChange={(e) => setTagInput(e.target.value)}
//                 placeholder="Enter tag"
//               />
//               <button
//                 type="button"
//                 onClick={addTag}
//                 className="bg-[#003366] text-white px-4 rounded"
//               >
//                 Add
//               </button>
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {form.tags.map((t, i) => (
//                 <span key={i} className="bg-blue-200 px-2 py-1 rounded">
//                   {t}
//                 </span>
//               ))}
//             </div>
//           </div>

//           <div className="col-span-2">
//             <label className="font-semibold text-[#003366] block mb-2">
//               Upload Product Thumbnails
//             </label>
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={(e) =>
//                 setImages((prev) => [...prev, ...Array.from(e.target.files)])
//               }
//               className="border p-3 rounded w-full"
//             />
//             {images.length > 0 && (
//               <div className="flex gap-2 mt-3 flex-wrap">
//                 {images.map((f, i) => (
//                   <span
//                     key={i}
//                     className="px-2 py-1 bg-blue-100 border border-blue-300 text-sm rounded"
//                   >
//                     {f.name}
//                   </span>
//                 ))}
//               </div>
//             )}
//           </div>

//           {form.colors.length > 0 && (
//             <div className="col-span-2">
//               <label className="font-semibold text-[#003366] block mb-2">
//                 Variant Details by Color
//               </label>
//               {form.colors.map((color) => (
//                 <div key={color} className="mb-5 p-4 border rounded-lg bg-gray-50">
//                   <p className="font-medium text-lg mb-2">{color}</p>
//                   <input
//                     type="text"
//                     placeholder="Size (optional)"
//                     className="border p-2 rounded mb-2 w-full"
//                     value={variantData[color]?.size || ""}
//                     onChange={(e) =>
//                       handleVariantInput(color, "size", e.target.value)
//                     }
//                   />
//                   <input
//                     type="text"
//                     placeholder="Price"
//                     className="border p-2 rounded mb-2 w-full"
//                     value={variantData[color]?.price || ""}
//                     onChange={(e) =>
//                       handleVariantInput(color, "price", e.target.value)
//                     }
//                   />
//                   <input
//                     type="text"
//                     placeholder="Stock"
//                     className="border p-2 rounded mb-2 w-full"
//                     value={variantData[color]?.stock || ""}
//                     onChange={(e) =>
//                       handleVariantInput(color, "stock", e.target.value)
//                     }
//                   />
//                   <input
//                     type="file"
//                     accept="image/*"
//                     multiple
//                     onChange={(e) =>
//                       handleVariantImages(color, e.target.files)
//                     }
//                     className="border p-2 rounded w-full"
//                   />
//                   {variantData[color]?.images?.length > 0 && (
//                     <div className="flex gap-2 mt-3 flex-wrap">
//                       {variantData[color].images.map((f, i) => (
//                         <span
//                           key={i}
//                           className="px-2 py-1 bg-yellow-100 border border-yellow-300 text-sm rounded"
//                         >
//                           {f.name}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}

//           <div className="col-span-2">
//             <label className="font-semibold text-[#003366] block mb-2">
//               Upload Demo Video
//             </label>
//             <input
//               type="file"
//               accept="video/*"
//               onChange={(e) => setDemoVideo(e.target.files[0])}
//               className="border p-3 rounded w-full"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="col-span-2 bg-red-600 py-4 rounded-lg text-white text-lg font-bold hover:bg-red-700 transition"
//           >
//             {loading ? "Saving..." : "SAVE PRODUCT"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }












// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function AddProduct() {
//   const BASE_URL = "http://127.0.0.1:8000/store";

//   const [form, setForm] = useState({
//     product_type: "physical", // physical or digital
//     digital_category: "",
//     title: "",
//     slug: "",
//     description: "",
//     price: "",
//     stock: "",
//     old_price: "",
//     flash_sale_price: "",
//     category: "",
//     colors: [],
//     is_flash_sale: false,
//     is_new: false,
//     is_featured: false,
//     badge_text: "",
//     tags: [],
//   });

//   const [categories, setCategories] = useState([]);
//   const [images, setImages] = useState([]);
//   const [variantData, setVariantData] = useState({});
//   const [demoVideo, setDemoVideo] = useState(null);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [colorInput, setColorInput] = useState("");
//   const [tagInput, setTagInput] = useState("");

//   const update = (key, value) =>
//     setForm((prev) => ({ ...prev, [key]: value }));

//   const cleanNumber = (val) => {
//     const num =
//       typeof val === "string" ? Number(val.replace(/[^\d.]/g, "")) : Number(val);
//     return isNaN(num) ? 0 : num;
//   };

//   const autoSlug = (text) =>
//     text
//       .toLowerCase()
//       .trim()
//       .replace(/[^a-z0-9\s-]/g, "")
//       .replace(/\s+/g, "-");

//   useEffect(() => {
//     axios
//       .get(`${BASE_URL}/categories/`)
//       .then((res) => setCategories(res.data))
//       .catch((err) => console.error("Category fetch failed:", err));
//   }, []);

//   const addColor = () => {
//     if (colorInput.trim() !== "" && !form.colors.includes(colorInput)) {
//       update("colors", [...form.colors, colorInput]);
//       setVariantData((prev) => ({
//         ...prev,
//         [colorInput]: { price: "", stock: "", size: "", images: [] },
//       }));
//       setColorInput("");
//     }
//   };

//   const addTag = () => {
//     if (tagInput.trim() !== "" && !form.tags.includes(tagInput)) {
//       update("tags", [...form.tags, tagInput]);
//       setTagInput("");
//     }
//   };

//   const handleVariantInput = (color, key, value) => {
//     setVariantData((prev) => ({
//       ...prev,
//       [color]: { ...prev[color], [key]: value },
//     }));
//   };

//   const handleVariantImages = (color, files) => {
//     setVariantData((prev) => ({
//       ...prev,
//       [color]: {
//         ...prev[color],
//         images: [...(prev[color].images || []), ...Array.from(files)],
//       },
//     }));
//   };

//   const submit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     // Validation
//     if (!form.title || !form.slug || !form.description || !form.price) {
//       setMessage("Title, slug, description, and price are required");
//       return;
//     }

//     if (form.product_type === "physical") {
//       if (!form.stock || !form.category) {
//         setMessage("Stock and category are required for physical products");
//         return;
//       }
//     } else if (form.product_type === "digital") {
//       if (!form.digital_category) {
//         setMessage("Please select a digital category");
//         return;
//       }
//     }

//     const priceValue = cleanNumber(form.price);
//     const stockValue = cleanNumber(form.stock);
//     const oldPriceValue = form.old_price ? cleanNumber(form.old_price) : "";
//     const flashSaleValue = form.flash_sale_price
//       ? cleanNumber(form.flash_sale_price)
//       : "";

//     setLoading(true);

//     try {
//       const fd = new FormData();
//       fd.append("product_type", String(form.product_type));
//       fd.append(
//         "digital_category",
//         form.product_type === "digital" ? String(form.digital_category) : ""
//       );
//       fd.append("title", form.title);
//       fd.append("slug", form.slug);
//       fd.append("description", form.description);
//       fd.append("price", priceValue);
//       if (form.product_type === "physical") fd.append("stock", stockValue);
//       fd.append(
//         "category",
//         form.product_type === "physical" ? form.category : ""
//       );
//       fd.append("is_flash_sale", form.is_flash_sale);
//       fd.append("is_new", form.is_new);
//       fd.append("is_featured", form.is_featured);
//       fd.append("badge_text", form.badge_text || "");
//       fd.append("colors", JSON.stringify(form.colors));
//       fd.append("tags", JSON.stringify(form.tags));

//       if (oldPriceValue) fd.append("old_price", oldPriceValue);
//       if (flashSaleValue) fd.append("flash_sale_price", flashSaleValue);

//       const res = await axios.post(`${BASE_URL}/products/create/`, fd, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       const productId = res.data.id;

//       // Upload general thumbnails
//       if (images.length > 0) {
//         await Promise.all(
//           images.map((img) => {
//             const imgFD = new FormData();
//             imgFD.append("product", productId);
//             imgFD.append("image", img);
//             return axios.post(`${BASE_URL}/products/upload-image/`, imgFD, {
//               headers: { "Content-Type": "multipart/form-data" },
//             });
//           })
//         );
//       }

//       // Upload variant images (only physical products)
//       if (form.product_type === "physical") {
//         for (const color of Object.keys(variantData)) {
//           const v = variantData[color];

//           if (v.images && v.images.length > 0) {
//             await Promise.all(
//               v.images.map((file) => {
//                 const imgFD = new FormData();
//                 imgFD.append("product", productId);
//                 imgFD.append("image", file);
//                 imgFD.append("color", color);
//                 return axios.post(`${BASE_URL}/products/upload-variant-image/`, imgFD, {
//                   headers: { "Content-Type": "multipart/form-data" },
//                 });
//               })
//             );
//           }

//           if (v.price || v.stock || v.size) {
//             await axios.patch(`${BASE_URL}/products/${productId}/`, {
//               variants: [
//                 {
//                   color,
//                   price: cleanNumber(v.price),
//                   stock: cleanNumber(v.stock),
//                   size: v.size,
//                 },
//               ],
//             });
//           }
//         }
//       }

//       // Upload demo video (optional)
//       if (demoVideo) {
//         const videoFD = new FormData();
//         videoFD.append("product", productId);
//         videoFD.append("demo_video", demoVideo);

//         await axios.post(`${BASE_URL}/products/upload-demo-video/`, videoFD, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       }

//       // Reset form
//       setMessage("✅ Product created successfully!");
//       setForm({
//         product_type: "physical",
//         digital_category: "",
//         title: "",
//         slug: "",
//         description: "",
//         price: "",
//         stock: "",
//         old_price: "",
//         flash_sale_price: "",
//         category: "",
//         colors: [],
//         is_flash_sale: false,
//         is_new: false,
//         is_featured: false,
//         badge_text: "",
//         tags: [],
//       });
//       setImages([]);
//       setVariantData({});
//       setDemoVideo(null);
//       setColorInput("");
//       setTagInput("");
//     } catch (err) {
//       console.error("Upload failed → ", err?.response?.data ?? err);
//       setMessage(
//         "❌ Upload failed: " + JSON.stringify(err?.response?.data ?? err?.message)
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full flex justify-center p-10 bg-[#f5f7fb]">
//       <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8 border border-[#003366]/20">
//         <h2 className="text-3xl font-bold mb-6 text-[#003366]">➕ Add New Product</h2>

//         {message && (
//           <p
//             className={`mb-4 font-semibold text-center ${message.includes("✅") ? "text-green-600" : "text-red-600"
//               }`}
//           >
//             {message}
//           </p>
//         )}

//         <form onSubmit={submit} className="grid grid-cols-2 gap-6">
//           {/* Product Type */}
//           <select
//             className="border p-3 rounded-lg shadow-sm col-span-2"
//             value={form.product_type}
//             onChange={(e) => update("product_type", e.target.value)}
//           >
//             <option value="physical">Physical</option>
//             <option value="digital">Digital</option>
//           </select>

//           {/* Digital Category */}
//           {form.product_type === "digital" && (
//             <select
//               className="col-span-2 border p-3 rounded-lg shadow-sm"
//               value={form.digital_category}
//               onChange={(e) => update("digital_category", e.target.value)}
//             >
//               <option value="">Select Digital Category</option>
//               <option value="ebook">Ebook</option>
//               <option value="ecourse">Ecourse</option>
//               <option value="cac">CAC</option>
//               <option value="pos">POS</option>
//             </select>
//           )}

//           {/* The rest of your inputs remain exactly as in original code */}
//           {/* Title */}
//           <input
//             className="col-span-2 border p-3 rounded-lg shadow-sm"
//             placeholder="Product Title"
//             value={form.title}
//             onChange={(e) => {
//               update("title", e.target.value);
//               update("slug", autoSlug(e.target.value));
//             }}
//           />
//           {/* Slug */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Slug"
//             value={form.slug}
//             onChange={(e) => update("slug", autoSlug(e.target.value))}
//           />
//           {/* Price, Old Price, Flash Sale */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Price"
//             value={form.price}
//             onChange={(e) => update("price", e.target.value)}
//           />
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Old Price (optional)"
//             value={form.old_price}
//             onChange={(e) => update("old_price", e.target.value)}
//           />
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Flash Sale Price"
//             value={form.flash_sale_price}
//             onChange={(e) => update("flash_sale_price", e.target.value)}
//           />
//           {/* Stock only for physical */}
//           {form.product_type === "physical" && (
//             <input
//               className="border p-3 rounded-lg shadow-sm"
//               placeholder="Stock"
//               value={form.stock}
//               onChange={(e) => update("stock", e.target.value)}
//             />
//           )}
//           {/* Category */}
//           <select
//             className="border p-3 rounded-lg shadow-sm"
//             value={form.category}
//             onChange={(e) => update("category", e.target.value)}
//           >
//             <option value="">Select Category</option>
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>
//           {/* Badge */}
//           <input
//             className="border p-3 rounded-lg shadow-sm"
//             placeholder="Badge Text (e.g., NEW, HOT, -50%)"
//             value={form.badge_text}
//             onChange={(e) => update("badge_text", e.target.value)}
//           />

//           {/* Checkboxes */}
//           <div className="col-span-2 flex gap-6">
//             <label>
//               <input
//                 type="checkbox"
//                 checked={form.is_flash_sale}
//                 onChange={(e) => update("is_flash_sale", e.target.checked)}
//               />{" "}
//               Flash Sale
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={form.is_new}
//                 onChange={(e) => update("is_new", e.target.checked)}
//               />{" "}
//               New Arrival
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={form.is_featured}
//                 onChange={(e) => update("is_featured", e.target.checked)}
//               />{" "}
//               Featured
//             </label>
//           </div>

//           {/* Description */}
//           <textarea
//             className="col-span-2 border p-3 rounded-lg shadow-sm h-32"
//             placeholder="Description"
//             value={form.description}
//             onChange={(e) => update("description", e.target.value)}
//           />

//           {/* Colors */}
//           <div className="col-span-2">
//             <label className="text-sm font-semibold text-[#003366]">Colors</label>
//             <div className="flex gap-2 mb-2">
//               <input
//                 className="border p-2 rounded w-full"
//                 value={colorInput}
//                 onChange={(e) => setColorInput(e.target.value)}
//                 placeholder="Enter color name"
//               />
//               <button
//                 type="button"
//                 onClick={addColor}
//                 className="bg-[#003366] text-white px-4 rounded"
//               >
//                 Add
//               </button>
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {form.colors.map((c, i) => (
//                 <span key={i} className="bg-gray-200 px-2 py-1 rounded">
//                   {c}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Tags */}
//           <div className="col-span-2">
//             <label className="text-sm font-semibold text-[#003366]">Tags</label>
//             <div className="flex gap-2 mb-2">
//               <input
//                 className="border p-2 rounded w-full"
//                 value={tagInput}
//                 onChange={(e) => setTagInput(e.target.value)}
//                 placeholder="Enter tag"
//               />
//               <button
//                 type="button"
//                 onClick={addTag}
//                 className="bg-[#003366] text-white px-4 rounded"
//               >
//                 Add
//               </button>
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {form.tags.map((t, i) => (
//                 <span key={i} className="bg-blue-200 px-2 py-1 rounded">
//                   {t}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Thumbnails */}
//           <div className="col-span-2">
//             <label className="font-semibold text-[#003366] block mb-2">
//               Upload Product Thumbnails
//             </label>
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={(e) =>
//                 setImages((prev) => [...prev, ...Array.from(e.target.files)])
//               }
//               className="border p-3 rounded w-full"
//             />
//             {images.length > 0 && (
//               <div className="flex gap-2 mt-3 flex-wrap">
//                 {images.map((f, i) => (
//                   <span
//                     key={i}
//                     className="px-2 py-1 bg-blue-100 border border-blue-300 text-sm rounded"
//                   >
//                     {f.name}
//                   </span>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Variants (physical only) */}
//           {form.colors.length > 0 && form.product_type === "physical" && (
//             <div className="col-span-2">
//               <label className="font-semibold text-[#003366] block mb-2">
//                 Variant Details by Color
//               </label>
//               {form.colors.map((color) => (
//                 <div key={color} className="mb-5 p-4 border rounded-lg bg-gray-50">
//                   <p className="font-medium text-lg mb-2">{color}</p>
//                   <input
//                     type="text"
//                     placeholder="Size (optional)"
//                     className="border p-2 rounded mb-2 w-full"
//                     value={variantData[color]?.size || ""}
//                     onChange={(e) =>
//                       handleVariantInput(color, "size", e.target.value)
//                     }
//                   />
//                   <input
//                     type="text"
//                     placeholder="Price"
//                     className="border p-2 rounded mb-2 w-full"
//                     value={variantData[color]?.price || ""}
//                     onChange={(e) =>
//                       handleVariantInput(color, "price", e.target.value)
//                     }
//                   />
//                   <input
//                     type="text"
//                     placeholder="Stock"
//                     className="border p-2 rounded mb-2 w-full"
//                     value={variantData[color]?.stock || ""}
//                     onChange={(e) =>
//                       handleVariantInput(color, "stock", e.target.value)
//                     }
//                   />
//                   <input
//                     type="file"
//                     accept="image/*"
//                     multiple
//                     onChange={(e) => handleVariantImages(color, e.target.files)}
//                     className="border p-2 rounded w-full"
//                   />
//                   {variantData[color]?.images?.length > 0 && (
//                     <div className="flex gap-2 mt-3 flex-wrap">
//                       {variantData[color].images.map((f, i) => (
//                         <span
//                           key={i}
//                           className="px-2 py-1 bg-yellow-100 border border-yellow-300 text-sm rounded"
//                         >
//                           {f.name}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Demo Video */}
//           <div className="col-span-2">
//             <label className="font-semibold text-[#003366] block mb-2">
//               Upload Demo Video
//             </label>
//             <input
//               type="file"
//               accept="video/*"
//               onChange={(e) => setDemoVideo(e.target.files[0])}
//               className="border p-3 rounded w-full"
//             />
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="col-span-2 bg-[#003366] text-white p-3 rounded-lg mt-4"
//           >
//             {loading ? "Submitting..." : "Add Product"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


















import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddProduct() {
  const BASE_URL = "https://recabitesnetwork.com/store";

  const [form, setForm] = useState({
    product_type: "physical", // physical or digital
    digital_category: "",
    title: "",
    slug: "",
    description: "",
    price: "",
    stock: "",
    old_price: "",
    flash_sale_price: "",
    category: "",
    colors: [],
    is_flash_sale: false,
    is_new: false,
    is_featured: false,
    badge_text: "",
    tags: [],
  });

  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [variantData, setVariantData] = useState({});
  const [demoVideo, setDemoVideo] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [colorInput, setColorInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  const update = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const cleanNumber = (val) => {
    const num =
      typeof val === "string" ? Number(val.replace(/[^\d.]/g, "")) : Number(val);
    return isNaN(num) ? 0 : num;
  };

  const autoSlug = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/categories/`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Category fetch failed:", err));
  }, []);

  const addColor = () => {
    if (colorInput.trim() !== "" && !form.colors.includes(colorInput)) {
      update("colors", [...form.colors, colorInput]);
      setVariantData((prev) => ({
        ...prev,
        [colorInput]: { price: "", stock: "", size: "", images: [] },
      }));
      setColorInput("");
    }
  };

  const addTag = () => {
    if (tagInput.trim() !== "" && !form.tags.includes(tagInput)) {
      update("tags", [...form.tags, tagInput]);
      setTagInput("");
    }
  };

  const handleVariantInput = (color, key, value) => {
    setVariantData((prev) => ({
      ...prev,
      [color]: { ...prev[color], [key]: value },
    }));
  };

  const handleVariantImages = (color, files) => {
    setVariantData((prev) => ({
      ...prev,
      [color]: {
        ...prev[color],
        images: [...(prev[color].images || []), ...Array.from(files)],
      },
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Validation
    if (!form.title || !form.slug || !form.description || !form.price) {
      setMessage("Title, slug, description, and price are required");
      return;
    }

    if (form.product_type === "physical") {
      if (!form.stock || !form.category) {
        setMessage("Stock and category are required for physical products");
        return;
      }
    } else if (form.product_type === "digital") {
      if (!form.digital_category) {
        setMessage("Please select a digital category");
        return;
      }
    }

    setLoading(true);

    try {
      const fd = new FormData();

      // ✅ product_type must always be first and a string
      fd.append("product_type", form.product_type || "physical");
      fd.append(
        "digital_category",
        form.product_type === "digital" ? form.digital_category : ""
      );
      fd.append("title", form.title);
      fd.append("slug", form.slug);
      fd.append("description", form.description);
      fd.append("price", cleanNumber(form.price));
      if (form.product_type === "physical") fd.append("stock", cleanNumber(form.stock));
      fd.append(
        "category",
        form.product_type === "physical" ? form.category : ""
      );
      fd.append("is_flash_sale", form.is_flash_sale);
      fd.append("is_new", form.is_new);
      fd.append("is_featured", form.is_featured);
      fd.append("badge_text", form.badge_text || "");
      fd.append("colors", JSON.stringify(form.colors)); // optional for digital
      fd.append("tags", JSON.stringify(form.tags));
      if (form.old_price) fd.append("old_price", cleanNumber(form.old_price));
      if (form.flash_sale_price) fd.append("flash_sale_price", cleanNumber(form.flash_sale_price));

      // Upload general images
      images.forEach((img) => fd.append("images", img));

      // Upload demo video (optional)
      if (demoVideo) {
        fd.append("demo_video", demoVideo);
      }

      const res = await axios.post(`${BASE_URL}/products/create/`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const productId = res.data.id;

      // Upload variant images (only physical products)
      if (form.product_type === "physical") {
        for (const color of Object.keys(variantData)) {
          const v = variantData[color];
          if (v.images && v.images.length > 0) {
            await Promise.all(
              v.images.map((file) => {
                const imgFD = new FormData();
                imgFD.append("product", productId);
                imgFD.append("image", file);
                imgFD.append("color", color);
                return axios.post(
                  `${BASE_URL}/products/upload-variant-image/`,
                  imgFD,
                  { headers: { "Content-Type": "multipart/form-data" } }
                );
              })
            );
          }

          if (v.price || v.stock || v.size) {
            await axios.patch(`${BASE_URL}/products/${productId}/`, {
              variants: [
                {
                  color,
                  price: cleanNumber(v.price),
                  stock: cleanNumber(v.stock),
                  size: v.size,
                },
              ],
            });
          }
        }
      }

      // Reset form
      setMessage("✅ Product created successfully!");
      setForm({
        product_type: "physical",
        digital_category: "",
        title: "",
        slug: "",
        description: "",
        price: "",
        stock: "",
        old_price: "",
        flash_sale_price: "",
        category: "",
        colors: [],
        is_flash_sale: false,
        is_new: false,
        is_featured: false,
        badge_text: "",
        tags: [],
      });
      setImages([]);
      setVariantData({});
      setDemoVideo(null);
      setColorInput("");
      setTagInput("");
    } catch (err) {
      console.error("Upload failed → ", err?.response?.data ?? err);
      setMessage(
        "❌ Upload failed: " + JSON.stringify(err?.response?.data ?? err?.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center p-10 bg-[#f5f7fb]">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8 border border-[#003366]/20">
        <h2 className="text-3xl font-bold mb-6 text-[#003366]">➕ Add New Product</h2>

        {message && (
          <p
            className={`mb-4 font-semibold text-center ${
              message.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={submit} className="grid grid-cols-2 gap-6">
          {/* Product Type */}
          <select
            className="border p-3 rounded-lg shadow-sm col-span-2"
            value={form.product_type}
            onChange={(e) => update("product_type", e.target.value)}
          >
            <option value="physical">Physical</option>
            <option value="digital">Digital</option>
          </select>

          {/* Digital Category */}
          {form.product_type === "digital" && (
            <select
              className="col-span-2 border p-3 rounded-lg shadow-sm"
              value={form.digital_category}
              onChange={(e) => update("digital_category", e.target.value)}
            >
              <option value="">Select Digital Category</option>
              <option value="ebook">Ebook</option>
              <option value="ecourse">Ecourse</option>
              <option value="cac">CAC</option>
              <option value="pos">POS</option>
            </select>
          )}

          {/* Title */}
          <input
            className="col-span-2 border p-3 rounded-lg shadow-sm"
            placeholder="Product Title"
            value={form.title}
            onChange={(e) => {
              update("title", e.target.value);
              update("slug", autoSlug(e.target.value));
            }}
          />

          {/* Slug */}
          <input
            className="border p-3 rounded-lg shadow-sm"
            placeholder="Slug"
            value={form.slug}
            onChange={(e) => update("slug", autoSlug(e.target.value))}
          />

          {/* Price, Old Price, Flash Sale */}
          <input
            className="border p-3 rounded-lg shadow-sm"
            placeholder="Price"
            value={form.price}
            onChange={(e) => update("price", e.target.value)}
          />
          <input
            className="border p-3 rounded-lg shadow-sm"
            placeholder="Old Price (optional)"
            value={form.old_price}
            onChange={(e) => update("old_price", e.target.value)}
          />
          <input
            className="border p-3 rounded-lg shadow-sm"
            placeholder="Flash Sale Price"
            value={form.flash_sale_price}
            onChange={(e) => update("flash_sale_price", e.target.value)}
          />

          {/* Stock only for physical */}
          {form.product_type === "physical" && (
            <input
              className="border p-3 rounded-lg shadow-sm"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) => update("stock", e.target.value)}
            />
          )}

          {/* Category */}
          <select
            className="border p-3 rounded-lg shadow-sm"
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Badge */}
          <input
            className="border p-3 rounded-lg shadow-sm"
            placeholder="Badge Text (e.g., NEW, HOT, -50%)"
            value={form.badge_text}
            onChange={(e) => update("badge_text", e.target.value)}
          />

          {/* Checkboxes */}
          <div className="col-span-2 flex gap-6">
            <label>
              <input
                type="checkbox"
                checked={form.is_flash_sale}
                onChange={(e) => update("is_flash_sale", e.target.checked)}
              />{" "}
              Flash Sale
            </label>
            <label>
              <input
                type="checkbox"
                checked={form.is_new}
                onChange={(e) => update("is_new", e.target.checked)}
              />{" "}
              New Arrival
            </label>
            <label>
              <input
                type="checkbox"
                checked={form.is_featured}
                onChange={(e) => update("is_featured", e.target.checked)}
              />{" "}
              Featured
            </label>
          </div>

          {/* Description */}
          <textarea
            className="col-span-2 border p-3 rounded-lg shadow-sm h-32"
            placeholder="Description"
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />

          {/* Colors */}
          <div className="col-span-2">
            <label className="text-sm font-semibold text-[#003366]">Colors</label>
            <div className="flex gap-2 mb-2">
              <input
                className="border p-2 rounded w-full"
                value={colorInput}
                onChange={(e) => setColorInput(e.target.value)}
                placeholder="Enter color name"
              />
              <button
                type="button"
                onClick={addColor}
                className="bg-[#003366] text-white px-4 rounded"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.colors.map((c, i) => (
                <span key={i} className="bg-gray-200 px-2 py-1 rounded">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="col-span-2">
            <label className="text-sm font-semibold text-[#003366]">Tags</label>
            <div className="flex gap-2 mb-2">
              <input
                className="border p-2 rounded w-full"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Enter tag"
              />
              <button
                type="button"
                onClick={addTag}
                className="bg-[#003366] text-white px-4 rounded"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.tags.map((t, i) => (
                <span key={i} className="bg-blue-200 px-2 py-1 rounded">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="col-span-2">
            <label className="font-semibold text-[#003366] block mb-2">
              Upload Product Thumbnails
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) =>
                setImages((prev) => [...prev, ...Array.from(e.target.files)])
              }
              className="border p-3 rounded w-full"
            />
            {images.length > 0 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {images.map((f, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-blue-100 border border-blue-300 text-sm rounded"
                  >
                    {f.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Variants (physical only) */}
          {form.colors.length > 0 && form.product_type === "physical" && (
            <div className="col-span-2">
              <label className="font-semibold text-[#003366] block mb-2">
                Variant Details by Color
              </label>
              {form.colors.map((color) => (
                <div key={color} className="mb-5 p-4 border rounded-lg bg-gray-50">
                  <p className="font-medium text-lg mb-2">{color}</p>
                  <input
                    type="text"
                    placeholder="Size (optional)"
                    className="border p-2 rounded mb-2 w-full"
                    value={variantData[color]?.size || ""}
                    onChange={(e) =>
                      handleVariantInput(color, "size", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Price"
                    className="border p-2 rounded mb-2 w-full"
                    value={variantData[color]?.price || ""}
                    onChange={(e) =>
                      handleVariantInput(color, "price", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Stock"
                    className="border p-2 rounded mb-2 w-full"
                    value={variantData[color]?.stock || ""}
                    onChange={(e) =>
                      handleVariantInput(color, "stock", e.target.value)
                    }
                  />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleVariantImages(color, e.target.files)}
                    className="border p-2 rounded w-full"
                  />
                  {variantData[color]?.images?.length > 0 && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {variantData[color].images.map((f, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-yellow-100 border border-yellow-300 text-sm rounded"
                        >
                          {f.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Demo Video (optional for digital) */}
          <div className="col-span-2">
            <label className="font-semibold text-[#003366] block mb-2">
              Upload Demo Video
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setDemoVideo(e.target.files[0])}
              className="border p-3 rounded w-full"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="col-span-2 bg-[#003366] text-white p-3 rounded-lg mt-4"
          >
            {loading ? "Submitting..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
