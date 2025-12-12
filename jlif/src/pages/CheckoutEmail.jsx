// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function CheckoutEmail() {
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState(1); // 1: enter email, 2: enter OTP
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const validEmail = (str) => /\S+@\S+\.\S+/.test(str);

//   // Step 1: Send OTP
//   const sendOtp = async () => {
//     if (!validEmail(email)) {
//       setError("Please enter a valid email");
//       return;
//     }

//     try {
//       await axios.post("http://127.0.0.1:8000/store/email/send-otp/", {
//         email,
//       });
//       setError("");
//       setMessage(`OTP sent to ${email}. Please check your email.`);
//       setStep(2);
//     } catch (err) {
//       console.log(err?.response?.data);
//       setError("Failed to send OTP. Try again.");
//     }
//   };

//   // Step 2: Verify OTP
//   const verifyOtp = async () => {
//     if (!otp) {
//       setError("Please enter the OTP sent to your email");
//       return;
//     }

//     try {
//       const res = await axios.post("http://127.0.0.1:8000/store/email/verify/", {
//         email,
//         otp,
//       });
//       if (res.data.verified) {
//         // OTP verified, store email and navigate
//         localStorage.setItem("checkoutEmail", email);
//         setError("");
//         setMessage("");
//         navigate("/checkout/address");
//       } else {
//         setError("Invalid OTP. Please try again.");
//       }
//     } catch (err) {
//       console.log(err?.response?.data);
//       setError("OTP verification failed. Try again.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow">
//       <h2 className="text-2xl font-bold mb-4">Checkout Email Verification</h2>

//       {error && <p className="text-red-600 mb-2">{error}</p>}
//       {message && <p className="text-green-600 mb-2">{message}</p>}

//       {step === 1 && (
//         <>
//           <input
//             type="email"
//             placeholder="Email Address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full border p-3 rounded mb-4"
//           />
//           <button
//             onClick={sendOtp}
//             className="w-full bg-[#003366] text-white py-3 rounded"
//           >
//             Send OTP
//           </button>
//         </>
//       )}

//       {step === 2 && (
//         <>
//           <p className="mb-2">Enter the OTP sent to your email:</p>
//           <input
//             type="text"
//             placeholder="OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             className="w-full border p-3 rounded mb-4"
//           />
//           <button
//             onClick={verifyOtp}
//             className="w-full bg-[#003366] text-white py-3 rounded mb-2"
//           >
//             Verify OTP
//           </button>
//           <button
//             onClick={sendOtp}
//             className="w-full bg-gray-500 text-white py-2 rounded mt-1"
//           >
//             Resend OTP
//           </button>
//         </>
//       )}
//     </div>
//   );
// }
















// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function CheckoutEmail() {
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState(1); // 1: enter email, 2: enter OTP
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const validEmail = (str) => /\S+@\S+\.\S+/.test(str);

//   // Step 1: Send OTP
//   const sendOtp = async () => {
//     if (!validEmail(email)) {
//       setError("Please enter a valid email");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:8000/store/email/send-otp/",
//         { email }
//       );
//       setError("");
//       setMessage(res.data.message || `OTP sent to ${email}`);
//       setStep(2);
//     } catch (err) {
//       setError(err?.response?.data?.error || "Failed to send OTP. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Step 2: Verify OTP
//   const verifyOtp = async () => {
//     if (!/^\d{6}$/.test(otp)) {
//       setError("OTP must be 6 digits");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:8000/store/email/verify/",
//         { email, otp }
//       );
//       if (res.data.verified) {
//         localStorage.setItem("checkoutEmail", email);
//         setError("");
//         setMessage("");
//         navigate("/checkout/address");
//       } else {
//         setError(res.data.error || "Invalid OTP. Please try again.");
//       }
//     } catch (err) {
//       setError(err?.response?.data?.error || "OTP verification failed. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow">
//       <h2 className="text-2xl font-bold mb-4">Checkout Email Verification</h2>

//       {error && <p className="text-red-600 mb-2">{error}</p>}
//       {message && <p className="text-green-600 mb-2">{message}</p>}

//       {step === 1 && (
//         <>
//           <input
//             type="email"
//             placeholder="Email Address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full border p-3 rounded mb-4"
//             disabled={loading}
//           />
//           <button
//             onClick={sendOtp}
//             className="w-full bg-[#003366] text-white py-3 rounded"
//             disabled={loading}
//           >
//             {loading ? "Sending..." : "Send OTP"}
//           </button>
//         </>
//       )}

//       {step === 2 && (
//         <>
//           <p className="mb-2">Enter the OTP sent to your email:</p>
//           <input
//             type="text"
//             placeholder="OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             className="w-full border p-3 rounded mb-4"
//             autoFocus
//             disabled={loading}
//           />
//           <button
//             onClick={verifyOtp}
//             className="w-full bg-[#003366] text-white py-3 rounded mb-2"
//             disabled={loading}
//           >
//             {loading ? "Verifying..." : "Verify OTP"}
//           </button>
//           <button
//             onClick={sendOtp}
//             className="w-full bg-gray-500 text-white py-2 rounded mt-1"
//             disabled={loading}
//           >
//             {loading ? "Resending..." : "Resend OTP"}
//           </button>
//         </>
//       )}
//     </div>
//   );
// }












// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function CheckoutEmail() {
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState(1); // 1: enter email, 2: enter OTP
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const validEmail = (str) => /\S+@\S+\.\S+/.test(str);

//   // Step 1: Send OTP
//   const sendOtp = async () => {
//     if (!validEmail(email)) {
//       setError("Please enter a valid email");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:8000/store/email/send-otp/",
//         { email }
//       );
//       setError("");
//       setMessage(res.data.message || `OTP sent to ${email}`);
//       setStep(2);
//     } catch (err) {
//       setError(err?.response?.data?.error || "Failed to send OTP. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Step 2: Verify OTP
//   const verifyOtp = async () => {
//     if (!/^\d{6}$/.test(otp)) {
//       setError("OTP must be 6 digits");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:8000/store/email/verify/",
//         { email, otp }
//       );
//       if (res.data.verified) {
//         localStorage.setItem("checkoutEmail", email); // ✅ store verified email
//         setError("");
//         setMessage("Email verified!");
//         navigate("/checkout/address"); // move to address page
//       } else {
//         setError(res.data.error || "Invalid OTP. Try again.");
//       }
//     } catch (err) {
//       setError(err?.response?.data?.error || "OTP verification failed. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow">
//       <h2 className="text-2xl font-bold mb-4">Checkout Email Verification</h2>

//       {error && <p className="text-red-600 mb-2">{error}</p>}
//       {message && <p className="text-green-600 mb-2">{message}</p>}

//       {step === 1 && (
//         <>
//           <input
//             type="email"
//             placeholder="Email Address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full border p-3 rounded mb-4"
//             disabled={loading}
//           />
//           <button
//             onClick={sendOtp}
//             className="w-full bg-[#003366] text-white py-3 rounded"
//             disabled={loading}
//           >
//             {loading ? "Sending..." : "Send OTP"}
//           </button>
//         </>
//       )}

//       {step === 2 && (
//         <>
//           <p className="mb-2">Enter the OTP sent to your email:</p>
//           <input
//             type="text"
//             placeholder="OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             className="w-full border p-3 rounded mb-4"
//             autoFocus
//             disabled={loading}
//           />
//           <button
//             onClick={verifyOtp}
//             className="w-full bg-[#003366] text-white py-3 rounded mb-2"
//             disabled={loading}
//           >
//             {loading ? "Verifying..." : "Verify OTP"}
//           </button>
//           <button
//             onClick={sendOtp}
//             className="w-full bg-gray-500 text-white py-2 rounded mt-1"
//             disabled={loading}
//           >
//             {loading ? "Resending..." : "Resend OTP"}
//           </button>
//         </>
//       )}
//     </div>
//   );
// }













// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { StoreHeader } from "../components/StoreHeader"; // ✅ Import StoreHeader

// export default function CheckoutEmail({
//   searchValue = "",
//   setSearchValue = () => {},
//   searchProducts = () => {},
//   categories = [],
//   loadCategory = () => {},
//   goHome = () => (window.location.href = "/"),
//   goToAccount = () => (window.location.href = "/signup"),
// }) {
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState(1); // 1: enter email, 2: enter OTP
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const validEmail = (str) => /\S+@\S+\.\S+/.test(str);

//   // Step 1: Send OTP
//   const sendOtp = async () => {
//     if (!validEmail(email)) {
//       setError("Please enter a valid email");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:8000/store/email/send-otp/",
//         { email }
//       );
//       setError("");
//       setMessage(res.data.message || `OTP sent to ${email}`);
//       setStep(2);
//     } catch (err) {
//       setError(err?.response?.data?.error || "Failed to send OTP. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Step 2: Verify OTP
//   const verifyOtp = async () => {
//     if (!/^\d{6}$/.test(otp)) {
//       setError("OTP must be 6 digits");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:8000/store/email/verify/",
//         { email, otp }
//       );
//       if (res.data.verified) {
//         localStorage.setItem("checkoutEmail", email); // store verified email
//         setError("");
//         setMessage("Email verified!");
//         navigate("/checkout/address");
//       } else {
//         setError(res.data.error || "Invalid OTP. Try again.");
//       }
//     } catch (err) {
//       setError(err?.response?.data?.error || "OTP verification failed. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 pb-28">
//       {/* 🟦 STORE HEADER */}
//       <StoreHeader
//         searchValue={searchValue}
//         setSearchValue={setSearchValue}
//         searchProducts={searchProducts}
//         categories={categories}
//         loadCategory={loadCategory}
//         cartCount={0} // Checkout page has no cart count
//         goHome={goHome}
//         goToAccount={goToAccount}
//       />

//       {/* MAIN CONTENT */}
//       <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow">
//         <h2 className="text-2xl font-bold mb-4">Checkout Email Verification</h2>

//         {error && <p className="text-red-600 mb-2">{error}</p>}
//         {message && <p className="text-green-600 mb-2">{message}</p>}

//         {step === 1 && (
//           <>
//             <input
//               type="email"
//               placeholder="Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full border p-3 rounded mb-4"
//               disabled={loading}
//             />
//             <button
//               onClick={sendOtp}
//               className="w-full bg-[#003366] text-white py-3 rounded"
//               disabled={loading}
//             >
//               {loading ? "Sending..." : "Send OTP"}
//             </button>
//           </>
//         )}

//         {step === 2 && (
//           <>
//             <p className="mb-2">Enter the OTP sent to your email:</p>
//             <input
//               type="text"
//               placeholder="OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="w-full border p-3 rounded mb-4"
//               autoFocus
//               disabled={loading}
//             />
//             <button
//               onClick={verifyOtp}
//               className="w-full bg-[#003366] text-white py-3 rounded mb-2"
//               disabled={loading}
//             >
//               {loading ? "Verifying..." : "Verify OTP"}
//             </button>
//             <button
//               onClick={sendOtp}
//               className="w-full bg-gray-500 text-white py-2 rounded mt-1"
//               disabled={loading}
//             >
//               {loading ? "Resending..." : "Resend OTP"}
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }













// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { StoreHeader } from "../components/StoreHeader";

// export default function CheckoutEmail() {
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState(1); // 1: enter email, 2: enter OTP
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");

//   const navigate = useNavigate();

//   const validEmail = (str) => /\S+@\S+\.\S+/.test(str);

//   // Fetch categories on mount
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get("http://127.0.0.1:8000/store/categories/");
//         setCategories(res.data || []);
//       } catch (err) {
//         console.error("Failed to fetch categories", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Search products placeholder (implement real search logic)
//   const searchProducts = () => {
//     console.log("Search for:", searchValue);
//   };

//   // Load category placeholder
//   const loadCategory = (id) => {
//     console.log("Load category:", id);
//   };

//   const goHome = () => (window.location.href = "/");
//   const goToAccount = () => (window.location.href = "/signup");

//   // Step 1: Send OTP
//   const sendOtp = async () => {
//     if (!validEmail(email)) {
//       setError("Please enter a valid email");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:8000/store/email/send-otp/",
//         { email }
//       );
//       setError("");
//       setMessage(res.data.message || `OTP sent to ${email}`);
//       setStep(2);
//     } catch (err) {
//       setError(err?.response?.data?.error || "Failed to send OTP. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Step 2: Verify OTP
//   const verifyOtp = async () => {
//     if (!/^\d{6}$/.test(otp)) {
//       setError("OTP must be 6 digits");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:8000/store/email/verify/",
//         { email, otp }
//       );
//       if (res.data.verified) {
//         localStorage.setItem("checkoutEmail", email);
//         setError("");
//         setMessage("Email verified!");
//         navigate("/checkout/address");
//       } else {
//         setError(res.data.error || "Invalid OTP. Try again.");
//       }
//     } catch (err) {
//       setError(err?.response?.data?.error || "OTP verification failed. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 pb-28">
//       {/* 🟦 STORE HEADER */}
//       <StoreHeader
//         searchValue={searchValue}
//         setSearchValue={setSearchValue}
//         searchProducts={searchProducts}
//         categories={categories}
//         loadCategory={loadCategory}
//         cartCount={0} // no cart on checkout email
//         goHome={goHome}
//         goToAccount={goToAccount}
//         logo="/logo.png"
//       />

//       {/* MAIN CONTENT */}
//       <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow">
//         <h2 className="text-2xl font-bold mb-4">Checkout Email Verification</h2>

//         {error && <p className="text-red-600 mb-2">{error}</p>}
//         {message && <p className="text-green-600 mb-2">{message}</p>}

//         {step === 1 && (
//           <>
//             <input
//               type="email"
//               placeholder="Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full border p-3 rounded mb-4"
//               disabled={loading}
//             />
//             <button
//               onClick={sendOtp}
//               className="w-full bg-[#003366] text-white py-3 rounded"
//               disabled={loading}
//             >
//               {loading ? "Sending..." : "Send OTP"}
//             </button>
//           </>
//         )}

//         {step === 2 && (
//           <>
//             <p className="mb-2">Enter the OTP sent to your email:</p>
//             <input
//               type="text"
//               placeholder="OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="w-full border p-3 rounded mb-4"
//               autoFocus
//               disabled={loading}
//             />
//             <button
//               onClick={verifyOtp}
//               className="w-full bg-[#003366] text-white py-3 rounded mb-2"
//               disabled={loading}
//             >
//               {loading ? "Verifying..." : "Verify OTP"}
//             </button>
//             <button
//               onClick={sendOtp}
//               className="w-full bg-gray-500 text-white py-2 rounded mt-1"
//               disabled={loading}
//             >
//               {loading ? "Resending..." : "Resend OTP"}
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }














// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { StoreHeader } from "../components/StoreHeader";
// import logoImg from "./logo.png"; // ✅ Import your logo properly

// export default function CheckoutEmail() {
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState(1);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");

//   const navigate = useNavigate();

//   const validEmail = (str) => /\S+@\S+\.\S+/.test(str);

//   // Fetch categories on mount
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get("http://127.0.0.1:8000/store/categories/");
//         setCategories(res.data || []);
//       } catch (err) {
//         console.error("Failed to fetch categories", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const searchProducts = () => {
//     console.log("Search for:", searchValue);
//   };

//   const loadCategory = (id) => {
//     console.log("Load category:", id);
//   };

//   const goHome = () => (window.location.href = "/");
//   const goToAccount = () => (window.location.href = "/signup");

//   const sendOtp = async () => {
//     if (!validEmail(email)) {
//       setError("Please enter a valid email");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:8000/store/email/send-otp/",
//         { email }
//       );
//       setError("");
//       setMessage(res.data.message || `OTP sent to ${email}`);
//       setStep(2);
//     } catch (err) {
//       setError(err?.response?.data?.error || "Failed to send OTP. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const verifyOtp = async () => {
//     if (!/^\d{6}$/.test(otp)) {
//       setError("OTP must be 6 digits");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:8000/store/email/verify/",
//         { email, otp }
//       );
//       if (res.data.verified) {
//         localStorage.setItem("checkoutEmail", email);
//         setError("");
//         setMessage("Email verified!");
//         navigate("/checkout/address");
//       } else {
//         setError(res.data.error || "Invalid OTP. Try again.");
//       }
//     } catch (err) {
//       setError(err?.response?.data?.error || "OTP verification failed. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 pb-28">
//       {/* 🟦 STORE HEADER */}
//       <StoreHeader
//         searchValue={searchValue}
//         setSearchValue={setSearchValue}
//         searchProducts={searchProducts}
//         categories={categories}
//         loadCategory={loadCategory}
//         cartCount={0} // no cart on checkout email
//         goHome={goHome}
//         goToAccount={goToAccount}
//         logo={logoImg} // ✅ pass imported logo
//       />

//       {/* MAIN CONTENT */}
//       <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow">
//         <h2 className="text-2xl font-bold mb-4">Checkout Email Verification</h2>

//         {error && <p className="text-red-600 mb-2">{error}</p>}
//         {message && <p className="text-green-600 mb-2">{message}</p>}

//         {step === 1 && (
//           <>
//             <input
//               type="email"
//               placeholder="Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full border p-3 rounded mb-4"
//               disabled={loading}
//             />
//             <button
//               onClick={sendOtp}
//               className="w-full bg-[#003366] text-white py-3 rounded"
//               disabled={loading}
//             >
//               {loading ? "Sending..." : "Send OTP"}
//             </button>
//           </>
//         )}

//         {step === 2 && (
//           <>
//             <p className="mb-2">Enter the OTP sent to your email:</p>
//             <input
//               type="text"
//               placeholder="OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="w-full border p-3 rounded mb-4"
//               autoFocus
//               disabled={loading}
//             />
//             <button
//               onClick={verifyOtp}
//               className="w-full bg-[#003366] text-white py-3 rounded mb-2"
//               disabled={loading}
//             >
//               {loading ? "Verifying..." : "Verify OTP"}
//             </button>
//             <button
//               onClick={sendOtp}
//               className="w-full bg-gray-500 text-white py-2 rounded mt-1"
//               disabled={loading}
//             >
//               {loading ? "Resending..." : "Resend OTP"}
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
















// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { StoreHeader } from "../components/StoreHeader";

// export default function CheckoutEmail() {
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState(1); // 1: enter email, 2: enter OTP
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");

//   const navigate = useNavigate();

//   const validEmail = (str) => /\S+@\S+\.\S+/.test(str);

//   // Fetch categories on mount
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get("http://127.0.0.1:8000/store/categories/");
//         setCategories(res.data || []);
//       } catch (err) {
//         console.error("Failed to fetch categories", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const searchProducts = () => console.log("Search for:", searchValue);
//   const loadCategory = (id) => console.log("Load category:", id);
//   const goHome = () => (window.location.href = "/");
//   const goToAccount = () => (window.location.href = "/signup");

//   // Step 1: Send OTP
//   const sendOtp = async () => {
//     if (!validEmail(email)) {
//       setError("Please enter a valid email");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:8000/store/email/send-otp/",
//         { email }
//       );
//       setError("");
//       setMessage(res.data.message || `OTP sent to ${email}`);
//       setStep(2);
//     } catch (err) {
//       setError(err?.response?.data?.error || "Failed to send OTP. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Step 2: Verify OTP
//   const verifyOtp = async () => {
//     if (!/^\d{6}$/.test(otp)) {
//       setError("OTP must be 6 digits");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:8000/store/email/verify/",
//         { email, otp }
//       );
//       if (res.data.verified) {
//         localStorage.setItem("checkoutEmail", email);
//         setError("");
//         setMessage("Email verified!");
//         navigate("/checkout/address");
//       } else {
//         setError(res.data.error || "Invalid OTP. Try again.");
//       }
//     } catch (err) {
//       setError(err?.response?.data?.error || "OTP verification failed. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 pb-28">
//       {/* 🟦 STORE HEADER - same as CartPage */}
//       <StoreHeader
//         searchValue={searchValue}
//         setSearchValue={setSearchValue}
//         searchProducts={searchProducts}
//         categories={categories}
//         loadCategory={loadCategory}
//         cartCount={0} // no cart for checkout email
//         goHome={goHome}
//         goToAccount={goToAccount}
//       />

//       {/* MAIN CONTENT */}
//       <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow">
//         <h2 className="text-2xl font-bold mb-4">Checkout Email Verification</h2>

//         {error && <p className="text-red-600 mb-2">{error}</p>}
//         {message && <p className="text-green-600 mb-2">{message}</p>}

//         {step === 1 && (
//           <>
//             <input
//               type="email"
//               placeholder="Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full border p-3 rounded mb-4"
//               disabled={loading}
//             />
//             <button
//               onClick={sendOtp}
//               className="w-full bg-[#003366] text-white py-3 rounded"
//               disabled={loading}
//             >
//               {loading ? "Sending..." : "Send OTP"}
//             </button>
//           </>
//         )}

//         {step === 2 && (
//           <>
//             <p className="mb-2">Enter the OTP sent to your email:</p>
//             <input
//               type="text"
//               placeholder="OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="w-full border p-3 rounded mb-4"
//               autoFocus
//               disabled={loading}
//             />
//             <button
//               onClick={verifyOtp}
//               className="w-full bg-[#003366] text-white py-3 rounded mb-2"
//               disabled={loading}
//             >
//               {loading ? "Verifying..." : "Verify OTP"}
//             </button>
//             <button
//               onClick={sendOtp}
//               className="w-full bg-gray-500 text-white py-2 rounded mt-1"
//               disabled={loading}
//             >
//               {loading ? "Resending..." : "Resend OTP"}
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }












// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { StoreHeader } from "../components/StoreHeader";

// export default function CheckoutEmail() {
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState(1);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [searchValue, setSearchValue] = useState("");

//   const navigate = useNavigate();
//   const validEmail = (str) => /\S+@\S+\.\S+/.test(str);

//   // Fetch categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get("http://127.0.0.1:8000/store/categories/");
//         setCategories(res.data || []);
//       } catch (err) {
//         console.error("Failed to fetch categories", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const searchProducts = () => console.log("Search for:", searchValue);
//   const loadCategory = (id) => console.log("Load category:", id);
//   const goHome = () => (window.location.href = "/");
//   const goToAccount = () => (window.location.href = "/signup");

//   const sendOtp = async () => {
//     if (!validEmail(email)) {
//       setError("Please enter a valid email");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:8000/store/email/send-otp/",
//         { email }
//       );
//       setError("");
//       setMessage(res.data.message || `OTP sent to ${email}`);
//       setStep(2);
//     } catch (err) {
//       setError(err?.response?.data?.error || "Failed to send OTP. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const verifyOtp = async () => {
//     if (!/^\d{6}$/.test(otp)) {
//       setError("OTP must be 6 digits");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:8000/store/email/verify/",
//         { email, otp }
//       );
//       if (res.data.verified) {
//         localStorage.setItem("checkoutEmail", email);
//         setError("");
//         setMessage("Email verified!");
//         navigate("/checkout/address");
//       } else {
//         setError(res.data.error || "Invalid OTP. Try again.");
//       }
//     } catch (err) {
//       setError(err?.response?.data?.error || "OTP verification failed. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 pb-28">
//       {/* STORE HEADER */}
//       <StoreHeader
//         searchValue={searchValue}
//         setSearchValue={setSearchValue}
//         searchProducts={searchProducts}
//         categories={categories}
//         loadCategory={loadCategory}
//         cartCount={0}
//         logo="/logo.png" // public folder logo
//       />

//       {/* MAIN CONTENT */}
//       <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow">
//         <h2 className="text-2xl font-bold mb-4">Checkout Email Verification</h2>

//         {error && <p className="text-red-600 mb-2">{error}</p>}
//         {message && <p className="text-green-600 mb-2">{message}</p>}

//         {step === 1 && (
//           <>
//             <input
//               type="email"
//               placeholder="Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full border p-3 rounded mb-4"
//               disabled={loading}
//             />
//             <button
//               onClick={sendOtp}
//               className="w-full bg-[#003366] text-white py-3 rounded"
//               disabled={loading}
//             >
//               {loading ? "Sending..." : "Send OTP"}
//             </button>
//           </>
//         )}

//         {step === 2 && (
//           <>
//             <p className="mb-2">Enter the OTP sent to your email:</p>
//             <input
//               type="text"
//               placeholder="OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="w-full border p-3 rounded mb-4"
//               autoFocus
//               disabled={loading}
//             />
//             <button
//               onClick={verifyOtp}
//               className="w-full bg-[#003366] text-white py-3 rounded mb-2"
//               disabled={loading}
//             >
//               {loading ? "Verifying..." : "Verify OTP"}
//             </button>
//             <button
//               onClick={sendOtp}
//               className="w-full bg-gray-500 text-white py-2 rounded mt-1"
//               disabled={loading}
//             >
//               {loading ? "Resending..." : "Resend OTP"}
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }











import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreHeader } from "../components/StoreHeader";

export default function CheckoutEmail() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const navigate = useNavigate();
  const BASE_URL = "http://127.0.0.1:8000/store";
  const validEmail = (str) => /\S+@\S+\.\S+/.test(str);

  // Fetch categories and all products
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/categories/`);
        setCategories(res.data || []);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    const fetchAllProducts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/products/`);
        setAllProducts(res.data || []);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    fetchCategories();
    fetchAllProducts();
  }, []);

  // Load products by category or all
  const loadCategory = (id) => {
    setSelectedCategory(id);
    const url = id ? `${BASE_URL}/products/?category=${id}` : `${BASE_URL}/products/`;
    axios.get(url).then((res) => setAllProducts(res.data || []));
  };

  // Search products
  const searchProducts = () => {
    const url = searchValue
      ? `${BASE_URL}/products/?search=${encodeURIComponent(searchValue)}`
      : `${BASE_URL}/products/`;
    axios.get(url).then((res) => setAllProducts(res.data || []));
  };

  const goHome = () => (window.location.href = "/");
  const goToAccount = () => (window.location.href = "/signup");

  const sendOtp = async () => {
    if (!validEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/email/send-otp/`, { email });
      setError("");
      setMessage(res.data.message || `OTP sent to ${email}`);
      setStep(2);
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!/^\d{6}$/.test(otp)) {
      setError("OTP must be 6 digits");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/email/verify/`, { email, otp });
      if (res.data.verified) {
        localStorage.setItem("checkoutEmail", email);
        setError("");
        setMessage("Email verified!");
        navigate("/checkout/address");
      } else {
        setError(res.data.error || "Invalid OTP. Try again.");
      }
    } catch (err) {
      setError(err?.response?.data?.error || "OTP verification failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-28">
      {/* STORE HEADER */}
      <StoreHeader
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchProducts={searchProducts}
        categories={categories}
        loadCategory={loadCategory}
        cartCount={0}
        logo="/logo.png"
        selectedCategory={selectedCategory}
      />

      {/* MAIN CONTENT */}
      <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Checkout Email Verification</h2>

        {error && <p className="text-red-600 mb-2">{error}</p>}
        {message && <p className="text-green-600 mb-2">{message}</p>}

        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-3 rounded mb-4"
              disabled={loading}
            />
            <button
              onClick={sendOtp}
              className="w-full bg-[#003366] text-white py-3 rounded"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p className="mb-2">Enter the OTP sent to your email:</p>
            <input
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border p-3 rounded mb-4"
              autoFocus
              disabled={loading}
            />
            <button
              onClick={verifyOtp}
              className="w-full bg-[#003366] text-white py-3 rounded mb-2"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button
              onClick={sendOtp}
              className="w-full bg-gray-500 text-white py-2 rounded mt-1"
              disabled={loading}
            >
              {loading ? "Resending..." : "Resend OTP"}
            </button>
          </>
        )}
      </div>

      {/* -------------------- ALL PRODUCTS -------------------- */}
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">All Products</h2>
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
                    alt={product.title}
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
    </div>
  );
}
