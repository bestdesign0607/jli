// import { Routes, Route } from "react-router-dom";
// import DashboardLayout from "./components/DashboardLayout";

// import AddProduct from "./pages/AddProduct";
// import Products from "./pages/Products";
// import Orders from "./pages/Orders";
// import DigitalOrdersAdmin from "./pages/DigitalOrdersAdmin";

// export default function App() {
//   return (
//     <Routes>
      
//       <Route path="/dashboard" element={<DashboardLayout />}>

//         <Route path="products" element={<Products />} />
//         <Route path="add-product" element={<AddProduct />} />
//         <Route path="orders" element={<Orders />} />
//         <Route path="/dashboard/digital-orders" element={<DigitalOrdersAdmin />} />


//       </Route>

//     </Routes>
//   );
// }











import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";

import AddProduct from "./pages/AddProduct";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import DigitalOrdersAdmin from "./pages/DigitalOrdersAdmin";
import AdminLogin from "./pages/AdminLogin";
import AdminRoute from "./components/AdminRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/admin-login" element={<AdminLogin />} />

      <Route
        path="/dashboard/*"
        element={
          <AdminRoute>
            <DashboardLayout />
          </AdminRoute>
        }
      >
        <Route path="products" element={<Products />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="orders" element={<Orders />} />
        <Route path="digital-orders" element={<DigitalOrdersAdmin />} />
      </Route>
    </Routes>
  );
}
