import { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FontFamily, FontSize } from "../../../GlobalStyles";
import { BASE_URL } from "@env";
import { fetchcategory } from "../../../store/Slices/categorySlice";
import { useNavigation } from "@react-navigation/native";

const Categories = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const category = useSelector((state) => state.category.items);
  // console.log(category);
  const categoryStatus = useSelector((state) => state.category.status);
  const categoryError = useSelector((state) => state.category.error);

  useEffect(() => {
    if (categoryStatus === "idle") {
      dispatch(fetchcategory());
    }
  }, [categoryStatus, dispatch]);

  const handlePress = (id) => {
    navigation.navigate("HomeCategory", { id }); // Pass categoryId to HomeCategory
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
        <ActivityIndicator size="large" color="#007022" />
      ) : categoryStatus === "failed" ? (
        <Text>Error: {categoryError}</Text>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="space-x-4"
        >
          {category.map((item) => (
            <TouchableOpacity
              onPress={() => handlePress(item._id)}
              key={item._id}
              className="items-center"
            >
              <Image
                source={{ uri: `${BASE_URL}/uploads/${item.image}` }}
                className="h-[62] w-[61] rounded-full"
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
