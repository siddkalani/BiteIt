import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@env";
// import { BASE_URL } from "../../../shared/constants/constants";

// Async thunk for logging in the user
export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (phone, { rejectWithValue }) => {
    try {
      // const response = await axios.post("http://192.168.0.101:3000/user/login", phone);
      const response = await axios.post(`${BASE_URL}/user/login`, phone);
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

// Async thunk for logging out the user
export const logoutUser = createAsyncThunk(
  "users/logoutUser",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(
          error.response?.data?.message || "Logout Failed"
        );
      } else if (error.request) {
        return rejectWithValue("No response from server");
      } else {
        return rejectWithValue("An error occurred: " + error.message);
      }
    }
  }
);

// Slice for managing user details and login/logout
const userDetailSlice = createSlice({
  name: "users",
  initialState: {
    userInfo: null,
    loading: false,
    error: null,
    loginStatus: "idle",
    logoutStatus: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login cases
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
      })

      // Logout cases
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.logoutStatus = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.userInfo = null;
        state.logoutStatus = "succeeded";
        state.loginStatus = "idle"; // Reset login status
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.logoutStatus = "failed";
      });
  },
});

export const userDetailActions = userDetailSlice.actions;
export default userDetailSlice;
