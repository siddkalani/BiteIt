// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Modal,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableWithoutFeedback,
//   Keyboard,
//   ActivityIndicator,
// } from "react-native";
// import { SafeAreaView } from "react-native";
// import * as Icon from "react-native-feather";
// import { FontFamily, FontSize } from "../../../GlobalStyles";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { useDispatch, useSelector } from "react-redux";
// import { BASE_URL } from "@env";
// import axios from "axios";
// import { fetchcategory } from "../../../store/Slices/categorySlice";
// import SearchResults from './../SearchBar/SearchResults'
// import SearchCategories from "./../SearchBar/SearchCategories"; 

// const SearchModal = ({ isModalVisible, closeSearchModal }) => {
//   const dispatch = useDispatch();
//   const category = useSelector((state) => state.category.items);
//   const categoryStatus = useSelector((state) => state.category.status);

//   const [searchText, setSearchText] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (categoryStatus === "idle") {
//       dispatch(fetchcategory());
//     }
//   }, [categoryStatus, dispatch]);

//   const handleSearch = async (text) => {
//     setSearchText(text);
//     if (text.length >= 2) {
//       setIsLoading(true);
//       try {
//         const response = await axios.get(`${BASE_URL}/food-item/search`, {
//           params: { query: text },
//         });
//         setSearchResults(response.data.items);
//       } catch (error) {
//         // console.error("Failed to fetch search results:", error);
//         setSearchResults([]);
//       } finally {
//         setIsLoading(false);
//       }
//     } else {
//       setSearchResults([]);
//     }
//   };

//   return (
//     <Modal
//       visible={isModalVisible}
//       animationType="slide"
//       transparent={true}
//       onRequestClose={closeSearchModal}
//     >
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//       >
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <View className="flex-1 justify-start bg-black bg-opacity-50">
//             <SafeAreaView
//               style={{
//                 flex: 1,
//                 backgroundColor: "white",
//                 overflow: "hidden",
//               }}
//             >
//               <View className="bg-white px-4 py-2 flex-1 rounded-none">
//                 <View className="flex-row items-center space-x-4">
//                   <TouchableOpacity
//                     onPress={closeSearchModal}
//                     className="w-10 h-10 justify-center absolute"
//                   >
//                     <Ionicons name="arrow-back" size={24} color="black" />
//                   </TouchableOpacity>
//                   <View className="flex-1 items-center">
//                     <Text
//                       style={{
//                         fontFamily: FontFamily.poppinsMedium,
//                         fontSize: FontSize.size_lg,
//                         lineHeight: 28,
//                       }}
//                       className="text-black"
//                     >
//                       Search for dishes
//                     </Text>
//                   </View>
//                 </View>

//                 <View className="flex-row bg-[#F4F5F9] items-center p-3 rounded-lg mt-4">
//                   <Icon.Search height="20" width="20" stroke="gray" />
//                   <TextInput
//                     placeholder="What are you craving?"
//                     className="flex-1 ml-2"
//                     value={searchText}
//                     onChangeText={handleSearch}
//                     autoFocus
//                   />
//                 </View>

//                 {searchText.length >= 2 ? (
//                   isLoading ? (
//                     <ActivityIndicator size="large" color="#0000ff" />
//                   ) : (
//                     <SearchResults searchResults={searchResults} />
//                   )
//                 ) : (
//                   <>
//                     {/* Recent Searches */}
//                     <View className="mt-4">
//                       <Text
//                         style={{
//                           fontFamily: FontFamily.poppinsSemiBold,
//                           fontSize: FontSize.size_md,
//                         }}
//                       >
//                         Recent Searches
//                       </Text>
//                       {/* Your existing recent search list rendering code */}
//                     </View>

//                     {/* Categories */}
//                     <SearchCategories categories={category} />
//                   </>
//                 )}
//               </View>
//             </SafeAreaView>
//           </View>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>
//     </Modal>
//   );
// };

// export default SearchModal;

// SearchModal.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native";
import * as Icon from "react-native-feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "@env";
import axios from "axios";
import { fetchcategory } from "../../../store/Slices/categorySlice";
import SearchResults from './../SearchBar/SearchResults'
import SearchCategories from "./../SearchBar/SearchCategories"; 
import SearchHistory from "./../SearchBar/SearchHistory";
import { FontFamily, FontSize } from "../../../GlobalStyles";

const SearchModal = ({ isModalVisible, closeSearchModal }) => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category.items);
  const categoryStatus = useSelector((state) => state.category.status);

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (categoryStatus === "idle") {
      dispatch(fetchcategory());
    }
  }, [categoryStatus, dispatch]);

  const handleSearch = async (text) => {
    setSearchText(text);
    if (text.length >= 2) {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/food-item/search`, {
          params: { query: text },
        });
        setSearchResults(response.data.items);

        // Add to search history
        const newHistory = [{ name: text, image: response.data.items[0]?.image }];
        setSearchHistory((prevHistory) => {
          const updatedHistory = [...newHistory, ...prevHistory];
          if (updatedHistory.length > 5) {
            updatedHistory.pop(); // Keep only the latest 5 items
          }
          return updatedHistory;
        });
      } catch (error) {
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  const removeSearchItem = (itemName) => {
    setSearchHistory((prevHistory) =>
      prevHistory.filter((item) => item.name !== itemName)
    );
  };

  return (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={closeSearchModal}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 justify-start bg-black bg-opacity-50">
            <SafeAreaView
              style={{
                flex: 1,
                backgroundColor: "white",
                overflow: "hidden",
              }}
            >
              <View className="bg-white px-4 py-2 flex-1 rounded-none">
                <View className="flex-row items-center space-x-4">
                  <TouchableOpacity
                    onPress={closeSearchModal}
                    className="w-10 h-10 justify-center absolute"
                  >
                    <Ionicons name="arrow-back" size={24} color="black" />
                  </TouchableOpacity>
                  <View className="flex-1 items-center">
                    <Text
                      style={{
                        fontFamily: FontFamily.poppinsMedium,
                        fontSize: FontSize.size_lg,
                        lineHeight: 28,
                      }}
                      className="text-black"
                    >
                      Search for dishes
                    </Text>
                  </View>
                </View>

                <View className="flex-row bg-[#F4F5F9] items-center p-3 rounded-lg mt-4">
                  <Icon.Search height="20" width="20" stroke="gray" />
                  <TextInput
                    placeholder="What are you craving?"
                    className="flex-1 ml-2"
                    value={searchText}
                    onChangeText={handleSearch}
                    autoFocus
                  />
                </View>

                {searchText.length >= 2 ? (
                  isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                  ) : (
                    <SearchResults searchResults={searchResults} />
                  )
                ) : (
                  <>
                    {/* Recent Searches */}
                    <SearchHistory
                      searchHistory={searchHistory}
                      removeSearchItem={removeSearchItem}
                    />

                    {/* Categories */}
                    <SearchCategories/>
                  </>
                )}
              </View>
            </SafeAreaView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default SearchModal;


// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Modal,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableWithoutFeedback,
//   Keyboard,
//   FlatList,
//   Image,
// } from "react-native";
// import { SafeAreaView } from "react-native";
// import * as Icon from "react-native-feather";
// import { FontFamily, FontSize } from "../../../GlobalStyles";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchcategory } from "../../../store/Slices/categorySlice";
// import { BASE_URL } from "@env";

// const initialSearchHistory = [
//   {
//     name: "Pizza",
//     image: require("../../../assets/images/categories/icecream.png"),
//   },
//   {
//     name: "Burgers",
//     image: require("../../../assets/images/categories/icecream.png"),
//   },
//   {
//     name: "Sushi",
//     image: require("../../../assets/images/categories/icecream.png"),
//   },
//   {
//     name: "Pasta",
//     image: require("../../../assets/images/categories/icecream.png"),
//   },
// ];

// const SearchModal = ({ isModalVisible, closeSearchModal }) => {
//   const dispatch = useDispatch();

//   const categories = useSelector((state) => state.category.items);
//   const categoryStatus = useSelector((state) => state.category.status);
//   const categoryError = useSelector((state) => state.category.error);

//   useEffect(() => {
//     if (categoryStatus === "idle") {
//       dispatch(fetchcategory());
//     }
//   }, [categoryStatus, dispatch]);

//   const [searchHistory, setSearchHistory] = useState(initialSearchHistory);

//   const removeSearchItem = (item) => {
//     setSearchHistory(
//       searchHistory.filter((historyItem) => historyItem.name !== item)
//     );
//   };

//   return (
//     <Modal
//       visible={isModalVisible}
//       animationType="slide"
//       transparent={true}
//       onRequestClose={closeSearchModal}
//     >
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//       >
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <View className="flex-1 justify-start bg-black bg-opacity-50">
//             <SafeAreaView
//               style={{
//                 flex: 1,
//                 backgroundColor: "white",
//                 overflow: "hidden",
//               }}
//             >
//               <View className="bg-white px-4 py-2 flex-1 rounded-none">
//                 <View className="flex-row items-center space-x-4">
//                   <TouchableOpacity
//                     onPress={closeSearchModal}
//                     className="w-10 h-10  justify-center absolute"
//                   >
//                     <Ionicons name="arrow-back" size={24} color="black" />
//                   </TouchableOpacity>
//                   <View className="flex-1 items-center">
//                     <Text
//                       style={{
//                         fontFamily: FontFamily.poppinsMedium,
//                         fontSize: FontSize.size_lg,
//                         lineHeight: 28,
//                       }}
//                       className="text-black"
//                     >
//                       Search for dishes
//                     </Text>
//                   </View>
//                 </View>

//                 <View className="flex-row bg-[#F4F5F9] items-center p-3 rounded-lg mt-4">
//                   <Icon.Search height="20" width="20" stroke="gray" />
//                   <TextInput
//                     placeholder="What are you craving?"
//                     className="flex-1 ml-2"
//                     autoFocus
//                   />
//                 </View>

//                 {/* Recent Searches */}
//                 <View className="mt-4">
//                   <Text
//                     style={{
//                       fontFamily: FontFamily.poppinsSemiBold,
//                       fontSize: FontSize.size_md,
//                     }}
//                   >
//                     Recent Searches
//                   </Text>
//                   <FlatList
//                     data={searchHistory}
//                     renderItem={({ item }) => (
//                       <View
//                         className="bg-white p-4 mt-2 rounded-lg shadow flex-row justify-between items-center"
//                         style={{
//                           width: "98%",
//                           alignSelf: "center",
//                           shadowColor: "#000",
//                           shadowOffset: { width: 0, height: 2 },
//                           shadowOpacity: 0.1,
//                           shadowRadius: 5,
//                           elevation: 3,
//                         }}
//                       >
//                         <View className="flex-row items-center">
//                           <Image
//                             source={item.image}
//                             className="w-7 h-7 rounded-lg mr-3"
//                             style={{ resizeMode: "contain" }}
//                           />
//                           <Text
//                             style={{
//                               fontFamily: FontFamily.poppinsMedium,
//                               fontSize: FontSize.size_md,
//                             }}
//                           >
//                             {item.name}
//                           </Text>
//                         </View>
//                         <TouchableOpacity
//                           onPress={() => removeSearchItem(item.name)}
//                         >
//                           <Icon.X width={20} height={20} stroke="red" />
//                         </TouchableOpacity>
//                       </View>
//                     )}
//                     keyExtractor={(item, index) => index.toString()}
//                     contentContainerStyle={{ paddingBottom: 10 }}
//                   />
//                 </View>

//                 {/* Categories */}
//                 <View className="mt-4">
//                   <Text
//                     style={{
//                       fontFamily: FontFamily.poppinsSemiBold,
//                       fontSize: FontSize.size_md,
//                     }}
//                   >
//                     Categories
//                   </Text>
//                   <FlatList
//                     data={categories}
//                     renderItem={({ item }) => (
//                       <View
//                         className="w-1/3 p-2"
//                         style={{
//                           alignItems: "center",
//                         }}
//                       >
//                         <View
//                           className="bg-white rounded-lg shadow w-full py-1"
//                           style={{
//                             alignItems: "center",
//                             shadowColor: "#000",
//                             shadowOffset: { width: 0, height: 2 },
//                             shadowOpacity: 0.1,
//                             shadowRadius: 5,
//                             elevation: 3,
//                           }}
//                         >
//                           <Image
//                             source={{ uri:`${BASE_URL}/uploads/${item.image}` }} // Assuming item.image is a URL
//                             className="w-16 h-16 rounded-lg"
//                             style={{ resizeMode: "cover" }}
//                           />
//                           <Text
//                             style={{
//                               fontFamily: FontFamily.poppinsMedium,
//                               fontSize: FontSize.size_md,
//                             }}
//                           >
//                             {item.categoryName}
//                           </Text>
//                         </View>
//                       </View>
//                     )}
//                     keyExtractor={(item, index) => index.toString()}
//                     numColumns={3}
//                     contentContainerStyle={{ paddingBottom: 10 }}
//                   />
//                 </View>
//               </View>
//             </SafeAreaView>
//           </View>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>
//     </Modal>
//   );
// };

// export default SearchModal;
