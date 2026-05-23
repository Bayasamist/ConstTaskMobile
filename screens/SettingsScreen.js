import React from "react";
import { Text, StyleSheet, Button, View, Switch } from "react-native";
import { GlobalLayout } from "../components/Layout";
import { useTheme } from "../context/theme";
import { GlobalStyles } from "../styles/global";

export default function SettingsScreen({ username, onLogout }) {
  const { isLargeText, setIsLargeText } = useTheme();
  const globalStyles = GlobalStyles();

  return (
    <GlobalLayout>
      <Text style={styles.heading}>Settings</Text>

      <View style={styles.card}>
        <Text style={globalStyles.title}>Logged in user</Text>
        <Text style={globalStyles.text}>{username}</Text>
      </View>

      <View style={styles.row}>
        <Switch
          value={isLargeText}
          onValueChange={() => setIsLargeText(!isLargeText)}
        />
        <Text style={globalStyles.text}>Large Text</Text>
      </View>

      <Button title="Logout" onPress={onLogout} />
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
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
});