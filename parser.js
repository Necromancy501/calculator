// Round function

const roundResult = function (number) {
  return Math.round((number + Number.EPSILON) * 100) / 100;
};

// MATHEMATICAL EVALUATIONS

const add = function (...numbers) {
  flag = true;
  const result = Array.from(arguments).reduce((total, number) => {
    if (typeof number === "number") {
      return (total += number);
    } else {
      flag = false;
      return 0;
    }
  }, 0);

  return flag ? roundResult(result) : "ERROR";
};

const subtract = function (number1, number2) {
  if (typeof number1 === "number" && typeof number2 === "number") {
    return roundResult(number1 - number2);
  } else {
    return "ERROR";
  }
};

const multiply = function (...numbers) {
  flag = true;
  const result = Array.from(arguments).reduce((total, number) => {
    if (typeof number === "number") {
      return (total *= number);
    } else {
      flag = false;
      return 1;
    }
  }, 1);

  return flag ? roundResult(result) : "ERROR";
};

const power = function (number1, number2) {
  if (typeof number1 === "number" && typeof number2 === "number") {
    return roundResult(number1 ** number2);
  } else {
    return "ERROR";
  }
};

const modulo = function (number1, number2) {
  if (typeof number1 === "number" && typeof number2 === "number") {
    return roundResult(number1 % number2);
  } else {
    return "ERROR";
  }
};

const division = function (number1, number2) {
  if (number2 === 0) {
    return "ERROR";
  }
  if (typeof number1 === "number" && typeof number2 === "number") {
    return roundResult(number1 / number2);
  }
  return "ERROR"; // Handle unexpected input types
};

const opperands = {
  plus: { symbol: "+", precedence: 1, does: add },
  minus: { symbol: "-", precedence: 1, does: subtract },
  mult: { symbol: "*", precedence: 2, does: multiply },
  div: { symbol: "/", precedence: 2, does: division },
  mod: { symbol: "%", precedence: 2, does: modulo },
  exp: { symbol: "^", precedence: 3, does: power },
};

function matchNumbersAroundIndex(input, index) {
  // Match the left number
  let leftIndex = index - 1;
  while (leftIndex >= 0 && input[leftIndex].match(/\d|\./)) {
    leftIndex--; // Go left until we find the start of the number
  }

  let leftMatch;

  // Negative numbers logic

  if (leftIndex === 0 && input[0] === "-") {
    leftMatch = input.slice(0, index);
  } else if (input[leftIndex] === "-" && input[leftIndex - 1].match(/[^\d]/)) {
    leftMatch = input.slice(leftIndex, index);
  } else {
    leftIndex++; // Adjust to the start of the number
    leftMatch = input.slice(leftIndex, index);
  }

  // Match the right number
  let rightIndex = index + 1;
  if (input[rightIndex] === "-") {
    rightIndex++;
  }

  while (rightIndex < input.length && input[rightIndex].match(/\d|\./)) {
    rightIndex++;
  }

  let rightMatch = input.slice(index + 1, rightIndex);
  if (!leftMatch || !rightMatch) return null;

  const startIndex = leftIndex;
  const endIndex = index + 1 + rightMatch.length;

  mathExpression.firstNumber = Number(leftMatch);
  mathExpression.secondNumber = Number(rightMatch);
  mathExpression.index = index;
  mathExpression.opperand = input[index];

  const remainingString =
    input.slice(0, startIndex) +
    mathEval(mathExpression) +
    input.slice(endIndex);
  return remainingString;
}

function mathEval(obj) {
  for (const key in opperands) {
    if (opperands[key].symbol === obj.opperand) {
      return opperands[key].does(obj.firstNumber, obj.secondNumber);
    }
  }
}

let mathExpression = {
  index: 0,
  firstNumber: 0,
  secondNumber: 0,
  opperand: "",
};

function mathParser(mathString) {
  // Error from opperands

  if (mathString === "ERROR" || mathString === null) {
    return "ERROR";
  }

  // Base case: If no valid operation exists, stop recursion
  if (
    !mathString.match(/[\+\-\*\/\^%]/) ||
    (mathString.match(/^-?\d+(\.\d+)?$/) &&
      !mathString.includes("+") &&
      !mathString.includes("*") &&
      !mathString.includes("/"))
  ) {
    return mathString;
  }

  // Error from opperands

  if (mathString === "ERROR") {
    return "ERROR";
  }

  // Empty string
  if (mathString === "") {
    return "";
  }

  // Mismatched parenthesis
  let parenthesisTest = 0;
  for (char of mathString) {
    if (char === "(") {
      parenthesisTest++;
    } else if (char === ")") {
      parenthesisTest--;
    }
  }
  if (parenthesisTest != 0) {
    return "ERROR";
  }

  if (typeof mathString !== "string") {
    console.error(`Invalid input to mathParser: ${mathString}`);
    return "ERROR";
  }

  let maxPrecedence = 0;
  let targetIndex = -1;

  let parenthesisCounter = 0;

  // Scan for the highest precedence operation
  for (let i = 0; i < mathString.length; i++) {
    const char = mathString[i];

    // Special case: Skip minus sign at the start of the string or as a negative initializer
    if (char === "-" && (i === 0 || "+-*/^%(".includes(mathString[i - 1]))) {
      continue; // Skip this iteration as it’s not an operator
    }

    if (char === "(") {
      parenthesisCounter++;
    } else if (char === ")") {
      parenthesisCounter--;
    }

    if (parenthesisCounter === 0) {
      for (const key in opperands) {
        if (opperands[key].symbol === char) {
          const currPrecedence =
            opperands[key].precedence + parenthesisCounter * 10;
          if (currPrecedence > maxPrecedence) {
            maxPrecedence = currPrecedence;
            targetIndex = i;
          }
        }
      }
    }
  }

  // If parentheses exist, evaluate them first
  if (mathString.includes("(")) {
    const innerMost = mathString.match(/\(([^()]+)\)/); // Match innermost parentheses
    if (innerMost) {
      const innerResult = mathParser(innerMost[1]); // Evaluate the inside
      mathString = mathString.replace(innerMost[0], innerResult); // Replace parentheses with result
      return mathParser(mathString); // Recurse with updated string
    }
  }

  // Extract and evaluate the highest precedence operation
  if (targetIndex !== -1) {
    mathString = matchNumbersAroundIndex(mathString, targetIndex);
    return mathParser(mathString); // Recurse with updated string
  }

  return mathString;
}

/* UNCOMMENT IF JESTER TEST   
// Do not edit below this line
    module.exports = {
        mathParser,
    };
*/
