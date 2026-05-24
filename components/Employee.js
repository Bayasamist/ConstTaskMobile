import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { GlobalStyles } from "../styles/global";

const Employee = ({ fullName, email, phone, role, imageUrl, onPress }) => {
  const globalStyles = GlobalStyles();

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}

        <Text style={[styles.title, globalStyles.title]}>{fullName}</Text>
        <Text style={globalStyles.text}>Email: {email}</Text>
        <Text style={globalStyles.text}>Phone: {phone}</Text>
        <Text style={globalStyles.text}>Position: {role}</Text>
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
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    alignSelf: "center",
  },
  placeholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    alignSelf: "center",
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 12,
    color: "#555",
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