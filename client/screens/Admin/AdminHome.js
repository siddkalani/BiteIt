import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

const AdminHome = () => {
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: "SignIn" }],
            });
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>Admin Home</Text>
      </View>
      <TouchableOpacity onPress={handleLogout} className="items-center p-2  rounded-lg" >
                <Icon.Home width={24} height={24} stroke="black" />
                {/* <Text className="mt-1 text-sm text-gray-700">Home</Text> */}
            </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Background color, adjust as needed
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24, // Adjust font size as needed
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AdminHome;
