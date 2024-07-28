import React from "react";
import "./Display.css";
import { useTheme } from "../../context/themeContext";

function Display({displayValue , resultValue}) {
	const { currentThemeColors } = useTheme();

	return (
		<div className="displayContainer">
			<div className="equation" style={{ color: currentThemeColors.primaryTextColor }}>
				{displayValue}
			</div>
			<div className="result" style={{ color: currentThemeColors.commonTextColor }}>
				<div className="resultEqual">=</div>
				<div className="resultValue">{resultValue}</div>
			</div>
		</div>
	);
}

export default Display;
