const buttons = document.querySelectorAll('.btn:not(.operand):not(.sys)');
const operands = document.querySelectorAll('.operand');
const display = document.querySelector('.num');
const sys = document.querySelectorAll('.sys');

// console.log(" ");
// console.log(firstVal);
// console.log(secondVal);
// console.log(sum);
let firstVal = 0;
let secondVal = 0;
let sum = 0;
let sign = '';
let swap = false;
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    if (String(sum).length >= 8) {
      display.style.fontSize = `${
        parseInt(getComputedStyle(display).fontSize) - 5
      }px`;
    }
    if (!swap) {
      firstVal = (firstVal *= 10) + parseInt(button.textContent);
      display.textContent = firstVal;
    } else {
      secondVal = (secondVal *= 10) + parseInt(button.textContent);
      display.textContent = secondVal;
    }
  });
});

operands.forEach((button) => {
  let sum = 0;
  button.addEventListener('click', () => {
    if (button.textContent !== '=') {
      sign = button.textContent;
      swap = true;
      //   sum = operate(firstVal, secondVal, sign);
      //   firstVal = sum;
      //   secondVal = 0;
      //   display.textContent = sum;
    } else if (button.textContent === '=' && swap) {
      swap = false;
      sum = operate(firstVal, secondVal, sign);
      firstVal = sum;
      secondVal = 0;
      display.textContent = sum;
    } else {
      return;
    }
  });
});

sys.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.textContent === 'AC') {
      swap = false;
      display.style.fontSize = '60px';
      display.textContent = 0;
      firstVal = 0;
      secondVal = 0;
      sum = 0;
    }
    if (button.textContent === '+/-') {
      if (swap) {
        secondVal = secondVal * -1;
        display.textContent = secondVal;
      } else {
        firstVal = firstVal * -1;
        display.textContent = firstVal;
      }
    }
    if (button.textContent === '%') {
      if (swap) {
        secondVal = secondVal / 100;
        display.textContent = secondVal;
      } else {
        firstVal = firstVal / 100;
        display.textContent = firstVal;
      }
    }
  });
});

function operate(a, b, sign) {
  if (sign === '+') return a + b;
  else if (sign === '-') return a - b;
  else if (sign === 'X') return a * b;
  else if (sign === '/') {
    if (b == '0') {
      return 'Nerd';
    }
    return a / b;
  }
}
