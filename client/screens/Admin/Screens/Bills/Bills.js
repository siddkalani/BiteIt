import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageBackground, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import * as IconF from "react-native-feather";

const Bills = () => {
  const { top } = useSafeAreaInsets();

  return (
    <View style={{
      flex: 1,
      paddingTop: Platform.OS === "ios" ? top : StatusBar.currentHeight,
    }} className="bg-white">
      <View className='flex-1 pt-3 px-4 space-y-2'>
      {/* Header */}
      <View className="flex-row items-center justify-between h-8">
          <View className="flex-row items-center space-x-2">
            <Text className="text-2xl font-bold">Offers</Text>
          </View>
          <View className="flex-row items-center space-x-4">
            <TouchableOpacity>
              <IconF.Bell height={24} width={24} stroke="black" />
              <View className="absolute -top-2 -right-2 bg-red-500 w-4 h-4 rounded-full justify-center items-center">
                <Text className="text-white text-xs">4</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <IconF.Search height={24} width={24} stroke="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <IconF.Settings height={24} width={24} stroke="black" />
            </TouchableOpacity>
          </View>
        </View>

      <ScrollView className="flex-1 space-y-2" showsVerticalScrollIndicator={false}>
        {/* Recommended Section */}
        <View className="">
          <Text className="font-bold text-lg">Recommended for you</Text>
        </View>

        {/* Ad Banner with Background Image */}
        <ImageBackground 
          source={require('../../../../assets/images/home/coverFood.png')}
          resizeMode="cover"
          style={{ width: '100%', height: 150, borderRadius: 8 }} // Customize height and borderRadius
          imageStyle={{ borderRadius: 8 }} // Ensure the background image is rounded
        >
          <View className="mx-4 px-2 py-4 rounded-lg flex-1 justify-between">
            <Text className="text-lg font-semibold text-white">Boost your restaurant visibility through ads</Text>
            <TouchableOpacity className="mt-3 px-4 py-2 bg-white rounded-full w-24">
              <Text className="text-center text-yellow-500 font-semibold">Start Ad</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* Offers Section */}
        <View className="mt-">
          <Text className="font-bold text-gray-700 mb-2">OFFERS</Text>
          <View className="flex-row justify-between">
            {/* Offer Cards */}
            <View className="bg-yellow-200 p-4 rounded-md flex-1 mr-2">
              <Text className="font-bold text-lg">30% OFF</Text>
              <Text className="text-sm text-gray-600">up to ₹75</Text>
            </View>
            <View className="bg-yellow-200 p-4 rounded-md flex-1 mr-2">
              <Text className="font-bold text-lg">20% OFF</Text>
              <Text className="text-sm text-gray-600">up to ₹50</Text>
            </View>
            <View className="bg-yellow-200 p-4 rounded-md flex-1">
              <Text className="font-bold text-lg">10% OFF</Text>
              <Text className="text-sm text-gray-600">up to ₹75</Text>
            </View>
          </View>
        </View>

        {/* Build Your Own Section */}
        <View className="mt-">
          <Text className="font-bold text-gray-700 mb-2">Build your own</Text>
          <View className="flex-row justify-between items-center">
            <IconF.Tag height={32} width={32} stroke="#F59E0B" />
            <View className="flex-1 ml-3">
              <Text className="font-bold text-gray-800">Offers and discounts</Text>
              <Text className="text-gray-500">Start your own offers and grow your business</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      </View>
    </View>
  );
};

export default Bills;
