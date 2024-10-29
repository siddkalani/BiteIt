// axiosConfig.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { BASE_URL } from '../constants/constant';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Adjust if needed
});

// Logout Function
const handleLogout = async () => {
  console.log("Logging out user...");
  await AsyncStorage.removeItem("userToken");
  await AsyncStorage.removeItem("userRefreshToken");
  Alert.alert("Session Expired", "Please log in again."); // Inform user of session expiry
};

// Refresh Access Token
const refreshAccessToken = async () => {
  try {
    console.log("Attempting to refresh access token...");
    const refreshToken = await AsyncStorage.getItem("userRefreshToken");

    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const response = await axios.post(`${BASE_URL}/user/refresh-token`, null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const { accessToken } = response.data;
    await AsyncStorage.setItem("userToken", accessToken);
    console.log("Access token refreshed successfully.");
    return accessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    await handleLogout(); // Remove tokens on error
    return null;
  }
};

// Request Interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshAccessToken();
      if (newToken) {
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest); // Retry the request with new token
      } else {
        await handleLogout();
      }
    }
    return Promise.reject(error);
  }
);

export { axiosInstance, handleLogout };
