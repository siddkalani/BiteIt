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
    <View className="flex-row justify-between items-center bg-white border-t border-t-slate-200 py-2 px-6 shadow-lg">
      {/* Home Button */}
      <TouchableOpacity onPress={handleNavigateToHome} className="items-center">
        <Icon.Home 
          width={25} 
          height={25} 
          stroke={isActive('Home') ? 'green' : 'gray'} // Change stroke color for active state
        />
        <Text className={`text-xs font-bold ${isActive('Home') ? 'text-green-700' : 'text-gray-500'}`}>
          Home
        </Text>
      </TouchableOpacity>
      
      {/* Cart Button */}
      <TouchableOpacity onPress={handleNavigateToCart} className="items-center">
        <Icon.ShoppingBag 
          width={25} 
          height={25} 
          stroke={isActive('CartPage') ? 'green' : 'gray'} // Change stroke color for active state
        />
        <Text className={`text-xs font-bold ${isActive('CartPage') ? 'text-green-500' : 'text-gray-500'}`}>
          Cart
        </Text>
      </TouchableOpacity>

      {/* Orders Button */}
      <TouchableOpacity onPress={handleNavigateToOrders} className="items-center">
        <Icon.Clock 
          width={25} 
          height={25} 
          stroke={isActive('OrderHistory') ? 'green' : 'gray'} // Change stroke color for active state
        />
        <Text className={`text-xs font-bold ${isActive('OrderHistory') ? 'text-green-500' : 'text-gray-500'}`}>
          Orders
        </Text>
      </TouchableOpacity>
      
      {/* Profile Button */}
      <TouchableOpacity onPress={handleNavigateToProfile} className="items-center">
        <Icon.User 
          width={25} 
          height={25} 
          stroke={isActive('Profile') ? 'green' : 'gray'} // Change stroke color for active state
        />
        <Text className={`text-xs font-bold ${isActive('Profile') ? 'text-green-500' : 'text-gray-500'}`}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
