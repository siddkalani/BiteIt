import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Switch, ScrollView, TouchableOpacity, Dimensions, Animated, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import * as IconF from "react-native-feather";

const { width } = Dimensions.get('window');
const paddingHorizontal = 16;
const tabWidth = (width - (paddingHorizontal * 2)) / 2;

// Dynamic Category Component
const Category = ({ categoryName, items }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleCategory = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View className="mb-4">
      {/* Category Header */}
      <TouchableOpacity onPress={toggleCategory} className="flex-row justify-between items-center p-2 bg-yellow-100 rounded-lg">
        <Text className="font-semibold">{categoryName}</Text>
        <Icon name={isOpen ? "chevron-up-outline" : "chevron-down-outline"} size={20} color="#000" />
      </TouchableOpacity>

      {/* Item List */}
      {isOpen && (
        <View className="bg-white">
          {items.map((item, index) => (
            <View key={index} className={`flex-row justify-between items-center py-2 px-4 border-b border-gray-200`}>
              <Text>{item.name}</Text>
              <Switch value={item.available} trackColor={{ false: '#767577', true: '#F59E0B' }} thumbColor={"white"} />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const Inventory = () => {
  const [activeTab, setActiveTab] = useState('All items');
  const slideAnim = useRef(new Animated.Value(0)).current;  // Animation value for tab indicator
  const { top } = useSafeAreaInsets();

  // Function to switch tabs and animate the indicator
  const switchTab = (tab) => {
    setActiveTab(tab);
    // Animate sliding to the appropriate tab
    Animated.timing(slideAnim, {
      toValue: tab === 'All items' ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Example Data for Inventory
  const categories = [
    {
      name: "COLD DRINK",
      items: [
        { name: "2 ltr. Coca cola", available: true },
        { name: "Frooti", available: true },
        { name: "Sprite", available: false, outOfStock: true },
        { name: "Pepsi", available: true },
        { name: "Thums Up", available: true },
        { name: "7 Up", available: false, outOfStock: true },
      ],
    },
    {
      name: "SAMOSA",
      items: [
        { name: "Aloo Matar Paneer samosa", available: true },
        { name: "Chowmein Samosa", available: false, outOfStock: true },
        { name: "Cheese Samosa", available: true },
        { name: "Veggie Delight Samosa", available: true },
        { name: "Chicken Samosa", available: false, outOfStock: true },
      ],
    },
    {
      name: "BURGERS",
      items: [
        { name: "Chicken Burger", available: true },
        { name: "Veggie Burger", available: true },
        { name: "Cheese Burger", available: true },
        { name: "Double Patty Burger", available: false, outOfStock: true },
        { name: "Grilled Chicken Burger", available: true },
      ],
    },
    {
      name: "PIZZAS",
      items: [
        { name: "Margherita", available: true },
        { name: "Pepperoni Pizza", available: false, outOfStock: true },
        { name: "BBQ Chicken Pizza", available: true },
        { name: "Veggie Supreme Pizza", available: true },
        { name: "Cheese Burst Pizza", available: false, outOfStock: true },
      ],
    },
    {
      name: "FRIES",
      items: [
        { name: "Regular Fries", available: true },
        { name: "Cheesy Fries", available: true },
        { name: "Spicy Fries", available: false, outOfStock: true },
        { name: "Curly Fries", available: true },
        { name: "Sweet Potato Fries", available: true },
      ],
    },
    {
      name: "ICE CREAM",
      items: [
        { name: "Vanilla", available: true },
        { name: "Chocolate", available: true },
        { name: "Strawberry", available: false, outOfStock: true },
        { name: "Butterscotch", available: true },
        { name: "Mango", available: true },
      ],
    },
    {
      name: "PASTRIES",
      items: [
        { name: "Black Forest Cake", available: true },
        { name: "Red Velvet Cake", available: true },
        { name: "Blueberry Muffin", available: false, outOfStock: true },
        { name: "Chocolate Brownie", available: true },
        { name: "Cheese Cake", available: true },
      ],
    },
    {
      name: "COFFEE",
      items: [
        { name: "Espresso", available: true },
        { name: "Cappuccino", available: true },
        { name: "Latte", available: false, outOfStock: true },
        { name: "Americano", available: true },
        { name: "Mocha", available: true },
      ],
    },
    {
      name: "SANDWICHES",
      items: [
        { name: "Grilled Cheese Sandwich", available: true },
        { name: "Club Sandwich", available: false, outOfStock: true },
        { name: "Chicken Panini", available: true },
        { name: "Veggie Delight Sandwich", available: true },
        { name: "Tuna Sandwich", available: true },
      ],
    },
    {
      name: "SOUPS",
      items: [
        { name: "Tomato Soup", available: true },
        { name: "Chicken Noodle Soup", available: true },
        { name: "Minestrone Soup", available: false, outOfStock: true },
        { name: "French Onion Soup", available: true },
        { name: "Broccoli Cheddar Soup", available: true },
      ],
    },
  ]

  return (
    <View style={{
      flex: 1,
      paddingTop: Platform.OS === "ios" ? top : StatusBar.currentHeight,
    }} className="flex-1 bg-yellow-50">

      <StatusBar barStyle="dark-content" backgroundColor={"transparent"} translucent />
      <View className='flex-1 pt-3 px-4 space-y-2'>
        {/* Header */}
        <View className="flex-row items-center justify-between h-8">
          <View className="flex-row items-center space-x-2">
            <Text className="text-2xl font-bold">Inventory</Text>
          </View>
          <View className="flex-row items-center space-x-4">
            <TouchableOpacity>
              <IconF.Bell height={24} width={24} stroke="black" />
              <View className="absolute -top-2 -right-2 bg-red-500 w-4 h-4 rounded-full justify-center items-center">
                <Text className="text-white text-xs">4</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <IconF.Search height={24} width={24} stroke="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <IconF.Settings height={24} width={24} stroke="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View className="bg-yellow-100 relative rounded-lg overflow-hidden">
          {/* Animated sliding indicator */}
          <Animated.View
            className="absolute top-0 bottom-0 bg-white"
            style={{
              width: tabWidth,
              left: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, tabWidth],
              }),
            }}
          />
          <View className="flex-row">
            <TouchableOpacity
              className="flex-1 items-center py-3 z-10"
              onPress={() => switchTab('All items')}
            >
              <Text className={`font-semibold ${activeTab === 'All items' ? 'text-yellow-500' : 'text-gray-400'}`}>All items</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 items-center py-3 z-10"
              onPress={() => switchTab('Add-ons')}
            >
              <Text className={`font-semibold ${activeTab === 'Add-ons' ? 'text-yellow-500' : 'text-gray-400'}`}>Add-ons</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Inventory List */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-semibold text-lg">Items</Text>
            <TouchableOpacity className="flex-row items-center">
              <Icon name="pencil" size={16} color="black"/>
              <Text className="text-black ml-1">Edit menu</Text>
            </TouchableOpacity>
          </View>

          {/* Dynamic Categories */}
          {categories.map((category, index) => (
            <Category key={index} categoryName={category.name} items={category.items} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Inventory;
