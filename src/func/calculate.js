const operators = ["÷", "×", "-", "+"];

const replaceOperators = (expression) => {
	return expression.replace(/÷/g, "/").replace(/×/g, "*");
};

const sanitizeExpression = (expression) => {
	// Remove leading zeros from numbers in the expression
	return expression.replace(/\b0+(\d)/g, "$1");
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
	const parts = currentExpression.split(/([+\-*/÷×])/);
	const lastPart = parts.pop();
	const percentageValue = (parseFloat(lastPart) / 100).toString();
	return parts.join("") + percentageValue;
};

const handleDecimal = (currentExpression) => {
	const parts = currentExpression.split(/([+\-*/÷×])/);
	const lastPart = parts.pop();

	if (lastPart && lastPart.includes(".")) return currentExpression;
	if (currentExpression === "" || /[+\-*/÷×]$/.test(currentExpression)) return currentExpression;

	return currentExpression + ".";
};

const handleDelete = (currentExpression) => {
	return currentExpression.slice(0, -1);
};

export const calculate = (input, currentExpression) => {
	if (currentExpression === "Error") return "";
	if (input === "AC") {
		return "";
	}

	if (input === "=") {
		let expression = sanitizeExpression(currentExpression);
		const lastChar = expression.slice(-1);
		if (operators.includes(lastChar)) {
			expression = expression.slice(0, -1);
		}
		try {
			const result = eval(replaceOperators(expression)).toString();
			const equation = `${expression} = ${result}`;

			let lastFour = JSON.parse(localStorage.getItem("lastFour")) || [];
			lastFour.push(equation);
			if (lastFour.length > 4) lastFour.shift();
			localStorage.setItem("lastFour", JSON.stringify(lastFour));

			return result;
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

	if (input === "delete") {
		return handleDelete(currentExpression);
	}

	const lastChar = currentExpression.slice(-1);

	if (operators.includes(input) && operators.includes(lastChar)) {
		return currentExpression.slice(0, -1) + input;
	}

	if (operators.includes(input) && currentExpression === "") return currentExpression;

	return currentExpression + input;
};
