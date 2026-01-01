// // src/utils/auth.js
// import axios from "axios";

// export const verifyUser = async () => {
//   const token = localStorage.getItem("access_token");
//   if (!token) return false;

//   try {
//     const res = await axios.get("http://127.0.0.1:8000/store/auth/profile/", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return true; // user exists and active
//   } catch (err) {
//     // token invalid or user deleted
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     return false;
//   }
// };









// import axios from "axios";

// const API_BASE = "http://127.0.0.1:8000/store";

// export const verifyUser = async () => {
//   let token = localStorage.getItem("access_token");
//   const refresh = localStorage.getItem("refresh_token");
//   if (!token) return false;

//   try {
//     const res = await axios.get(`${API_BASE}/auth/profile/`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return true; // user exists and active
//   } catch (err) {
//     // token invalid or expired
//     if (refresh) {
//       try {
//         const refreshRes = await axios.post(`${API_BASE}/api/token/refresh/`, {
//           refresh,
//         });
//         localStorage.setItem("access_token", refreshRes.data.access);
//         token = refreshRes.data.access;

//         // retry the profile request
//         await axios.get(`${API_BASE}/auth/profile/`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         return true;
//       } catch {
//         localStorage.removeItem("access_token");
//         localStorage.removeItem("refresh_token");
//         return false;
//       }
//     }

//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     return false;
//   }
// };













import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/store";

export const verifyUser = async () => {
  // Use sessionStorage so login persists only until browser/tab is closed
  const token = sessionStorage.getItem("access_token");
  if (!token) return false;

  try {
    // Verify token by fetching profile
    await axios.get(`${API_BASE}/auth/profile/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return true; // token is valid
  } catch (err) {
    // Token invalid or expired
    sessionStorage.removeItem("access_token");
    return false;
  }
};
