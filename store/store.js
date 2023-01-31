import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productSlice";


export const store = configureStore({
  reducer: {
    productsSlice: productsSlice.reducer
  },
});
