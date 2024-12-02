import io from "socket.io-client";
import { BASE_URL } from "../constants/constant";
import store from "../store";
import { updateFoodItemStatus } from "../store/Slices/foodItemSlice";

let socket;

const initializeSocket = () => {
  if (!socket) {
    socket = io(BASE_URL);

    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("joinRoom", "roomId"); // Replace "roomId" with a dynamic room ID if needed
    });

    socket.on("foodItemOnline", (updatedItem) => {
      store.dispatch(updateFoodItemStatus({ id: updatedItem._id, isOnline: true }));
    });

    socket.on("foodItemOffline", (updatedItem) => {
      store.dispatch(updateFoodItemStatus({ id: updatedItem._id, isOnline: false }));
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
  }
};

const cleanupSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export { initializeSocket, cleanupSocket, socket };
