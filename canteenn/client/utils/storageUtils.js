import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to save cart items to AsyncStorage
export const saveCartToStorage = async (cartItems) => {
  try {
    await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
  } catch (error) {
    console.error('Failed to save cart items to storage:', error);
  }
};

// Function to load cart items from AsyncStorage
export const loadCartFromStorage = async () => {
  try {
    const cartItems = await AsyncStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
  } catch (error) {
    console.error('Failed to load cart items from storage:', error);
    return [];
  }
};


// Clear cart data on logout
export const clearCartOnLogout = async (dispatch) => {
    try {
      await AsyncStorage.removeItem("userCart");
      dispatch(clearCart());
    } catch (error) {
      console.error("Failed to clear cart on logout:", error);
    }
  };