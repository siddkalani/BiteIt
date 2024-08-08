// import { KeyboardAvoidingView, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
// import React from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import * as Icon from "react-native-feather";

// const MyModal = () => {
//     const openSearchModal = () => {
//         setIsModalVisible(true);
//       };
    
//       const closeSearchModal = () => {
//         setIsModalVisible(false);
//       };
    
//     return (
//         <Modal
//             visible={isModalVisible}
//             animationType="slide"
//             transparent={true}
//             onRequestClose={closeSearchModal}
//         >
//             <KeyboardAvoidingView
//                 style={{ flex: 1 }}
//                 behavior={Platform.OS === "ios" ? "padding" : "height"}
//             >
//                 <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//                     <View className="flex-1 justify-start bg-black bg-opacity-50">
//                         <SafeAreaView
//                             style={{
//                                 flex: 1,
//                                 backgroundColor: "white",
//                                 overflow: "hidden",
//                             }}
//                         >
//                             <View className="bg-white px-4 py-2 flex-1 rounded-none">
//                                 <View className="flex-row justify-between items-center">
//                                     <Text
//                                         style={{
//                                             fontFamily: FontFamily.poppinsMedium,
//                                             fontSize: FontSize.size_lg,
//                                         }}
//                                     >
//                                         Search
//                                     </Text>
//                                     <TouchableOpacity onPress={closeSearchModal}>
//                                         <Icon.X width={24} height={24} stroke="black" />
//                                     </TouchableOpacity>
//                                 </View>
//                                 <View className="flex-row bg-[#F4F5F9] items-center p-2 rounded-lg mt-4">
//                                     <Icon.Search height="20" width="20" stroke="gray" />
//                                     <TextInput
//                                         placeholder="What are you craving?"
//                                         className="flex-1 ml-2"
//                                         autoFocus
//                                     />
//                                 </View>
//                                 <View className="mt-4">
//                                     <Text
//                                         style={{
//                                             fontFamily: FontFamily.poppinsSemiBold,
//                                             fontSize: FontSize.size_md,
//                                         }}
//                                     >
//                                         Recent Searches
//                                     </Text>
//                                 </View>
//                             </View>
//                         </SafeAreaView>
//                     </View>
//                 </TouchableWithoutFeedback>
//             </KeyboardAvoidingView>
//         </Modal>
//     )
// }

// export default MyModal

