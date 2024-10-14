// PaymentOptionScreen.js
import React from 'react';
import { View, Text,Platform, TouchableOpacity,StatusBar, ScrollView,SafeAreaView, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome, MaterialIcons } from 'react-native-vector-icons';
import GlobalHeader from '../../components/Layout/GlobalHeader';
import {useSafeAreaInsets } from "react-native-safe-area-context";

const PaymentOption = () => {
  const navigation = useNavigation();
  const { top, bottom } = useSafeAreaInsets();
  const paymentMethods = [
    { name: 'Add new card', icon: 'credit-card-plus-outline', color: 'gray' },
    { name: 'GCash', icon: 'wallet-outline', color: '#0079FF' },
    { name: 'Landbank ATM Online', icon: 'bank', color: '#388E3C' },
    { name: 'Metrobankdirect', icon: 'bank-outline', color: '#1A237E' },
    { name: 'Unionbank Internet Banking', icon: 'bank-transfer', color: '#FF5722' },
    { name: 'RCBC Online Banking', icon: 'bank-transfer-out', color: '#0057A8' },
    { name: 'BPI Online', icon: 'bank', color: '#D32F2F' },
  ];

  return (
    <View
      className="flex-1 bg-white"
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? top : 0, // Apply paddingTop only for iOS
        paddingBottom: Platform.OS === "ios" ? 0 : bottom, // Apply paddingBottom for Android
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      {/* Back Button with white background */}
      <View className="flex-1 bg-gray-100">
      <View className="bg-white px-4 py-3">
        <GlobalHeader title="Service Type" />
      </View>

      {/* Payment Options */}
      <ScrollView className="py-3 px-4">
        {paymentMethods.map((method, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row items-center bg-white p-4 rounded-lg mb-3"
          >
            <Icon name={method.icon} size={30} color={method.color} />
            <Text className="ml-4 text-base">{method.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      </View>
    </View>
  );
};

export default PaymentOption;
