import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageBackground, Image, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import * as IconF from "react-native-feather";

const AdminAccount = () => {
  const { top } = useSafeAreaInsets();

  return (
    <View style={{
      flex: 1,
      paddingTop: Platform.OS === "ios" ? top : StatusBar.currentHeight,
    }} className="bg-white">
      <View className='flex-1 pt-3 px-4 space-y-2'>
      {/* Header */}
      <View className="flex-row items-center justify-between h-8">
          <View className="flex-col justify-start">
            <Text className="text-2xl font-bold">Welcome ramu,</Text>
            <Text className="text-sm font-normal text-gray-600">Canteen-1</Text>
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

      <ScrollView className="flex-1 space-y-2 pt-2" showsVerticalScrollIndicator={false}>
        {/* Ad Banner */}
        <ImageBackground 
          source={require('../../../../assets/images/home/coverFood.png')}
          resizeMode="cover"
          style={{ width: '100%', height: 150, borderRadius: 8 }} // Customize height and borderRadius
          imageStyle={{ borderRadius: 8 }} // Ensure the background image is rounded
        >
          <View className="flex-row justify-between items-start p-4">
            <View>
              <Text className="text-white font-bold text-lg">Boost your sales</Text>
              <Text className="text-white text-sm">Be in limelight with ads!</Text>
            </View>
            <TouchableOpacity className="bg-yellow-400 px-2 py-1 rounded-md">
              <Text className="text-xs text-white">25% OFF</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center mt-3">
            <TouchableOpacity className="bg-white px-4 py-2 rounded-full">
              <Text className="text-blue-500 font-bold">Create Ad</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* Business Report Section */}
        <View className="">
          <View className="bg-blue-200 rounded-lg p-4">
            <View className="flex-row justify-between">
              <Text className="font-bold text-gray-800 text-lg">Business report</Text>
              <TouchableOpacity>
                <Text className="text-yellow-500 font-semibold">Details</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text className='text-base font-semibold'>Today's sales</Text>
            </View>
            <View className="mt-4">
              <Text className="text-blue-700 font-bold text-2xl">₹0</Text>
              <Text className="text-gray-600 text-sm">Last Tuesday till 03:44 pm: ₹0</Text>
            </View>
          </View>
        </View>

        {/* Quick Links Section */}
        <View className="">
          <Text className="font-bold text-gray-800 text-lg mb-2">Quick links</Text>
          <View className="flex-row justify-between">
            {/* Quick link icons */}
            <TouchableOpacity className="flex-1 items-center">
              <View className="bg-gray-100 rounded-lg p-3">
                <Icon name="person-outline" size={28} color="black" />
              </View>
              <Text className="mt-1 text-xs">Zomato Manager</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 items-center">
              <View className="bg-gray-100 rounded-lg p-3">
                <Icon name="link-outline" size={28} color="black" />
                <Text className="absolute top-0 right-0 bg-yellow-500 text-white text-xs px-1 rounded-full">New</Text>
              </View>
              <Text className="mt-1 text-xs">Smart link</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 items-center">
              <View className="bg-gray-100 rounded-lg p-3">
                <Icon name="pricetag-outline" size={28} color="black" />
              </View>
              <Text className="mt-1 text-xs">Hyperpure</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 items-center">
              <View className="bg-gray-100 rounded-lg p-3">
                <Icon name="receipt-outline" size={28} color="black" />
              </View>
              <Text className="mt-1 text-xs">Order History</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      </View>
    </View>
  );
};

export default AdminAccount;
