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
