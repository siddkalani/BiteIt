import React, { useState, useRef, useEffect } from 'react';
import { Text, View, Animated, Dimensions, StatusBar, Platform, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import FloatingCartBar from '../Cart/FloatingCart';
import Home from '../../screens/Home/Home';
import OrderHistoryPage from '../../screens/OrderHistory/OrderHistoryPage';
import Account from '../../screens/Account/Account';
import { selectItemCount } from '../../store/Slices/cartSlice';
import { selectCanteenId } from '../../store/Slices/orderServiceSlice';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../constants/constant';
import { selectOrderPlaced } from '../../store/Slices/orderSlice';
import io from "socket.io-client";

const socket = io(BASE_URL);
const Tab = createBottomTabNavigator();
const { height: screenHeight } = Dimensions.get('window');

const CustomTabBarWithCart = ({ state, descriptors, navigation, translateY }) => {
  const currentRouteName = state.routes[state.index].name;
  const itemCount = useSelector(selectItemCount);
  const orderPlaced = useSelector(selectOrderPlaced);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        transform: [{ translateY }],
        paddingBottom: 0,
      }}
    >
      {currentRouteName === 'Home' && (itemCount > 0) && (
        <FloatingCartBar />
      )}


      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#ccc',
          height: 50,
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const iconName = getIconName(route.name, isFocused);

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            >
              <Icon name={iconName} size={24} color={isFocused ? '#2b054c' : 'gray'} />
            </TouchableOpacity>
          );
        })}
      </View>
    </Animated.View>
  );
};

const getIconName = (routeName, focused) => {
  switch (routeName) {
    case 'Home':
      return focused ? 'home' : 'home-outline';
    case 'CartPage':
      return focused ? 'cart' : 'cart-outline';
    case 'OrderHistoryPage':
      return focused ? 'time' : 'time-outline';
    case 'Profile':
      return focused ? 'person-circle' : 'person-circle-outline';
    default:
      return 'help-circle';
  }
};

const ClientTabs = () => {
  const [isTabBarVisible, setIsTabBarVisible] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track auth status
  const translateY = useRef(new Animated.Value(0)).current;
  const canteenId = useSelector(selectCanteenId);
  const [isCanteenOnline, setIsCanteenOnline] = useState(true);


  // Fetch auth status
  useEffect(() => {
    const fetchAuthStatus = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setIsAuthenticated(!!token);
    };
    fetchAuthStatus();
  }, []);

  // Fetch canteen status
  useEffect(() => {
    const fetchCanteenStatus = async () => {
      try {
        const response = await fetch(`${BASE_URL}/canteen/${canteenId}/status`);
        const data = await response.json();
        setIsCanteenOnline(data.isOnline);
        console.log(data.isOnline)
      } catch (error) {
        console.error("Error fetching canteen status:", error);
      }
    };

    fetchCanteenStatus();

    // Initialize socket connection

    // Listen for canteen status updates
    socket.on('canteenStatus', (status) => {
      if (status.canteenId === canteenId) {
        console.log('Canteen status updated from socket:', status.isOnline);
        setIsCanteenOnline(status.isOnline);
      }
    });

    // Clean up the socket connection
    return () => {
      socket.disconnect();
    };
  }, [canteenId]);

  const animateTabBar = (toValue) => {
    Animated.spring(translateY, {
      toValue: toValue ? 0 : 60, // Adjust this value to hide the bar completely
      useNativeDriver: true,
    }).start();
  };

  const updateStatusBar = (routeName) => {
    switch (routeName) {
      case 'Home':
        StatusBar.setBarStyle('light-content');
        if (Platform.OS === 'android') {
          // StatusBar.setBackgroundColor('#309624'); // Ensure consistent background color on home
        }
        break;
      case 'OrderHistoryPage':
        StatusBar.setBarStyle('dark-content');
        if (Platform.OS === 'android') {
          StatusBar.setBackgroundColor('white');
        }
        break;
      case 'Account':
        StatusBar.setBarStyle('dark-content');
        if (Platform.OS === 'android') {
          StatusBar.setTranslucent(true);
        }
        break;
      default:
        StatusBar.setBarStyle('light-content');
    }
  };

  useEffect(() => {
    animateTabBar(isTabBarVisible);
  }, [isTabBarVisible]);
  if (!isCanteenOnline) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red', textAlign: 'center', margin: 10 }}>
          Oops! The canteen is offline. Please try again later.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        tabBar={(props) => (
          <CustomTabBarWithCart {...props} translateY={translateY} />
        )}
        screenOptions={{ headerShown: false }}
        screenListeners={{
          state: (e) => {
            const routeName = e.data.state.routes[e.data.state.index].name;
            updateStatusBar(routeName);
          },
        }}
      >
        <Tab.Screen name="Home">
          {(props) => <Home {...props} setTabBarVisible={setIsTabBarVisible} />}
        </Tab.Screen>

        {/* Conditionally render OrderHistoryPage based on authentication */}
        {isAuthenticated && (
          <Tab.Screen
            name="OrderHistoryPage"
            component={OrderHistoryPage}
            options={{ title: 'Orders' }}
          />
        )}

        <Tab.Screen
          name="Profile"
          component={Account}
          options={{ title: 'Account' }}
        />
      </Tab.Navigator>
    </View>
  );
};


export default ClientTabs;
