import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={{
      width: "250px",
      background: "#003366",
      color: "white",
      height: "100vh",
      padding: "20px"
    }}>
      <h2 style={{ marginBottom: "30px" }}>Admin</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <Link to="/dashboard/add-product" style={{ color: "white" }}>AddProduct</Link>
        <Link to="/dashboard/products" style={{ color: "white" }}>Product</Link>
        <Link to="/dashboard/orders" style={{ color: "white" }}>Orders</Link>
        <Link to="/dashboard/network/wallet" style={{ color: "white" }}>Wallet</Link>
        <Link to="/dashboard/network/withdrawals" style={{ color: "white" }}>Withdrawals</Link>
        <Link to="/dashboard/network/downline" style={{ color: "white" }}>Downline Tree</Link>

      </nav>
    </div>
  );
}
