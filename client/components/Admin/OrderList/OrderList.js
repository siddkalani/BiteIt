// // OrderList.js
// import React from "react";
// import { View, ScrollView, ActivityIndicator, Image, Text } from "react-native";
// import OrderItem from "./OrderItem";
// import EmptyState from "../EmptyState/EmptyState";

// const OrderList = ({ loading, orders, activeTab, actionLoading, updateOrderStatus, handlePaymentDone }) => {
//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center mt-10">
//         <ActivityIndicator size="large" color="#309624" />
//       </View>
//     );
//   }

//   if (orders.length === 0) {
//     return <EmptyState activeTab={activeTab} />;
//   }

//   return (
//     <ScrollView showsVerticalScrollIndicator={false}>
//       {orders.map((order) => (
//         <OrderItem
//           key={order._id}
//           order={order}
//           activeTab={activeTab}
//           actionLoading={actionLoading[order._id]}
//           updateOrderStatus={updateOrderStatus}
//           handlePaymentDone={handlePaymentDone}
//         />
//       ))}
//     </ScrollView>
//   );
// };

// export default OrderList;

import React, { useState } from "react";
import { View, ScrollView, Button, Text, TouchableOpacity } from "react-native";
import OrderItem from "./OrderItem";
import EmptyState from "../EmptyState/EmptyState";

const OrderList = ({
  loading = false,
  orders = [],
  activeTab = "Pending",
  actionLoading = {},
  updateOrderStatus,
  handlePaymentDone,
}) => {
  const [selectedOrders, setSelectedOrders] = useState([]);

  const toggleSelectOrder = (orderId) => {
    setSelectedOrders((prevSelected) =>
      prevSelected.includes(orderId)
        ? prevSelected.filter((id) => id !== orderId)
        : [...prevSelected, orderId]
    );
  };

  const handleBulkAction = (action) => {
    if (selectedOrders.length === 0) {
      alert("No orders selected!");
      return;
    }
    if (selectedOrders.length > 10) {
      alert("You can select up to 10 orders at a time!");
      return;
    }
    selectedOrders.forEach((orderId) => {
      updateOrderStatus(orderId, action);
    });
    setSelectedOrders([]); // Clear selection after action
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center mt-10">
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!orders.length) {
    return <EmptyState activeTab={activeTab} />;
  }

  return (
    <View className="flex-1 mt-2">
      <ScrollView showsVerticalScrollIndicator={false}>
        {orders.map((order) => (
          <OrderItem
            key={order._id}
            order={order}
            activeTab={activeTab}
            isSelected={selectedOrders.includes(order._id)}
            toggleSelectOrder={toggleSelectOrder}
            actionLoading={actionLoading[order._id]}
            updateOrderStatus={updateOrderStatus}
            handlePaymentDone={handlePaymentDone}
          />
        ))}
      </ScrollView>
      {/* Bulk Action Buttons */}
      <View className="flex-row justify-around p-4 bg-gray-100">
        <TouchableOpacity
          onPress={() => handleBulkAction("Accepted")}
          className="bg-green-500 px-4 py-2 rounded"
        >
          <Text className="text-white">Accept Selected</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleBulkAction("Rejected")}
          className="bg-red-500 px-4 py-2 rounded"
        >
          <Text className="text-white">Reject Selected</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderList;
