// src/utils/auth.js
import axios from "axios";

export const verifyUser = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) return false;

  try {
    const res = await axios.get("http://127.0.0.1:8000/store/auth/profile/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return true; // user exists and active
  } catch (err) {
    // token invalid or user deleted
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    return false;
  }
};
