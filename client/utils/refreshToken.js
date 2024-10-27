// services/axiosInstance.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("401 error detected, attempting token refresh...");

      const newToken = await refreshAccessToken();
      if (newToken) {
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

const refreshAccessToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem("userRefreshToken");
    if (!refreshToken) throw new Error("No refresh token found");

    const response = await axios.post(`${BASE_URL}/user/refresh-token`, { refreshToken });
    const { accessToken } = response.data;

    await AsyncStorage.setItem("userToken", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    await handleLogout(); // Clear session if refresh fails
  }
};

const handleLogout = async () => {
  await AsyncStorage.removeItem("userToken");
  await AsyncStorage.removeItem("userRefreshToken");

};

export { axiosInstance, handleLogout };
