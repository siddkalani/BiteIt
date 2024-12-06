import React, { useRef, useEffect, useState } from 'react';
import {
  View, Text, Image, TouchableOpacity, LayoutAnimation,
  UIManager, Platform, StatusBar, Dimensions,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Modalize } from 'react-native-modalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GlobalHeader from '../../components/Layout/GlobalHeader';
import * as Icon from 'react-native-feather';
import io from "socket.io-client";
import { BASE_URL } from '../../constants/constant';

// const socket = io(BASE_URL);

import { useNavigation, useRoute } from '@react-navigation/native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { height: screenHeight } = Dimensions.get('window'); // Get screen height

const OrderTrackingScreen = () => {
  const modalizeRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [orderStatus, setOrderStatus] = useState("Pending"); // Initial status
  const navigation = useNavigation();
  const route = useRoute();
  const { order } = route.params; // Retrieve order details passed from navigation

  useEffect(() => {
    modalizeRef.current?.open(); // Open at initial snap point

    // Listen to socket events for real-time status updates
    socket.on("orderAccepted", (order) => {
      setOrderStatus("Accepted");
    });
    socket.on("orderPreparing", (order) => {
      setOrderStatus("Preparing");
    });
    socket.on("orderReady", (order) => {
      setOrderStatus("Ready");
    });
    socket.on("orderDelivered", (order) => {
      setOrderStatus("Delivered");
      navigation.navigate("ClientTabs");
    });
    socket.on("orderRejected", (order) => {
      setOrderStatus("Rejected");
      alert("Your order has been rejected.");
      navigation.navigate("ClientTabs");
    });

    // Clean up on component unmount
    return () => {
      socket.off("orderAccepted");
      socket.off("orderPreparing");
      socket.off("orderReady");
      socket.off("orderDelivered");
      socket.off("orderRejected");
    };
  }, [navigation]);

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  if (!order) {
    return (
      <View>
        <Text>Error: Order details not available</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar barStyle="dark-content" backgroundColor="white" />

        <View className="flex-1 bg-gray-100">
          {/* Back Button and Header */}
          <View className="bg-white px-4 py-3">
            <GlobalHeader title="" />
          </View>

          {/* Delivery Time Section */}
          <View className="px-4 bg-white shadow-inner rounded-b-3xl">
            <View className="p-2">
              <Text className="text-lg font-semibold">Estimated delivery between</Text>
              <Text className="text-3xl font-bold mt-2">20:00 – 20:20</Text>
            </View>

            {/* Order Status with Dropdown */}
            <View className="p-2">
              <View className="flex-row justify-between items-center h-10">
                <View className="flex-row items-center">
                  <View
                    style={{
                      backgroundColor: orderStatus === "Delivered" ? "green" : "orange",
                      width: 12, // Tailwind's w-3 is 12px
                      height: 12, // Tailwind's h-3 is 12px
                      borderRadius: 6, // Half of width/height for a circle
                      marginRight: 8, // Tailwind's mr-2 is 8px
                    }}
                  ></View>
                  <Text className="text-lg font-semibold">Order Status: {orderStatus}</Text>
                </View>
                <TouchableOpacity
                  className="p-1 bg-gray-200 rounded-full"
                  onPress={toggleDropdown}
                >
                  {isExpanded ? (
                    <Icon.ChevronUp width={24} height={24} stroke="black" />
                  ) : (
                    <Icon.ChevronDown width={24} height={24} stroke="black" />
                  )}
                </TouchableOpacity>
              </View>

              {isExpanded && (
                <View>
                  {/* Display order statuses in detail if needed */}
                  <Text className="text-lg">{orderStatus === "Pending" && "Your order is accepted and will be prepared shortly."}</Text>
                  <Text className="text-lg">{orderStatus === "Preparing" && "We are preparing your order."}</Text>
                  <Text className="text-lg">{orderStatus === "Ready" && "Your order is ready for pickup."}</Text>
                  <Text className="text-lg">{orderStatus === "Delivered" && "Order delivered! Thank you."}</Text>
                  <Text className="text-lg">{orderStatus === "Rejected" && "Order rejected. Please contact support."}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Illustration */}
          <View
            style={{
              height: screenHeight * 0.3,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ImageBackground
              source={require('../../assets/images/tracking/Preparing.png')}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            ></ImageBackground>
          </View>
        </View>

        {/* Bottom Sheet with Modalize */}
        <Modalize
          ref={modalizeRef}
          snapPoint={250}
          modalHeight={550}
          alwaysOpen={250}
        >
          <View className="p-5">
            <Text className="text-xl font-semibold">Order Details</Text>
            <Text className="text-gray-500 mt-2">
              Order No: {order._id || "N/A"}
            </Text>
            <Text className="text-gray-500 mt-2">Total: ₹{order.totalAmount}</Text>

            <View className="mt-4">
              <Text className="text-lg font-bold mb-2">Items:</Text>
              {order.items.map((item) => (
                <View
                  key={item.itemId}
                  className="flex-row justify-between items-center mb-2"
                >
                  <Text>{item.itemName}</Text>
                  <Text>x{item.itemQuantity}</Text>
                </View>
              ))}
            </View>
          </View>
        </Modalize>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default OrderTrackingScreen;



