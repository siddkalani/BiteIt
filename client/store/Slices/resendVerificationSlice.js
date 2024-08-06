import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const resendVerification = createAsyncThunk(
  "user/resendVerification",
  async ({ url, userData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(url, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const resendVerificationSlice = createSlice({
  name: "resendVerification",
  initialState: {
    loading: false,
    success: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(resendVerification.pending, (state) => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(resendVerification.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
        state.error = null;
      })
      .addCase(resendVerification.rejected, (state, action) => {
        state.loading = false;
        state.success = null;
        state.error = action.payload;
      });
  },
});

export default resendVerificationSlice;
