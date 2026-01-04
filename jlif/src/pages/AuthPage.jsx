// // import React, { useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import { GoogleLogin } from "@react-oauth/google";

// // const BASE_URL = "http://127.0.0.1:8000/store";

// // export const AuthPage = () => {
// //   const navigate = useNavigate();
// //   const [isLogin, setIsLogin] = useState(true);
// //   const [form, setForm] = useState({ first_name: "", username: "", password: "" });
// //   const [error, setError] = useState("");

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");

// //     try {
// //       if (isLogin) {
// //         const res = await axios.post(`${BASE_URL}/login/`, {
// //           username: form.username,
// //           password: form.password,
// //         });
// //         localStorage.setItem("access_token", res.data.access);
// //         localStorage.setItem("refresh_token", res.data.refresh);
// //         navigate("/"); // Redirect after login
// //       } else {
// //         const res = await axios.post(`${BASE_URL}/register/`, {
// //           first_name: form.first_name,
// //           username: form.username,
// //           password: form.password,
// //         });
// //         localStorage.setItem("access_token", res.data.access);
// //         localStorage.setItem("refresh_token", res.data.refresh);
// //         navigate("/");
// //       }
// //     } catch (err) {
// //       setError(err.response?.data?.detail || "Something went wrong");
// //     }
// //   };

// //   const handleGoogleSuccess = async (credentialResponse) => {
// //     try {
// //       const res = await axios.post(`${BASE_URL}/google/`, {
// //         token: credentialResponse.credential,
// //       });
// //       localStorage.setItem("access_token", res.data.access);
// //       localStorage.setItem("refresh_token", res.data.refresh);
// //       navigate("/");
// //     } catch (err) {
// //       console.error(err);
// //       setError("Google sign-in failed");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex justify-center items-center bg-gray-100">
// //       <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
// //         <h2 className="text-2xl font-bold mb-6">{isLogin ? "Login" : "Sign Up"}</h2>

// //         {error && <p className="text-red-500 mb-4">{error}</p>}

// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           {!isLogin && (
// //             <input
// //               type="text"
// //               name="first_name"
// //               placeholder="Full Name"
// //               value={form.first_name}
// //               onChange={handleChange}
// //               className="w-full p-2 border rounded"
// //               required
// //             />
// //           )}

// //           <input
// //             type="text"
// //             name="username"
// //             placeholder="Username"
// //             value={form.username}
// //             onChange={handleChange}
// //             className="w-full p-2 border rounded"
// //             required
// //           />

// //           <input
// //             type="password"
// //             name="password"
// //             placeholder="Password"
// //             value={form.password}
// //             onChange={handleChange}
// //             className="w-full p-2 border rounded"
// //             required
// //           />

// //           <button
// //             type="submit"
// //             className="w-full bg-[#003366] text-white py-2 rounded hover:bg-[#002244] transition"
// //           >
// //             {isLogin ? "Login" : "Sign Up"}
// //           </button>
// //         </form>

// //         <div className="my-4 text-center text-gray-500">OR</div>

// //         <GoogleLogin
// //           onSuccess={handleGoogleSuccess}
// //           onError={() => setError("Google sign-in failed")}
// //         />

// //         <p className="mt-4 text-center text-sm">
// //           {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
// //           <span
// //             className="text-blue-600 cursor-pointer"
// //             onClick={() => setIsLogin(!isLogin)}
// //           >
// //             {isLogin ? "Sign Up" : "Login"}
// //           </span>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };














// // import React, { useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import { GoogleLogin } from "@react-oauth/google";

// // const BASE_URL = "http://127.0.0.1:8000/store/auth";

// // export const AuthPage = () => {
// //   const navigate = useNavigate();
// //   const [isLogin, setIsLogin] = useState(true);
// //   const [form, setForm] = useState({
// //     first_name: "",
// //     email: "",
// //     username: "",
// //     password: "",
// //   });
// //   const [error, setError] = useState("");

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");

// //     try {
// //       if (isLogin) {
// //         const res = await axios.post(`${BASE_URL}/login/`, {
// //           username: form.username,
// //           password: form.password,
// //         });
// //         localStorage.setItem("access_token", res.data.access);
// //         localStorage.setItem("refresh_token", res.data.refresh);
// //         navigate("/"); // Redirect after login
// //       } else {
// //         const res = await axios.post(`${BASE_URL}/signup/`, {
// //           first_name: form.first_name,
// //           email: form.email, // ✅ include email
// //           username: form.username,
// //           password: form.password,
// //         });
// //         localStorage.setItem("access_token", res.data.access);
// //         localStorage.setItem("refresh_token", res.data.refresh);
// //         navigate("/");
// //       }
// //     } catch (err) {
// //       setError(err.response?.data?.detail || "Something went wrong");
// //     }
// //   };

// //   const handleGoogleSuccess = async (credentialResponse) => {
// //     try {
// //       const res = await axios.post(`${BASE_URL}/google/`, {
// //         token: credentialResponse.credential,
// //       });
// //       localStorage.setItem("access_token", res.data.access);
// //       localStorage.setItem("refresh_token", res.data.refresh);
// //       navigate("/");
// //     } catch (err) {
// //       console.error(err);
// //       setError("Google sign-in failed");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex justify-center items-center bg-gray-100">
// //       <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
// //         <h2 className="text-2xl font-bold mb-6">{isLogin ? "Login" : "Sign Up"}</h2>

// //         {error && <p className="text-red-500 mb-4">{error}</p>}

// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           {!isLogin && (
// //             <>
// //               <input
// //                 type="text"
// //                 name="first_name"
// //                 placeholder="Full Name"
// //                 value={form.first_name}
// //                 onChange={handleChange}
// //                 className="w-full p-2 border rounded"
// //                 required
// //               />
// //               <input
// //                 type="email"
// //                 name="email"
// //                 placeholder="Email"
// //                 value={form.email}
// //                 onChange={handleChange}
// //                 className="w-full p-2 border rounded"
// //                 required
// //               />
// //             </>
// //           )}

// //           <input
// //             type="text"
// //             name="username"
// //             placeholder="Username"
// //             value={form.username}
// //             onChange={handleChange}
// //             className="w-full p-2 border rounded"
// //             required
// //           />

// //           <input
// //             type="password"
// //             name="password"
// //             placeholder="Password"
// //             value={form.password}
// //             onChange={handleChange}
// //             className="w-full p-2 border rounded"
// //             required
// //           />

// //           <button
// //             type="submit"
// //             className="w-full bg-[#003366] text-white py-2 rounded hover:bg-[#002244] transition"
// //           >
// //             {isLogin ? "Login" : "Sign Up"}
// //           </button>
// //         </form>

// //         <div className="my-4 text-center text-gray-500">OR</div>

// //         <GoogleLogin
// //           onSuccess={handleGoogleSuccess}
// //           onError={() => setError("Google sign-in failed")}
// //         />

// //         <p className="mt-4 text-center text-sm">
// //           {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
// //           <span
// //             className="text-blue-600 cursor-pointer"
// //             onClick={() => setIsLogin(!isLogin)}
// //           >
// //             {isLogin ? "Sign Up" : "Login"}
// //           </span>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };
















// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";

// const BASE_URL = "http://127.0.0.1:8000/store/auth";

// export const AuthPage = () => {
//   const navigate = useNavigate();
//   const [isLogin, setIsLogin] = useState(true);
//   const [form, setForm] = useState({
//     first_name: "",
//     email: "",
//     username: "",
//     password: "",
//   });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       let res;

//       if (isLogin) {
//         res = await axios.post(`${BASE_URL}/login/`, {
//           username: form.username,
//           password: form.password,
//         });
//       } else {
//         res = await axios.post(`${BASE_URL}/signup/`, {
//           first_name: form.first_name,
//           email: form.email, // include email for signup
//           username: form.username,
//           password: form.password,
//         });
//       }

//       // Store tokens
//       localStorage.setItem("access_token", res.data.access);
//       localStorage.setItem("refresh_token", res.data.refresh);

//       // ✅ Redirect to profile/account page after authentication
//       navigate("/account");
//     } catch (err) {
//       setError(err.response?.data?.detail || "Something went wrong");
//     }
//   };

//   const handleGoogleSuccess = async (credentialResponse) => {
//     try {
//       const res = await axios.post(`${BASE_URL}/google/`, {
//         token: credentialResponse.credential,
//       });

//       // Store tokens
//       localStorage.setItem("access_token", res.data.access);
//       localStorage.setItem("refresh_token", res.data.refresh);

//       // Redirect to profile/account page
//       navigate("/account");
//     } catch (err) {
//       console.error(err);
//       setError("Google sign-in failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100">
//       <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6">{isLogin ? "Login" : "Sign Up"}</h2>

//         {error && <p className="text-red-500 mb-4">{error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {!isLogin && (
//             <>
//               <input
//                 type="text"
//                 name="first_name"
//                 placeholder="Full Name"
//                 value={form.first_name}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={form.email}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </>
//           )}

//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={form.username}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />

//           <button
//             type="submit"
//             className="w-full bg-[#003366] text-white py-2 rounded hover:bg-[#002244] transition"
//           >
//             {isLogin ? "Login" : "Sign Up"}
//           </button>
//         </form>

//         <div className="my-4 text-center text-gray-500">OR</div>

//         <GoogleLogin
//           onSuccess={handleGoogleSuccess}
//           onError={() => setError("Google sign-in failed")}
//         />

//         <p className="mt-4 text-center text-sm">
//           {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//           <span
//             className="text-blue-600 cursor-pointer"
//             onClick={() => setIsLogin(!isLogin)}
//           >
//             {isLogin ? "Sign Up" : "Login"}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };













// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";

// const BASE_URL = "http://127.0.0.1:8000/store/auth";

// export const AuthPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // ⭐ If redirected here by protected route or Add to Cart
//   const redirectTo = location.state?.from || "/account";

//   const [isLogin, setIsLogin] = useState(true);
//   const [form, setForm] = useState({
//     first_name: "",
//     email: "",
//     username: "",
//     password: "",
//   });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       let res;

//       if (isLogin) {
//         res = await axios.post(`${BASE_URL}/login/`, {
//           username: form.username,
//           password: form.password,
//         });
//       } else {
//         res = await axios.post(`${BASE_URL}/signup/`, {
//           first_name: form.first_name,
//           email: form.email,
//           username: form.username,
//           password: form.password,
//         });
//       }

//       // Save tokens
//       localStorage.setItem("access_token", res.data.access);
//       localStorage.setItem("refresh_token", res.data.refresh);

//       // ⭐ Redirect back to the page user originally wanted
//       navigate(redirectTo, { replace: true });

//     } catch (err) {
//       setError(err.response?.data?.detail || "Something went wrong");
//     }
//   };

//   const handleGoogleSuccess = async (credentialResponse) => {
//     try {
//       const res = await axios.post(`${BASE_URL}/google/`, {
//         token: credentialResponse.credential,
//       });

//       localStorage.setItem("access_token", res.data.access);
//       localStorage.setItem("refresh_token", res.data.refresh);

//       // ⭐ Redirect back correctly
//       navigate(redirectTo, { replace: true });

//     } catch (err) {
//       console.error(err);
//       setError("Google sign-in failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100">
//       <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6">
//           {isLogin ? "Login" : "Sign Up"}
//         </h2>

//         {error && <p className="text-red-500 mb-4">{error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {!isLogin && (
//             <>
//               <input
//                 type="text"
//                 name="first_name"
//                 placeholder="Full Name"
//                 value={form.first_name}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={form.email}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </>
//           )}

//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={form.username}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />

//           <button
//             type="submit"
//             className="w-full bg-[#003366] text-white py-2 rounded hover:bg-[#002244] transition"
//           >
//             {isLogin ? "Login" : "Sign Up"}
//           </button>
//         </form>

//         <div className="my-4 text-center text-gray-500">OR</div>

//         <GoogleLogin
//           onSuccess={handleGoogleSuccess}
//           onError={() => setError("Google sign-in failed")}
//         />

//         <p className="mt-4 text-center text-sm">
//           {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//           <span
//             className="text-blue-600 cursor-pointer"
//             onClick={() => setIsLogin(!isLogin)}
//           >
//             {isLogin ? "Sign Up" : "Login"}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };











import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const BASE_URL = "https://recabitesnetwork.com/store/auth";

export const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ⭐ If redirected here by protected route or Add to Cart
  const redirectTo = location.state?.from || "/account";

  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    first_name: "",
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let res;

      if (isLogin) {
        res = await axios.post(`${BASE_URL}/login/`, {
          username: form.username,
          password: form.password,
        });
      } else {
        res = await axios.post(`${BASE_URL}/signup/`, {
          first_name: form.first_name,
          email: form.email,
          username: form.username,
          password: form.password,
        });
      }

      // Save tokens in sessionStorage
      sessionStorage.setItem("access_token", res.data.access);
      sessionStorage.setItem("refresh_token", res.data.refresh);

      // ⭐ Redirect back to the page user originally wanted
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(`${BASE_URL}/google/`, {
        token: credentialResponse.credential,
      });

      // Save tokens in sessionStorage
      sessionStorage.setItem("access_token", res.data.access);
      sessionStorage.setItem("refresh_token", res.data.refresh);

      // ⭐ Redirect back correctly
      navigate(redirectTo, { replace: true });
    } catch (err) {
      console.error(err);
      setError("Google sign-in failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <input
                type="text"
                name="first_name"
                placeholder="Full Name"
                value={form.first_name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </>
          )}

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#003366] text-white py-2 rounded hover:bg-[#002244] transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="my-4 text-center text-gray-500">OR</div>

        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setError("Google sign-in failed")}
        />

        <p className="mt-4 text-center text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};
