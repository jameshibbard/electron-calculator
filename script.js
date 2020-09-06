/* global document */

const calculator = {
  displayValue: '0',
  firstOperand: null,
  operator: '',
  awaitingSecondOperand: false,
  lastKey: '',
};

const display = document.querySelector('.result');
const buttons = document.querySelectorAll('button');

function computeNewValue(firstOperand, secondOperand, operator) {
  if (operator === '+') return firstOperand + secondOperand;
  if (operator === '-') return firstOperand - secondOperand;
  if (operator === '×') return firstOperand * secondOperand;
  if (operator === '÷') return firstOperand / secondOperand;

  // Calculator.operator is set to '' after pressing equals
  // Pressing equals again after that should return display value
  return secondOperand;
}

function updateDisplay() {
  display.textContent = calculator.displayValue;
}

function updateDisplayValue() {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = Number(displayValue);
  const result = computeNewValue(firstOperand, inputValue, operator);

  calculator.displayValue = String(result);
}

function handleOperand(val) {
  if (calculator.awaitingSecondOperand) {
    calculator.displayValue = val;
    calculator.awaitingSecondOperand = false;
  } else if (calculator.displayValue === '0' || calculator.lastKey === 'equals') {
    calculator.displayValue = val;
  } else {
    calculator.displayValue += val;
  }
}

function handleEquals() {
  // Only update the display value if second operand is present
  if (!calculator.awaitingSecondOperand) updateDisplayValue();

  calculator.firstOperand = null;
  calculator.operator = '';
}

function handleOperator(operator) {
  // Short circuit if user presses multiple operators
  if (calculator.operator && calculator.awaitingSecondOperand) {
    calculator.operator = operator;
    return;
  }

  if (calculator.firstOperand === null) {
    calculator.firstOperand = Number(calculator.displayValue);
  } else if (calculator.operator) {
    // When multiplying result of equals, calculator.operator is empty
    updateDisplayValue();
    calculator.firstOperand = Number(calculator.displayValue);
  }

  calculator.awaitingSecondOperand = true;
  calculator.operator = operator;
}

buttons.forEach((button) => {
  button.addEventListener('click', function handleButtonPress() {
    const buttonType = this.value;
    const input = this.textContent;

    switch (buttonType) {
      case 'clear-all':
        calculator.displayValue = '0';
        calculator.firstOperand = null;
        calculator.operator = '';
        calculator.awaitingSecondOperand = false;
        break;
      case 'equals':
        handleEquals();
        break;
      case 'operand':
        handleOperand(input);
        break;
      case 'operator':
        handleOperator(input);
        break;
      default:
    }

    calculator.lastKey = buttonType;
    updateDisplay();

    console.log(calculator);
  }, false);
});

updateDisplay();
