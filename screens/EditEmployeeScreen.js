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
  Image,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import { GlobalLayout } from "../components/Layout";
import { updateEmployee, deleteEmployee } from "../services/api";

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

export default function EditEmployeeScreen({
  token,
  employee,
  onBack,
  onEmployeeUpdated,
}) {
  const [fullName, setFullName] = useState(
    employee.fullName || employee.name || ""
  );
  const [email, setEmail] = useState(employee.email || "");
  const [phone, setPhone] = useState(employee.phone || "");
  const [position, setPosition] = useState(
    employee.position || employee.role || "Worker"
  );
  const [imageUrl, setImageUrl] = useState(employee.imageUrl || "");

  const [message, setMessage] = useState("");

  const positionOptions = [
    { label: "Worker", value: "Worker" },
    { label: "Concrete", value: "Concrete" },
    { label: "Admin", value: "Admin" },
  ];

  const handlePickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      setMessage("Permission is required to choose an image.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUrl(result.assets[0].uri);
    }
  };

  const handleUpdateEmployee = async () => {
    try {
      if (fullName === "" || email === "" || phone === "" || position === "") {
        setMessage("Please fill in all employee fields.");
        return;
      }

      const nameParts = fullName.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || " ";

      setMessage("Updating employee...");

      await updateEmployee(token, employee._id || employee.id, {
        firstName: firstName,
        lastName: lastName,
        fullName: fullName,
        email: email,
        phone: phone,
        position: position,
        role: position,
        active: true,
        imageUrl: imageUrl,
      });

      Alert.alert("Success", "Employee updated successfully.");

      if (onEmployeeUpdated) {
        onEmployeeUpdated();
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleDeleteEmployee = () => {
    Alert.alert(
      "Delete Employee",
      "Are you sure you want to delete this employee?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setMessage("Deleting employee...");

              await deleteEmployee(token, employee._id || employee.id);

              if (onEmployeeUpdated) {
                onEmployeeUpdated();
              }
            } catch (error) {
              setMessage(error.message);
            }
          },
        },
      ]
    );
  };

  return (
    <GlobalLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Edit Employee</Text>

        <View style={styles.backButton}>
          <Button title="Back to Employees" onPress={onBack} />
        </View>

       {imageUrl ? (
  <Image source={{ uri: imageUrl }} style={styles.profileImage} />
) : (
  <View style={styles.imagePlaceholder}>
    <Text>No Image</Text>
  </View>
)}

<View style={styles.button}>
  <Button title="Choose Profile Picture" onPress={handlePickImage} />
</View>

<TextInput
  style={styles.input}
  placeholder="Image URL"
  value={imageUrl}
  onChangeText={(text) => setImageUrl(text)}
  autoCapitalize="none"
/>

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

        <View style={styles.button}>
          <Button title="Update Employee" onPress={handleUpdateEmployee} />
        </View>

        <View style={styles.button}>
          <Button
            title="Delete Employee"
            onPress={handleDeleteEmployee}
            color="red"
          />
        </View>

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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 10,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 10,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
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
  button: {
    marginTop: 8,
    marginBottom: 8,
  },
  message: {
    marginTop: 10,
    color: "red",
  },
});