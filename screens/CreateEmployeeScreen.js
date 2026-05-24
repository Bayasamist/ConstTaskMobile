import React, { useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  Button,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

import { GlobalLayout } from "../components/Layout";
import { createEmployee } from "../services/api";

function Dropdown({ label, value, options, onSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.dropdownContainer}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity
        style={styles.dropdownBox}
        onPress={() => setOpen(!open)}
      >
        <Text style={styles.dropdownText}>{value || `Select ${label}`}</Text>
        <Text style={styles.dropdownArrow}>▼</Text>
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdownList}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={styles.dropdownItem}
              onPress={() => {
                onSelect(option.value);
                setOpen(false);
              }}
            >
              <Text>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

export default function CreateEmployeeScreen({
  token,
  onBack,
  onEmployeeCreated,
}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("Worker");

  const [message, setMessage] = useState("");

  const positionOptions = [
    { label: "Worker", value: "Worker" },
    { label: "Concrete", value: "Concrete" },
    { label: "Admin", value: "Admin" },
  ];

  const handleCreateEmployee = async () => {
    try {
      if (fullName === "" || email === "" || phone === "" || position === "") {
        setMessage("Please fill in all employee fields.");
        return;
      }

      const nameParts = fullName.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || " ";

      setMessage("Creating employee...");

      await createEmployee(token, {
        firstName: firstName,
        lastName: lastName,
        fullName: fullName,
        email: email,
        phone: phone,
        position: position,
        role: position,
        active: true,
      });

      Alert.alert("Success", "Employee created successfully.");

      if (onEmployeeCreated) {
        onEmployeeCreated();
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <GlobalLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Create Employee</Text>

        <View style={styles.backButton}>
          <Button title="Back to Employees" onPress={onBack} />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Full name"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />

        <Dropdown
          label="Position"
          value={position}
          options={positionOptions}
          onSelect={(value) => setPosition(value)}
        />

        <Button title="Create Employee" onPress={handleCreateEmployee} />

        {message !== "" && <Text style={styles.message}>{message}</Text>}
      </ScrollView>
    </GlobalLayout>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 10,
    textAlign: "center",
  },
  backButton: {
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    height: 38,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 15,
    color: "#333",
    marginBottom: 8,
  },
  dropdownContainer: {
    marginBottom: 8,
  },
  dropdownBox: {
    height: 38,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  dropdownText: {
    fontSize: 15,
    color: "#333",
  },
  dropdownArrow: {
    fontSize: 12,
    color: "#555",
  },
  dropdownList: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 4,
    backgroundColor: "#fff",
  },
  dropdownItem: {
    padding: 10,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  message: {
    marginTop: 10,
    color: "red",
  },
});