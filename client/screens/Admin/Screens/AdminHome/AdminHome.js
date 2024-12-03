// AdminHome.js
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
  Switch,
  Platform,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BASE_URL } from "../../../../constants/constant";
import ContentLoader, { Rect } from "react-content-loader/native";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { selectCanteenId } from "../../../../store/Slices/orderServiceSlice";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../../../store/Slices/cartSlice";
import { CommonActions } from "@react-navigation/native";
import { logoutUser } from "../../../../api/userAuth";

// Import Sub-components
import Header from "../../../../components/Admin/Header/HeaderAdmin";
import Tabs from "../../../../components/Admin/Tabs/Tabs";
import SearchBar from "../../../../components/Admin/SearchBar/SearchBar";
import OrderList from "../../../../components/Admin/OrderList/OrderList";
import EmptyState from "../../../../components/Admin/EmptyState/EmptyState";

const socket = io(BASE_URL);

const AdminHome = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { width: screenWidth } = Dimensions.get("window");
  const { top } = useSafeAreaInsets();
  const [isOnline, setIsOnline] = useState(false);
  const canteenId = useSelector(selectCanteenId);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [actionLoading, setActionLoading] = useState({});
  const flatListRef = useRef(null);

  const [orders, setOrders] = useState([]); // Preparing Orders
  const [pendingOrders, setPendingOrders] = useState([]); // Pending Orders
  const [readyOrders, setReadyOrders] = useState([]); // Ready Orders
  const [pickedUpOrders, setPickedUpOrders] = useState([]); // Picked Up Orders
  const [activeTab, setActiveTab] = useState("Pending"); // Active Tab

  const [loading, setLoading] = useState(true); // Loading State
  const [searchQuery, setSearchQuery] = useState(""); // Search Query State


  useEffect(() => {
    const simulateLoading = setTimeout(() => {
      setLoading(false); // Simulate data load
    }, 2000); // Replace with real fetch logic

    return () => clearTimeout(simulateLoading);
  }, []);

  const FullScreenSkeleton = () => (
    <View style={styles.skeletonContainer}>
      {/* Header Skeleton */}
      <ContentLoader
        speed={2}
        width={screenWidth}
        height={60}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <Rect x="10" y="15" rx="4" ry="4" width="150" height="30" />
        <Rect x={screenWidth - 60} y="15" rx="15" ry="15" width="50" height="30" />
      </ContentLoader>

      {/* Tabs Skeleton */}
      <ContentLoader
        speed={2}
        width={screenWidth}
        height={50}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <Rect x="10" y="15" rx="4" ry="4" width="80" height="20" />
        <Rect x="100" y="15" rx="4" ry="4" width="80" height="20" />
        <Rect x="190" y="15" rx="4" ry="4" width="80" height="20" />
        <Rect x="280" y="15" rx="4" ry="4" width="80" height="20" />
      </ContentLoader>

      {/* Search Bar Skeleton */}
      <ContentLoader
        speed={2}
        width={screenWidth}
        height={50}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <Rect x="10" y="10" rx="4" ry="4" width="95%" height="30" />
      </ContentLoader>

      {/* Orders Skeleton */}
      {[1, 2, 3, 4].map((key) => (
        <ContentLoader
          key={key}
          speed={2}
          width={screenWidth}
          height={100}
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          style={{ marginBottom: 10 }}
        >
          <Rect x="10" y="15" rx="4" ry="4" width="90%" height="20" />
          <Rect x="10" y="45" rx="4" ry="4" width="70%" height="20" />
          <Rect x="10" y="75" rx="4" ry="4" width="50%" height="20" />
        </ContentLoader>
      ))}
    </View>
  );

  const handleLogout = async () => {
    await logoutUser(navigation, dispatch, () => { });
  };

  // Fetch Canteen Status
  useEffect(() => {
    const fetchCanteenData = async () => {
      if (!canteenId) {
        Alert.alert("Error", "Canteen ID not available.");
        return;
      }

      try {
        const responseStatus = await fetch(`${BASE_URL}/canteen/${canteenId}/status`);
        if (!responseStatus.ok) {
          throw new Error("Failed to fetch canteen status");
        }

        const dataStatus = await responseStatus.json();
        setIsOnline(dataStatus.isOnline);
      } catch (error) {
        console.error("Failed to fetch canteen data:", error);
      }
    };

    fetchCanteenData();
  }, [canteenId]);


  // Toggle Online Status
  const toggleOnlineStatus = async () => {
    if (!canteenId) return;

    try {
      const currentStatus = isOnline;
      const newStatus = !currentStatus;

      setIsOnline(newStatus);

      const response = await fetch(`${BASE_URL}/canteen/${canteenId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isOnline: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const data = await response.json();
      // Handle response if needed
    } catch (error) {
      console.error("Error updating status:", error);
      setIsOnline(!isOnline); // Revert status if update fails
    }
  };

  // Slides for Promo Banner (if any)
  const slides = [
    {
      title: "Packaging as low as",
      subtitle: "Up to 1500 credits on Hyperpure",
      image: require("../../../../assets/images/admin/storeOpen.png"),
    },
    {
      title: "Packaging as low as",
      subtitle: "Up to 1500 credits on Hyperpure",
      image: require("../../../../assets/images/home/coverFood.png"),
    },
  ];

  // Slide Auto-Scroll
  useEffect(() => {
    const slideTimeout = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearTimeout(slideTimeout);
  }, [currentSlide, slides.length]);

  useEffect(() => {
    flatListRef.current?.scrollToIndex({ index: currentSlide, animated: true });
  }, [currentSlide]);

  const handleMomentumScrollEnd = useCallback(
    (event) => {
      const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
      setCurrentSlide(index);
    },
    [screenWidth]
  );

  // Fetch Orders on Mount
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const adminToken = await AsyncStorage.getItem("userToken");
        console.log(adminToken);
        if (!adminToken) {
          Alert.alert("Error", "Admin is not authenticated");
          setLoading(false);
          return;
        }

        const response = await fetch(`${BASE_URL}/admin/order/all`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch orders");
        }

        const sortedOrders = data.orders.sort(
          (a, b) => new Date(b.orderPlacedAt) - new Date(a.orderPlacedAt)
        );
        setPendingOrders(sortedOrders.filter((order) => order.status === "Pending"));
        setOrders(sortedOrders.filter((order) => order.status === "Preparing"));
        setReadyOrders(sortedOrders.filter((order) => order.status === "Ready"));
        setPickedUpOrders(sortedOrders.filter((order) => order.status === "Delivered"));
      } catch (error) {
        console.error("Error fetching orders:", error);
        Alert.alert("Error", error.message || "Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

    // Listen for new orders
    socket.on("newOrder", (order) => {
      setPendingOrders((prevOrders) => [order, ...prevOrders]);
    });

    return () => {
      socket.off("newOrder");
      socket.disconnect();
    };
  }, []);

  // Listen for payment updates
  useEffect(() => {
    socket.on("paymentDone", (updatedOrder) => {
      setPickedUpOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? { ...order, payment: updatedOrder.payment } : order
        )
      );
    });

    return () => {
      socket.off("paymentDone");
    };
  }, []);

  // Update Order Status
  const updateOrderStatus = async (id, status) => {
    try {
      // Ensure actionLoading is an object and update the loading state for the specific order
      setActionLoading((prev) => ({ ...prev, [id]: true }));

      const adminToken = await AsyncStorage.getItem("userToken");
      if (!adminToken) {
        Alert.alert("Error", "Admin is not authenticated");
        setActionLoading((prev) => ({ ...prev, [id]: false }));
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

      // Handle specific status updates (e.g., moving order between tabs)
      if (status === "Rejected") {
        setPendingOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== id)
        );
      } else if (status === "Preparing") {
        handleAcceptOrder(id);
      } else if (status === "Ready") {
        handleOrderReady(id);
      } else if (status === "Delivered") {
        handlePickedUpOrder(id);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      Alert.alert(
        "Error",
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      // Reset the loading state for the specific order
      setActionLoading((prev) => ({ ...prev, [id]: false }));
    }
  };



  // Handle Accept Order
  const handleAcceptOrder = (orderId) => {
    const order = pendingOrders.find((order) => order._id === orderId);
    if (order) {
      setOrders((prev) =>
        [...prev, order].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
      setPendingOrders((prev) => prev.filter((order) => order._id !== orderId));
    }
  };

  // Handle Reject Order
  const handleRejectOrder = (orderId) => {
    const order = pendingOrders.find((order) => order._id === orderId);
    if (order) {
      setOrders((prev) =>
        [...prev, order].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
      setPendingOrders((prev) => prev.filter((order) => order._id !== orderId));
    }
  };

  // Handle Order Ready
  const handleOrderReady = (orderId) => {
    const order = orders.find((order) => order._id === orderId);
    if (order) {
      setReadyOrders((prev) =>
        [...prev, order].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
    }
  };

  // Handle Picked Up Order
  const handlePickedUpOrder = (orderId) => {
    const order = readyOrders.find((order) => order._id === orderId);
  
    if (order) {
      setPickedUpOrders((prev) => {
        const isDuplicate = prev.some((existingOrder) => existingOrder._id === order._id);
        if (!isDuplicate) {
          // Include deliveredAt if it's set
          const updatedOrder = { ...order, deliveredAt: new Date() };  // Adding deliveredAt time
          const updatedOrders = [updatedOrder, ...prev];
          updatedOrders.sort(
            (a, b) => new Date(b.orderPlacedAt) - new Date(a.orderPlacedAt)
          );
          return updatedOrders;
        }
        return prev;
      });
  
      // Remove from ready orders
      setReadyOrders((prev) => prev.filter((order) => order._id !== orderId));
    }
  };
  

  // Handle Payment Done
  const handlePaymentDone = async (orderId) => {
    try {
      setActionLoading((prev) => ({ ...prev, [orderId]: true }));

      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(`${BASE_URL}/admin/payment/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ payment: 1 }),
      });

      if (response.ok) {
        const data = await response.json();
        setPickedUpOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, payment: 1 } : order
          )
        );
      } else {
        const errorData = await response.json();
        Alert.alert(
          "Error",
          errorData.message || "Failed to update payment status"
        );
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setActionLoading((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  // Filter orders based on search query for the active tab
  const getFilteredOrders = () => {
    const query = searchQuery.trim().toLowerCase();
    if (query === "") {
      return activeTab === "Pending"
        ? pendingOrders
        : activeTab === "Preparing"
          ? orders
          : activeTab === "Ready"
            ? readyOrders
            : pickedUpOrders;
    }

    const filterByQuery = (order) => {
      const orderId = order.orderId?.toString().toLowerCase() || ""; // Safely access and convert to string
      const userName = order.userName?.toLowerCase() || ""; // Safely access and convert to string
      return orderId.includes(query) || userName.includes(query);
    };

    switch (activeTab) {
      case "Pending":
        return pendingOrders.filter(filterByQuery);
      case "Preparing":
        return orders.filter(filterByQuery);
      case "Ready":
        return readyOrders.filter(filterByQuery);
      case "PickedUp":
        return pickedUpOrders.filter(filterByQuery);
      default:
        return [];
    }
  };


  const filteredOrders = getFilteredOrders();

  // console.log(orders)
  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? top : StatusBar.currentHeight,
      }}
      className="bg-white"
    >
      <StatusBar barStyle="dark-content" backgroundColor={"white"} translucent />
      {loading ? (
        <FullScreenSkeleton />
      ) : (

        <View style={styles.container}>
          {/* Header */}
          <Header isOnline={isOnline} toggleOnlineStatus={toggleOnlineStatus} handleLogout={handleLogout} />

          {/* Tabs */}
          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            pendingCount={pendingOrders.length}
            preparingCount={orders.length}
            readyCount={readyOrders.length}
            pickedUpCount={pickedUpOrders.length}
          />

          {/* Search Bar */}
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          {/* Orders List */}

          <OrderList
            loading={loading}
            orders={filteredOrders}
            activeTab={activeTab}
            actionLoading={actionLoading}
            updateOrderStatus={updateOrderStatus}
            handlePaymentDone={handlePaymentDone}
          />

        </View>
      )}
      {/* Footer */}
      {/* <AdminFooter /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
});

export default AdminHome;
