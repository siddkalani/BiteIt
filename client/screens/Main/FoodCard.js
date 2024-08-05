import React from 'react';
import { View, Text, Image } from 'react-native';
import { FontFamily, FontSize } from '../../GlobalStyles';

const FoodCard = ({ item }) => {
    return (
        <View className='flex-1 p-2'>
            <View className='bg-white rounded-lg p-2 w-full items-center space-y-1'>
                <View className='w-full h-16 rounded-lg bg-orange-400'></View>
                <Text style={{ fontFamily: FontFamily.poppinsMedium, fontSize: FontSize.size_mini }} className='text-green-600'>${item.price}</Text>
                <Text style={{ fontFamily: FontFamily.poppinsMedium, fontSize: FontSize.size_mini }} className=''>{item.name}</Text>        
            </View>
        </View>
    );
};

export default FoodCard;
