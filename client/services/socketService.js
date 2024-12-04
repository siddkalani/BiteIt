import io from "socket.io-client";
import { BASE_URL } from "../constants/constant";
import store from "../store";
import { updateFoodItemStatus } from "../store/Slices/foodItemSlice";
import { updateCategoryItemStatus } from "../store/Slices/categoryItemSlice";
import { paymentUpdated,orderDelivered } from "../store/Slices/orderHistorySlice";
import { updateCanteenStatus } from "../store/Slices/canteenSlice";

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
    socket = io(BASE_URL);

    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("joinRoom", "roomId"); // Replace "roomId" with a dynamic room ID if needed
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

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
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
