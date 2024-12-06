import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { FontFamily, FontSize } from "../../GlobalStyles";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  updateCartQuantity,
  removeFromCart,
} from "../../store/Slices/cartSlice";
import FoodItemCard from "../utils/FoodItemCard";

const SearchResults = ({ searchResults, updateSearchHistory }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const foodItems = useSelector((state) => state.foodItem.items); // Get food items from Redux
  const [onlineStatus, setOnlineStatus] = useState({});

  useEffect(() => {
    // Initialize online status based on fetched items
    const initialStatus = {};
    searchResults.forEach(item => {
        initialStatus[item._id] = item.isOnline;
    });
    setOnlineStatus(initialStatus);
  }, [searchResults]);

  const handleAddToCart = (item) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem._id === item._id
    );

    if (existingItem) {
      dispatch(
        updateCartQuantity({
          itemId: item._id,
          quantity: existingItem.quantity + 1,
        })
      );
    } else {
      dispatch(addToCart({ ...item, quantity: 1 }));
    }

    updateSearchHistory(item);
  };

  const handleIncrement = (itemId) => {
    const item = cartItems.find((cartItem) => cartItem._id === itemId);
    if (item) {
      dispatch(updateCartQuantity({ itemId, quantity: item.quantity + 1 }));
    }
  };

  const handleDecrement = (itemId) => {
    const item = cartItems.find((cartItem) => cartItem._id === itemId);
    if (item && item.quantity > 1) {
      dispatch(updateCartQuantity({ itemId, quantity: item.quantity - 1 }));
    } else if (item && item.quantity === 1) {
      dispatch(removeFromCart({ itemId }));
    }
  };

  const renderItem = ({ item }) => {
    const itemInCart = cartItems.find((cartItem) => cartItem._id === item._id);
    const isOnline = foodItems.find((foodItem) => foodItem._id === item._id)?.isOnline ;

    return (
      <FoodItemCard
        item={item}
        handleAddToCart={handleAddToCart}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        itemInCart={itemInCart}
        isOnline={isOnline}
      />
    );
  };


  return (
    <View className="flex-1">
      {searchResults.length === 0 ? (
        <Text
          style={{
            fontFamily: FontFamily.poppinsRegular,
            fontSize: FontSize.size_md,
            color: "#888",
            textAlign: "center",
            marginTop: 20,
          }}
        >
          No items found
        </Text>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={{ paddingBottom: 10 }}
        />
      )}
    </View>
  );
};

export default SearchResults;
