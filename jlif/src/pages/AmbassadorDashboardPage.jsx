// src/pages/AmbassadorDashboardPage.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


export default function AmbassadorDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/network/ambassador/dashboard/",
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        {/* <div className="bg-white p-6 rounded shadow flex justify-between items-center">
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

          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={() => {
              navigator.clipboard.writeText(referral_link);
              alert("Referral link copied!");
            }}
          >
            Copy Referral Link
          </button>
        </div> */}

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
    {/* Back Home */}
    <Link
      to="/store"
      className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
    >
      ← Back Home
    </Link>

    {/* Copy referral */}
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

        {/* Matrix Visualization */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-bold mb-4">Your Downline Matrix</h2>
          {(!stats.matrix || stats.matrix.length === 0)? (
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
                  {Array(3 - lvl.children.length)
                    .fill(null)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="p-2 border-dashed border rounded text-gray-400 w-24 text-center"
                      >
                        Empty
                      </div>
                    ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Recent Transactions */}
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
