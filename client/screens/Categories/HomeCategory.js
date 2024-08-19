
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Pressable,
  Animated,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontFamily, FontSize } from "../../GlobalStyles";
import { BlurView } from "expo-blur";
import { BASE_URL } from "@env";

const HEADER_HEIGHT = 300; // Adjust this value as needed

const HomeCategory = () => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = route.params; // Get the categoryId from route params
  const scrollY = new Animated.Value(0);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await fetch(`${BASE_URL}/category/get/${id}`);
        const data = await response.json();
        
        // Check the data structure
        // console.log("Fetched Data:", data);
        
        if (data.foodItems) {
          setFoodItems(data.foodItems);
        } else {
          setError("No food items found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchFoodItems();
  }, [id]);
  

  const handlePress = () => {
    navigation.navigate("Home");
  };

  const renderFoodItem = (item) => (
    <View
      key={item._id}
      className="bg-white rounded-lg shadow-sm flex-row items-center mb-4 p-3"
    >
      <Image
        source={{ uri: `${BASE_URL}/items_uploads/${item.image}` }} // Adjust image path if needed
        className="h-14 w-14 rounded-full"
        resizeMode="cover"
      />
      <View className="flex-1 ml-4">
        <Text className="text-lg font-semibold">{item.itemName}</Text>
        <Text className="text-green-500">{item.itemPrice}</Text>
      </View>
      <LinearGradient
        colors={["#007022", "#54d17a", "#bcffd0"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1.9, y: 0 }}
        className="rounded-xl"
      >
        <Pressable
          className="px-4 py-2 justify-center items-center"
          onPress={handlePress}
        >
          <Text
            className="text-white"
            style={{
              fontFamily: FontFamily.poppinsRegular,
              fontSize: FontSize.size_mini,
            }}
          >
            Add
          </Text>
        </Pressable>
      </LinearGradient>
    </View>
  );

  return (
    <View className="flex-1">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Fixed Image Section */}
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: HEADER_HEIGHT,
          zIndex: 0,
        }}
      >
        <Image
          source={require("../../assets/images/signIn/signIn.png")}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </Animated.View>

      {/* Fixed Back Button */}
      <BlurView
        intensity={40}
        tint="dark"
        style={{
          position: "absolute",
          top: top + 10,
          left: 16,
          width: 40,
          height: 40,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          zIndex: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ padding: 2 }}
        >
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
      </BlurView>

      {/* Scrollable Content */}
      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* Food Items Section */}
        <View
          style={{
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingTop: 24,
            paddingHorizontal: 16,
            backgroundColor: "#F4F5F9",
            minHeight: "100%",
            marginTop: -28,
          }}
        >
          <View className="space-y-2">
            <Text
              style={{
                fontFamily: FontFamily.poppinsSemiBold,
                fontSize: FontSize.size_xl,
              }}
            >
              Food Items
            </Text>
            <View>
              {loading ? (
                <ActivityIndicator size="large" color="#007022" />
              ) : error ? (
                <Text>Error: {error}</Text>
              ) : (
                foodItems.map(renderFoodItem)
              )}
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default HomeCategory;
