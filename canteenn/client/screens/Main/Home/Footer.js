import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as Icon from 'react-native-feather';
import { useNavigation, useRoute } from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Function to check if the current route is active
  const isActive = (screenName) => route.name === screenName;

  const handleNavigateToHome = () => {
    navigation.navigate('Home');
  };

  const handleNavigateToOrders = () => {
    navigation.navigate('OrderHistory');
  };

  const handleNavigateToCart = () => {
    navigation.navigate('CartPage');
  };

  const handleNavigateToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <View className="flex-row justify-between items-center bg-[#309624] py-2 px-6 shadow-lg">
      {/* Home Button */}
      <TouchableOpacity 
        onPress={handleNavigateToHome} 
        className="items-center"
      >
        <Icon.Home 
          width={28} 
          height={28} 
          stroke={isActive('Home') ? '#fff' : '#BDBDBD'} // Active state color
        />
        <Text className={`text-xs ${isActive('Home') ? 'text-white' : 'text-gray-300'}`}>Home</Text>
      </TouchableOpacity>
      
      {/* Cart Button */}
      <TouchableOpacity 
        onPress={handleNavigateToCart} 
        className="items-center"
      >
        <Icon.ShoppingBag 
          width={28} 
          height={28} 
          stroke={isActive('CartPage') ? '#fff' : '#BDBDBD'} // Active state color
        />
        <Text className={`text-xs ${isActive('CartPage') ? 'text-white' : 'text-gray-300'}`}>Cart</Text>
      </TouchableOpacity>

      {/* Orders Button */}
      <TouchableOpacity 
        onPress={handleNavigateToOrders} 
        className="items-center"
      >
        <Icon.Clock 
          width={28} 
          height={28} 
          stroke={isActive('OrderHistory') ? '#fff' : '#BDBDBD'} // Active state color
        />
        <Text className={`text-xs ${isActive('OrderHistory') ? 'text-white' : 'text-gray-300'}`}>Orders</Text>
      </TouchableOpacity>
      
      {/* Profile Button */}
      <TouchableOpacity 
        onPress={handleNavigateToProfile} 
        className="items-center"
      >
        <Icon.User 
          width={28} 
          height={28} 
          stroke={isActive('Profile') ? '#fff' : '#BDBDBD'} // Active state color
        />
        <Text className={`text-xs ${isActive('Profile') ? 'text-white' : 'text-gray-300'}`}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
