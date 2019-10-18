function add(x, y) {
    return Number(x) + Number(y);
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    if (y === 0) return "inf";
    return Math.round(x / y * 1e5) / 1e5;
}

function operate(sign, x, y) {
    switch (sign) {
        case '+':
            return add(x, y);
        case '-':
            return subtract(x, y);
        case '*':
            return multiply(x, y);
        case '/':
            return divide(x, y);
    }
}

function process(command) {
    if (/^\d+(\.\d+)?$/.test(command)) {
        return command;
    } else if (/^\d+(\.\d+)?([+\-*\/]\d+(\.\d+)?)*?$/.test(command)) {
        let matches1 = command.match(/\d+(\.\d+)?[*\/]\d+(\.\d+)?/);
        if (matches1) {
            let match1 = matches1[0];
            let operands = match1.match(/\d+(\.\d+)?/g);
            return process(command.replace(match1, operate(
                match1.match(/[*\/]/)[0],
                operands[0], operands[1])));
        }
        let matches2 = command.match(/\d+(\.\d+)?[+\-]\d+(\.\d+)?/);
        if (matches2) {
            let match2 = matches2[0];
            let operands = match2.match(/\d+(\.\d+)?/g);
            return process(command.replace(match2, operate(
                match2.match(/[+\-]/)[0],
                operands[0], operands[1])));
        }
    } else return "Invalid eq'n";
}

function enter(input) {
    if (displayDiv.textContent.length < 16)
        displayDiv.textContent += input;
}

function calculate() {
    displayDiv.textContent = process(displayDiv.textContent);
}

function clear() {
    displayDiv.textContent = "";
}

function backspace() {
    let displayText = displayDiv.textContent;
    displayDiv.textContent = displayText.substring(0, displayText.length - 1);
}

let displayDiv = document.querySelector("#display");
let inputButtons = document.querySelectorAll(".number, .sign");

function initialise() {
    displayDiv.textContent = "";
    inputButtons.forEach((button) => {
        button.addEventListener("click", (e) => enter(e.target.textContent));
    });
    document.querySelector("#equals").addEventListener("click", calculate);
    document.querySelector("#clear").addEventListener("click", clear);
    document.querySelector("#back").addEventListener("click", backspace);

    window.addEventListener("keydown", (e) => {
        switch (e.key) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '+':
            case '-':
            case '*':
            case '/':
                enter(e.key);
                break;
            case 'Enter':
            case '=':
                calculate();
                break;
            case 'c':
                clear();
                break;
            case 'Backspace':
                backspace();
                break;
        }
    });
}

initialise();