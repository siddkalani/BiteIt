import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import AdminHome from '../AdminHome/AdminHome';
import Inventory from '../Inventory/Inventory';
import Bills from '../Bills/Bills';
import AdminAccount from '../AdminAccount/AdminAccount';

const Tab = createBottomTabNavigator();

const AdminTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Assign icons based on route name
          switch (route.name) {
            case 'Orders':
              iconName = focused ? 'home' : 'home-outline'; // Adjust icons as needed
              break;
            case 'Inventory':
              iconName = focused ? 'storefront' : 'storefront-outline';
              break;
            case 'Offers':
              iconName = focused ? 'pricetags' : 'pricetags-outline';
              break;
            case 'Account':
              iconName = focused ? 'person-circle' : 'person-circle-outline';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
        tabBarStyle: { backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#ccc' },
      })}
    >
      <Tab.Screen name="Orders" component={AdminHome} />
      <Tab.Screen name="Inventory" component={Inventory} />
      <Tab.Screen name="Offers" component={Bills} />
      <Tab.Screen name="Account" component={AdminAccount} />
      {/* <Tab.Screen name="Debug" component={() => <Text>Footer is showing</Text>} /> */}
    </Tab.Navigator>
  );
};

export default AdminTabs;
