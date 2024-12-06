// OrderHistoryPage.js
import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Icon from "react-native-feather";
import { socket } from "../../services/socketService";
import { fetchOrderHistory, orderDelivered, paymentUpdated } from "../../store/Slices/orderHistorySlice";
import { BASE_URL } from "../../constants/constant";

const OrderHistoryPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { orders, loading, error } = useSelector((state) => state.orderHistory);

  useEffect(() => {
    dispatch(fetchOrderHistory());
    
  }, [dispatch]);

  const renderOrderItem = ({ item }) => {
    const orderDate = new Date(item.orderPlacedAt);
    const formattedDate = orderDate.toLocaleDateString();
    const formattedTime = orderDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const deliveredDate = item.deliveredAt ? new Date(item.deliveredAt) : null;
    const formattedDeliveredDate = deliveredDate?.toLocaleDateString();
    const formattedDeliveredTime = deliveredDate?.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const handleTrackOrder = () => {
      navigation.navigate("OrderTracking", { order: item });
    };

    return (
      <View className="bg-white p-4 rounded-lg mb-4">
        <Text className="font-bold text-lg mb-2">Order Details</Text>
        <Text className="text-gray-500 mb-2">Canteen: {item.canteenName}</Text>
        <Text className="text-gray-500 mb-2">
          Ordered On: {formattedDate} at {formattedTime}
        </Text>
        {deliveredDate && (
          <Text className="text-gray-500 mb-2">
            Delivered At: {formattedDeliveredDate} at {formattedDeliveredTime}
          </Text>
        )}
        <Text className="font-bold mb-2">Items:</Text>
        {item.items.map((orderItem) => (
          <View
            key={orderItem.itemId}
            className="flex-row items-center justify-between mb-2"
          >
            {orderItem.itemImage && (
              <Image
                source={{ uri: `${BASE_URL}/items_uploads/${orderItem.itemImage}` }}
                style={{ width: 50, height: 50, borderRadius: 8 }}
              />
            )}
            <View className="flex-1 ml-4">
              <Text className="font-semibold">{orderItem.itemName}</Text>
              <Text className="text-gray-500">
                Quantity: {orderItem.itemQuantity}
              </Text>
            </View>
          </View>
        ))}
        <Text className="text-gray-500 mt-2">Total: ${item.totalAmount}</Text>
        <Text
          className={`mt-2 ${
            item.status === "Delivered" ? "text-green-600" : "text-gray-500"
          }`}
        >
          Status: {item.status}
        </Text>
        <Text
          className={`mt-2 ${
            item.payment === 1 ? "text-green-600" : "text-red-600"
          }`}
        >
          Payment: {item.payment === 1 ? "Done" : "Pending"}
        </Text>
        <TouchableOpacity
          onPress={handleTrackOrder}
          className="mt-4 bg-blue-500 p-3 rounded-lg"
        >
          <Text className="text-white text-center font-semibold">Track Order</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return (
      <Text className="text-center text-red-500">
        {error || "Failed to load order history"}
      </Text>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-4">
      <View className="flex-row items-center mb-4">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 bg-gray-200 rounded-full"
        >
          <Icon.ChevronLeft width={24} height={24} stroke="black" />
        </TouchableOpacity>
        <Text className="ml-4 text-lg font-semibold">Order History</Text>
      </View>
      {orders.length === 0 ? (
        <Text className="text-center text-lg font-semibold">
          No orders found
        </Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item._id}
          renderItem={renderOrderItem}
        />
      )}
    </SafeAreaView>
  );
};

export default OrderHistoryPage;
