import React, { useState, useRef, useEffect } from 'react';
import { View, Animated, Dimensions, StatusBar, Platform, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import FloatingCartBar from '../../Cart/FloatingCart';
import Home from './Home';
import CartPage from '../../Cart/CartPage';
import OrderHistoryPage from '../../Cart/OrderHistoryPage';
import ProfilePage from '../../profile/Profile';
import Account from '../../account/Account';

const Tab = createBottomTabNavigator();
const { height: screenHeight } = Dimensions.get('window');

const CustomTabBarWithCart = ({ state, descriptors, navigation, translateY }) => {
  const currentRouteName = state.routes[state.index].name; // Get the current route

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        transform: [{ translateY }],
        paddingBottom: 0, // Extra padding to accommodate the FloatingCartBar height
      }}
    >
      {/* Show FloatingCartBar only on Home page */}
      {currentRouteName === 'Home' && (
        <FloatingCartBar
          itemCount={2}
          totalPrice={199.99}
          restaurantName={'Pizza Place'}
        />
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
              <Icon name={iconName} size={24} color={isFocused ? 'green' : 'gray'} />
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
  const translateY = useRef(new Animated.Value(0)).current;

  const animateTabBar = (toValue) => {
    Animated.spring(translateY, {
      toValue: toValue ? 0 : 130, // Adjust this value to hide the bar completely
      useNativeDriver: true,
    }).start();
  };

  const updateStatusBar = (routeName) => {
    switch (routeName) {
      case 'Home':
        StatusBar.setBarStyle('light-content');
        if (Platform.OS === 'android') {
          // StatusBar.setTranslucent(true);
          StatusBar.setBackgroundColor('#309624');
        }
        break;
      // case 'CartPage':
      //   StatusBar.setBarStyle('dark-content');
      //   if (Platform.OS === 'android') {
      //     StatusBar.setBackgroundColor('white');
      //   }
      //   break;
      case 'OrderHistoryPage':
        StatusBar.setBarStyle('dark-content');
        if (Platform.OS === 'android') {
          // StatusBar.setTranslucent(true);
          StatusBar.setBackgroundColor('white');
        }
        break;
      case 'Account':
        StatusBar.setBarStyle('dark-content');
        if (Platform.OS === 'android') {
          StatusBar.setTranslucent(true);
          // StatusBar.setBackgroundColor('white');
        }
        break;
      default:
        StatusBar.setBarStyle('light-content');
    }
  };

  useEffect(() => {
    animateTabBar(isTabBarVisible);
  }, [isTabBarVisible]);

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
        <Tab.Screen 
          name="OrderHistoryPage" 
          component={OrderHistoryPage} 
          options={{ title: 'Orders' }} 
        />
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
