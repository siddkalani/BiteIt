import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://10.0.112.129:3000/user/login",
        user
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response?.data?.message || "Login Failed");
      } else if (error.request) {
        return rejectWithValue("No response from server");
      } else {
        return rejectWithValue("An error occurred: " + error.message);
      }
    }
  }
);

const userDetailSlice = createSlice({
  name: "users",
  initialState: {
    userInfo: null,
    loading: false,
    error: null,
    loginStatus: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.loginStatus = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.loginStatus = "succeeded";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.loginStatus = "failed";
      });
  },
});

export const userDetailActions = userDetailSlice.actions;
export default userDetailSlice;
