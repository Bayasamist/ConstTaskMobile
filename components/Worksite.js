import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Worksite = ({ name, address, suburb, status }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{name}</Text>
      <Text>Address: {address}</Text>
      <Text>Suburb: {suburb}</Text>
      <Text>Status: {status}</Text>
    </View>
  );
};

export default Worksite;

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