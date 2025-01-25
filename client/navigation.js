import React, { useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
// import { logoutUser } from "./store/Slices/userDetailSlice";
import LogIn from "./screens/UserAuth/LogIn";
import Home from "./screens/Home/Home";
import OTP from "./screens/UserAuth/Otp";
import SearchResults from "./components/SearchBar/SearchResults";
import HomeCategory from "./screens/Categories/HomeCategory";
import CartPage from "./screens/Cart/CartPage";
import OrderHistoryPage from "./screens/OrderHistory/OrderHistoryPage";
import Intro1 from "./screens/Intro/Intro1";
import PaymentOption from "./screens/payment/PaymentOption";
import Inventory from "./screens/Admin/Screens/Inventory/Inventory";
import AdminAccount from "./screens/Admin/Screens/AdminAccount/AdminAccount";
import Bills from "./screens/Admin/Screens/Bills/Bills";
import AdminFooter from "./screens/Admin/Screens/AdminLayout/AdminTabs";
import AdminLayout from "./screens/Admin/Screens/AdminLayout/AdminLayout";
import AdminTabs from "./screens/Admin/Screens/AdminLayout/AdminTabs";
import ClientTabs from "./components/TabNavigator/ClientTabs";
import Account from "./screens/account/Account";
import ProfilePage from "./screens/profile/Profile";
import OrderTracking from "./screens/OrderTracking/OrderTracking";
import CreateAccount from "./screens/UserAuth/CreateAccount";
import ForgotPw from "./screens/UserAuth/ForgotPw";
import AuthLoadingScreen from "./screens/UserAuth/AuthLoadingScreen";
import AppWrapper from "./AppWrapper";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const token = await AsyncStorage.getItem("userToken");

  //     if (token) {
  //       // Navigate to the home screen
  //       navigation.reset({
  //         index: 0,
  //         routes: [{ name: "Home" }],
  //       });
  //     } else {
  //       navigation.reset({
  //         index: 0,
  //         routes: [{ name: "SignIn" }],
  //       });
  //     }
  //   };

  //   checkAuth();

  //   // Cleanup the timeout when the component unmounts
  //   return () => {}; // No need to clear timeout now
  // }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthLoading" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
        <Stack.Screen name="Intro" component={Intro1} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="Otp" component={OTP} />
        <Stack.Screen name="ForgotPw" component={ForgotPw} />
        <Stack.Screen name="ClientTabs" component={ClientTabs} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        <Stack.Screen name="HomeCategory" component={HomeCategory} />
        <Stack.Screen name="SearchResults" component={SearchResults} />
        <Stack.Screen name="CartPage" component={CartPage} />
        <Stack.Screen name="OrderHistory" component={OrderHistoryPage} />
        <Stack.Screen name="PaymentOption" component={PaymentOption} />

        {/* <Stack.Screen name="PaymentConfirmation" component={PaymentConfirmation} /> */}
        <Stack.Screen name="OrderTracking" component={OrderTracking} />

        {/* admin side */}
        <Stack.Screen name="AdminTabs" component={AdminTabs} />
        <Stack.Screen name="Inventory" component={Inventory} />
        <Stack.Screen name="Bills" component={Bills} />
        <Stack.Screen name="AdminAccount" component={AdminAccount} />

        {/* <Stack.Screen name="AdminLayout" component={AdminLayout} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
