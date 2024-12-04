import React from "react";
import { useSelector } from "react-redux";
import { View, Text } from "react-native";

const AppWrapper = ({ children }) => {
  const isCanteenOnline = useSelector((state) => state.canteen.isOnline);

  if (!isCanteenOnline) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red", textAlign: "center", margin: 10 }}>
          Oops! The canteen is offline. Please try again later.
        </Text>
      </View>
    );
  }

  return children;
};

export default AppWrapper;
