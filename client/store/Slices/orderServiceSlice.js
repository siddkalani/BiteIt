import { createSlice } from "@reduxjs/toolkit";

// Initial state for service-related data
const initialState = {
  canteenName: "Canteen 1", // Default canteen name
  deliveryType: null, // Default delivery type
};

// Create service slice
const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setCanteenName: (state, action) => {
      state.canteenName = action.payload;
    },
    setDeliveryType: (state, action) => {
      state.deliveryType = action.payload;
    },
  },
});

export const { setCanteenName, setDeliveryType } = serviceSlice.actions;
export default serviceSlice;
