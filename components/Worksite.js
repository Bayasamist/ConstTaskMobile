import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../styles/global";

const Worksite = ({ name, address, suburb, status }) => {
  const globalStyles = GlobalStyles();

  return (
    <View style={styles.card}>
      <Text style={[styles.title, globalStyles.title]}>{name}</Text>
      <Text style={globalStyles.text}>Address: {address}</Text>
      <Text style={globalStyles.text}>Suburb: {suburb}</Text>
      <Text style={globalStyles.text}>Status: {status}</Text>
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
    fontWeight: "bold",
    marginBottom: 5,
  },
});