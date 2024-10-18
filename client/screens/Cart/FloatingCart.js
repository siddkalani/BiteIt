import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const FloatingCartBar = ({ itemCount, totalPrice, imageUrl, restaurantName }) => {
  const navigation = useNavigation();

  const handleCheckout = () => {
    navigation.navigate('CartPage');
  };

  const handleDelete = () => {
    // Implement delete functionality
    console.log('Delete cart');
  };

  return (
    <View className=" left-0 right-0">
      <View className="bg-white rounded-t-2xl shadow-lg flex-row items-center justify-between p-3">
        <View className="flex-row items-center space-x-3">
          <Image
            source={imageUrl ? { uri: imageUrl } : require('../../assets/images/home/coverFood.png')}
            className="w-12 h-12 rounded-full"
          />
          <View>
            <Text className="font-semibold text-gray-800">{restaurantName}</Text>
            <Text className="text-sm text-gray-600">{itemCount} item{itemCount !== 1 ? 's' : ''}</Text>
          </View>
        </View>
        <View className="flex-row items-center space-x-2">
          <TouchableOpacity
            className="bg-green-500 flex-row space-x-1 items-center rounded-lg px-4 py-2"
            onPress={handleCheckout}
          >
            <View>
            <Text className="text-white font-semibold">Checkout</Text>
              <Text className="text-white mr-2">₹{totalPrice.toFixed(2)}</Text>
              
            </View>
            <Icon name="chevron-forward" size={20} color="white" className="ml-1" />
          </TouchableOpacity>
          <TouchableOpacity className='bg-red-100 px-1 py-3 items-center justify-center rounded-lg' onPress={handleDelete}>
            <Icon name="trash" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FloatingCartBar;