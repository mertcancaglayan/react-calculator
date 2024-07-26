import React from "react";
import "./Display.css";
import { useTheme } from "../../context/themeContext";

function Display() {
	const { currentThemeColors } = useTheme();

	return (
		<div className="displayContainer">
			<div className="equation" style={{ color: currentThemeColors.primaryTextColor }}>
				1.000 × 4 + 2 × 1
			</div>
			<div className="result" style={{ color: currentThemeColors.commonTextColor }}>
				<div className="resultEqual">=</div>
				<div className="resultValue">4002</div>
			</div>
		</div>
	);
}

export default Display;
