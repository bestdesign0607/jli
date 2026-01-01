// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import { StorePage } from "./pages/StorePage";
// import Checkout from "./pages/Checkout";
// import { CartProvider } from "./context/CartContext";

// function App() {
//   return (
//     <CartProvider>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/store" element={<StorePage />} />
//         <Route path="/checkout" element={<Checkout />} />
//       </Routes>
//     </CartProvider>
//   );
// }

// export default App;












// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import { StorePage } from "./pages/StorePage";
// import CheckoutEmail from "./pages/CheckoutEmail";
// import CheckoutAddress from "./pages/CheckoutAddress";
// import Checkout from "./pages/Checkout";
// import CheckoutSuccess from "./pages/CheckoutSuccess";
// import { CartProvider } from "./context/CartContext";

// function App() {
//   return (
//     <CartProvider>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/store" element={<StorePage />} />
//         <Route path="/checkout/email" element={<CheckoutEmail />} />
//         <Route path="/checkout/address" element={<CheckoutAddress />} />
//         <Route path="/checkout/payment" element={<Checkout />} />
//         <Route path="/checkout/success" element={<CheckoutSuccess />} />
//       </Routes>
//     </CartProvider>
//   );
// }

// export default App;














// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import { StorePage } from "./pages/StorePage";
// import CheckoutEmail from "./pages/CheckoutEmail";
// import CheckoutAddress from "./pages/CheckoutAddress";
// import Checkout from "./pages/Checkout";
// import CheckoutSuccess from "./pages/CheckoutSuccess";
// import { CartProvider } from "./context/CartContext";
// import {ProductPage} from "./components/ProductPage"; // ⭐ IMPORTANT
// import { CartPage } from "./pages/CartPage";
// import { AuthPage } from "./pages/AuthPage";
// import AccountPage from "./pages/AccountPage";

// function App() {
//   return (
//     <CartProvider>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/store" element={<StorePage />} />
//         <Route path="/account" element={<AccountPage />} />

//         {/* ⭐ FIX: Add dynamic product route */}
//         <Route path="/product/:id" element={<ProductPage />} />
//         <Route path="/signup" element={<AuthPage />} />
//         <Route path="/login" element={<AuthPage />} />


//         <Route path="/checkout/email" element={<CheckoutEmail />} />
//         <Route path="/checkout/address" element={<CheckoutAddress />} />
//         <Route path="/checkout/payment" element={<Checkout />} />
//         <Route path="/checkout/success" element={<CheckoutSuccess />} />
//         <Route path="/cart" element={<CartPage />} />
//       </Routes>
//     </CartProvider>
//   );
// }

// export default App;















// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import { StorePage } from "./pages/StorePage";
// import CheckoutEmail from "./pages/CheckoutEmail";
// import CheckoutAddress from "./pages/CheckoutAddress";
// import Checkout from "./pages/Checkout";
// import CheckoutSuccess from "./pages/CheckoutSuccess";
// import { CartProvider } from "./context/CartContext";
// import { ProductPage } from "./components/ProductPage";
// import { CartPage } from "./pages/CartPage";
// import { AuthPage } from "./pages/AuthPage";
// import AccountPage from "./pages/AccountPage";
// import { ProtectedRoute } from "./components/ProtectedRoute"; // ⭐ Import

// function App() {
//   return (
//     <CartProvider>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/store" element={<StorePage />} />

//         {/* Protected routes */}
//         <Route
//           path="/account"
//           element={
//             <ProtectedRoute>
//               <AccountPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/product/:id"
//           element={
//             <ProtectedRoute>
//               <ProductPage />
//             </ProtectedRoute>
//           }
//         />

//         {/* Auth routes */}
//         <Route path="/signup" element={<AuthPage />} />
//         <Route path="/login" element={<AuthPage />} />

//         {/* Checkout routes */}
//         <Route path="/checkout/email" element={<CheckoutEmail />} />
//         <Route path="/checkout/address" element={<CheckoutAddress />} />
//         <Route path="/checkout/payment" element={<Checkout />} />
//         <Route path="/checkout/success" element={<CheckoutSuccess />} />
//         <Route
//           path="/cart"
//           element={
//             <ProtectedRoute>
//               <CartPage />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </CartProvider>
//   );
// }

// export default App;







import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { StorePage } from "./pages/StorePage";
import CheckoutEmail from "./pages/CheckoutEmail";
import CheckoutAddress from "./pages/CheckoutAddress";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import { CartProvider } from "./context/CartContext";
import { ProductPage } from "./components/ProductPage";
import { CartPage } from "./pages/CartPage";
import { AuthPage } from "./pages/AuthPage";
import AccountPage from "./pages/AccountPage";
import AmbassadorSignupPage from "./pages/AmbassadorSignupPage"; // ⭐ New
import { ProtectedRoute } from "./components/ProtectedRoute";
import AmbassadorDashboardPage from "./pages/AmbassadorDashboardPage";
import DigitalCheckout from "./pages/DigitalCheckout";
import DigitalPostPayment from "./pages/DigitalPostPayment";
import Solutions from "./pages/Solutions";
import SolutionDetail from "./pages/SolutionDetail";


function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solutions/:id" element={<SolutionDetail />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/digital-checkout/:id" element={<DigitalCheckout />} />
        {/* Protected routes */}
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <ProductPage />
            </ProtectedRoute>
          }
        />

        <Route path="/digital-post-payment/:id"  element={<DigitalPostPayment />}
/>

        {/* Auth routes */}
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />

        {/* Checkout routes */}
        <Route path="/checkout/email" element={<CheckoutEmail />} />
        <Route path="/checkout/address" element={<CheckoutAddress />} />
        <Route path="/checkout/payment" element={<Checkout />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />

        {/* Cart route */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />

        {/* Ambassador Signup route */}
        <Route
          path="/ambassador/signup"
          element={
            <ProtectedRoute>
              <AmbassadorSignupPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ambassador/dashboard"
          element={
            <ProtectedRoute>
              element={<AmbassadorDashboardPage />}
            </ProtectedRoute>
          }
        />
      </Routes>
    </CartProvider>
  );
}

export default App;
