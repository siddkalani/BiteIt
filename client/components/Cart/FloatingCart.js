import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, selectItemCount } from '../../store/Slices/cartSlice'; // Adjust the import path
import { selectOrderPlaced } from '../../store/Slices/orderSlice';

const FloatingCartBar = ({ imageUrl, restaurantName }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const orderPlaced = useSelector(selectOrderPlaced);
  const itemCount = useSelector(selectItemCount);

  // Track which "page" is displayed; 0 = main page, 1 = cart page on swipe/pagination
  const [currentPage, setCurrentPage] = useState(0);

  const handleCheckout = () => {
    navigation.navigate('CartPage');
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    console.log('Cart cleared');
  };

  const handleTrackOrder = () => {
    // Navigate to order tracking page
    navigation.navigate('OrderTracking');
  };

  // Simple toggle function for demonstration (in a real scenario, use a swipe gesture or a pager)
  const togglePage = () => {
    setCurrentPage((prevPage) => (prevPage === 0 ? 1 : 0));
  };

  return (
    <View className="left-0 right-0 mb-5 w-full items-center">
      <View className="bg-[#2b054c] rounded-2xl w-[90%] shadow-lg flex-row items-center justify-between py-2 px-4">
        
        {/* Left section - changes based on orderPlaced and currentPage */}
        <View className="flex-row items-center space-x-3 flex-1">
          {currentPage === 0 ? (
            // Main page: Conditionally show orderPlaced or normal cart info
            orderPlaced ? (
              <Text className="text-sm text-white">
                Your order has been placed! Track it below.
              </Text>
            ) : (
              <Text className="text-sm text-white">
                {itemCount} item{itemCount !== 1 ? 's' : ''} added
              </Text>
            )
          ) : (
            // Second page: Always show cart details for editing
            <Text className="text-sm text-white">
              Cart Items: {itemCount} item{itemCount !== 1 ? 's' : ''}
            </Text>
          )}
        </View>

        {/* Right section - also changes based on orderPlaced and currentPage */}
        <View className="flex-row items-center space-x-2">
          {currentPage === 0 ? (
            orderPlaced ? (
              // If order is placed, show "Track Order" button
              <TouchableOpacity
                className="bg-[#28A745] flex-row space-x-1 items-center rounded-lg p-2"
                onPress={handleTrackOrder}
              >
                <Text className="text-white font-semibold">Track Order</Text>
                <Icon name="chevron-forward" size={20} color="white" className="ml-1" />
              </TouchableOpacity>
            ) : (
              // Normal scenario: show checkout and clear cart
              <>
                <TouchableOpacity
                  className="bg-[#28A745] flex-row space-x-1 items-center rounded-lg p-2"
                  onPress={handleCheckout}
                >
                  <Text className="text-white font-semibold">Checkout</Text>
                  <Icon name="chevron-forward" size={20} color="white" className="ml-1" />
                </TouchableOpacity>

                <TouchableOpacity
                  className="bg-red-100 p-2 items-center justify-center rounded-lg"
                  onPress={handleClearCart}
                >
                  <Icon name="trash" size={24} color="#FF3B30" />
                </TouchableOpacity>
              </>
            )
          ) : (
            // On the second page: show the cart editing buttons even if order is placed
            <>
              <TouchableOpacity
                className="bg-[#28A745] flex-row space-x-1 items-center rounded-lg p-2"
                onPress={handleCheckout}
              >
                <Text className="text-white font-semibold">View Cart</Text>
                <Icon name="cart" size={20} color="white" className="ml-1" />
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-red-100 p-2 items-center justify-center rounded-lg"
                onPress={handleClearCart}
              >
                <Icon name="trash" size={24} color="#FF3B30" />
              </TouchableOpacity>
            </>
          )}

          {/* Button to toggle between pages (for demonstration) */}
          <TouchableOpacity
            className="bg-white p-2 rounded-lg"
            onPress={togglePage}
          >
            <Icon name={currentPage === 0 ? "arrow-forward" : "arrow-back"} size={20} color="#2b054c" />
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

