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
  Alert,
  Modal,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native";
import * as Icon from "react-native-feather";
import { useDispatch, useSelector } from "react-redux";
import { fetchcategory } from "../../store/Slices/categorySlice";
import { fetchFoodItems } from "../../store/Slices/foodItemSlice";
import { FontFamily, FontSize } from "../../GlobalStyles";
// import foodcategory from "./HomeData";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BASE_URL } from "@env";
import Categories from "./Home/Categories";
import Featured from "./Home/Featured";
import Footer from "./Home/Footer";

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

  // const category = useSelector((state) => state.category.items);
  const categoryStatus = useSelector((state) => state.category.status);
  // const categoryError = useSelector((state) => state.category.error);

  const foodItems = useSelector((state) => state.foodItem.items);
  const foodItemsStatus = useSelector((state) => state.foodItem.status);
  const foodItemsError = useSelector((state) => state.foodItem.error);

  useEffect(() => {
    if (categoryStatus === "idle") {
      dispatch(fetchcategory());
    }
    if (foodItemsStatus === "idle") {
      dispatch(fetchFoodItems());
    }
  }, [categoryStatus, foodItemsStatus, dispatch]);

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
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
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
          <Icon.ShoppingCart
            width="20"
            height="20"
            strokeWidth={2}
            stroke="gray"
          />
        </View>
      </View>
      {/* scroll start */}
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
          <Categories />
        </View>
        {/* Featured */}
        <Featured/>
      </Animated.ScrollView>
      {/* Footer */}
      <Footer/>
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
                  backgroundColor: "white",
                  overflow: "hidden",
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
