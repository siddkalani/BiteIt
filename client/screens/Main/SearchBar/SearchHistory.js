import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import * as Icon from "react-native-feather";
import { FontFamily, FontSize } from "../../../GlobalStyles";
import { BASE_URL } from "@env";

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
            className="p-2.5 mt-2 rounded-lg shadow flex-row justify-between items-center bg-slate-100"
            style={{
              width: "98%",
              alignSelf: "center",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 3,
            }}
          >
            <View className="flex-row items-center">
              <Image
                source={{ uri: `${BASE_URL}/items_uploads/${item.image}` }} // Ensure item.image is a valid URL or path
                className="w-14 h-12 rounded-md mr-3"
                style={{ resizeMode: "cover" }}
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
              <Icon.X width={20} height={20} stroke="gray" strokeWidth={3} />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default SearchHistory;
