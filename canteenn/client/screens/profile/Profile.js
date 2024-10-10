import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    SafeAreaView,
    StatusBar,
    KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Feather, MaterialIcons } from "@expo/vector-icons";
import ProfileHeader from "./ProfileHeader";
import { FontFamily, FontSize } from "../../GlobalStyles";

const ProfilePage = () => {
    const [isEditingDetails, setIsEditingDetails] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [details, setDetails] = useState({
        name: "Dennice Castillo",
        id: "2018-000001",
        contact: "09090215234",
    });

    const [password, setPassword] = useState({
        currentPassword: "sample15",
    });

    const [showPassword, setShowPassword] = useState(false);

    const toggleEditDetails = () => {
        setIsEditingDetails(!isEditingDetails);
    };

    const toggleEditPassword = () => {
        setIsEditingPassword(!isEditingPassword);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSaveSettings = () => {
        // Handle save logic here
        setIsEditingDetails(false);
        setIsEditingPassword(false);
        console.log("Details saved:", details);
        console.log("Password saved:", password);
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            {/* <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}> */}
                <View className="flex-1 bg-gray-100">
                    {/* Back Button with white background */}
                    <View className="bg-white px-4 py-3">
                        <ProfileHeader />
                    </View>

                    {/* Personal Details Section */}
                    <View className="p-4 ">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-lg font-bold">Personal Details</Text>
                            <Pressable onPress={toggleEditDetails}>
                                <Text className="text-green-500">{isEditingDetails ? "Cancel" : "Edit"}</Text>
                            </Pressable>
                        </View>

                        <View className="space-y-4">
                            {/* Name Field */}
                            <View className="flex-row items-center p-3 rounded-lg bg-white">
                                <FontAwesome name="user" size={20} color="gray" />
                                <TextInput
                                    className="ml-3 flex-1"
                                    editable={isEditingDetails}
                                    value={details.name}
                                    onChangeText={(text) =>
                                        setDetails({ ...details, name: text })
                                    }
                                />
                            </View>

                            {/* ID Field */}
                            <View className="flex-row items-center p-3 rounded-lg bg-white">
                                <MaterialIcons name="badge" size={20} color="gray" />
                                <TextInput
                                    className="ml-3 flex-1"
                                    editable={isEditingDetails}
                                    value={details.id}
                                    onChangeText={(text) =>
                                        setDetails({ ...details, id: text })
                                    }
                                />
                            </View>

                            {/* Contact Field */}
                            <View className="flex-row items-center p-3 rounded-lg bg-white">
                                <Feather name="phone" size={20} color="gray" />
                                <TextInput
                                    className="ml-3 flex-1"
                                    editable={isEditingDetails}
                                    value={details.contact}
                                    onChangeText={(text) =>
                                        setDetails({ ...details, contact: text })
                                    }
                                />
                            </View>
                        </View>
                    </View>

                    {/* Password Section */}
                    <View className="p-4">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-lg font-bold">Change Password</Text>
                            <Pressable onPress={toggleEditPassword}>
                                <Text className="text-green-500">{isEditingPassword ? "Cancel" : "Edit"}</Text>
                            </Pressable>
                        </View>

                        <View className="flex-row items-center p-3 rounded-lg bg-white">
                            <Feather name="lock" size={20} color="gray" />
                            <TextInput
                                className="ml-3 flex-1"
                                editable={isEditingPassword}
                                secureTextEntry={!showPassword}
                                value={password.currentPassword}
                                onChangeText={(text) =>
                                    setPassword({ ...password, currentPassword: text })
                                }
                            />
                            <Pressable onPress={togglePasswordVisibility}>
                                <Feather
                                    name={showPassword ? "eye-off" : "eye"}
                                    size={20}
                                    color="gray"
                                />
                            </Pressable>
                        </View>
                    </View>

                    {/* Save Settings Button at Bottom */}
                    <View className="p-4 mb-4 absolute w-full bottom-0">
                        <LinearGradient
                            colors={["#007022", "#54d17a", "#bcffd0"]}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1.9, y: 0 }}
                            className="rounded-xl"
                        >
                            <Pressable
                                onPress={handleSaveSettings}
                                className="p-3 justify-center items-center"
                            >
                                <Text
                                    className="text-white"
                                    style={{
                                        fontFamily: FontFamily.poppinsSemiBold,
                                        fontSize: FontSize.size_lg,
                                    }}
                                >
                                    Save settings
                                </Text>
                            </Pressable>
                        </LinearGradient>
                    </View>
                </View>
            {/* </KeyboardAvoidingView> */}
        </SafeAreaView>
    );
};

export default ProfilePage;
