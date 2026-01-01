// import Sidebar from "./Sidebar";
// import { Outlet } from "react-router-dom";

// export default function DashboardLayout() {
//   return (
//     <div style={{display:"flex"}}>
//       <Sidebar />
      
//       <div style={{flex:1, padding:"25px"}}>
//         <Outlet />
//       </div>
//     </div>
//   );
// }








import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";

export default function DashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("is_admin");
    navigate("/admin-login");
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "25px" }}>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#dc2626",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: "4px",
            marginBottom: "20px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Logout
        </button>

        <Outlet />
      </div>
    </div>
  );
}
