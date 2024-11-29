import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, SafeAreaView, Platform, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as IconF from "react-native-feather"; // Feather icons already imported
import Icon from 'react-native-vector-icons/Ionicons'; // Ionicons for MenuItem icons
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../../constants/constant';

const Account = () => {
    const insets = useSafeAreaInsets(); // Using SafeAreaInsets to get padding values for iOS and Android
    const navigation = useNavigation();

    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state for skeleton screen

    // Function to fetch user details from the backend
    const fetchUserDetails = async (userId) => {
        try {
            const token = await AsyncStorage.getItem('userToken'); // Retrieve accessToken
            const response = await axios.get(`${BASE_URL}/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Set Bearer token in headers
                },
            });
            setUser(response.data);
            setLoading(false); // Stop loading after data is fetched
        } catch (error) {
            console.error('Error fetching user details:', error);
            
            if (error.response?.status === 401) {
                logoutUser(navigation); 
              } 

        }
    };

    // Function to check Async Storage for user ID
    const checkUserId = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            if (userId) {
                setIsLoggedIn(true);
                await fetchUserDetails(userId); // Fetch user details if ID exists
            } else {
                setIsLoggedIn(false);
                setLoading(false); // Stop loading if not logged in
            }
        } catch (error) {
            console.error('Error checking user ID in Async Storage:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        checkUserId();
    }, []);

    const handleProfile = () => {
        navigation.navigate('ProfilePage');
        console.log("Profile clicked");
    };

    const handleOrders = () => {
        navigation.navigate('OrderHistory');
    };

    const handleBack = () => {
        navigation.navigate('Home');
    };

    return (
        <View className="flex-1" style={{ paddingBottom: insets.bottom }}>
            <StatusBar barStyle="light-content" backgroundColor={'#2b054c'} />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#2b054c', paddingTop: insets.top }}>
                {/* Header with user information */}
                <View className="bg-[#2b054c] px-4 pb-5">
                    <View className="flex-row items-center mb-2">
                        <TouchableOpacity onPress={handleBack} className="p-2 bg-gray-200 rounded-full">
                            <IconF.ChevronLeft width={24} height={24} stroke="black" />
                        </TouchableOpacity>
                    </View>
                    <View>
                        {loading ? (
                            <View className="mt-2">
                                <SkeletonPlaceholder />
                            </View>
                        ) : isLoggedIn && user ? (
                            <>
                                <Text className="text-white text-2xl font-bold">{user.name}</Text>
                                <Text numberOfLines={1} className="text-white mt-1">
                                    +91 - {user.phone} • {user.email}
                                </Text>
                            </>
                        ) : (
                            <Text className="text-white text-xl font-bold">Login to see your profile</Text>
                        )}
                    </View>
                </View>

                {/* Scrollable menu content */}
                {loading ? (
                    <LoadingSkeletonMenu />
                ) : isLoggedIn ? (
                    <ScrollView
                        className="bg-[#f9f9f9] flex-1"
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: insets.bottom + (Platform.OS === 'android' ? 60 : 40) }}
                    >
                        <SectionHeader title="My Account" />
                        <MenuItem onPress={handleProfile} icon="person-outline" text="Profile" description="Full name, password & Settings" />
                        <MenuItem onPress={handleOrders} icon="list-outline" text="My Orders" badge="NEW" description="View all your past orders in one place" />
                        <MenuItem icon="location-outline" text="Address" badge="UPCOMING" description="Your saved address" />
                        <MenuItem icon="document-outline" text="T&Cs" description="Terms & Conditions" />
                        <MenuItem icon="wallet-outline" text="Wallet" description="Account balance & Gift cards" badge="UPCOMING" />
                        <MenuItem icon="help-outline" text="FAQs" description="Frequently asked questions" />
                    </ScrollView>
                ) : (
                    <View className="flex-1 justify-center items-center bg-[#f9f9f9]">
                        <Text className="text-lg text-[#555] font-bold">Login to access your account details</Text>
                    </View>
                )}
            </SafeAreaView>
        </View>
    );
};

// Skeleton for profile and menu
const SkeletonPlaceholder = () => (
    <View className="my-2">
        <View className="h-6 w-3/4 bg-gray-300 mb-2" />
        <View className="h-4 w-2/4 bg-gray-300 " />
    </View>
);

const LoadingSkeletonMenu = () => (
    <ScrollView className="bg-[#f9f9f9] flex-1" contentContainerStyle={{ padding: 16 }}>
        {Array(5)
            .fill()
            .map((_, index) => (
                <View key={index} className="h-16 bg-gray-200 rounded-lg mb-4" />
            ))}
    </ScrollView>
);

// Section Header Component
const SectionHeader = ({ title }) => (
    <View className="bg-[#f9f9f9] px-4 py-2">
        <Text className="text-lg text-[#555] font-bold">{title}</Text>
    </View>
);

// Menu Item Component
const MenuItem = ({ icon, text, description, badge, onPress }) => (
    <TouchableOpacity onPress={onPress} className="flex-row items-center px-6 py-4 bg-white my-1">
        <Icon name={icon} size={24} color="#555" />
        <View className="ml-4 flex-1">
            <View className="flex-row justify-between items-center">
                <Text className="text-base text-[#333]">{text}</Text>
                {badge && <Text className="text-xs text-[#00a676] bg-[#e0f9f1] px-2 py-1 rounded-full">{badge}</Text>}
            </View>
            {description && <Text className="text-sm text-[#888]">{description}</Text>}
        </View>
    </TouchableOpacity>
);

export default Account;
