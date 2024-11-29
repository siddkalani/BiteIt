import React from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const SkeletonLoader = () => {
  return (
    <SkeletonPlaceholder>
      <View style={{ padding: 16 }}>
        {[...Array(5)].map((_, index) => (
          <View key={index} style={{ marginBottom: 20 }}>
            {/* Order Header */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
              <View style={{ width: 120, height: 20, borderRadius: 4 }} />
              <View style={{ width: 60, height: 20, borderRadius: 4 }} />
            </View>
            {/* User Info */}
            <View style={{ width: 150, height: 16, borderRadius: 4, marginBottom: 8 }} />
            {/* Order Items */}
            {[...Array(3)].map((_, i) => (
              <View key={i} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                <View style={{ width: 100, height: 14, borderRadius: 4 }} />
                <View style={{ width: 40, height: 14, borderRadius: 4 }} />
              </View>
            ))}
            {/* Total Amount */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
              <View style={{ width: 120, height: 14, borderRadius: 4 }} />
              <View style={{ width: 60, height: 14, borderRadius: 4 }} />
            </View>
          </View>
        ))}
      </View>
    </SkeletonPlaceholder>
  );
};

export default SkeletonLoader;
