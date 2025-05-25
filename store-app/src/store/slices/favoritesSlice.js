import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const product = action.payload; // Artık ürün objesi bekliyoruz
      const index = state.favorites.findIndex((item) => item.id === product.id);
      if (index > -1) {
        state.favorites.splice(index, 1); // çıkar
      } else {
        state.favorites.push(product); // ürün objesini ekle
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;