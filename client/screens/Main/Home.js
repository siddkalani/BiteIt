import { Image, View, Text, SafeAreaView, StatusBar, TextInput, ScrollView, Platform, StatusBar as RNStatusBar, Dimensions, FlatList } from 'react-native';
import React from 'react';
import * as Icon from 'react-native-feather';
import SafeAreaAndroid from '../../components/SafeAreaAndroid'; // Assuming this file is correct
import { FontFamily, FontSize } from '../../GlobalStyles';
import foodCategories from './HomeData';

const Home = () => {
  const { width: screenWidth } = Dimensions.get('window');
  const aspectRatio = 183 / 402;
  const imageHeight = screenWidth * aspectRatio;

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0 }} className='bg-[#ffffff]'>
      <StatusBar barStyle="dark-content" />
      <View className='px-4 py-4 bg-slate-600 space-y-4'>
        {/* search bar */}
        <View className="flex-row items-center space-x-2 bg-slate-300">
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
        {/* pagination window */}
        <View>
          <Image
            source={require('../../assets/images/home/home-slider.png')}
            resizeMode='contain'
            style={{ width: '100%', height: imageHeight }}
            className='rounded-lg w-full'
          />
        </View>
        {/* categories */}
        <View>
          <Text style={{ fontFamily: FontFamily.poppinsSemiBold, fontSize: FontSize.size_xl }}>
          Categories
          </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

          </ScrollView>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        <FlatList
        
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
