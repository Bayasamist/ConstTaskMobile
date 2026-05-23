import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { GlobalStyles } from "../styles/global";

const Task = ({
  title,
  description,
  status,
  priority,
  dueDate,
  worksite,
  assignedTo,
  onPress,
}) => {
  const globalStyles = GlobalStyles();

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Text style={[styles.title, globalStyles.title]}>{title}</Text>
        <Text style={globalStyles.text}>{description}</Text>
        <Text style={globalStyles.text}>Status: {status}</Text>
        <Text style={globalStyles.text}>Priority: {priority}</Text>
        <Text style={globalStyles.text}>Due Date: {dueDate}</Text>
        <Text style={globalStyles.text}>Worksite: {worksite}</Text>
        <Text style={globalStyles.text}>Assigned To: {assignedTo}</Text>
        <Text style={styles.tapText}>Tap to edit</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Task;

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