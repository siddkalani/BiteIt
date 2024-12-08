import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants/constant";

// Async Thunk to fetch food items
export const fetchFoodItems = createAsyncThunk(
  "foodItem/fetchFoodItems",
  async () => {
    const response = await fetch(`${BASE_URL}/food-item/get`);
    const data = await response.json();

    if (!Array.isArray(data.items)) {
      throw new Error("Unexpected response format");
    }

    return data.items.map((item) => ({
      ...item,
      isOnline: item.isOnline,  
    }));
  }
);

// Async Thunk to update food item status
export const updateFoodItemStatusAsync = createAsyncThunk(
  "foodItem/updateFoodItemStatusAsync",
  async ({ itemId, isOnline, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/food-item/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          itemId,
          isOnline,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        return { itemId, isOnline };  // Return the updated values if successful
      } else {
        return rejectWithValue(data.message);  // Reject with error message if failed
      }
    } catch (error) {
      return rejectWithValue("Server error: " + error.message);  // Handle errors during the request
    }
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
      })
      .addCase(updateFoodItemStatusAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateFoodItemStatusAsync.fulfilled, (state, action) => {
        const { itemId, isOnline } = action.payload;
        const item = state.items.find((item) => item._id === itemId);
        if (item) {
          item.isOnline = isOnline;
        }
        state.status = "succeeded";
      })
      .addCase(updateFoodItemStatusAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { updateFoodItemStatus } = foodItemSlice.actions;

export default foodItemSlice;
