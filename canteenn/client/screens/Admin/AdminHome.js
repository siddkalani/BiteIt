// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   Platform,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Icon from "react-native-vector-icons/FontAwesome";
// import { useNavigation } from "@react-navigation/native"; 

// const AdminHome = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const navigation = useNavigation();

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const Content = () => (
//     <View style={styles.container}>
//       {/* Sidebar */}
//       <View style={[styles.sidebar, isSidebarOpen && styles.sidebarOpen]}>
//         <TouchableOpacity style={styles.menuIcon} onPress={toggleSidebar}>
//           <Icon name="times" size={24} color="#fff" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.sidebarItem}>
//           <Icon name="home" size={20} color="#fff" />
//           <Text style={styles.sidebarItemText}>Home</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.sidebarItem}>
//           <Icon name="product-hunt" size={20} color="#fff" />
//           <Text style={styles.sidebarItemText}>Products</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.sidebarItem}>
//           <Icon name="file-text-o" size={20} color="#fff" />
//           <Text style={styles.sidebarItemText}>Bills</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Content Area */}
//       <View style={styles.content}>
//         <TouchableOpacity style={styles.menuIcon} onPress={toggleSidebar}>
//           <Icon name="bars" size={24} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>DashBoard</Text>
//         <View style={styles.cardsContainer}>
//           <View style={styles.card}>
//             <Text style={styles.cardText}>Home Content</Text>
//           </View>
//           <View style={styles.card}>
//             <Text style={styles.cardText}>Products Content</Text>
//           </View>
//           <View style={styles.card}>
//             <Text style={styles.cardText}>Bills Content</Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );

//   // Conditionally wrap in SafeAreaView for iOS
//   return Platform.OS === "ios" ? (
//     <SafeAreaView style={styles.safeArea}>
//       <Content />
//     </SafeAreaView>
//   ) : (
//     <Content />
//   );
// };

// export default AdminHome;

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#f8f9fa",
//   },
//   container: {
//     flex: 1,
//     flexDirection: "row",
//     backgroundColor: "#f8f9fa",
//   },
//   sidebar: {
//     width: 250,
//     backgroundColor: "#1E1E2F",
//     paddingTop: 50,
//     paddingHorizontal: 15,
//     height: "100%",
//     position: "absolute",
//     zIndex: 10,
//     transform: [{ translateX: -250 }],
//     transitionProperty: "transform",
//     transitionDuration: "0.3s",
//   },
//   sidebarOpen: {
//     transform: [{ translateX: 0 }],
//   },
//   sidebarItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 15,
//   },
//   sidebarItemText: {
//     color: "#fff",
//     marginLeft: 15,
//     fontSize: 18,
//   },
//   content: {
//     flex: 1,
//     padding: 20,
//   },
//   menuIcon: {
//     marginBottom: 15,
//     display: "none",
//   },
//   headerText: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   cardsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     flexWrap: "wrap",
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     padding: 20,
//     marginBottom: 20,
//     width: "48%",
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//   },
//   cardText: {
//     fontSize: 18,
//   },
// });

// // Responsive CSS for Web
// const screenWidth = Dimensions.get("window").width;

// if (screenWidth > 768) {
//   styles.menuIcon.display = "none"; // Hide menu icon on larger screens
//   styles.sidebar.transform = [{ translateX: 0 }];
//   styles.sidebarOpen.transform = [{ translateX: 0 }];
// }


import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

const AdminHome = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigation = useNavigation(); // Get navigation object

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const Content = () => (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={[styles.sidebar, isSidebarOpen && styles.sidebarOpen]}>
        <TouchableOpacity style={styles.menuIcon} onPress={toggleSidebar}>
          <Icon name="times" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem}>
          <Icon name="home" size={20} color="#fff" />
          <Text style={styles.sidebarItemText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem}>
          <Icon name="product-hunt" size={20} color="#fff" />
          <Text style={styles.sidebarItemText}>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem}>
          <Icon name="file-text-o" size={20} color="#fff" />
          <Text style={styles.sidebarItemText}>Bills</Text>
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      <View style={styles.content}>
        <TouchableOpacity style={styles.menuIcon} onPress={toggleSidebar}>
          <Icon name="bars" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>DashBoard</Text>
        <View style={styles.cardsContainer}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("PendingOrder")} // Navigate to PendingOrder
          >
            <Text style={styles.cardText}>Home Content</Text>
          </TouchableOpacity>
          <View style={styles.card}>
            <Text style={styles.cardText}>Products Content</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>Bills Content</Text>
          </View>
        </View>
      </View>
    </View>
  );

  // Conditionally wrap in SafeAreaView for iOS
  return Platform.OS === "ios" ? (
    <SafeAreaView style={styles.safeArea}>
      <Content />
    </SafeAreaView>
  ) : (
    <Content />
  );
};

export default AdminHome;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
  },
  sidebar: {
    width: 250,
    backgroundColor: "#1E1E2F",
    paddingTop: 50,
    paddingHorizontal: 15,
    height: "100%",
    position: "absolute",
    zIndex: 10,
    transform: [{ translateX: -250 }],
    transitionProperty: "transform",
    transitionDuration: "0.3s",
  },
  sidebarOpen: {
    transform: [{ translateX: 0 }],
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  sidebarItemText: {
    color: "#fff",
    marginLeft: 15,
    fontSize: 18,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  menuIcon: {
    marginBottom: 15,
    display: "none",
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    width: "48%",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardText: {
    fontSize: 18,
  },
});

// Responsive CSS for Web
const screenWidth = Dimensions.get("window").width;

if (screenWidth > 768) {
  styles.menuIcon.display = "none"; // Hide menu icon on larger screens
  styles.sidebar.transform = [{ translateX: 0 }];
  styles.sidebarOpen.transform = [{ translateX: 0 }];
}
