import React from "react";
import { View, Text, Image, TouchableOpacity, Platform } from "react-native";
import { FontFamily, FontSize } from "../../../GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "@env";

const CategoryCard = ({ foodItem }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("FoodItem", { foodItem });
  };

  return (
    <TouchableOpacity style={{ flex: 1 }} className="">
      <View className="bg-white rounded-lg py-2 w-full items-center space-y-1">
        <Image
          source={{ uri: `${BASE_URL}/items_uploads/${foodItem.image}` }}
          style={{ width: "100%", height:72}}
          resizeMode="cover"
          className="rounded-full"
        />
        <View className="w-full items-center">
          <View>
            {/* <Text
              style={{
                fontFamily: FontFamily.poppinsMedium,
                fontSize: FontSize.size_mini,
              }}
              className="text-green-600"
            >
              ${foodItem.itemPrice}
            </Text> */}
          </View>
          <View>
            <Text
              style={{
                fontFamily: FontFamily.poppinsMedium,
                fontSize: FontSize.size_mini,
              }}
              numberOfLines={1}
            >
              {foodItem.itemName}
            </Text>
          </View>
        </View>
        {/* <LinearGradient
          colors={["#007022", "#54d17a", "#bcffd0"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1.9, y: 0 }}
          className="rounded-md w-full"
        >
          <TouchableOpacity className="py-1 justify-center items-center flex-row space-x-1">
            <View
              className="justify-center items-center"
              style={{
                height: FontSize.size_mini * 1.3,
                marginBottom: Platform.OS === "android" ? 2 : 0,
              }}
            >
              <Icon.ShoppingBag width={15} height={15} stroke="white" />
            </View>
            <Text
              className="text-white"
              style={{
                fontFamily: FontFamily.poppinsMedium,
                fontSize: FontSize.size_mini,
              }}
            >
              Add to cart
            </Text>
          </TouchableOpacity>
        </LinearGradient> */}
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
