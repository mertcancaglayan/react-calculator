import React, { useState } from "react";
import Toggle from "./components/toggle/Toggle";
import "./Calculator.css";
import { useTheme } from "./context/themeContext";
import Display from "./components/display/Display";
import Keypad from "./components/keypad/Keypad";
import { calculate } from "./func/calculate";

function Calculator() {
	const { currentThemeColors } = useTheme();

	const [displayValue, setDisplayValue] = useState("");
	const [resultValue, setResultValue] = useState("");

	const handleButtonClick = (value) => {
		if (value === "=") {
			const result = calculate(value, displayValue);
			setResultValue(result);
		} else {
			const newExpression = calculate(value, displayValue);
			setDisplayValue(newExpression);
			setResultValue("");
		}
	};

	return (
		<div className="calculator" style={{ backgroundColor: currentThemeColors.calculatorBackground }}>
			<Toggle />
			<Display displayValue={displayValue} resultValue={resultValue} />
			<Keypad onButtonClick={handleButtonClick} />
		</div>
	);
}

export default Calculator;
