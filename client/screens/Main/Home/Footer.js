import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as Icon from 'react-native-feather';

const Footer = () => {
    const handleLogout = () => {
        Alert.alert(
          "Logout",
          "Are you sure you want to logout?",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Logout",
              onPress: () => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "SignIn" }],
                });
              },
            },
          ],
          { cancelable: false }
        );
      };
    
    return (
        <View className="flex-row justify-around items-center bg-white border-t border-gray-200 py-2 shadow-lg">
            <TouchableOpacity onPress={handleLogout} className="items-center p-2  rounded-lg" >
                <Icon.Home width={24} height={24} stroke="black" />
                {/* <Text className="mt-1 text-sm text-gray-700">Home</Text> */}
            </TouchableOpacity>
            <TouchableOpacity className="items-center p-2 rounded-lg">
                <Icon.User width={24} height={24} stroke="black" />
                {/* <Text className="mt-1 text-sm text-gray-700">Profile</Text> */}
            </TouchableOpacity>
        </View>
    );
};

export default Footer;
