import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Button,
  View,
} from "react-native";
import EditTaskScreen from "./EditTaskScreen";
import { GlobalLayout } from "../components/Layout";
import Task from "../components/Task";
import CreateTaskScreen from "./CreateTaskScreen";
import { getTasks, updateTask } from "../services/api";

export default function TasksScreen({ token }) {
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
const [showEditTask, setShowEditTask] = useState(false);
const [selectedTask, setSelectedTask] = useState(null);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  const [showCreateTask, setShowCreateTask] = useState(false);

  const loadTasks = async () => {
    try {
      setMessage("Loading tasks...");

      const data = await getTasks(token);
      const taskList = data.results || data.tasks || data.docs || data;

      setTasks(taskList);
      setAllTasks(taskList);
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSearch = (event) => {
    const text = event.nativeEvent.text;

    if (text === "") {
      setTasks(allTasks);
      return;
    }

    const results = allTasks.filter((task) =>
      task.title.toLowerCase().includes(text.toLowerCase())
    );

    setTasks(results);
  };
const handleUpdateStatus = async (taskId, status) => {
  try {
    setMessage("Updating task status...");

    await updateTask(token, taskId, {
      status: status,
    });

    await loadTasks();

    setMessage("Task status updated.");
  } catch (error) {
    setMessage(error.message);
  }
};
  if (showCreateTask) {
    return (
      <CreateTaskScreen
        token={token}
        onBack={() => setShowCreateTask(false)}
        onTaskCreated={async () => {
          await loadTasks();
          setShowCreateTask(false);
        }}
      />
    );
  }
if (showEditTask && selectedTask) {
  return (
    <EditTaskScreen
      token={token}
      task={selectedTask}
      onBack={() => {
        setShowEditTask(false);
        setSelectedTask(null);
      }}
      onTaskUpdated={async () => {
        await loadTasks();
        setShowEditTask(false);
        setSelectedTask(null);
      }}
    />
  );
}
  return (
    <GlobalLayout>
      <Text style={styles.heading}>Tasks</Text>

      <View style={styles.topButton}>
        <Button
          title="Create New Task"
          onPress={() => setShowCreateTask(true)}
        />
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search task..."
        returnKeyType="search"
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={handleSearch}
      />

      {message !== "" && <Text style={styles.message}>{message}</Text>}

      <Text style={styles.count}>Tasks loaded: {tasks.length}</Text>

      <FlatList
        style={styles.list}
        data={tasks}
        renderItem={({ item }) => (
          <Task
                title={item.title}
                description={item.description}
                status={item.status}
                priority={item.priority}
                dueDate={item.dueDate ? item.dueDate.slice(0, 10) : ""}
                worksite={item.worksite?.name || "No worksite"}
                assignedTo={
                    item.assignedTo?.fullName ||
                    item.assignedTo?.name ||
                    "Not assigned"
                }
               onPress={() => {
  setSelectedTask(item);
  setShowEditTask(true);
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