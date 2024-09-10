// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { BASE_URL } from "@env";

// export const fetchFoodItems = createAsyncThunk(
//   "foodItem/fetchFoodItems",
//   async () => {

//     const response = await fetch(`${BASE_URL}/food-item/get`);

//     const data = await response.json();

//     if (!Array.isArray(data.items)) {
//       throw new Error("Unexpected response format");
//     }

//     return data.items;
//   }
// );

// const foodItemSlice = createSlice({
//   name: "foodItem",
//   initialState: {
//     items: [],
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
//         state.items = action.payload; // Ensure this is storing food items
//       })
//       .addCase(fetchFoodItems.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export default foodItemSlice;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchFoodItems = createAsyncThunk(
  "foodItem/fetchFoodItems",
  async () => {
    const token = await AsyncStorage.getItem("userToken");
    const response = await fetch(`${BASE_URL}/food-item/get`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in headers
      },
    });

    const data = await response.json();

    if (!Array.isArray(data.items)) {
      throw new Error("Unexpected response format");
    }

    return data.items;
  }
);

const foodItemSlice = createSlice({
  name: "foodItem",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoodItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFoodItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Ensure this is storing food items
      })
      .addCase(fetchFoodItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default foodItemSlice;
