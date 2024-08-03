import { View, Text, SafeAreaView, StatusBar, TextInput, ScrollView, Platform, StatusBar as RNStatusBar } from 'react-native';
import React from 'react';
import * as Icon from 'react-native-feather';
import SafeAreaAndroid from '../../components/SafeAreaAndroid'; // Assuming this file is correct

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0 }} className='bg-[#ffffff]'>
      <StatusBar barStyle="dark-content" />
      <View className='px-4 py-4'>
        {/* search bar */}
        <View className="flex-row items-center space-x-2 ">
          <View className="flex-row flex-1 bg-[#F4F5F9] items-center p-2 rounded-lg">
            <Icon.Search
              height='20'
              width='20'
              stroke='gray'
            />
            <TextInput
              placeholder='What are you craving?'
              className="flex-1 ml-2"
            />
          </View>
          <View className="">
            <Icon.ShoppingCart width='20' height='20' strokeWidth={2} stroke='gray' />
          </View>
        </View>
      </View>
      {/* main */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Add your content here */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
