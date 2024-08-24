// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: [],
//   reducers: {
//     addToCart: (state, action) => {
//       const item = action.payload;
//       const existingItem = state.find(cartItem => cartItem._id === item._id);
//       if (existingItem) {
//         existingItem.quantity += 1; // Increment quantity if the item is already in the cart
//       } else {
//         state.push({ ...item, quantity: 1 }); // Add new item to the cart with a quantity of 1
//       }
//     },
//     updateCartQuantity: (state, action) => {
//       const { itemId, quantity } = action.payload;
//       const item = state.find(item => item._id === itemId);
//       if (item) {
//         item.quantity = quantity;
//       }
//     },
//     removeFromCart: (state, action) => {
//       const { itemId } = action.payload;
//       return state.filter(item => item._id !== itemId); // Return a new state without the removed item
//     },
//   },
// });

// export const { addToCart, updateCartQuantity, removeFromCart } = cartSlice.actions;
// export default cartSlice;

import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Initial cart state
const initialState = [];

// Create cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.find((cartItem) => cartItem._id === item._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...item, quantity: 1 });
      }
    },
    updateCartQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.find((item) => item._id === itemId);
      if (item) {
        item.quantity = quantity;
      }
    },
    removeFromCart: (state, action) => {
      const { itemId } = action.payload;
      return state.filter((item) => item._id !== itemId);
    },
    setCart: (state, action) => {
      return action.payload;
    },
    clearCart: (state) => {
      return [];
    },
  },
});

export const {
  addToCart,
  updateCartQuantity,
  removeFromCart,
  setCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice;
