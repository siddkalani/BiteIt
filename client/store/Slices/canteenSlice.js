import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../constants/constant';

export const fetchCanteenStatus = createAsyncThunk(
  'canteen/fetchStatus',
  async (canteenId) => {
    const response = await fetch(`${BASE_URL}/canteen/${canteenId}/status`);
    const data = await response.json();
    return data.isOnline;
  }
);

const canteenSlice = createSlice({
  name: 'canteen',
  initialState: {
    isOnline: true,
    statusLoading: false,
    error: null,
  },
  reducers: {
    updateCanteenStatus: (state, action) => {
      state.isOnline = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCanteenStatus.pending, (state) => {
        state.statusLoading = true;
        state.error = null;
      })
      .addCase(fetchCanteenStatus.fulfilled, (state, action) => {
        state.statusLoading = false;
        state.isOnline = action.payload;
      })
      .addCase(fetchCanteenStatus.rejected, (state, action) => {
        state.statusLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateCanteenStatus } = canteenSlice.actions;
export default canteenSlice;
