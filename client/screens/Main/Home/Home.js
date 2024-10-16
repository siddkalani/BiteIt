import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native";
import * as Icon from "react-native-feather";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Categories from "./Categories";
import Featured from "./Featured";
import SearchModal from "./SearchModal";
import GlobalHeader from "../../../components/Layout/GlobalHeader";

const HEADER_HEIGHT = 100; // Adjust this value based on your header's actual height
const STICKY_SEARCH_THRESHOLD = HEADER_HEIGHT / 1.5;

const Home = ({ setTabBarVisible }) => {
  const navigation = useNavigation();
  const { width: screenWidth } = Dimensions.get("window");
  const aspectRatio = 183 / 402;
  const imageHeight = screenWidth * aspectRatio;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);
  const { top: safeAreaTop } = useSafeAreaInsets(); // Adjusting safe area padding
  const lastScrollY = useRef(0);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  useEffect(() => {
    const listenerId = scrollY.addListener(({ value }) => {
      if (value < lastScrollY.current || value <= 0) {
        setTabBarVisible(true);
      } else if (value > lastScrollY.current) {
        setTabBarVisible(false);
      }
      lastScrollY.current = value;
    });

    return () => {
      scrollY.removeListener(listenerId);
    };
  }, [scrollY, setTabBarVisible]);

  const deliverTextOpacity = scrollY.interpolate({
    inputRange: [0, STICKY_SEARCH_THRESHOLD],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const deliverTextTranslateY = scrollY.interpolate({
    inputRange: [0, STICKY_SEARCH_THRESHOLD],
    outputRange: [0, -20],
    extrapolate: "clamp",
  });

  const searchBarTranslateY = scrollY.interpolate({
    inputRange: [0, STICKY_SEARCH_THRESHOLD],
    outputRange: [0, 0],
    extrapolate: "clamp",
  });

  const searchBarPosition = scrollY.interpolate({
    inputRange: [0, STICKY_SEARCH_THRESHOLD],
    outputRange: [0, STICKY_SEARCH_THRESHOLD - HEADER_HEIGHT],
    extrapolate: "clamp",
  });

  const openSearchModal = () => setIsModalVisible(true);
  const closeSearchModal = () => setIsModalVisible(false);
  const openLocationModal = () => setIsLocationModalVisible(true);
  const closeLocationModal = () => setIsLocationModalVisible(false);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="light-content" backgroundColor="#309624" translucent />

      {/* Header Section */}
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: HEADER_HEIGHT + safeAreaTop, // Include safe area inset in the header height
          transform: [{ translateY: searchBarPosition }],
        }}
      >
        <SafeAreaView style={{ backgroundColor: "#309624" }}>
          <View style={{ backgroundColor: "#309624", paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight, }}>
            <View className="flex-row items-center justify-between px-4 mt-2">
              {/* "DELIVER TO" Section */}
              <TouchableOpacity onPress={openLocationModal}>
                <Animated.View
                  style={{
                    opacity: deliverTextOpacity,
                    transform: [{ translateY: deliverTextTranslateY }],
                  }}
                >
                  <Text className="text-white text-xs">DELIVER TO</Text>
                  <View className="flex-row items-center">
                    <Text className="text-white font-bold mr-1">Current Location</Text>
                    <Icon.ChevronDown height="20" width="20" stroke="white" />
                  </View>
                </Animated.View>
              </TouchableOpacity>

              {/* Bell Icon */}
              <TouchableOpacity
                style={{
                  opacity: deliverTextOpacity,
                  transform: [{ translateY: deliverTextTranslateY }],
                }}
              >
                <Icon.Bell height="24" width="24" stroke="white" />
              </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <Animated.View
              style={{
                transform: [{ translateY: searchBarTranslateY }],
              }}
              className="flex-row items-center space-x-2 px-4 my-2"
            >
              <TouchableOpacity
                className="flex-row flex-1 bg-white items-center p-3 rounded-lg shadow"
                onPress={openSearchModal}
              >
                <Icon.Search height="20" width="20" stroke="gray" />
                <Text className="flex-1 ml-2">What are you craving?</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </SafeAreaView>
      </Animated.View>

      {/* Scrollable Content */}
      <Animated.ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT + safeAreaTop }} // Adjust padding based on header height and safe area
        bounces={false}
        overScrollMode="never"
      >
        {/* Home Slider */}
        <View>
          <View className="bg-[#309624] px-4 pb-2 rounded-b-3xl">
            <Image
              source={require("../../../assets/images/home/home-slider.png")}
              resizeMode="contain"
              style={{ width: "100%", height: imageHeight }}
              className="rounded-lg w-full"
            />
          </View>
        </View>

        {/* Categories */}
        <View className="px-4 pb-4 pt-2 space-y-2">
          <Categories />
        </View>

        {/* Featured Section */}
        <Featured />
      </Animated.ScrollView>

      {/* Location Selection Modal */}
      <Modal
        isVisible={isLocationModalVisible}
        onBackdropPress={closeLocationModal}
        animationIn="slideInDown"
        animationOut="slideOutUp"
        style={{ justifyContent: "flex-start", margin: 0 }}
      >
        <View style={{ paddingTop: Platform.OS === "ios" ? safeAreaTop : 0 }} className="bg-white rounded-b-3xl p-4">
          <StatusBar barStyle="dark-content" backgroundColor="white" transparent />
          <View className="py-2 mb-4">
            <GlobalHeader title="Select Canteen" onBackPress={closeLocationModal} />
          </View>
          <TouchableOpacity className="bg-[#FFA500] p-3 rounded-lg mb-2" onPress={closeLocationModal}>
            <Text className="text-white text-center">Canteen 1</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-[#FFA500] p-3 rounded-lg mb-2" onPress={closeLocationModal}>
            <Text className="text-white text-center">Canteen 2</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-[#FFA500] p-3 rounded-lg" onPress={closeLocationModal}>
            <Text className="text-white text-center">Canteen 3</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Search Modal */}
      <SearchModal isModalVisible={isModalVisible} closeSearchModal={closeSearchModal} />
    </View>
  );
};

export default Home;
