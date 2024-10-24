import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StatusBar,
  Image,
  Dimensions,
  Animated,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Categories from "../../components/Home/Categories";
import Featured from "../../components/Home/Featured";
import SearchModal from "../../components/Home/SearchModal";
import CanteenSelectionModal from "../../components/Home/CanteenSelectionModal";
import AnimatedHeader from "../../components/Home/AnimatedHeader";

const HEADER_HEIGHT = 100;
const STICKY_SEARCH_THRESHOLD = HEADER_HEIGHT / 1.5;

const Home = ({ setTabBarVisible }) => {
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
    
      {/* Header Component */}
      <AnimatedHeader
        openLocationModal={openLocationModal}
        openSearchModal={openSearchModal}
        scrollY={scrollY}
        STICKY_SEARCH_THRESHOLD={STICKY_SEARCH_THRESHOLD}
        deliverTextOpacity={deliverTextOpacity}
        deliverTextTranslateY={deliverTextTranslateY}
      />

      {/* Scrollable Content */}
      <Animated.ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={32}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT + safeAreaTop}} // Add background color
        className='rounded-b-3xl'
        bounces={false}
        overScrollMode="never"
      >
        <View className='rounded-b-3xl'>
          <View className="bg-[#309624] px-4 pb-2 rounded-b-3xl">
            <Image
              source={require("../../assets/images/home/home-slider.png")}
              resizeMode="contain"
              style={{ width: "100%", height: imageHeight }}
              className="rounded-lg w-full"
            />
          </View>
        </View>

        <View className="px-4 pb-4 pt-2 space-y-2" style={{ backgroundColor: 'white' }}>
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
