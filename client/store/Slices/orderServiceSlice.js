import { createSlice } from "@reduxjs/toolkit";

// Initial state for service-related data
const initialState = {
  canteenId: "66ab684e8f90abfbe51a1ae2", 
  canteenName: "Engineering Canteen", // Default canteen name
  deliveryType: "Pickup", // Default delivery type
  selectedRoom: "", // Add selectedRoom to the state
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
    setSelectedRoom: (state, action) => {
      state.selectedRoom = action.payload; // Reducer to update selectedRoom
    },
  },
});

export const selectCanteenId = (state) => state.service.canteenId;
export const { setCanteenName, setDeliveryType, setSelectedRoom } = serviceSlice.actions;
export default serviceSlice;
