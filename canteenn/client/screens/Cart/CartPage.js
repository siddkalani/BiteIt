import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar,
  Pressable,
  Modal,
  PanResponder,
  Animated,
  Dimensions,
  ScrollView,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartQuantity,
  clearCart,
  addToCart,
} from "../../store/Slices/cartSlice"; // Adjust the path as needed
import * as Icon from "react-native-feather";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { BASE_URL } from "@env";
import {
  saveCartToStorage,
  loadCartFromStorage,
} from "../../utils/storageUtils"; // Adjust the path as needed
import { useNavigation } from "@react-navigation/native";
import CartHeader from "./CartHeader";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false); // For offers modal
  const [sliderValue] = useState(new Animated.Value(0)); // Animation value for the slider
  const [sliderActive, setSliderActive] = useState(false); // To track if slider is active

  // Example values for taxes, delivery charges, offers, and tips
  const deliveryCharge = 50; // Example delivery charge
  const offerDiscount = 63; // Example discount (Cashback)
  const taxes = 25.25; // Example taxes
  const donation = 5; // Example donation

  useEffect(() => {
    // Load cart data when the component mounts
    const loadCart = async () => {
      const savedCart = await loadCartFromStorage();
      savedCart.forEach((item) => dispatch(addToCart(item)));
    };
    loadCart();
  }, [dispatch]);

  // Total number of items in the cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Calculate the total bill without taxes and discounts
  const totalBill = cartItems.reduce(
    (total, item) => total + item.itemPrice * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    try {
      navigation.navigate('PaymentService');
      for (const item of cartItems) {
        // Your order placement logic here
      }
      Alert.alert("Order Placed", `Your total is ₹${totalBill.toFixed(2)}`);
      dispatch(clearCart()); // Use clearCart action here
      saveCartToStorage([]); // Clear cart from AsyncStorage
    } catch (error) {
      console.error("Error placing order:", error);
      Alert.alert(
        "Order Failed",
        error.message || "Something went wrong. Please try again."
      );
    }
  };

  // PanResponder to handle slider movement
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dx > 0 && gestureState.dx < (width - 100)) { // Restrict movement within bounds
        sliderValue.setValue(gestureState.dx);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      const threshold = width - 120; // Adjust threshold as needed
      if (gestureState.dx > threshold) {
        // If slider moved sufficiently
        Animated.timing(sliderValue, {
          toValue: width - 100, // Move to the end
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          handlePlaceOrder();
          resetSlider();
        });
      } else {
        Animated.spring(sliderValue, {
          toValue: 0,
          useNativeDriver: false,
          friction: 5,
        }).start(); // Reset if not sufficiently slid
      }
    },
  });

  const resetSlider = () => {
    Animated.timing(sliderValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleIncrement = (id) => {
    dispatch(updateCartQuantity({ id, increment: true }));
  };

  const handleDecrement = (id) => {
    dispatch(updateCartQuantity({ id, increment: false }));
  };
  const { top, bottom } = useSafeAreaInsets();
  const renderCartItem = ({ item }) => (
    <View className="flex-row items-center space-x-2 my-1 py-3 px-4 bg-white rounded-lg">
      <Image
        source={{ uri: `${BASE_URL}/items_uploads/${item.image}` }}
        style={{ width: 60, height: 60, borderRadius: 8 }}
      />
      <View className="flex-1">
        <Text className="font-semibold text-lg">{item.itemName}</Text>
        <Text className="text-gray-500">₹{item.itemPrice}</Text>
      </View>

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
    <View className="flex-1 bg-white"
    style={{
      flex: 1,
      paddingTop: Platform.OS === "ios" ? top : StatusBar.currentHeight,
      paddingBottom: Platform.OS === "ios" ? 0 : bottom,
    }}>
      {/* Status bar with white background */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor="white"
        translucent={false}
      />

      {/* Back Button with white background */}
      <View className="bg-white px-4 py-3">
        <CartHeader />
      </View>

      {cartItems.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-center text-lg font-semibold">Your cart is empty</Text>
        </View>
      ) : (
        <View className="flex-1 bg-gray-100">
          <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 100 }}>
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item._id}
              renderItem={renderCartItem}
              className="my-2"
              showsVerticalScrollIndicator={false}
              scrollEnabled={false} // Disable FlatList scrolling
            />

            {/* Offers section */}
            <View className="bg-white p-3 rounded-lg shadow-md mb-2">
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-semibold">Offers</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Text className="text-green-600">View offers</Text>
                </TouchableOpacity>
              </View>
              {/* Highlighted Applied Cashback */}
              <Text className="text-gray-500 mt-2 bg-green-100 p-2 rounded-lg">
                ₹{offerDiscount} Cashback applied!
              </Text>
            </View>

            {/* Tip section */}
            <View className="bg-white p-3 rounded-lg shadow-md mb-2">
              <Text className="text-lg font-semibold">Please tip your delivery partner</Text>
              <View className="flex-row justify-start space-x-4 mt-3">
                <TouchableOpacity className="px-4 py-2 bg-gray-200 rounded-md">
                  <Text>₹50</Text>
                </TouchableOpacity>
                <TouchableOpacity className="px-4 py-2 bg-gray-200 rounded-md">
                  <Text>₹70</Text>
                </TouchableOpacity>
                <TouchableOpacity className="px-4 py-2 bg-gray-200 rounded-md">
                  <Text>₹100</Text>
                </TouchableOpacity>
                <TouchableOpacity className="px-4 py-2 bg-gray-200 rounded-md">
                  <Text>Other</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Billing Details */}
            <View className="bg-white p-3 rounded-lg shadow-md">
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-semibold">Item Total ({totalItems} items)</Text>
                <Text>₹{totalBill.toFixed(2)}</Text>
              </View>
              <View className="flex-row justify-between mt-1">
                <Text className="text-gray-500">Delivery Charge</Text>
                <Text>₹{deliveryCharge}</Text>
              </View>
              <View className="flex-row justify-between mt-1">
                <Text className="text-gray-500">Taxes & charges</Text>
                <Text>₹{taxes.toFixed(2)}</Text>
              </View>
              <View className="flex-row justify-between mt-1">
                <Text className="text-gray-500">Donate ₹5 to charity</Text>
                <Text>₹{donation}</Text>
              </View>
              <View className="flex-row justify-between mt-1">
                <Text className="font-semibold">Grand Total</Text>
                <Text className="font-semibold">₹{(totalBill + deliveryCharge + taxes + donation - offerDiscount).toFixed(2)}</Text>
              </View>
            </View>
          </ScrollView>

         {/* Slide to Pay Section */}
         <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 16 }}>
            <View style={{ alignItems: "center" }}>
              <LinearGradient
                colors={["green", "green"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  width: width - 32,
                  height: 60,
                  borderRadius: 99,
                  justifyContent: "center",
                }}
              >
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text style={{ textAlign: "center", color: "white", fontSize: 16 }}>
                    Slide to Pay
                  </Text>
                </View>
                <Animated.View
                  {...panResponder.panHandlers}
                  style={{
                    position: "absolute",
                    left: sliderValue,
                    marginLeft: 7,
                    width: 50,
                    height: 50,
                    borderRadius: 99,
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 2,
                    elevation: 5,
                  }}
                >
                  <Icon.ArrowRight width={24} height={24} stroke="green" />
                </Animated.View>
              </LinearGradient>
            </View>
          </View>

          {/* Modal for Offers */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
              <View className="bg-white p-4 rounded-lg w-3/4">
                <Text className="text-lg font-bold mb-2">Available Offers</Text>

                <TouchableOpacity className="mb-2 p-2 bg-gray-200 rounded-lg">
                  <Text>Bank Offer: Get 10% Cashback on XYZ Bank Cards</Text>
                </TouchableOpacity>
                <TouchableOpacity className="mb-2 p-2 bg-gray-200 rounded-lg">
                  <Text>UPI Offer: ₹50 Cashback on UPI payments</Text>
                </TouchableOpacity>
                <TouchableOpacity className="mb-2 p-2 bg-gray-200 rounded-lg">
                  <Text>Coupon: Use "SAVE50" to get ₹50 off</Text>
                </TouchableOpacity>

                <Pressable
                  className="mt-4 p-2 bg-green-600 rounded-lg"
                  onPress={() => setModalVisible(false)}
                >
                  <Text className="text-white text-center">Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
};

export default CartPage;
