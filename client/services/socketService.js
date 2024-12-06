import io from "socket.io-client";
import { BASE_URL } from "../constants/constant";
import store from "../store";
import { updateFoodItemStatus } from "../store/Slices/foodItemSlice";
import { updateCategoryItemStatus } from "../store/Slices/categoryItemSlice";
import { paymentUpdated,orderDelivered } from "../store/Slices/orderHistorySlice";
import { updateCanteenStatus } from "../store/Slices/canteenSlice";
import { addNewOrder } from "../store/Slices/adminAllOrders";

let socket;

// Common logic for updating item status
const updateItemStatus = (type, updatedItem, isOnline) => {
  const actionMap = {
    foodItem: updateFoodItemStatus,
    categoryItem: updateCategoryItemStatus,
  };

  const action = actionMap[type];
  if (action) {
    store.dispatch(action({ id: updatedItem._id, isOnline }));
  } else {
    console.error(`Unsupported type: ${type}`);
  }
};

// Initialize socket connection and listeners
const initializeSocket = () => {
  if (!socket) {
    socket = io(BASE_URL, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    socket.on("connect", () => {
      console.log("Connected to server");
      // Dynamically join room if needed
      socket.emit("joinRoom", "yourRoomId");
    });

    socket.on('canteenStatus', (status) => {
      // console.log('Canteen status updated:', status);
      store.dispatch(updateCanteenStatus(status.isOnline));
    });

    socket.on("foodItemOnline", (updatedItem) => {
      updateItemStatus("foodItem", updatedItem, true);
    });

    socket.on("foodItemOffline", (updatedItem) => {
      updateItemStatus("foodItem", updatedItem, false);
    });

    socket.on("foodItemOnline", (updatedItem) => {
      updateItemStatus("categoryItem", updatedItem, true);
    });

    socket.on("foodItemOffline", (updatedItem) => {
      updateItemStatus("categoryItem", updatedItem, false);
    });

    socket.on("orderDelivered", (newOrder) => {
      store.dispatch(orderDelivered(newOrder));  // Handle order delivered event
    });

    // Listen for payment completed event
    socket.on("paymentDone", (updatedOrder) => {
      store.dispatch(paymentUpdated(updatedOrder));  // Handle payment done event
    });

    socket.on("newOrder", (order) => {
      store.dispatch(addNewOrder(order)); 
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error.message);
    });

    socket.on("reconnect_attempt", (attemptNumber) => {
      console.log(`Reconnection attempt #${attemptNumber}`);
    });

    socket.on("reconnect_failed", () => {
      console.error("Reconnection failed");
    });

    socket.on("disconnect", (reason) => {
      console.log(`Disconnected from server. Reason: ${reason}`);
    });
  }
};

// Cleanup socket connection
const cleanupSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export { initializeSocket, cleanupSocket, socket };
