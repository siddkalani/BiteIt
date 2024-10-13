import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
// import * as Icon from 'react-native-feather';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';

const AdminFooter = () => {
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
      <Icon name={`${isActive('AdminHome') ? 'fast-food' : 'fast-food-outline'}`} size={30} color="green" />
        <Text className={`text-xs font-bold ${isActive('AdminHome') ? 'text-green-700' : 'text-gray-500'}`}>
          Orders
        </Text>
      </TouchableOpacity>

      {/* Cart Button */}
      <TouchableOpacity onPress={handleNavigateToCart} className="items-center">
      <Icon name={`${isActive('Inventory') ? 'storefront' : 'storefront-outline'}`} size={30} color="green" />
        <Text className={`text-xs font-bold ${isActive('CartPage') ? 'text-green-500' : 'text-gray-500'}`}>
          inventory
        </Text>
      </TouchableOpacity>

      {/* Orders Button */}
      <TouchableOpacity onPress={handleNavigateToOrders} className="items-center">
      <Icon name={`${isActive('Bills') ? 'document-text' : 'document-text-outline'}`} size={30} color="green" />
        <Text className={`text-xs font-bold ${isActive('OrderHistory') ? 'text-green-500' : 'text-gray-500'}`}>
          Bills
        </Text>
      </TouchableOpacity>

      {/* Profile Button */}
      <TouchableOpacity onPress={handleNavigateToProfile} className="items-center">
        <Icon name={`${isActive('AdminProfile') ? 'people-circle' : 'people-circle-outline'}`} size={30} color="green" />
        <Text className={`text-xs font-bold ${isActive('Profile') ? 'text-green-500' : 'text-gray-500'}`}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminFooter;
