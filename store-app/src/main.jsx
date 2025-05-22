import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CartContextProvider } from "./context/cart/Cart.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { injectStore } from "./api/apiClient";

injectStore(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </Provider>
  </StrictMode>
);
