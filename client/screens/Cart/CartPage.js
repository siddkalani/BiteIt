// components/Cart/CartPage.js
import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  StatusBar,
  Animated,
  Dimensions,
  ScrollView,
  Platform,
  PanResponder,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartQuantity,
  clearCart,
  addToCart,
} from "../../store/Slices/cartSlice";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BASE_URL } from "../../constants/constant";
import {
  saveCartToStorage,
  loadCartFromStorage,
} from "../../utils/storageUtils";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import io from "socket.io-client";
import { setCanteenName, setDeliveryType } from "../../store/Slices/orderServiceSlice";
import { FontFamily, FontSize } from "../../GlobalStyles";

// Import components
import HeaderComponent from "../../components/Cart/HeaderComponent";
import CartItemComponent from "../../components/Cart/CartItem";
import OffersModalComponent from "../../components/Cart/OfferSection";
import DeliveryModalComponent from "../../components/Cart/DeliveryModal";
import BottomBarComponent from "../../components/Cart/BottomBar";
import TipSectionComponent from "../../components/Cart/TipSection";
import BillingDetailsComponent from "../../components/Cart/BillingDetails";
import PaymentMethodComponent from "../../components/Cart/PaymentMethod";
import { TouchableOpacity } from "react-native";

// Initialize socket outside the component to prevent multiple connections
const socket = io(BASE_URL);

const { width } = Dimensions.get("window");

const serviceOptions = [
  {
    id: 1,
    title: "Table Service",
    image: require("../../assets/images/intro/introFood.png"),
  },
  {
    id: 2,
    title: "Counter Pick-up",
    image: require("../../assets/images/intro/introFood.png"),
  },
  {
    id: 3,
    title: "Advance Order",
    image: require("../../assets/images/intro/introFood.png"),
  },
];

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false); // For offers modal
  const sliderValue = useRef(new Animated.Value(0)).current; // Animation value for the slider
  const modalizeRef = useRef(null); // Reference to the Modalize component
  const deliveryType = useSelector((state) => state.service.deliveryType);
  const selectedCanteen = useSelector((state) => state.service.canteenName);
  const [selectedRoom, setSelectedRoom] = useState(""); // For room number
  const { top } = useSafeAreaInsets();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Track Modalize visibility
  const [itemOnlineStatus, setItemOnlineStatus] = useState({}); // Track online status of items

  // Handle opening the delivery selection modal
  const handleChangeDelivery = () => {
    modalizeRef.current?.open(); // Open the Modalize
  };

  // Handle closing the delivery selection modal
  const closeModal = () => {
    modalizeRef.current?.close(); // Close the Modalize
    setErrorMessage("");
    setSelectedRoom("");
  };

  // Handle selecting a service option
  const handleOptionPress = (optionId) => {
    // Set delivery type based on selected option
    const selectedDelivery =
      optionId === 1
        ? "Table Service"
        : optionId === 2
        ? "Counter Pick-up"
        : "Advance Order";

    dispatch(setDeliveryType(selectedDelivery));

    // If Table Service is selected, keep the modal open to enter room number
    if (optionId === 1) {
      // No action needed here; UI will handle room number input
    } else {
      closeModal();
    }
  };

  // Handle proceeding after entering room number
  const handleProceed = () => {
    if (deliveryType === "Table Service" && !selectedRoom.trim()) {
      setErrorMessage("Please enter your room number");
      return;
    }
    // Optionally, you can dispatch room number to Redux here
    closeModal();
  };

  // Example values for taxes, delivery charges, offers, and tips
  const deliveryCharge = 50; // Example delivery charge
  const offerDiscount = 63; // Example discount (Cashback)
  const taxes = 25.25; // Example taxes
  const donation = 5; // Example donation

  // Calculate total items
  const totalItems = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  // Calculate total bill
  const totalBill = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.itemPrice * item.quantity,
        0
      ),
    [cartItems]
  );

  // Calculate final total
  const finalTotal = useMemo(
    () => totalBill + deliveryCharge + taxes + donation - offerDiscount,
    [totalBill]
  );

  // Navigate to payment options
  const handlePayment = () => {
    navigation.navigate("PaymentOption");
  };

  // Load cart from storage when component mounts
  useEffect(() => {
    const loadCart = async () => {
      const savedCart = await loadCartFromStorage();

      // Ensure items are only added to the cart if they are not already present
      savedCart.forEach((item) => {
        const itemInCart = cartItems.find(
          (cartItem) => cartItem._id === item._id
        );
        if (!itemInCart) {
          dispatch(addToCart(item));
        }
      });
    };

    loadCart();
  }, [dispatch, cartItems]);

  // Handle placing the order
  const handlePlaceOrder = async () => {
    try {
      // Retrieve necessary data from AsyncStorage
      const userId = await AsyncStorage.getItem("userId");
      console.log(deliveryType);
      const canteenName = selectedCanteen || "Engineering Canteen";
      const totalAmount = finalTotal.toFixed(2);

      // Prepare data for each cart item
      const orderData = cartItems.map((item) => ({
        itemId: item._id,
        itemName: item.itemName,
        itemQuantity: item.quantity,
      }));

      const payload = {
        userId,
        canteenName: selectedCanteen,
        totalAmount,
        items: orderData,
        payment: 0,
        status: "Pending",
        deliverTo:
          deliveryType === "Table Service"
            ? `Room ${selectedRoom}`
            : deliveryType,
      };
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(`${BASE_URL}/user/order/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Navigate to payment service
        navigation.navigate("OrderTracking");

        // Clear the cart
        dispatch(clearCart()); // Clear Redux cart state
        saveCartToStorage([]); // Clear cart from AsyncStorage

        Alert.alert("Order Placed", `Your total is ₹${totalAmount}`);
      } else {
        throw new Error("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      Alert.alert(
        "Order Failed",
        error.message || "Something went wrong. Please try again."
      );
    }
  };

  // Handle removing an item from the cart
  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart({ itemId }));
  };

  // Handle incrementing item quantity
  const handleIncrement = (itemId) => {
    const item = cartItems.find((item) => item._id === itemId);
    if (item) {
      dispatch(updateCartQuantity({ itemId, quantity: item.quantity + 1 }));
    }
  };

  // Handle decrementing item quantity
  const handleDecrement = (itemId) => {
    const item = cartItems.find((item) => item._id === itemId);
    if (item && item.quantity > 1) {
      dispatch(updateCartQuantity({ itemId, quantity: item.quantity - 1 }));
    }
  };

  // PanResponder to handle slider movement
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx > 0 && gestureState.dx < width - 100) {
          // Restrict movement within bounds
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
    })
  ).current;
  
  

  useEffect(() => {
    panResponder.panHandlers = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx > 0 && gestureState.dx < width - 100) {
          // Restrict movement within bounds
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
  }, [sliderValue]);

  const resetSlider = () => {
    Animated.timing(sliderValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  // Handle socket.io connections and update item online status
  useEffect(() => {
    // Initialize online status based on fetched items
    const initialStatus = {};
    cartItems.forEach((item) => {
      initialStatus[item._id] = item.isOnline; // Ensure each item has isOnline property
    });
    setItemOnlineStatus(initialStatus);

    // Listen for changes in the item's online status
    socket.on("foodItemOnline", (updatedItem) => {
      setItemOnlineStatus((prevStatus) => ({
        ...prevStatus,
        [updatedItem._id]: true, // Set item as online
      }));
    });

    socket.on("foodItemOffline", (updatedItem) => {
      setItemOnlineStatus((prevStatus) => ({
        ...prevStatus,
        [updatedItem._id]: false, // Set item as offline
      }));

      // Automatically remove the item from the cart if it goes offline
      const itemInCart = cartItems.find((item) => item._id === updatedItem._id);
      if (itemInCart) {
        dispatch(removeFromCart({ itemId: updatedItem._id }));
        Alert.alert(
          "Item Unavailable",
          `${itemInCart.itemName} is now offline and has been removed from your cart.`
        );
      }
    });

    // Clean up listeners on unmount
    return () => {
      socket.off("foodItemOnline");
      socket.off("foodItemOffline");
    };
  }, [cartItems, dispatch]);

  return (
    <GestureHandlerRootView className="flex-1">
      <View
        className="flex-1 bg-white"
        style={{
          flex: 1,
          paddingTop: Platform.OS === "ios" ? top : 0,
        }}
      >
        {/* Status bar with white background */}
        <StatusBar
          barStyle="dark-content"
          backgroundColor="white"
          translucent={false}
        />

        {/* Header */}
        <HeaderComponent />

        {cartItems.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-center text-lg font-semibold">
              Your cart is empty
            </Text>
          </View>
        ) : (
          <View className="flex-1 bg-gray-100">
            <ScrollView
              className="flex-1 px-4"
              contentContainerStyle={{ paddingBottom: 170 }}
              showsVerticalScrollIndicator={false}
              scrollEnabled={!isModalOpen} // Disable scrolling when modal is open
            >
              <FlatList
                data={cartItems}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <CartItemComponent
                    item={item}
                    handleIncrement={handleIncrement}
                    handleDecrement={handleDecrement}
                    handleRemoveFromCart={handleRemoveFromCart}
                    itemOnlineStatus={itemOnlineStatus}
                  />
                )}
                className="my-2"
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
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
              <TipSectionComponent />

              {/* Billing Details */}
              <BillingDetailsComponent
                totalItems={totalItems}
                totalBill={totalBill}
                deliveryCharge={deliveryCharge}
                taxes={taxes}
                donation={donation}
                finalTotal={finalTotal}
              />

              {/* Payment method */}
              <PaymentMethodComponent handlePayment={handlePayment} />
            </ScrollView>
          </View>
        )}

        {/* Bottom Bar */}
        {cartItems.length > 0 && (
          <BottomBarComponent
          deliveryType={deliveryType}
          selectedCanteen={selectedCanteen}
          handleChangeDelivery={handleChangeDelivery}
          sliderValue={sliderValue}
          handlePlaceOrder={handlePlaceOrder}
        />
        
        )}

        {/* Delivery Modal */}
        <DeliveryModalComponent
          modalizeRef={modalizeRef}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          serviceOptions={serviceOptions}
          handleOptionPress={handleOptionPress}
          deliveryType={deliveryType}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
          errorMessage={errorMessage}
          handleProceed={handleProceed}
          isLoading={isLoading}
        />

        {/* Offers Modal */}
        <OffersModalComponent
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default CartPage;
