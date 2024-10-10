import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontFamily, FontSize } from "../../../GlobalStyles";
import { BASE_URL } from "@env";
import { LinearGradient } from "expo-linear-gradient";
import { Platform } from "react-native";
import * as Icon from "react-native-feather";
import { useDispatch, useSelector } from "react-redux";
import FoodCard from "../FoodItem/FoodCard";
import CategoryCard from "./CategoryCard";

const SearchCategories = () => {
  const dispatch = useDispatch();

  const foodItems = useSelector((state) => state.foodItem.items);
  const foodItemsStatus = useSelector((state) => state.foodItem.status);
  const foodItemsError = useSelector((state) => state.foodItem.error);

  useEffect(() => {
    if (foodItemsStatus === "idle") {
      dispatch(fetchFoodItems());
    }
  }, [foodItemsStatus, dispatch]);

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
        data={foodItems}
        renderItem={({ item }) => (
          <View className="w-[22%] bg-white">
            <CategoryCard foodItem={item}/>
          </View>
        )}
        keyExtractor={(item) => item._id}
        numColumns={4} // Display items in two columns
        columnWrapperStyle={{ justifyContent: "space-between" }} // Ensure spacing between columns
        contentContainerStyle={{ paddingBottom: 10 }} // Extra padding at the bottom
        showsVerticalScrollIndicator={false} // Hide the vertical scroll indicator
      />
    </View>
  );
};

export default SearchCategories;
