import { createSlice } from "@reduxjs/toolkit";


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
      return state.filter(item => item._id !== itemId); // Filter out the item
    }
    ,
    setCart: (state, action) => {
      return action.payload;
    },
    clearCart: (state) => {
    return []
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload; 
    },
  },
});

// Selector to get total item count
export const selectItemCount = (state) => {
  return state.cart.reduce((total, item) => total + item.quantity, 0);
};



export const {
  addToCart,
  updateCartQuantity,
  removeFromCart,
  setCart,
  clearCart, setTotalAmount
} = cartSlice.actions;

export default cartSlice; 