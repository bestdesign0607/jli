// // src/pages/AmbassadorDashboardPage.jsx
// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";


// export default function AmbassadorDashboardPage() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       const token = localStorage.getItem("access_token");
//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       try {
//         const res = await axios.get(
//           "http://127.0.0.1:8000/network/ambassador/dashboard/",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         if (!res.data.is_ambassador) {
//           navigate("/");
//           return;
//         }
//         setData(res.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load ambassador dashboard");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboard();
//   }, [navigate]);

//   if (loading) return <p className="text-center mt-20">Loading dashboard…</p>;
//   if (error) return <p className="text-center mt-20 text-red-600">{error}</p>;

//   const { profile, wallet, recent_transactions, stats, referral_link } = data;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-5xl mx-auto space-y-6">

//         {/* Header */}
//         {/* <div className="bg-white p-6 rounded shadow flex justify-between items-center">
//           <div>
//             <h1 className="text-2xl font-bold text-green-700">
//               Ambassador Dashboard
//             </h1>
//             <p className="text-sm text-gray-600">
//               Referral Code:{" "}
//               <span className="font-mono font-semibold">
//                 {profile.referral_code}
//               </span>
//             </p>
//           </div>

//           <button
//             className="px-4 py-2 bg-green-600 text-white rounded"
//             onClick={() => {
//               navigator.clipboard.writeText(referral_link);
//               alert("Referral link copied!");
//             }}
//           >
//             Copy Referral Link
//           </button>
//         </div> */}

//         {/* Header */}
// <div className="bg-white p-6 rounded shadow flex justify-between items-center">
//   <div>
//     <h1 className="text-2xl font-bold text-green-700">
//       Ambassador Dashboard
//     </h1>
//     <p className="text-sm text-gray-600">
//       Referral Code:{" "}
//       <span className="font-mono font-semibold">
//         {profile.referral_code}
//       </span>
//     </p>
//   </div>

//   <div className="flex gap-3">
//     {/* Back Home */}
//     <Link
//       to="/store"
//       className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
//     >
//       ← Back Home
//     </Link>

//     {/* Copy referral */}
//     <button
//       className="px-4 py-2 bg-green-600 text-white rounded"
//       onClick={() => {
//         navigator.clipboard.writeText(referral_link);
//         alert("Referral link copied!");
//       }}
//     >
//       Copy Referral Link
//     </button>
//   </div>
// </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <StatCard title="Wallet Balance" value={`₦${wallet.balance}`} />
//           <StatCard title="Direct Referrals" value={stats.direct_referrals} />
//           <StatCard title="Total Downline" value={stats.total_downline} />
//         </div>

//         {/* Matrix Visualization */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-bold mb-4">Your Downline Matrix</h2>
//           {(!stats.matrix || stats.matrix.length === 0)? (
//             <p className="text-sm text-gray-500">No downline yet</p>
//           ) : (
//             stats.matrix.map((lvl) => (
//               <div key={lvl.level} className="mb-2">
//                 <p className="font-semibold">Level {lvl.level}</p>
//                 <div className="flex gap-2 flex-wrap">
//                   {lvl.children.map((child) => (
//                     <div
//                       key={child.id}
//                       className="p-2 border rounded text-center w-24"
//                     >
//                       {child.name} ({child.children_count}/3)
//                     </div>
//                   ))}
//                   {Array(3 - lvl.children.length)
//                     .fill(null)
//                     .map((_, i) => (
//                       <div
//                         key={i}
//                         className="p-2 border-dashed border rounded text-gray-400 w-24 text-center"
//                       >
//                         Empty
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Recent Transactions */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-bold mb-4">Recent Transactions</h2>

//           {recent_transactions.length === 0 ? (
//             <p className="text-sm text-gray-500">No transactions yet</p>
//           ) : (
//             <table className="w-full text-sm border">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="p-2 border">Type</th>
//                   <th className="p-2 border">Amount</th>
//                   <th className="p-2 border">Note</th>
//                   <th className="p-2 border">Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {recent_transactions.map((tx, i) => (
//                   <tr key={i}>
//                     <td className="p-2 border">{tx.tx_type}</td>
//                     <td className="p-2 border">₦{tx.amount}</td>
//                     <td className="p-2 border">{tx.note}</td>
//                     <td className="p-2 border">
//                       {new Date(tx.created_at).toLocaleString()}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function StatCard({ title, value }) {
//   return (
//     <div className="bg-white p-4 rounded shadow">
//       <p className="text-sm text-gray-600">{title}</p>
//       <p className="text-xl font-bold text-green-700">{value}</p>
//     </div>
//   );
// }









// // src/pages/AmbassadorDashboardPage.jsx
// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function AmbassadorDashboardPage() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [withdrawAmount, setWithdrawAmount] = useState("");
//   const [bankName, setBankName] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [withdrawMessage, setWithdrawMessage] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       const token = localStorage.getItem("access_token");
//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       try {
//         const res = await axios.get(
//           "http://127.0.0.1:8000/network/ambassador/dashboard/",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         if (!res.data.is_ambassador) {
//           navigate("/");
//           return;
//         }
//         setData(res.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load ambassador dashboard");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboard();
//   }, [navigate]);

//   if (loading) return <p className="text-center mt-20">Loading dashboard…</p>;
//   if (error) return <p className="text-center mt-20 text-red-600">{error}</p>;

//   const { profile, wallet, recent_transactions, stats, referral_link } = data;

//   const token = localStorage.getItem("access_token");
//   const headers = token ? { Authorization: `Bearer ${token}` } : {};

//   // -------------------- Withdrawal Function --------------------
//   const handleWithdrawal = async () => {
//     if (!withdrawAmount || !bankName || !accountNumber) {
//       setWithdrawMessage("Please fill in all fields.");
//       return;
//     }
//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:8000/network/withdraw/",
//         {
//           amount: withdrawAmount,
//           bank_name: bankName,
//           account_number: accountNumber,
//         },
//         { headers }
//       );
//       setWithdrawMessage("Withdrawal requested successfully!");
//       setWithdrawAmount("");
//       setBankName("");
//       setAccountNumber("");
//       // Optionally refresh wallet and transactions
//       const updatedData = await axios.get(
//         "http://127.0.0.1:8000/network/ambassador/dashboard/",
//         { headers }
//       );
//       setData(updatedData.data);
//     } catch (err) {
//       console.error(err);
//       setWithdrawMessage(
//         err.response?.data?.error || "Failed to request withdrawal"
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-5xl mx-auto space-y-6">

//         {/* Header */}
//         <div className="bg-white p-6 rounded shadow flex justify-between items-center">
//           <div>
//             <h1 className="text-2xl font-bold text-green-700">
//               Ambassador Dashboard
//             </h1>
//             <p className="text-sm text-gray-600">
//               Referral Code:{" "}
//               <span className="font-mono font-semibold">
//                 {profile.referral_code}
//               </span>
//             </p>
//           </div>

//           <div className="flex gap-3">
//             {/* Back Home */}
//             <Link
//               to="/store"
//               className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
//             >
//               ← Back Home
//             </Link>

//             {/* Copy referral */}
//             <button
//               className="px-4 py-2 bg-green-600 text-white rounded"
//               onClick={() => {
//                 navigator.clipboard.writeText(referral_link);
//                 alert("Referral link copied!");
//               }}
//             >
//               Copy Referral Link
//             </button>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <StatCard title="Wallet Balance" value={`₦${wallet.balance}`} />
//           <StatCard title="Direct Referrals" value={stats.direct_referrals} />
//           <StatCard title="Total Downline" value={stats.total_downline} />
//         </div>

//         {/* -------------------- Withdrawal Form -------------------- */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-bold mb-4">Withdraw Funds</h2>
//           <div className="space-y-3 max-w-md">
//             <input
//               type="number"
//               placeholder="Amount"
//               value={withdrawAmount}
//               onChange={(e) => setWithdrawAmount(e.target.value)}
//               className="w-full p-2 border rounded"
//             />
//             <input
//               type="text"
//               placeholder="Bank Name"
//               value={bankName}
//               onChange={(e) => setBankName(e.target.value)}
//               className="w-full p-2 border rounded"
//             />
//             <input
//               type="text"
//               placeholder="Account Number"
//               value={accountNumber}
//               onChange={(e) => setAccountNumber(e.target.value)}
//               className="w-full p-2 border rounded"
//             />
//             <button
//               onClick={handleWithdrawal}
//               className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
//             >
//               Withdraw
//             </button>
//             {withdrawMessage && (
//               <p className="mt-2 text-center text-sm text-red-600">
//                 {withdrawMessage}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Matrix Visualization */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-bold mb-4">Your Downline Matrix</h2>
//           {(!stats.matrix || stats.matrix.length === 0) ? (
//             <p className="text-sm text-gray-500">No downline yet</p>
//           ) : (
//             stats.matrix.map((lvl) => (
//               <div key={lvl.level} className="mb-2">
//                 <p className="font-semibold">Level {lvl.level}</p>
//                 <div className="flex gap-2 flex-wrap">
//                   {lvl.children.map((child) => (
//                     <div
//                       key={child.id}
//                       className="p-2 border rounded text-center w-24"
//                     >
//                       {child.name} ({child.children_count}/3)
//                     </div>
//                   ))}
//                   {Array(3 - lvl.children.length)
//                     .fill(null)
//                     .map((_, i) => (
//                       <div
//                         key={i}
//                         className="p-2 border-dashed border rounded text-gray-400 w-24 text-center"
//                       >
//                         Empty
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Recent Transactions */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-bold mb-4">Recent Transactions</h2>
//           {recent_transactions.length === 0 ? (
//             <p className="text-sm text-gray-500">No transactions yet</p>
//           ) : (
//             <table className="w-full text-sm border">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="p-2 border">Type</th>
//                   <th className="p-2 border">Amount</th>
//                   <th className="p-2 border">Note</th>
//                   <th className="p-2 border">Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {recent_transactions.map((tx, i) => (
//                   <tr key={i}>
//                     <td className="p-2 border">{tx.tx_type}</td>
//                     <td className="p-2 border">₦{tx.amount}</td>
//                     <td className="p-2 border">{tx.note}</td>
//                     <td className="p-2 border">
//                       {new Date(tx.created_at).toLocaleString()}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function StatCard({ title, value }) {
//   return (
//     <div className="bg-white p-4 rounded shadow">
//       <p className="text-sm text-gray-600">{title}</p>
//       <p className="text-xl font-bold text-green-700">{value}</p>
//     </div>
//   );
// }










// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function AmbassadorDashboardPage() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [withdrawAmount, setWithdrawAmount] = useState("");
//   const [bankName, setBankName] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [accountName, setAccountName] = useState("");
//   const [withdrawMessage, setWithdrawMessage] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       const token = localStorage.getItem("access_token");
//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       try {
//         const res = await axios.get(
//           "http://127.0.0.1:8000/network/ambassador/dashboard/",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         if (!res.data.is_ambassador) {
//           navigate("/");
//           return;
//         }
//         setData(res.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load ambassador dashboard");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboard();
//   }, [navigate]);

//   if (loading) return <p className="text-center mt-20">Loading dashboard…</p>;
//   if (error) return <p className="text-center mt-20 text-red-600">{error}</p>;

//   const { profile, wallet, recent_transactions, stats, referral_link } = data;

//   const token = localStorage.getItem("access_token");
//   const headers = token ? { Authorization: `Bearer ${token}` } : {};

//   // -------------------- Withdrawal Function --------------------
//   const handleWithdrawal = async () => {
//     if (!withdrawAmount || !bankName || !accountNumber || !accountName) {
//       setWithdrawMessage("Please fill in all fields.");
//       return;
//     }

//     if (accountNumber.length !== 10) {
//       setWithdrawMessage("Account number must be 10 digits.");
//       return;
//     }

//     try {
//       await axios.post(
//         "http://127.0.0.1:8000/network/withdraw/",
//         {
//           amount: withdrawAmount,
//           bank_name: bankName,
//           account_number: accountNumber,
//           account_name: accountName,
//         },
//         { headers }
//       );

//       setWithdrawMessage("Withdrawal requested successfully!");
//       setWithdrawAmount("");
//       setBankName("");
//       setAccountNumber("");
//       setAccountName("");

//       const updatedData = await axios.get(
//         "http://127.0.0.1:8000/network/ambassador/dashboard/",
//         { headers }
//       );
//       setData(updatedData.data);
//     } catch (err) {
//       console.error(err);
//       setWithdrawMessage(
//         err.response?.data?.error || "Failed to request withdrawal"
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-5xl mx-auto space-y-6">

//         {/* Header */}
//         <div className="bg-white p-6 rounded shadow flex justify-between items-center">
//           <div>
//             <h1 className="text-2xl font-bold text-green-700">
//               Ambassador Dashboard
//             </h1>
//             <p className="text-sm text-gray-600">
//               Referral Code:{" "}
//               <span className="font-mono font-semibold">
//                 {profile.referral_code}
//               </span>
//             </p>
//           </div>

//           <div className="flex gap-3">
//             <Link
//               to="/store"
//               className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
//             >
//               ← Back Home
//             </Link>
//             <button
//               className="px-4 py-2 bg-green-600 text-white rounded"
//               onClick={() => {
//                 navigator.clipboard.writeText(referral_link);
//                 alert("Referral link copied!");
//               }}
//             >
//               Copy Referral Link
//             </button>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <StatCard title="Wallet Balance" value={`₦${wallet.balance}`} />
//           <StatCard title="Direct Referrals" value={stats.direct_referrals} />
//           <StatCard title="Total Downline" value={stats.total_downline} />
//         </div>

//         {/* Withdrawal Form */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-bold mb-4">Withdraw Funds</h2>
//           <div className="space-y-3 max-w-md">
//             <input
//               type="number"
//               placeholder="Amount"
//               value={withdrawAmount}
//               onChange={(e) => setWithdrawAmount(e.target.value)}
//               className="w-full p-2 border rounded"
//             />

//             <input
//               type="text"
//               placeholder="Account Name"
//               value={accountName}
//               onChange={(e) => setAccountName(e.target.value)}
//               className="w-full p-2 border rounded"
//             />

//             <select
//               value={bankName}
//               onChange={(e) => setBankName(e.target.value)}
//               className="w-full p-2 border rounded"
//             >
//               <option value="">Select Bank</option>
//               <option value="Access Bank">Access Bank</option>
//               <option value="GTBank">GTBank</option>
//               <option value="Zenith Bank">Zenith Bank</option>
//               <option value="UBA">UBA</option>
//               <option value="First Bank">First Bank</option>
//               <option value="Fidelity Bank">Fidelity Bank</option>
//               <option value="Union Bank">Union Bank</option>
//               <option value="Ecobank">Ecobank</option>
//               <option value="Sterling Bank">Sterling Bank</option>
//               <option value="Polaris Bank">Polaris Bank</option>
//               <option value="Wema Bank">Wema Bank</option>
//               <option value="Keystone Bank">Keystone Bank</option>
//               <option value="Unity Bank">Unity Bank</option>
//               <option value="Globus Bank">Globus Bank</option>
//             </select>

//             <input
//               type="text"
//               placeholder="Account Number"
//               value={accountNumber}
//               onChange={(e) => setAccountNumber(e.target.value)}
//               className="w-full p-2 border rounded"
//             />

//             <button
//               onClick={handleWithdrawal}
//               className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
//             >
//               Withdraw
//             </button>

//             {withdrawMessage && (
//               <p className="mt-2 text-center text-sm text-red-600">
//                 {withdrawMessage}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Matrix */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-bold mb-4">Your Downline Matrix</h2>
//           {(!stats.matrix || stats.matrix.length === 0) ? (
//             <p className="text-sm text-gray-500">No downline yet</p>
//           ) : (
//             stats.matrix.map((lvl) => (
//               <div key={lvl.level} className="mb-2">
//                 <p className="font-semibold">Level {lvl.level}</p>
//                 <div className="flex gap-2 flex-wrap">
//                   {lvl.children.map((child) => (
//                     <div
//                       key={child.id}
//                       className="p-2 border rounded text-center w-24"
//                     >
//                       {child.name} ({child.children_count}/3)
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Transactions */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-bold mb-4">Recent Transactions</h2>
//           {recent_transactions.length === 0 ? (
//             <p className="text-sm text-gray-500">No transactions yet</p>
//           ) : (
//             <table className="w-full text-sm border">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="p-2 border">Type</th>
//                   <th className="p-2 border">Amount</th>
//                   <th className="p-2 border">Note</th>
//                   <th className="p-2 border">Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {recent_transactions.map((tx, i) => (
//                   <tr key={i}>
//                     <td className="p-2 border">{tx.tx_type}</td>
//                     <td className="p-2 border">₦{tx.amount}</td>
//                     <td className="p-2 border">{tx.note}</td>
//                     <td className="p-2 border">
//                       {new Date(tx.created_at).toLocaleString()}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function StatCard({ title, value }) {
//   return (
//     <div className="bg-white p-4 rounded shadow">
//       <p className="text-sm text-gray-600">{title}</p>
//       <p className="text-xl font-bold text-green-700">{value}</p>
//     </div>
//   );
// }












import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AmbassadorDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [withdrawMessage, setWithdrawMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = sessionStorage.getItem("access_token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(
          "https://recabitesnetwork.com/network/ambassador/dashboard/",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.data.is_ambassador) {
          navigate("/");
          return;
        }
        setData(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load ambassador dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  if (loading) return <p className="text-center mt-20">Loading dashboard…</p>;
  if (error) return <p className="text-center mt-20 text-red-600">{error}</p>;

  const { profile, wallet, recent_transactions, stats, referral_link } = data;

  const token = localStorage.getItem("access_token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  // -------------------- Withdrawal Function --------------------
  const handleWithdrawal = async () => {
    const trimmedAccountName = accountName.trim();
    const trimmedBankName = bankName.trim();
    const trimmedAccountNumber = accountNumber.trim();
    const amountNumber = parseFloat(withdrawAmount);

    if (
      !withdrawAmount ||
      !trimmedBankName ||
      !trimmedAccountNumber ||
      !trimmedAccountName
    ) {
      setWithdrawMessage("Please fill in all fields.");
      return;
    }

    if (trimmedAccountNumber.length !== 10 || !/^\d+$/.test(trimmedAccountNumber)) {
      setWithdrawMessage("Account number must be 10 digits.");
      return;
    }

    if (isNaN(amountNumber) || amountNumber <= 0) {
      setWithdrawMessage("Please enter a valid amount greater than 0.");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:8000/network/withdraw/",
        {
          amount: amountNumber,
          bank_name: trimmedBankName,
          account_number: trimmedAccountNumber,
          account_name: trimmedAccountName,
        },
        { headers }
      );

      setWithdrawMessage("Withdrawal requested successfully!");
      setWithdrawAmount("");
      setBankName("");
      setAccountNumber("");
      setAccountName("");

      const updatedData = await axios.get(
        "http://127.0.0.1:8000/network/ambassador/dashboard/",
        { headers }
      );
      setData(updatedData.data);
    } catch (err) {
      console.error(err);
      setWithdrawMessage(
        err.response?.data?.error || "Failed to request withdrawal"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white p-6 rounded shadow flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-green-700">
              Ambassador Dashboard
            </h1>
            <p className="text-sm text-gray-600">
              Referral Code:{" "}
              <span className="font-mono font-semibold">
                {profile.referral_code}
              </span>
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              to="/store"
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
            >
              ← Back Home
            </Link>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded"
              onClick={() => {
                navigator.clipboard.writeText(referral_link);
                alert("Referral link copied!");
              }}
            >
              Copy Referral Link
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Wallet Balance" value={`₦${wallet.balance}`} />
          <StatCard title="Direct Referrals" value={stats.direct_referrals} />
          <StatCard title="Total Downline" value={stats.total_downline} />
        </div>

        {/* Withdrawal Form */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-bold mb-4">Withdraw Funds</h2>
          <div className="space-y-3 max-w-md">
            <input
              type="number"
              placeholder="Amount"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="w-full p-2 border rounded"
            />

            <input
              type="text"
              placeholder="Account Name"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full p-2 border rounded"
            />

            <select
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Bank</option>
              <option value="Access Bank">Access Bank</option>
              <option value="GTBank">GTBank</option>
              <option value="Zenith Bank">Zenith Bank</option>
              <option value="UBA">UBA</option>
              <option value="First Bank">First Bank</option>
              <option value="Fidelity Bank">Fidelity Bank</option>
              <option value="Union Bank">Union Bank</option>
              <option value="Ecobank">Ecobank</option>
              <option value="Sterling Bank">Sterling Bank</option>
              <option value="Polaris Bank">Polaris Bank</option>
              <option value="Wema Bank">Wema Bank</option>
              <option value="Keystone Bank">Keystone Bank</option>
              <option value="Unity Bank">Unity Bank</option>
              <option value="Globus Bank">Globus Bank</option>
            </select>

            <input
              type="text"
              placeholder="Account Number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full p-2 border rounded"
            />

            <button
              onClick={handleWithdrawal}
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            >
              Withdraw
            </button>

            {withdrawMessage && (
              <p className="mt-2 text-center text-sm text-red-600">
                {withdrawMessage}
              </p>
            )}
          </div>
        </div>

        {/* Matrix */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-bold mb-4">Your Downline Matrix</h2>
          {(!stats.matrix || stats.matrix.length === 0) ? (
            <p className="text-sm text-gray-500">No downline yet</p>
          ) : (
            stats.matrix.map((lvl) => (
              <div key={lvl.level} className="mb-2">
                <p className="font-semibold">Level {lvl.level}</p>
                <div className="flex gap-2 flex-wrap">
                  {lvl.children.map((child) => (
                    <div
                      key={child.id}
                      className="p-2 border rounded text-center w-24"
                    >
                      {child.name} ({child.children_count}/3)
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Transactions */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-bold mb-4">Recent Transactions</h2>
          {recent_transactions.length === 0 ? (
            <p className="text-sm text-gray-500">No transactions yet</p>
          ) : (
            <table className="w-full text-sm border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Type</th>
                  <th className="p-2 border">Amount</th>
                  <th className="p-2 border">Note</th>
                  <th className="p-2 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {recent_transactions.map((tx, i) => (
                  <tr key={i}>
                    <td className="p-2 border">{tx.tx_type}</td>
                    <td className="p-2 border">₦{tx.amount}</td>
                    <td className="p-2 border">{tx.note}</td>
                    <td className="p-2 border">
                      {new Date(tx.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-xl font-bold text-green-700">{value}</p>
    </div>
  );
}
