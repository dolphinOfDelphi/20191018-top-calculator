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

let displayDiv = document.querySelector("#display");
let inputButtons = document.querySelectorAll(".number, .sign");
inputButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        displayDiv.textContent += e.target.textContent;
    });
});
document.querySelector("#equals").addEventListener("click", () => {
    displayDiv.textContent = process(displayDiv.textContent);
});
document.querySelector("#clear").addEventListener("click", () => {
    displayDiv.textContent = "";
});
document.querySelector("#back").addEventListener("click", () => {
    let displayText = displayDiv.textContent;
    displayDiv.textContent = displayText.substring(0, displayText.length - 1);
});