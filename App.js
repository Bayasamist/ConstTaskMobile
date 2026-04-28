import React, { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, Button,} from "react-native";
import { SafeAreaProvider, SafeAreaView,} from "react-native-safe-area-context";

import Task from "./components/Task";
import Employee from "./components/Employee";
import Worksite from "./components/Worksite";

import { loginUser,getTasks, getEmployees, getWorksites,} from "./services/api";

const App = () => {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  const [screen, setScreen] = useState("tasks");

  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);

  const [employees, setEmployees] = useState([]);
  const [worksites, setWorksites] = useState([]);

  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      setMessage("Logging in...");

      const loginData = await loginUser(username, password);

      const authToken = loginData.authToken || loginData.token;

      if (!authToken) {
        throw new Error("Login worked but token was not returned.");
      }

      setToken(authToken);

      setMessage("Loading tasks...");

      const data = await getTasks(authToken);
      const taskList = data.results || data.tasks || data.docs || data;

      setTasks(taskList);
      setAllTasks(taskList);
      setScreen("tasks");
      setLoggedIn(true);
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const loadTasks = async () => {
    try {
      setMessage("Loading tasks...");

      const data = await getTasks(token);
      const taskList = data.results || data.tasks || data.docs || data;

      setTasks(taskList);
      setAllTasks(taskList);
      setScreen("tasks");
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const loadEmployees = async () => {
    try {
      setMessage("Loading employees...");

      const data = await getEmployees(token);
      const employeeList = data.results || data.employees || data.docs || data;

      setEmployees(employeeList);
      setScreen("employees");
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const loadWorksites = async () => {
    try {
      setMessage("Loading worksites...");

      const data = await getWorksites(token);
      const worksiteList = data.results || data.worksites || data.docs || data;

      setWorksites(worksiteList);
      setScreen("worksites");
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    }
  };

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

  const handleLogout = () => {
    setToken("");
    setLoggedIn(false);
    setScreen("tasks");

    setTasks([]);
    setAllTasks([]);
    setEmployees([]);
    setWorksites([]);

    setUsername("admin");
    setPassword("");
    setInput("");
    setMessage("");
  };

  if (!loggedIn) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <Text style={styles.heading}>Assessment 3 Login</Text>

            <TextInput
              style={styles.searchBar}
              placeholder="Username"
              value={username}
              onChangeText={(text) => setUsername(text)}
              autoCapitalize="none"
            />

            <TextInput
              style={styles.searchBar}
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />

            <Button title="Login" onPress={handleLogin} />

            {message !== "" && <Text style={styles.message}>{message}</Text>}
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.heading}>Construction App</Text>

          <View style={styles.nav}>
            <Button title="Tasks" onPress={loadTasks} />
            <Button title="Employees" onPress={loadEmployees} />
            <Button title="Worksites" onPress={loadWorksites} />
          </View>

          {screen === "tasks" && (
            <TextInput
              style={styles.searchBar}
              placeholder="Search task..."
              returnKeyType="search"
              value={input}
              onChangeText={(text) => setInput(text)}
              onSubmitEditing={handleSearch}
            />
          )}

          {message !== "" && <Text style={styles.message}>{message}</Text>}

          {screen === "tasks" && (
            <>
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
                  />
                )}
                keyExtractor={(item, index) =>
                  item._id || item.id || index.toString()
                }
              />
            </>
          )}

          {screen === "employees" && (
            <>
              <Text style={styles.count}>
                Employees loaded: {employees.length}
              </Text>

              <FlatList
                style={styles.list}
                data={employees}
                renderItem={({ item }) => (
                  <Employee
                    fullName={item.fullName || item.name}
                    email={item.email}
                    phone={item.phone}
                    role={item.role}
                  />
                )}
                keyExtractor={(item, index) =>
                  item._id || item.id || index.toString()
                }
              />
            </>
          )}

          {screen === "worksites" && (
            <>
              <Text style={styles.count}>
                Worksites loaded: {worksites.length}
              </Text>

              <FlatList
                style={styles.list}
                data={worksites}
                renderItem={({ item }) => (
                  <Worksite
                    name={item.name}
                    address={item.address}
                    suburb={item.suburb}
                    status={item.status}
                  />
                )}
                keyExtractor={(item, index) =>
                  item._id || item.id || index.toString()
                }
              />
            </>
          )}

          <Button title="Logout" onPress={handleLogout} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignSelf: "center",
    width: "90%",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    marginTop: 10,
    marginBottom: 10,
  },
  list: {
    marginTop: 10,
    flex: 1,
    width: "100%",
  },
  message: {
    marginTop: 10,
    marginBottom: 10,
    color: "red",
  },
  count: {
    marginBottom: 10,
    color: "gray",
  },
});