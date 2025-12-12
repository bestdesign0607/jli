import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";

import AddProduct from "./pages/AddProduct";
import Products from "./pages/Products";
import Orders from "./pages/Orders";

export default function App() {
  return (
    <Routes>
      
      <Route path="/dashboard" element={<DashboardLayout />}>

        <Route path="products" element={<Products />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="orders" element={<Orders />} />

      </Route>

    </Routes>
  );
}
