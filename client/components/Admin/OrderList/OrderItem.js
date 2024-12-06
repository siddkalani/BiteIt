import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

const OrderItem = ({
  order,
  activeTab,
  isSelected,
  toggleSelectOrder,
  updateOrderStatus,
  handlePaymentDone,
}) => {
  const [buttonLoading, setButtonLoading] = useState(null);

  const handleButtonPress = async (status) => {
    setButtonLoading(status);
    try {
      await updateOrderStatus(order._id, status);
    } finally {
      setButtonLoading(null);
    }
  };

  const handlePaymentPress = async () => {
    setButtonLoading("Payment");
    try {
      await handlePaymentDone(order._id);
    } finally {
      setButtonLoading(null);
    }
  };

  const {
    orderId = "N/A",
    userName = "Unknown",
    deliverTo = "Not available",
    orderPlacedAt,
    deliveredAt,
    items = [],
    totalAmount = 0,
    payment = 0,
  } = order;

  const formatDateTime = (date) => new Date(date).toLocaleString();

  return (
    <View className="p-4 bg-gray-100 rounded-lg shadow-sm mb-2">
      {/* Header with Checkbox */}
      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-bold">ID: {String(orderId).padStart(2, "0")}</Text>
        {/* Custom Checkbox */}
        <TouchableOpacity
          onPress={() => toggleSelectOrder(order._id)}
          className={`w-6 h-6 border rounded flex items-center justify-center ${
            isSelected ? "bg-green-500 border-green-500" : "bg-white border-gray-400"
          }`}
        >
          {isSelected && <Text className="text-white font-bold">✓</Text>}
        </TouchableOpacity>
      </View>
      <Text className="text-sm text-blue-500 mt-2">1st order by {userName}</Text>
      <Text className="text-sm text-blue-500">Delivery Location: {deliverTo}</Text>

      {/* Conditional Date/Time */}
      {activeTab === "Pending" && orderPlacedAt && (
        <Text className="text-sm text-gray-600 mt-2">
          Placed on: {formatDateTime(orderPlacedAt)}
        </Text>
      )}
      {activeTab === "PickedUp" && deliveredAt && (
        <Text className="text-sm text-gray-600 mt-2">
          Delivered At: {formatDateTime(deliveredAt)}
        </Text>
      )}

      {/* Order Items */}
      {items.map((item) => (
        <View key={item.itemId} className="flex-row justify-between mt-2">
          <Text className="text-base">
            {item.itemQuantity} x {item.itemName}
          </Text>
        </View>
      ))}

      {/* Total */}
      <View className="flex-row justify-between mt-2">
        <Text className="text-base font-bold">Total Bill</Text>
        <Text className="text-base font-bold">₹{totalAmount}</Text>
      </View>

      {/* Action Buttons */}
      <View className="flex-row justify-between mt-4">
        {activeTab === "Pending" && (
          <>
            <TouchableOpacity
              onPress={() => handleButtonPress("Rejected")}
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
              onPress={() => handleButtonPress("Preparing")}
              className="flex-1 bg-yellow-400 rounded-lg py-2"
              disabled={buttonLoading === "Preparing"}
            >
              {buttonLoading === "Preparing" ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text className="text-white text-center">Accept</Text>
              )}
            </TouchableOpacity>
          </>
        )}
        {activeTab === "Preparing" && (
          <TouchableOpacity
            onPress={() => handleButtonPress("Ready")}
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
            onPress={() => handleButtonPress("Delivered")}
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
                payment === 1 ? "text-green-500" : "text-red-500"
              }`}
            >
              {payment === 1 ? "Payment Done" : "Pending Payment"}
            </Text>
            {payment !== 1 && (
              <TouchableOpacity
                onPress={handlePaymentPress}
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
