import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../constants/constant';

// AsyncThunk to fetch canteen status
export const fetchCanteenStatus = createAsyncThunk(
  'canteen/fetchStatus',
  async (canteenId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/canteen/${canteenId}/status`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch canteen status');
      return data.isOnline;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// AsyncThunk to update canteen status
export const updateCanteenStatusAsync = createAsyncThunk(
  'canteen/updateStatus',
  async ({ canteenId, isOnline }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/canteen/${canteenId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isOnline }),
      });

      if (!response.ok) throw new Error('Failed to update canteen status');
      return isOnline; // Return updated status to update Redux state
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice for canteen
const canteenSlice = createSlice({
  name: 'canteen',
  initialState: {
    isOnline: true,
    statusLoading: false,
    error: null,
  },
  reducers: {
    updateCanteenStatus: (state, action) => {
      state.isOnline = action.payload; // For optimistic updates
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
        state.error = action.payload;
      })
      .addCase(updateCanteenStatusAsync.pending, (state) => {
        state.statusLoading = true;
        state.error = null;
      })
      .addCase(updateCanteenStatusAsync.fulfilled, (state, action) => {
        state.statusLoading = false;
        state.isOnline = action.payload;
      })
      .addCase(updateCanteenStatusAsync.rejected, (state, action) => {
        state.statusLoading = false;
        state.error = action.payload;
      });
  },
});

export const { updateCanteenStatus } = canteenSlice.actions;
export default canteenSlice;
