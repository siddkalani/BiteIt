// store/Slices/orderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderPlaced: false,
    orderDetails: {},
  },
  reducers: {
    placeOrder(state, action) {
      state.orderPlaced = true;
      state.orderDetails = action.payload;
    },
    resetOrder(state) {
      state.orderPlaced = false;
      state.orderDetails = {};
    },
  },
});

export const { placeOrder, resetOrder } = orderSlice.actions;

// Selector to access orderPlaced state
export const selectOrderPlaced = (state) => state.order.orderPlaced;
export const selectOrderDetails = (state) => state.order.orderDetails;

export default orderSlice; // Export the reducer
