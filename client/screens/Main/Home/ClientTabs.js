import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './Home';
import CartPage from '../../Cart/CartPage';
import OrderHistoryPage from '../../Cart/OrderHistoryPage';
import ProfilePage from '../../profile/Profile';

const Tab = createBottomTabNavigator();

const ClientTabs = () => {
  const [isTabBarVisible, setIsTabBarVisible] = useState(true);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'CartPage':
              iconName = focused ? 'cart' : 'cart-outline';
              break;
            case 'OrderHistoryPage':
              iconName = focused ? 'time' : 'time-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person-circle' : 'person-circle-outline';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
        tabBarStyle: { 
          backgroundColor: 'white', 
          borderTopWidth: 1, 
          borderTopColor: '#ccc',
          display: isTabBarVisible ? 'flex' : 'none', // Hide or show based on state
        },
      })}
    >
      <Tab.Screen name="Home">
        {(props) => <Home {...props} setTabBarVisible={setIsTabBarVisible} />}
      </Tab.Screen>
      <Tab.Screen name="CartPage" component={CartPage} options={{ title: 'Cart' }} />
      <Tab.Screen name="OrderHistoryPage" component={OrderHistoryPage} options={{ title: 'Orders' }} />
      <Tab.Screen name="Profile" component={ProfilePage} options={{ title: 'Account' }} />
    </Tab.Navigator>
  );
};

export default ClientTabs;
