// Tabs.js
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

const Tabs = ({ activeTab, setActiveTab, pendingCount, preparingCount, readyCount, pickedUpCount }) => {
  const tabs = [
    { name: "Pending", count: pendingCount },
    { name: "Preparing", count: preparingCount },
    { name: "Ready", count: readyCount },
    { name: "PickedUp", count: pickedUpCount },
  ];

  return (
    <View className="flex-row justify-between space-x-2">
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          onPress={() => setActiveTab(tab.name)}
          className={`flex-1 items-center px-1 py-2 ${
            activeTab === tab.name ? "bg-yellow-200" : "bg-gray-100"
          } rounded-lg`}
        >
          <Text numberOfLines={1} className="text-gray-400">
            {tab.name === "PickedUp" ? "Picked Up" : tab.name} ({tab.count})
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Tabs;
