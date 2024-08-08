import React, { useRef, useState, useEffect } from "react";
import {
  Image,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Animated,
  ScrollView,
  ActivityIndicator,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform
} from "react-native";
import { SafeAreaView } from "react-native";
import * as Icon from "react-native-feather";
import { useDispatch, useSelector } from "react-redux";
import { fetchcategory } from "../../store/Slices/categorySlice";
import { FontFamily, FontSize } from "../../GlobalStyles";
import FoodCard from "./FoodCard";
import foodcategory from "./HomeData";
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BASE_URL } from "@env";

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { width: screenWidth } = Dimensions.get("window");
  const aspectRatio = 183 / 402;
  const imageHeight = screenWidth * aspectRatio;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { top, bottom } = useSafeAreaInsets();

  const category = useSelector((state) => state.category.items);
  const categoryStatus = useSelector((state) => state.category.status);
  const categoryError = useSelector((state) => state.category.error);

  useEffect(() => {
    if (categoryStatus === "idle") {
      dispatch(fetchcategory());
    }
  }, [categoryStatus, dispatch]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const handleScrollEnd = ({ nativeEvent }) => {
    const offsetY = nativeEvent.contentOffset.y;
    setIsScrolled(offsetY > 0);
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: "SignIn" }],
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const openSearchModal = () => {
    setIsModalVisible(true);
  };

  const closeSearchModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? top : StatusBar.currentHeight,
        paddingBottom: Platform.OS === "ios" ? 0 : bottom, // Adjust bottom padding here
      }}
      className="bg-white"
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      {/* SearchBar */}
      <View className="flex-row items-center space-x-2 px-4 py-2">
        <TouchableOpacity
          className="flex-row flex-1 bg-[#F4F5F9] items-center p-2 rounded-lg shadow"
          onPress={openSearchModal}
        >
          <Icon.Search height="20" width="20" stroke="gray" />
          <Text className="flex-1 ml-2">What are you craving?</Text>
        </TouchableOpacity>
        <View>
          <Icon.ShoppingCart width="20" height="20" strokeWidth={2} stroke="gray" />
        </View>
      </View>
      {/* Categories */}
      <Animated.ScrollView
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-4 pb-4 space-y-2">
          <View>
            <Image
              source={require("../../assets/images/home/home-slider.png")}
              resizeMode="contain"
              style={{ width: "100%", height: imageHeight }}
              className="rounded-lg w-full"
            />
          </View>
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
                  <View key={item._id} className="items-center">
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
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
        {isScrolled && (
          <View
            className="h-[1px] bg-transparent shadow-lg"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          />
        )}
        {/* Featured */}
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
            {foodcategory.map((item) => (
              <View
                key={item.id}
                className="w-[48%] mb-4 rounded-lg shadow bg-white p-2"
              >
                <FoodCard item={item} />
              </View>
            ))}
          </View>
        </View>
      </Animated.ScrollView>
      {/* Footer */}
      <View className="flex-row justify-around items-center shadow-md bg-white border-t border-gray-200 py-2">
        <TouchableOpacity className="items-center">
          <Icon.Home width={24} height={24} stroke="gray" />
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Icon.User width={22} height={22} stroke="gray" />
        </TouchableOpacity>
      </View>
      {/* Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeSearchModal}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 justify-start bg-black bg-opacity-50">
              <SafeAreaView
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  overflow: 'hidden',
                }}
              >
                <View className="bg-white px-4 py-2 flex-1 rounded-none">
                  <View className="flex-row justify-between items-center">
                    <Text
                      style={{
                        fontFamily: FontFamily.poppinsMedium,
                        fontSize: FontSize.size_lg,
                      }}
                    >
                      Search
                    </Text>
                    <TouchableOpacity onPress={closeSearchModal}>
                      <Icon.X width={24} height={24} stroke="black" />
                    </TouchableOpacity>
                  </View>
                  <View className="flex-row bg-[#F4F5F9] items-center p-2 rounded-lg mt-4">
                    <Icon.Search height="20" width="20" stroke="gray" />
                    <TextInput
                      placeholder="What are you craving?"
                      className="flex-1 ml-2"
                      autoFocus
                    />
                  </View>
                  <View className="mt-4">
                    <Text
                      style={{
                        fontFamily: FontFamily.poppinsSemiBold,
                        fontSize: FontSize.size_md,
                      }}
                    >
                      Recent Searches
                    </Text>
                  </View>
                </View>
              </SafeAreaView>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default Home;
