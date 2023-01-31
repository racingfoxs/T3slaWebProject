import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productSlice";
import filterSlice from './filterSlice'



export const store = configureStore({
  reducer: {
    productsSlice: productsSlice.reducer,
    filterSlice:filterSlice.reducer
  },
});
