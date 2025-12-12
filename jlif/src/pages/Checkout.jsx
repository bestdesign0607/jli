// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { CartContext } from "../context/CartContext";
// import { PaystackButton } from "react-paystack";

// export default function Checkout() {
//   const { cartItems, clearCart } = useContext(CartContext);
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [orderId, setOrderId] = useState(null);

//   // 🔥 FORMAT MONEY FOR READABILITY
//   const formatNumber = (num) =>
//     new Intl.NumberFormat("en-NG", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(num);

//   // 🔥 ENSURE NUMBER CALCULATION
//   const total = cartItems.reduce((acc, item) => {
//     const price = Number(item.unit_price) || 0;
//     return acc + price * item.quantity;
//   }, 0);

//   // Order Payload
//   const payload = {
//     email,
//     total,
//     items: cartItems.map((item) => ({
//       product: item.id,
//       quantity: item.quantity,
//       unit_price: item.unit_price,
//     })),
//   };

//   const createOrder = async () => {
//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:8000/store/orders/",
//         payload,
//         { headers: { "Content-Type": "application/json" } }
//       );
//       setOrderId(res.data.order_id);
//       return res.data.order_id;
//     } catch (err) {
//       console.log(err?.response?.data);
//       setMessage(
//         "Failed to create order: " +
//           JSON.stringify(err?.response?.data ?? err?.message)
//       );
//       return null;
//     }
//   };

//   // Paystack success handler
//   const handlePaystackSuccess = async (reference) => {
//     try {
//       await axios.post("http://127.0.0.1:8000/store/payments/confirm/", {
//         order_id: orderId,
//         provider: "paystack",
//         payment_id: reference.reference,
//       });

//       setMessage("Payment successful! Your order is confirmed.");
//       clearCart();
//       setEmail("");
//     } catch (err) {
//       console.log(err);
//       setMessage("Payment succeeded but confirmation failed.");
//     }
//   };

//   const handlePaystackClose = () => {
//     setMessage("Payment window closed. You can try again.");
//   };

//   // Paystack Config
//   const paystackConfig = {
//     reference: new Date().getTime().toString(),
//     email,
//     amount: total * 100, // Paystack uses kobo
//     publicKey: "pk_test_xxxxxxxYOUR_PUBLIC_KEY_HERExxxx",
//     onSuccess: handlePaystackSuccess,
//     onClose: handlePaystackClose,
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-[#f5f7fb] min-h-screen">
//       <h2 className="text-3xl font-bold text-[#003366] mb-6">Checkout</h2>

//       {message && (
//         <div className="mb-4 text-center font-semibold text-[#FF0000]">
//           {message}
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Cart Summary */}
//         <div className="bg-white p-6 rounded-xl shadow space-y-4">
//           <h3 className="text-xl font-bold text-[#003366] mb-4">Your Cart</h3>

//           {cartItems.length === 0 && (
//             <p className="text-gray-500">Cart is empty.</p>
//           )}

//           {cartItems.map((item) => (
//             <div
//               key={item.id}
//               className="flex justify-between items-center border-b pb-2"
//             >
//               <span>
//                 {item.title} x {item.quantity}
//               </span>

//               {/* 🔥 Formatted price */}
//               <span>NGN {formatNumber(item.unit_price * item.quantity)}</span>
//             </div>
//           ))}

//           <div className="flex justify-between font-bold mt-4 text-lg">
//             <span>Total:</span>

//             {/* 🔥 Formatted total */}
//             <span>NGN {formatNumber(total)}</span>
//           </div>
//         </div>

//         {/* Checkout Form */}
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h3 className="text-xl font-bold text-[#003366] mb-4">
//             Your Information
//           </h3>

//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full border p-3 rounded-lg focus:outline-[#003366] mb-4"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <PaystackButton
//             className="w-full bg-[#FF0000] py-3 rounded-lg text-white font-bold hover:bg-red-600 transition-all"
//             {...paystackConfig}
//             onClick={async () => {
//               if (!email) {
//                 setMessage("Email is required for payment.");
//                 return;
//               }

//               const id = await createOrder();
//               if (!id) return;
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
















// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { CartContext } from "../context/CartContext";
// import PaystackPop from "@paystack/inline-js";

// export default function Checkout() {
//   const { cartItems, clearCart } = useContext(CartContext);
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [orderId, setOrderId] = useState(null);

//   const total = cartItems.reduce((acc, item) => {
//     const price = Number(item.unit_price) || 0;
//     return acc + price * item.quantity;
//   }, 0);

//   const payload = {
//     email,
//     total,
//     items: cartItems.map((item) => ({
//       product: item.id,
//       quantity: item.quantity,
//       unit_price: item.unit_price,
//     })),
//   };

//   const createOrder = async () => {
//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:8000/store/orders/",
//         payload,
//         { headers: { "Content-Type": "application/json" } }
//       );

//       setOrderId(res.data.order_id);
//       return res.data.order_id;
//     } catch (err) {
//       setMessage("Failed to create order.");
//       return null;
//     }
//   };

//   const startPaystackPayment = async () => {
//     if (!email) return setMessage("Email required");

//     const id = await createOrder();
//     if (!id) return;

//     const paystack = new PaystackPop();

//     paystack.newTransaction({
//       key: "pk_test_xxxxxxxxxxx", // change this
//       email,
//       amount: total * 100,
//       onSuccess: async (ref) => {
//         await axios.post("http://127.0.0.1:8000/store/payments/confirm/", {
//           order_id: id,
//           provider: "paystack",
//           payment_id: ref.reference,
//         });

//         clearCart();
//         setMessage("Payment Successful & Order confirmed!");
//       },
//       onCancel: () => {
//         setMessage("Payment cancelled");
//       },
//     });
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-[#f5f7fb] min-h-screen">

//       <h2 className="text-3xl font-bold text-[#003366] mb-6">Checkout</h2>

//       {message && <p className="mb-4 text-[#FF0000] font-semibold">{message}</p>}

//       <div className="bg-white p-6 rounded-xl shadow">

//         <input
//           className="w-full border p-3 rounded-lg mb-3"
//           placeholder="Email Address"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <button
//           onClick={startPaystackPayment}
//           className="w-full bg-[#FF0000] text-white py-3 rounded-lg font-bold hover:bg-red-600"
//         >
//           Pay NGN {total}
//         </button>

//       </div>
//     </div>
//   );
// }













// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { CartContext } from "../context/CartContext";
// import PaystackPop from "@paystack/inline-js";

// export default function Checkout() {

//   const { cartItems, clearCart } = useContext(CartContext);

//   const [step, setStep] = useState(1);
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [orderId, setOrderId] = useState(null);

//   const [address, setAddress] = useState({
//     fullname: "",
//     phone: "",
//     street: "",
//     city: "",
//     state: "",
//     country: "",
//   });

//   const total = cartItems.reduce((acc, item) => {
//     const price = Number(item.unit_price) || 0;
//     return acc + price * item.quantity;
//   }, 0);

//   const validEmail = (str) => /\S+@\S+\.\S+/.test(str);


//   // =========================
//   // PAYLOAD
//   // =========================
//   const payload = {
//     email,
//     total,
//     items: cartItems.map((item) => ({
//       product: item.id,
//       quantity: item.quantity,
//       unit_price: item.unit_price,
//     })),

//     // 🔥 NOT nested — flat!
//     shipping_fullname: address.fullname,
//     shipping_phone: address.phone,
//     shipping_street: address.street,
//     shipping_city: address.city,
//     shipping_state: address.state,
//     shipping_country: address.country,
//   };


//   // =========================
//   // CREATE ORDER
//   // =========================
//   const createOrder = async () => {
//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:8000/store/orders/",
//         payload,
//         { headers: { "Content-Type": "application/json" } }
//       );

//       setOrderId(res.data.order_id);
//       return res.data.order_id;

//     } catch (err) {
//       setMessage("Order failed: " + JSON.stringify(err?.response?.data));
//       return null;
//     }
//   };


//   // =========================
//   // PAYSTACK
//   // =========================
//   const startPaystackPayment = async () => {

//     const id = await createOrder();
//     if (!id) return;

//     const paystack = new PaystackPop();

//     paystack.newTransaction({
//       key: "pk_test_xxxxxxxxxxxxxxxxxx", // CHANGE!
//       email,
//       amount: total * 100,

//       onSuccess: async (ref) => {

//         await axios.post("http://127.0.0.1:8000/store/payments/confirm/", {
//           order_id: id,
//           provider: "paystack",
//           payment_id: ref.reference,
//         });

//         clearCart();
//         setStep(4);
//       },

//       onCancel: () => {
//         setMessage("Payment cancelled.");
//       },
//     });
//   };


//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-[#f8fafc] min-h-screen">

//       <h1 className="text-3xl font-bold text-[#003366] mb-8">Checkout</h1>

//       {message && <p className="text-red-600 mb-4">{message}</p>}



//       {/* STEP 1 - EMAIL */}
//       {step === 1 && (
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h3 className="font-bold text-xl mb-4">Enter Email</h3>

//           <input
//             className="border w-full p-3 rounded-lg mb-4"
//             placeholder="Email Address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <button
//             className="bg-[#003366] text-white w-full p-3 rounded-lg"
//             onClick={() => {
//               if (!validEmail(email)) return setMessage("Invalid email!");
//               setMessage("");
//               setStep(2);
//             }}
//           >
//             Continue
//           </button>
//         </div>
//       )}



//       {/* STEP 2 - ADDRESS */}
//       {step === 2 && (
//         <div className="bg-white p-6 rounded-xl shadow space-y-3">

//           <h3 className="font-bold text-xl mb-4">Shipping Address</h3>

//           {Object.keys(address).map((key) => (
//             <input
//               key={key}
//               className="border w-full p-3 rounded-lg"
//               placeholder={key.toUpperCase()}
//               value={address[key]}
//               onChange={(e) =>
//                 setAddress({ ...address, [key]: e.target.value })
//               }
//             />
//           ))}

//           <button
//             onClick={() => setStep(3)}
//             className="bg-[#003366] text-white w-full p-3 rounded-lg"
//           >
//             Continue to Payment
//           </button>
//         </div>
//       )}



//       {/* STEP 3 - PAYMENT */}
//       {step === 3 && (
//         <div className="bg-white p-6 rounded-xl shadow">

//           <h3 className="font-bold text-xl mb-4">Payment</h3>

//           <p className="text-lg font-bold mb-6">Total: ₦{total}</p>

//           <button
//             onClick={startPaystackPayment}
//             className="bg-[#FF0000] w-full p-3 rounded-lg text-white font-bold"
//           >
//             Pay Now
//           </button>

//         </div>
//       )}



//       {/* STEP 4 - SUCCESS */}
//       {step === 4 && (
//         <div className="bg-white p-6 rounded-xl shadow text-center">
//           <h3 className="text-2xl font-bold text-green-600 mb-2">
//             🎉 Order Completed!
//           </h3>
//           <p className="text-gray-600">Thank you for your purchase.</p>
//         </div>
//       )}

//     </div>
//   );
// }












// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { CartContext } from "../context/CartContext";
// import PaystackPop from "@paystack/inline-js";

// export default function Checkout() {
//   const { cartItems, clearCart } = useContext(CartContext);

//   // Step 1: Email → Step 2: OTP → Step 3: Address → Step 4: Payment → Step 5: Success
//   const [step, setStep] = useState(1);
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [address, setAddress] = useState({
//     fullname: "",
//     phone: "",
//     street: "",
//     city: "",
//     state: "",
//     country: "",
//   });
//   const [message, setMessage] = useState("");
//   const [orderId, setOrderId] = useState(null);

//   const total = cartItems.reduce(
//     (acc, item) => acc + (item.unit_price || 0) * item.quantity,
//     0
//   );

//   // ====== Step 1: Send OTP ======
//   const sendOtp = async () => {
//     try {
//       await axios.post("http://127.0.0.1:8000/store/email/send-otp/", { email });
//       setMessage("OTP sent to your email!");
//       setStep(2);
//     } catch (err) {
//       setMessage("Failed to send OTP. Check email format.");
//     }
//   };

//   // ====== Step 2: Verify OTP ======
//   const verifyOtp = async () => {
//     try {
//       const res = await axios.post("http://127.0.0.1:8000/store/email/verify/", { email, otp });
//       if (res.data.verified) {
//         setMessage("Email verified!");
//         setStep(3);
//       } else {
//         setMessage("Invalid OTP, try again.");
//       }
//     } catch {
//       setMessage("Error verifying OTP.");
//     }
//   };

//   // ====== Step 3 → 4: Create Order & Start Paystack ======
//   const startPaystackPayment = async () => {
//     try {
//       const payload = {
//         email,
//         total,
//         items: cartItems.map((item) => ({
//           product: item.id,
//           quantity: item.quantity,
//           unit_price: item.unit_price,
//         })),
//         shipping_address: address,
//       };

//       const res = await axios.post("http://127.0.0.1:8000/store/orders/", payload);
//       const id = res.data.order_id;
//       setOrderId(id);

//       const paystack = new PaystackPop();
//       paystack.newTransaction({
//         key: "pk_test_xxxxxxx", // your public key
//         email,
//         amount: total * 100,
//         onSuccess: async (ref) => {
//           await axios.post("http://127.0.0.1:8000/store/payments/confirm/", {
//             order_id: id,
//             provider: "paystack",
//             payment_id: ref.reference,
//           });
//           clearCart();
//           setMessage("Payment successful!");
//           setStep(5);
//         },
//         onCancel: () => setMessage("Payment cancelled"),
//       });
//     } catch (err) {
//       setMessage("Failed to create order.");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-[#f5f7fb] min-h-screen">
//       <h2 className="text-3xl font-bold text-[#003366] mb-6">Checkout</h2>
//       {message && <p className="mb-4 font-semibold text-[#FF0000]">{message}</p>}

//       {/* STEP 1: Email */}
//       {step === 1 && (
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h3 className="text-xl font-bold mb-4">Enter Email</h3>
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full border p-3 rounded-lg mb-3"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <button
//             onClick={sendOtp}
//             className="bg-[#003366] w-full text-white py-3 rounded-lg"
//           >
//             Send OTP
//           </button>
//         </div>
//       )}

//       {/* STEP 2: OTP */}
//       {step === 2 && (
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h3 className="text-xl font-bold mb-4">Enter OTP sent to {email}</h3>
//           <input
//             type="text"
//             placeholder="OTP"
//             className="w-full border p-3 rounded-lg mb-3"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//           />
//           <button
//             onClick={verifyOtp}
//             className="bg-[#003366] w-full text-white py-3 rounded-lg"
//           >
//             Verify OTP
//           </button>
//         </div>
//       )}

//       {/* STEP 3: Address */}
//       {step === 3 && (
//         <div className="bg-white p-6 rounded-xl shadow space-y-3">
//           <h3 className="text-xl font-bold mb-4">Shipping Address</h3>
//           {Object.keys(address).map((key) => (
//             <input
//               key={key}
//               placeholder={key.toUpperCase()}
//               className="w-full border p-3 rounded-lg"
//               value={address[key]}
//               onChange={(e) =>
//                 setAddress({ ...address, [key]: e.target.value })
//               }
//             />
//           ))}
//           <button
//             onClick={startPaystackPayment}
//             className="bg-[#FF0000] w-full text-white py-3 rounded-lg font-bold"
//           >
//             Proceed to Payment
//           </button>
//         </div>
//       )}

//       {/* STEP 5: Success */}
//       {step === 5 && (
//         <div className="bg-white p-6 rounded-xl shadow text-center">
//           <h2 className="text-2xl font-bold text-green-600">🎉 Order Completed!</h2>
//           <p className="text-gray-600 mt-2">Thank you for your purchase.</p>
//         </div>
//       )}
//     </div>
//   );
// }










// import React, { useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { CartContext } from "../context/CartContext";
// import PaystackPop from "@paystack/inline-js";
// import { useNavigate } from "react-router-dom";

// export default function Checkout() {
//   const { cartItems, clearCart } = useContext(CartContext);
//   const navigate = useNavigate();

//   const [message, setMessage] = useState("");
//   const [orderId, setOrderId] = useState(null);

//   const total = cartItems.reduce(
//     (acc, item) => acc + (item.unit_price || 0) * item.quantity,
//     0
//   );

//   const checkoutEmail = localStorage.getItem("checkoutEmail");
//   const checkoutAddress = JSON.parse(localStorage.getItem("checkoutAddress") || "{}");

//   // Redirect if email or address not available
//   useEffect(() => {
//     if (!checkoutEmail) return navigate("/checkout/email");
//     if (!checkoutAddress || Object.values(checkoutAddress).some((v) => !v)) {
//       return navigate("/checkout/address");
//     }
//   }, [checkoutEmail, checkoutAddress, navigate]);

//   // Start Paystack payment
//   const startPaystackPayment = async () => {
//     try {
//       const payload = {
//         email: checkoutEmail,
//         total,
//         items: cartItems.map((item) => ({
//           product: item.id,
//           quantity: item.quantity,
//           unit_price: item.unit_price,
//         })),

//         // ⭐ CORRECT SHIPPING FIELD NAMES ⭐
//         shipping_fullname: checkoutAddress.fullname,
//         shipping_phone: checkoutAddress.phone,
//         shipping_street: checkoutAddress.street,
//         shipping_city: checkoutAddress.city,
//         shipping_state: checkoutAddress.state,
//         shipping_country: checkoutAddress.country,
//       };

//       const res = await axios.post("http://127.0.0.1:8000/store/orders/", payload);
//       const id = res.data.order_id;
//       setOrderId(id);

//       const paystack = new PaystackPop();
//       paystack.newTransaction({
//         key: "pk_live_5508690f5b1a276e24371dbdddd6d84d9a971cdb", // Replace with your public key
//         email: checkoutEmail,
//         amount: total * 100,
//         onSuccess: async (ref) => {
//           await axios.post("http://127.0.0.1:8000/store/payments/confirm/", {
//             order_id: id,
//             provider: "paystack",
//             payment_id: ref.reference,
//           });
//           clearCart();
//           navigate("/checkout/success");
//         },
//         onCancel: () => setMessage("Payment cancelled"),
//       });
//     } catch (err) {
//       console.error(err?.response?.data);
//       setMessage("Failed to create order. Try again.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow">
//       <h2 className="text-2xl font-bold mb-4 text-[#003366]">Checkout Payment</h2>
//       {message && <p className="text-red-600 mb-4">{message}</p>}
//       <p className="mb-4 font-semibold">
//         Total Amount: ₦{total.toLocaleString()}
//       </p>
//       <button
//         onClick={startPaystackPayment}
//         className="w-full bg-[#FF0000] text-white py-3 rounded-lg font-bold"
//       >
//         Pay Now
//       </button>
//     </div>
//   );
// }












// import React, { useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { CartContext } from "../context/CartContext";
// import PaystackPop from "@paystack/inline-js";
// import { useNavigate } from "react-router-dom";

// export default function Checkout() {
//   const { cartItems, clearCart } = useContext(CartContext);
//   const navigate = useNavigate();

//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("access_token");
//   const checkoutEmail = localStorage.getItem("checkoutEmail");
//   const checkoutAddress = JSON.parse(
//     localStorage.getItem("checkoutAddress") || "{}"
//   );

//   const total = cartItems.reduce(
//     (acc, item) => acc + (item.unit_price || 0) * item.quantity,
//     0
//   );

//   /* ✅ Guard checkout flow + auth */
//   useEffect(() => {
//     if (!token) {
//       navigate("/login", { state: { from: "/checkout/payment" } });
//       return;
//     }
//     if (!checkoutEmail) navigate("/checkout/email");
//     if (!checkoutAddress || Object.values(checkoutAddress).some((v) => !v))
//       navigate("/checkout/address");
//   }, [token, checkoutEmail, checkoutAddress, navigate]);

//   /* --------------------------------------------
//      ✅ Payment-first flow: send order details on success
//   --------------------------------------------- */
//   const startPaystackPayment = () => {
//     if (loading) return;
//     setMessage("");
//     setLoading(true);

//     const paystack = new PaystackPop();
//     paystack.newTransaction({
//       key: "pk_live_5508690f5b1a276e24371dbdddd6d84d9a971cdb",
//       email: checkoutEmail,
//       amount: Math.round(total * 100),

//       onSuccess: async (ref) => {
//         try {
//           // Send order + payment to backend in one call
//           const payload = {
//             payment_id: ref.reference,
//             provider: "paystack",
//             email: checkoutEmail,
//             total,
//             items: cartItems.map((item) => ({
//               product: item.id,
//               quantity: item.quantity,
//               unit_price: item.unit_price,
//             })),
//             shipping_fullname: checkoutAddress.fullname,
//             shipping_phone: checkoutAddress.phone,
//             shipping_street: checkoutAddress.street,
//             shipping_city: checkoutAddress.city,
//             shipping_state: checkoutAddress.state,
//             shipping_country: checkoutAddress.country,
//           };

//           const res = await axios.post(
//             "http://127.0.0.1:8000/store/payments/confirm/",
//             payload,
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           );

//           clearCart();
//           navigate(`/checkout/success?order_id=${res.data.order_id}`);
//         } catch (err) {
//           console.error("Payment confirmation failed:", err?.response?.data || err);
//           setMessage("Payment was successful but order creation failed. Contact support.");
//           setLoading(false);
//         }
//       },

//       onCancel: () => {
//         setMessage("Payment cancelled");
//         setLoading(false);
//       },
//     });
//   };

//   /* --------------------------------------------
//      ✅ UI
//   --------------------------------------------- */
//   return (
//     <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow">
//       <h2 className="text-2xl font-bold mb-4 text-[#003366]">Checkout Payment</h2>

//       {message && <p className="text-red-600 mb-4 text-sm">{message}</p>}

//       <p className="mb-4 font-semibold">Total Amount: ₦{total.toLocaleString()}</p>

//       <button
//         onClick={startPaystackPayment}
//         disabled={loading || total <= 0}
//         className={`w-full text-white py-3 rounded-lg font-bold transition ${
//           loading ? "bg-gray-400" : "bg-[#FF0000] hover:bg-[#cc0000]"
//         }`}
//       >
//         {loading ? "Processing..." : "Pay Now"}
//       </button>
//     </div>
//   );
// }














import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import PaystackPop from "@paystack/inline-js";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Get user/auth info
  const token = localStorage.getItem("access_token");
  const checkoutEmail = localStorage.getItem("checkoutEmail");
  const checkoutAddress = JSON.parse(
    localStorage.getItem("checkoutAddress") || "{}"
  );

  // Calculate total
  const total = cartItems.reduce(
    (acc, item) => acc + (item.unit_price || 0) * item.quantity,
    0
  );

  // ✅ Guard: enforce auth and checkout steps
  useEffect(() => {
    if (!token) navigate("/login", { state: { from: "/checkout/payment" } });
    else if (!checkoutEmail) navigate("/checkout/email");
    else if (!checkoutAddress || Object.values(checkoutAddress).some((v) => !v))
      navigate("/checkout/address");
  }, [token, checkoutEmail, checkoutAddress, navigate]);

  // --------------------------------------------
  // Payment + order creation
  // --------------------------------------------
  const startPaystackPayment = () => {
    if (loading) return;

    setMessage("");
    setLoading(true);

    if (!cartItems.length || total <= 0) {
      setMessage("Your cart is empty.");
      setLoading(false);
      return;
    }

    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: "pk_live_5508690f5b1a276e24371dbdddd6d84d9a971cdb", // Replace with your key
      email: checkoutEmail,
      amount: Math.round(total * 100), // amount in kobo

      onSuccess: async (ref) => {
        try {
          // Send order + payment details to backend
          const res = await axios.post(
            "http://127.0.0.1:8000/store/payments/confirm/",
            {
              payment_id: ref.reference,
              provider: "paystack",
              email: checkoutEmail,
              total,
              items: cartItems.map((item) => ({
                product: item.id,
                quantity: item.quantity,
                unit_price: item.unit_price,
              })),
              shipping_fullname: checkoutAddress.fullname,
              shipping_phone: checkoutAddress.phone,
              shipping_street: checkoutAddress.street,
              shipping_city: checkoutAddress.city,
              shipping_state: checkoutAddress.state,
              shipping_country: checkoutAddress.country,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          // Success: clear cart & navigate to success page
          clearCart();
          navigate(`/checkout/success?order_id=${res.data.order_id}`);
        } catch (err) {
          console.error("Order creation failed:", err?.response?.data || err);
          setMessage(
            "Payment was successful but order confirmation failed. Contact support."
          );
          setLoading(false);
        }
      },

      onCancel: () => {
        setMessage("Payment cancelled");
        setLoading(false);
      },
    });
  };

  // --------------------------------------------
  // UI
  // --------------------------------------------
  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-[#003366]">Checkout Payment</h2>

      {message && <p className="text-red-600 mb-4 text-sm">{message}</p>}

      <p className="mb-4 font-semibold">Total Amount: ₦{total.toLocaleString()}</p>

      <button
        onClick={startPaystackPayment}
        disabled={loading || total <= 0}
        className={`w-full text-white py-3 rounded-lg font-bold transition ${
          loading ? "bg-gray-400" : "bg-[#FF0000] hover:bg-[#cc0000]"
        }`}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
















// import React, { useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { CartContext } from "../context/CartContext";
// import PaystackPop from "@paystack/inline-js";
// import { useNavigate } from "react-router-dom";

// export default function Checkout() {
//   const { cartItems, clearCart } = useContext(CartContext);
//   const navigate = useNavigate();

//   const [message, setMessage] = useState("");
//   const [orderId, setOrderId] = useState(null);

//   const total = cartItems.reduce(
//     (acc, item) => acc + (item.unit_price || 0) * item.quantity,
//     0
//   );

//   const checkoutEmail = localStorage.getItem("checkoutEmail");
//   const checkoutAddress = JSON.parse(localStorage.getItem("checkoutAddress") || "{}");

//   useEffect(() => {
//     if (!checkoutEmail) return navigate("/checkout/email");

//     if (!checkoutAddress || Object.values(checkoutAddress).some((v) => !v)) {
//       return navigate("/checkout/address");
//     }
//   }, [checkoutEmail, checkoutAddress, navigate]);

//   const startPaystackPayment = async () => {
//     try {
//       const payload = {
//         email: checkoutEmail,
//         total,
//         items: cartItems.map((item) => ({
//           product: item.id,
//           quantity: item.quantity,
//           unit_price: item.unit_price,
//         })),

//         // ⭐ CORRECT SHIPPING FIELD NAMES ⭐
//         shipping_fullname: checkoutAddress.fullname,
//         shipping_phone: checkoutAddress.phone,
//         shipping_street: checkoutAddress.street,
//         shipping_city: checkoutAddress.city,
//         shipping_state: checkoutAddress.state,
//         shipping_country: checkoutAddress.country,
//       };

//       const res = await axios.post("http://127.0.0.1:8000/store/orders/", payload);

//       const id = res.data.id; // serializer returns `id`
//       setOrderId(id);

//       const paystack = new PaystackPop();

//       paystack.newTransaction({
//         key: "pk_live_5508690f5b1a276e24371dbdddd6d84d9a971cdb",
//         email: checkoutEmail,
//         amount: total * 100,

//         onSuccess: async (ref) => {
//           await axios.post("http://127.0.0.1:8000/store/payments/confirm/", {
//             order_id: id,
//             provider: "paystack",
//             payment_id: ref.reference,
//           });

//           clearCart();
//           navigate("/checkout/success");
//         },

//         onCancel: () => setMessage("Payment cancelled"),
//       });

//     } catch (err) {
//       console.error(err?.response?.data);
//       setMessage("Failed to create order. Try again.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow">
//       <h2 className="text-2xl font-bold mb-4 text-[#003366]">Checkout Payment</h2>

//       {message && <p className="text-red-600 mb-4">{message}</p>}

//       <p className="mb-4 font-semibold">
//         Total Amount: ₦{total.toLocaleString()}
//       </p>

//       <button
//         onClick={startPaystackPayment}
//         className="w-full bg-[#FF0000] text-white py-3 rounded-lg font-bold"
//       >
//         Pay Now
//       </button>
//     </div>
//   );
// }
