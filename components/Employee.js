import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../styles/global";

const Employee = ({ fullName, email, phone, role }) => {
  const globalStyles = GlobalStyles();

  return (
    <View style={styles.card}>
      <Text style={[styles.title, globalStyles.title]}>{fullName}</Text>
      <Text style={globalStyles.text}>Email: {email}</Text>
      <Text style={globalStyles.text}>Phone: {phone}</Text>
      <Text style={globalStyles.text}>Role: {role}</Text>
    </View>
  );
};

export default Employee;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});