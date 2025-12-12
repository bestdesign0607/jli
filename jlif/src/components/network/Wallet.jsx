// src/components/network/Wallet.jsx
import React, { useEffect, useState } from "react";
import api from "../../api/axios";

export const Wallet = () => {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    api.get("wallet/").then(res => setWallet(res.data)).catch(console.error);
  }, []);

  if (!wallet) return <p>Loading wallet...</p>;

  return (
    <div className="bg-white p-4 rounded shadow max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Wallet Balance</h2>
      <p className="text-green-600 font-semibold text-lg">₦{wallet.balance}</p>
    </div>
  );
};
