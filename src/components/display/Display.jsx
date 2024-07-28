import React from "react";
import "./Display.css";
import { useTheme } from "../../context/themeContext";

function Display({ displayValue, resultValue, displayHistory }) {
	const { currentThemeColors } = useTheme();

	return (
		<div className="displayContainer">
			<div className="equationContainer">
				<div className="pastEquations" style={{ color: currentThemeColors.primaryTextColor }}>
					{displayHistory.map((equation, index) => (
						<div key={index}>{equation}</div>
					))}
				</div>
				<div className="equation" style={{ color: currentThemeColors.primaryTextColor }}>
					{displayValue}
				</div>
			</div>
			<div className="result" style={{ color: currentThemeColors.commonTextColor }}>
				<div className="resultEqual">=</div>
				<div className="resultValue">{resultValue}</div>
			</div>
		</div>
	);
}

export default Display;
