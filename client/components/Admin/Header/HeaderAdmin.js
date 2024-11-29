// Header.js
import React from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import * as Icon from "react-native-feather";

const Header = ({ isOnline, toggleOnlineStatus, handleLogout }) => {
  return (
    <View className="flex-row items-center justify-between h-8 mb-2">
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
        <TouchableOpacity onPress={handleLogout}>
          <Icon.LogOut height={24} width={24} stroke="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
