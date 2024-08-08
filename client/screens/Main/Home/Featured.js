import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import FoodCard from "./FoodCard";
import { FontFamily, FontSize } from "../../../GlobalStyles";

const Featured = () => {
    const foodItems = useSelector((state) => state.foodItem.items);
    const foodItemsStatus = useSelector((state) => state.foodItem.status);
    const foodItemsError = useSelector((state) => state.foodItem.error);

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
            <View className="flex-row flex-wrap justify-between">
                {foodItemsStatus === "loading" ? (
                    <ActivityIndicator size="large" color="#007022" />
                ) : foodItemsStatus === "failed" ? (
                    <Text>Error: {foodItemsError}</Text>
                ) : (
                    foodItems.map((foodItem) => (
                        <View
                            key={foodItem._id}
                            className="w-[48%] mb-4 rounded-lg shadow bg-white p-2"
                        >
                            <FoodCard foodItem={foodItem} />
                        </View>
                    ))
                )}
            </View>
        </View>
    );
};

export default Featured;
