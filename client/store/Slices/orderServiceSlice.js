import { createSlice } from "@reduxjs/toolkit";

// Initial state for service-related data
const initialState = {
  canteenId: "66ab684e8f90abfbe51a1ae2", 
  canteenName: "Engineering Canteen", // Default canteen name
  deliveryType: "Pickup", // Default delivery type
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
export const selectCanteenId = (state) => state.service.canteenId;
export const { setCanteenName, setDeliveryType } = serviceSlice.actions;
export default serviceSlice;
