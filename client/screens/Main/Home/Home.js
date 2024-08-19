import React, { useRef, useState } from "react";
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
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Categories from "./Categories";
import Featured from "./Featured";
import Footer from "./Footer";
import SearchModal from "./SearchModal"; 

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

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const handleScrollEnd = ({ nativeEvent }) => {
    const offsetY = nativeEvent.contentOffset.y;
    setIsScrolled(offsetY > 0);
  };

  const openSearchModal = () => {
    setIsModalVisible(true);
  };

  const closeSearchModal = () => {
    setIsModalVisible(false);
  };

  const handleCartPress = () => {
    navigation.navigate("CartPage");
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? top : StatusBar.currentHeight,
        paddingBottom: Platform.OS === "ios" ? 0 : bottom,
      }}
      className="bg-white"
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      {/* SearchBar */}
      <View className="flex-row items-center space-x-2 px-4 py-2 bg-none">
        <TouchableOpacity
          className="flex-row flex-1 bg-[#F4F5F9] items-center p-3 rounded-lg shadow"
          onPress={openSearchModal}
        >
          <Icon.Search height="20" width="20" stroke="gray" />
          <Text className="flex-1 ml-2">What are you craving?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCartPress}>
          <Icon.ShoppingCart
            width="20"
            height="20"
            strokeWidth={2}
            stroke="gray"
          />
        </TouchableOpacity>
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
              source={require("../../../assets/images/home/home-slider.png")}
              resizeMode="contain"
              style={{ width: "100%", height: imageHeight }}
              className="rounded-lg w-full"
            />
          </View>
          <Categories />
        </View>
        {/* Featured */}
        <Featured />
      </Animated.ScrollView>
      {/* Footer */}
      <Footer />
      {/* Search Modal */}
      <SearchModal
        isModalVisible={isModalVisible}
        closeSearchModal={closeSearchModal}
      />
    </View>
  );
};

export default Home;
