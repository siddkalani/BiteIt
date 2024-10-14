import React from "react";
import { View } from "react-native";
import AdminFooter from "./AdminFooter";
import { useNavigation } from "@react-navigation/native";

const AdminLayout = ({ children }) => {
  return (
    <View style={{ flex: 1 }}>
      {children}
    </View>
  );
};

export default AdminLayout;
