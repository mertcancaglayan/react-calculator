import React, { createContext, useContext, useState } from "react";
import { themeColors } from "../styles/themeColors";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState("light");

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
	};

	const currentThemeColors = themeColors[theme] || themeColors.light;

	return <ThemeContext.Provider value={{ theme, toggleTheme, currentThemeColors }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
