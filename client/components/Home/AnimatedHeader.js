import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StatusBar, Animated, Platform, Alert } from "react-native";
import { SafeAreaView } from "react-native";
import * as Icon from "react-native-feather";
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchBar from "./SearchBar";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { clearCart } from "../../store/Slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";

const AnimatedHeader = ({
  openLocationModal,
  openSearchModal,
  scrollY,
  STICKY_SEARCH_THRESHOLD,
  deliverTextOpacity,
  deliverTextTranslateY,
}) => {
  const navigation = useNavigation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();
  // Check if the user is authenticated
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await AsyncStorage.getItem("userToken");
      setIsAuthenticated(!!token); // Set to true if token exists, otherwise false
    };
    checkAuthStatus();
  }, []);

  // Handle Logout function
  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: async () => {
          try {
            await AsyncStorage.removeItem("userToken");
            await AsyncStorage.removeItem("userId");
            await AsyncStorage.removeItem("userRefreshToken");
            await AsyncStorage.removeItem("userName");
            await AsyncStorage.removeItem("role");
            
            dispatch(clearCart());

            setIsAuthenticated(false); 
            // Reset auth status
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Intro" }],
              })
            );
          } catch (error) {
            console.error("Logout Error:", error);
          }
        },
      },
    ]);
  };

  // Handle Login navigation
  const handleLogin = () => {
    navigation.navigate("LogIn");
  };

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transform: [{
          translateY: scrollY.interpolate({
            inputRange: [0, STICKY_SEARCH_THRESHOLD],
            outputRange: [0, STICKY_SEARCH_THRESHOLD - 100],
            extrapolate: "clamp",
          })
        }],
      }}
    >
      <SafeAreaView
        style={{
          backgroundColor: "#309624",
          paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
        }}
      >
        <View style={{ backgroundColor: "#309624" }}>
          <View className="flex-row items-center justify-between px-4 mt-2">
            {/* Delivery Location */}
            <TouchableOpacity
            //  onPress={openLocationModal}
             >
              <Animated.View
                style={{
                  opacity: deliverTextOpacity,
                  transform: [{ translateY: deliverTextTranslateY }],
                }}
              >
                <View className='flex-row'>
                <Ionicons name="location-outline" size={14} color="white" /> 
                <View className="flex-row items-center"></View>
                <Text className="text-white text-xs ml-1">FROM</Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="text-white font-bold mr-1">Engginering canteen</Text>
                  <Icon.ChevronDown height="20" width="20" stroke="white" />
                </View>
              </Animated.View>
            </TouchableOpacity>

            {/* Conditional Icons: Login if not authenticated, else Bell and Logout */}
            <View>
              <Animated.View
                style={{
                  opacity: deliverTextOpacity,
                  transform: [{ translateY: deliverTextTranslateY }],
                }}
                className="flex-row space-x-2"
              >
                {isAuthenticated ? (
                  <>
                    <TouchableOpacity onPress={handleLogout}>
                      <Icon.LogOut height="24" width="24" stroke="white" />
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity onPress={handleLogin} style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text className="text-white font-bold mr-1">Login</Text>
                    <Icon.LogIn height="24" width="24" stroke="white" />
                  </TouchableOpacity>
                )}
              </Animated.View>
            </View>
          </View>

          {/* Search Bar */}
          <SearchBar
            openSearchModal={openSearchModal}
            scrollY={scrollY}
            STICKY_SEARCH_THRESHOLD={STICKY_SEARCH_THRESHOLD}
          />
        </View>
      </SafeAreaView>
    </Animated.View>
  );
};

export default AnimatedHeader;
