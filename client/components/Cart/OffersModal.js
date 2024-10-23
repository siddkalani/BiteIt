import React from "react";
import { View, Text, Modal, TouchableOpacity, Pressable } from "react-native";

const OffersModal = ({ visible, setModalVisible }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={() => setModalVisible(false)}
  >
    <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
      <View className="bg-white p-4 rounded-lg w-3/4">
        <Text className="text-lg font-bold mb-2">Available Offers</Text>

        <TouchableOpacity className="mb-2 p-2 bg-gray-200 rounded-lg">
          <Text>Bank Offer: Get 10% Cashback on XYZ Bank Cards</Text>
        </TouchableOpacity>
        <TouchableOpacity className="mb-2 p-2 bg-gray-200 rounded-lg">
          <Text>UPI Offer: ₹50 Cashback on UPI payments</Text>
        </TouchableOpacity>
        <TouchableOpacity className="mb-2 p-2 bg-gray-200 rounded-lg">
          <Text>Coupon: Use "SAVE50" to get ₹50 off</Text>
        </TouchableOpacity>

        <Pressable
          className="mt-4 p-2 bg-green-600 rounded-lg"
          onPress={() => setModalVisible(false)}
        >
          <Text className="text-white text-center">Close</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
);

export default OffersModal;
