// import React from "react";
// import { StoreHeader } from "../components/StoreHeader";

// export const StoreLayout = ({
//     children,
//     searchValue,
//     setSearchValue,
//     searchProducts,
//     categories,
//     loadCategory,
//     cartCount,
//     goHome,
//     goToAccount,
// }) => {
//     return (
//         <div className="bg-[#f7f7f7] min-h-screen">
//             <StoreHeader
//                 searchValue={searchValue}
//                 setSearchValue={setSearchValue}
//                 searchProducts={searchProducts}
//                 categories={categories}
//                 loadCategory={loadCategory}
//                 cartCount={cartCount}
//                 goHome={goHome}
//                 goToAccount={goToAccount}
//             />

//             <main>{children}</main>
//         </div>
//     );
// };












// import React from "react";
// import { StoreHeader } from "../components/StoreHeader";

// export const StoreLayout = ({
//   children,
//   searchValue = "",
//   setSearchValue = () => {},
//   searchProducts = () => {},
//   categories = [],
//   loadCategory = () => {},
//   cartCount = 0,
//   goHome = () => (window.location.href = "/"),
//   goToAccount = () => (window.location.href = "/signup"),
//   logo = "/logo.png",
// }) => {
//   return (
//     <div className="bg-[#f7f7f7] min-h-screen">
//       <StoreHeader
//         searchValue={searchValue}
//         setSearchValue={setSearchValue}
//         searchProducts={searchProducts}
//         categories={categories}      // ✅ Pass categories
//         loadCategory={loadCategory}  // ✅ Pass category click handler
//         cartCount={cartCount}
//         goHome={goHome}
//         goToAccount={goToAccount}
//         logo={logo}                  // ✅ Pass logo from public folder
//       />
//       <main>{children}</main>
//     </div>
//   );
// };










import React from "react";
import { StoreHeader } from "../components/StoreHeader";

export const StoreLayout = ({
  children,
  searchValue = "",
  setSearchValue = () => {},
  searchProducts = () => {},
  categories = [],
  loadCategory = () => {},
  goHome = () => {},
  goToAccount = () => {},
  logo = "/logo.png",
}) => {
  return (
    <div className="bg-[#f7f7f7] min-h-screen">
      <StoreHeader
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchProducts={searchProducts}
        categories={categories}
        loadCategory={loadCategory}
        goHome={goHome}
        goToAccount={goToAccount}
        logo={logo}
      />
      <main>{children}</main>
    </div>
  );
};
