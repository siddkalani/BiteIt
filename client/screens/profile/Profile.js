import React, { useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    Alert,
    Platform,
    StatusBar,
    Pressable,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
    removeFromCart,
    updateCartQuantity,
    clearCart,
} from "../../store/Slices/cartSlice"; // Adjust the path as needed
import * as Icon from "react-native-feather";
import { SafeAreaView } from "react-native-safe-area-context";
import { BASE_URL } from "@env";
import {
    saveCartToStorage,
    loadCartFromStorage,
} from "../../utils/storageUtils"; // Adjust the path as needed
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CartHeader from "../Cart/CartHeader";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, FontSize } from "../../GlobalStyles";

const Profile = () => {
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const navigation = useNavigation();
    const handlePress = () => {
        navigation.navigate('Home');
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Status bar with white background */}
            <StatusBar
                barStyle="dark-content"
                backgroundColor="white" // For Android
                translucent={false} // Ensures the status bar is not transparent
            />

            {/* Back Button with white background */}
            <View className="bg-white px-4 py-3">
                <CartHeader />
            </View>
        </SafeAreaView>

    );
};

export default Profile;




