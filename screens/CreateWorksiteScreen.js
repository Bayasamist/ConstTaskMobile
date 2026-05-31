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
import { createWorksite } from "../services/api";

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

export default function CreateWorksiteScreen({
  token,
  onBack,
  onWorksiteCreated,
}) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [suburb, setSuburb] = useState("");
  const [status, setStatus] = useState("active");

  const [message, setMessage] = useState("");

  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Completed", value: "completed" },
  ];

  const handleCreateWorksite = async () => {
    try {
      if (name === "" || address === "" || suburb === "" || status === "") {
        setMessage("Please fill in all worksite fields.");
        return;
      }

      setMessage("Creating worksite...");

      await createWorksite(token, {
        name: name,
        address: address,
        suburb: suburb,
        status: status,
      });

      Alert.alert("Success", "Task created successfully.");

      if (onWorksiteCreated) {
        onWorksiteCreated();
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <GlobalLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Create Worksite</Text>

        <View style={styles.backButton}>
          <Button title="Back to Worksites" onPress={onBack} />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Worksite name"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Suburb"
          value={suburb}
          onChangeText={(text) => setSuburb(text)}
        />

        <Dropdown
          label="Status"
          value={status}
          options={statusOptions}
          onSelect={(value) => setStatus(value)}
        />

        <Button title="Create Worksite" onPress={handleCreateWorksite} />

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