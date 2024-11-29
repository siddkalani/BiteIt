import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, selectItemCount } from '../../store/Slices/cartSlice'; // Adjust the import path
import { selectOrderPlaced } from '../../store/Slices/orderSlice';

const FloatingCartBar = ({ imageUrl, restaurantName }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const orderPlaced = useSelector(selectOrderPlaced); // Access global state
  // Get itemCount from cartSlice
  const itemCount = useSelector(selectItemCount);

  const handleCheckout = () => {
    navigation.navigate('CartPage');
  };

  // Handle clearing the cart
  const handleClearCart = () => {
    dispatch(clearCart()); // Dispatch the action to clear all items
    console.log('Cart cleared');
  };

  return (
    <View className="left-0 right-0 mb-5 w-full items-center">
      <View className="bg-[#2b054c] rounded-2xl w-[90%] shadow-lg flex-row items-center justify-between py-2 px-4">
        <View className="flex-row items-center space-x-3">
          {/* Image and restaurant name */}
          <View>
            <Text className="text-sm text-white">{itemCount} item{itemCount !== 1 ? 's' : ''} added</Text>
          </View>
        </View>
        <View className="flex-row items-center space-x-2">
          <TouchableOpacity
            className="bg-[#28A745] flex-row space-x-1 items-center rounded-lg p-2"
            onPress={handleCheckout}
          >
            <View>
              <Text className="text-white font-semibold">Checkout</Text>
            </View>
            <Icon name="chevron-forward" size={20} color="white" className="ml-1" />
          </TouchableOpacity>

          {/* Clear Cart Button */}
          <TouchableOpacity 
            className="bg-red-100 p-2 items-center justify-center rounded-lg" 
            onPress={handleClearCart}  // Clear the entire cart
          >
            <Icon name="trash" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FloatingCartBar;





// // import React from 'react';
// // import { View, Text, TouchableOpacity, Image } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// // import Icon from 'react-native-vector-icons/Ionicons';

// // const FloatingCartBar = ({ itemCount, totalPrice, imageUrl, restaurantName }) => {
// //   const navigation = useNavigation();

// //   const handleCheckout = () => {
// //     navigation.navigate('CartPage');
// //   };

// //   const handleDelete = () => {
// //     // Implement delete functionality
// //     console.log('Delete cart');
// //   };

// //   return (
// //     <View className=" left-0 right-0">
// //       <View className="bg-white rounded-t-2xl shadow-lg flex-row items-center justify-between p-3">
// //         <View className="flex-row items-center space-x-3">
// //           <Image
// //             source={imageUrl ? { uri: imageUrl } : require('../../assets/images/home/coverFood.png')}
// //             className="w-12 h-12 rounded-full"
// //           />
// //           <View>
// //             <Text className="font-semibold text-gray-800">{restaurantName}</Text>
// //             <Text className="text-sm text-gray-600">{itemCount} item{itemCount !== 1 ? 's' : ''}</Text>
// //           </View>
// //         </View>
// //         <View className="flex-row items-center space-x-2">
// //           <TouchableOpacity
// //             className="bg-green-500 flex-row space-x-1 items-center rounded-lg px-4 py-2"
// //             onPress={handleCheckout}
// //           >
// //             <View>
// //             <Text className="text-white font-semibold">Checkout</Text>
// //               <Text className="text-white mr-2">₹{totalPrice.toFixed(2)}</Text>
              
// //             </View>
// //             <Icon name="chevron-forward" size={20} color="white" className="ml-1" />
// //           </TouchableOpacity>
// //           <TouchableOpacity className='bg-red-100 px-1 py-3 items-center justify-center rounded-lg' onPress={handleDelete}>
// //             <Icon name="trash" size={24} color="#FF3B30" />
// //           </TouchableOpacity>
// //         </View>
// //       </View>
// //     </View>
// //   );
// // };

// // export default FloatingCartBar;

// import React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useDispatch, useSelector } from 'react-redux';
// import { removeFromCart ,selectItemCount, selectTotalAmount, clearCart} from '../../store/Slices/cartSlice'; // Adjust the import path


// const FloatingCartBar = ({ imageUrl, restaurantName }) => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   // Get itemCount and totalAmount from cartSlice
//   const itemCount = useSelector(selectItemCount);
//   // const totalAmount = useSelector(selectTotalAmount);

//   const handleCheckout = () => {
//     navigation.navigate('CartPage');
//   };

//   const handleRemoveFromCart = () => {
//     dispatch(clearCart())
//   };

//   return (
//     <View className="left-0 right-0">
//       <View className="bg-white rounded-t-2xl shadow-lg flex-row items-center justify-between p-3">
//         <View className="flex-row items-center space-x-3">
//           {/* <Image
//             source={imageUrl ? { uri: imageUrl } : require('../../assets/images/home/coverFood.png')}
//             className="w-12 h-12 rounded-full"
//           /> */}
//           <View>
//             {/* <Text className="font-semibold text-gray-800">{restaurantName}</Text> */}
//             <Text className="text-sm text-gray-600">{itemCount} item{itemCount !== 1 ? 's' : ''}</Text>
//           </View>
//         </View>
//         <View className="flex-row items-center space-x-2">
//           <TouchableOpacity
//             className="bg-green-500 flex-row space-x-1 items-center rounded-lg px-4 py-2"
//             onPress={handleCheckout}
//           >
//             <View>
//               <Text className="text-white font-semibold">Checkout</Text>
//               {/* <Text className="text-white mr-2">₹{totalAmount.toFixed(2)}</Text> */}
//             </View>
//             <Icon name="chevron-forward" size={20} color="white" className="ml-1" />
//           </TouchableOpacity>
//           <TouchableOpacity className="bg-red-100 px-1 py-3 items-center justify-center rounded-lg" onPress={() => handleRemoveFromCart()}> 
//             <Icon name="trash" size={24} color="#FF3B30" />
//           </TouchableOpacity>
//         </View>
        
//       </View>
//     </View>
//   );
// };

// export default FloatingCartBar;

