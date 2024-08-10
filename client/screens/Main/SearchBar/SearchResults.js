import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { FontFamily, FontSize } from "../../../GlobalStyles";
import { BASE_URL } from "@env";
import { useNavigation } from "@react-navigation/native";

const SearchResults = ({ searchResults }) => {
  const navigation = useNavigation();

  const handleAddToCartPress = (item) => {
    navigation.navigate("FoodItem", { foodItem: item });
  };

  const renderItem = ({ item }) => (
    <View
      className="bg-white p-4 mt-2 rounded-lg shadow flex-row justify-between items-center"
      style={{ flexDirection: "row", marginVertical: 8 }}
    >
      <View className="flex-row items-center">
        <Image
          source={{ uri: `${BASE_URL}/items_uploads/${item.image}` }}
          className="w-16 h-16 rounded-lg mr-3"
          style={{ resizeMode: "contain" }}
        />
        <View>
          <Text
            style={{
              fontFamily: FontFamily.poppinsMedium,
              fontSize: FontSize.size_md,
            }}
          >
            {item.itemName}
          </Text>
          <Text
            style={{
              fontFamily: FontFamily.poppinsRegular,
              fontSize: FontSize.size_sm,
              color: "#888", // Light grey color for the price text
            }}
          >
            ${item.itemPrice}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        className="bg-blue-500 p-2 rounded-lg"
        style={{ marginLeft: 10 }}
        onPress={() => handleAddToCartPress(item)}
      >
        <Text
          style={{
            color: "white",
            fontFamily: FontFamily.poppinsMedium,
            fontSize: FontSize.size_sm,
          }}
        >
          Add to Cart
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1">
      {searchResults.length === 0 ? (
        <Text
          style={{
            fontFamily: FontFamily.poppinsRegular,
            fontSize: FontSize.size_md,
            color: "#888", // Light grey color for the "No items found" text
            textAlign: "center",
            marginTop: 20,
          }}
        >
          No items found
        </Text>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 10 }}
        />
      )}
    </View>
  );
};

export default SearchResults;
