import React from "react";
import "./Toggle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { useTheme } from "../../context/themeContext";

function Toggle() {
	const { theme, toggleTheme, currentThemeColors } = useTheme();

	const handleChange = (e) => {
		toggleTheme();
	};

	return (
		<div>
			<label className="switch">
				<input type="checkbox" checked={theme === "dark"} onChange={handleChange} />
				<span className="slider round"></span>
				<div className="icons" style={{ color: currentThemeColors.toggleIcon }}>
					<FontAwesomeIcon icon={faSun} className="icon-sun" />
					<FontAwesomeIcon icon={faMoon} className="icon-moon" />
				</div>
			</label>
		</div>
	);
}

export default Toggle;
