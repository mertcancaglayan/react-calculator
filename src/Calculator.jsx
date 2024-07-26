import React from "react";
import Toggle from "./components/toggle/Toggle";
import "./Calculator.css";
import { useTheme } from "./context/themeContext";

function Calculator() {
	const { currentThemeColors } = useTheme();

	return (
		<div className="calculator" style={{ backgroundColor: currentThemeColors.calculatorBackground }}>
			<Toggle></Toggle>
		</div>
	);
}

export default Calculator;
