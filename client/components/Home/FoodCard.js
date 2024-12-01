// import React, { useState, useEffect } from "react";
// import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addToCart,
//   updateCartQuantity,
//   removeFromCart,
// } from "../../store/Slices/cartSlice";
// import { FontFamily, FontSize } from "../../GlobalStyles";
// import { LinearGradient } from "expo-linear-gradient";
// import * as Icon from "react-native-feather";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { BASE_URL } from "../../constants/constant";
// import { saveCartToStorage } from "../../utils/storageUtils";
// import FoodItemModal from "./FoodItemModal";
// import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
// import { useNavigation } from "@react-navigation/native"; // Import useNavigation
// import { socket } from "../../services/foodItemSocketService";

// const FoodCard = ({ foodItem }) => {
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const cartItems = useSelector((state) => state.cart);
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [isOnline, setIsOnline] = useState(foodItem.isOnline);
//   const [isAuthenticated, setIsAuthenticated] = useState(false); // Auth state for checking login status

//   const itemInCart = cartItems.find((item) => item._id === foodItem._id);

//   useEffect(() => {
//     const checkAuthStatus = async () => {
//       const userToken = await AsyncStorage.getItem("userToken");
//       setIsAuthenticated(!!userToken);
//     };
//     checkAuthStatus();

//     // Listen for food item status updates
//     const handleFoodItemOnline = (updatedItem) => {
//       if (updatedItem._id === foodItem._id) {
//         setIsOnline(true);
//       }
//     };

//     const handleFoodItemOffline = (updatedItem) => {
//       if (updatedItem._id === foodItem._id) {
//         setIsOnline(false);
//       }
//     };

//     socket.on("foodItemOnline", handleFoodItemOnline);
//     socket.on("foodItemOffline", handleFoodItemOffline);

//     return () => {
//       socket.off("foodItemOnline", handleFoodItemOnline);
//       socket.off("foodItemOffline", handleFoodItemOffline);
//     };
//   }, [foodItem._id]);


//   const handleAddToCart = () => {
//     if (!isAuthenticated) {
//       // Prompt user to log in if not authenticated
//       Alert.alert(
//         "Login Required",
//         "Please log in to add items to your cart.",
//         [
//           {
//             text: "Cancel",
//             style: "cancel",
//           },
//           {
//             text: "Login",
//             onPress: () => navigation.navigate("LogIn"), // Navigate to login screen
//           },
//         ]
//       );
//       return;
//     }

//     dispatch(addToCart(foodItem));
//     saveCartToStorage(cartItems);
//   };

//   const handleIncrement = () => {
//     if (itemInCart) {
//       dispatch(
//         updateCartQuantity({
//           itemId: foodItem._id,
//           quantity: itemInCart.quantity + 1,
//         })
//       );
//       saveCartToStorage(cartItems);
//     }
//   };

//   const handleDecrement = () => {
//     if (itemInCart && itemInCart.quantity > 1) {
//       dispatch(
//         updateCartQuantity({
//           itemId: foodItem._id,
//           quantity: itemInCart.quantity - 1,
//         })
//       );
//       saveCartToStorage(cartItems);
//     } else if (itemInCart && itemInCart.quantity === 1) {
//       dispatch(removeFromCart({ itemId: foodItem._id }));
//       saveCartToStorage(cartItems);
//     }
//   };

//   return (
//     <View className="bg-white rounded-lg w-full items-center space-y-1 flex-1">
//       {/* Food Image */}
//       <TouchableOpacity
//         onPress={() => setModalVisible(true)}
//         className="w-full"
//       >
//         <View style={{ position: "relative", width: "100%", height: 100 }}>
//           <Image
//             source={{ uri: `${BASE_URL}/items_uploads/${foodItem.image}` }}
//             style={{ width: "100%", height: 100, borderRadius: 8 }}
//           />

//           <Ionicons
//             name="information-circle-outline"
//             size={24}
//             color="white"
//             style={{
//               position: "absolute",
//               top: 10,
//               right: 10,
//               zIndex: 1,
//             }}
//           />
//         </View>
//       </TouchableOpacity>

//       {/* Food Name and Price */}
//       <View className="w-full items-center flex-col justify-between">
//         <Text
//           style={{
//             fontFamily: FontFamily.poppinsMedium,
//             fontSize: FontSize.size_mini,
//           }}
//         >
//           {foodItem.itemName}
//         </Text>

//         {/* Star Rating and Info */}
//         <View className="flex-row items-center space-x-1">
//           <Ionicons name="star" size={13} color="#FFD700" />
//           <Text className="text-xs text-gray-600">3.7</Text>

//           <Text className="text-xs text-gray-500 ml-1">|</Text>

//           <TouchableOpacity className="flex-row items-center ml-1">
//             <Ionicons name="time" size={13} color="#FFD700" />
//             <Text
//               className="text-xs text-gray-600"
//               style={{ fontFamily: FontFamily.poppinsMedium, marginLeft: 2 }}
//             >
//               15 mins
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       <Text
//         style={{
//           color: isOnline ? "black" : "gray",
//           fontSize: 16,
//         }}
//         className={`font-bold ${isOnline ? "" : ""}`}
//       >
//         ${foodItem.itemPrice}
//       </Text>

//       {/* Add to Cart / Increment Decrement */}
//       {isOnline ? (
//         itemInCart ? (
//           <View className="flex-row items-center space-x-2">
//             <TouchableOpacity
//               onPress={handleDecrement}
//               className="p-2 bg-gray-200 rounded-full"
//             >
//               <Icon.Minus width={16} height={16} stroke="green" />
//             </TouchableOpacity>
//             <View className="w-6 items-center justify-center">
//               <Text
//                 className="text-lg font-semibold"
//                 numberOfLines={1}
//                 adjustsFontSizeToFit
//               >
//                 {itemInCart.quantity}
//               </Text>
//             </View>
//             <TouchableOpacity
//               onPress={handleIncrement}
//               className="p-2 bg-gray-200 rounded-full"
//               disabled={itemInCart.quantity >= foodItem.stock}
//             >
//               <Icon.Plus width={16} height={16} stroke="green" />
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <TouchableOpacity
//               onPress={handleAddToCart}
//               className="rounded-md w-full"
//               style={{ alignSelf: "center" }}
//             >
//           <LinearGradient
//             colors={["white", "white", "white"]}
//             start={{ x: 0, y: 1 }}
//             end={{ x: 1.9, y: 0 }}
            
//             className="py-1 justify-center border-2 border-[#2b054c] rounded-md items-center flex-row"
//           >
            
//               <View className="h-4 w-4">
//                 <Icon.Plus width={15} height={15} stroke="#2b054c" strokeWidth={4}/>
//               </View>
//               <View className="h-6 w-10">
//                 <Text
//                   className="text-[#2b054c] ml-1 font-bold"
//                   style={{
//                     fontFamily: FontFamily.poppinsMedium,
//                     fontSize: FontSize.size_mini,
//                     textAlignVertical: "center",
//                   }}
//                 >
//                   Add
//                 </Text>
//               </View>
//               </LinearGradient>
//             </TouchableOpacity>
          
//         )
//       ) : (
//         <LinearGradient
//           colors={["#b0b0b0", "#d3d3d3", "#e0e0e0"]}
//           start={{ x: 0, y: 1 }}
//           end={{ x: 1.9, y: 0 }}
//           className="rounded-md w-full"
//         >
//           <TouchableOpacity
//             className="py-1 justify-center items-center flex-row"
//             style={{ alignSelf: "center" }}
//           >
//             <View className="h-6">
//               <Text
//                 className="text-red-500 text-center"
//                 style={{
//                   fontFamily: FontFamily.poppinsMedium,
//                   fontSize: FontSize.size_mini,
//                   textAlignVertical: "center",
//                 }}
//               >
//                 Not Available
//               </Text>
//             </View>
//           </TouchableOpacity>
//         </LinearGradient>
//       )}

//       <FoodItemModal
//         isVisible={isModalVisible}
//         onClose={() => setModalVisible(false)}
//       />
//     </View>
//   );
// };

// export default FoodCard;


import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  updateCartQuantity,
  removeFromCart,
} from "../../store/Slices/cartSlice";
import { FontFamily, FontSize } from "../../GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import * as Icon from "react-native-feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { BASE_URL } from "../../constants/constant";
import { saveCartToStorage } from "../../utils/storageUtils";
import FoodItemModal from "./FoodItemModal";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const FoodCard = ({ foodItem }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cartItems = useSelector((state) => state.cart);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Auth state for checking login status

  const itemInCart = cartItems.find((item) => item._id === foodItem._id);

  const isOnline = useSelector((state) => 
    state.foodItem.items.find(item => item._id === foodItem._id)?.isOnline
  );

  useEffect(() => {
    const checkAuthStatus = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      setIsAuthenticated(!!userToken);
    };
    checkAuthStatus();

  }, []);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      // Prompt user to log in if not authenticated
      Alert.alert(
        "Login Required",
        "Please log in to add items to your cart.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Login",
            onPress: () => navigation.navigate("LogIn"), // Navigate to login screen
          },
        ]
      );
      return;
    }

    dispatch(addToCart(foodItem));
    saveCartToStorage(cartItems);
  };

  const handleIncrement = () => {
    if (itemInCart) {
      dispatch(
        updateCartQuantity({
          itemId: foodItem._id,
          quantity: itemInCart.quantity + 1,
        })
      );
      saveCartToStorage(cartItems);
    }
  };

  const handleDecrement = () => {
    if (itemInCart && itemInCart.quantity > 1) {
      dispatch(
        updateCartQuantity({
          itemId: foodItem._id,
          quantity: itemInCart.quantity - 1,
        })
      );
      saveCartToStorage(cartItems);
    } else if (itemInCart && itemInCart.quantity === 1) {
      dispatch(removeFromCart({ itemId: foodItem._id }));
      saveCartToStorage(cartItems);
    }
  };

  return (
    <View className="bg-white rounded-lg w-full items-center space-y-1 flex-1">
      {/* Food Image */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="w-full"
      >
        <View style={{ position: "relative", width: "100%", height: 100 }}>
          <Image
            source={{ uri: `${BASE_URL}/items_uploads/${foodItem.image}` }}
            style={{ width: "100%", height: 100, borderRadius: 8 }}
          />

          <Ionicons
            name="information-circle-outline"
            size={24}
            color="white"
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 1,
            }}
          />
        </View>
      </TouchableOpacity>

      {/* Food Name and Price */}
      <View className="w-full items-center flex-col justify-between">
        <Text
          style={{
            fontFamily: FontFamily.poppinsMedium,
            fontSize: FontSize.size_mini,
          }}
        >
          {foodItem.itemName}
        </Text>

        {/* Star Rating and Info */}
        <View className="flex-row items-center space-x-1">
          <Ionicons name="star" size={13} color="#FFD700" />
          <Text className="text-xs text-gray-600">3.7</Text>

          <Text className="text-xs text-gray-500 ml-1">|</Text>

          <TouchableOpacity className="flex-row items-center ml-1">
            <Ionicons name="time" size={13} color="#FFD700" />
            <Text
              className="text-xs text-gray-600"
              style={{ fontFamily: FontFamily.poppinsMedium, marginLeft: 2 }}
            >
              15 mins
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text
        style={{
          color: isOnline ? "black" : "gray",
          fontSize: 16,
        }}
        className={`font-bold ${isOnline ? "" : ""}`}
      >
        ${foodItem.itemPrice}
      </Text>

      {/* Add to Cart / Increment Decrement */}
      {isOnline ? (
        itemInCart ? (
          <View className="flex-row items-center space-x-2">
            <TouchableOpacity
              onPress={handleDecrement}
              className="p-2 bg-gray-200 rounded-full"
            >
              <Icon.Minus width={16} height={16} stroke="green" />
            </TouchableOpacity>
            <View className="w-6 items-center justify-center">
              <Text
                className="text-lg font-semibold"
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {itemInCart.quantity}
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleIncrement}
              className="p-2 bg-gray-200 rounded-full"
              disabled={itemInCart.quantity >= foodItem.stock}
            >
              <Icon.Plus width={16} height={16} stroke="green" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
              onPress={handleAddToCart}
              className="rounded-md w-full"
              style={{ alignSelf: "center" }}
            >
          <LinearGradient
            colors={["white", "white", "white"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1.9, y: 0 }}
            
            className="py-1 justify-center border-2 border-[#2b054c] rounded-md items-center flex-row"
          >
            
              <View className="h-4 w-4">
                <Icon.Plus width={15} height={15} stroke="#2b054c" strokeWidth={4}/>
              </View>
              <View className="h-6 w-10">
                <Text
                  className="text-[#2b054c] ml-1 font-bold"
                  style={{
                    fontFamily: FontFamily.poppinsMedium,
                    fontSize: FontSize.size_mini,
                    textAlignVertical: "center",
                  }}
                >
                  Add
                </Text>
              </View>
              </LinearGradient>
            </TouchableOpacity>
          
        )
      ) : (
        <LinearGradient
          colors={["#b0b0b0", "#d3d3d3", "#e0e0e0"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1.9, y: 0 }}
          className="rounded-md w-full"
        >
          <TouchableOpacity
            className="py-1 justify-center items-center flex-row"
            style={{ alignSelf: "center" }}
          >
            <View className="h-6">
              <Text
                className="text-red-500 text-center"
                style={{
                  fontFamily: FontFamily.poppinsMedium,
                  fontSize: FontSize.size_mini,
                  textAlignVertical: "center",
                }}
              >
                Not Available
              </Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      )}

      <FoodItemModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default FoodCard;
