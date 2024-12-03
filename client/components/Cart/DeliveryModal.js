// components/Cart/DeliveryModalComponent.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Modalize } from "react-native-modalize";
import { FontFamily, FontSize } from "../../GlobalStyles";
import { useDispatch, useSelector } from "react-redux"; // I
import { setSelectedRoom } from "../../store/Slices/orderServiceSlice";

const DeliveryModalComponent = ({
  modalizeRef,
  isModalOpen,
  setIsModalOpen,
  serviceOptions,
  handleOptionPress,
  deliveryType,
  // selectedRoom,
  // setSelectedRoom,
  errorMessage,
  handleProceed,
  isLoading,
}) => {

  const dispatch = useDispatch();
  const selectedRoom = useSelector((state) => state.service.selectedRoom); // Access selectedRoom from Redux

  const handleRoomChange = (text) => {
    console.log("Room Number Set: ", text); // Log the room number being set
    dispatch(setSelectedRoom(text)); // Dispatch the action to update the room in the Redux store
  };

  return (
    <Modalize
      ref={modalizeRef}
      modalHeight={500}
      handleStyle={{ backgroundColor: "#D3D3D3" }}
      handlePosition="outside"
      onOpen={() => setIsModalOpen(true)}
      onClose={() => {
        console.log("Modal closed. Room number: ", selectedRoom);
        setIsModalOpen(false);
      }}
      
      scrollViewProps={{
        // Allow scrolling within the modal if content exceeds modal height
        scrollEnabled: true,
      }}
    >
      <View className="p-4 flex-1">
        <Text className="text-xl font-bold mb-4">Choose Service Type</Text>
        {serviceOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            onPress={() => handleOptionPress(option.id)}
            className="flex-row items-center bg-white p-4 rounded-lg shadow-md my-2"
          >
            <Image
              source={option.image}
              style={{
                width: 80,
                height: 90,
                resizeMode: "cover",
                borderRadius: 8,
              }}
            />
            <Text
              className="ml-4 text-base font-medium"
              style={{ fontFamily: FontFamily.poppinsRegular }}
            >
              {option.title}
            </Text>
          </TouchableOpacity>
        ))}

        {/* If "Table Service" is selected, show Room Number input */}
        {deliveryType === "Table Service" && (
          <>
            <Text className="text-lg font-bold mt-4">Enter Room Number</Text>
            <TextInput
              placeholder="Eg: B-203"
              value={selectedRoom}
              onChangeText={handleRoomChange} 
              keyboardType="default"
              style={{
                height: 50,
                borderColor: "#ccc",
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 12,
                marginBottom: 20,
                fontFamily: FontFamily.poppinsRegular,
                fontSize: FontSize.size_mini,
              }}
            />
            {errorMessage ? (
              <Text className="text-red-500 text-center mb-4">
                {errorMessage}
              </Text>
            ) : null}
            <LinearGradient
              colors={["#007022", "#54d17a", "#bcffd0"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={{ borderRadius: 8 }}
            >
              <Pressable
                onPress={handleProceed}
                style={{
                  padding: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <Text
                    style={{
                      color: "white",
                      fontFamily: FontFamily.poppinsSemiBold,
                      fontSize: FontSize.size_lg,
                    }}
                  >
                    Proceed
                  </Text>
                )}
              </Pressable>
            </LinearGradient>
          </>
        )}
      </View>
    </Modalize>
  );
};

export default DeliveryModalComponent;
