let num1 = "";
let num2 = "";
let operator = "";
let isOperatorSelected = false;
let isResultDisplayed = false;

const numbers = document.querySelectorAll(".num");
const operations = document.querySelectorAll(".operations .btn");
const clear = document.getElementById("clear");
const clearOne = document.getElementById("clear-one");
const equal = document.getElementById("equal");
const display = document.getElementById("display");

// Update display
function updateDisplay() {
  if (num2 && !isResultDisplayed) {
    display.innerText = `${num1} ${operator} ${num2}`;
  } else if (operator && !isResultDisplayed) {
    display.innerText = `${num1} ${operator}`;
  } else if (isResultDisplayed) {
    display.innerText = `${num1}`;
  } else {
    display.innerText = `${num1}`;
  }
}

// Handle number button clicks
numbers.forEach(function (number) {
  number.addEventListener("click", function (event) {
    if (isResultDisplayed) {
      // Reset num1 with the new number after showing result
      num1 = event.target.innerText;
      num2 = "";
      operator = "";
      isResultDisplayed = false;
    } else if (!isOperatorSelected) {
      num1 += event.target.innerText;
    } else {
      num2 += event.target.innerText;
    }
    updateDisplay();
  });
});

// Handle operation button clicks
operations.forEach(function (op) {
  op.addEventListener("click", function (event) {
    if (isResultDisplayed) {
      // If result is displayed, set num1 with the result before new operation
      num1 = display.innerText;
      num2 = "";
      isResultDisplayed = false;
    }

    if (num1 && num2 && operator) {
      calculate(); // Perform calculation if both numbers and operator are present
    }

    isOperatorSelected = true;
    operator = event.target.innerText;
    updateDisplay();
  });
});

// Perform calculation based on the current operator
function calculate() {
  if (num1 && num2) {
    let result;
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    switch (operator) {
      case "+":
        result = n1 + n2;
        break;
      case "-":
        result = n1 - n2;
        break;
      case "*":
        result = n1 * n2;
        break;
      case "/":
        result = n1 / n2;
        break;
      default:
        return;
    }

    num1 = result.toString();
    num2 = "";
    operator = "";
    isOperatorSelected = false;
    isResultDisplayed = true;
    updateDisplay();
  }
}

// Clear display and reset variables
function clearDisplay() {
  num1 = "";
  num2 = "";
  operator = "";
  isOperatorSelected = false;
  isResultDisplayed = false;
  updateDisplay();
}

clear.addEventListener("click", clearDisplay);

// Calculate result on equal button click
equal.addEventListener("click", function () {
  if (num1 && num2 && operator) {
    calculate();
  }
});

// Clear last character
clearOne.addEventListener("click", function () {
  if (num2.length > 0) {
    num2 = num2.slice(0, -1);
  } else if (operator.length > 0) {
    operator = "";
    isOperatorSelected = false;
  } else if (num1.length > 0) {
    num1 = num1.slice(0, -1);
  }
  updateDisplay();
});
