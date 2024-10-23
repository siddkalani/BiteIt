import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, SafeAreaView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as IconF from "react-native-feather"; // Feather icons already imported
import Icon from 'react-native-vector-icons/Ionicons'; // Ionicons for MenuItem icons
import { useNavigation } from '@react-navigation/native';

const Account = () => {
    const insets = useSafeAreaInsets(); // Using SafeAreaInsets to get padding values for iOS and Android
    const navigation = useNavigation();

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
                        <Text className="text-white text-2xl font-bold">SIDDHARTH KALANI</Text>
                        <Text numberOfLines={1} className="text-white mt-1">+91 - 8238592699 • siddh.kalani@somaiya.edu</Text>
                    </View>
                </View>

                {/* Scrollable menu content */}
                <ScrollView
                    className="bg-[#f9f9f9] flex-1"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: insets.bottom + (Platform.OS === 'android' ? 60 : 40) }}
                >
                    {/* First menu block (like One Membership, Swiggy HDFC Credit Card, etc.) */}
                    <MenuItem icon="star-outline" text="One Membership" badge="ACTIVE" description="You've saved ₹2,403 in 75 days. Explore more benefits." />
                    <MenuItem icon="card-outline" text="Swiggy HDFC Bank Credit Card" description="Apply for the card and start earning cashbacks!" />

                    {/* My Account Section */}
                    <SectionHeader title="My Account" />
                    <MenuItem onPress={handleProfile} icon="person-outline" text="Profile" description="Full name, password & Settings" />
                    <MenuItem icon="list-outline" text="My Eatlists" badge="NEW" description="View all your saved lists in one place" />
                    <MenuItem icon="location-outline" text="Addresses" description="Share, Edit & Add New Addresses" />
                    <MenuItem icon="cash-outline" text="Payments & Refunds" description="Refund Status & Payment Modes" />

                    {/* Other sections */}
                    <MenuItem icon="wallet-outline" text="Swiggy Money & Gift Cards" description="Account balance, Gift cards & Transaction History" />
                    <MenuItem icon="gift-outline" text="Refer & Earn" description="Refer friends & earn on Swiggy" />
                </ScrollView>
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
