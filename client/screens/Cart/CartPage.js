import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  StatusBar,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartQuantity,
  clearCart,
} from "../../store/Slices/cartSlice"; // Adjust the path as needed
import * as Icon from "react-native-feather";
import { SafeAreaView } from "react-native-safe-area-context";
import { BASE_URL } from "@env";
import {
  saveCartToStorage,
  loadCartFromStorage,
} from "../../utils/storageUtils"; // Adjust the path as needed
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    // Load cart data when the component mounts
    const loadCart = async () => {
      const savedCart = await loadCartFromStorage();
      savedCart.forEach((item) => dispatch(addToCart(item)));
    };
    loadCart();
  }, [dispatch]);

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart({ itemId }));
    saveCartToStorage(cartItems); // Save cart to AsyncStorage
  };

  const handleIncrement = (itemId) => {
    const item = cartItems.find((item) => item._id === itemId);
    if (item) {
      dispatch(updateCartQuantity({ itemId, quantity: item.quantity + 1 }));
      saveCartToStorage(cartItems); // Save cart to AsyncStorage
    }
  };

  const handleDecrement = (itemId) => {
    const item = cartItems.find((item) => item._id === itemId);
    if (item && item.quantity > 1) {
      dispatch(updateCartQuantity({ itemId, quantity: item.quantity - 1 }));
      saveCartToStorage(cartItems); // Save cart to AsyncStorage
    } else if (item && item.quantity === 1) {
      dispatch(removeFromCart({ itemId }));
      saveCartToStorage(cartItems); // Save cart to AsyncStorage
    }
  };

  const totalBill = cartItems.reduce(
    (total, item) => total + item.itemPrice * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    try {
      // Retrieve user token and userId from AsyncStorage
      const token = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");

      if (!token || !userId) {
        Alert.alert("Error", "User is not authenticated");
        return;
      }

      // Post each order item separately
      for (const item of cartItems) {
        const response = await fetch(`${BASE_URL}/user/order/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId,
            canteenName: "Engineering Canteen",
            itemId: item._id,
            itemQuantity: item.quantity,
            totalAmount: totalBill,
            payment: 1,
            status: "Pending", // Default status
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Something went wrong");
        }
      }

      Alert.alert("Order Placed", `Your total is $${totalBill.toFixed(2)}`);
      dispatch(clearCart()); // Use clearCart action here
      saveCartToStorage([]); // Clear cart from AsyncStorage
      navigation.goBack(); // Navigate back to the previous screen
    } catch (error) {
      console.error("Error placing order:", error);
      Alert.alert(
        "Order Failed",
        error.message || "Something went wrong. Please try again."
      );
    }
  };

  const renderCartItem = ({ item }) => (
    <View className="flex-row items-center space-x-2 py-2 px-4 bg-white rounded-lg mb-2">
      <Image
        source={{ uri: `${BASE_URL}/items_uploads/${item.image}` }}
        style={{ width: 60, height: 60, borderRadius: 8 }}
      />
      <View className="flex-1">
        <Text className="font-semibold text-lg">{item.itemName}</Text>
        <Text className="text-gray-500">${item.itemPrice}</Text>
        <View className="flex-row items-center space-x-2 mt-2">
          <TouchableOpacity
            onPress={() => handleDecrement(item._id)}
            className="p-2 bg-gray-200 rounded-full"
          >
            <Icon.Minus width={16} height={16} stroke="black" />
          </TouchableOpacity>
          <Text>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => handleIncrement(item._id)}
            className="p-2 bg-gray-200 rounded-full"
          >
            <Icon.Plus width={16} height={16} stroke="black" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handleRemoveFromCart(item._id)}
        className="p-2 bg-red-500 rounded-full"
      >
        <Icon.Trash2 width={16} height={16} stroke="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-4">
      {/* Back Button */}
      <View className="flex-row items-center mb-4">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 bg-gray-200 rounded-full"
        >
          <Icon.ChevronLeft width={24} height={24} stroke="black" />
        </TouchableOpacity>
        <Text className="ml-4 text-lg font-semibold">Cart</Text>
      </View>

      {cartItems.length === 0 ? (
        <Text className="text-center text-lg font-semibold">
          Your cart is empty
        </Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item._id}
            renderItem={renderCartItem}
          />
          <View className="bg-white p-4 rounded-lg shadow-md mt-4">
            <Text className="text-lg font-semibold">
              Total: ${totalBill.toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handlePlaceOrder}
            className="bg-green-500 p-4 rounded-lg mt-4"
          >
            <Text className="text-center text-white font-semibold text-lg">
              Place Order
            </Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

export default CartPage;
