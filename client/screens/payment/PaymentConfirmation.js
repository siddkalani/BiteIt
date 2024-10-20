// ConfirmPaymentScreen.js
import React from 'react';
import { View, Text, Pressable, Platform, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Install via: `expo install @expo/vector-icons`
import GlobalHeader from '../../components/Layout/GlobalHeader';
import { StatusBar } from 'react-native-web';

const PaymentConfirmation = ({ navigation }) => {
  return (
    <View className="flex-1 bg-white"
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
        paddingBottom: Platform.OS === "ios" ? 0 : bottom,
      }}>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      {/* <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}> */}
      <View className="flex-1 bg-gray-100">
        {/* Back Button with white background */}
        <View className="bg-white px-4 py-3">
          {/* Header Section */}
          <GlobalHeader title='Payment Confirmation' />
        </View>
          {/* Success Icon */}
          <View className='flex-1 items-center justify-center'>
            <View className=" justify-center items-center">
              <View className="bg-green-500 rounded-full h-28 w-28 flex justify-center items-center">
                <Ionicons name="checkmark" size={64} color="white" />
              </View>
            </View>

            {/* Success Message */}
            <View className="items-center">
              <Text className="text-xl font-bold">Thank you!</Text>
              <Text className="text-gray-500 mt-2">We hope to serve you again.</Text>
            </View>
          </View>
        </View>
    </View>
  );
};

export default PaymentConfirmation;