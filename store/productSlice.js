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
      //const response = await fetch(`url`); //where you want to fetch data
      //Your Axios code part.
      const response = await axios.get(
        "http://api.spacexdata.com/v3/capsules"
      ); //where you want to fetch data
    //   console.log("response ", response.data)
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
  reducers: {},
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
export default productsSlice;
