import React, { useEffect, useState } from "react";
import "./History.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../context/themeContext";

function History() {
	const { currentThemeColors } = useTheme();
	const [hovered, setHovered] = useState(false);
	const [historyShowed, setHistoryShowed] = useState(false);

	const handleMouseOver = () => {
		setHovered(true);
	};

	const handleMouseOut = () => {
		setHovered(false);
	};

	const handleClick = () => {
		setHistoryShowed(!historyShowed);
	};

	useEffect(() => {
		if (historyShowed) {
			document.querySelector(".pastEquations").style.opacity = 1;
		} else {
			document.querySelector(".pastEquations").style.opacity = 0;
		}
	}, [historyShowed]);

	const historyStyle = {
		color: hovered ? currentThemeColors.primaryTextColor : currentThemeColors.commonTextColor,
		cursor: "pointer",
	};

	return (
		<div
			className="history"
			style={historyStyle}
			onClick={handleClick}
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
		>
			<FontAwesomeIcon icon={faClockRotateLeft} />
		</div>
	);
}

export default History;
