import React, { useRef, useState, useEffect } from "react";
import {
  Image,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar as RNStatusBar,
  Animated,
  ScrollView,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";
import * as Icon from "react-native-feather";
import { useDispatch, useSelector } from "react-redux";
import { fetchcategory } from "../../store/Slices/categorySlice";
import { FontFamily, FontSize } from "../../GlobalStyles";
import FoodCard from "./FoodCard";
import foodcategory from "./HomeData";
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { width: screenWidth } = Dimensions.get("window");
  const aspectRatio = 183 / 402;
  const imageHeight = screenWidth * aspectRatio;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    // Clear any user authentication data here
    // Example: Clear token from async storage or state management
    // await AsyncStorage.removeItem('userToken');
    
    // Show confirmation or directly navigate based on your requirements
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Logout',
          onPress: () => {
            // Navigate to SignIn page and clear the navigation stack
            navigation.reset({
              index: 0,
              routes: [{ name: 'SignIn' }],
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
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
      }}
      className="bg-[#ffffff]"
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      {/* search bar */}
      <View className="flex-row items-center space-x-2 px-4 py-4">
        <View className="flex-row flex-1 bg-[#F4F5F9] items-center p-2 rounded-lg shadow">
          <Icon.Search height="20" width="20" stroke="gray" />
          <TextInput
            placeholder="What are you craving?"
            className="flex-1 ml-2"
            onFocus={openSearchModal}
          />
        </View>
        <View className="">
          <Icon.ShoppingCart
            width="20"
            height="20"
            strokeWidth={2}
            stroke="gray"
          />
        </View>
      </View>

      <Animated.ScrollView
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-4 pb-4 space-y-2">
          {/* pagination window */}
          <View>
            <Image
              source={require("../../assets/images/home/home-slider.png")}
              resizeMode="contain"
              style={{ width: "100%", height: imageHeight }}
              className="rounded-lg w-full"
            />
          </View>
          {/* category */}
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
                  <View key={item.id} className="items-center">
                    <Image
                      source={{ uri: item.image }} // Assuming image URLs are provided
                      className="h-[62] w-[61] rounded-full"
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        fontFamily: FontFamily.poppinsMedium,
                        fontSize: FontSize.size_xs,
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
        {/* Shadow separator */}
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
        {/* menu bar */}
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
              <View key={item.id} className="w-[48%] mb-4 rounded-lg shadow bg-white p-2">
                <FoodCard item={item} />
              </View>
            ))}
          </View>
        </View>
      </Animated.ScrollView>
      {/* footer */}
      <View className="flex-row justify-around rounded-t-2xl items-center shadow-md bg-white border-t border-gray-200 py-2">
        <TouchableOpacity className="items-center">
          <Icon.Home width={24} height={24} stroke="gray" />
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Icon.User width={22} height={22} stroke="gray" />
        </TouchableOpacity>
      </View>

      {/* Search Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeSearchModal}
      >
        <View className="flex-1 justify-end bg-black bg-opacity-50">
          <View className="bg-white p-4 rounded-t-lg">
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
            {/* Recent Searches */}
            <View className="mt-4">
              <Text
                style={{
                  fontFamily: FontFamily.poppinsSemiBold,
                  fontSize: FontSize.size_md,
                }}
              >
                Recent Searches
              </Text>
              {/* Add your recent search items here */}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Home;
