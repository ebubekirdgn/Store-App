import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import catalogReducer from "./slices/catalogSlice";
import accountReducer from "./slices/accountSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    catalog: catalogReducer,
    account: accountReducer,
  },
});
export default store;
