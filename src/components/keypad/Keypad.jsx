import React from "react";
import "./Keypad.css";
import { useTheme } from "../../context/themeContext";

const KeypadButton = ({ value, onClick, bgColor, borderColor, hoverBgColor, hoverBorderColor, color }) => (
	<div
		className="keypad-btn"
		onClick={() => onClick(value)}
		style={{
			backgroundColor: bgColor,
			border: borderColor ? `1px solid ${borderColor}` : "1px solid transparent",
			color: color,
		}}
		onMouseOver={(e) => {
			if (hoverBgColor) e.target.style.backgroundColor = hoverBgColor;
			if (hoverBorderColor) e.target.style.border = `1px solid ${hoverBorderColor}`;
		}}
		onMouseOut={(e) => {
			if (hoverBgColor) e.target.style.backgroundColor = bgColor;
			if (hoverBorderColor)
				e.target.style.border = borderColor ? `1px solid ${borderColor}` : "1px solid transparent";
		}}
	>
		{value}
	</div>
);

const Keypad = ({ onButtonClick }) => {
	const { currentThemeColors } = useTheme();

	const horizontalButtons = [["AC", "+/-", "%"]];
	const numberButtons = [
		["7", "8", "9"],
		["4", "5", "6"],
		["1", "2", "3"],
		[".", "0", "00"],
	];
	const verticalButtons = ["÷", "×", "-", "+", "="];

	return (
		<div className="keypadContainer">
			<div className="keypad" style={{ background: currentThemeColors.keypadBackground }}>
				<div className="keypad-horizontal">
					{horizontalButtons.map((row, rowIndex) => (
						<div
							key={rowIndex}
							className="keypad-row"
							style={rowIndex === 0 ? { backgroundColor: currentThemeColors.frameBtnBackground } : {}}
						>
							{row.map((button, colIndex) => (
								<KeypadButton
									key={colIndex}
									value={button}
									onClick={onButtonClick}
									bgColor="transparent"
									hoverBgColor={currentThemeColors.buttonHoverBackground}
									color={currentThemeColors.commonTextColor}
								/>
							))}
						</div>
					))}
					<div className="keypad-numbers">
						{numberButtons.map((row, rowIndex) => (
							<div key={rowIndex} className="keypad-row">
								{row.map((button, colIndex) => (
									<KeypadButton
										key={colIndex}
										value={button}
										onClick={onButtonClick}
										bgColor={currentThemeColors.buttonBackground}
										borderColor={currentThemeColors.buttonBorder}
										hoverBgColor={currentThemeColors.buttonHoverBackground}
										color={currentThemeColors.commonTextColor}
									/>
								))}
							</div>
						))}
					</div>
				</div>
				<div className="keypad-vertical" style={{ backgroundColor: currentThemeColors.frameBtnBackground }}>
					{verticalButtons.map((button, index) => (
						<KeypadButton
							key={index}
							value={button}
							onClick={onButtonClick}
							bgColor={
								index === verticalButtons.length - 1
									? currentThemeColors.verticalButtonLastBackground
									: "transparent"
							}
							hoverBgColor={
								index === verticalButtons.length - 1
									? currentThemeColors.verticalButtonLastHoverBackground
									: currentThemeColors.buttonHoverBackground
							}
							hoverBorderColor={currentThemeColors.verticalButtonHoverBorder}
							color={currentThemeColors.commonTextColor}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Keypad;
