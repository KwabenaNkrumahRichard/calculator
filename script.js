const btn = document.querySelector(".buttons");
const bottomDisplay = document.querySelector(".content");
const clearLast = document.querySelector(".c");
const clearAll = document.querySelector(".ac");
const operators = document.querySelectorAll(".operator");
const topDisplay = document.querySelector(".top");
const equalsbtn = document.querySelector(".equal");
const operatorDisplay = document.querySelector(".operator-display");
const negativePositiveBtn = document.querySelector(".neg-po");

let previousNumber, operator, newNumber, value;
let equalsBtnClicked = false;

function compute(operator) {
  newNumber = bottomDisplay.textContent;

  switch (operator) {
    case "×":
      value = +previousNumber * +newNumber;
      break;
    case "-":
      value = +previousNumber - +newNumber;
      break;
    case "÷":
      value = +newNumber === 0 ? "ERR" : +previousNumber / +newNumber;
      break;
    case "+":
      value = +previousNumber + +newNumber;
      break;
    default:
      return;
  }
  bottomDisplay.textContent = value;
}

const deleteAll = function () {
  bottomDisplay.textContent = "";
  topDisplay.textContent = "";
  previousNumber = "";
  newNumber = "";
  operator = "";
  operatorDisplay.textContent = "";
};

const deleteLastNumber = function () {
  bottomDisplay.textContent = bottomDisplay.textContent.slice(0, -1);
};

const equalsTo = function () {
  compute(operator);

  topDisplay.textContent = "";
  operator = "";
  newNumber = "";
  previousNumber = "";

  operatorDisplay.textContent = "=";
};

const displayNumber = function (e) {
  let num = e.target;

  if (!num.classList.contains("num")) return;
  if (
    (bottomDisplay.textContent.includes(".") && num.textContent === ".") ||
    (bottomDisplay.textContent === "" && num.textContent === ".")
  )
    return;

  bottomDisplay.textContent += num.textContent;
};

const operatorOnClick = function (op) {
  if (
    bottomDisplay.textContent === "" &&
    op.textContent &&
    topDisplay.textContent === ""
  )
    return;
  if (operator) compute(operator);

  topDisplay.textContent = bottomDisplay.textContent;
  bottomDisplay.textContent = "";
  previousNumber = topDisplay.textContent;
  operator = op.textContent;

  operatorDisplay.textContent = operator;
};

const negativePositive = function () {
  if (bottomDisplay.textContent === "") return;

  bottomDisplay.textContent = bottomDisplay.textContent.includes("-")
    ? bottomDisplay.textContent.slice(1)
    : `-${bottomDisplay.textContent}`;
};

const init = function () {
  clearAll.addEventListener("click", deleteAll);

  clearLast.addEventListener("click", deleteLastNumber);

  btn.addEventListener("click", displayNumber.bind(btn));

  operators.forEach((op) =>
    op.addEventListener("click", operatorOnClick.bind(this, op))
  );

  equalsbtn.addEventListener("click", equalsTo);

  negativePositiveBtn.addEventListener("click", negativePositive);
};

init();
