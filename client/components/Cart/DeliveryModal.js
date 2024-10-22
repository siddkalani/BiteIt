import React from "react";
import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";

const DeliveryModal = ({
  visible,
  setDeliveryModalVisible,
  deliveryType,
  setDeliveryType,
  selectedRoom,
  setSelectedRoom,
  selectedCanteen,
  setSelectedCanteen,
}) => (
  <Modal
    visible={visible}
    animationType="slide"
    transparent={true}
    onRequestClose={() => setDeliveryModalVisible(false)}
  >
    <View className="flex-1 justify-end bg-black bg-opacity-50">
      <View className="bg-white p-4 rounded-t-2xl">
        <Text className="text-xl font-bold mb-4">Choose Service Type</Text>

        <View>
          <Text className="text-lg mb-2">Select Service Type:</Text>
          <TouchableOpacity
            onPress={() => {
              setDeliveryType("Pickup");
              setDeliveryModalVisible(false);
            }}
            className="p-2 mb-2 rounded-lg border border-gray-300"
          >
            <Text className="text-lg">Pickup</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setDeliveryType("Table Service")}
            className="p-2 mb-2 rounded-lg border border-gray-300"
          >
            <Text className="text-lg">Table Service</Text>
          </TouchableOpacity>
        </View>

        {deliveryType === "Table Service" && (
          <>
            <Text className="text-lg mb-2 mt-4">Enter Room Number:</Text>
            <TextInput
              value={selectedRoom}
              onChangeText={setSelectedRoom}
              className="border p-2 mb-4 rounded-lg"
              placeholder="Enter Room Number"
              keyboardType="numeric"
            />

            <Text className="text-lg mb-2">Select Canteen:</Text>
            {["Canteen 1", "Canteen 2", "Canteen 3"].map((canteen) => (
              <TouchableOpacity
                key={canteen}
                onPress={() => setSelectedCanteen(canteen)}
                className={`p-2 mb-2 rounded-lg border ${selectedCanteen === canteen ? "bg-green-100 border-green-600" : "border-gray-300"}`}
              >
                <Text className="text-lg">{canteen}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={() => setDeliveryModalVisible(false)}
              className="bg-green-500 p-3 rounded-lg mt-4"
            >
              <Text className="text-white text-center text-lg font-bold">Confirm</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  </Modal>
);

export default DeliveryModal;
