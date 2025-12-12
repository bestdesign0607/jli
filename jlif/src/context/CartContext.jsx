// import { createContext, useContext, useState } from "react";

// export const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);

//   const addToCart = (product, quantity = 1) => {
//   setCartItems(prev => {
//     const existing = prev.find(item => item.id === product.id);

//     // Try all possible price keys
//     const rawPrice =
//       product.unit_price ??
//       product.price ??
//       product.amount ??
//       product.cost ??
//       product.selling_price ??
//       product.sellingPrice ??
//       0;

//     // Clean & convert price
//     const numericPrice =
//       typeof rawPrice === "string"
//         ? Number(rawPrice.replace(/[^\d.]/g, ""))
//         : Number(rawPrice);

//     if (existing) {
//       return prev.map(item =>
//         item.id === product.id
//           ? { ...item, quantity: item.quantity + quantity }
//           : item
//       );
//     }

//     return [
//       ...prev,
//       {
//         ...product,
//         quantity,
//         unit_price: numericPrice, // force number
//       },
//     ];
//   });

//   setIsOpen(true);
// };


//   const removeFromCart = (id) => {
//     setCartItems(prev => prev.filter(item => item.id !== id));
//   };

//   const clearCart = () => setCartItems([]);

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         clearCart,
//         isOpen,
//         setIsOpen,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };
















import { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      // Determine numeric price
      const rawPrice =
        product.unit_price ??
        product.cleaned_price ??
        product.price ??
        product.amount ??
        product.cost ??
        product.selling_price ??
        product.sellingPrice ??
        0;

      const numericPrice =
        typeof rawPrice === "string"
          ? Number(rawPrice.replace(/[^\d.]/g, ""))
          : Number(rawPrice);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity,
          unit_price: numericPrice, // always store numeric price
          cleaned_price: numericPrice,
          formatted_price: "₦" + numericPrice.toLocaleString("en-NG"),
        },
      ];
    });

    setIsOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.cleaned_price ?? item.unit_price ?? 0) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        isOpen,
        setIsOpen,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
