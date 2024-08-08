// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { BASE_URL } from "@env";

// // Thunk to fetch food items from the API
// export const fetchFoodItems = createAsyncThunk(
//   "foodItem/fetchFoodItems",
//   async () => {
//     const response = await fetch(`${BASE_URL}/food-item/get`);
//     if (!response.ok) {
//       throw new Error("Failed to fetch food items");
//     }
//     const data = await response.json();
//     return data.items;
//   }
// );

// // Thunk to fetch a single food item by ID
// export const fetchFoodItemById = createAsyncThunk(
//   "foodItem/fetchFoodItemById",
//   async (id) => {
//     const response = await fetch(`${BASE_URL}/food-item/get/${id}`);
//     if (!response.ok) {
//       throw new Error("Failed to fetch food item");
//     }
//     const data = await response.json();
//     return data.item; // Adjust based on your API response
//   }
// );

// const foodItemSlice = createSlice({
//   name: "foodItem",
//   initialState: {
//     items: [],
//     selectedItem: null,
//     status: "idle",
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchFoodItems.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchFoodItems.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.items = action.payload; // Array of food items
//       })
//       .addCase(fetchFoodItems.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       })
//       .addCase(fetchFoodItemById.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchFoodItemById.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.selectedItem = action.payload; // Single food item
//       })
//       .addCase(fetchFoodItemById.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export default foodItemSlice;


// Example foodItemSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFoodItems = createAsyncThunk(
  'foodItem/fetchFoodItems',
  async () => {
    const response = await axios.get(`${BASE_URL}/food-item/get`); // Adjust the endpoint accordingly
    return response.data;
  }
);

const foodItemSlice = createSlice({
  name: 'foodItem',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoodItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFoodItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchFoodItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default foodItemSlice;
