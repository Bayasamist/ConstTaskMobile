import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { GlobalStyles } from "../styles/global";

const Worksite = ({ name, address, suburb, status, onPress }) => {
  const globalStyles = GlobalStyles();

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Text style={[styles.title, globalStyles.title]}>{name}</Text>
        <Text style={globalStyles.text}>Address: {address}</Text>
        <Text style={globalStyles.text}>Suburb: {suburb}</Text>
        <Text style={globalStyles.text}>Status: {status}</Text>
        <Text style={styles.tapText}>Tap to edit</Text>
      </View>
    </TouchableOpacity>
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
    fontWeight: "bold",
    marginBottom: 5,
  },
  tapText: {
    marginTop: 8,
    color: "gray",
    fontStyle: "italic",
  },
});