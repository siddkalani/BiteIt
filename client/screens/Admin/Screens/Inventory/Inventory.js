import React, { useState, useRef } from 'react';
import { View, Text, Switch, ScrollView, TouchableOpacity, Dimensions, Animated, Platform, StatusBar, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import * as IconF from 'react-native-feather';

const { width } = Dimensions.get('window');
const paddingHorizontal = 16;
const tabWidth = (width - paddingHorizontal * 2) / 2;

const Category = ({ categoryName, items }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleCategory = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View className="mb-4">
      <TouchableOpacity
        onPress={toggleCategory}
        className="flex-row justify-between items-center py-2 px-4 bg-yellow-100 rounded-lg"
      >
        <View className='flex-row space-x-2 items-center'>
        <Icon name={isOpen ? 'chevron-up-outline' : 'chevron-down-outline'} size={20} color="#000" />
        <Text className="font-semibold">{categoryName}</Text>
        </View>

        <Switch value={true} trackColor={{ false: '#767577', true: '#F59E0B' }} thumbColor="white" />
      </TouchableOpacity>

      {isOpen && (
        <View className="bg-white">
          {items.map((item, index) => (
            <View key={index} className="flex-row justify-between items-center py-2 px-4 border-b border-gray-200">
              <Text>{item.name}</Text>
              <Switch value={item.available} trackColor={{ false: '#767577', true: '#F59E0B' }} thumbColor="white" />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const Inventory = () => {
  const [activeTab, setActiveTab] = useState('All items');
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const slideAnim = useRef(new Animated.Value(0)).current;
  const { top } = useSafeAreaInsets();

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

  const filteredCategories = categories
    .map((category) => {
      const isCategoryMatch = category.name.toLowerCase().includes(searchQuery.toLowerCase());
      const filteredItems = category.items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (isCategoryMatch) {
        return category; // Return full category if category name matches
      } else if (filteredItems.length > 0) {
        return { ...category, items: filteredItems }; // Return filtered items if only items match
      } else {
        return null; // Exclude if neither category nor items match
      }
    })
    .filter((category) => category !== null); // Remove null entries

  const switchTab = (tab) => {
    setActiveTab(tab);
    Animated.timing(slideAnim, {
      toValue: tab === 'All items' ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? top : StatusBar.currentHeight }} className="flex-1 bg-yellow-50">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View className="flex-1 pt-3 px-4 space-y-2">
        {/* Header */}
        <View className="flex-row items-center justify-between h-8">
          <Text className="text-2xl font-bold">Inventory</Text>
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
            <TouchableOpacity className="flex-1 items-center py-3" onPress={() => switchTab('All items')}>
              <Text className={`font-semibold ${activeTab === 'All items' ? 'text-yellow-500' : 'text-gray-400'}`}>All items</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 items-center py-3" onPress={() => switchTab('Add-ons')}>
              <Text className={`font-semibold ${activeTab === 'Add-ons' ? 'text-yellow-500' : 'text-gray-400'}`}>Add-ons</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center space-x-2 mt-4 bg-white rounded-lg p-3 shadow">
          <IconF.Search height={20} width={20} stroke="gray" />
          <TextInput
            placeholder="Search for items or categories"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-2"
          />
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="font-semibold text-lg">Items</Text>
          <TouchableOpacity className="flex-row items-center">
            <Icon name="pencil" size={16} color="black" />
            <Text className="text-black ml-1">Edit menu</Text>
          </TouchableOpacity>
        </View>

        {/* Inventory List */}
        <ScrollView className="flex-1 mt-4" showsVerticalScrollIndicator={false}>
          {filteredCategories.map((category, index) => (
            <Category key={index} categoryName={category.name} items={category.items} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Inventory;
