// Main Listener Function
function inputHandler(label) {
  let sliceIndex = stringDisplay.length + cursorCounter;
  symbols = ["C", "DEL", "<=", "=>", "/%", "*^", "+-", "=", ".", "( )"];
  let equalSignPressed = false;

  if (symbols.includes(label)) {
    switch (label) {
      case "C":
        stringDisplay = "";
        cursorCounter = 0;
        break;
      case "DEL":
        if (!(cursorCounter === stringDisplay.length * -1)) {
          stringDisplay =
            stringDisplay.slice(0, sliceIndex - 1) +
            stringDisplay.slice(sliceIndex);
        }
        break;
      case "<=":
        if (cursorCounter === stringDisplay.length * -1) {
          cursorCounter = 0;
        } else {
          cursorCounter--;
        }
        break;
      case "=>":
        if (cursorCounter === 0) {
          cursorCounter = stringDisplay.length * -1;
        } else {
          cursorCounter++;
        }
        break;
      case "/%":
        if (!(cursorCounter === stringDisplay.length * -1)) {
          if (stringDisplay[sliceIndex - 1] === "/") {
            stringDisplay =
              stringDisplay.slice(0, sliceIndex - 1) +
              stringDisplay.slice(sliceIndex);
            let stringArray = stringDisplay.split("");
            stringArray.splice(sliceIndex - 1, 0, "%");
            stringDisplay = stringArray.join("");
          } else if (stringDisplay[sliceIndex - 1] === "%") {
            stringDisplay =
              stringDisplay.slice(0, sliceIndex - 1) +
              stringDisplay.slice(sliceIndex);
          } else {
            stringDisplay =
              stringDisplay.slice(0, sliceIndex) +
              stringDisplay.slice(sliceIndex);
            let stringArray = stringDisplay.split("");
            stringArray.splice(sliceIndex, 0, "/");
            stringDisplay = stringArray.join("");
          }
        } else {
          let stringArray = stringDisplay.split("");
          stringArray.splice(sliceIndex, 0, "/");
          stringDisplay = stringArray.join("");
        }
        break;
      case "/%":
        if (!(cursorCounter === stringDisplay.length * -1)) {
          if (stringDisplay[sliceIndex - 1] === "/") {
            stringDisplay =
              stringDisplay.slice(0, sliceIndex - 1) +
              stringDisplay.slice(sliceIndex);
            let stringArray = stringDisplay.split("");
            stringArray.splice(sliceIndex - 1, 0, "%");
            stringDisplay = stringArray.join("");
          } else if (stringDisplay[sliceIndex - 1] === "%") {
            stringDisplay =
              stringDisplay.slice(0, sliceIndex - 1) +
              stringDisplay.slice(sliceIndex);
          } else {
            stringDisplay =
              stringDisplay.slice(0, sliceIndex) +
              stringDisplay.slice(sliceIndex);
            let stringArray = stringDisplay.split("");
            stringArray.splice(sliceIndex, 0, "/");
            stringDisplay = stringArray.join("");
          }
        } else {
          let stringArray = stringDisplay.split("");
          stringArray.splice(sliceIndex, 0, "/");
          stringDisplay = stringArray.join("");
        }
        break;
      case "+-":
        if (!(cursorCounter === stringDisplay.length * -1)) {
          if (stringDisplay[sliceIndex - 1] === "+") {
            stringDisplay =
              stringDisplay.slice(0, sliceIndex - 1) +
              stringDisplay.slice(sliceIndex);
            let stringArray = stringDisplay.split("");
            stringArray.splice(sliceIndex - 1, 0, "-");
            stringDisplay = stringArray.join("");
          } else if (stringDisplay[sliceIndex - 1] === "-") {
            stringDisplay =
              stringDisplay.slice(0, sliceIndex - 1) +
              stringDisplay.slice(sliceIndex);
          } else {
            stringDisplay =
              stringDisplay.slice(0, sliceIndex) +
              stringDisplay.slice(sliceIndex);
            let stringArray = stringDisplay.split("");
            stringArray.splice(sliceIndex, 0, "+");
            stringDisplay = stringArray.join("");
          }
        } else {
          let stringArray = stringDisplay.split("");
          stringArray.splice(sliceIndex, 0, "+");
          stringDisplay = stringArray.join("");
        }
        break;
      case "*^":
        if (!(cursorCounter === stringDisplay.length * -1)) {
          if (stringDisplay[sliceIndex - 1] === "*") {
            stringDisplay =
              stringDisplay.slice(0, sliceIndex - 1) +
              stringDisplay.slice(sliceIndex);
            let stringArray = stringDisplay.split("");
            stringArray.splice(sliceIndex - 1, 0, "^");
            stringDisplay = stringArray.join("");
          } else if (stringDisplay[sliceIndex - 1] === "^") {
            stringDisplay =
              stringDisplay.slice(0, sliceIndex - 1) +
              stringDisplay.slice(sliceIndex);
          } else {
            stringDisplay =
              stringDisplay.slice(0, sliceIndex) +
              stringDisplay.slice(sliceIndex);
            let stringArray = stringDisplay.split("");
            stringArray.splice(sliceIndex, 0, "*");
            stringDisplay = stringArray.join("");
          }
        } else {
          let stringArray = stringDisplay.split("");
          stringArray.splice(sliceIndex, 0, "*");
          stringDisplay = stringArray.join("");
        }
        break;
      case "( )":
        if (!(cursorCounter === stringDisplay.length * -1)) {
          if (stringDisplay[sliceIndex - 1] === "(") {
            stringDisplay =
              stringDisplay.slice(0, sliceIndex - 1) +
              stringDisplay.slice(sliceIndex);
            let stringArray = stringDisplay.split("");
            stringArray.splice(sliceIndex - 1, 0, ")");
            stringDisplay = stringArray.join("");
          } else if (stringDisplay[sliceIndex - 1] === ")") {
            stringDisplay =
              stringDisplay.slice(0, sliceIndex - 1) +
              stringDisplay.slice(sliceIndex);
          } else {
            stringDisplay =
              stringDisplay.slice(0, sliceIndex) +
              stringDisplay.slice(sliceIndex);
            let stringArray = stringDisplay.split("");
            stringArray.splice(sliceIndex, 0, "(");
            stringDisplay = stringArray.join("");
          }
        } else {
          let stringArray = stringDisplay.split("");
          stringArray.splice(sliceIndex, 0, "(");
          stringDisplay = stringArray.join("");
        }
        break;
      case ".":
        if (stringDisplay[sliceIndex - 1] === ".") {
          stringDisplay =
            stringDisplay.slice(0, sliceIndex - 1) +
            stringDisplay.slice(sliceIndex);
        } else {
          stringDisplay =
            stringDisplay.slice(0, sliceIndex) +
            stringDisplay.slice(sliceIndex);
          let stringArray = stringDisplay.split("");
          stringArray.splice(sliceIndex, 0, ".");
          stringDisplay = stringArray.join("");
        }
        break;
      case "=":
        stringDisplay = smallDisplay.textContent;
        smallDisplay.textContent = "";
        equalSignPressed = true;
    }
  } else {
    let stringArray = stringDisplay.split("");
    stringArray.splice(sliceIndex, 0, label);
    stringDisplay = stringArray.join("");
  }

  if (!equalSignPressed) {
    smallDisplay.textContent = mathParser(stringDisplay);
  }
  updateDisplayWithCursor();
}

// Cursor handler
function updateDisplayWithCursor() {
  let cursorIndex = stringDisplay.length + cursorCounter;
  let displayWithCursor =
    stringDisplay.slice(0, cursorIndex) +
    "_" +
    stringDisplay.slice(cursorIndex);
  displayOnPage.textContent = displayWithCursor;
}

// IMPLEMENTING CALCULATOR LOGIC

// Constants for sketch layout.
const BUTTONS_WIDTH = 4;
const BUTTONS_HEIGHT = 4;
const BUTTONS_BOTTOM = 2;
const ROWS_BOTTOM = 2;

// Selecting buttons container element
const buttonsContainer = document.querySelector(".buttons-container");

// Stickers for buttons
let stickersCounter = 0;
const stickers = [
  "C",
  "DEL",
  "<=",
  "=>",
  "7",
  "8",
  "9",
  "/%",
  "4",
  "5",
  "6",
  "*^",
  "1",
  "2",
  "3",
  "+-",
  "0",
  "( )",
  ".",
  "=",
];

// Creating buttons inside buttons container
for (i = 0; i < BUTTONS_HEIGHT; i++) {
  //Creating and styling the row container
  const buttonsRow = document.createElement("div");
  buttonsRow.style.display = "flex";
  buttonsRow.style.flexFlow = "row nowrap";
  buttonsRow.style.gap = "20px";
  buttonsRow.style.justifyContent = "space-between";
  buttonsRow.style.alignItems = "center";
  buttonsRow.style.flex = "0, 1, auto";

  for (n = 0; n < BUTTONS_WIDTH; n++) {
    // Creation of the buttons
    const button = document.createElement("button");
    button.dataset.position = `${n},${i}`;
    button.dataset.label = `${stickers[stickersCounter]}`;
    button.textContent = stickers[stickersCounter++];

    // Styling of the buttons
    button.style.margin = "0px";
    button.style.borderRadius = "40px";
    button.style.width = "60px";
    button.style.height = "60px";
    button.style.fontSize = "17px";
    button.style.flex = "1, 1, auto";
    button.style.border = "8px solid #374b43";

    buttonsRow.appendChild(button);
  }
  buttonsContainer.appendChild(buttonsRow);
}

// Layout of the last two rows

for (z = 0; z < ROWS_BOTTOM; z++) {
  const buttonsLastRow = document.createElement("div");

  //Creating and styling the row container
  if (z == 0) {
    buttonsLastRow.style.display = "flex";
    buttonsLastRow.style.flexFlow = "row nowrap";
    buttonsLastRow.style.gap = "20px";
    buttonsLastRow.style.justifyContent = "space-evenly";
    buttonsLastRow.style.alignItems = "center";
    buttonsLastRow.style.flex = "0, 1, auto";
  } else {
    buttonsLastRow.style.display = "flex";
    buttonsLastRow.style.flexFlow = "row nowrap";
    buttonsLastRow.style.gap = "20px";
    buttonsLastRow.style.justifyContent = "space-between";
    buttonsLastRow.style.alignItems = "center";
    buttonsLastRow.style.flex = "0, 1, auto";
  }

  for (a = 0; a < BUTTONS_BOTTOM; a++) {
    // Creation of the buttons
    const button = document.createElement("button");
    button.dataset.position = `${z + 4},${a}`;
    button.dataset.label = `${stickers[stickersCounter]}`;
    button.textContent = stickers[stickersCounter++];

    // Styling of the buttons

    switch (button.textContent) {
      case "0":
        button.style.margin = "0px";
        button.style.borderRadius = "40px";
        button.style.width = "223px";
        button.style.height = "50px";
        button.style.fontSize = "17px";
        button.style.flex = "1, 1, auto";
        button.style.border = "8px solid #374b43";
        break;
      case "( )":
        button.style.margin = "0px";
        button.style.borderRadius = "40px";
        button.style.width = "60px";
        button.style.height = "60px";
        button.style.fontSize = "17px";
        button.style.flex = "1, 1, auto";
        button.style.border = "8px solid #374b43";
        break;
      case ".":
        button.style.margin = "0px";
        button.style.borderRadius = "40px";
        button.style.width = "70px";
        button.style.height = "50px";
        button.style.fontSize = "20px";
        button.style.flex = "1, 1, auto";
        button.style.border = "8px solid #374b43";
        button.style.fontWeight = "bold";
        break;
      case "=":
        button.style.margin = "0px";
        button.style.borderRadius = "40px";
        button.style.width = "210px";
        button.style.height = "50px";
        button.style.fontSize = "30px";
        button.style.flex = "1, 1, auto";
        button.style.border = "8px solid #374b43";
        break;
    }
    buttonsLastRow.appendChild(button);
  }

  // Buttons get loaded into the DOM
  buttonsContainer.appendChild(buttonsLastRow);
}

// Input behavior for buttons

const buttonsOnPage = document.querySelector(".buttons-container");
const displayOnPage = document.querySelector(".display-top");
const resultDisplayOnPage = document.querySelector(".display-bottom");

let stringDisplay = "";
let cursorCounter = 0;

// Small display getter

const smallDisplay = document.querySelector(".display-bottom");

buttonsOnPage.addEventListener("click", (e) => {
  if (e.target.dataset.label) {
    inputHandler(e.target.dataset.label);
  }
});
