import React, { useState, useRef, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Animated, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './Home';
import CartPage from '../../Cart/CartPage';
import OrderHistoryPage from '../../Cart/OrderHistoryPage';
import ProfilePage from '../../profile/Profile';

const Tab = createBottomTabNavigator();
const { height: screenHeight } = Dimensions.get('window');

const CustomTabBar = ({ state, descriptors, navigation, translateY }) => {
  return (
    <Animated.View style={{
      flexDirection: 'row',
      backgroundColor: 'white',
      borderTopWidth: 1,
      borderTopColor: '#ccc',
      height: 50, // Fixed height
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      transform: [{ translateY }]
    }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

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
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Icon 
              name={iconName} 
              size={24} 
              color={isFocused ? 'green' : 'gray'} 
            />
          </TouchableOpacity>
        );
      })}
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
      toValue: toValue ? 0 : 50, // Translate to hide (50 is the height of the tab bar)
      useNativeDriver: true,
      tension: 100,
      friction: 12,
    }).start();
  };

  useEffect(() => {
    animateTabBar(isTabBarVisible);
  }, [isTabBarVisible]);

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} translateY={translateY} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="Home">
          {(props) => <Home {...props} setTabBarVisible={setIsTabBarVisible} />}
        </Tab.Screen>
        <Tab.Screen name="CartPage" component={CartPage} options={{ title: 'Cart' }} />
        <Tab.Screen name="OrderHistoryPage" component={OrderHistoryPage} options={{ title: 'Orders' }} />
        <Tab.Screen name="Profile" component={ProfilePage} options={{ title: 'Account' }} />
      </Tab.Navigator>
    </View>
  );
};

export default ClientTabs;