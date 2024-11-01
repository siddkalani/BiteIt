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
  FlatList,
  ImageBackground,
  Animated,
  ScrollView
} from "react-native";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BASE_URL } from "../../../../constants/constant";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { selectCanteenId } from "../../../../store/Slices/orderServiceSlice";
import { useSelector } from 'react-redux';

const socket = io(BASE_URL);
const AdminHome = () => {
  const navigation = useNavigation();
  const { width: screenWidth } = Dimensions.get("window");
  const { top } = useSafeAreaInsets();
  const [isOnline, setIsOnline] = useState(false);
  // const [canteenId, setCanteenId] = useState(null);
  const canteenId = useSelector(selectCanteenId);
  const [currentSlide, setCurrentSlide] = useState(0);
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const [orders, setOrders] = useState([]); // Active/Preparing Orders
  const [pendingOrders, setPendingOrders] = useState([]); // Pending Orders
  const [preparingOrders, setPreparingOrders] = useState([]);
  const [readyOrders, setReadyOrders] = useState([]); // Ready Orders
  const [pickedUpOrders, setPickedUpOrders] = useState([]); // Picked Up Orders
  const [activeTab, setActiveTab] = useState("Pending"); // Tabs State

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

  useEffect(() => {
    const slideTimeout = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearTimeout(slideTimeout);
  }, [currentSlide]);

  useEffect(() => {
    flatListRef.current?.scrollToIndex({ index: currentSlide, animated: true });
  }, [currentSlide]);

  const handleMomentumScrollEnd = useCallback((event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setCurrentSlide(index);
  }, []);

 
useEffect(() => {
    const socket = io(BASE_URL);

    const fetchPendingOrders = async () => {
      try {
        const adminToken = await AsyncStorage.getItem("adminToken");
        if (!adminToken) {
          Alert.alert("Error", "Admin is not authenticated");
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
          throw new Error(data.message || "Failed to fetch pending orders");
        }

        const sortedOrders = data.orders.sort(
          (a, b) => new Date(b.orderPlacedAt) - new Date(a.orderPlacedAt)
        );
                setPendingOrders(sortedOrders.filter(order => order.status === 'Pending'));
                setOrders(sortedOrders.filter(order => order.status === 'Preparing'));
                setReadyOrders(sortedOrders.filter(order => order.status === 'Ready'));
                setPickedUpOrders(sortedOrders.filter(order => order.status === 'Delivered'));

      } catch (error) {
        console.error("Error fetching pending orders:", error);
        Alert.alert("Error", error.message || "Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    // Fetch pending orders when the component mounts
    fetchPendingOrders();

    // Listen for new order events
    socket.on("newOrder", (order) => {
      console.log("New order received:");
      setPendingOrders((prevOrders) => [order, ...prevOrders]); 
    });

    return () => {
      socket.off("newOrder");
      socket.disconnect();
    };
  }, []);



//update order 
const updateOrderStatus = async (id, status) => {
  try {
    const adminToken = await AsyncStorage.getItem("adminToken");
    if (!adminToken) {
      Alert.alert("Error", "Admin is not authenticated");
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

    // Remove the order from the pending orders state if status is Rejected or Delivered
    if (status === "Rejected" || status === "Delivered") {
      setPendingOrders((prevOrders) => prevOrders.filter(order => order._id !== id));
    } else {
      setPendingOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status } : order
        )
      );
    }
    if (status === "Preparing") {
      handleAcceptOrder(id);
    }else if (status === "Ready") {
      handleOrderReady(id);
    }else if (status === "Delivered") {
      handlePickedUpOrder(id)
    }
  } catch (error) {
    console.error("Error updating order status:", error);
    Alert.alert("Error", error.message || "Something went wrong. Please try again.");
  }
};



const handleAcceptOrder = (orderId) => {
  const order = pendingOrders.find((order) => order._id === orderId);
  if (order) {
    setOrders((prev) => 
      [...prev, order].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort descending by createdAt
    );
    setPendingOrders((prev) => prev.filter((order) => order._id !== orderId));
  }
};

const handleRejectOrder = (orderId) => {
  const order = pendingOrders.find((order) => order._id === orderId);
  if (order) {
    setOrders((prev) => 
      [...prev, order].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort descending by createdAt
    );
    setPendingOrders((prev) => prev.filter((order) => order._id !== orderId));
  }
};

const handleOrderReady = (orderId) => {
  // Move order to ready orders
  const order = orders.find((order) => order._id === orderId);
  if (order) {
    setReadyOrders((prev) => 
      [...prev, order].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort descending by createdAt
    );
    setOrders((prev) => prev.filter((order) => order._id !== orderId));
  }
};

const handlePickedUpOrder = (orderId) => {
  // Move order to picked-up orders
  const order = readyOrders.find((order) => order._id === orderId);
  if (order) {
    setPickedUpOrders((prev) => 
      [...prev, order].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort descending by createdAt
    );
    setReadyOrders((prev) => prev.filter((order) => order._id !== orderId));
  }
};

const handlePaymentDone = async (orderId) => {
  try {
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
      // console.log("Payment updated successfully:", data);

      // Optionally, you might want to refresh the order list here
      // fetchOrders(); // Define this function to refresh your orders
    } else {
      const errorData = await response.json();
    }
  } catch (error) {
    console.error("Error updating payment status:", error);
  }
};

useEffect(() => {
  // Listening for payment updates
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
            <Text numberOfLines={1} className="text-gray-400">Pending ({pendingOrders.length})</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("Preparing")}
            className={`flex-1 items-center px-1 py-2 ${activeTab === "Preparing" ? "bg-yellow-200" : "bg-gray-100"
              } rounded-lg`}
          >
            <Text numberOfLines={1} className="text-gray-400">Preparing ({orders.length})</Text>
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
            <Text numberOfLines={1} className="text-gray-400">Picked Up ({pickedUpOrders.length})</Text>
          </TouchableOpacity>
        </View>


        {/* Promo Banner with Pagination */}
        <View className="">
          <FlatList
            ref={flatListRef}
            data={slides}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            onMomentumScrollEnd={handleMomentumScrollEnd}
            renderItem={({ item }) => (
              <ImageBackground
                source={item.image}
                style={{ width: screenWidth - 32, height: 150 }}
                imageStyle={{ borderRadius: 12 }}
              >
                <View className="flex-1 bg-opacity-40 rounded-lg p-4 justify-between">
                  <View>
                    <Text className="text-white text-xl font-bold">
                      {item.title}
                    </Text>
                    <Text className="text-white text-sm">{item.subtitle}</Text>
                  </View>
                  <TouchableOpacity className="bg-yellow-400 rounded-full py-2 px-4 self-start">
                    <Text className="text-black font-semibold">Click Here</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            )}
          />
          <View className="flex-row justify-center mt-2">
            {slides.map((_, index) => (
              <Animated.View
                key={index}
                style={{
                  height: 8,
                  width: index === currentSlide ? 16 : 8,
                  backgroundColor: index === currentSlide ? "#333" : "#ccc",
                  borderRadius: 4,
                  marginHorizontal: 4,
                  transition: "width 0.2s",
                }}
              />
            ))}
          </View>
        </View>

        {/* Pending/Preparing/Ready/PickedUp Orders List */}
        <ScrollView>
          {
         
           activeTab === "Pending" && pendingOrders.length > 0 ? (
            <View>
              {pendingOrders?.map((order) => (
                <View
                  key={order._id}
                  className="p-4 bg-gray-50 rounded-lg shadow-sm my-2"
                >
                  <View className="flex-row justify-between">
                    <Text className="text-xl font-bold">ID: {order._id}</Text>
                    {/* <Text className="text-gray-500">{order.time}</Text> */}
                  </View>
                  <Text className="text-sm text-blue-500">
                    1st order by {order.userId}
                  </Text>
                  {order.items.map((item, idx) => (
                    <View key={idx} className="flex-row justify-between mt-2">
                      <Text className="text-base">
                        {item.itemQuantity} x {item.itemName}
                      </Text>
                      {/* <Text className="text-base">₹{item.itemPrice}</Text> */}
                    </View>
                  ))}
                  <View className="flex-row justify-between mt-2">
                    <Text className="text-base font-bold">Total Bill</Text>
                    <Text className="text-base font-bold">₹{order.totalAmount}</Text>
                  </View>

                  {/* Set Preparation Time */}
                  <View className="flex-row items-center justify-between mt-2">
                    <Text className="text-sm text-gray-500">
                      set food preparation time
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

                  {/* Ready Button (Keep original styling) */}
                  <View className="flex-row justify-between mt-4">
                    <TouchableOpacity
                      onPress={() => updateOrderStatus(order._id, 'Rejected')}
                      className="flex-1 bg-red-100 rounded-lg py-2 mr-2"
                    >
                      <Text className="text-red-500 text-center">Reject</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => updateOrderStatus(order._id, 'Preparing')}
                      className="flex-1 bg-yellow-400 rounded-lg py-2"
                    >
                      <Text className="text-center text-white">
                        Accept (4:57)
                      </Text>
                    </TouchableOpacity>
                  </View>
                 
                </View>
              ))}
            </View>
          ) : 
          
          activeTab === "Preparing" && orders.length > 0 ? (
            <View>
              {orders?.map((order) => (
                <View
                  key={order._id}
                  className="p-4 bg-gray-50 rounded-lg shadow-sm my-2"
                >
                  <View className="flex-row justify-between">
                    <Text className="text-xl font-bold">ID: {order._id}</Text>
                    {/* <Text className="text-gray-500">{order.time}</Text> */}
                  </View>
                  <Text className="text-sm text-blue-500">
                    1st order by {order.userId}
                  </Text>
                  {order.items.map((item, idx) => (
                    <View key={idx} className="flex-row justify-between mt-2">
                      <Text className="text-base">
                        {item.itemQuantity} x {item.itemName}
                      </Text>
                      {/* <Text className="text-base">₹{item.price}</Text> */}
                    </View>
                  ))}
                  <View className="flex-row justify-between mt-2">
                    <Text className="text-base font-bold">Total Bill</Text>
                    <Text className="text-base font-bold">₹{order.totalAmount}</Text>
                  </View>

                  {/* Set Preparation Time */}
                  <View className="flex-row items-center justify-between mt-2">
                    <Text className="text-sm text-gray-500">
                      set food preparation time
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

                  {/* Accept & Reject Buttons (Keep original styling) */}
                  <View className="flex-row justify-between mt-4">
                    <TouchableOpacity
                      onPress={() => updateOrderStatus(order._id, "Ready")}
                      className="bg-yellow-500 p-2 rounded-lg"
                    >
                      <Text className="text-white">Order Ready</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>


          ) :
          activeTab === "Ready" && readyOrders.length > 0 ? (
            <View>
              {readyOrders?.map((order) => (
                <View
                  key={order._id}
                  className="p-4 bg-gray-50 rounded-lg shadow-sm my-2"
                >
                  <View className="flex-row justify-between">
                    <Text className="text-xl font-bold">ID: {order._id}</Text>
                    {/* <Text className="text-gray-500">{order.time}</Text> */}
                  </View>
                  <Text className="text-sm text-blue-500">
                    1st order by {order.userId}
                  </Text>
                  {order.items.map((item, idx) => (
                    <View key={idx} className="flex-row justify-between mt-2">
                      <Text className="text-base">
                        {item.itemQuantity} x {item.itemName}
                      </Text>
                      {/* <Text className="text-base">₹{item.price}</Text> */}
                    </View>
                  ))}
                  <View className="flex-row justify-between mt-2">
                    <Text className="text-base font-bold">Total Bill</Text>
                    <Text className="text-base font-bold">₹{order.totalAmount}</Text>
                  </View>

                  {/* Picked Up Button (Keep original styling) */}
                  <View className="flex-row justify-between mt-4">
                    <TouchableOpacity
                      onPress={() => updateOrderStatus(order._id, "Delivered")}
                      className="bg-green-500 p-2 rounded-lg"
                    >
                      <Text className="text-white">Order Picked Up</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          ) : activeTab === "PickedUp" && pickedUpOrders.length > 0 ? (
            <View>
              {pickedUpOrders?.map((order) => (
                <View
                  key={order._id}
                  className="p-4 bg-gray-50 rounded-lg shadow-sm my-2"
                >
                  <View className="flex-row justify-between">
                    <Text className="text-xl font-bold">ID: {order._id}</Text>
                    {/* <Text className="text-gray-500">{order.time}</Text> */}
                  </View>
                  <Text className="text-sm text-blue-500">
                    1st order by {order.userId}
                  </Text>
                  {order.items.map((item, idx) => (
                    <View key={idx} className="flex-row justify-between mt-2">
                      <Text className="text-base">
                        {item.itemQuantity} x {item.itemName}
                      </Text>
                      {/* <Text className="text-base">₹{item.price}</Text> */}
                    </View>
                  ))}
                  <View className="flex-row justify-between mt-2">
                    <Text className="text-base font-bold">Total Bill</Text>
                    <Text className="text-base font-bold">₹{order.totalAmount}</Text>
                    <Text className="text-base font-bold">     {order.payment === 1 ? "Payment Done" : "Pending Payment"}</Text>
                  </View>
                  {order.payment !== 1 && (
      <View className="flex-row justify-between mt-4">
        <TouchableOpacity
          className="bg-green-500 p-2 rounded-lg"
          onPress={() => handlePaymentDone(order._id)}
        >
          <Text className="text-white">Payment Done</Text>
        </TouchableOpacity>
      </View>
    )}
    {order.payment === 1 && (
      <Text className="text-base text-green-500 font-bold mt-2">
        Order Picked Up
      </Text>
    )}
                </View>
              ))}
            </View>
          ) : (
            <View className="flex-1 justify-center items-center">
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