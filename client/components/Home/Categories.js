import { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FontFamily, FontSize } from "../../GlobalStyles";
import { BASE_URL } from "../../constants/constant";
import { fetchcategory } from "../../store/Slices/categorySlice";
import { useNavigation } from "@react-navigation/native";

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

const Categories = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const category = useSelector((state) => state.category.items);
  const categoryStatus = useSelector((state) => state.category.status);
  const categoryError = useSelector((state) => state.category.error);

  useEffect(() => {
    if (categoryStatus === "idle") {
      dispatch(fetchcategory());
    }
  }, [categoryStatus, dispatch]);

  const handlePress = (id) => {
    navigation.navigate("HomeCategory", { id });
  };

  return (
    <View className="space-y-2">
      <Text
        style={{
          fontFamily: FontFamily.poppinsSemiBold,
          fontSize: FontSize.size_xl,
        }}
      >
        Categories
      </Text>
      {categoryStatus === "loading" ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-4">
          {[...Array(5)].map((_, index) => (
            <View key={index} className="items-center space-y-2">
              <SkeletonLoader style={{ width: 61, height: 62, borderRadius: 31 }} />
              <SkeletonLoader style={{ width: 50, height: 10, borderRadius: 5, marginTop: 5 }} />
            </View>
          ))}
        </ScrollView>
      ) : categoryStatus === "failed" ? (
        <Text>Error: {categoryError}</Text>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className=""
        >
          {category.map((item) => (
            <TouchableOpacity
              onPress={() => handlePress(item._id)}
              key={item._id}
              className="items-center mr-2"
            >
              <Image
                source={{ uri: `${BASE_URL}/uploads/${item.image}` }}
                className="h-[60] w-[60] rounded-full"
                resizeMode="cover"
              />
              <Text
                style={{
                  fontFamily: FontFamily.poppinsMedium,
                  fontSize: FontSize.size_xs,
                }}
              >
                {item.categoryName}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Categories;
