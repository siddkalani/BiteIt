import React, { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { FontFamily, FontSize } from "../../../GlobalStyles";
import { useDispatch, useSelector } from "react-redux";
import CategoryCard from "./CategoryCard";

const SearchCategories = () => {
  const dispatch = useDispatch();
  const foodItems = useSelector((state) => state.foodItem.items);
  const foodItemsStatus = useSelector((state) => state.foodItem.status);

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
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row", // Arrange items in a row
          flexWrap: "wrap", // Wrap items to the next line when the row is filled
          justifyContent: "space-between", // Distribute space between items
        }}
        showsVerticalScrollIndicator={false} // Hide vertical scroll bar
      >
        {foodItems.map((item) => (
          <View
            key={item._id}
            style={{
              width: "22%", // Each card takes roughly 1/4th of the screen width with spacing
            }}
          >
            <CategoryCard foodItem={item} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SearchCategories;
