import React from "react";
import { Text, View, Pressable, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { FontFamily, FontSize } from "../../GlobalStyles";

WebBrowser.maybeCompleteAuthSession();

const FacultyLogin = () => {
  const navigation = useNavigation();
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '908599769443-pc2g0ipv4mqbuj5luio3d3ltdvcebnrm.apps.googleusercontent.com',
    redirectUri: 'https://canteenApp.expoapp.com/__/auth/handler', // Update with your values
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      // Handle authentication (e.g., store token, navigate, etc.)
      Alert.alert("Success", "Logged in with Google!");
      navigation.navigate("FacultyHome"); // Navigate to the next page
    } else if (response?.type === "error") {
      Alert.alert("Error", "Login failed. Please try again.");
    }
  }, [response]);

  const handleGoogleLogin = () => {
    promptAsync();
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: FontFamily.poppinsBold,
          fontSize: FontSize.size_lg,
          marginBottom: 20,
        }}
      >
        Faculty Login
      </Text>

      <Pressable
        style={[styles.googleButton, { opacity: request ? 1 : 0.5 }]}
        onPress={handleGoogleLogin}
        disabled={!request}
      >
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F5F9",
  },
  googleButton: {
    backgroundColor: "#4285F4",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  googleButtonText: {
    color: "white",
    fontFamily: FontFamily.poppinsSemiBold,
    fontSize: FontSize.size_lg,
  },
});

export default FacultyLogin;
