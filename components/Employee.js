import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Employee = ({ fullName, email, phone, role }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{fullName}</Text>
      <Text>Email: {email}</Text>
      <Text>Phone: {phone}</Text>
      <Text>Role: {role}</Text>
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
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});