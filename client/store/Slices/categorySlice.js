// store/Slices/categorySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchcategory = createAsyncThunk(
  "category/fetchcategory",
  async () => {
    const response = await fetch("http://10.0.5.94:3000/category/get");
    const data = await response.json();
    // return data;
    return data.categories;
  }
);
const categorySlice = createSlice({
  name: "category",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchcategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchcategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Should be an array
      })
      .addCase(fetchcategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});


export default categorySlice;
