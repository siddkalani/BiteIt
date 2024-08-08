import React, { useState } from "react";
import {
  Text,
  Pressable,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StatusBar as RNStatusBar,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, FontSize } from "../../GlobalStyles";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "@env";

const NewUser = () => {
  const [name, setName] = useState("");

  const navigation = useNavigation();
  const route = useRoute();

  const phone = route.params?.phone;
  const otp = route.params?.otp;

  // console.log("Received phone:", phone);
  // console.log("Received otp:", otp);

  const handleVerify = async () => {
    try {
      console.log("Sending request with data:", { phone, otp, name });
      const response = await axios.post(`${BASE_URL}/user/verify/phone/otp`, {
        phone: phone,
        otp: otp,
        name: name,
      });

      if (response.status === 200) {
        // Navigate to Home after successful registration
        navigation.replace("Home");
      } else {
        Alert.alert("Error", "Failed to complete registration");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to complete registration");
      console.error("Verification Error:", error);
    }
  };

  const handleBackPress = () => {
    navigation.navigate("SignIn");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
      }}
      className="bg-[#ffffff]"
    >
      <RNStatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View className="flex-1 items-center">
        <View className="w-[90%] space-y-10 mt-4">
          <TouchableOpacity
            onPress={handleBackPress}
            className="p-2 rounded-full"
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <View className="items-center">
            <Text className="text-3xl font-bold text-primary">Hi User,</Text>
            <Text className="text-sm font-semibold text-gray-700 mt-2">
              Enter your name here
            </Text>
          </View>

          <View className="flex-row justify-center">
            <TextInput
              value={name}
              onChangeText={setName}
              className={`caret-transparent border w-full rounded-md text-xl text-gray-800 justify-center items-center p-2`}
              maxLength={50} // Adjust based on expected name length
            />
          </View>

          <View className="rounded-md">
            <LinearGradient
              colors={["#007022", "#54d17a", "#bcffd0"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1.9, y: 0 }}
              className="rounded-xl"
            >
              <Pressable
                onPress={handleVerify}
                className="p-3 justify-center items-center"
              >
                <Text
                  className="text-white"
                  style={{
                    fontFamily: FontFamily.poppinsSemiBold,
                    fontSize: FontSize.size_lg,
                  }}
                >
                  Proceed
                </Text>
              </Pressable>
            </LinearGradient>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NewUser;
