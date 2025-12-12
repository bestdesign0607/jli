// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Load products on mount
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/store/products/");
//       setProducts(res.data);
//     } catch (err) {
//       setError("Failed to load products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete a product
//   const deleteProduct = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;

//     try {
//       await axios.delete(`http://127.0.0.1:8000/store/products/${id}/`);
//       setProducts(products.filter((p) => p.id !== id));
//     } catch (err) {
//       alert("Failed to delete product");
//     }
//   };

//   if (loading) return <p className="p-4">Loading products...</p>;
//   if (error) return <p className="p-4 text-red-600">{error}</p>;

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
//       <h1 className="text-3xl font-bold mb-6">Products</h1>

//       {products.length === 0 ? (
//         <p>No products available</p>
//       ) : (
//         <table className="w-full border">
//           <thead>
//             <tr className="bg-gray-100 text-left">
//               <th className="p-3 border">Image</th>
//               <th className="p-3 border">Name</th>
//               <th className="p-3 border">Price</th>
//               <th className="p-3 border text-center">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {products.map((product) => (
//               <tr key={product.id} className="border-b">
//                 <td className="p-3 border">
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                 </td>
//                 <td className="p-3 border">{product.name}</td>
//                 <td className="p-3 border">₦{product.price.toLocaleString()}</td>

//                 <td className="p-3 text-center border">
//                   <button
//                     onClick={() => deleteProduct(product.id)}
//                     className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//                   >
//                     Remove
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }












import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/store/products/");
      setProducts(res.data);
      setError(""); // clear any previous error
    } catch (err) {
      console.error(err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/store/products/${id}/`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.detail || "Failed to delete product. Please try again."
      );
    }
  };

  if (loading) return <p className="p-4">Loading products...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="p-3 border">
                  {product.images?.length > 0 ? (
                    <img
                      src={product.images[0].image}
                      alt={product.images[0].alt || product.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <span>No image</span>
                  )}
                </td>

                <td className="p-3 border">{product.title}</td>

                <td className="p-3 border">
                  ₦{product.price?.toLocaleString()}
                </td>

                <td className="p-3 text-center border">
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
