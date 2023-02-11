const currentCalc = document.getElementById("currentCalc");
const previousCalc = document.getElementById("previousCalc");
const options = Array.from(document.querySelectorAll(".options"));
const DELETE = "Delete";
const BACKSPACE = "Backspace";
const CA = "CA";
const DEL = "DEL";
const ZERO = "0";
const EMPTY_STRING = "";

function optionRules(inputGiven) {
  switch (inputGiven) {
    case DELETE:
    case CA:
      currentCalc.innerText = ZERO;
      break;
    case BACKSPACE:
    case DEL.toUpperCase():
      handleBackspace();
      break;
    default:
      handleInput(inputGiven);
  }
}

function handleBackspace() {
  let textLength = currentCalc.innerText.length;
  currentCalc.innerText = currentCalc.innerText.slice(0, textLength - 1);
  currentCalc.innerText =
    currentCalc.innerText === EMPTY_STRING ? ZERO : currentCalc.innerText;
}

function handleInput(inputGiven) {
  currentCalc.innerText =
    currentCalc.innerText === ZERO || currentCalc.innerText === EMPTY_STRING
      ? EMPTY_STRING
      : currentCalc.innerText;
  if (
    inputGiven.includes("*") ||
    inputGiven.includes("+") ||
    inputGiven.includes("-") ||
    inputGiven.includes("/")
  ) {
    currentCalc.innerText = ZERO;
  }
}

function avoidDoublePoint() {
  let screenInput = currentCalc.innerText;
  let arrToSplitTo = screenInput.split(/[-+*/]/);
  let lastExpression = arrToSplitTo[arrToSplitTo.length - 1];

  if (!lastExpression.includes(".") && !lastExpression.includes("^")) {
    currentCalc.innerText += ".";
  }
}

function avoidDoubleSymbols(input) {
  let screenInput = currentCalc.innerText;
  let text = screenInput[screenInput.length - 1];

  const symbolRegex = /[\+\-\*\/]/;

  switch (input) {
    case "=":
    case "Enter":
      if (symbolRegex.test(screenInput)) {
        currentCalc.innerText += "=";
        operate();
      }
      break;
    default:
      if (!symbolRegex.test(text)) {
        currentCalc.innerText += input;
      }
      break;
  }
}

function operate() {
  let equation = currentCalc.innerText.slice(0, -1);
  previousCalc.innerText = currentCalc.innerText;
  let result = eval(equation.replace(/e[^-()\d/*+.]/g, ""));

  result = Number(result.toFixed(3));

  currentCalc.innerText = result;
}

document.addEventListener("keydown", (event) => {
  event.preventDefault();
});

document.addEventListener("keyup", (event) => {
  optionRules(event.key);

  const usables = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  switch (event.key) {
    case ".":
      avoidDoublePoint();
      break;
    case "+":
    case "-":
    case "*":
    case "/":
    case "Enter":
    case "=":
      avoidDoubleSymbols(event.key);
      break;
    default:
      if (usables.includes(event.key)) {
        currentCalc.innerText += event.key;
      }
  }
});

for (let option of options) {
  option.addEventListener("click", (event) => {
    let btn = event.target;
    optionRules(btn.innerText);

    switch (btn.innerText) {
      case ".":
        avoidDoublePoint();
        break;
      case "+":
      case "-":
      case "*":
      case "/":
      case "=":
        avoidDoubleSymbols(btn.innerText);
        break;
      default:
        if (
          btn.innerText !== "CA" &&
          btn.innerText !== "DEL" &&
          btn.innerText !== "." &&
          btn.innerText !== "+" &&
          btn.innerText !== "-" &&
          btn.innerText !== "*" &&
          btn.innerText !== "/" &&
          btn.innerText !== "="
        ) {
          currentCalc.innerText += btn.innerText;
        }
    }
  });
}
