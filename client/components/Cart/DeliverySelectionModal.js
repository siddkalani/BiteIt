import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Modalize } from "react-native-modalize";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const MyComponent = ({deli}) => {
  const modalizeRef = useRef(null); // Reference to the modalize component
  const [deliveryType, setDeliveryType] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedCanteen, setSelectedCanteen] = useState("Canteen 1"); // Default value

  const openModal = () => {
    modalizeRef.current?.open(); // Open the modal when needed
  };

  const closeModal = () => {
    modalizeRef.current?.close(); // Close the modal
  };

  const handleConfirmDelivery = () => {
    // Logic to confirm the delivery choice
    setDeliveryType(null); // Reset after confirmation
    closeModal(); // Close the modal after confirming
  };

  return (
    <>
    <GestureHandlerRootView className='flex-1'>
      {/* Button to open the modal */}

      {/* Modalize Component */}
      <Modalize
        ref={modalizeRef}
        modalHeight={500} // Adjust modal height to content
        onClose={() => setDeliveryType(null)} // Reset state when modal closes
        handlePosition="outside" // Handle outside close gesture
      >
        <View className="p-4">

          {/* Close Icon */}
          <TouchableOpacity
            onPress={closeModal} // Close modal on pressing the close icon
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 10,
            }}
          >
            <Ionicons name="close-circle" size={30} color="gray" />
          </TouchableOpacity>

          <Text className="text-xl font-bold mb-4">Choose Service Type</Text>

          {/* Service Type and Canteen Selection */}
          <View>
            <Text className="text-lg mb-2">Select Service Type:</Text>

            <TouchableOpacity
              onPress={() => {
                setDeliveryType("Pickup");
                closeModal(); // Close modal if "Pickup" is selected
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

            {/* Canteen Selection */}
            <Text className="text-lg mb-2 mt-4">Select Canteen:</Text>
            {["Canteen 1", "Canteen 2", "Canteen 3"].map((canteen) => (
              <TouchableOpacity
                key={canteen}
                onPress={() => setSelectedCanteen(canteen)}
                className={`p-2 mb-2 rounded-lg border ${selectedCanteen === canteen ? "bg-green-100 border-green-600" : "border-gray-300"
                  }`}
              >
                <Text className="text-lg">{canteen}</Text>
              </TouchableOpacity>
            ))}

            {/* If "Table Service" is selected, show Room Number input */}
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

                {/* Confirm Button */}
                <TouchableOpacity
                  onPress={handleConfirmDelivery}
                  className="bg-green-500 p-3 rounded-lg mt-4"
                >
                  <Text className="text-white text-center text-lg font-bold">Confirm</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modalize>
      </GestureHandlerRootView>
    </>
  );
};

export default MyComponent;
