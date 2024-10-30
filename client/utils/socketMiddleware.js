import { removeFromCart } from "../store/Slices/cartSlice";
import io from "socket.io-client";
import { BASE_URL } from "../constants/constant";
import { saveCartToStorage } from "./storageUtils";

const socket = io(BASE_URL);

const socketMiddleware = (store) => {
    // Listen for events only once to avoid multiple listeners
    socket.on("foodItemOffline", async (updatedItem) => {
      // Dispatch removeFromCart action when an item goes offline
      store.dispatch(removeFromCart({ itemId: updatedItem._id }));
  
      // Get the current state of the cart
      const currentCart = store.getState().cart;
  
      // Save the updated cart to AsyncStorage
      await saveCartToStorage(currentCart);
    });
  
    // Optionally, handle item going online
    socket.on("foodItemOnline", (updatedItem) => {
      // Any additional actions on item going online, if needed
    });
  
    return (next) => (action) => {
      return next(action);
    };
  };
  

export default socketMiddleware;
