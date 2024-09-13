import React from "react";
import { View, Text, TouchableOpacity, Platform, SafeAreaView, StatusBar } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FontFamily, FontSize } from "../../GlobalStyles";
import { useNavigation } from "@react-navigation/native";

const ProfileHeader = () => {
  const navigation = useNavigation();
  
  const handlePress = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <View className="flex-row items-center space-x-3">
        <TouchableOpacity
          onPress={handlePress}
          className="w-10 h-10 justify-center absolute"
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        
        <View className="flex-1 items-center">
          <Text
            style={{
              fontFamily: FontFamily.poppinsMedium,
              fontSize: FontSize.size_lg,
              lineHeight: 28,
              textAlign: 'center', // Ensure the text is centered
            }}
            className="text-black"
          >
            About Me
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileHeader;
