import React, { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { FontFamily, FontSize } from "../../../GlobalStyles";
import { useDispatch, useSelector } from "react-redux";
import CategoryCard from "./CategoryCard";
import { fetchcategory } from "../../../../shared/store/Slices/categorySlice";

const SearchCategories = () => {
  const dispatch = useDispatch();
  // const foodItems = useSelector((state) => state.foodItem.items);
  // const foodItemsStatus = useSelector((state) => state.foodItem.status);

  const category = useSelector((state) => state.category.items);
  // console.log(category);
  const categoryStatus = useSelector((state) => state.category.status);
  const categoryError = useSelector((state) => state.category.error);


  useEffect(() => {
    if (categoryStatus === "idle") {
      dispatch(fetchcategory());
    }
  }, [categoryStatus, dispatch]);

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
        {category.map((item) => (
          <View
            key={item._id}
            style={{
              width: "22%", // Each card takes roughly 1/4th of the screen width with spacing
            }}
          >
            <CategoryCard category={item} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SearchCategories;
