import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StatusBar,
  Image,
  Dimensions,
  Animated,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Categories from "../../components/Home/Categories";
import Featured from "../../components/Home/Featured";
import SearchModal from "../../components/Home/SearchModal";
import CanteenSelectionModal from "../../components/Home/CanteenSelectionModal";
import AnimatedHeader from "../../components/Home/AnimatedHeader";

// Base Skeleton Loader Component
const SkeletonLoader = ({ style }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 800,  // Faster duration for smoother effect
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

  return (
    <Animated.View
      style={[
        {
          backgroundColor: "#E1E9EE",
          opacity,
        },
        style,
      ]}
    />
  );
};

const FullScreenSkeleton = () => {
  const { width: screenWidth } = Dimensions.get("window");
  const { top: safeAreaTop } = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingTop: safeAreaTop }}>
      {/* Header Skeleton */}
      <View style={{ padding: 16 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <SkeletonLoader style={{ width: 120, height: 20, borderRadius: 4 }} />
          <SkeletonLoader style={{ width: 40, height: 40, borderRadius: 20 }} />
        </View>
        <SkeletonLoader style={{ width: "100%", height: 50, borderRadius: 8 }} />
      </View>

      {/* Banner Skeleton */}
      <View style={{ padding: 16 }}>
        <SkeletonLoader style={{ width: "100%", height: screenWidth * 0.4, borderRadius: 8 }} />
      </View>

      {/* Categories Skeleton */}
      <View style={{ padding: 16 }}>
        <SkeletonLoader style={{ width: 120, height: 20, borderRadius: 4, marginBottom: 16 }} />
        <View style={{ flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <SkeletonLoader
              key={item}
              style={{
                width: screenWidth * 0.2,
                height: screenWidth * 0.2,
                borderRadius: 8,
                marginBottom: 16,
              }}
            />
          ))}
        </View>
      </View>

      {/* Featured Section Skeleton */}
      <View style={{ padding: 16 }}>
        <SkeletonLoader style={{ width: 150, height: 20, borderRadius: 4, marginBottom: 16 }} />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {[1, 2].map((item) => (
            <SkeletonLoader
              key={item}
              style={{
                width: screenWidth * 0.44,
                height: screenWidth * 0.6,
                borderRadius: 8,
              }}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const HEADER_HEIGHT = 95;
const STICKY_SEARCH_THRESHOLD = HEADER_HEIGHT / 1.5;

const Home = ({ setTabBarVisible }) => {
  const { width: screenWidth } = Dimensions.get("window");
  const aspectRatio = 183 / 402;
  const imageHeight = screenWidth * aspectRatio;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const { top: safeAreaTop } = useSafeAreaInsets();
  const lastScrollY = useRef(0);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Reduced to 1.5s for faster transition
    return () => clearTimeout(timer);
  }, []);

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

  if (isLoading) {
    return <FullScreenSkeleton />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="light-content" backgroundColor={"#2b054c"} translucent />

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
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT + safeAreaTop }}
        className="rounded-b-3xl"
        bounces={false}
        overScrollMode="never"
      >
        <View className="rounded-b-3xl">
          <View className="bg-[#2b054c] px-4 pb-2 rounded-b-3xl">
            <Image
              source={require("../../assets/images/home/home-slider.png")}
              resizeMode="contain"
              style={{ width: "100%", height: imageHeight }}
              className="rounded-lg w-full"
            />
          </View>
        </View>

        <View className="px-4 pb-4 pt-2 " style={{ backgroundColor: "white" }}>
          <Categories />
        </View>

        <Featured />
      </Animated.ScrollView>

      {/* Conditional Modals */}
      {isLocationModalVisible && (
        <CanteenSelectionModal
          isLocationModalVisible={isLocationModalVisible}
          closeLocationModal={closeLocationModal}
          safeAreaTop={safeAreaTop}
        />
      )}

      {isModalVisible && (
        <SearchModal isModalVisible={isModalVisible} closeSearchModal={closeSearchModal} />
      )}
    </View>
  );
};

export default Home;
