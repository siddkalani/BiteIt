import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontFamily, FontSize } from "../../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../../constants/constant";

const CategoryCard = ({ category, closeSearchModal }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    // Navigate to HomeCategory immediately
    navigation.navigate("HomeCategory", { id: category._id });

    // Then close the modal (ensures a smoother animation)
    if (closeSearchModal) {
      closeSearchModal();
    }
  };

  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={handlePress}>
      <View className="bg-white rounded-lg mt-4 w-full items-center">
        <Image
          source={{ uri: `${BASE_URL}/uploads/${category.image}` }}
          className="w-full h-[90px] rounded-lg"
          resizeMode="cover"
        />
        <Text
          className="text-center w-full mt-1"
          style={{
            fontFamily: FontFamily.poppinsMedium,
            fontSize: FontSize.size_mini,
          }}
          numberOfLines={1}
        >
          {category.categoryName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
