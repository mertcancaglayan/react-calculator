import React from "react";
import Toggle from "./components/toggle/Toggle";
import "./Calculator.css";
import { useTheme } from "./context/themeContext";
import Display from "./components/display/Display";

function Calculator() {
	const { currentThemeColors } = useTheme();

	return (
		<div className="calculator" style={{ backgroundColor: currentThemeColors.calculatorBackground }}>
			<Toggle></Toggle>
			<Display></Display>
		</div>
	);
}

export default Calculator;
