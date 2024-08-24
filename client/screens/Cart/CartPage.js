// import React from "react";
// import { View, Text, FlatList, TouchableOpacity, Image, Alert } from "react-native";
// import { useSelector, useDispatch } from "react-redux";
// import { removeFromCart, updateCartQuantity } from "../../store/Slices/cartSlice";
// import * as Icon from "react-native-feather";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { BASE_URL } from "@env";

// const CartPage = () => {
//   const cartItems = useSelector((state) => state.cart);
//   const dispatch = useDispatch();

//   const handleRemoveFromCart = (itemId) => {
//     dispatch(removeFromCart({ itemId }));
//   };

//   const handleIncrement = (itemId) => {
//     const item = cartItems.find(item => item._id === itemId);
//     if (item) {
//       dispatch(updateCartQuantity({ itemId, quantity: item.quantity + 1 }));
//     }
//   };

//   const handleDecrement = (itemId) => {
//     const item = cartItems.find(item => item._id === itemId);
//     if (item && item.quantity > 1) {
//       dispatch(updateCartQuantity({ itemId, quantity: item.quantity - 1 }));
//     }
//   };

//   // Calculate the total price
//   const totalBill = cartItems.reduce((total, item) => total + item.itemPrice * item.quantity, 0);

//   const handlePlaceOrder = () => {
//     // You can implement your order placement logic here
//     Alert.alert("Order Placed", `Your total is $${totalBill.toFixed(2)}`);
//   };

//   const renderCartItem = ({ item }) => (
//     <View className="flex-row items-center space-x-2 py-2 px-4 bg-white rounded-lg mb-2">
//       <Image
//         source={{ uri: `${BASE_URL}/items_uploads/${item.image}` }}
//         style={{ width: 60, height: 60, borderRadius: 8 }}
//       />
//       <View className="flex-1">
//         <Text className="font-semibold text-lg">{item.itemName}</Text>
//         <Text className="text-gray-500">${item.itemPrice}</Text>
//         <View className="flex-row items-center space-x-2 mt-2">
//           <TouchableOpacity
//             onPress={() => handleDecrement(item._id)}
//             className="p-2 bg-gray-200 rounded-full"
//           >
//             <Icon.Minus width={16} height={16} stroke="black" />
//           </TouchableOpacity>
//           <Text>{item.quantity}</Text>
//           <TouchableOpacity
//             onPress={() => handleIncrement(item._id)}
//             className="p-2 bg-gray-200 rounded-full"
//           >
//             <Icon.Plus width={16} height={16} stroke="black" />
//           </TouchableOpacity>
//         </View>
//       </View>
//       <TouchableOpacity
//         onPress={() => handleRemoveFromCart(item._id)}
//         className="p-2 bg-red-500 rounded-full"
//       >
//         <Icon.Trash2 width={16} height={16} stroke="white" />
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <SafeAreaView className="flex-1 bg-gray-100 p-4">
//       {cartItems.length === 0 ? (
//         <Text className="text-center text-lg font-semibold">Your cart is empty</Text>
//       ) : (
//         <>
//           <FlatList
//             data={cartItems}
//             keyExtractor={(item) => item._id}
//             renderItem={renderCartItem}
//           />
//           {/* Total Bill Section */}
//           <View className="bg-white p-4 rounded-lg shadow-md mt-4">
//             <Text className="text-lg font-semibold">Total: ${totalBill.toFixed(2)}</Text>
//           </View>
//           {/* Place Order Button */}
//           <TouchableOpacity
//             onPress={handlePlaceOrder}
//             className="bg-green-500 p-4 rounded-lg mt-4"
//           >
//             <Text className="text-center text-white font-semibold text-lg">Place Order</Text>
//           </TouchableOpacity>
//         </>
//       )}
//     </SafeAreaView>
//   );
// };

// export default CartPage;
import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartQuantity,
  clearCartOnLogout,
} from "../../store/Slices/cartSlice"; // Adjust the path as needed
import * as Icon from "react-native-feather";
import { SafeAreaView } from "react-native-safe-area-context";
import { BASE_URL } from "@env";
import { saveCartToStorage, loadCartFromStorage } from "../../utils/storageUtils"; // Adjust the path as needed

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    // Load cart data when the component mounts
    const loadCart = async () => {
      const savedCart = await loadCartFromStorage();
      savedCart.forEach((item) => dispatch(addToCart(item)));
    };
    loadCart();
  }, [dispatch]);

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart({ itemId }));
    saveCartToStorage(cartItems); // Save cart to AsyncStorage
  };

  const handleIncrement = (itemId) => {
    const item = cartItems.find((item) => item._id === itemId);
    if (item) {
      dispatch(updateCartQuantity({ itemId, quantity: item.quantity + 1 }));
      saveCartToStorage(cartItems); // Save cart to AsyncStorage
    }
  };

  const handleDecrement = (itemId) => {
    const item = cartItems.find((item) => item._id === itemId);
    if (item && item.quantity > 1) {
      dispatch(updateCartQuantity({ itemId, quantity: item.quantity - 1 }));
      saveCartToStorage(cartItems); // Save cart to AsyncStorage
    } else if (item && item.quantity === 1) {
      dispatch(removeFromCart({ itemId }));
      saveCartToStorage(cartItems); // Save cart to AsyncStorage
    }
  };

  const totalBill = cartItems.reduce(
    (total, item) => total + item.itemPrice * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    Alert.alert("Order Placed", `Your total is $${totalBill.toFixed(2)}`);
  };

  const renderCartItem = ({ item }) => (
    <View className="flex-row items-center space-x-2 py-2 px-4 bg-white rounded-lg mb-2">
      <Image
        source={{ uri: `${BASE_URL}/items_uploads/${item.image}` }}
        style={{ width: 60, height: 60, borderRadius: 8 }}
      />
      <View className="flex-1">
        <Text className="font-semibold text-lg">{item.itemName}</Text>
        <Text className="text-gray-500">${item.itemPrice}</Text>
        <View className="flex-row items-center space-x-2 mt-2">
          <TouchableOpacity
            onPress={() => handleDecrement(item._id)}
            className="p-2 bg-gray-200 rounded-full"
          >
            <Icon.Minus width={16} height={16} stroke="black" />
          </TouchableOpacity>
          <Text>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => handleIncrement(item._id)}
            className="p-2 bg-gray-200 rounded-full"
          >
            <Icon.Plus width={16} height={16} stroke="black" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handleRemoveFromCart(item._id)}
        className="p-2 bg-red-500 rounded-full"
      >
        <Icon.Trash2 width={16} height={16} stroke="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-4">
      {cartItems.length === 0 ? (
        <Text className="text-center text-lg font-semibold">
          Your cart is empty
        </Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item._id}
            renderItem={renderCartItem}
          />
          <View className="bg-white p-4 rounded-lg shadow-md mt-4">
            <Text className="text-lg font-semibold">
              Total: ${totalBill.toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handlePlaceOrder}
            className="bg-green-500 p-4 rounded-lg mt-4"
          >
            <Text className="text-center text-white font-semibold text-lg">
              Place Order
            </Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

export default CartPage;
