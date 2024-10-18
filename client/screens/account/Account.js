import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Platform, StatusBar, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing icons from react-native-vector-icons
import GlobalHeader from '../../components/Layout/GlobalHeader';

const Account = () => {
    const { top, bottom } = useSafeAreaInsets();
    return (

        <SafeAreaView className="flex-1 bg-white"
            style={{
                flex: 1,
                paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
                paddingBottom: Platform.OS === "ios" ? 0 : bottom,
            }}>
            <StatusBar barStyle="dark-content" translucent />
            {/* <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}> */}
            <View className="flex-1 bg-gray-100">
                {/* Back Button with white background */}
                <View className="bg-white px-4 py-3">
                    <GlobalHeader title="About Me" />
                </View>

                {/* Menu List */}
                <ScrollView className="flex-1 mt-4">
                    <MenuItem icon="reorder-three-outline" text="My Orders" />
                    <MenuItem icon="person-outline" text="My Profile" />
                    <MenuItem icon="location-outline" text="Delivery Address" />
                    <MenuItem icon="card-outline" text="Payment Methods" />
                    <MenuItem icon="mail-outline" text="Contact Us" />
                    <MenuItem icon="settings-outline" text="Settings" />
                    <MenuItem icon="help-circle-outline" text="Helps & FAQs" />
                </ScrollView>
            </View>
        </SafeAreaView >
    );
};

// Menu Item Component
const MenuItem = ({ icon, text }) => (
    <TouchableOpacity className="flex-row items-center py-4 px-6">
        <Icon name={icon} size={24} color="#555" />
        <Text className="ml-4 text-lg text-gray-700">{text}</Text>
    </TouchableOpacity>
);

export default Account;
