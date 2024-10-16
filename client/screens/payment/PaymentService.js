import React, { useState } from "react";
import {
    View,
    Text,
    Pressable,
    SafeAreaView,
    StatusBar,
    Image,
    Platform,
    TouchableOpacity,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, FontSize } from "../../GlobalStyles";
import GlobalHeader from "../../components/Layout/GlobalHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const options = [
    {
        id: 1,
        title: "Table Service",
        image: require("../../assets/images/intro/introFood.png"),
    },
    {
        id: 2,
        title: "Counter Pick-up",
        image: require("../../assets/images/intro/introFood.png"),
    },
    {
        id: 3,
        title: "Advance Order",
        image: require("../../assets/images/intro/introFood.png"),
    },
];

const PaymentService = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [roomNumber, setRoomNumber] = useState("");
    const { top, bottom } = useSafeAreaInsets();

    const handleOptionPress = (optionId) => {
        if (optionId === 1) setModalVisible(true); // Open modal for Table Service
        else console.log("Selected option:", optionId);
    };

    const handleProceed = () => {
        console.log("Room Number:", roomNumber);
        setModalVisible(false); // Close modal
    };

    const closeModal = () => setModalVisible(false); // Close modal when tapping outside

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "white",
                paddingTop: Platform.OS === "ios" ? top : 0,
                paddingBottom: Platform.OS === "ios" ? 0 : bottom,
            }}
        >
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
                <View className="bg-white px-4 py-3">
                    <GlobalHeader title="Service Type" />
                </View>

                <View className="px-4 py-5">
                    <Text
                        style={{
                            fontSize: FontSize.size_xl,
                            fontFamily: FontFamily.poppinsSemiBold,
                        }}
                    >
                        How would you like to have your order?
                    </Text>
                </View>

                <View className="px-4 space-y-5 flex-1">
                    {options.map((option) => (
                        <TouchableOpacity
                            key={option.id}
                            onPress={() => handleOptionPress(option.id)}
                            className="flex-row items-center bg-white p-4 rounded-lg shadow-md"
                        >
                            <Image
                                source={option.image}
                                style={{ width: 80, height: 90, resizeMode: "cover", borderRadius: 8 }}
                            />
                            <Text
                                className="ml-4 text-base font-medium"
                                style={{ fontFamily: FontFamily.poppinsRegular }}
                            >
                                {option.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Modal for Room Number Input */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={closeModal}
                >
                    <TouchableWithoutFeedback onPress={closeModal}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-opaque background
                                justifyContent: "flex-end",
                            }}
                        >
                            <TouchableWithoutFeedback>
                                <KeyboardAvoidingView
                                    // behavior={Platform.OS === "ios" ? "" : undefined}
                                    style={{
                                        backgroundColor: "white",
                                        borderTopLeftRadius: 20,
                                        borderTopRightRadius: 20,
                                        padding: 24,
                                        shadowColor: "#000",
                                        shadowOpacity: 0.2,
                                        shadowOffset: { width: 0, height: -2 },
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: FontSize.size_lg,
                                            fontFamily: FontFamily.poppinsSemiBold,
                                            marginBottom: 12,
                                        }}
                                    >
                                        Enter Your Room Number
                                    </Text>
                                    <TextInput
                                        placeholder="Eg: B-203"
                                        value={roomNumber}
                                        onChangeText={setRoomNumber}
                                        keyboardType="number-pad"
                                        style={{
                                            height: 50,
                                            borderColor: "#ccc",
                                            borderWidth: 1,
                                            borderRadius: 8,
                                            paddingHorizontal: 12,
                                            marginBottom: 20,
                                        }}
                                    />
                                    <LinearGradient
                                        colors={["#007022", "#54d17a", "#bcffd0"]}
                                        start={{ x: 0, y: 1 }}
                                        end={{ x: 1.9, y: 0 }}
                                        style={{ borderRadius: 8 }}
                                    >
                                        <Pressable
                                            onPress={handleProceed}
                                            style={{
                                                padding: 15,
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: "white",
                                                    fontFamily: FontFamily.poppinsSemiBold,
                                                    fontSize: FontSize.size_lg,
                                                }}
                                            >
                                                Proceed
                                            </Text>
                                        </Pressable>
                                    </LinearGradient>
                                </KeyboardAvoidingView>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        </View>
    );
};

export default PaymentService;
