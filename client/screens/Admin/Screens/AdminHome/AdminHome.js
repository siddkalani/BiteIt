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
import { logoutUser } from "../../../../api/userAuth";
import { fetchCanteenStatus,updateCanteenStatus } from "../../../../store/Slices/canteenSlice";
import { updateOrderStatus, fetchOrders } from "../../../../store/Slices/adminAllOrders";

// Import Sub-components
import Header from "../../../../components/Admin/Header/HeaderAdmin";
import Tabs from "../../../../components/Admin/Tabs/Tabs";
import SearchBar from "../../../../components/Admin/SearchBar/SearchBar";
import OrderList from "../../../../components/Admin/OrderList/OrderList";

// const socket = io(BASE_URL);

const AdminHome = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { width: screenWidth } = Dimensions.get("window");
  const { top } = useSafeAreaInsets();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Pending");
  const flatListRef = useRef(null);

  const canteenId = useSelector((state) => state.canteen.id);
  const isOnline = useSelector((state) => state.canteen.isOnline);
  const { pending, preparing, ready, pickedUp } = useSelector(
    (state) => state.allOrders
  );

  const slides = [
    {
      title: "Packaging as low as",
      subtitle: "Up to 1500 credits on Hyperpure",
      image: require("../../../../assets/images/admin/storeOpen.png"),
    },
    {
      title: "Best deals on food",
      subtitle: "Get exclusive credits and discounts",
      image: require("../../../../assets/images/home/coverFood.png"),
    },
  ];

  // Fetch orders and canteen status on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const adminToken = await AsyncStorage.getItem("userToken");
        if (adminToken) dispatch(fetchOrders(adminToken));
        if (canteenId) dispatch(fetchCanteenStatus(canteenId));
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [dispatch, canteenId]);

  // Auto-scroll promo slides
  useEffect(() => {
    const autoScroll = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(autoScroll);
  }, [slides.length]);

  const handleMomentumScrollEnd = useCallback(
    (event) => {
      const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
      setCurrentSlide(index);
    },
    [screenWidth]
  );

  const toggleOnlineStatus = async () => {
    if (!canteenId) return;
    try {
      const newStatus = !isOnline;
      dispatch(updateCanteenStatus(newStatus));

      const response = await fetch(`${BASE_URL}/canteen/${canteenId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isOnline: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update status");
    } catch (error) {
      Alert.alert("Error", "Failed to update status.");
      dispatch(updateCanteenStatus(!isOnline)); // Revert on error
    }
  };

  const getFilteredOrders = () => {
    const query = searchQuery.trim().toLowerCase();

    const filterByQuery = (order) => {
      const orderId = order.orderId?.toLowerCase() || "";
      const userName = order.userName?.toLowerCase() || "";
      return orderId.includes(query) || userName.includes(query);
    };

    let orders = [];
    switch (activeTab) {
      case "Pending":
        orders = pending;
        break;
      case "Preparing":
        orders = preparing;
        break;
      case "Ready":
        orders = ready;
        break;
      case "PickedUp":
        orders = pickedUp;
        break;
      default:
        orders = [];
    }

    return query ? orders.filter(filterByQuery) : orders;
  };

  const filteredOrders = getFilteredOrders();

  const FullScreenSkeleton = () => (
    <View style={styles.skeletonContainer}>
      {/* Skeleton components */}
      <ContentLoader speed={2} width={screenWidth} height={60}>
        <Rect x="10" y="15" rx="4" ry="4" width="150" height="30" />
        <Rect x={screenWidth - 60} y="15" rx="15" ry="15" width="50" height="30" />
      </ContentLoader>
      {/* Add more skeletons as needed */}
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? top : StatusBar.currentHeight,
        backgroundColor: "white",
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" translucent />
      {loading ? (
        <FullScreenSkeleton />
      ) : (
        <View style={styles.container}>
          <Header
            isOnline={isOnline}
            toggleOnlineStatus={toggleOnlineStatus}
            handleLogout={() => navigation.navigate("Login")}
          />
          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            pendingCount={pending.length}
            preparingCount={preparing.length}
            readyCount={ready.length}
            pickedUpCount={pickedUp.length}
          />
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
          <OrderList
            orders={filteredOrders}
            activeTab={activeTab}
            updateOrderStatus={(id, status) => dispatch(updateOrderStatus(id, status))}

          />
        </View>
      )}
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
