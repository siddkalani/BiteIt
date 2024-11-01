import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
  Switch,
  Platform,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BASE_URL } from "../../../../constants/constant";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { selectCanteenId } from "../../../../store/Slices/orderServiceSlice";
import { useSelector } from 'react-redux';
import Animated from "react-native-reanimated";
const socket = io(BASE_URL); // Initialize socket connection once

const AdminHome = () => {
  const navigation = useNavigation();
  const { width: screenWidth } = Dimensions.get("window");
  const { top } = useSafeAreaInsets();
  const [isOnline, setIsOnline] = useState(false);
  // const [canteenId, setCanteenId] = useState(null);
  const canteenId = useSelector(selectCanteenId);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [actionLoading, setActionLoading] = useState({});
  const flatListRef = useRef(null);
  // const scrollX = useRef(new Animated.Value(0)).current;

  const [orders, setOrders] = useState([]); // Preparing Orders
  const [pendingOrders, setPendingOrders] = useState([]); // Pending Orders
  const [readyOrders, setReadyOrders] = useState([]); // Ready Orders
  const [pickedUpOrders, setPickedUpOrders] = useState([]); // Picked Up Orders
  const [activeTab, setActiveTab] = useState("Pending"); // Active Tab

  const [loading, setLoading] = useState(true); // Loading State
  const [searchQuery, setSearchQuery] = useState(""); // Search Query State

  useEffect(() => {
    const fetchCanteenData = async () => {
      if (!canteenId) {
        Alert.alert("Error", "Canteen ID not available.");
        return;
      }

      try {
        const responseStatus = await fetch(`${BASE_URL}/canteen/${canteenId}/status`);
        if (!responseStatus.ok) {
          throw new Error("Failed to fetch canteen status");
        }

        const dataStatus = await responseStatus.json();
        // Update the online status based on the response
        setIsOnline(dataStatus.isOnline); // Assuming response contains { isOnline: true/false }

      } catch (error) {
        console.error("Failed to fetch canteen data:", error);

      }
    };

    fetchCanteenData();
  }, [canteenId]); // Ensure the effect runs when canteenId changes

  // Toggle function that sends the updated status to the backend
  const toggleOnlineStatus = async () => {
    if (!canteenId) return;

    try {
      // Check the current online status
      const currentStatus = isOnline;

      // Determine the new status
      const newStatus = !currentStatus;

      // Update the local state first (optimistic update)
      setIsOnline(newStatus);

      // Make the API request to update the status on the server
      const response = await fetch(`${BASE_URL}/canteen/${canteenId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isOnline: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const data = await response.json();
      // Handle the response data if necessary


    } catch (error) {
      console.error("Error updating status:", error);
      // Revert status if update fails
      setIsOnline(currentStatus);

    }
  };


  // Slides for Promo Banner (if any)
  const slides = [
    {
      title: "Packaging as low as",
      subtitle: "Up to 1500 credits on Hyperpure",
      image: require("../../../../assets/images/admin/storeOpen.png"),
    },
    {
      title: "Packaging as low as",
      subtitle: "Up to 1500 credits on Hyperpure",
      image: require("../../../../assets/images/home/coverFood.png"),
    },
  ];

  // Slide Auto-Scroll
  useEffect(() => {
    const slideTimeout = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearTimeout(slideTimeout);
  }, [currentSlide, slides.length]);

  useEffect(() => {
    flatListRef.current?.scrollToIndex({ index: currentSlide, animated: true });
  }, [currentSlide]);

  const handleMomentumScrollEnd = useCallback((event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setCurrentSlide(index);
  }, [screenWidth]);

  // Fetch Orders on Mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const adminToken = await AsyncStorage.getItem("adminToken");
        if (!adminToken) {
          Alert.alert("Error", "Admin is not authenticated");
          setLoading(false);
          return;
        }

        const response = await fetch(`${BASE_URL}/admin/order/all`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch orders");
        }

        const sortedOrders = data.orders.sort(
          (a, b) => new Date(b.orderPlacedAt) - new Date(a.orderPlacedAt)
        );
        setPendingOrders(sortedOrders.filter(order => order.status === 'Pending'));
        setOrders(sortedOrders.filter(order => order.status === 'Preparing'));
        setReadyOrders(sortedOrders.filter(order => order.status === 'Ready'));
        setPickedUpOrders(sortedOrders.filter(order => order.status === 'Delivered'));
      } catch (error) {
        console.error("Error fetching orders:", error);
        Alert.alert("Error", error.message || "Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

    // Listen for new orders
    socket.on("newOrder", (order) => {
      setPendingOrders((prevOrders) => [order, ...prevOrders]);
    });

    return () => {
      socket.off("newOrder");
      socket.disconnect();
    };
  }, []);

  // Listen for payment updates
  useEffect(() => {
    socket.on("paymentDone", (updatedOrder) => {
      setPickedUpOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? { ...order, payment: updatedOrder.payment } : order
        )
      );
    });

    return () => {
      socket.off("paymentDone");
    };
  }, []);

  const updateOrderStatus = async (id, status) => {
    try {
      // Set action loading state
      setActionLoading((prev) => ({ ...prev, [id]: true }));
  
      const adminToken = await AsyncStorage.getItem("adminToken");
      if (!adminToken) {
        Alert.alert("Error", "Admin is not authenticated");
        setActionLoading((prev) => ({ ...prev, [id]: false }));
        return;
      }
  
      const response = await fetch(`${BASE_URL}/admin/order/status/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ status }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update order status");
      }
  
      // Update local state based on new status
      if (status === "Rejected" || status === "Delivered") {
        setPendingOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== id)
        );
        if (status === "Delivered") {
          setPickedUpOrders((prev) => [
            ...prev,
            { ...data.order, payment: data.order.payment || 0 },
          ]);
        }
      } else {
        setPendingOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === id ? { ...order, status } : order
          )
        );
      }
  
      // Handle specific status updates
      if (status === "Preparing") {
        handleAcceptOrder(id);
      } else if (status === "Ready") {
        handleOrderReady(id);
      } else if (status === "Delivered") {
        handlePickedUpOrder(id);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      Alert.alert(
        "Error",
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      // Reset action loading state
      setActionLoading((prev) => ({ ...prev, [id]: false }));
    }
  };
  

  // Handle Accept Order
  const handleAcceptOrder = (orderId) => {
    const order = pendingOrders.find((order) => order._id === orderId);
    if (order) {
      setOrders((prev) =>
        [...prev, order].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
      setPendingOrders((prev) => prev.filter((order) => order._id !== orderId));
    }
  };

  // Handle Reject Order
  const handleRejectOrder = (orderId) => {
    const order = pendingOrders.find((order) => order._id === orderId);
    if (order) {
      setOrders((prev) =>
        [...prev, order].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
      setPendingOrders((prev) => prev.filter((order) => order._id !== orderId));
    }
  };

  // Handle Order Ready
  const handleOrderReady = (orderId) => {
    const order = orders.find((order) => order._id === orderId);
    if (order) {
      setReadyOrders((prev) =>
        [...prev, order].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
    }
  };

  // Handle Picked Up Order
  const handlePickedUpOrder = (orderId) => {
    const order = readyOrders.find((order) => order._id === orderId);
    if (order) {
      setPickedUpOrders((prev) =>
        [...prev, order].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
      setReadyOrders((prev) => prev.filter((order) => order._id !== orderId));
    }
  };

  const handlePaymentDone = async (orderId) => {
    try {
      // Set action loading state
      setActionLoading((prev) => ({ ...prev, [orderId]: true }));
  
      const token = await AsyncStorage.getItem("userToken"); // Retrieve the token
      const response = await fetch(`${BASE_URL}/admin/payment/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ payment: 1 }), // Sending payment status as 1
      });
  
      if (response.ok) {
        const data = await response.json();
        // Update the specific order's payment status
        setPickedUpOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, payment: 1 } : order
          )
        );
      } else {
        const errorData = await response.json();
        Alert.alert(
          "Error",
          errorData.message || "Failed to update payment status"
        );
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      // Reset action loading state
      setActionLoading((prev) => ({ ...prev, [orderId]: false }));
    }
  };
  

  // Filter orders based on search query for the active tab
  const getFilteredOrders = () => {
    const query = searchQuery.trim().toLowerCase();
    if (query === "") {
      return activeTab === "Pending"
        ? pendingOrders
        : activeTab === "Preparing"
          ? orders
          : activeTab === "Ready"
            ? readyOrders
            : pickedUpOrders;
    }

    const filterById = (order) => order._id.toLowerCase().includes(query);

    switch (activeTab) {
      case "Pending":
        return pendingOrders.filter(filterById);
      case "Preparing":
        return orders.filter(filterById);
      case "Ready":
        return readyOrders.filter(filterById);
      case "PickedUp":
        return pickedUpOrders.filter(filterById);
      default:
        return [];
    }
  };

  const filteredOrders = getFilteredOrders();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? top : StatusBar.currentHeight,
      }}
      className="bg-white"
    >
      <StatusBar barStyle="dark-content" backgroundColor={"white"} translucent />

      <View className="flex-1 pt-3 px-4 space-y-2">
        {/* Top Header */}
        <View className="flex-row items-center justify-between h-8">
          <View className="flex-row items-center space-x-2">
            <Text className="text-2xl font-bold">Online</Text>
            <Switch
              value={isOnline}
              onValueChange={toggleOnlineStatus}
              trackColor={{ false: "#767577", true: "green" }}
              thumbColor={isOnline ? "white" : "white"}
            />
          </View>
          <View className="flex-row items-center space-x-4">
            <TouchableOpacity>
              <Icon.Bell height={24} width={24} stroke="black" />
              <View className="absolute -top-2 -right-2 bg-red-500 w-4 h-4 rounded-full justify-center items-center">
                <Text className="text-white text-xs">4</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon.Search height={24} width={24} stroke="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon.Settings height={24} width={24} stroke="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tab Section */}
        <View className="flex-row justify-between space-x-2">
          <TouchableOpacity
            onPress={() => setActiveTab("Pending")}
            className={`flex-1 items-center px-1 py-2 ${activeTab === "Pending" ? "bg-yellow-200" : "bg-gray-100"
              } rounded-lg`}
          >
            <Text numberOfLines={1} className="text-gray-400">
              Pending ({pendingOrders.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("Preparing")}
            className={`flex-1 items-center px-1 py-2 ${activeTab === "Preparing" ? "bg-yellow-200" : "bg-gray-100"
              } rounded-lg`}
          >
            <Text numberOfLines={1} className="text-gray-400">
              Preparing ({orders.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("Ready")}
            className={`flex-1 items-center px-1 py-2 ${activeTab === "Ready" ? "bg-yellow-200" : "bg-gray-100"
              } rounded-lg`}
          >
            <Text className="text-gray-400">Ready ({readyOrders.length})</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("PickedUp")}
            className={`flex-1 items-center px-1 py-2 ${activeTab === "PickedUp" ? "bg-yellow-200" : "bg-gray-100"
              } rounded-lg`}
          >
            <Text numberOfLines={1} className="text-gray-400">
              Picked Up ({pickedUpOrders.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center space-x-2 mt-4 bg-white rounded-lg p-3 shadow-3">
          <Icon.Search height={20} width={20} stroke="gray" />
          <TextInput
            placeholder="Search for Order ID"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-2"
            keyboardType="default"
            autoCapitalize="none"
          />
        </View>

        {/* Orders List based on Tab Selection */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {loading ? (
            <View className="flex-1 justify-center items-center mt-10">
              <ActivityIndicator size="large" color="#309624" />
            </View>
          ) : filteredOrders.length > 0 ? (
            <View>
              {filteredOrders.map((order) => (
                <View
                  key={order._id}
                  className="p-4 bg-gray-50 rounded-lg shadow-sm my-2"
                >
                  {/* Order Header */}
                  <View className="flex-row justify-between">
                    <Text className="text-xl font-bold">ID: {order._id}</Text>
                    {/* Optional: Display order time if available */}
                    {/* <Text className="text-gray-500">{order.time}</Text> */}
                  </View>
                  <Text className="text-sm text-blue-500">
                    1st order by {order.userId}
                  </Text>

                  {/* Order Items */}
                  {order.items.map((item, idx) => (
                    <View key={idx} className="flex-row justify-between mt-2">
                      <Text className="text-base">
                        {item.itemQuantity} x {item.itemName}
                      </Text>
                      {/* Optional: Display item price */}
                      {/* <Text className="text-base">₹{item.itemPrice}</Text> */}
                    </View>
                  ))}

                  {/* Total Bill */}
                  <View className="flex-row justify-between mt-2">
                    <Text className="text-base font-bold">Total Bill</Text>
                    <Text className="text-base font-bold">₹{order.totalAmount}</Text>
                  </View>

                  {/* Set Preparation Time (if applicable) */}
                  {(activeTab === "Pending" || activeTab === "Preparing") && (
                    <View className="flex-row items-center justify-between mt-2">
                      <Text className="text-sm text-gray-500">
                        Set food preparation time
                      </Text>
                      <View className="flex-row items-center">
                        <TouchableOpacity className="p-2">
                          <Text>-</Text>
                        </TouchableOpacity>
                        <Text className="px-2">15 mins</Text>
                        <TouchableOpacity className="p-2">
                          <Text>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}

                  {/* Action Buttons */}
                  <View className="flex-row justify-between mt-4">
                    {activeTab === "Pending" && (
                      <>
                        <TouchableOpacity
                          onPress={() => updateOrderStatus(order._id, "Rejected")}
                          className="flex-1 bg-red-100 rounded-lg py-2 mr-2"
                          disabled={actionLoading[order._id]}
                        >
                          {actionLoading[order._id] ? (
                            <ActivityIndicator size="small" color="#FF0000" />
                          ) : (
                            <Text className="text-red-500 text-center">Reject</Text>
                          )}
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => updateOrderStatus(order._id, "Preparing")}
                          className="flex-1 bg-yellow-400 rounded-lg py-2"
                          disabled={actionLoading[order._id]}
                        >
                          {actionLoading[order._id] ? (
                            <ActivityIndicator size="small" color="#FFFFFF" />
                          ) : (
                            <Text className="text-center text-white">Accept</Text>
                          )}
                        </TouchableOpacity>
                      </>
                    )}

                    {activeTab === "Preparing" && (
                      <TouchableOpacity
                        onPress={() => updateOrderStatus(order._id, "Ready")}
                        className="bg-yellow-500 p-2 rounded-lg flex-1"
                        disabled={actionLoading[order._id]}
                      >
                        {actionLoading[order._id] ? (
                          <ActivityIndicator size="small" color="#FFFFFF" />
                        ) : (
                          <Text className="text-white text-center">Order Ready</Text>
                        )}
                      </TouchableOpacity>
                    )}

                    {activeTab === "Ready" && (
                      <TouchableOpacity
                        onPress={() => updateOrderStatus(order._id, "Delivered")}
                        className="bg-green-500 p-2 rounded-lg flex-1"
                        disabled={actionLoading[order._id]}
                      >
                        {actionLoading[order._id] ? (
                          <ActivityIndicator size="small" color="#FFFFFF" />
                        ) : (
                          <Text className="text-white text-center">Order Picked Up</Text>
                        )}
                      </TouchableOpacity>
                    )}

                    {activeTab === "PickedUp" && (
                      <>
                        <Text
                          className={`text-base font-bold ${order.payment === 1 ? "text-green-500" : "text-red-500"
                            }`}
                        >
                          {order.payment === 1 ? "Payment Done" : "Pending Payment"}
                        </Text>
                        {order.payment !== 1 && (
                          <TouchableOpacity
                            onPress={() => handlePaymentDone(order._id)}
                            className="bg-green-500 p-2 rounded-lg"
                            disabled={actionLoading[order._id]}
                          >
                            {actionLoading[order._id] ? (
                              <ActivityIndicator size="small" color="#FFFFFF" />
                            ) : (
                              <Text className="text-white text-center">Payment Done</Text>
                            )}
                          </TouchableOpacity>
                        )}
                        {order.payment === 1 && (
                          <Text className="text-base text-green-500 font-bold mt-2">
                            Order Picked Up
                          </Text>
                        )}
                      </>
                    )}
                  </View>

                </View>
              ))}
            </View>
          ) : (
            <View className="flex-1 justify-center items-center mt-10">
              <Image
                source={require("../../../../assets/images/admin/storeOpen.png")}
                style={{ width: 150, height: 150 }}
                resizeMode="contain"
              />
              <Text className="text-2xl font-bold mt-4">You are Online</Text>
              <Text className="text-gray-500 text-lg">
                Waiting for new orders
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Footer */}
      {/* <AdminFooter /> */}
    </View>
  );
};

export default AdminHome;
