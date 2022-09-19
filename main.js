const currentCalc = document.getElementById("currentCalc");
const previousCalc = document.getElementById("previousCalc");
const options = Array.from(document.querySelectorAll(".options"));

/* function add(arr) {
  let total = 0;
  arr.forEach((element) => {
    total += element;
  });
  return total;
}

function subtract(arr) {
  let total = arr[0];
  for (let i = 1; i < arr.length; i++) {
    total -= arr[i];
  }
  return total;
}

function multiply(arr) {
  let total = 1;
  arr.forEach((element) => {
    total *= element;
  });
  return total;
}

function divide(arr) {
  let total = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === 0) {
      currentCalc.innerText = "ERROR!";
      return;
    }
    total /= arr[i];
  }
  return total;
} */

function optionRules(inputGiven) {
  if (currentCalc.innerText === "0" || currentCalc.innerText === "") {
    currentCalc.innerText = "";
    if (
      inputGiven.includes("*") ||
      inputGiven.includes("+") ||
      inputGiven.includes("-") ||
      inputGiven.includes("/")
    ) {
      currentCalc.innerText = "0";
    }
  }
  if (inputGiven === "Delete" || inputGiven === "CA") {
    currentCalc.innerText = "0";
    return;
  }
  if (inputGiven === "Backspace" || inputGiven === "Del") {
    let textLength = currentCalc.innerText.length;
    currentCalc.innerText = currentCalc.innerText.slice(0, textLength - 1);
    if (currentCalc.innerText === "") {
      currentCalc.innerText = "0";
    }
    return;
  }
}

function avoidDoublePoint() {
  /*
   * Get text from input
   * Check wether it contains operating symbols (+, -, *, ^, %, /)
   * split by operating symbols (+, -, *, ^, %, /)
   * Get last index of array containing split parts
   * Check wether it already contains a '.'
   * If no, allow point to be added
   * If yes, don't add anything
   */

  let screenInput = currentCalc.innerText;
  let arrToSplitTo = screenInput.split(/[-*+\/]/);
  let text = arrToSplitTo[arrToSplitTo.length - 1];

  if (screenInput !== undefined && text !== undefined) {
    if (!text.includes(".") && !text.includes("^")) {
      currentCalc.innerText += ".";
    }
  }
}

function avoidDoubleSymbols(input) {
  let screenInput = currentCalc.innerText;
  let text = screenInput[screenInput.length - 1];

  if (screenInput !== undefined && text !== undefined) {
    if (
      text !== "+" &&
      text !== "-" &&
      text !== "*" &&
      text !== "/" &&
      text !== "="
    ) {
      if (
        (input === "=" || input === "Enter") &&
        (screenInput.includes("*") ||
          screenInput.includes("/") ||
          screenInput.includes("+") ||
          screenInput.includes("-"))
      ) {
        currentCalc.innerText += "=";
        operate();
      } else if (input !== "=" && input !== "Enter") {
        currentCalc.innerText += input;
      }
    }
  }
}

function operate() {
  /*
   * Get equation from text
   * Split equation by - into arr1
   * Loop through arr1
   * Check wether arr1 has elements that only contain * or / and call multiply or divide on them
   *
   *  and push element and - after every iteration to arr2
   *
   */

  let calc = currentCalc.innerText;
  previousCalc.innerText = currentCalc.innerText;
  let equation = calc.slice(0, calc.length - 1);
  currentCalc.innerText = eval(equation.replace(/[^-()\d/*+.]/g, ""));
}

document.addEventListener("keyup", function (event) {
  optionRules(`${event.key}`);

  let usables = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  if (`${event.key}` === ".") {
    avoidDoublePoint();
  }

  if (
    `${event.key}` === "+" ||
    `${event.key}` === "-" ||
    `${event.key}` === "*" ||
    `${event.key}` === "/" ||
    `${event.key}` === "Enter" ||
    `${event.key}` === "="
  ) {
    avoidDoubleSymbols(`${event.key}`);
  }

  if (usables.includes(`${event.key}`)) {
    currentCalc.innerText += `${event.key}`;
  }
});

for (let index = 0; index < options.length; index++) {
  const option = options[index];
  option.onclick = (e) => {
    let btn = e.target;
    optionRules(btn.innerText);
    if (btn.innerText === ".") {
      avoidDoublePoint();
    }
    if (
      btn.innerText === "+" ||
      btn.innerText === "-" ||
      btn.innerText === "*" ||
      btn.innerText === "/" ||
      btn.innerText === "="
    ) {
      avoidDoubleSymbols(btn.innerText);
    }
    if (
      btn.innerText !== "CA" &&
      btn.innerText !== "Del" &&
      btn.innerText !== "." &&
      btn.innerText !== "+" &&
      btn.innerText !== "-" &&
      btn.innerText !== "*" &&
      btn.innerText !== "/" &&
      btn.innerText !== "="
    ) {
      currentCalc.innerText += btn.innerText;
    }
  };
}
