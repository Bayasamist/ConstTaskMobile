import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  Button,
  View,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import { GlobalLayout } from "../components/Layout";
import { createTask, getEmployees, getWorksites } from "../services/api";

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
                onSelect(option);
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

export default function CreateTaskScreen({ token, onBack, onTaskCreated }) {
  const [employees, setEmployees] = useState([]);
  const [worksites, setWorksites] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [priority, setPriority] = useState("medium");

  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");

  const [worksiteId, setWorksiteId] = useState("");
  const [worksiteName, setWorksiteName] = useState("");

  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [message, setMessage] = useState("");

  const loadFormData = async () => {
    try {
      const employeeData = await getEmployees(token);
      const worksiteData = await getWorksites(token);

      const employeeList =
        employeeData.results ||
        employeeData.employees ||
        employeeData.docs ||
        employeeData;

      const worksiteList =
        worksiteData.results ||
        worksiteData.worksites ||
        worksiteData.docs ||
        worksiteData;

      setEmployees(employeeList);
      setWorksites(worksiteList);

      if (employeeList.length > 0) {
        setEmployeeId(employeeList[0]._id || employeeList[0].id);
        setEmployeeName(
          employeeList[0].fullName || employeeList[0].name || "Unnamed employee"
        );
      }

      if (worksiteList.length > 0) {
        setWorksiteId(worksiteList[0]._id || worksiteList[0].id);
        setWorksiteName(worksiteList[0].name || "Unnamed worksite");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    loadFormData();
  }, []);

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  const handleCreateTask = async () => {
    try {
      if (
        title === "" ||
        description === "" ||
        priority === "" ||
        employeeId === "" ||
        worksiteId === ""
      ) {
        setMessage("Please fill in all task fields.");
        return;
      }

      setMessage("Creating task...");

   await createTask(token, {
        title: title,
        description: description,
        status: "pending",
        priority: priority,
        dueDate: dueDate.toISOString(),
        assignedTo: employeeId,
        worksite: worksiteId,
        employeeResponse: "pending",
        });
      setMessage("Task created successfully.");

      if (onTaskCreated) {
        onTaskCreated();
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const employeeOptions = employees.map((employee) => ({
    label: employee.fullName || employee.name || "Unnamed employee",
    value: employee._id || employee.id,
  }));

  const worksiteOptions = worksites.map((worksite) => ({
    label: worksite.name || "Unnamed worksite",
    value: worksite._id || worksite.id,
  }));

 const priorityOptions = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

  return (
    <GlobalLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Create Task</Text>

        <View style={styles.backButton}>
          <Button title="Back to Tasks" onPress={onBack} />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Task title"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />

        <Dropdown
          label="Priority"
          value={priority}
          options={priorityOptions}
          onSelect={(option) => setPriority(option.value)}
        />

        <Dropdown
          label="Employee"
          value={employeeName}
          options={employeeOptions}
          onSelect={(option) => {
            setEmployeeId(option.value);
            setEmployeeName(option.label);
          }}
        />

        <Dropdown
          label="Worksite"
          value={worksiteName}
          options={worksiteOptions}
          onSelect={(option) => {
            setWorksiteId(option.value);
            setWorksiteName(option.label);
          }}
        />

        <Text style={styles.label}>Due Date</Text>

        <TouchableOpacity
          style={styles.dateBox}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{dueDate.toISOString().slice(0, 10)}</Text>
          <Text>📅</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={dueDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <View style={styles.createButton}>
          <Button title="Create Task" onPress={handleCreateTask} />
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
  dateBox: {
    height: 38,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  createButton: {
    marginTop: 10,
    marginBottom: 10,
  },
  message: {
    marginTop: 8,
    marginBottom: 10,
    color: "red",
  },
});