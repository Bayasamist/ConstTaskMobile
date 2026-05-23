import React, { useState } from "react";
import { Text, TextInput, StyleSheet, Button } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";

import { ThemeProvider } from "./context/theme";
import { GlobalLayout } from "./components/Layout";
import { loginUser } from "./services/api";

import SettingsScreen from "./screens/SettingsScreen";
import TasksScreen from "./screens/TasksScreen";
import EmployeesScreen from "./screens/EmployeesScreen";
import WorksitesScreen from "./screens/WorksitesScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");

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
      setLoggedIn(true);
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleLogout = () => {
    setToken("");
    setLoggedIn(false);
    setPassword("");
    setMessage("");
  };

  if (!loggedIn) {
    return (
      <SafeAreaProvider>
        <GlobalLayout>
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
        </GlobalLayout>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ color, size }) => {
                let iconName = "tasks";

                if (route.name === "Tasks") {
                  iconName = "tasks";
                }

                if (route.name === "Employees") {
                  iconName = "users";
                }

                if (route.name === "Worksites") {
                  iconName = "building";
                }

                if (route.name === "Settings") {
                  iconName = "cog";
                }

                return (
                  <FontAwesome5 name={iconName} size={size} color={color} />
                );
              },
            })}
          >
            <Tab.Screen name="Tasks">
              {() => <TasksScreen token={token} />}
            </Tab.Screen>

            <Tab.Screen name="Employees">
              {() => <EmployeesScreen token={token} />}
            </Tab.Screen>

            <Tab.Screen name="Worksites">
              {() => <WorksitesScreen token={token} />}
            </Tab.Screen>

            <Tab.Screen name="Settings">
              {() => (
                <SettingsScreen username={username} onLogout={handleLogout} />
              )}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
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
  message: {
    marginTop: 10,
    marginBottom: 10,
    color: "red",
  },
});