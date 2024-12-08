// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { BASE_URL } from '../../constants/constant';

// // AsyncThunk to fetch orders
// export const fetchOrders = createAsyncThunk(
//   'orders/fetchOrders',
//   async (adminToken, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`${BASE_URL}/admin/order/all`, {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${adminToken}`,
//         },
//       });
//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || 'Failed to fetch orders');
//       return data.orders;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Slice
// const allOrderSlice = createSlice({
//   name: 'allOrders',
//   initialState: {
//     pending: [],
//     preparing: [],
//     ready: [],
//     pickedUp: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     addNewOrder: (state, action) => {
//       state.pending.unshift(action.payload);
//     },
//     updateOrderStatus: (state, action) => {
//       const { id, status } = action.payload;
//       // Remove order from the old status and add to the new one
//       const allOrders = [...state.pending, ...state.preparing, ...state.ready, ...state.pickedUp];
//       const order = allOrders.find((o) => o._id === id);
//       if (order) {
//         order.status = status;
//         state.pending = state.pending.filter((o) => o._id !== id);
//         state.preparing = state.preparing.filter((o) => o._id !== id);
//         state.ready = state.ready.filter((o) => o._id !== id);
//         state.pickedUp = state.pickedUp.filter((o) => o._id !== id);
//         if (status === 'Pending') state.pending.push(order);
//         else if (status === 'Preparing') state.preparing.push(order);
//         else if (status === 'Ready') state.ready.push(order);
//         else if (status === 'Delivered') state.pickedUp.push(order);
//       }
//     },
//     handlePayment: (state, action) => {
//       const { id } = action.payload;
//       const order = state.pickedUp.find((order) => order._id === id);
//       if (order) {
//         order.payment = 1;
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchOrders.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchOrders.fulfilled, (state, action) => {
//         const sortedOrders = action.payload.sort((a, b) => new Date(b.orderPlacedAt) - new Date(a.orderPlacedAt));
//         state.pending = sortedOrders.filter((o) => o.status === 'Pending');
//         state.preparing = sortedOrders.filter((o) => o.status === 'Preparing');
//         state.ready = sortedOrders.filter((o) => o.status === 'Ready');
//         state.pickedUp = sortedOrders.filter((o) => o.status === 'Delivered');
//         state.loading = false;
//       })
//       .addCase(fetchOrders.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { addNewOrder, updateOrderStatus, handlePayment } = allOrderSlice.actions;
// export default allOrderSlice;
