import { StyleSheet } from "react-native";
import { useTheme } from "../context/theme";

export function GlobalStyles() {
  const { isLargeText } = useTheme();

  const styles = StyleSheet.create({
    text: {
      fontSize: isLargeText ? 24 : 16,
    },
    title: {
      fontSize: isLargeText ? 28 : 20,
      fontWeight: "bold",
    },
  });

  return styles;
}