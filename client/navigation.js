// navigation.js
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Intro1 from "./screens/Intro/Intro1";
import SignIn from "./screens/UserAuth/SignIn";
import Home from "./screens/Main/Home/Home";
import OTP from "./screens/UserAuth/Otp";
import NewUser from "./screens/UserAuth/NewUser";
import FoodItem from "./screens/Main/FoodItem/FoodItem";
import AdminHome from "./screens/Admin/AdminHome";
import SearchResults from "./screens/Main/SearchBar/SearchResults";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="intro" component={Intro1} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Otp" component={OTP} />
        <Stack.Screen name="AdminHome" component={AdminHome} />
        <Stack.Screen name="NewUser" component={NewUser} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SearchResults" component={SearchResults} />
        <Stack.Screen name="FoodItem" component={FoodItem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
