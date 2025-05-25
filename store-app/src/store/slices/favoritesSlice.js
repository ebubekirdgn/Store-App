import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const productId = action.payload;
      const index = state.favorites.findIndex((id) => id === productId);
      if (index > -1) {
        state.favorites.splice(index, 1); // çıkar
      } else {
        state.favorites.push(productId); // ekle
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;