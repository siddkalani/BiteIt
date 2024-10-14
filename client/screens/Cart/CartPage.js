import React, { useEffect, useState, useMemo } from "react";
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
  addToCart, setCart
} from "../../store/Slices/cartSlice"; // Adjust the path as needed
import * as Icon from "react-native-feather";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { BASE_URL } from "../../constants/constant";
import {
  saveCartToStorage,
  loadCartFromStorage,
} from "../../utils/storageUtils"; // Adjust the path as needed
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import GlobalHeader from "../../components/Layout/GlobalHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const totalItems = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const totalBill = useMemo(
    () => cartItems.reduce((total, item) => total + item.itemPrice * item.quantity, 0),
    [cartItems]
  );

  const finalTotal = useMemo(
    () => totalBill + deliveryCharge + taxes + donation - offerDiscount,
    [totalBill]
  );

  const handlePayment = () => {
    navigation.navigate('PaymentOption');
  };

  useEffect(() => {
    // Load cart data when the component mounts
    const loadCart = async () => {
      const savedCart = await loadCartFromStorage();

      // Ensure items are only added to the cart if they are not already present
      savedCart.forEach((item) => {
        const itemInCart = cartItems.find(cartItem => cartItem._id === item._id);
        if (!itemInCart) {
          dispatch(addToCart(item));
        }
      });
    };

    loadCart(); // Call the loadCart function
  }, [dispatch]); // Remove cartIt

  // Total number of items in the cart
  // const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // // Calculate the total bill without taxes and discounts
  // const totalBill = cartItems.reduce(
  //   (total, item) => total + item.itemPrice * item.quantity,
  //   0
  // );

  // const handlePlaceOrder = async () => {
  //   try {
  //     navigation.navigate('PaymentService');
  //     for (const item of cartItems) {
  //       // Your order placement logic here
  //     }
  //     Alert.alert("Order Placed", `Your total is ₹${totalBill.toFixed(2)}`);
  //     dispatch(clearCart()); // Use clearCart action here
  //     saveCartToStorage([]); // Clear cart from AsyncStorage
  //   } catch (error) {
  //     console.error("Error placing order:", error);
  //     Alert.alert(
  //       "Order Failed",
  //       error.message || "Something went wrong. Please try again."
  //     );
  //   }
  // };
  // const finalTotal = totalBill + deliveryCharge + taxes + donation - offerDiscount;

  //main logic- sidd comment
  //   const handlePlaceOrder = async () => {
  //     try {
  //       // Retrieve necessary data from AsyncStorage
  //       const userId = await AsyncStorage.getItem('userId');
  //       const canteenName = "Engineering Canteen"
  //       const totalBill = cartItems.reduce((sum, item) => sum + item.itemPrice * item.quantity, 0); // Calculate total bill

  // // const finalTotal = totalBill + deliveryCharge + taxes + donation - offerDiscount;
  // const totalAmount = finalTotal.toFixed(2);
  //       // Prepare data for each cart item
  //       const orderData = cartItems.map(item => ({
  //         itemId: item._id,
  //         itemName:item.itemName,
  //         itemQuantity: item.quantity,
  //       }));

  //       const payload = {
  //         userId,
  //         canteenName,
  //         totalAmount,
  //         items: orderData,
  //         payment:1,
  //         status:"Pending"
  //       };
  //       const token = await AsyncStorage.getItem("userToken");
  //       const response = await fetch(`${BASE_URL}/user/order/add`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //            Authorization: `Bearer ${token}`
  //         },
  //         body: JSON.stringify(payload),
  //       });

  //       if (response.ok) {
  //         // Navigate to payment service
  //         navigation.navigate('PaymentService');

  //         // Clear the cart
  //         dispatch(clearCart()); // Clear Redux cart state
  //         saveCartToStorage([]); // Clear cart from AsyncStorage

  //         Alert.alert("Order Placed", `Your total is ₹${totalAmount}`);
  //       } else {
  //         throw new Error('Failed to place order. Please try again.');
  //       }
  //     } catch (error) {
  //       console.error("Error placing order:", error);
  //       Alert.alert("Order Failed", error.message || "Something went wrong. Please try again.");
  //     }
  //   };

  //dummy redirect
  const handlePlaceOrder = () => {
    navigation.navigate('PaymentService');
  }
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
        }).start();
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

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart({ itemId }));
  };

  const handleIncrement = (itemId) => {
    const item = cartItems.find(item => item._id === itemId);
    if (item) {
      dispatch(updateCartQuantity({ itemId, quantity: item.quantity + 1 }));
    }
  };

  const handleDecrement = (itemId) => {
    const item = cartItems.find(item => item._id === itemId);
    if (item && item.quantity > 1) {
      dispatch(updateCartQuantity({ itemId, quantity: item.quantity - 1 }));
    }
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
    <View
      className="flex-1 bg-white"
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? top : 0, // Apply paddingTop only for iOS
        paddingBottom: Platform.OS === "ios" ? 0 : bottom, // Apply paddingBottom for Android
      }}
    >
      {/* Status bar with white background */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor="white"
        translucent={false}
      />

      {/* Header */}
      <View className="bg-white px-4 py-3">
        <GlobalHeader title="Food Cart" />
      </View>

      {cartItems.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-center text-lg font-semibold">Your cart is empty</Text>
        </View>
      ) : (
        <View className="flex-1 bg-gray-100">
          <ScrollView
            className="flex-1 px-4"
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false} // Hide ScrollView scroll indicator
          >
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item._id}
              renderItem={renderCartItem}
              className="my-2"
              showsVerticalScrollIndicator={false} // Hide FlatList scroll indicator
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
            <View className="bg-white p-3 rounded-lg shadow-md mb-2">
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
                <Text className="font-semibold"> ₹{finalTotal.toFixed(2)}</Text>
              </View>
            </View>

            {/* Payment method */}

            <TouchableOpacity
              onPress={handlePayment}
              className="bg-white p-3 rounded-lg shadow-md mb-2 flex-row justify-between"
            >
              <View>
                <Text className="text-lg font-semibold">Payment Method</Text>
                <Text className="text-gray-500 mt-1">UPI (Default)</Text>
              </View>
              <Icon.ChevronRight width={24} height={24} stroke="gray" />
            </TouchableOpacity>
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
                <Text style={{ textAlign: "center", color: "white", fontSize: 16 }}>
                  Slide to Pay
                </Text>
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