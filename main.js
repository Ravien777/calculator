const currentCalc = document.getElementById("currentCalc");
const previousCalc = document.getElementById("previousCalc");
const options = Array.from(document.querySelectorAll(".options"));

function optionRules(inputGiven) {
  if (currentCalc.innerText === "0" || currentCalc.innerText === "") {
    currentCalc.innerText = "";
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

function operate() {}

document.addEventListener("keyup", function (event) {
  optionRules(`${event.key}`);

  let usables = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "-",
    "+",
    "=",
    "/",
    "(",
    ")",
    "*",
    "%",
    "^",
    ".",
  ];

  if (usables.includes(`${event.key}`)) {
    currentCalc.innerText += `${event.key}`;
  }

  operate();
});

for (let index = 0; index < options.length; index++) {
  const option = options[index];
  option.onclick = (e) => {
    let btn = e.target;
    optionRules(btn.innerText);
    if (btn.innerText !== "CA" && btn.innerText !== "Del") {
      currentCalc.innerText += btn.innerText;
    }
  };
  operate();
}
