// SearchBar.js
import React from "react";
import { View, TextInput } from "react-native";
import * as Icon from "react-native-feather";
import OrderItem from "../OrderList/OrderItem";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  
  return (
    <View className="flex-row items-center space-x-2 mt-2 bg-gray-100 rounded-lg p-3 shadow-3">
      <Icon.Search height={20} width={20} stroke="gray" />
      <TextInput
        placeholder="Search for Order ID"
        value={searchQuery}
        onChangeText={setSearchQuery}
        className="flex-1 ml-2"
        keyboardType="default"
        autoCapitalize="none"
      />
    </View>
  );
};

export default SearchBar;
