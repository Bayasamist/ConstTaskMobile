import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { GlobalStyles } from "../styles/global";

const Employee = ({ fullName, email, phone, role, onPress }) => {
  const globalStyles = GlobalStyles();

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Text style={[styles.title, globalStyles.title]}>{fullName}</Text>
        <Text style={globalStyles.text}>Email: {email}</Text>
        <Text style={globalStyles.text}>Phone: {phone}</Text>
        <Text style={globalStyles.text}>Role: {role}</Text>
        <Text style={styles.tapText}>Tap to edit</Text>
      </View>
    </TouchableOpacity>
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
  tapText: {
    marginTop: 8,
    color: "gray",
    fontStyle: "italic",
  },
});