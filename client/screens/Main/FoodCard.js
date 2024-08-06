import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { FontFamily, FontSize } from '../../GlobalStyles';
import { LinearGradient } from 'expo-linear-gradient';
import * as Icon from "react-native-feather";

const FoodCard = ({ item }) => {
    return (
        <View className='flex-1 '>
            <View className='bg-white rounded-lg p-2 w-full items-center space-y-1'>
                <View className='w-full h-20 rounded-lg bg-green-400'></View>
                <Text style={{ fontFamily: FontFamily.poppinsMedium, fontSize: FontSize.size_mini }} className='text-green-600'>${item.price}</Text>
                <Text style={{ fontFamily: FontFamily.poppinsMedium, fontSize: FontSize.size_mini }} className=''>{item.name}</Text>
                <LinearGradient
                    colors={["#007022", "#54d17a", "#bcffd0"]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1.9, y: 0 }}
                    className='rounded-md w-full'
                >
                    <Pressable className='py-1 justify-center items-center'>
                    <Icon.ShoppingBag width={22} height={22} stroke="gray" />
                        <Text className='text-white' style={{ fontFamily: FontFamily.poppinsMedium , fontSize:FontSize.size_mini}}>Add to cart</Text>
                    </Pressable>
                </LinearGradient>
            </View>
        </View>
    );
};

export default FoodCard;
