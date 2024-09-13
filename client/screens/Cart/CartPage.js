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
  Pressable,
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
import CartHeader from "./CartHeader";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, FontSize } from "../../GlobalStyles";

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
      // Decrease the quantity
      dispatch(updateCartQuantity({ itemId, quantity: item.quantity - 1 }));
      saveCartToStorage(cartItems); // Save cart to AsyncStorage
    } else if (item && item.quantity === 1) {
      // Show confirmation alert
      Alert.alert(
        "Remove Item",
        "Are you sure you want to remove this item from the cart?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              dispatch(removeFromCart({ itemId }));
              saveCartToStorage(cartItems); // Save cart to AsyncStorage
            },
          },
        ]
      );
    }
  };


  const totalBill = cartItems.reduce(
    (total, item) => total + item.itemPrice * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    

    try {
      navigation.navigate('PaymentService');
      // Retrieve user token and userId from AsyncStorage
      // const token = await AsyncStorage.getItem("userToken");
      // const userId = await AsyncStorage.getItem("userId");

      // if (!token || !userId) {
      //   Alert.alert("Error", "User is not authenticated");
      //   return;
      // }

      // Post each order item separately
      for (const item of cartItems) {
      //   const response = await fetch(`${BASE_URL}/user/order/add`, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${token}`,
      //     },
      //     body: JSON.stringify({
      //       userId,
      //       canteenName: "Engineering Canteen",
      //       itemId: item._id,
      //       itemQuantity: item.quantity,
      //       totalAmount: totalBill,
      //       payment: 1,
      //       status: "Pending", // Default status
      //     }),
      //   });

      //   const result = await response.json();

      //   if (!response.ok) {
      //     throw new Error(result.message || "Something went wrong");
      //   }

       

      }

      Alert.alert("Order Placed", `Your total is $${totalBill.toFixed(2)}`);
      dispatch(clearCart()); // Use clearCart action here
      saveCartToStorage([]); // Clear cart from AsyncStorage
      // navigation.goBack(); // Navigate back to the previous screen
    } catch (error) {
      console.error("Error placing order:", error);
      Alert.alert(
        "Order Failed",
        error.message || "Something went wrong. Please try again."
      );
    }
  };

  const renderCartItem = ({ item }) => (
    <View className="flex-row items-center space-x-2 my-1 py-3 px-4 bg-white rounded-lg">
      <Image
        source={{ uri: `${BASE_URL}/items_uploads/${item.image}` }}
        style={{ width: 60, height: 60, borderRadius: 8 }}
      />
      <View className="flex-1">
        <Text className="font-semibold text-lg">{item.itemName}</Text>
        <Text className="text-gray-500">${item.itemPrice}</Text>

      </View>
      {/* <TouchableOpacity
        onPress={() => handleRemoveFromCart(item._id)}
        className="p-2 bg-red-500 rounded-full"
      >
        <Icon.Trash2 width={16} height={16} stroke="white" />
      </TouchableOpacity> */}

      <View className="flex-row items-center space-x-2 mt-2 bg-gray-200 rounded-md">
        <TouchableOpacity
          onPress={() => handleDecrement(item._id)}
          className="p-2"
        >
          <Icon.Minus width={16} height={16} stroke="green" strokeWidth='3' />
        </TouchableOpacity>
        <View className='w-3.5 items-center justify-center'>
          <Text adjustsFontSizeToFit numberOfLines={1} className='font-bold'>{item.quantity}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleIncrement(item._id)}
          className="p-2"
        >
          <Icon.Plus width={16} height={16} stroke="green" strokeWidth='3' />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
    {/* Status bar with white background */}
    <StatusBar
      barStyle="dark-content"
      backgroundColor="white" // For Android
      translucent={false} // Ensures the status bar is not transparent
    />
  
    {/* Back Button with white background */}
    <View className="bg-white px-4 py-3">
      <CartHeader />
    </View>
  
    {cartItems.length === 0 ? (
      <Text className="text-center text-lg font-semibold">Your cart is empty</Text>
    ) : (
      <View className="flex-1 justify-between px-4 bg-gray-100">
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item._id}
          renderItem={renderCartItem}
          className="my-2"
          showsVerticalScrollIndicator={false}
        />
        <View className="mb-2">
          <View className="bg-white flex-row p-3 items-center rounded-lg shadow-md justify-between">
            <Text className="text-lg font-semibold">Total</Text>
            <Text>${totalBill.toFixed(2)}</Text>
          </View>
          <LinearGradient
            colors={["#007022", "#54d17a", "#bcffd0"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1.9, y: 0 }}
            className="rounded-xl mt-2"
          >
            <Pressable className="p-3 justify-center items-center" onPress={handlePlaceOrder}>
              <Text
                className="text-white"
                style={{
                  fontFamily: FontFamily.poppinsSemiBold,
                  fontSize: FontSize.size_lg,
                }}
              >
                Place order
              </Text>
            </Pressable>
          </LinearGradient>
        </View>
      </View>
    )}
  </SafeAreaView>
  
  );
};

export default CartPage;




