import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontFamily, FontSize } from "../../../GlobalStyles";
import * as Icon from "react-native-feather";
import { BASE_URL } from "@env";
import { BlurView } from "expo-blur";

const FoodItem = () => {
  const { top, bottom } = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  const { foodItem } = route.params || {};
  const [quantity, setQuantity] = useState(1);

  if (!foodItem) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No food item data available</Text>
      </View>
    );
  }

  const handlePress = () => {
    // navigation.navigate("Home");
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };

  return (

    <View
      className="flex-1"
    // style={{
    //   paddingTop: Platform.OS === "ios" ? top : StatusBar.currentHeight,
    //   paddingBottom: Platform.OS === "ios" ? 0 : bottom,
    // }}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <View className="flex-1">
        <View className="w-full h-full">
          <Image
            source={{ uri: `${BASE_URL}/items_uploads/${foodItem.image}` }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <BlurView
            intensity={40}
            tint="dark"
            style={{
              position: "absolute",
              top: top + 10, // Adjusted to place the button below the safe area
              left: 16,
              width: 40, // Adjust the size as needed
              height: 40,
              borderRadius: 24, // Ensure this is half of the width/height to make it circular
              overflow: "hidden", // Ensures content stays within the rounded BlurView
              justifyContent: "center", // Center the content
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={handlePress} style={{ padding: 2 }}>
              <Ionicons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>
          </BlurView>
        </View>

      </View>
      <LinearGradient colors={["#d4f4d1", "#ffffff"]} className="flex-1">
        <View className="flex-1 rounded-t-2xl">
          <View className="space-y-3 px-4 py-2 flex-1 rounded-t-2xl justify-between">
            <View className=''>
              <View className="flex-row items-center justify-between">
                <Text
                  className="text-[#54D17A]"
                  style={{
                    fontFamily: FontFamily.poppinsSemiBold,
                    fontSize: FontSize.size_11xl,
                  }}
                >
                  ${foodItem.itemPrice}
                </Text>
                <Icon.Heart width={24} height={24} stroke="black" />
              </View>
              <Text
                className="mt-[-2]"
                style={{
                  fontFamily: FontFamily.poppinsSemiBold,
                  fontSize: FontSize.size_11xl,
                }}
              >
                {foodItem.itemName}
              </Text>
              <View>
                <Text
                  style={{
                    fontFamily: FontFamily.poppinsRegular,
                    fontSize: FontSize.size_mini,
                  }}
                >
                  {foodItem.itemIncredients || "No description available."}
                </Text>
              </View>
            </View>
            <View className='space-y-2 mb-4'>
              <View className="flex-row items-center justify-between bg-white rounded-lg py-2 px-3">
                <Text className="text-gray-500 text-lg font-semibold">
                  Quantity
                </Text>
                <View className="flex-row items-center">
                  <TouchableOpacity
                    onPress={decreaseQuantity}
                    className="w-8 h-8 justify-center items-center"
                  >
                    <Icon.Minus stroke="green" />
                  </TouchableOpacity>
                  <View className="w-12 items-center justify-center">
                    <Text
                      className="text-xl font-semibold"
                      numberOfLines={1}
                      adjustsFontSizeToFit
                    >
                      {quantity}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={increaseQuantity}
                    className="w-8 h-8 justify-center items-center"
                  >
                    <Icon.Plus stroke="green" />
                  </TouchableOpacity>
                </View>
              </View>
              <LinearGradient
                colors={["#007022", "#54d17a", "#bcffd0"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1.9, y: 0 }}
                className="rounded-xl"
              >
                <TouchableOpacity
                  className="flex-row space-x-2 p-3 justify-center items-center"
                  onPress={handlePress}
                >
                  <Icon.ShoppingBag width={20} height={20} stroke="white" />
                  <Text
                    className="text-white"
                    style={{
                      fontFamily: FontFamily.poppinsSemiBold,
                      fontSize: FontSize.size_lg,
                    }}
                  >
                    Add to cart
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>

  );
};

export default FoodItem;
