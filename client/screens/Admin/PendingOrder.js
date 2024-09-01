import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { BASE_URL } from "@env";
import * as Icon from "react-native-feather";
import io from "socket.io-client";

const PendingOrders = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const socket = io(BASE_URL);
  
    const fetchPendingOrders = async () => {
      try {
        const adminToken = await AsyncStorage.getItem("adminToken");
        if (!adminToken) {
          Alert.alert("Error", "Admin is not authenticated");
          return;
        }
  
        const response = await fetch(`${BASE_URL}/admin/order/pending`, {
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
  
        setPendingOrders(sortedOrders);
      } catch (error) {
        console.error("Error fetching pending orders:", error);
        Alert.alert("Error", error.message || "Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchPendingOrders();
  
    socket.on("newOrder", (order) => {
      console.log("New order received:", order);
      setPendingOrders((prevOrders) => [order, ...prevOrders]);
    });
  
    const interval = setInterval(fetchPendingOrders, 10000);
  
    return () => {
      clearInterval(interval);
      socket.off("newOrder");
      socket.disconnect();
    };
  }, [BASE_URL]);
  
  const renderOrderItem = ({ item }) => {
    const orderDate = new Date(item.orderPlacedAt);
    const formattedDate = orderDate.toLocaleDateString();
    const formattedTime = orderDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <View className="flex-row items-center space-x-2 py-2 px-4 bg-white rounded-lg mb-2">
        <Image
          source={{ uri: `${BASE_URL}/items_uploads/${item.itemId}.jpg` }}
          style={{ width: 60, height: 60, borderRadius: 8 }}
        />
        <View className="flex-1">
          <Text className="font-semibold text-lg">{item.itemName}</Text>
          <Text className="text-gray-500">Quantity: {item.itemQuantity}</Text>
          <Text className="text-gray-500">Total: ${item.totalAmount}</Text>
          <Text className="text-gray-500">Canteen: {item.canteenName}</Text>
          <Text className="text-gray-500">
            Ordered On: {formattedDate} at {formattedTime}
          </Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

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
        <Text className="ml-4 text-lg font-semibold">Pending Orders</Text>
      </View>

      {pendingOrders.length === 0 ? (
        <Text className="text-center text-lg font-semibold">
          No pending orders found
        </Text>
      ) : (
        <FlatList
          data={pendingOrders}
          keyExtractor={(item) => item._id}
          renderItem={renderOrderItem}
        />
      )}
    </SafeAreaView>
  );
};

export default PendingOrders;
