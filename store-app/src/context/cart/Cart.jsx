import  { createContext, useState, useEffect, useContext } from "react";
import requests from "./../../api/apiClient";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);


  useEffect(() => {
    requests.cart
      .get()
      .then((cart) => setCart(cart))
      .catch((err) => {
        console.error(err);
        setError(err);
      })
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);