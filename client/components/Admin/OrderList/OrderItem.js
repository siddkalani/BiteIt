// OrderItem.js
import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

const OrderItem = ({ order, activeTab, actionLoading, updateOrderStatus, handlePaymentDone }) => {
  return (
    <View className="p-4 bg-gray-50 rounded-lg shadow-sm my-2">
      {/* Order Header */}
      <View className="flex-row justify-between">
        <Text className="text-xl font-bold">ID: {order.orderId}</Text>
        {/* Optional: Display order time if available */}
        {/* <Text className="text-gray-500">{order.time}</Text> */}
      </View>
      <Text className="text-sm text-blue-500">1st order by {order.userName}</Text>

      {/* Order Items */}
      {order.items.map((item) => (
        <View key={item.itemId} className="flex-row justify-between mt-2">
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
          <Text className="text-sm text-gray-500">Set food preparation time</Text>
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
              disabled={actionLoading}
            >
              {actionLoading ? (
                <ActivityIndicator size="small" color="#FF0000" />
              ) : (
                <Text className="text-red-500 text-center">Reject</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => updateOrderStatus(order._id, "Preparing")}
              className="flex-1 bg-yellow-400 rounded-lg py-2"
              disabled={actionLoading}
            >
              {actionLoading ? (
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
            disabled={actionLoading}
          >
            {actionLoading ? (
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
            disabled={actionLoading}
          >
            {actionLoading ? (
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
                onPress={() => handlePaymentDone(order._id)}
                className="bg-green-500 p-2 rounded-lg"
                disabled={actionLoading}
              >
                {actionLoading ? (
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
  );
};

export default OrderItem;
