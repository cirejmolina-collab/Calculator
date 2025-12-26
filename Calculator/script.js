const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
const clearBtn = document.getElementById('clear');
const clearEntryBtn = document.getElementById('clearEntry');
const equalsBtn = document.getElementById('equals');
const sqrtBtn = document.getElementById('sqrt');
const themeToggle = document.getElementById('themeToggle');

// Theme toggle logic
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

let currentInput = '';

function updateDisplay() {
  display.value = currentInput;
}

function handleButton(value) {
  if (value === '=') {
    calculate();
  } else if (value === 'C') {
    currentInput = '';
    updateDisplay();
  } else if (value === 'CE') {
    // Remove last entry (number/operator)
    currentInput = currentInput.replace(/([\d.]+|[+\-*/^%()√])$/, '');
    updateDisplay();
  } else if (value === '√') {
    // Insert sqrt as function
    currentInput += '√(';
    updateDisplay();
  } else {
    if (currentInput === 'Error') currentInput = '';
    currentInput += value;
    updateDisplay();
  }
}

function calculate() {
  let expr = currentInput
    .replace(/√\(/g, 'Math.sqrt(')
    .replace(/\^/g, '**')
    .replace(/%/g, '/100');
  try {
    // eslint-disable-next-line no-eval
    let result = eval(expr);
    if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
      currentInput = result.toString();
    } else {
      currentInput = 'Error';
    }
  } catch {
    currentInput = 'Error';
  }
  updateDisplay();
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    handleButton(btn.textContent);
  });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  if ((e.key >= '0' && e.key <= '9') || '+-*/().'.includes(e.key)) {
    handleButton(e.key);
  } else if (e.key === 'Enter' || e.key === '=') {
    e.preventDefault();
    handleButton('=');
  } else if (e.key === 'Backspace') {
    handleButton('CE');
  } else if (e.key === 'c' || e.key === 'C') {
    handleButton('C');
  } else if (e.key === '%') {
    handleButton('%');
  } else if (e.key === '^') {
    handleButton('^');
  }
});
