import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import { FontFamily, FontSize } from "../../../GlobalStyles";
import { BASE_URL } from "@env";

const SearchCategories = ({ categories }) => {
  const renderCategoryItem = ({ item }) => (
    <View
      className="w-1/3 p-2"
      style={{ alignItems: "center" }}
    >
      <View
        className="bg-white rounded-lg shadow w-full py-1"
        style={{
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 3,
        }}
      >
        <Image
          source={{ uri: `${BASE_URL}/uploads/${item.image}` }}
          className="w-16 h-16 rounded-lg"
          style={{ resizeMode: "cover" }}
        />
        <Text
          style={{
            fontFamily: FontFamily.poppinsMedium,
            fontSize: FontSize.size_md,
          }}
        >
          {item.categoryName}
        </Text>
      </View>
    </View>
  );

  return (
    <View className="mt-4">
      <Text
        style={{
          fontFamily: FontFamily.poppinsSemiBold,
          fontSize: FontSize.size_md,
        }}
      >
        Categories
      </Text>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={{ paddingBottom: 10 }}
      />
    </View>
  );
};

export default SearchCategories;
