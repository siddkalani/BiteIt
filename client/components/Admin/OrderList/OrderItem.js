import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

const OrderItem = ({ order, activeTab, updateOrderStatus, handlePaymentDone }) => {
  // State to manage loading for specific buttons
  const [buttonLoading, setButtonLoading] = useState(null);

  // Wrapper to handle button presses with loading states
  const handleButtonPress = async (orderId, status) => {
    setButtonLoading(status); // Set loading for the specific action
    try {
      await updateOrderStatus(orderId, status); // Execute the update action
    } finally {
      setButtonLoading(null); // Reset the loading state
    }
  };

  const handlePaymentPress = async (orderId) => {
    setButtonLoading("Payment");
    try {
      await handlePaymentDone(orderId); // Handle payment action
    } finally {
      setButtonLoading(null);
    }
  };
  // console.log(order);

  return (
    <View className="p-4 bg-gray-50 rounded-lg shadow-sm my-2">
      {/* Order Header */}
      <View className="flex-row justify-between">
      <Text className="text-xl font-bold">ID: {String(order.orderId).padStart(2, "0")}</Text>
      </View>
      <Text className="text-sm text-blue-500">1st order by {order.userName}</Text>
      <Text className="text-sm text-blue-500"> Delivery Location: {order.deliverTo || 'Not available'}</Text>
      <View className="mt-2">
  
  {/* Conditional Time Display */}
  <View className="mt-2">
        {activeTab === "Pending" && (
          <Text className="text-sm text-gray-500">
            Placed on: {new Date(order.orderPlacedAt).toLocaleDateString()} at {new Date(order.orderPlacedAt).toLocaleTimeString()}
          </Text>
        )}
        {activeTab === "PickedUp" && order.deliveredAt && !isNaN(new Date(order.deliveredAt)) ? (
    <Text className="text-sm text-gray-500">
      Delivered At: {new Date(order.deliveredAt).toLocaleDateString()} at {new Date(order.deliveredAt).toLocaleTimeString()}
    </Text>
  ) : (
    <Text className="text-sm text-gray-500">Delivery time not available</Text>
  )}
</View>

</View>
      {/* Order Items */}
      {order.items.map((item) => (
        <View key={item.itemId} className="flex-row justify-between mt-2">
          <Text className="text-base">
            {item.itemQuantity} x {item.itemName}
          </Text>
        </View>
      ))}


      {/* Total Bill */}
      <View className="flex-row justify-between mt-2">
        <Text className="text-base font-bold">Total Bill</Text>
        <Text className="text-base font-bold">₹{order.totalAmount}</Text>
        
      </View>

      {/* Action Buttons */}
      <View className="flex-row justify-between mt-4">
        {activeTab === "Pending" && (
          <>
            <TouchableOpacity
              onPress={() => handleButtonPress(order._id, "Rejected")}
              className="flex-1 bg-red-100 rounded-lg py-2 mr-2"
              disabled={buttonLoading === "Rejected"}
            >
              {buttonLoading === "Rejected" ? (
                <ActivityIndicator size="small" color="#FF0000" />
              ) : (
                <Text className="text-red-500 text-center">Reject</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleButtonPress(order._id, "Preparing")}
              className="flex-1 bg-yellow-400 rounded-lg py-2"
              disabled={buttonLoading === "Preparing"}
            >
              {buttonLoading === "Preparing" ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text className="text-center text-white">Accept</Text>
              )}
            </TouchableOpacity>
          </>
        )}

        {activeTab === "Preparing" && (
          <TouchableOpacity
            onPress={() => handleButtonPress(order._id, "Ready")}
            className="bg-yellow-500 p-2 rounded-lg flex-1"
            disabled={buttonLoading === "Ready"}
          >
            {buttonLoading === "Ready" ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text className="text-white text-center">Order Ready</Text>
            )}
          </TouchableOpacity>
        )}

        {activeTab === "Ready" && (
          <TouchableOpacity
            onPress={() => handleButtonPress(order._id, "Delivered")}
            className="bg-green-500 p-2 rounded-lg flex-1"
            disabled={buttonLoading === "Delivered"}
          >
            {buttonLoading === "Delivered" ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text className="text-white text-center">Order Picked Up</Text>
            )}
          </TouchableOpacity>
        )}

        {activeTab === "PickedUp" && (
          <>
            <Text
              className={`text-base font-bold ${
                order.payment === 1 ? "text-green-500" : "text-red-500"
              }`}
            >
              {order.payment === 1 ? "Payment Done" : "Pending Payment"}
            </Text>
            {order.payment !== 1 && (
              <TouchableOpacity
                onPress={() => handlePaymentPress(order._id)}
                className="bg-green-500 p-2 rounded-lg"
                disabled={buttonLoading === "Payment"}
              >
                {buttonLoading === "Payment" ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text className="text-white text-center">Payment Done</Text>
                )}
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default OrderItem;
