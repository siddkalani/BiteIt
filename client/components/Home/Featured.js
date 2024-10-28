import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import FoodCard from "./FoodCard";
import { FontFamily, FontSize } from "../../GlobalStyles";
import { fetchFoodItems } from "../../store/Slices/foodItemSlice";

// SkeletonLoader Component
const SkeletonLoader = ({ style }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return <Animated.View style={[{ backgroundColor: "#E1E9EE", opacity }, style]} />;
};

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
          <View className="flex-row flex-wrap justify-between">
            {[...Array(6)].map((_, index) => (
              <View
                key={index}
                className="w-[48%] mb-4 p-2 rounded-lg"
                style={{ backgroundColor: "white" }}
              >
                <SkeletonLoader style={{ height: 120, borderRadius: 8 }} /> 
                <SkeletonLoader style={{ height: 20, width: "60%", marginTop: 8, borderRadius: 4 }} /> 
                <SkeletonLoader style={{ height: 15, width: "40%", marginTop: 4, borderRadius: 4 }} />
              </View>
            ))}
          </View>
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
