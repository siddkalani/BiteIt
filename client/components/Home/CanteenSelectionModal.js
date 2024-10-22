import React from "react";
import { View, Text, TouchableOpacity, StatusBar, Platform } from "react-native";
import Modal from "react-native-modal";
import GlobalHeader from "../Layout/GlobalHeader";

const CanteenSelectionModal = ({
  isLocationModalVisible,
  closeLocationModal,
  safeAreaTop,
}) => {
  return (
    <Modal
      isVisible={isLocationModalVisible}
      onBackdropPress={closeLocationModal}
      animationIn="slideInDown"
      animationOut="slideOutUp"
      style={{ justifyContent: "flex-start", margin: 0 }}
    >
      <View
        style={{ paddingTop: Platform.OS === "ios" ? safeAreaTop : 0 }}
        className="bg-white rounded-b-3xl p-4"
      >
        <StatusBar barStyle="dark-content" backgroundColor="white" transparent />
        <View className="py-2 mb-4">
          <GlobalHeader title="Select Canteen" onBackPress={closeLocationModal} />
        </View>
        {["Canteen 1", "Canteen 2", "Canteen 3"].map((canteen) => (
          <TouchableOpacity
            key={canteen}
            className="bg-[#FFA500] p-3 rounded-lg mb-2"
            onPress={closeLocationModal}
          >
            <Text className="text-white text-center">{canteen}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
};

export default CanteenSelectionModal;
