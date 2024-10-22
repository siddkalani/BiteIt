import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import * as Icon from "react-native-feather";

const SearchBar = ({ openSearchModal, scrollY, STICKY_SEARCH_THRESHOLD }) => {
  const searchBarTranslateY = scrollY.interpolate({
    inputRange: [0, STICKY_SEARCH_THRESHOLD],
    outputRange: [0, 0],
    extrapolate: "clamp",
  });

  return (
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
  );
};

export default SearchBar;
