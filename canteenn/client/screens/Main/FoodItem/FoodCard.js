// import React from "react";
// import { View, Text, Image, TouchableOpacity, Platform } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart, updateCartQuantity, removeFromCart } from "../../../store/Slices/cartSlice";
// import { FontFamily, FontSize } from "../../../GlobalStyles";
// import { LinearGradient } from "expo-linear-gradient";
// import * as Icon from "react-native-feather";
// import { useNavigation } from "@react-navigation/native";
// import { BASE_URL } from "@env";

// const FoodCard = ({ foodItem }) => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart);

//   const itemInCart = cartItems.find((item) => item._id === foodItem._id);

//   const handleAddToCart = () => {
//     dispatch(addToCart(foodItem));
//   };

//   const handleIncrement = () => {
//     if (itemInCart) {
//       dispatch(updateCartQuantity({ itemId: foodItem._id, quantity: itemInCart.quantity + 1 }));
//     }
//   };

//   const handleDecrement = () => {
//     if (itemInCart && itemInCart.quantity > 1) {
//       dispatch(updateCartQuantity({ itemId: foodItem._id, quantity: itemInCart.quantity - 1 }));
//     } else if (itemInCart && itemInCart.quantity === 1) {
//       dispatch(removeFromCart({ itemId: foodItem._id }));
//     }
//   };

//   return (
//     <TouchableOpacity style={{ flex: 1 }}>
//       <View className="bg-white rounded-lg p-2 w-full items-center space-y-1">
//         <Image
//           source={{ uri: `${BASE_URL}/items_uploads/${foodItem.image}` }}
//           style={{ width: "100%", height: 100, borderRadius: 8 }}
//         />
//         <View className="w-full items-center">
//           <Text
//             style={{
//               fontFamily: FontFamily.poppinsMedium,
//               fontSize: FontSize.size_mini,
//             }}
//             className="text-green-600"
//           >
//             ${foodItem.itemPrice}
//           </Text>
//           <Text
//             style={{
//               fontFamily: FontFamily.poppinsMedium,
//               fontSize: FontSize.size_mini,
//             }}
//           >
//             {foodItem.itemName}
//           </Text>
//         </View>
//         {itemInCart ? (
//           <View className="flex-row items-center space-x-2">
//             <TouchableOpacity
//               onPress={handleDecrement}
//               className="p-2 bg-gray-200 rounded-full"
//             >
//               <Icon.Minus width={16} height={16} stroke="black" />
//             </TouchableOpacity>
//             <Text>{itemInCart.quantity}</Text>
//             <TouchableOpacity
//               onPress={handleIncrement}
//               className="p-2 bg-gray-200 rounded-full"
//             >
//               <Icon.Plus width={16} height={16} stroke="black" />
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <LinearGradient
//             colors={["#007022", "#54d17a", "#bcffd0"]}
//             start={{ x: 0, y: 1 }}
//             end={{ x: 1.9, y: 0 }}
//             className="rounded-md w-full"
//           >
//             <TouchableOpacity
//               onPress={handleAddToCart}
//               className="py-1 justify-center items-center flex-row space-x-1"
//             >
//               <Icon.ShoppingBag width={15} height={15} stroke="white" />
//               <Text
//                 className="text-white"
//                 style={{
//                   fontFamily: FontFamily.poppinsMedium,
//                   fontSize: FontSize.size_mini,
//                 }}
//               >
//                 Add to cart
//               </Text>
//             </TouchableOpacity>
//           </LinearGradient>
//         )}
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default FoodCard;
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  updateCartQuantity,
  removeFromCart,
} from "../../../store/Slices/cartSlice"; // Adjust the path as needed
import { FontFamily, FontSize } from "../../../GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "@env";
import { saveCartToStorage } from "../../../utils/storageUtils"; // Adjust the path as needed

const FoodCard = ({ foodItem }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const itemInCart = cartItems.find((item) => item._id === foodItem._id);

  const handleAddToCart = () => {
    dispatch(addToCart(foodItem));
    saveCartToStorage(cartItems); // Save cart to AsyncStorage
  };

  const handleIncrement = () => {
    if (itemInCart) {
      dispatch(
        updateCartQuantity({
          itemId: foodItem._id,
          quantity: itemInCart.quantity + 1,
        })
      );
      saveCartToStorage(cartItems); // Save cart to AsyncStorage
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
      saveCartToStorage(cartItems); // Save cart to AsyncStorage
    } else if (itemInCart && itemInCart.quantity === 1) {
      dispatch(removeFromCart({ itemId: foodItem._id }));
      saveCartToStorage(cartItems); // Save cart to AsyncStorage
    }
  };

  return (
    <TouchableOpacity style={{ flex: 1 }}>
      <View className="bg-white rounded-lg p-2 w-full items-center space-y-1">
        <Image
          source={{ uri: `${BASE_URL}/items_uploads/${foodItem.image}` }}
          style={{ width: "100%", height: 100, borderRadius: 8 }}
        />
        <View className="w-full items-center">
          <Text
            style={{
              fontFamily: FontFamily.poppinsMedium,
              fontSize: FontSize.size_mini,
            }}
            className="text-green-600"
          >
            ${foodItem.itemPrice}
          </Text>
          <Text
            style={{
              fontFamily: FontFamily.poppinsMedium,
              fontSize: FontSize.size_mini,
            }}
          >
            {foodItem.itemName}
          </Text>
        </View>
        {itemInCart ? (
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
            >
              <Icon.Plus width={16} height={16} stroke="green" />
            </TouchableOpacity>
          </View>
        ) : (
          <LinearGradient
            colors={["#007022", "#54d17a", "#bcffd0"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1.9, y: 0 }}
            className="rounded-md w-full"
          >
            <TouchableOpacity
              onPress={handleAddToCart}
              className="py-1 justify-center items-center flex-row space-x-1"
            >
              <Icon.ShoppingBag width={15} height={15} stroke="white" />
              <Text
                className="text-white"
                style={{
                  fontFamily: FontFamily.poppinsMedium,
                  fontSize: FontSize.size_mini,
                }}
              >
                Add to cart
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default FoodCard;
