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


const AdminHome = () => {
  const navigation = useNavigation();
  const { width: screenWidth } = Dimensions.get("window");
  const { top } = useSafeAreaInsets();
  const [isOnline, setIsOnline] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const [orders, setOrders] = useState([]); // Active/Preparing Orders
  const [pendingOrders, setPendingOrders] = useState([]); // Pending Orders
  const [readyOrders, setReadyOrders] = useState([]); // Ready Orders
  const [pickedUpOrders, setPickedUpOrders] = useState([]); // Picked Up Orders
  const [activeTab, setActiveTab] = useState("Pending"); // Tabs State

  const toggleOnlineStatus = () => setIsOnline((prev) => !prev);

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

  // Simulate order arrival
  useEffect(() => {
    setTimeout(() => {
      setPendingOrders([
        {
          id: "5079",
          time: "8:03PM",
          customerName: "Vishal Gupta",
          items: [
            {
              name: "Aloo Paneer Samosa",
              quantity: 6,
              price: 120,
            },
          ],
          total: 120,
        },
        {
          id: "5179",
          time: "8:03PM",
          customerName: "Vishal Gupta",
          items: [
            {
              name: "Aloo Paneer Samosa",
              quantity: 6,
              price: 120,
            },
          ],
          total: 120,
        },
        {
          id: "5049",
          time: "8:03PM",
          customerName: "Vishal Gupta",
          items: [
            {
              name: "Aloo Paneer Samosa",
              quantity: 6,
              price: 120,
            },
          ],
          total: 120,
        },
        {
          id: "379",
          time: "8:03PM",
          customerName: "Vishal Gupta",
          items: [
            {
              name: "Aloo Paneer Samosa",
              quantity: 6,
              price: 120,
            },
          ],
          total: 120,
        },
        {
          id: "2000",
          time: "8:03PM",
          customerName: "Vishal Gupta",
          items: [
            {
              name: "Aloo Paneer Samosa",
              quantity: 6,
              price: 120,
            },
          ],
          total: 120,
        },
      ]);
    }, 5000); // New pending order after 5 seconds
  }, []);

  const handleAcceptOrder = (orderId) => {
    // Move order to active/preparing orders
    const order = pendingOrders.find((order) => order.id === orderId);
    setOrders([...orders, order]);
    setPendingOrders(pendingOrders.filter((order) => order.id !== orderId));
  };

  const handleRejectOrder = (orderId) => {
    // Remove order from pending orders
    setPendingOrders(pendingOrders.filter((order) => order.id !== orderId));
  };

  const handleOrderReady = (orderId) => {
    // Move order to ready orders
    const order = orders.find((order) => order.id === orderId);
    setReadyOrders([...readyOrders, order]);
    setOrders(orders.filter((order) => order.id !== orderId));
  };

  const handlePickedUpOrder = (orderId) => {
    // Move order to picked-up orders
    const order = readyOrders.find((order) => order.id === orderId);
    setPickedUpOrders([...pickedUpOrders, order]);
    setReadyOrders(readyOrders.filter((order) => order.id !== orderId));
  };

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
          {activeTab === "Pending" && pendingOrders.length > 0 ? (
            <View>
              {pendingOrders.map((order) => (
                <View
                  key={order.id}
                  className="p-4 bg-gray-50 rounded-lg shadow-sm my-2"
                >
                  <View className="flex-row justify-between">
                    <Text className="text-xl font-bold">ID: {order.id}</Text>
                    <Text className="text-gray-500">{order.time}</Text>
                  </View>
                  <Text className="text-sm text-blue-500">
                    1st order by {order.customerName}
                  </Text>
                  {order.items.map((item, idx) => (
                    <View key={idx} className="flex-row justify-between mt-2">
                      <Text className="text-base">
                        {item.quantity} x {item.name}
                      </Text>
                      <Text className="text-base">₹{item.price}</Text>
                    </View>
                  ))}
                  <View className="flex-row justify-between mt-2">
                    <Text className="text-base font-bold">Total Bill</Text>
                    <Text className="text-base font-bold">₹{order.total}</Text>
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
                      onPress={() => handleRejectOrder(order.id)}
                      className="flex-1 bg-red-100 rounded-lg py-2 mr-2"
                    >
                      <Text className="text-red-500 text-center">Reject</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleAcceptOrder(order.id)}
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
          ) : activeTab === "Preparing" && orders.length > 0 ? (
            <View>
              {orders.map((order) => (
                <View
                  key={order.id}
                  className="p-4 bg-gray-50 rounded-lg shadow-sm my-2"
                >
                  <View className="flex-row justify-between">
                    <Text className="text-xl font-bold">ID: {order.id}</Text>
                    <Text className="text-gray-500">{order.time}</Text>
                  </View>
                  <Text className="text-sm text-blue-500">
                    1st order by {order.customerName}
                  </Text>
                  {order.items.map((item, idx) => (
                    <View key={idx} className="flex-row justify-between mt-2">
                      <Text className="text-base">
                        {item.quantity} x {item.name}
                      </Text>
                      <Text className="text-base">₹{item.price}</Text>
                    </View>
                  ))}
                  <View className="flex-row justify-between mt-2">
                    <Text className="text-base font-bold">Total Bill</Text>
                    <Text className="text-base font-bold">₹{order.total}</Text>
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
                      onPress={() => handleOrderReady(order.id)}
                      className="bg-yellow-500 p-2 rounded-lg"
                    >
                      <Text className="text-white">Order Ready</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          ) : activeTab === "Ready" && readyOrders.length > 0 ? (
            <View>
              {readyOrders.map((order) => (
                <View
                  key={order.id}
                  className="p-4 bg-gray-50 rounded-lg shadow-sm my-2"
                >
                  <View className="flex-row justify-between">
                    <Text className="text-xl font-bold">ID: {order.id}</Text>
                    <Text className="text-gray-500">{order.time}</Text>
                  </View>
                  <Text className="text-sm text-blue-500">
                    1st order by {order.customerName}
                  </Text>
                  {order.items.map((item, idx) => (
                    <View key={idx} className="flex-row justify-between mt-2">
                      <Text className="text-base">
                        {item.quantity} x {item.name}
                      </Text>
                      <Text className="text-base">₹{item.price}</Text>
                    </View>
                  ))}
                  <View className="flex-row justify-between mt-2">
                    <Text className="text-base font-bold">Total Bill</Text>
                    <Text className="text-base font-bold">₹{order.total}</Text>
                  </View>

                  {/* Picked Up Button (Keep original styling) */}
                  <View className="flex-row justify-between mt-4">
                    <TouchableOpacity
                      onPress={() => handlePickedUpOrder(order.id)}
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
              {pickedUpOrders.map((order) => (
                <View
                  key={order.id}
                  className="p-4 bg-gray-50 rounded-lg shadow-sm my-2"
                >
                  <View className="flex-row justify-between">
                    <Text className="text-xl font-bold">ID: {order.id}</Text>
                    <Text className="text-gray-500">{order.time}</Text>
                  </View>
                  <Text className="text-sm text-blue-500">
                    1st order by {order.customerName}
                  </Text>
                  {order.items.map((item, idx) => (
                    <View key={idx} className="flex-row justify-between mt-2">
                      <Text className="text-base">
                        {item.quantity} x {item.name}
                      </Text>
                      <Text className="text-base">₹{item.price}</Text>
                    </View>
                  ))}
                  <View className="flex-row justify-between mt-2">
                    <Text className="text-base font-bold">Total Bill</Text>
                    <Text className="text-base font-bold">₹{order.total}</Text>
                  </View>

                  <Text className="text-base text-green-500 font-bold mt-2">
                    Order Picked Up
                  </Text>
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
