// src/components/network/Withdrawals.jsx
import React, { useState, useEffect } from "react";
import api from "../../api/axios";

export const Withdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [amount, setAmount] = useState("");
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [message, setMessage] = useState("");

  const fetchWithdrawals = () => {
    api.get("wallet/ledger/").then(res => setWithdrawals(res.data)).catch(console.error);
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const requestWithdrawal = async () => {
    try {
      await api.post("withdraw/", {
        amount,
        bank_name: bank,
        account_number: accountNumber,
      });
      setMessage("Withdrawal requested successfully!");
      fetchWithdrawals();
    } catch (err) {
      setMessage(err.response?.data?.error || "Error requesting withdrawal");
    }
  };

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-2">Request Withdrawal</h2>
      <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} className="w-full p-2 border rounded" />
      <input type="text" placeholder="Bank Name" value={bank} onChange={e => setBank(e.target.value)} className="w-full p-2 border rounded" />
      <input type="text" placeholder="Account Number" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} className="w-full p-2 border rounded" />
      <button onClick={requestWithdrawal} className="w-full bg-blue-600 text-white p-2 rounded">Request</button>
      {message && <p className="text-center mt-2">{message}</p>}

      <h2 className="text-xl font-bold mt-6">Withdrawal Ledger</h2>
      <ul className="space-y-2">
        {withdrawals.map(tx => (
          <li key={tx.id} className="flex justify-between p-2 border rounded">
            <span>{tx.tx_type}</span>
            <span>₦{tx.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
