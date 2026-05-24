import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Button,
  View,
} from "react-native";

import { GlobalLayout } from "../components/Layout";
import Employee from "../components/Employee";
import CreateEmployeeScreen from "./CreateEmployeeScreen";
import EditEmployeeScreen from "./EditEmployeeScreen";
import { getEmployees } from "../services/api";

export default function EmployeesScreen({ token }) {
  const [employees, setEmployees] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);

  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  const [showCreateEmployee, setShowCreateEmployee] = useState(false);
  const [showEditEmployee, setShowEditEmployee] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const loadEmployees = async () => {
    try {
      setMessage("Loading employees...");

      const data = await getEmployees(token);
      const employeeList = data.results || data.employees || data.docs || data;

      setEmployees(employeeList);
      setAllEmployees(employeeList);
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

 const handleSearch = (event) => {
  const text = event.nativeEvent.text;

  if (text === "") {
    setEmployees(allEmployees);
    return;
  }

  const results = allEmployees.filter((employee) => {
    const name =
      employee.fullName ||
      employee.name ||
      `${employee.firstName || ""} ${employee.lastName || ""}`;

    return name.toLowerCase().includes(text.toLowerCase());
  });

  setEmployees(results);
};

  if (showCreateEmployee) {
    return (
      <CreateEmployeeScreen
        token={token}
        onBack={() => setShowCreateEmployee(false)}
        onEmployeeCreated={async () => {
          await loadEmployees();
          setShowCreateEmployee(false);
        }}
      />
    );
  }

  if (showEditEmployee && selectedEmployee) {
    return (
      <EditEmployeeScreen
        token={token}
        employee={selectedEmployee}
        onBack={() => {
          setShowEditEmployee(false);
          setSelectedEmployee(null);
        }}
        onEmployeeUpdated={async () => {
          await loadEmployees();
          setShowEditEmployee(false);
          setSelectedEmployee(null);
        }}
      />
    );
  }

  return (
    <GlobalLayout>
      <Text style={styles.heading}>Employees</Text>

      <View style={styles.topButton}>
        <Button
          title="Create New Employee"
          onPress={() => setShowCreateEmployee(true)}
        />
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search employee..."
        returnKeyType="search"
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={handleSearch}
      />

      {message !== "" && <Text style={styles.message}>{message}</Text>}

      <Text style={styles.count}>Employees loaded: {employees.length}</Text>

      <FlatList
        style={styles.list}
        data={employees}
        renderItem={({ item }) => (
        <Employee
          fullName={
            item.fullName ||
            item.name ||
            `${item.firstName || ""} ${item.lastName || ""}`
          }
          email={item.email}
          phone={item.phone}
          role={item.position || item.role}
          onPress={() => {
            setSelectedEmployee(item);
            setShowEditEmployee(true);
          }}
        />
        )}
        keyExtractor={(item, index) => item._id || item.id || index.toString()}
      />
    </GlobalLayout>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  topButton: {
    marginBottom: 10,
  },
  searchBar: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  list: {
    flex: 1,
    width: "100%",
  },
  message: {
    marginBottom: 10,
    color: "red",
  },
  count: {
    marginBottom: 10,
    color: "gray",
  },
});