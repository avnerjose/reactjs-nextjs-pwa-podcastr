import {
  useState,
  ReactNode,
  createContext,
  useContext,
  useEffect,
} from "react";
import Cookies from "js-cookie";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { LightTheme } from "../styles/themes/light";
import { DarkTheme } from "../styles/themes/dark";

interface ThemeContextProviderProps {
  children: ReactNode;
}

interface ThemeContextProps {
  toggleTheme: () => void;
}

const ThemeContext = createContext({} as ThemeContextProps);

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [theme, setTheme] = useState<DefaultTheme>(LightTheme);

  const toggleTheme = () => {
    Cookies.set("@podcastr:theme", theme.title === "light" ? "dark" : "light", {
      sameSite: "None",
      secure: true,
    });
    setTheme(theme.title === "light" ? DarkTheme : LightTheme);
  };

  useEffect(() => {
    const cookieTheme = Cookies.get("@podcastr:theme");
    setTheme(cookieTheme === "light" ? LightTheme : DarkTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <ThemeProvider theme={theme.title === "light" ? LightTheme : DarkTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
