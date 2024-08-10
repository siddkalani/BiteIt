// SearchHistory.js
import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import * as Icon from "react-native-feather";
import { FontFamily, FontSize } from "../../../GlobalStyles";

const SearchHistory = ({ searchHistory, removeSearchItem }) => {
  return (
    <View className="mt-4">
      <Text
        style={{
          fontFamily: FontFamily.poppinsSemiBold,
          fontSize: FontSize.size_md,
        }}
      >
        Recent Searches
      </Text>
      <FlatList
        data={searchHistory}
        renderItem={({ item }) => (
          <View
            className="bg-white p-4 mt-2 rounded-lg shadow flex-row justify-between items-center"
            style={{
              width: "98%",
              alignSelf: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 3,
            }}
          >
            <View className="flex-row items-center">
              <Image
                source={item.image}
                className="w-7 h-7 rounded-lg mr-3"
                style={{ resizeMode: "contain" }}
              />
              <Text
                style={{
                  fontFamily: FontFamily.poppinsMedium,
                  fontSize: FontSize.size_md,
                }}
              >
                {item.name}
              </Text>
            </View>
            <TouchableOpacity onPress={() => removeSearchItem(item.name)}>
              <Icon.X width={20} height={20} stroke="red" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 10 }}
      />
    </View>
  );
};

export default SearchHistory;
