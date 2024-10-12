import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontFamily, FontSize } from "../../../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "@env";

const CategoryCard = ({ foodItem }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("FoodItem", { foodItem });
  };

  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={handlePress}>
      <View className="bg-white rounded-lg mt-4 w-full items-center">
        <Image
          source={{ uri: `${BASE_URL}/items_uploads/${foodItem.image}` }}
          className="w-full h-[90px] rounded-lg" // Use Tailwind for the circle image
          resizeMode="cover"
        />
        <Text
          className="text-center w-full mt-1" // Center the text and add margin
          style={{
            fontFamily: FontFamily.poppinsMedium,
            fontSize: FontSize.size_mini,
          }}
          numberOfLines={1}
        >
          {foodItem.itemName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
