// // import React, { useState, useEffect } from "react";
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   Modal,
// //   KeyboardAvoidingView,
// //   Platform,
// //   TouchableWithoutFeedback,
// //   Keyboard,
// //   ActivityIndicator,
// // } from "react-native";
// // import { SafeAreaView } from "react-native";
// // import * as Icon from "react-native-feather";
// // import { FontFamily, FontSize } from "../../../GlobalStyles";
// // import Ionicons from "react-native-vector-icons/Ionicons";
// // import { useDispatch, useSelector } from "react-redux";
// // import { BASE_URL } from "@env";
// // import axios from "axios";
// // import { fetchcategory } from "../../../store/Slices/categorySlice";
// // import SearchResults from './../SearchBar/SearchResults'
// // import SearchCategories from "./../SearchBar/SearchCategories";

// // const SearchModal = ({ isModalVisible, closeSearchModal }) => {
// //   const dispatch = useDispatch();
// //   const category = useSelector((state) => state.category.items);
// //   const categoryStatus = useSelector((state) => state.category.status);

// //   const [searchText, setSearchText] = useState("");
// //   const [searchResults, setSearchResults] = useState([]);
// //   const [isLoading, setIsLoading] = useState(false);

// //   useEffect(() => {
// //     if (categoryStatus === "idle") {
// //       dispatch(fetchcategory());
// //     }
// //   }, [categoryStatus, dispatch]);

// //   const handleSearch = async (text) => {
// //     setSearchText(text);
// //     if (text.length >= 2) {
// //       setIsLoading(true);
// //       try {
// //         const response = await axios.get(`${BASE_URL}/food-item/search`, {
// //           params: { query: text },
// //         });
// //         setSearchResults(response.data.items);
// //       } catch (error) {
// //         // console.error("Failed to fetch search results:", error);
// //         setSearchResults([]);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     } else {
// //       setSearchResults([]);
// //     }
// //   };

// //   return (
// //     <Modal
// //       visible={isModalVisible}
// //       animationType="slide"
// //       transparent={true}
// //       onRequestClose={closeSearchModal}
// //     >
// //       <KeyboardAvoidingView
// //         style={{ flex: 1 }}
// //         behavior={Platform.OS === "ios" ? "padding" : "height"}
// //       >
// //         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
// //           <View className="flex-1 justify-start bg-black bg-opacity-50">
// //             <SafeAreaView
// //               style={{
// //                 flex: 1,
// //                 backgroundColor: "white",
// //                 overflow: "hidden",
// //               }}
// //             >
// //               <View className="bg-white px-4 py-2 flex-1 rounded-none">
// //                 <View className="flex-row items-center space-x-4">
// //                   <TouchableOpacity
// //                     onPress={closeSearchModal}
// //                     className="w-10 h-10 justify-center absolute"
// //                   >
// //                     <Ionicons name="arrow-back" size={24} color="black" />
// //                   </TouchableOpacity>
// //                   <View className="flex-1 items-center">
// //                     <Text
// //                       style={{
// //                         fontFamily: FontFamily.poppinsMedium,
// //                         fontSize: FontSize.size_lg,
// //                         lineHeight: 28,
// //                       }}
// //                       className="text-black"
// //                     >
// //                       Search for dishes
// //                     </Text>
// //                   </View>
// //                 </View>

// //                 <View className="flex-row bg-[#F4F5F9] items-center p-3 rounded-lg mt-4">
// //                   <Icon.Search height="20" width="20" stroke="gray" />
// //                   <TextInput
// //                     placeholder="What are you craving?"
// //                     className="flex-1 ml-2"
// //                     value={searchText}
// //                     onChangeText={handleSearch}
// //                     autoFocus
// //                   />
// //                 </View>

// //                 {searchText.length >= 2 ? (
// //                   isLoading ? (
// //                     <ActivityIndicator size="large" color="#0000ff" />
// //                   ) : (
// //                     <SearchResults searchResults={searchResults} />
// //                   )
// //                 ) : (
// //                   <>
// //                     {/* Recent Searches */}
// //                     <View className="mt-4">
// //                       <Text
// //                         style={{
// //                           fontFamily: FontFamily.poppinsSemiBold,
// //                           fontSize: FontSize.size_md,
// //                         }}
// //                       >
// //                         Recent Searches
// //                       </Text>
// //                       {/* Your existing recent search list rendering code */}
// //                     </View>

// //                     {/* Categories */}
// //                     <SearchCategories categories={category} />
// //                   </>
// //                 )}
// //               </View>
// //             </SafeAreaView>
// //           </View>
// //         </TouchableWithoutFeedback>
// //       </KeyboardAvoidingView>
// //     </Modal>
// //   );
// // };

// // export default SearchModal;

// // SearchModal.js
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
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { useDispatch, useSelector } from "react-redux";
// import { BASE_URL } from "@env";
// import axios from "axios";
// import { fetchcategory } from "../../../store/Slices/categorySlice";
// import SearchResults from './../SearchBar/SearchResults'
// import SearchCategories from "./../SearchBar/SearchCategories";
// import SearchHistory from "./../SearchBar/SearchHistory";
// import { FontFamily, FontSize } from "../../../GlobalStyles";

// const SearchModal = ({ isModalVisible, closeSearchModal }) => {
//   const dispatch = useDispatch();
//   const category = useSelector((state) => state.category.items);
//   const categoryStatus = useSelector((state) => state.category.status);

//   const [searchText, setSearchText] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [searchHistory, setSearchHistory] = useState([]);
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

//         // Add to search history
//         const newHistory = [{ name: text, image: response.data.items[0]?.image }];
//         setSearchHistory((prevHistory) => {
//           const updatedHistory = [...newHistory, ...prevHistory];
//           if (updatedHistory.length > 5) {
//             updatedHistory.pop(); // Keep only the latest 5 items
//           }
//           return updatedHistory;
//         });
//       } catch (error) {
//         setSearchResults([]);
//       } finally {
//         setIsLoading(false);
//       }
//     } else {
//       setSearchResults([]);
//     }
//   };

//   const removeSearchItem = (itemName) => {
//     setSearchHistory((prevHistory) =>
//       prevHistory.filter((item) => item.name !== itemName)
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
//                     <SearchHistory
//                       searchHistory={searchHistory}
//                       removeSearchItem={removeSearchItem}
//                     />

//                     {/* Categories */}
//                     <SearchCategories/>
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
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { useDispatch, useSelector } from "react-redux";
// import { BASE_URL } from "@env";
// import axios from "axios";
// import { fetchcategory } from "../../../store/Slices/categorySlice";
// import SearchResults from './../SearchBar/SearchResults';
// import SearchCategories from "./../SearchBar/SearchCategories"; 
// import SearchHistory from "./../SearchBar/SearchHistory";
// import { FontFamily, FontSize } from "../../../GlobalStyles";

// const SearchModal = ({ isModalVisible, closeSearchModal }) => {
//   const dispatch = useDispatch();
//   const category = useSelector((state) => state.category.items);
//   const categoryStatus = useSelector((state) => state.category.status);

//   const [searchText, setSearchText] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [searchHistory, setSearchHistory] = useState([]);
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
//         setSearchResults([]);
//       } finally {
//         setIsLoading(false);
//       }
//     } else {
//       setSearchResults([]);
//     }
//   };

//   const updateSearchHistory = (item) => {
//     const newHistory = [{ name: item.itemName, image: item.image }];
//     setSearchHistory((prevHistory) => {
//       const updatedHistory = [...newHistory, ...prevHistory];
//       if (updatedHistory.length > 5) {
//         updatedHistory.pop(); // Keep only the latest 5 items
//       }
//       return updatedHistory;
//     });
//   };

//   const removeSearchItem = (itemName) => {
//     setSearchHistory((prevHistory) =>
//       prevHistory.filter((item) => item.name !== itemName)
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
//                     <SearchResults
//                       searchResults={searchResults}
//                       closeSearchModal={closeSearchModal}
//                       updateSearchHistory={updateSearchHistory}
//                     />
//                   )
//                 ) : (
//                   <>
//                     {/* Recent Searches */}
//                     <SearchHistory
//                       searchHistory={searchHistory}
//                       removeSearchItem={removeSearchItem}
//                     />

//                     {/* Categories */}
//                     <SearchCategories />
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
import SearchResults from "./../SearchBar/SearchResults";
import SearchCategories from "./../SearchBar/SearchCategories";
import SearchHistory from "./../SearchBar/SearchHistory";
import { FontFamily, FontSize } from "../../../GlobalStyles";
import { useNavigation } from "@react-navigation/native";

const SearchModal = ({ isModalVisible, closeSearchModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigation();
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
      } catch (error) {
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  const updateSearchHistory = (item) => {
    const newHistory = [{ name: item.itemName, image: item.image }];
    setSearchHistory((prevHistory) => {
      const updatedHistory = [...newHistory, ...prevHistory];
      if (updatedHistory.length > 5) {
        updatedHistory.pop(); // Keep only the latest 5 items
      }
      return updatedHistory;
    });
  };

  const removeSearchItem = (itemName) => {
    setSearchHistory((prevHistory) =>
      prevHistory.filter((item) => item.name !== itemName)
    );
  };

  const handleItemSelect = (item) => {
    updateSearchHistory(item); // Update the search history
    navigate.navigate("FoodItem", { foodItem: item }); // Navigate to FoodItem page
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
                      <SearchResults
                        closeSearchModal={closeSearchModal}
                        searchResults={searchResults}
                        updateSearchHistory={updateSearchHistory}
                      onSelectItem={handleItemSelect} // Pass the item select handler
                    />
                  )
                ) : (
                  <>
                    {/* Recent Searches */}
                    <SearchHistory
                      searchHistory={searchHistory}
                      removeSearchItem={removeSearchItem}
                    />

                    {/* Categories */}
                    <SearchCategories />
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
