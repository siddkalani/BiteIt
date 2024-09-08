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
// import { useDispatch, useSelector } from "react-redux";
// import { BASE_URL } from "@env";
// import axios from "axios";
// import { fetchcategory } from "../../../store/Slices/categorySlice";
// import SearchResults from "./../SearchBar/SearchResults";
// import SearchCategories from "./../SearchBar/SearchCategories";
// import SearchHistory from "./../SearchBar/SearchHistory";
// import { FontFamily, FontSize } from "../../../GlobalStyles";
// import Header from "../../../components/Layout/BaseHeader"; // Import the new SearchHeader component
// import { useNavigation } from "@react-navigation/native";

// const SearchModal = ({ isModalVisible, closeSearchModal }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigation();
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

//   const handleItemSelect = (item) => {
//     updateSearchHistory(item); // Update the search history
//     navigate.navigate("FoodItem", { foodItem: item }); // Navigate to FoodItem page
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
//                 {/* Use the separated SearchHeader component */}
//                 <Header closeSearchModal={closeSearchModal} />

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
//                       closeSearchModal={closeSearchModal}
//                       searchResults={searchResults}
//                       updateSearchHistory={updateSearchHistory}
//                       onSelectItem={handleItemSelect} // Pass the item select handler
//                     />
//                   )
//                 ) : (
//                   <>
//                     <SearchHistory
//                       searchHistory={searchHistory}
//                       removeSearchItem={removeSearchItem}
//                     />

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
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "@env";
import axios from "axios";
import { fetchcategory } from "../../../store/Slices/categorySlice";
import SearchResults from "./../SearchBar/SearchResults";
import SearchCategories from "./../SearchBar/SearchCategories";
import SearchHistory from "./../SearchBar/SearchHistory";
import { FontFamily, FontSize } from "../../../GlobalStyles";
import Header from "../../../components/Layout/BaseHeader";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  useEffect(() => {
    if (!isModalVisible) {
      setSearchText(""); // Clear search text when modal is closed
      setSearchResults([]); // Clear search results
    }
  }, [isModalVisible]);

  const handleSearch = async (text) => {
    setSearchText(text);
    if (text.length >= 2) {
      setIsLoading(true);
      try {
        // const response = await axios.get(`${BASE_URL}/food-item/search`, {
        //   params: { query: text },
        // });
        const token = await AsyncStorage.getItem("userToken");

        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.get(`${BASE_URL}/food-item/search`, {
          params: { query: text },
          headers: headers, // Pass the headers here
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
    setSearchHistory((prevHistory) => {
      // Remove the item if it already exists in the history
      const updatedHistory = prevHistory.filter(
        (historyItem) => historyItem.name !== item.itemName
      );

      // Add the new item to the top of the list
      updatedHistory.unshift({ name: item.itemName, image: item.image });

      // Limit the history to the most recent 5 items
      if (updatedHistory.length > 5) {
        updatedHistory.pop(); // Remove the oldest item if history exceeds 5 items
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
          <View className="flex-1 justify-start bg-opacity-50">
            <SafeAreaView
              style={{
                flex: 1,
                backgroundColor: "white",
                overflow: "hidden",
              }}
            >
              <View className="bg-white px-4 py-2 flex-1 rounded-none">
                {/* Use the separated SearchHeader component */}
                <Header closeSearchModal={closeSearchModal} />

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
                    <SearchHistory
                      searchHistory={searchHistory}
                      removeSearchItem={removeSearchItem}
                    />

                    <SearchCategories categories={category} />
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
