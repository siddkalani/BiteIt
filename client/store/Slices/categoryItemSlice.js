import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants/constant";

// Fetch category items from the API
export const fetchCategoryItems = createAsyncThunk(
  "categoryItem/fetchCategoryItems",
  async ({ categoryId, token }) => {
    try {
      const response = await fetch(`${BASE_URL}/category/get/${categoryId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Check if the response was successful
      if (!response.ok) {
        throw new Error("Failed to fetch category items");
      }

      const data = await response.json();

      // Ensure foodItems is an array
      if (!Array.isArray(data.foodItems)) {
        throw new Error("Unexpected response format: foodItems is not an array");
      }

      // Return food items with isOnline status set (default is false if not present)
      return data.foodItems.map((item) => ({
        ...item,
        isOnline: item.isOnline || false, // Default to false if no isOnline exists
      }));
    } catch (error) {
      // Handle and rethrow error for rejected case
      throw new Error(error.message || "An unknown error occurred");
    }
  }
);

const categoryItemSlice = createSlice({
  name: "categoryItem",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // Update the online status of a category item
    updateCategoryItemStatus: (state, action) => {
      const { id, isOnline } = action.payload;
      const item = state.items.find((item) => item._id === id);
      if (item) {
        item.isOnline = isOnline;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoryItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Set fetched items
      })
      .addCase(fetchCategoryItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateCategoryItemStatus } = categoryItemSlice.actions;
export default categoryItemSlice;
