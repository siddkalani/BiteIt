import React, { useRef, useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import FoodCard from "../FoodItem/FoodCard";
import { FontFamily, FontSize } from "../../../GlobalStyles";
import { fetchFoodItems } from "../../../store/Slices/foodItemSlice";

const Featured = () => {
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
    <View className="px-4 py-2 space-y-2 flex-1 bg-[#F4F5F9]">
      <Text
        style={{
          fontFamily: FontFamily.poppinsSemiBold,
          fontSize: FontSize.size_xl,
        }}
      >
        Menu
      </Text>
      <View className="flex-1 justify-center items-center">
        {foodItemsStatus === "loading" ? (
          <ActivityIndicator size="large" color="#007022" />
        ) : foodItemsStatus === "failed" ? (
          <Text>Error: {foodItemsError}</Text>
        ) : (
          <View className="flex-row flex-wrap justify-between">
            {foodItems.map((foodItem) => (
              <View
                key={foodItem._id}
                className="w-[48%] mb-4 rounded-lg shadow bg-white p-2"
              >
                <FoodCard foodItem={foodItem} />
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default Featured;
