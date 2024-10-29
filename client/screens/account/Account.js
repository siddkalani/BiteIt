import React, { useState ,useEffect} from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, SafeAreaView, Platform } from 'react-native';
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

    const [user, setUser] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Function to fetch user details from the backend
    const fetchUserDetails = async (userId) => {
        try {
            const response = await axios.get(`${BASE_URL}/user/${userId}`);
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    // Function to check Async Storage for user ID
    const checkUserId = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            if (userId) {
                setIsLoggedIn(true);
                fetchUserDetails(userId); // Fetch user details if ID exists
            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error('Error checking user ID in Async Storage:', error);
        }
    };

    useEffect(() => {
        checkUserId();
    }, []);


    const handleProfile = () => {
        navigation.navigate('ProfilePage');
        console.log("Profile clicked");
    };

    const handleBack = () => {
        navigation.navigate('Home');
        console.log("Back clicked");
    };


    return (
        <View className="flex-1" style={{ paddingBottom: insets.bottom }}>
            <StatusBar barStyle="light-content" backgroundColor={'#831a1d'} />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#831a1d', paddingTop: insets.top }}>
                {/* Header with user information */}
                <View className="bg-[#831a1d] px-4 pb-5">
                    <View className="flex-row items-center mb-2">
                        <TouchableOpacity onPress={handleBack} className="p-2 bg-gray-200 rounded-full">
                            <IconF.ChevronLeft width={24} height={24} stroke="black" />
                        </TouchableOpacity>
                    </View>
                    <View>
                    {isLoggedIn && user ? (
                            <>
                        <Text className="text-white text-2xl font-bold">{user.name}</Text>
                        <Text numberOfLines={1} className="text-white mt-1">+91 - {user.phone}• {user.email}</Text>
                        </>
                        ) : (
                            <Text className="text-white text-xl font-bold">Login to see your profile</Text>
                        )}
                    </View>
                </View>

                {/* Scrollable menu content */}
                {isLoggedIn ? (
                    <ScrollView
                        className="bg-[#f9f9f9] flex-1"
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: insets.bottom + (Platform.OS === 'android' ? 60 : 40) }}
                    >
                        <MenuItem icon="star-outline" text="One Membership" badge="ACTIVE" description="You've saved ₹2,403 in 75 days. Explore more benefits." />
                        <MenuItem icon="card-outline" text="Swiggy HDFC Bank Credit Card" description="Apply for the card and start earning cashbacks!" />

                        <SectionHeader title="My Account" />
                        <MenuItem onPress={handleProfile} icon="person-outline" text="Profile" description="Full name, password & Settings" />
                        <MenuItem icon="list-outline" text="My Eatlists" badge="NEW" description="View all your saved lists in one place" />
                        <MenuItem icon="location-outline" text="Addresses" description="Share, Edit & Add New Addresses" />
                        <MenuItem icon="cash-outline" text="Payments & Refunds" description="Refund Status & Payment Modes" />

                        <MenuItem icon="wallet-outline" text="Swiggy Money & Gift Cards" description="Account balance, Gift cards & Transaction History" />
                        <MenuItem icon="gift-outline" text="Refer & Earn" description="Refer friends & earn on Swiggy" />
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
