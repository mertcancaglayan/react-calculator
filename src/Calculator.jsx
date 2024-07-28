import React, { useState, useEffect } from "react";
import Toggle from "./components/toggle/Toggle";
import "./Calculator.css";
import { useTheme } from "./context/themeContext";
import Display from "./components/display/Display";
import Keypad from "./components/keypad/Keypad";
import History from "./components/history/History";
import { calculate } from "./func/calculate";

function Calculator() {
	const { currentThemeColors } = useTheme();

	const [displayValue, setDisplayValue] = useState("");
	const [resultValue, setResultValue] = useState("");
	const [lastInputEqual, setLastInputEqual] = useState(false);
	const [lastEquations, setLastEquations] = useState(() => JSON.parse(localStorage.getItem("lastFour")) || []);

	useEffect(() => {
		localStorage.setItem("lastFour", JSON.stringify(lastEquations));
	}, [lastEquations]);

	const handleButtonClick = (value) => {
		if (value === "AC") {
			setDisplayValue("");
			setResultValue("");
			setLastInputEqual(false);
			setLastEquations([]);
			localStorage.setItem("lastFour", JSON.stringify([]));
			return;
		}

		if (value === "=") {
			const result = calculate(value, displayValue);
			setResultValue(result);
			setLastEquations((prevEquations) => {
				const newEquations = [...prevEquations, `${displayValue} = ${result}`];
				return newEquations.slice(-4);
			});
			setLastInputEqual(true);
		} else {
			if (lastInputEqual) {
				setDisplayValue(resultValue + value);
				setResultValue("");
				setLastInputEqual(false);
			} else {
				const newExpression = calculate(value, displayValue);
				setDisplayValue(newExpression);
				setResultValue("");
			}
		}
	};

	const displayHistory = lastEquations.slice(0, -1).slice(-3);

	const handleKeyDown = (event) => {
		const key = event.key;
		const validKeys = [
			"0",
			"1",
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8",
			"9",
			".",
			"+",
			"-",
			"*",
			"/",
			"=",
			"Enter",
			"Backspace",
			"(",
			")",
			"%",
		];

		if (validKeys.includes(key)) {
			event.preventDefault();
			if (key === "Enter") {
				handleButtonClick("=");
			} else if (key === "Backspace") {
				handleButtonClick("delete");
			} else {
				handleButtonClick(key);
			}
		}
	};

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [displayValue, resultValue, lastInputEqual]);

	return (
		<div className="calculator" style={{ backgroundColor: currentThemeColors.calculatorBackground }}>
			<Toggle />
			<History />
			<Display displayValue={displayValue} resultValue={resultValue} displayHistory={displayHistory} />
			<Keypad onButtonClick={handleButtonClick} />
		</div>
	);
}

export default Calculator;
