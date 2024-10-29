
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants/constant";
import { axiosInstance } from "../../utils/refreshToken";

export const fetchFoodItems = createAsyncThunk(
  "foodItem/fetchFoodItems",
  async () => {
    const response = await axiosInstance.get(`${BASE_URL}/food-item/get`);

    // const data = await response.json();
    const data = response.data; 
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
