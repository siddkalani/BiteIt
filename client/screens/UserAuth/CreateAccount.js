import React, { useState } from "react";
import {
    StatusBar, Pressable, Text, View, Image, KeyboardAvoidingView,
    Platform, StyleSheet, TextInput, TouchableOpacity,
    SafeAreaView, ActivityIndicator, Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, FontSize } from "../../GlobalStyles";
import * as IconF from "react-native-feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import GlobalHeader from "../../components/Layout/GlobalHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { registerUser } from "../../api/userAuth";
import { BASE_URL } from "../../constants/constant";

const CreateAccount = () => {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({ name: "", phone: "", email: "", password: "" });
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // Error message state

    const handleInputChange = (field, value) => {
        let updatedValue = value;
        if (field === "email" && value.length > 0) {
            updatedValue = value.charAt(0).toLowerCase() + value.slice(1);
        }
        setFormData({ ...formData, [field]: updatedValue });
    };

    const togglePasswordVisibility = () => setIsPasswordHidden(!isPasswordHidden);

    const renderIcon = (iconName) => {
        const Icon = IconF[iconName];
        return <Icon width={20} height={20} stroke="gray" />;
    };

    const inputFields = [
        { icon: "User", placeholder: "Name", field: "name", keyboardType: "default" },
        { icon: "Phone", placeholder: "Phone number", field: "phone", keyboardType: "phone-pad" },
        { icon: "Mail", placeholder: "Enter email", field: "email", keyboardType: "email-address" },
        { icon: "Lock", placeholder: "Password", field: "password", keyboardType: "default", isPassword: true }
    ];

    const handleSubmit = () => {
        if (!formData.email || !formData.password) {
          setErrorMessage("Please fill all fields.");
          return;
        }
        setErrorMessage(""); // Clear any previous errors
        registerUser(formData, navigation, setIsLoading, setErrorMessage);
    };

    const { top, bottom } = useSafeAreaInsets();

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            <SafeAreaView style={{
                flex: 1,
                paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
                paddingBottom: Platform.OS === "ios" ? 0 : bottom,
            }} className="flex-1 bg-[#F4F5F9]">
                <StatusBar translucent backgroundColor="transparent" />
                <View className="bg-transparent px-4 py-3 z-[100]">
                    <GlobalHeader title="Create account" backgroundColor={'transparent'} textColor={'text-white'} iconColor={'white'} />
                </View>
                <View className="absolute top-0 left-0 right-0 bottom-0">
                    <Image source={require("../../assets/images/signIn/signIn.png")} style={styles.backgroundImage} />
                </View>
                <View className="absolute bottom-0 w-full flex-1 bg-[#F4F5F9] rounded-t-2xl px-4 py-6">
                    <View className='space-y-2'>
                        <View>
                            <Text style={styles.headerText} className='text-xl'>Create Account</Text>
                        </View>

                        <View className="space-y-2">
                            {inputFields.map(({ icon, placeholder, field, keyboardType, isPassword }) => (
                                <View key={field} style={styles.inputContainer} className="space-x-2">
                                    {renderIcon(icon)}
                                    <TextInput
                                        placeholder={placeholder}
                                        value={formData[field]}
                                        onChangeText={(value) => handleInputChange(field, value)}
                                        keyboardType={keyboardType}
                                        secureTextEntry={isPassword && isPasswordHidden}
                                        style={styles.inputText}
                                        className="flex-1"
                                    />
                                    {isPassword && (
                                        <TouchableOpacity onPress={togglePasswordVisibility}>
                                            <Ionicons name={isPasswordHidden ? "eye-off" : "eye"} size={20} color="gray" />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            ))}
                        </View>

                        {/* Error Message */}
                        {errorMessage ? (
                            <Text style={styles.errorText}>{errorMessage}</Text>
                        ) : null}
                    </View>

                    <View className='mt-4 space-y-1'>
                        <LinearGradient colors={["#2b054c", "#2b054c", "#bcffd0"]} start={{ x: 0, y: 1 }} end={{ x: 1.9, y: 0 }} className="rounded-xl">
                            <Pressable className="p-3 justify-center items-center" onPress={handleSubmit} disabled={isLoading}>
                                {isLoading ? (
                                    <ActivityIndicator size="small" color="#ffffff" /> // Show loading spinner
                                ) : (
                                    <Text style={styles.buttonText}>Continue</Text>
                                )}
                            </Pressable>
                        </LinearGradient>

                        <View style={styles.signUpContainer}>
                            <Text style={styles.signUpText}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
                                <Text style={[styles.signUpText, { fontFamily: FontFamily.poppinsSemiBold, color: '#0070FF' }]}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        resizeMode: "cover",
        height: "100%",
        width: "100%"
    },
    headerText: {
        fontFamily: FontFamily.poppinsBold,
        fontSize: FontSize.textRegularLowercase_size,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: 10,
        borderRadius: 8,
    },
    inputText: {
        fontFamily: FontFamily.poppinsRegular,
        fontSize: FontSize.size_mini,
    },
    buttonText: {
        fontFamily: FontFamily.poppinsSemiBold,
        fontSize: FontSize.size_lg,
        color: 'white',
    },
    signUpContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    signUpText: {
        fontFamily: FontFamily.poppinsRegular,
        fontSize: FontSize.size_mini,
        color: '#868889',
    },
    errorText: {
        color: 'red',
        fontSize: FontSize.size_mini,
        fontFamily: FontFamily.poppinsRegular,
        marginTop: 5,
    },
});

export default CreateAccount;
