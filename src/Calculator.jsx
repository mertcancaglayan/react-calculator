import React from "react";
import Toggle from "./components/toggle/Toggle";
import "./Calculator.css";
import { useTheme } from "./context/themeContext";
import Display from "./components/display/Display";
import Keypad from "./components/keypad/Keypad";

function Calculator() {
	const { currentThemeColors } = useTheme();

	const handleButtonClick = (value) => {
		console.log("Button clicked:", value);
	};

	return (
		<div className="calculator" style={{ backgroundColor: currentThemeColors.calculatorBackground }}>
			<Toggle></Toggle>
			<Display></Display>
			<Keypad onButtonClick={handleButtonClick}></Keypad>
		</div>
	);
}

export default Calculator;
