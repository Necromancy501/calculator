// Constants for sketch layout.
const BUTTONS_WIDTH = 4;
const BUTTONS_HEIGHT = 4;
const BUTTONS_BOTTOM = 3;

// Selecting buttons container element
const buttonsContainer = document.querySelector(".buttons-container");
buttonsContainer.style.display = "flex";
buttonsContainer.style.flexFlow = "column wrap";
buttonsContainer.style.gap = "25px";
buttonsContainer.style.alignItems = 'stretch';
buttonsContainer.style.padding = '40px';
buttonsContainer.style.justifyContent = 'center';

// Stickers for buttons
let stickersCounter = 0;
const stickers = ['C','DEL','←','→','7','8','9','/%','4','5','6','**','1', '2', '3', '+-', "DOT", "0", "="];

// Creating buttons inside buttons container
for (i=0; i<BUTTONS_HEIGHT; i++){

    //Creating and styling the row container
    const buttonsRow = document.createElement("div");
    buttonsRow.style.display = "flex";
    buttonsRow.style.flexFlow = "row nowrap";
    buttonsRow.style.gap = "30px";
    buttonsRow.style.justifyContent = "space-between";
    buttonsRow.style.alignItems = "center";
    buttonsRow.style.flex = "0, 1, auto";

    for (n=0; n<BUTTONS_WIDTH; n++){
        // Creation of the buttons
        const button = document.createElement("button");
        button.dataset.position = `${n},${i}`;
        button.dataset.label = `${stickers[stickersCounter]}`
        button.textContent = stickers[stickersCounter++];

        // Styling of the buttons
        button.style.margin = "0px";
        button.style.borderRadius = "40px";
        button.style.width = "80px";
        button.style.height = "80px";
        button.style.fontSize = "27px";
        button.style.flex = "1, 1, auto";
        button.style.border = "8px solid #374b43";

        // Arrow specifics
        if (button.textContent == "→" || button.textContent == "←"){
            button.style.fontSize = "40px";
            button.style.fontWeight = "bold";
        }

        buttonsRow.appendChild(button);
    }
    buttonsContainer.appendChild(buttonsRow);
}

// Creating last row of buttons

//Creating and styling the row container
const buttonsLastRow = document.createElement("div");
buttonsLastRow.style.display = "flex";
buttonsLastRow.style.flexFlow = "row nowrap";
buttonsLastRow.style.gap = "29px";
buttonsLastRow.style.justifyContent = "space-between";
buttonsLastRow.style.alignItems = "center";
buttonsLastRow.style.flex = "0, 1, auto";

for (a=0;a<BUTTONS_BOTTOM;a++){

    // Creation of the buttons
    const button = document.createElement("button");
    button.dataset.position = `${4},${a}`;
    button.textContent = stickers[stickersCounter++];

    // Styling of the buttons
    button.style.margin = "0px";
    button.style.borderRadius = "40px";
    button.style.width = "120px";
    button.style.height = "80px";
    button.style.fontSize = "27px";
    button.style.flex = "1, 1, auto";
    button.style.border = "8px solid #374b43";

    // Equal Specifics
    if (button.textContent == '='){
        button.style.fontSize = "40px";
    }

    buttonsLastRow.appendChild(button);
}

buttonsContainer.appendChild(buttonsLastRow);



