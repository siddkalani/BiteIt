// import React, { useState, useEffect } from "react";
// import { View, Text, FlatList, TouchableOpacity, Image, Alert } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { BASE_URL } from "@env";
// import * as Icon from "react-native-feather";
// import io from "socket.io-client";

// const PendingOrders = () => {
//   const [pendingOrders, setPendingOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const socket = io(BASE_URL);
  
//     const fetchPendingOrders = async () => {
//       try {
//         const adminToken = await AsyncStorage.getItem("adminToken");
//         if (!adminToken) {
//           Alert.alert("Error", "Admin is not authenticated");
//           return;
//         }
  
//         const response = await fetch(`${BASE_URL}/admin/order/pending`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${adminToken}`,
//           },
//         });
  
//         const data = await response.json();
//         if (!response.ok) {
//           throw new Error(data.message || "Failed to fetch pending orders");
//         }
  
//         const sortedOrders = data.orders.sort(
//           (a, b) => new Date(b.orderPlacedAt) - new Date(a.orderPlacedAt)
//         );
  
//         setPendingOrders(sortedOrders);
//       } catch (error) {
//         console.error("Error fetching pending orders:", error);
//         Alert.alert("Error", error.message || "Something went wrong. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchPendingOrders();
  
//     socket.on("newOrder", (order) => {
//       console.log("New order received:", order);
//       setPendingOrders((prevOrders) => [order, ...prevOrders]);
//     });
  
//     const interval = setInterval(fetchPendingOrders, 10000);
  
//     return () => {
//       clearInterval(interval);
//       socket.off("newOrder");
//       socket.disconnect();
//     };
//   }, [BASE_URL]);
  
//   const renderOrderItem = ({ item }) => {
//     const orderDate = new Date(item.orderPlacedAt);
//     const formattedDate = orderDate.toLocaleDateString();
//     const formattedTime = orderDate.toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//     return (
//       <View className="flex-row items-center space-x-2 py-2 px-4 bg-white rounded-lg mb-2">
//         <Image
//           source={{ uri: `${BASE_URL}/items_uploads/${item.itemId}.jpg` }}
//           style={{ width: 60, height: 60, borderRadius: 8 }}
//         />
//         <View className="flex-1">
//           <Text className="font-semibold text-lg">{item.itemName}</Text>
//           <Text className="text-gray-500">Quantity: {item.itemQuantity}</Text>
//           <Text className="text-gray-500">Total: ${item.totalAmount}</Text>
//           <Text className="text-gray-500">Canteen: {item.canteenName}</Text>
//           <Text className="text-gray-500">
//             Ordered On: {formattedDate} at {formattedTime}
//           </Text>
//         </View>
//       </View>
//     );
//   };

//   if (loading) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <SafeAreaView className="flex-1 bg-gray-100 p-4">
//       {/* Back Button */}
//       <View className="flex-row items-center mb-4">
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           className="p-2 bg-gray-200 rounded-full"
//         >
//           <Icon.ChevronLeft width={24} height={24} stroke="black" />
//         </TouchableOpacity>
//         <Text className="ml-4 text-lg font-semibold">Pending Orders</Text>
//       </View>

//       {pendingOrders.length === 0 ? (
//         <Text className="text-center text-lg font-semibold">
//           No pending orders found
//         </Text>
//       ) : (
//         <FlatList
//           data={pendingOrders}
//           keyExtractor={(item) => item._id}
//           renderItem={renderOrderItem}
//         />
//       )}
//     </SafeAreaView>
//   );
// };

// export default PendingOrders;


import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, Alert, Platform, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { BASE_URL } from "@env";
import * as Icon from "react-native-feather";
import io from "socket.io-client";
import * as Notifications from "expo-notifications";

const PendingOrders = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;

  useEffect(() => {
    const socket = io(BASE_URL);

    const fetchPendingOrders = async () => {
      try {
        const adminToken = await AsyncStorage.getItem("adminToken");
        if (!adminToken) {
          Alert.alert("Error", "Admin is not authenticated");
          return;
        }

        const response = await fetch(`${BASE_URL}/admin/order/pending`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch pending orders");
        }

        const sortedOrders = data.orders.sort(
          (a, b) => new Date(b.orderPlacedAt) - new Date(a.orderPlacedAt)
        );

        setPendingOrders(sortedOrders);
      } catch (error) {
        console.error("Error fetching pending orders:", error);
        Alert.alert("Error", error.message || "Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingOrders();

    socket.on("newOrder", (order) => {
      console.log("New order received:", order);
      setPendingOrders((prevOrders) => [order, ...prevOrders]);
    });

    const interval = setInterval(fetchPendingOrders, 10000);

    return () => {
      clearInterval(interval);
      socket.off("newOrder");
      socket.disconnect();
    };
  }, []);

  const updateOrderStatus = async (id, status) => {
    try {
      const adminToken = await AsyncStorage.getItem("adminToken");
      if (!adminToken) {
        Alert.alert("Error", "Admin is not authenticated");
        return;
      }

      const response = await fetch(`${BASE_URL}/admin/order/status/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update order status");
      }

      Alert.alert("Success", `Order status updated to ${status}`);
      setPendingOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
      Alert.alert("Error", error.message || "Something went wrong. Please try again.");
    }
  };

  const renderOrderItem = ({ item }) => {
    const orderDate = new Date(item.orderPlacedAt);
    const formattedDate = orderDate.toLocaleDateString();
    const formattedTime = orderDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <View style={styles.orderContainer}>
        <Image
          source={{ uri: `${BASE_URL}/items_uploads/${item.itemId}.jpg` }}
          style={styles.itemImage}
        />
        <View style={styles.orderDetails}>
          <Text style={styles.itemName}>{item.itemName}</Text>
          <Text style={styles.itemText}>Quantity: {item.itemQuantity}</Text>
          <Text style={styles.itemText}>Total: ${item.totalAmount}</Text>
          <Text style={styles.itemText}>Canteen: {item.canteenName}</Text>
          <Text style={styles.itemText}>
            Ordered On: {formattedDate} at {formattedTime}
          </Text>
          <View style={styles.buttonContainer}>
            {["Accepted", "Rejected", "Preparing", "Ready", "Delivered"].map(
              (status) => (
                <TouchableOpacity
                  key={status}
                  onPress={() => updateOrderStatus(item._id, status)}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>{status}</Text>
                </TouchableOpacity>
              )
            )}
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon.ChevronLeft width={24} height={24} stroke="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pending Orders</Text>
      </View>

      {pendingOrders.length === 0 ? (
        <Text style={styles.noOrdersText}>No pending orders found</Text>
      ) : (
        <FlatList
          data={pendingOrders}
          keyExtractor={(item) => item._id}
          renderItem={renderOrderItem}
          contentContainerStyle={styles.flatList}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 50,
  },
  headerTitle: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: "bold",
  },
  orderContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  orderDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
  },
  itemText: {
    color: "#6c757d",
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 14,
  },
  loadingText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
  noOrdersText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
  },
  flatList: {
    paddingBottom: 20,
  },
});

export default PendingOrders;

