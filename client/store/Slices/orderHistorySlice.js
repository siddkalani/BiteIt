// orderHistorySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchOrderHistory = createAsyncThunk(
  "orderHistory/fetchOrderHistory",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");

      const response = await fetch(`${BASE_URL}/user/order/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch order history");
      }

      return data.orders.sort((a, b) => new Date(b.orderPlacedAt) - new Date(a.orderPlacedAt));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderHistorySlice = createSlice({
  name: "orderHistory",
  initialState: { orders: [], loading: false, error: null },
  reducers: {
    orderDelivered: (state, action) => {
      state.orders.unshift(action.payload);
    },
    paymentUpdated: (state, action) => {
      const updatedOrder = action.payload;
      const index = state.orders.findIndex(order => order._id === updatedOrder._id);
      if (index !== -1) {
        state.orders[index] = { ...state.orders[index], payment: updatedOrder.payment };
      } else {
        console.log("Order not found in state:", updatedOrder._id); // Log if the order was not found
      }
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrderHistory.rejected, (state, action) =>{
        state.error = action.payload || "Failed to fetch order history.";
        state.loading = false;
      });
  },
});

export const { orderDelivered, paymentUpdated } = orderHistorySlice.actions;
export default orderHistorySlice;
