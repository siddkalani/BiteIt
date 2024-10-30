// store.js
import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./Slices/categorySlice";
import foodItemSlice from "./Slices/foodItemSlice";
import cartSlice from "./Slices/cartSlice";
import serviceSlice from "./Slices/orderServiceSlice";
import socketMiddleware from "../utils/socketMiddleware";

const store = configureStore({
  reducer: {
    category: categorySlice.reducer,
    foodItem: foodItemSlice.reducer,
    cart: cartSlice.reducer,
    service: serviceSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
});

export default store;
