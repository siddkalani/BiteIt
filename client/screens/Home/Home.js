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
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Categories from "../../components/Home/Categories";
import Featured from "../../components/Home/Featured";
import SearchModal from "../../components/Home/SearchModal";
import SearchBar from "../../components/Home/SearchBar";
import CanteenSelectionModal from "../../components/Home/CanteenSelectionModal";

const HEADER_HEIGHT = 100;
const STICKY_SEARCH_THRESHOLD = HEADER_HEIGHT / 1.5;

const Home = ({ setTabBarVisible }) => {
  const navigation = useNavigation();
  const { width: screenWidth } = Dimensions.get("window");
  const aspectRatio = 183 / 402;
  const imageHeight = screenWidth * aspectRatio;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);
  const { top: safeAreaTop } = useSafeAreaInsets();
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

  const openSearchModal = () => setIsModalVisible(true);
  const closeSearchModal = () => setIsModalVisible(false);
  const openLocationModal = () => setIsLocationModalVisible(true);
  const closeLocationModal = () => setIsLocationModalVisible(false);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="light-content" backgroundColor={"#309624"} translucent />

      {/* Header Section */}
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transform: [{
            translateY: scrollY.interpolate({
              inputRange: [0, STICKY_SEARCH_THRESHOLD],
              outputRange: [0, STICKY_SEARCH_THRESHOLD - HEADER_HEIGHT],
              extrapolate: "clamp",
            })
          }],
        }}
      >
        <SafeAreaView
          style={{
            backgroundColor: "#309624",
            paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
          }}
        >
          <View style={{ backgroundColor: "#309624" }}>
            <View className="flex-row items-center justify-between px-4 mt-2">
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
              <TouchableOpacity>
                <Animated.View
                  style={{
                    opacity: deliverTextOpacity,
                    transform: [{ translateY: deliverTextTranslateY }],
                  }}
                >
                  <Icon.Bell height="24" width="24" stroke="white" />
                </Animated.View>
              </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <SearchBar
              openSearchModal={openSearchModal}
              scrollY={scrollY}
              STICKY_SEARCH_THRESHOLD={STICKY_SEARCH_THRESHOLD}
            />
          </View>
        </SafeAreaView>
      </Animated.View>

      {/* Scrollable Content */}
      <Animated.ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT + safeAreaTop }}
        bounces={false}
        overScrollMode="never"
      >
        <View>
          <View className="bg-[#309624] px-4 pb-2 rounded-b-3xl">
            <Image
              source={require("../../assets/images/home/home-slider.png")}
              resizeMode="contain"
              style={{ width: "100%", height: imageHeight }}
              className="rounded-lg w-full"
            />
          </View>
        </View>

        <View className="px-4 pb-4 pt-2 space-y-2">
          <Categories />
        </View>

        <Featured />
      </Animated.ScrollView>

      {/* Location Selection Modal */}
      <CanteenSelectionModal
        isLocationModalVisible={isLocationModalVisible}
        closeLocationModal={closeLocationModal}
        safeAreaTop={safeAreaTop}
      />

      {/* Search Modal */}
      <SearchModal isModalVisible={isModalVisible} closeSearchModal={closeSearchModal} />
    </View>
  );
};

export default Home;
