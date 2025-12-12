// import { useState } from "react";

// export const QualificationModal = ({ onClose, onSubscribe }) => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     referralCode: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
//     if (!formData.email.trim()) newErrors.email = "Email is required";
//     if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     setLoading(true);
//     try {
//       // Call your backend API to register as ambassador
//       // Example:
//       // await axios.post("/network/ambassador/signup/", formData);
//       onSubscribe(formData);
//     } catch (err) {
//       console.error("Failed to subscribe:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded max-w-md w-full">
//         <h2 className="text-xl font-bold mb-3">🎉 You’re Qualified!</h2>
//         <p className="mb-4 text-gray-700">
//           You’re now qualified to earn from your purchase. Fill the form below to start earning.
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-3">
//           <div>
//             <label className="block text-gray-700 text-sm font-medium mb-1">Full Name</label>
//             <input
//               type="text"
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleChange}
//               className={`w-full border p-2 rounded ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
//             />
//             {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
//           </div>

//           <div>
//             <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className={`w-full border p-2 rounded ${errors.email ? "border-red-500" : "border-gray-300"}`}
//             />
//             {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//           </div>

//           <div>
//             <label className="block text-gray-700 text-sm font-medium mb-1">Phone Number</label>
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className={`w-full border p-2 rounded ${errors.phone ? "border-red-500" : "border-gray-300"}`}
//             />
//             {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
//           </div>

//           <div>
//             <label className="block text-gray-700 text-sm font-medium mb-1">Referral Code (Optional)</label>
//             <input
//               type="text"
//               name="referralCode"
//               value={formData.referralCode}
//               onChange={handleChange}
//               className="w-full border p-2 rounded border-gray-300"
//             />
//           </div>

//           <div className="flex justify-end gap-3 mt-4">
//             <button
//               type="button"
//               className="px-4 py-2 border rounded"
//               onClick={onClose}
//             >
//               Later
//             </button>

//             <button
//               type="submit"
//               className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
//               disabled={loading}
//             >
//               {loading ? "Submitting..." : "Subscribe"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };












// // src/pages/AmbassadorSignupPage.jsx
// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";

// export default function AmbassadorSignupPage() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     referralCode: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();

//   // Optional: pass profit and order_id via state from checkout page
//   const { profit = 0, order_id = null } = location.state || {};

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
//     if (!formData.email.trim()) newErrors.email = "Email is required";
//     if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     setLoading(true);
//     try {
//       await axios.post("http://127.0.0.1:8000/network/ambassador/signup/", {
//         ...formData,
//         profit,
//         order_id,
//       });

//       alert("Successfully subscribed as an Ambassador!");
//       navigate("/"); // redirect to homepage or account page
//     } catch (err) {
//       console.error("Subscription failed:", err);
//       alert("Failed to subscribe. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white p-6 rounded max-w-md w-full shadow">
//         <h2 className="text-2xl font-bold mb-4 text-green-600">🎉 Become an Ambassador!</h2>
//         <p className="mb-4 text-gray-700">
//           Fill the form below to start earning from your purchases.
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-3">
//           <div>
//             <label className="block text-gray-700 text-sm font-medium mb-1">Full Name</label>
//             <input
//               type="text"
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleChange}
//               className={`w-full border p-2 rounded ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
//             />
//             {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
//           </div>

//           <div>
//             <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className={`w-full border p-2 rounded ${errors.email ? "border-red-500" : "border-gray-300"}`}
//             />
//             {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//           </div>

//           <div>
//             <label className="block text-gray-700 text-sm font-medium mb-1">Phone Number</label>
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className={`w-full border p-2 rounded ${errors.phone ? "border-red-500" : "border-gray-300"}`}
//             />
//             {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
//           </div>

//           <div>
//             <label className="block text-gray-700 text-sm font-medium mb-1">Referral Code (Optional)</label>
//             <input
//               type="text"
//               name="referralCode"
//               value={formData.referralCode}
//               onChange={handleChange}
//               className="w-full border p-2 rounded border-gray-300"
//             />
//           </div>

//           <div className="flex justify-end gap-3 mt-4">
//             <button
//               type="button"
//               className="px-4 py-2 border rounded"
//               onClick={() => navigate(-1)}
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
//               disabled={loading}
//             >
//               {loading ? "Submitting..." : "Subscribe"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }












// // src/pages/AmbassadorSignupPage.jsx
// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";

// export default function AmbassadorSignupPage() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     phone: "",
//     referralCode: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();

//   const { profit = 0, order_id = null } = location.state || {};

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validate = () => {
//     const errs = {};
//     if (!formData.fullName.trim()) errs.fullName = "Full name is required";
//     if (!formData.phone.trim()) errs.phone = "Phone number is required";
//     if (!order_id) errs.order = "Invalid order. Cannot proceed.";
//     return errs;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errs = validate();
//     if (Object.keys(errs).length) {
//       setErrors(errs);
//       return;
//     }

//     const token = localStorage.getItem("access_token");
//     if (!token) {
//       alert("You must be logged in.");
//       return;
//     }

//     setLoading(true);
//     try {
//       await axios.post(
//         "http://127.0.0.1:8000/network/ambassador/signup/",
//         {
//           full_name: formData.fullName,
//           phone: formData.phone,
//           referrer_code: formData.referralCode || null,
//           order_id,
//           profit,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert("🎉 Ambassador account created successfully!");
//       navigate("/ambassador/dashboard");
//     } catch (err) {
//       console.error(err?.response?.data || err);
//       alert(err?.response?.data?.error || "Signup failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white p-6 rounded max-w-md w-full shadow">
//         <h2 className="text-2xl font-bold mb-4 text-green-600">
//           🎯 Become an Ambassador
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-3">
//           <div>
//             <label className="text-sm font-medium">Full Name</label>
//             <input
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//             {errors.fullName && (
//               <p className="text-xs text-red-500">{errors.fullName}</p>
//             )}
//           </div>

//           <div>
//             <label className="text-sm font-medium">Phone Number</label>
//             <input
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//             {errors.phone && (
//               <p className="text-xs text-red-500">{errors.phone}</p>
//             )}
//           </div>

//           <div>
//             <label className="text-sm font-medium">
//               Referrer Code <span className="text-gray-400">(optional)</span>
//             </label>
//             <input
//               name="referralCode"
//               value={formData.referralCode}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//           </div>

//           <div className="flex justify-end gap-3 pt-2">
//             <button
//               type="button"
//               className="px-4 py-2 border rounded"
//               onClick={() => navigate(-1)}
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               disabled={loading}
//               className="px-4 py-2 bg-green-600 text-white rounded"
//             >
//               {loading ? "Submitting…" : "Confirm"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }














// src/pages/AmbassadorSignupPage.jsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function AmbassadorSignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    referralCode: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { profit = 0, order_id = null } = location.state || {};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required";
    if (!formData.phone.trim()) errs.phone = "Phone number is required";
    if (!order_id) errs.order = "Invalid order. Cannot proceed.";
    return errs;
  };

  const checkReferrerAvailability = async (code) => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await axios.post(
        "http://127.0.0.1:8000/network/ambassador/check-referrer/",
        { referral_code: code },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data; // { status: 'ok' } or { status: 'full_level' }
    } catch (err) {
      console.error(err);
      return { status: "error" };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("You must be logged in.");
      return;
    }

    // Check referrer availability
    if (formData.referralCode) {
      const refCheck = await checkReferrerAvailability(formData.referralCode);
      if (refCheck.status === "full_level") {
        alert(
          "Referrer currently has no available slots. You will be placed at the next available position."
        );
      }
    }

    setLoading(true);
    try {
      await axios.post(
        "http://127.0.0.1:8000/network/ambassador/signup/",
        {
          full_name: formData.fullName,
          phone: formData.phone,
          referrer_code: formData.referralCode || null,
          order_id,
          profit,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("🎉 Ambassador account created successfully!");
      navigate("/ambassador/dashboard");
    } catch (err) {
      console.error(err?.response?.data || err);
      alert(err?.response?.data?.error || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded max-w-md w-full shadow">
        <h2 className="text-2xl font-bold mb-4 text-green-600">
          🎯 Become an Ambassador
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            {errors.fullName && (
              <p className="text-xs text-red-500">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Phone Number</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">
              Referrer Code <span className="text-gray-400">(optional)</span>
            </label>
            <input
              name="referralCode"
              value={formData.referralCode}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {errors.order && (
            <p className="text-xs text-red-500">{errors.order}</p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              className="px-4 py-2 border rounded"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              {loading ? "Submitting…" : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
