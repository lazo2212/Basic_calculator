// Variables and selectors
const displayOutput = document.querySelector('.display-output');
const displayInput = document.querySelector('.display-input');
const allClearButton = document.querySelector('#allClear');
const backspaceButton = document.querySelector('#backspace');
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('#equals');

class Calculator {
  constructor(displayOutput, displayInput) {
    this.displayOutput = displayOutput;
    this.displayInput = displayInput;
  }

  allClear() {
    //clear both displays and restore all to default
    this.displayOutput.innerHTML = '';
    this.displayInput.innerHTML = '';
  }

  deleteLastNumber() {
    this.displayInput.innerHTML = this.displayInput.innerHTML.slice(0, -1);
  }

  appendNumberOperation(input) {
    if (input === ',') {
      input = '.';
    }

    if (input === '.' && this.displayInput.innerHTML.includes('.')) return;
    if (input === '.' && this.displayInput.innerHTML === '') return;

    if (
      this.displayInput.innerHTML[0] === '0' &&
      this.displayInput.innerHTML[1] !== '.' &&
      input !== '0' &&
      input !== '.'
    ) {
      this.displayInput.innerHTML = '';
    }

    if (
      (this.displayInput.innerHTML === '' && input === '+') ||
      (this.displayInput.innerHTML === '' && input === '-') ||
      (this.displayInput.innerHTML === '' && input === '*') ||
      (this.displayInput.innerHTML === '' && input === '/')
    )
      return;

    if (
      this.displayInput.innerHTML[0] === '0' &&
      input === '0' &&
      this.displayInput.innerHTML[1] !== '.'
    )
      return;

    if (
      (this.displayInput.innerHTML[this.displayInput.innerHTML.length - 1] ===
        '+' &&
        input === '+') ||
      (this.displayInput.innerHTML[this.displayInput.innerHTML.length - 1] ===
        '-' &&
        input === '-') ||
      (this.displayInput.innerHTML[this.displayInput.innerHTML.length - 1] ===
        '*' &&
        input === '*') ||
      (this.displayInput.innerHTML[this.displayInput.innerHTML.length - 1] ===
        '/' &&
        input === '/')
    )
      return;

    this.displayInput.innerHTML += input;
  }

  compute() {
    if (this.displayInput.innerHTML === '') return;
    let sum = eval(this.displayInput.innerHTML);
    this.displayOutput.innerHTML = sum + ' =';
  }
}

const calculator = new Calculator(displayOutput, displayInput);

// Event listeners
allClearButton.addEventListener('click', () => {
  calculator.allClear();
});

backspaceButton.addEventListener('click', () => {
  calculator.deleteLastNumber();
});

numberButtons.forEach((button) => {
  button.addEventListener('click', (number) => {
    calculator.appendNumberOperation(number.target.innerHTML);
  });
});

operationButtons.forEach((button) => {
  button.addEventListener('click', (operation) => {
    calculator.appendNumberOperation(operation.target.dataset.operation);
  });
});

equalsButton.addEventListener('click', () => {
  calculator.compute();
});

// Keyboard Event listeners
window.addEventListener('keydown', (button) => {
  const numsOperators = '0123456789,+-*/';
  if (numsOperators.includes(button.key)) {
    calculator.appendNumberOperation(button.key);
  } else return;
});

window.addEventListener('keydown', (button) => {
  if (button.key === 'Enter') {
    calculator.compute();
  }
  if (button.key === 'Backspace') {
    calculator.deleteLastNumber();
  }
});
