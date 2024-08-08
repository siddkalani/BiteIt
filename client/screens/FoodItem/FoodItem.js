import { Platform, StatusBar, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

const FoodItem = () => {
    const { top, bottom } = useSafeAreaInsets();

    return (
        <LinearGradient
            colors={['#d4f4d1', '#ffffff']} // Light green to white gradient
            style={{ flex: 1 }} // Ensures the gradient takes up the entire container
        >
            <View
                style={{
                    flex: 1,
                    paddingTop: Platform.OS === "ios" ? top : StatusBar.currentHeight,
                    paddingBottom: Platform.OS === "ios" ? 0 : bottom,
                }}
                className=""
            >
                <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

                <View className="flex-1 flex-col items-center space-x-2 px-4 py-2">
                    <View className='w-full'>
                        <TouchableOpacity className="p-2">
                            <Ionicons name="arrow-back" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    {/* food image */}
                    <View className='w-full h-full'>
                        <Image
                            source={require('./ramen.png')} // Replace with your image source
                            style={{ width: '100%', height: 300 }} // Adjust height as needed
                            resizeMode="cover"
                        />
                    </View>
                </View>
                <View className='flex-1'>
                    <Text>hi</Text>
                </View>
            </View>
        </LinearGradient>
    );
}

export default FoodItem;
