import React, { useRef, useEffect, useState } from 'react';
import {
  View, Text, Image, TouchableOpacity, LayoutAnimation,
  UIManager, Platform, StatusBar, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Modalize } from 'react-native-modalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GlobalHeader from '../../components/Layout/GlobalHeader';
import * as Icon from 'react-native-feather';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { height: screenHeight } = Dimensions.get('window'); // Get screen height

const OrderTrackingScreen = () => {
  const modalizeRef = useRef(null); // Reference to Modalize
  const [isExpanded, setIsExpanded] = useState(false); // State for dropdown

  useEffect(() => {
    modalizeRef.current?.open(); // Open at the initial snap point
  }, []);

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar barStyle="dark-content" backgroundColor="white" />

        <View className="flex-1 bg-gray-100">
          {/* Back Button and Header */}
          <View className="bg-white px-4 py-3">
            <GlobalHeader title="" />
          </View>

          {/* Delivery Time Section */}
          <View className="px-4 bg-white shadow-inner rounded-b-3xl">
            <View className="p-2">
              <Text className="text-lg font-semibold">Estimated delivery between</Text>
              <Text className="text-3xl font-bold mt-2">20:00 – 20:20</Text>
            </View>

            {/* Order Status with Dropdown */}
            <View className="p-2">
              <View className="flex-row justify-between items-center h-10">
                <View className="flex-row items-center">
                  <View className="bg-orange-500 w-3 h-3 rounded-full mr-2" />
                  <Text className="text-lg font-semibold">Thanks for your order</Text>
                </View>
                <TouchableOpacity
                  className="p-1 bg-gray-200 rounded-full"
                  onPress={toggleDropdown}
                >
                  {isExpanded ? (
                    <Icon.ChevronUp width={24} height={24} stroke="black" />
                  ) : (
                    <Icon.ChevronDown width={24} height={24} stroke="black" />
                  )}
                </TouchableOpacity>
              </View>

              {isExpanded && (
                <View>
                  <View className="flex-row items-center h-10">
                    <View className="bg-orange-500 w-3 h-3 rounded-full mr-2" />
                    <Text className="text-lg font-semibold">Preparing your order</Text>
                  </View>
                  <View className="flex-row items-center h-10">
                    <View className="bg-orange-500 w-3 h-3 rounded-full mr-2" />
                    <Text className="text-lg font-semibold">Delivering your order</Text>
                  </View>
                  <View className="flex-row items-center h-10">
                    <View className="bg-orange-500 w-3 h-3 rounded-full mr-2" />
                    <Text className="text-lg font-semibold">Delivered</Text>
                  </View>
                </View>
              )}
            </View>
          </View>

          {/* Illustration */}
          <View
            style={{
              height: screenHeight * 0.3, 
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={require('../../assets/images/tracking/Preparing.png')}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
              className=''
            />
          </View>
        </View>

        {/* Bottom Sheet with Modalize */}
        <Modalize
          ref={modalizeRef}
          withOverlay={true}
          withHandle={false}
          snapPoint={350} 
          modalHeight={550}
          alwaysOpen={350}
        >
          <View className="p-5">
            {/* Small Gray Line (Drag Indicator) */}
            <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-3" />

            {/* Order Details */}
            <Text className="text-xl font-semibold">Order details</Text>
            <Text className="text-gray-500 mt-2">Fleet Place House, 2 Fleet Place, London</Text>
            <Text className="text-gray-500 mt-1">Please knock, don’t ring.</Text>

            {/* Items List */}
            <View className="mt-5">
              <Text className="text-lg font-bold">Lucky Cat</Text>
              <Text className="text-gray-500 mb-4">Order no. 17041994</Text>

              <View className="flex-row justify-between items-center mb-3">
                <Text className="flex-1">1 Noodle box</Text>
                <Text className="font-semibold">£10.99</Text>
              </View>
              <View className="flex-row justify-between items-center mb-3">
                <Text className="flex-1">1 Prawn crackers</Text>
                <Text className="font-semibold">£3.00</Text>
              </View>
              <View className="flex-row justify-between items-center mb-3">
                <Text className="flex-1">1 Thai green curry chicken</Text>
                <Text className="font-semibold">£11.45</Text>
              </View>

              <View className="flex-row justify-between items-center mt-4 border-t border-gray-300 pt-4">
                <Text className="font-semibold">Total paid</Text>
                <Text className="font-semibold">£26.44</Text>
              </View>
            </View>

            <TouchableOpacity className="mt-5">
              <Text className="text-orange-500">Open your receipt</Text>
            </TouchableOpacity>
          </View>
        </Modalize>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default OrderTrackingScreen;
