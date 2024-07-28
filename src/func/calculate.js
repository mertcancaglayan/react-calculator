const operators = ["÷", "×", "-", "+"];

const replaceOperators = (expression) => {
	return expression.replace(/÷/g, "/").replace(/×/g, "*");
};

const toggleSign = (currentExpression) => {
	if (currentExpression === "") return "";

	const parts = currentExpression.split(/([+\-*/÷×])/);
	let lastPart = parts.pop();

	if (lastPart && !isNaN(lastPart)) {
		const previousPart = parts.pop();
		if (previousPart && operators.includes(previousPart)) {
			parts.push(previousPart === "+" ? "-" : previousPart === "-" ? "+" : previousPart);
			parts.push(lastPart);
		} else {
			if (previousPart) parts.push(previousPart);
			parts.push(lastPart);
		}
	} else if (lastPart && operators.includes(lastPart)) {
		lastPart = lastPart === "+" ? "-" : lastPart === "-" ? "+" : lastPart;
		parts.push(lastPart);
	}

	return parts.join("");
};

const handlePercentage = (currentExpression) => {
	if (currentExpression === "" || operators.includes(currentExpression.slice(-1))) {
		return currentExpression;
	}
	return currentExpression + "%";
};

const handleDecimal = (currentExpression) => {
	const parts = currentExpression.split(/([+\-*/÷×])/);
	const lastPart = parts.pop();

	if (lastPart && lastPart.includes(".")) return currentExpression;
	if (currentExpression === "" || /[+\-*/÷×]$/.test(currentExpression)) return currentExpression;

	return currentExpression + ".";
};

export const calculate = (input, currentExpression) => {
	if (currentExpression === "Error") return "";
	if (input === "AC") return "";

	if (input === "=") {
		try {
			return eval(replaceOperators(currentExpression)).toString();
		} catch (error) {
			return "Error";
		}
	}

	if (input === "+/-") {
		return toggleSign(currentExpression);
	}

	if (input === "%") {
		return handlePercentage(currentExpression);
	}

	if (input === ".") {
		return handleDecimal(currentExpression);
	}

	const lastChar = currentExpression.slice(-1);

	if (operators.includes(input) && operators.includes(lastChar)) {
		return currentExpression.slice(0, -1) + input;
	}

	if (operators.includes(input) && currentExpression === "") return currentExpression;

	return currentExpression + input;
};
