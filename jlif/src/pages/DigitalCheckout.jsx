// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import PaystackPop from "@paystack/inline-js";
// import { useParams, useNavigate } from "react-router-dom";

// export default function DigitalCheckout() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const token = localStorage.getItem("access_token");
//   const email = localStorage.getItem("checkoutEmail");

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (!token) navigate("/login");
//     if (!email) navigate("/checkout/email");

//     axios
//       .get(`http://127.0.0.1:8000/store/products/${id}/`)
//       .then(res => setProduct(res.data));
//   }, [id, token, email, navigate]);

//   const payNow = () => {
//     if (!product || loading) return;

//     setLoading(true);

//     const paystack = new PaystackPop();
//     paystack.newTransaction({
//       key: "pk_live_5508690f5b1a276e24371dbdddd6d84d9a971cdb",
//       email,
//       amount: Math.round(product.price * 100),

//       onSuccess: async (ref) => {
//         try {
//           await axios.post(
//             "http://127.0.0.1:8000/store/digital-orders/",
//             {
//               product: product.id,
//               email,
//               payment_reference: ref.reference,
//             },
//             { headers: { Authorization: `Bearer ${token}` } }
//           );

//           navigate("/digital-success");
//         } catch (err) {
//           setMessage("Payment succeeded but order failed.");
//           setLoading(false);
//         }
//       },

//       onCancel: () => {
//         setMessage("Payment cancelled");
//         setLoading(false);
//       },
//     });
//   };

//   if (!product) return null;

//   return (
//     <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow">
//       <h2 className="text-xl font-bold mb-3">{product.title}</h2>
//       <p className="mb-4 font-semibold">₦{product.price.toLocaleString()}</p>

//       {message && <p className="text-red-500 mb-2">{message}</p>}

//       <button
//         onClick={payNow}
//         disabled={loading}
//         className="w-full bg-green-600 text-white py-3 rounded font-bold"
//       >
//         {loading ? "Processing..." : "Pay Now"}
//       </button>
//     </div>
//   );
// }











// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import PaystackPop from "@paystack/inline-js";
// import { useParams, useNavigate } from "react-router-dom";

// export default function DigitalCheckout() {
//     const { id } = useParams();
//     const navigate = useNavigate();

//     const token = localStorage.getItem("access_token");
//     const email = localStorage.getItem("checkoutEmail");

//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState("");
//     const DEMO_MODE = true; // 🔴 set to false in production


//     useEffect(() => {
//         if (!token) navigate("/login");
//         if (!email) navigate("/checkout/email");

//         axios
//             .get(`http://127.0.0.1:8000/store/products/${id}/`)
//             .then(res => setProduct(res.data))
//             .catch(() => navigate("/"));
//     }, [id, token, email, navigate]);

//     // const payNow = () => {
//     //     if (!product || loading) return;

//     //     setLoading(true);

//     //     const paystack = new PaystackPop();
//     //     paystack.newTransaction({
//     //         key: "pk_live_5508690f5b1a276e24371dbdddd6d84d9a971cdb",
//     //         email,
//     //         amount: Math.round(product.price * 100),

//     //         //   onSuccess: async (ref) => {
//     //         //     try {
//     //         //       await axios.post(
//     //         //         "http://127.0.0.1:8000/store/digital-orders/",
//     //         //         {
//     //         //           product: product.id,
//     //         //           email,
//     //         //           payment_reference: ref.reference,
//     //         //         },
//     //         //         { headers: { Authorization: `Bearer ${token}` } }
//     //         //       );

//     //         //       navigate("/digital-success");
//     //         //     } catch (err) {
//     //         //       setMessage("Payment succeeded but order failed.");
//     //         //       setLoading(false);
//     //         //     }
//     //         //   },
//     //         onSuccess: async (ref) => {
//     //             try {
//     //                 await axios.post(
//     //                     "http://127.0.0.1:8000/store/digital-orders/",
//     //                     {
//     //                         product: product.id,
//     //                         email,
//     //                         payment_reference: ref.reference,
//     //                     },
//     //                     { headers: { Authorization: `Bearer ${token}` } }
//     //                 );

//     //                 navigate(`/digital-post-payment/${product.id}?ref=${ref.reference}`);
//     //             } catch (err) {
//     //                 setMessage("Payment succeeded but order failed.");
//     //                 setLoading(false);
//     //             }
//     //         },


//     //         onCancel: () => {
//     //             setMessage("Payment cancelled");
//     //             setLoading(false);
//     //         },
//     //     });
//     // };
//     const payNow = async () => {
//   if (!product || loading) return;

//   setLoading(true);

//   // ✅ DEMO MODE – bypass Paystack
//   if (DEMO_MODE) {
//     const fakeReference = "DEMO_REF_" + Date.now();

//     navigate(`/digital-post-payment/${product.id}?ref=${fakeReference}`);
//     return;
//   }

//   // 🔴 REAL PAYSTACK FLOW
//   const paystack = new PaystackPop();
//   paystack.newTransaction({
//     key: "pk_live_5508690f5b1a276e24371dbdddd6d84d9a971cdb",
//     email,
//     amount: Math.round(product.price * 100),

//     onSuccess: (ref) => {
//       navigate(`/digital-post-payment/${product.id}?ref=${ref.reference}`);
//     },

//     onCancel: () => {
//       setMessage("Payment cancelled");
//       setLoading(false);
//     },
//   });
// };

//     if (!product) return null;

//     return (
//         <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow">
//             <h2 className="text-xl font-bold mb-3">{product.title}</h2>
//             <p className="mb-4 font-semibold">
//                 ₦{product.price.toLocaleString()}
//             </p>

//             {/* 🔔 PAYMENT INSTRUCTION */}
//             <div className="mb-4 p-3 rounded-lg bg-yellow-50 border border-yellow-300 text-sm text-yellow-800">
//                 <strong>Important:</strong> You will be required to upload your proof of
//                 payment. Proceed to payment by clicking <strong>Pay Now</strong> and pay
//                 via transfer.
//             </div>

//             {message && <p className="text-red-500 mb-2">{message}</p>}

//             <button
//                 onClick={payNow}
//                 disabled={loading}
//                 className="w-full bg-green-600 text-white py-3 rounded font-bold"
//             >
//                 {loading ? "Processing..." : "Pay Now"}
//             </button>
//         </div>
//     );
// }















import React, { useEffect, useState } from "react";
import axios from "axios";
import PaystackPop from "@paystack/inline-js";
import { useParams, useNavigate } from "react-router-dom";

export default function DigitalCheckout() {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");
  const email = localStorage.getItem("checkoutEmail");

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) return navigate("/login");
    if (!email) return navigate("/checkout/email");

    axios
      .get(`https://recabitesnetwork.com/store/products/${id}/`)
      .then((res) => setProduct(res.data))
      .catch(() => navigate("/"));
  }, [id, token, email, navigate]);

  const payNow = () => {
    if (!product || loading) return;

    setLoading(true);

    const paystack = new PaystackPop();

    paystack.newTransaction({
      key: "pk_live_5508690f5b1a276e24371dbdddd6d84d9a971cdb", // 🔴 LIVE KEY
      email,
      amount: Math.round(Number(product.price) * 100),

      onSuccess: async (ref) => {
        try {
          // ✅ Create digital order after successful payment
          await axios.post(
            "http://127.0.0.1:8000/store/digital-orders/",
            {
              product: product.id,
              email,
              payment_reference: ref.reference,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          navigate(`/digital-post-payment/${product.id}?ref=${ref.reference}`);
        } catch (err) {
          console.error(err);
          setMessage("Payment succeeded but order creation failed.");
          setLoading(false);
        }
      },

      onCancel: () => {
        setMessage("Payment cancelled");
        setLoading(false);
      },
    });
  };

  if (!product) return null;

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-3">{product.title}</h2>

      <p className="mb-4 font-semibold">
        ₦{Number(product.price).toLocaleString()}
      </p>

      {message && <p className="text-red-500 mb-2">{message}</p>}
      {/* 🔔 PAYMENT INSTRUCTION */}
      <div className="mb-4 p-3 rounded-lg bg-yellow-50 border border-yellow-300 text-sm text-yellow-800">
        <strong>Important:</strong> You will be required to upload your proof of
        payment. Proceed to payment by clicking <strong>Pay Now</strong> and pay
        via transfer.
      </div>

      <button
        onClick={payNow}
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700 transition"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
