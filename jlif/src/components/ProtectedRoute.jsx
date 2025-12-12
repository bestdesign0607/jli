// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { verifyUser } from "../utils/auth";

export const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const valid = await verifyUser();
      setIsValid(valid);
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading) return <p className="text-center mt-20">Checking authentication...</p>;

  if (!isValid) return <Navigate to="/login" replace />;

  return children;
};
