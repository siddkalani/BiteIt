import React, { useState, useEffect } from "react";
import { Text, View, Pressable, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { FontFamily, FontSize } from "../../GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constant";

WebBrowser.maybeCompleteAuthSession();

const FacultyLogin = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "719859135966-8gls5oiqt6hkavhqr7jugf6tl33osbgr.apps.googleusercontent.com",
    iosClientId: "719859135966-5sitmd20k7rl8e453b3l9p8s7fop58le.apps.googleusercontent.com",
    webClientId: "719859135966-1mhgra987t2htp3g7brnuatu65q45gnh.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleGoogleLogin();
  }, [response]);

  async function handleGoogleLogin() {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === "success") {
        await getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);

      // Send email to backend for validation
      await validateUser(user.email);
      
    } catch (error) {
      console.error("Error fetching user info: ", error);
    }
  };

  const validateUser = async (email) => {
    try {
      const response = await fetch(`${BASE_URL}/faculty/login`, { // Replace with your backend URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();

  
      if (data && data.message === "Login successful") {
        await AsyncStorage.setItem("userId", data.facultyId);
        await AsyncStorage.setItem("userToken", data.token);

        await AsyncStorage.removeItem("@user");
        
        navigation.navigate("ClientTabs");
      } else if (data && data.message) {
        Alert.alert("Error", data.message);
      } else {
        Alert.alert("Error", "An unexpected error occurred.");
      }
    } catch (error) {
      console.error("Error validating user: ", error);
      Alert.alert("Error", "There was a problem logging in. Please try again.");
    }
  };
  
  return (
    <View style={styles.container}>
      <Text> {JSON.stringify(userInfo, null, 2)}</Text>
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
        onPress={() => promptAsync()}
        disabled={!request}
      >
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </Pressable>
      <Pressable
        style={[styles.googleButton, { opacity: request ? 1 : 0.5 }]}
        onPress={() => AsyncStorage.removeItem("@user")}
      >
        <Text style={styles.googleButtonText}>Delete Local Storage</Text>
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





// import React, { useState, useEffect } from "react";
// import { Text, View, Pressable, Alert, StyleSheet } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import * as Google from "expo-auth-session/providers/google";
// import * as WebBrowser from "expo-web-browser";
// import { FontFamily, FontSize } from "../../GlobalStyles";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// WebBrowser.maybeCompleteAuthSession();

// const FacultyLogin = () => {
//   const navigation = useNavigation();
//   const [userInfo,setUserInfo] = useState()
  

//   const [request, response, promptAsync] = Google.useAuthRequest({
//    androidClientId: "719859135966-8gls5oiqt6hkavhqr7jugf6tl33osbgr.apps.googleusercontent.com",
//    iosClientId:"719859135966-5sitmd20k7rl8e453b3l9p8s7fop58le.apps.googleusercontent.com",
//    webClientId: "719859135966-1mhgra987t2htp3g7brnuatu65q45gnh.apps.googleusercontent.com"


//   });

// useEffect(() => {
//        handleGoogleLogin()
//       }, [response]);

//   async function handleGoogleLogin() {
//     const user = await AsyncStorage.getItem("@user")
//     if(!user){
//       if(response?.type === "success"){
//         await getUserInfo(response.authentication.accessToken)
//         console.log("Access Token:", accessToken); 
//       }

//     }else{
//       setUserInfo(JSON.parse(user))
//       console.log(userInfo)
//     }

//   };

//   const getUserInfo = async(token) =>{
//     if(!token) return
//     try{
//       const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
//         headers: { Authorization: `Bearer ${token}` },

//       });
      
// const user = await response.json()
// await AsyncStorage.setItem("@user", JSON.stringify(user))
// setUserInfo(user)
// console.log(userInfo)
// // navigation.navigate("Home");
//     }catch(error){

//     }
//   }
//   console.log(userInfo)

//   return (
//     <View style={styles.container}>
//       <Text> {JSON.stringify(userInfo, null, 2)}</Text>
//       <Text
//         style={{
//           fontFamily: FontFamily.poppinsBold,
//           fontSize: FontSize.size_lg,
//           marginBottom: 20,
//         }}
//       >
//         Faculty Login
//       </Text>

//       <Pressable
//         style={[styles.googleButton, { opacity: request ? 1 : 0.5 }]}
//         onPress={()=>promptAsync()}
//         disabled={!request}
//       >
//         <Text style={styles.googleButtonText}>Sign in with Google</Text>
//       </Pressable>
//       <Pressable
//         style={[styles.googleButton, { opacity: request ? 1 : 0.5 }]}
//         onPress={() => AsyncStorage.removeItem("@user")}
//       >
//         <Text style={styles.googleButtonText}>Delete Local Storage</Text>
//       </Pressable>
      
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F4F5F9",
//   },
//   googleButton: {
//     backgroundColor: "#4285F4",
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   googleButtonText: {
//     color: "white",
//     fontFamily: FontFamily.poppinsSemiBold,
//     fontSize: FontSize.size_lg,
//   },
// });

// export default FacultyLogin;
