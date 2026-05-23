import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  const [isLargeText, setIsLargeText] = useState(false);

  return (
    <ThemeContext.Provider value={{ isLargeText, setIsLargeText }}>
      {children}
    </ThemeContext.Provider>
  );
}