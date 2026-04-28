import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Task = ({title,description,status,priority,dueDate,worksite,assignedTo,}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{description}</Text>
      <Text>Status: {status}</Text>
      <Text>Priority: {priority}</Text>
      <Text>Due Date: {dueDate}</Text>
      <Text>Worksite: {worksite}</Text>
      <Text>Assigned To: {assignedTo}</Text>
    </View>
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
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    marginBottom: 5,
    color: "#333",
  },
});