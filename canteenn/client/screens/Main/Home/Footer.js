import React from 'react';
import { Text, TouchableOpacity, View, Alert } from 'react-native';
import * as Icon from 'react-native-feather';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoutUser } from '../../../store/Slices/userDetailSlice';
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          onPress: async () => {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
              dispatch(logoutUser(token));
              await AsyncStorage.clear();
              navigation.reset({
                index: 0,
                routes: [{ name: "SignIn" }],
              });
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleNavigateToOrderHistory = () => {
    navigation.navigate('OrderHistory');
  };

  const handleNavigateToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <View className="flex-row justify-around items-center bg-white border-t border-gray-200 shadow-lg">
      <TouchableOpacity onPress={handleLogout} className="items-center p-2 rounded-lg">
        <Icon.Home width={20} height={20} stroke="black" />
        <Text className='text-xs'>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNavigateToOrderHistory} className="items-center p-2 rounded-lg">
        <Icon.List width={20} height={20} stroke="black" />
        <Text className='text-xs'>Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNavigateToProfile} className="items-center p-2 rounded-lg">
        <Icon.User width={20} height={20} stroke="black" />
        <Text className='text-xs'>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
