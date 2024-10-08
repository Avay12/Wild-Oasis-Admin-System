import { createContext, ReactNode, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

interface ModelContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<ModelContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

function DarkModeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-schema):dark").matches,
    "isDarkMode"
  );

  useEffect(function () {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  });

  function toggleDarkMode() {
    setIsDarkMode((isDark: boolean) => !isDark);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("DarkMode was used outside of DarkModeProvider");
  return context;
}

export { DarkModeProvider, useDarkMode };
