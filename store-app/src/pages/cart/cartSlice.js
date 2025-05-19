import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    clearCart: (state) => {
      state.cart = null;
    },
  },
});

export const { setCart } = cartSlice.actions;