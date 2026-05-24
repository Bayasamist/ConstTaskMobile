import React, { useState, useEffect } from "react";
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

import DateTimePicker from "@react-native-community/datetimepicker";

import { GlobalLayout } from "../components/Layout";
import {
  updateTask,
  deleteTask,
  getEmployees,
  getWorksites,
} from "../services/api";

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

export default function EditTaskScreen({ token, task, onBack, onTaskUpdated }) {
  const [employees, setEmployees] = useState([]);
  const [worksites, setWorksites] = useState([]);

  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState(task.priority || "medium");
  const [status, setStatus] = useState(task.status || "pending");

  const [employeeId, setEmployeeId] = useState(
    task.assignedTo?._id || task.assignedTo || ""
  );
  const [employeeName, setEmployeeName] = useState(
    task.assignedTo?.fullName || task.assignedTo?.name || "Select Employee"
  );

  const [worksiteId, setWorksiteId] = useState(
    task.worksite?._id || task.worksite || ""
  );
  const [worksiteName, setWorksiteName] = useState(
    task.worksite?.name || "Select Worksite"
  );

  const [dueDate, setDueDate] = useState(
    task.dueDate ? new Date(task.dueDate) : new Date()
  );
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

  const handleUpdateTask = async () => {
    try {
      if (
        title === "" ||
        description === "" ||
        priority === "" ||
        status === "" ||
        employeeId === "" ||
        worksiteId === ""
      ) {
        setMessage("Please fill in all task fields.");
        return;
      }

      setMessage("Updating task...");

      await updateTask(token, task._id || task.id, {
        title: title,
        description: description,
        status: status,
        priority: priority,
        dueDate: dueDate.toISOString(),
        assignedTo: employeeId,
        worksite: worksiteId,
      });

      Alert.alert("Success", "task updated successfully.");

      if (onTaskUpdated) {
        onTaskUpdated();
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleDeleteTask = () => {
  Alert.alert(
    "Delete Task",
    "Are you sure you want to delete this task?",
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
            setMessage("Deleting task...");

            await deleteTask(token, task._id || task.id);

            if (onTaskUpdated) {
              onTaskUpdated();
            }
          } catch (error) {
            setMessage(error.message);
          }
        },
      },
    ]
  );
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

  const statusOptions = [
    { label: "Pending", value: "pending" },
    { label: "In Progress", value: "in-progress" },
    { label: "Completed", value: "completed" },
  ];

  return (
    <GlobalLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Edit Task</Text>

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
          label="Status"
          value={status}
          options={statusOptions}
          onSelect={(option) => setStatus(option.value)}
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
          <Button title="Update Task" onPress={handleUpdateTask} />
        </View>

        <View style={styles.deleteButton}>
          <Button title="Delete Task" onPress={handleDeleteTask} color="red" />
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
  deleteButton: {
    marginTop: 5,
    marginBottom: 10,
  },
  message: {
    marginTop: 8,
    marginBottom: 10,
    color: "red",
  },
});