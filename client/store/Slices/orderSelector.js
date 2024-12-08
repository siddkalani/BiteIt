// orderSelectors.js
import { createSelector } from 'reselect';

// Selector to get the orders state
const getOrdersState = (state) => state.orders;  // Assuming the orders slice is named 'orders'

export const getPendingOrders = createSelector(
  [getOrdersState],
  (ordersState) => ordersState?.pending || []
);

export const getPreparingOrders = createSelector(
  [getOrdersState],
  (ordersState) => ordersState?.preparing || []
);

export const getReadyOrders = createSelector(
  [getOrdersState],
  (ordersState) => ordersState?.ready || []
);

export const getDeliveredOrders = createSelector(
  [getOrdersState],
  (ordersState) => ordersState?.delivered || []
);

// You can also create a selector to get loading and error states
export const getOrdersLoading = createSelector(
  [getOrdersState],
  (ordersState) => ordersState?.loading || false
);

export const getOrdersError = createSelector(
  [getOrdersState],
  (ordersState) => ordersState?.error || null
);
