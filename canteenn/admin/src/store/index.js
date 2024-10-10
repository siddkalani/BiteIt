// store.js
import { configureStore } from "@reduxjs/toolkit";
import userDetailSlice from "./Slices/userDetailSlice";
// import categorySlice from "./Slices/categorySlice";
// import foodItemSlice from "./Slices/foodItemSlice";
// import cartSlice from "./Slices/cartSlice";

const store = configureStore({
  reducer: {
    users: userDetailSlice.reducer,
    // category: categorySlice.reducer,
    // foodItem: foodItemSlice.reducer,
    // cart: cartSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(sagaMiddleware),
});

// Run the saga
// sagaMiddleware.run(SagaData);

export default store;
