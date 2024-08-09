import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

const AdminHome = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>Admin Home</Text>
      </View>
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
