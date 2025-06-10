import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import requests from "../../api/apiClient";
import { STATUS } from "../../utils/constants";

export const fetchProducts = createAsyncThunk(
  "catalog/fetchProducts",
  async () => {
    return await requests.products.list();
  }
);

export const fetchProductById = createAsyncThunk(
  "catalog/fetchProductById",
  async (productId, { getState }) => {
    const existingProduct = selectProductById(getState(), productId);
    if (existingProduct) return existingProduct; // Yeniden çekme
    return await requests.products.details(productId);
  }
);

const productsAdapter = createEntityAdapter();

const initialState = productsAdapter.getInitialState({
  status: STATUS.IDLE,
  isLoaded: false,
});

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = STATUS.PENDING_FETCH_PRODUCTS;
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload.products); // SADECE ürün dizisi!
      state.isLoaded = true;
      state.status = STATUS.IDLE;
      // Diğer meta bilgileri de state'e eklemek istersen ayrıca ekle
    });

    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = STATUS.IDLE;
      state.error = action.error?.message || "Ürünler yüklenemedi";
    });

    builder.addCase(fetchProductById.pending, (state) => {
      state.status = STATUS.PENDING_FETCH_PRODUCTSBYID;
    });

    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      productsAdapter.upsertOne(state, action.payload);
      state.status = STATUS.IDLE;
    });

    builder.addCase(fetchProductById.rejected, (state) => {
      state.status = STATUS.IDLE;
      state.error = action.error?.message || "Ürün yüklenemedi";
    });
  },
});

export const {
  selectById: selectProductById,
  selectAll: selectAllProducts,
  selectTotal: selectTotalProducts,
} = productsAdapter.getSelectors((state) => state.catalog);

export default catalogSlice.reducer;

/**
 * Redux slice for managing the product catalog state.
 *
 * Handles asynchronous actions for fetching all products and fetching a product by ID,
 * updating the state accordingly for loading, success, and error scenarios.
 *
 * State shape managed by this slice includes:
 * - status: Current status of product fetching operations.
 * - isLoaded: Boolean indicating if products have been loaded.
 * - error: Error message if fetching fails.
 * - Product entities managed by productsAdapter.
 *
 * Extra reducers:
 * - fetchProducts: Handles pending, fulfilled, and rejected states for fetching all products.
 * - fetchProductById: Handles pending, fulfilled, and rejected states for fetching a single product by ID.
 *
 * @see {@link fetchProducts}
 * @see {@link fetchProductById}
 * @see {@link productsAdapter}
 * @see {@link STATUS}
 */
