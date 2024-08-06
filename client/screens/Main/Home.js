// import {
//   Image,
//   View,
//   Text,
//   SafeAreaView,
//   StatusBar,
//   TextInput,
//   TouchableOpacity,
//   Dimensions,
//   Platform,
//   StatusBar as RNStatusBar,
//   Animated,
//   ScrollView,
// } from "react-native";
// import React, { useRef, useState } from "react";
// import * as Icon from "react-native-feather";
// import SafeAreaAndroid from "../../components/SafeAreaAndroid";
// import { FontFamily, FontSize } from "../../GlobalStyles";
// import foodcategory from "./HomeData";
// import FoodCard from "./FoodCard";

// const Home = () => {
//   const { width: screenWidth } = Dimensions.get("window");
//   const aspectRatio = 183 / 402;
//   const imageHeight = screenWidth * aspectRatio;
//   const scrollY = useRef(new Animated.Value(0)).current;
//   const [isScrolled, setIsScrolled] = useState(false);

//   const handleScroll = Animated.event(
//     [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//     { useNativeDriver: false }
//   );

//   const handleScrollEnd = ({ nativeEvent }) => {
//     const offsetY = nativeEvent.contentOffset.y;
//     setIsScrolled(offsetY > 0);
//   };

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
//       }}
//       className="bg-[#ffffff]"
//     >
//       <StatusBar
//         barStyle="dark-content"
//         backgroundColor="transparent"
//         translucent
//       />
//       <Animated.ScrollView
//         onScroll={handleScroll}
//         onMomentumScrollEnd={handleScrollEnd}
//         scrollEventThrottle={16}
//       >
//         <View className="px-4 py-4 space-y-2">
//           {/* search bar */}
//           <View className="flex-row items-center space-x-2">
//             <View className="flex-row flex-1 bg-[#F4F5F9] items-center p-2 rounded-lg">
//               <Icon.Search height="20" width="20" stroke="gray" />
//               <TextInput
//                 placeholder="What are you craving?"
//                 className="flex-1 ml-2"
//               />
//             </View>
//             <View className="">
//               <Icon.ShoppingCart
//                 width="20"
//                 height="20"
//                 strokeWidth={2}
//                 stroke="gray"
//               />
//             </View>
//           </View>
//           {/* pagination window */}
//           <View>
//             <Image
//               source={require("../../assets/images/home/home-slider.png")}
//               resizeMode="contain"
//               style={{ width: "100%", height: imageHeight }}
//               className="rounded-lg w-full"
//             />
//           </View>
//           {/* category */}
//           <View className="space-y-2">
//             <Text
//               style={{
//                 fontFamily: FontFamily.poppinsSemiBold,
//                 fontSize: FontSize.size_xl,
//               }}
//             >
//               category
//             </Text>
//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               className="space-x-4"
//             >
//               {foodcategory.map((item) => (
//                 <View key={item.id} className="items-center">
//                   <Image
//                     source={item.image}
//                     className="h-[62] w-[61] rounded-full"
//                     resizeMode="contain"
//                   />
//                   <Text
//                     style={{
//                       fontFamily: FontFamily.poppinsMedium,
//                       fontSize: FontSize.size_xs,
//                     }}
//                   >
//                     {item.name}
//                   </Text>
//                 </View>
//               ))}
//             </ScrollView>
//           </View>
//         </View>
//         {/* Shadow separator */}
//         {isScrolled && (
//           <View
//             className="h-[1px] bg-transparent shadow-lg"
//             style={{
//               shadowColor: "#000",
//               shadowOffset: { width: 0, height: 2 },
//               shadowOpacity: 0.25,
//               shadowRadius: 3.84,
//               elevation: 5,
//             }}
//           />
//         )}
//         {/* menu bar */}
//         <View className="px-4 py-2 space-y-2 flex-1 bg-[#F4F5F9]">
//           <Text
//             style={{
//               fontFamily: FontFamily.poppinsSemiBold,
//               fontSize: FontSize.size_xl,
//             }}
//           >
//             Menu
//           </Text>
//           <View className="flex-row flex-wrap justify-between">
//             {foodcategory.map((item) => (
//               <View key={item.id} className="w-[48%] mb-4">
//                 <FoodCard item={item} />
//               </View>
//             ))}
//           </View>
//         </View>
//       </Animated.ScrollView>
//       {/* footer */}
//       <View className="flex-row justify-around items-center bg-white">
//         <TouchableOpacity className="items-center py-2">
//           <Icon.Home width={24} height={24} stroke="gray" />
//           <Text
//             style={{
//               fontFamily: FontFamily.poppinsMedium,
//               fontSize: FontSize.size_xs,
//             }}
//           ></Text>
//         </TouchableOpacity>
//         <TouchableOpacity className="items-center py-2">
//           <Icon.User width={22} height={22} stroke="gray" />
//           <Text
//             style={{
//               fontFamily: FontFamily.poppinsMedium,
//               fontSize: FontSize.size_xs,
//             }}
//           ></Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Home;

import React, { useRef, useState, useEffect } from "react";
import {
  Image,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  Animated,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as Icon from "react-native-feather";
import { useDispatch, useSelector } from "react-redux";
import { fetchcategory } from "../../store/Slices/categorySlice";
import { FontFamily, FontSize } from "../../GlobalStyles";
import FoodCard from "./FoodCard";
import foodcategory from "./HomeData";

const Home = () => {
  const dispatch = useDispatch();
  const { width: screenWidth } = Dimensions.get("window");
  const aspectRatio = 183 / 402;
  const imageHeight = screenWidth * aspectRatio;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isScrolled, setIsScrolled] = useState(false);

  const category = useSelector((state) => state.category.items);
  const categoryStatus = useSelector((state) => state.category.status);
  const categoryError = useSelector((state) => state.category.error);

  useEffect(() => {
    if (categoryStatus === "idle") {
      dispatch(fetchcategory());
    }
  }, [categoryStatus, dispatch]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const handleScrollEnd = ({ nativeEvent }) => {
    const offsetY = nativeEvent.contentOffset.y;
    setIsScrolled(offsetY > 0);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
      className="bg-[#ffffff]"
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Animated.ScrollView
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
      >
        <View className="px-4 py-4 space-y-2">
          {/* search bar */}
          <View className="flex-row items-center space-x-2">
            <View className="flex-row flex-1 bg-[#F4F5F9] items-center p-2 rounded-lg">
              <Icon.Search height="20" width="20" stroke="gray" />
              <TextInput
                placeholder="What are you craving?"
                className="flex-1 ml-2"
              />
            </View>
            <View className="">
              <Icon.ShoppingCart
                width="20"
                height="20"
                strokeWidth={2}
                stroke="gray"
              />
            </View>
          </View>
          {/* pagination window */}
          <View>
            <Image
              source={require("../../assets/images/home/home-slider.png")}
              resizeMode="contain"
              style={{ width: "100%", height: imageHeight }}
              className="rounded-lg w-full"
            />
          </View>
          {/* category */}
          <View className="space-y-2">
            <Text
              style={{
                fontFamily: FontFamily.poppinsSemiBold,
                fontSize: FontSize.size_xl,
              }}
            >
              Categories
            </Text>
            {categoryStatus === "loading" ? (
              <ActivityIndicator size="large" color="#007022" />
            ) : categoryStatus === "failed" ? (
              <Text>Error: {categoryError}</Text>
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="space-x-4"
              >
                {category.map((item) => (
                  <View key={item.id} className="items-center">
                    <Image
                      source={{ uri: item.image }} // Assuming image URLs are provided
                      className="h-[62] w-[61] rounded-full"
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        fontFamily: FontFamily.poppinsMedium,
                        fontSize: FontSize.size_xs,
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
        {/* Shadow separator */}
        {isScrolled && (
          <View
            className="h-[1px] bg-transparent shadow-lg"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          />
        )}
        {/* menu bar */}
        <View className="px-4 py-2 space-y-2 flex-1 bg-[#F4F5F9]">
          <Text
            style={{
              fontFamily: FontFamily.poppinsSemiBold,
              fontSize: FontSize.size_xl,
            }}
          >
            Menu
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {foodcategory.map((item) => (
              <View key={item.id} className="w-[48%] mb-4">
                <FoodCard item={item} />
              </View>
            ))}
          </View>
        </View>
      </Animated.ScrollView>
      {/* footer */}
      <View className="flex-row justify-around items-center bg-white">
        <TouchableOpacity className="items-center py-2">
          <Icon.Home width={24} height={24} stroke="gray" />
          <Text
            style={{
              fontFamily: FontFamily.poppinsMedium,
              fontSize: FontSize.size_xs,
            }}
          ></Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center py-2">
          <Icon.User width={22} height={22} stroke="gray" />
          <Text
            style={{
              fontFamily: FontFamily.poppinsMedium,
              fontSize: FontSize.size_xs,
            }}
          ></Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
