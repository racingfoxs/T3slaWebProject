import {
  createSlice,
  createSelector,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://api.spacexdata.com/v3/capsules"
      ); 
      return await response.data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
const initialState = {
    products: [],
    loading: "ideal",
    error: "",
  }
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.products = [];
      state.loading = "loading";
    });
    builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
      state.products = payload;
      state.loading = "loaded";
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.error.message;
    });
  },
});

export const  selectProducts =  createSelector(
    
   (state) => ({
    products: state.productsSlice.products,
    loading: state.productsSlice.loading,
  }),
  (state) => state
);


export const { setProducts } = productsSlice.actions
export default productsSlice;
