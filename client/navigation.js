import React, { useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
// import { logoutUser } from "./store/Slices/userDetailSlice";
import SignIn from "./screens/UserAuth/SignIn";
import LogIn from "./screens/UserAuth/LogIn";
import Home from "./screens/Main/Home/Home";
import OTP from "./screens/UserAuth/Otp";
import NewUser from "./screens/UserAuth/NewUser";
import FoodItem from "./screens/Main/FoodItem/FoodItem";
import AdminHome from "./screens/Admin/Screens/AdminHome/AdminHome";
import OldAdmin from "./screens/Admin/AdminHome";
import SearchResults from "./screens/Main/SearchBar/SearchResults";
import HomeCategory from "./screens/Categories/HomeCategory";
import CartPage from "./screens/Cart/CartPage";
import OrderHistoryPage from "./screens/Cart/OrderHistoryPage";
import PendingOrders from "./screens/Admin/PendingOrder";
import Profile from "./screens/profile/Profile";
import PaymentService from "./screens/payment/PaymentService";
import Intro1 from "./screens/Intro/Intro1";
import KeyboardTestComponent from "./components/KeyboardTest";
import PaymentOption from "./screens/payment/PaymentOption";
import FacultyLogin from "./screens/UserAuth/FacultyLogin";
import Inventory from "./screens/Admin/Screens/Inventory/Inventory";
import AdminAccount from "./screens/Admin/Screens/AdminAccount/AdminAccount";
import Bills from "./screens/Admin/Screens/Bills/Bills";
import AdminFooter from "./screens/Admin/Screens/AdminLayout/AdminTabs";
import AdminLayout from "./screens/Admin/Screens/AdminLayout/AdminLayout";
import AdminTabs from "./screens/Admin/Screens/AdminLayout/AdminTabs";
import Footer from "./screens/Main/Home/ClientTabs";
import ClientTabs from "./screens/Main/Home/ClientTabs";
import Account from "./screens/account/Account";

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
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Intro" component={Intro1} /> */}
        {/* <Stack.Screen name="Keyboard" component={KeyboardTestComponent} /> */}
         <Stack.Screen name="SignIn" component={SignIn} /> 
         {/* <Stack.Screen name="LogIn" component={LogIn} /> */}
         {/* <Stack.Screen name="FacultyLogin" component={FacultyLogin} /> */}
        <Stack.Screen name="Otp" component={OTP} /> 
        {/* <Stack.Screen name="AdminHome" component={OldAdmin} /> */}
        <Stack.Screen name="AdminHome" component={AdminHome} />
        {/* <Stack.Screen name="NewUser" component={NewUser} />  */}
        <Stack.Screen name="ClientTabs" component={ClientTabs} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="HomeCategory" component={HomeCategory} />
        <Stack.Screen name="SearchResults" component={SearchResults} />
        <Stack.Screen name="FoodItem" component={FoodItem} />
        <Stack.Screen name="CartPage" component={CartPage} />
        <Stack.Screen name="OrderHistory" component={OrderHistoryPage} />
        <Stack.Screen name="PendingOrder" component={PendingOrders} />
        <Stack.Screen name="PaymentService" component={PaymentService} />
        <Stack.Screen name="PaymentOption" component={PaymentOption} />
        {/* admin side */}
        {/* <Stack.Screen name="AdminTabs" component={AdminTabs} />
        <Stack.Screen name="Inventory" component={Inventory} />
        <Stack.Screen name="Bills" component={Bills} />
        <Stack.Screen name="AdminAccount" component={AdminAccount} /> */}

        {/* <Stack.Screen name="AdminLayout" component={AdminLayout} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
