import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import * as Icon from "react-native-feather";

const Footer = () => {
    return (
        <View className="flex-row justify-around items-center shadow-md bg-white border-t border-gray-200 py-2">
            <TouchableOpacity className="items-center">
                <Icon.Home width={24} height={24} stroke="gray" />
            </TouchableOpacity>
            <TouchableOpacity className="items-center">
                <Icon.User width={22} height={22} stroke="gray" />
            </TouchableOpacity>
        </View>
    )
}

export default Footer