// components/Cart/HeaderComponent.js
import React from "react";
import { View } from "react-native";
import GlobalHeader from "../../components/Layout/GlobalHeader";

const HeaderComponent = () => {
  return (
    <View className="bg-white px-4 py-3">
      <GlobalHeader title="Food Cart" />
    </View>
  );
};

export default HeaderComponent;
