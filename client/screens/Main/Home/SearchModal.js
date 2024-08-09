import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    FlatList,
    Image,
} from "react-native";
import { SafeAreaView } from "react-native";
import * as Icon from "react-native-feather";
import { FontFamily, FontSize } from "../../../GlobalStyles";

const initialSearchHistory = [
    { name: "Pizza", image: require("../../../assets/images/categories/icecream.png") },
    { name: "Burgers", image: require("../../../assets/images/categories/icecream.png") },
    { name: "Sushi", image: require("../../../assets/images/categories/icecream.png") },
    { name: "Pasta", image: require("../../../assets/images/categories/icecream.png") },
];
const categories = [
    { name: "Italian", image: require("../../../assets/images/categories/icecream.png") },
    { name: "Chinese", image: require("../../../assets/images/categories/icecream.png") },
    { name: "Mexican", image: require("../../../assets/images/categories/icecream.png") },
    { name: "Indian", image: require("../../../assets/images/categories/icecream.png") },
    { name: "Dessert", image: require("../../../assets/images/categories/icecream.png") },
    { name: "Drinks", image: require("../../../assets/images/categories/icecream.png") },
];

const SearchModal = ({ isModalVisible, closeSearchModal }) => {
    const [searchHistory, setSearchHistory] = useState(initialSearchHistory);

    const removeSearchItem = (item) => {
        setSearchHistory(searchHistory.filter((historyItem) => historyItem.name !== item));
    };

    return (
        <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={closeSearchModal}
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View className="flex-1 justify-start bg-black bg-opacity-50">
                        <SafeAreaView
                            style={{
                                flex: 1,
                                backgroundColor: "white",
                                overflow: "hidden",
                            }}
                        >
                            <View className="bg-white px-4 py-2 flex-1 rounded-none">
                                <View className="flex-row justify-between items-center">
                                    <Text
                                        style={{
                                            fontFamily: FontFamily.poppinsMedium,
                                            fontSize: FontSize.size_lg,
                                        }}
                                    >
                                        Search
                                    </Text>
                                    <TouchableOpacity onPress={closeSearchModal}>
                                        <Icon.X width={24} height={24} stroke="black" />
                                    </TouchableOpacity>
                                </View>
                                <View className="flex-row bg-[#F4F5F9] items-center p-2 rounded-lg mt-4">
                                    <Icon.Search height="20" width="20" stroke="gray" />
                                    <TextInput
                                        placeholder="What are you craving?"
                                        className="flex-1 ml-2"
                                        autoFocus
                                    />
                                </View>

                                {/* Recent Searches */}
                                <View className="mt-4">
                                    <Text
                                        style={{
                                            fontFamily: FontFamily.poppinsSemiBold,
                                            fontSize: FontSize.size_md,
                                        }}
                                    >
                                        Recent Searches
                                    </Text>
                                    <FlatList
                                        data={searchHistory}
                                        renderItem={({ item }) => (
                                            <View
                                                className="bg-white p-4 mt-2 rounded-lg shadow flex-row justify-between items-center"
                                                style={{
                                                    width: "98%",
                                                    alignSelf: "center",
                                                    shadowColor: "#000",
                                                    shadowOffset: { width: 0, height: 2 },
                                                    shadowOpacity: 0.1,
                                                    shadowRadius: 5,
                                                    elevation: 3,
                                                }}
                                            >
                                                <View className="flex-row items-center">
                                                    <Image
                                                        source={item.image}
                                                        className="w-7 h-7 rounded-lg mr-3"
                                                        style={{ resizeMode: "contain" }}
                                                    />
                                                    <Text
                                                        style={{
                                                            fontFamily: FontFamily.poppinsMedium,
                                                            fontSize: FontSize.size_md,
                                                        }}
                                                    >
                                                        {item.name}
                                                    </Text>
                                                </View>
                                                <TouchableOpacity onPress={() => removeSearchItem(item.name)}>
                                                    <Icon.X width={20} height={20} stroke="red" />
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                        keyExtractor={(item, index) => index.toString()}
                                        contentContainerStyle={{ paddingBottom: 10 }}
                                    />
                                </View>

                                {/* Categories */}
                                <View className="mt-4">
                                    <Text
                                        style={{
                                            fontFamily: FontFamily.poppinsSemiBold,
                                            fontSize: FontSize.size_md,
                                        }}
                                    >
                                        Categories
                                    </Text>
                                    <FlatList
                                        data={categories}
                                        renderItem={({ item }) => (
                                            <View
                                                className="w-1/3 p-2"
                                                style={{
                                                    alignItems: "center",
                                                }}
                                            >
                                                <View
                                                    className="bg-white rounded-lg shadow w-full py-1"
                                                    style={{
                                                        alignItems: "center",
                                                        shadowColor: "#000",
                                                        shadowOffset: { width: 0, height: 2 },
                                                        shadowOpacity: 0.1,
                                                        shadowRadius: 5,
                                                        elevation: 3,
                                                    }}
                                                >
                                                    <Image
                                                        source={item.image}
                                                        className="w-16 h-16 rounded-lg"
                                                        style={{ resizeMode: "cover" }}
                                                    />
                                                    <Text
                                                        style={{
                                                            fontFamily: FontFamily.poppinsMedium,
                                                            fontSize: FontSize.size_md,
                                                        }}
                                                    >
                                                        {item.name}
                                                    </Text>
                                                </View>
                                            </View>
                                        )}
                                        keyExtractor={(item, index) => index.toString()}
                                        numColumns={3}
                                        contentContainerStyle={{ paddingBottom: 10 }}
                                    />
                                </View>
                            </View>
                        </SafeAreaView>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default SearchModal;
