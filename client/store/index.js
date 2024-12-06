// store.js
import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./Slices/categorySlice";
import foodItemSlice from "./Slices/foodItemSlice";
import cartSlice from "./Slices/cartSlice";
import serviceSlice from "./Slices/orderServiceSlice";
import orderSlice from './Slices/orderSlice'
import categoryItemSlice from "./Slices/categoryItemSlice";
import orderHistorySlice from "./Slices/orderHistorySlice";
import canteenSlice from "./Slices/canteenSlice";
import allOrderSlice from "./Slices/adminAllOrders";
// import socketMiddleware from "../utils/socketMiddleware";

const store = configureStore({
  reducer: {
    category: categorySlice.reducer,
    foodItem: foodItemSlice.reducer,
    cart: cartSlice.reducer,
    service: serviceSlice.reducer,
    order: orderSlice.reducer,
    categoryItem: categoryItemSlice.reducer,
    orderHistory: orderHistorySlice.reducer,
    canteen: canteenSlice.reducer,
    allOrders: allOrderSlice.reducer
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(socketMiddleware),
});

export default store;
