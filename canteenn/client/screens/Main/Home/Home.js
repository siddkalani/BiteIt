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
import Modal from "react-native-modal"; // Import Modal library
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Categories from "./Categories";
import Featured from "./Featured";
import Footer from "./Footer";
import SearchModal from "./SearchModal";
import GlobalHeader from "../../../components/Layout/GlobalHeader";

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { width: screenWidth } = Dimensions.get("window");
  const aspectRatio = 183 / 402;
  const imageHeight = screenWidth * aspectRatio;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false); // State for location modal
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

  const openLocationModal = () => {
    setIsLocationModalVisible(true); // Open the location modal
  };

  const closeLocationModal = () => {
    setIsLocationModalVisible(false); // Close the location modal
  };

  const handleCartPress = () => {
    navigation.navigate("CartPage");
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
        paddingBottom: Platform.OS === "ios" ? 0 : bottom,
      }}
      className="bg-white"
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="#FFA500"
        translucent
      />
      <View className="bg-[#309624]">
        <SafeAreaView>
          {/* Location Section */}
          <View className="flex-row items-center justify-between px-4 mt-2">
            <TouchableOpacity onPress={openLocationModal}>
              <Text className="text-white text-xs">DELIVER TO</Text>
              <View className="flex-row items-center">
                <Text className="text-white font-bold mr-1">Current Location</Text>
                <Icon.ChevronDown height="20" width="20" stroke="white" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon.Bell height="24" width="24" stroke="white" />
            </TouchableOpacity>
          </View>

          {/* SearchBar */}
          <View className="flex-row items-center space-x-2 px-4 mt-2">
            <TouchableOpacity
              className="flex-row flex-1 bg-white items-center p-3 rounded-lg shadow"
              onPress={openSearchModal}
            >
              <Icon.Search height="20" width="20" stroke="gray" />
              <Text className="flex-1 ml-2">What are you craving?</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      {/* Scroll Content */}
      <Animated.ScrollView
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View className="">
          <View className="bg-[#309624] px-4 pb-2 pt-2 rounded-b-3xl">
            <Image
              source={require("../../../assets/images/home/home-slider.png")}
              resizeMode="contain"
              style={{ width: "100%", height: imageHeight }}
              className="rounded-lg w-full"
            />
          </View>
        </View>
        <View className="px-4 pb-4 pt-2 space-y-2">
          <Categories />
        </View>
        {/* Featured */}
        <Featured />
      </Animated.ScrollView>
      {/* Footer */}
      <Footer />

      {/* Location Selection Modal (Sliding from Top) */}
      <Modal
        isVisible={isLocationModalVisible}
        onBackdropPress={closeLocationModal}
        animationIn="slideInDown"  // Slide-in animation from the top
        animationOut="slideOutUp"  // Slide-out animation to the top
        style={{ justifyContent: "flex-start", margin: 0 }}
      >
        <View style={{
          paddingTop: Platform.OS === "ios" ? top : 0, // Apply paddingTop only for iOS
          // paddingBottom: Platform.OS === "ios" ? 0 : bottom, // Apply paddingBottom for Android
        }} className="bg-white rounded-b-3xl p-4">
          <View className='py-2 mb-4'>
          <GlobalHeader title="Select Canteen" onBackPress={closeLocationModal}/>
          </View>
          <TouchableOpacity
            className="bg-[#FFA500] p-3 rounded-lg mb-2"
            onPress={() => {
              closeLocationModal();
              // Handle selection of Canteen 1
            }}
          >
            <Text className="text-white text-center">Canteen 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#FFA500] p-3 rounded-lg mb-2"
            onPress={() => {
              closeLocationModal();
              // Handle selection of Canteen 2
            }}
          >
            <Text className="text-white text-center">Canteen 2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#FFA500] p-3 rounded-lg"
            onPress={() => {
              closeLocationModal();
              // Handle selection of Canteen 3
            }}
          >
            <Text className="text-white text-center">Canteen 3</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Search Modal */}
      <SearchModal
        isModalVisible={isModalVisible}
        closeSearchModal={closeSearchModal}
      />
    </View>
  );
};

export default Home;
