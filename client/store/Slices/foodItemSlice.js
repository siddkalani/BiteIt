
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants/constant";

export const fetchFoodItems = createAsyncThunk(
  "foodItem/fetchFoodItems",
  async () => {
    const response = await fetch(`${BASE_URL}/food-item/get`);
    const data = await response.json();

    if (!Array.isArray(data.items)) {
      throw new Error("Unexpected response format");
    }

    // return data.items;
    return data.items.map((item) => ({
      ...item,
      isOnline: item.isOnline ,  
    }));
  }
);

const foodItemSlice = createSlice({
  name: "foodItem",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    updateFoodItemStatus: (state, action) => {
      const { id, isOnline } = action.payload;
      const item = state.items.find((item) => item._id === id);
      if (item) {
        item.isOnline = isOnline;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoodItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFoodItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchFoodItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateFoodItemStatus } = foodItemSlice.actions;
export default foodItemSlice;
