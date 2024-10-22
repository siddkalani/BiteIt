import React from "react";
import { View, Text, TouchableOpacity, StatusBar, Animated, Platform } from "react-native";
import { SafeAreaView } from "react-native";
import * as Icon from "react-native-feather";
import SearchBar from "./SearchBar";

const AnimatedHeader = ({
  openLocationModal,
  openSearchModal,
  scrollY,
  STICKY_SEARCH_THRESHOLD,
  deliverTextOpacity,
  deliverTextTranslateY,
}) => {
  return (
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
            outputRange: [0, STICKY_SEARCH_THRESHOLD - 100], // Adjust as per HEADER_HEIGHT
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
            {/* Delivery Location */}
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
  );
};

export default AnimatedHeader;
