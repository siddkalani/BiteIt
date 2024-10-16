import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import GlobalHeader from "../../components/Layout/GlobalHeader";

const dummyOrderHistory = [
  {
    id: "1",
    restaurantName: "McDonald's",
    location: "Ghatkopar East, Mumbai",
    items: [
      { name: "2 McVeggie Burger", quantity: 1 },
      { name: "McSaver Pizza McPuff", quantity: 1 },
      { name: "Chatpata Spice Mix", quantity: 2 },
    ],
    orderPlacedAt: "2024-02-11T20:06:00Z",
    totalAmount: "246.00",
    status: "Delivered",
    image: "https://via.placeholder.com/50", // Placeholder for item image
  },
  {
    id: "2",
    restaurantName: "McDonald's",
    location: "Ghatkopar East, Mumbai",
    items: [
      { name: "2 McVeggie Burger", quantity: 1 },
      { name: "McSaver Pizza McPuff", quantity: 1 },
      { name: "Chatpata Spice Mix", quantity: 2 },
    ],
    orderPlacedAt: "2024-02-11T20:05:00Z",
    totalAmount: "245.55",
    status: "Payment failed",
    image: "https://via.placeholder.com/50",
  },
];

const OrderHistoryPage = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const navigation = useNavigation();
  const { top, bottom } = useSafeAreaInsets();
  useEffect(() => {
    // Simulate fetching data
    setOrderHistory(dummyOrderHistory);
  }, []);

  const renderOrderItem = ({ item }) => {
    const orderDate = new Date(item.orderPlacedAt);
    const formattedDate = orderDate.toLocaleDateString();
    const formattedTime = orderDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <View
        style={{
          backgroundColor: "white",
          padding: 16,
          borderRadius: 8,
          marginBottom: 12,
        }}
      >
        {/* Restaurant Info */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
          <Image
            source={{ uri: item.image }}
            style={{ width: 50, height: 50, borderRadius: 8, marginRight: 12 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.restaurantName}</Text>
            <Text style={{ color: "#666" }}>{item.location}</Text>
            <TouchableOpacity>
              <Text style={{ color: "green", marginTop: 4 }}>View menu &gt;</Text>
            </TouchableOpacity>
          </View>
          <Icon.MoreVertical color="#666" />
        </View>

        {/* Order Items */}
        {item.items.map((orderItem, index) => (
          <View
            key={index}
            style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 4 }}
          >
            <Text style={{ fontSize: 16 }}>
              {orderItem.quantity} x {orderItem.name}
            </Text>
          </View>
        ))}

        {/* Order Date and Status */}
        <Text style={{ color: "#666", marginTop: 8 }}>
          Order placed on {formattedDate}, {formattedTime}
        </Text>
        <Text
          style={{
            color: item.status === "Delivered" ? "green" : "red",
            marginTop: 4,
          }}
        >
          {item.status}
        </Text>

        {/* Total Amount and Reorder Button */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 12,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>₹{item.totalAmount}</Text>
          <TouchableOpacity
            style={{
              backgroundColor: "green",
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Reorder</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{
      flex: 1,
      paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
      paddingBottom: Platform.OS === "ios" ? 0 : bottom,
    }} className='bg-white'>
      <StatusBar barStyle="dark-content" translucent />
      {/* Back Button with white background */}
      <View className="flex-1 bg-gray-100">
        <View className="bg-white px-4 py-3">
          <GlobalHeader title="Orders" />
        </View>

        {orderHistory.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 20, fontSize: 18 }}>No orders found</Text>
        ) : (
          <View className='px-4'>
          <FlatList
            data={orderHistory}
            keyExtractor={(item) => item.id}
            renderItem={renderOrderItem}
            contentContainerStyle={{ paddingBottom:bottom+115 , paddingTop:top }}
            showsVerticalScrollIndicator={false}
          />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default OrderHistoryPage;
