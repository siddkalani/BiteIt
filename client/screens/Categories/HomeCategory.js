import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import {
  View,
  StatusBar,
  Animated,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { BlurView } from "expo-blur";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addToCart, updateCartQuantity, removeFromCart } from "../../store/Slices/cartSlice";
import { saveCartToStorage } from "../../utils/storageUtils";
import { BASE_URL } from "../../constants/constant";
import { Modalize } from "react-native-modalize";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import * as Icon from "react-native-feather";
import { FontFamily } from "../../GlobalStyles";
import SafeAreaAndroid from "../../components/utils/SafeAreaAndroid";

import { fetchCategoryItems } from "../../store/Slices/categoryItemSlice";



const HEADER_HEIGHT = 300;

const FoodItemCard = ({ item, handleAddToCart, handleIncrement, handleDecrement, itemInCart, isOnline }) => {

  return (
    <View className="bg-white rounded-lg shadow-sm flex-row items-center mb-2 px-3 py-2">
      <Image
        source={{ uri: `${BASE_URL}/items_uploads/${item.image}` }}
        className="h-16 w-16 rounded-lg"
        resizeMode="cover"
      />
      <View className="flex-1 ml-4">
        <Text className="text-base font-semibold" style={{ fontFamily: FontFamily.poppinsMedium }}>
          {item.itemName}
        </Text>
        <View className="flex-row items-center space-x-1">
          <Ionicons name="star" size={13} color="#FFD700" />
          <Text className="text-xs text-gray-600">{item.rating || "3.7"}</Text>
          <Text className="text-xs text-gray-500 ml-1">|</Text>
          <TouchableOpacity className="flex-row items-center ml-1">
            <Ionicons name="time" size={13} color="#FFD700" />
            <Text className="text-xs text-gray-600" style={{ fontFamily: FontFamily.poppinsMedium, marginLeft: 2 }}>
              Info
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-base text-black mt-1" style={{ fontFamily: FontFamily.poppinsSemiBold }}>
          ₹{item.itemPrice}
        </Text>
      </View>
      {isOnline ? (
        itemInCart ? (
          <View className="flex-row items-center space-x-1 bg-gray-200 rounded-md">
            <TouchableOpacity
              onPress={(event) => {
                event.persist(); // Keep the event
                handleDecrement(item); // Call your function
              }}
              className="p-2"
            >
              <Icon.Minus width={16} height={16} stroke="green" strokeWidth="3" />
            </TouchableOpacity>
            <View className="w-3.5 items-center justify-center">
              <Text adjustsFontSizeToFit numberOfLines={1} className="font-bold">
                {itemInCart.quantity}
              </Text>
            </View>
            <TouchableOpacity
              onPress={(event) => {
                event.persist(); // Keep the event
                handleIncrement(item); // Call your function
              }}
              className="p-2"
            >
              <Icon.Plus width={16} height={16} stroke="green" strokeWidth="3" />
            </TouchableOpacity>
          </View>
        ) : (
          <LinearGradient
            colors={["#007022", "#54d17a", "#bcffd0"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1.9, y: 0 }}
            className="rounded-md"
            style={{ paddingHorizontal: 10, paddingVertical: 6 }}
          >
            <TouchableOpacity
              onPress={(event) => {
                event.persist(); // Keep the event
                handleAddToCart(item); // Call your function
              }}
              className="flex-row items-center justify-center"
              style={{ borderRadius: 5 }}
            >
              <Icon.Plus width={15} height={15} stroke="white" strokeWidth="3" />
              <Text className="text-white ml-1 font-bold">Add</Text>
            </TouchableOpacity>
          </LinearGradient>
        )
      ) : (
        <Text className="text-red-500 font-semibold">Not Available</Text>
      )}
    </View>
  );
  
};


const HomeCategory = () => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const modalizeRef = useRef(null);
  const screenHeight = Dimensions.get('window').height;
  
  const { id } = route.params;
  const cartItems = useSelector((state) => state.cart);
  const categoryItems = useSelector((state) => state.categoryItem.items);

  // Memoizing itemOnlineStatus to avoid unnecessary re-renders
  const itemOnlineStatus = useMemo(() => {
    return categoryItems.reduce((acc, item) => {
      acc[item._id] = item.isOnline;
      return acc;
    }, {});
  }, [categoryItems]);

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("userToken");
      dispatch(fetchCategoryItems({ categoryId: id, token }));
      setLoading(false);
    };
    fetchData();
  }, [id, dispatch]);

  const handleAddToCart = useCallback((item) => {
    dispatch(addToCart(item));
    saveCartToStorage([...cartItems, item]);
  }, [dispatch, cartItems]);

  const handleIncrement = useCallback((item) => {
    const itemInCart = cartItems.find((i) => i._id === item._id);
    if (itemInCart) {
      const updatedCart = cartItems.map(i =>
        i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
      );
      dispatch(updateCartQuantity({ itemId: item._id, quantity: itemInCart.quantity + 1 }));
      saveCartToStorage(updatedCart);
    }
  }, [dispatch, cartItems]);

  const handleDecrement = useCallback((item) => {
    const itemInCart = cartItems.find((i) => i._id === item._id);
    if (itemInCart) {
      if (itemInCart.quantity > 1) {
        const updatedCart = cartItems.map(i =>
          i._id === item._id ? { ...i, quantity: i.quantity - 1 } : i
        );
        dispatch(updateCartQuantity({ itemId: item._id, quantity: itemInCart.quantity - 1 }));
        saveCartToStorage(updatedCart);
      } else {
        const updatedCart = cartItems.filter(i => i._id !== item._id);
        dispatch(removeFromCart({ itemId: item._id }));
        saveCartToStorage(updatedCart);
      }
    }
  }, [dispatch, cartItems]);

  const renderItem = useCallback(({ item }) => (
    <FoodItemCard
      item={item}
      handleAddToCart={handleAddToCart}
      handleIncrement={handleIncrement}
      handleDecrement={handleDecrement}
      itemInCart={cartItems.find((i) => i._id === item._id)}
      isOnline={itemOnlineStatus[item._id]}
    />
  ), [handleAddToCart, handleIncrement, handleDecrement, cartItems, itemOnlineStatus]);

  const modalHeight = screenHeight - 250;
  const modalFull = screenHeight ;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" />
        {/* Back Button */}
        <BlurView
          intensity={40}
          tint="dark"
          style={{
            position: "absolute",
            top: top + 10,
            left: 16,
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            zIndex: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ padding: 2 }}
          >
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
        </BlurView>
        
        {/* Header Image */}
        <Animated.View style={{ height: HEADER_HEIGHT }}>
          <Image
            source={require("../../assets/images/signIn/signIn.png")}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        </Animated.View>

        {/* Modal */}
        <Modalize
          ref={modalizeRef}
          withOverlay={false}
          modalStyle={{backgroundColor:'rgb(241 245 249)'}}
          withHandle={true}
          modalHeight={modalFull} // Set modal height
          alwaysOpen={modalHeight} // Ensure it opens just below the header
          flatListProps={{
            data: categoryItems,
            renderItem: renderItem,
            keyExtractor: (item) => item._id,
            showsVerticalScrollIndicator: false,
            contentContainerStyle: { paddingHorizontal: 15, paddingTop: 20 },
            ListEmptyComponent: () => (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No food items available</Text>
              </View>
            ),
          }}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default HomeCategory;
