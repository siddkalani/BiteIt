// OrderList.js
import React from "react";
import { View, ScrollView, ActivityIndicator, Image, Text } from "react-native";
import OrderItem from "./OrderItem";
import EmptyState from "../EmptyState/EmptyState";

const OrderList = ({ loading, orders, activeTab, actionLoading, updateOrderStatus, handlePaymentDone }) => {
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center mt-10">
        <ActivityIndicator size="large" color="#309624" />
      </View>
    );
  }

  if (orders.length === 0) {
    return <EmptyState activeTab={activeTab} />;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {orders.map((order) => (
        <OrderItem
          key={order._id}
          order={order}
          activeTab={activeTab}
          actionLoading={actionLoading[order._id]}
          updateOrderStatus={updateOrderStatus}
          handlePaymentDone={handlePaymentDone}
        />
      ))}
    </ScrollView>
  );
};

export default OrderList;

