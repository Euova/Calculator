function add(num1, num2){
    return (num1) + (num2);
}

function subtract(num1, num2){
    return (num1) - (num2);
}

function multiply(num1, num2){
    return (num1) * (num2);
}

function divide(num1, num2){
    return (num1) / (num2);
}

function operate(num1, num2, operator){
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch(operator){
        case '+':
            return add(num1,num2);
            break;
        case '-':
            return subtract(num1,num2);
            break;
        case '*':
            return multiply(num1,num2);
            break;
        case '/':
            return divide(num1,num2);
            break;
    }
}

function appendNum(temp){
    if (currentScreen.textContent == "0" || reset){
        clearScreen();
    }
    currentScreen.textContent += temp;
}

function appendDecimal(){
    if (reset){
        clearScreen();
    }
    if (currentScreen.textContent == ""){
        currentScreen.textContent = "0";
    }
    if (currentScreen.textContent.includes(".")){
        return;
    }
    currentScreen.textContent += ".";
}

function startOperation(operator){
    if (operator != ""){
        evaluate(); 
    }
    operandOne = currentScreen.textContent;
    currentOperator = operator;
    finalScreen.textContent = `${operandOne} ${currentOperator}`;
    reset = true;
}

function evaluate(){
    if (currentOperator == "" || reset){
        return;
    }
    if (currentOperator == "/" && currentScreen.textContent == "0"){
        alert("Dividing by 0 is not allowed!");
        return;
    }
    operandTwo = currentScreen.textContent;
    currentScreen.textContent = operate(operandOne, operandTwo, currentOperator);
    finalScreen.textContent = `${operandOne} ${currentOperator} ${operandTwo} =`; 
    currentOperator = "";
}

function clearScreen(){
    currentScreen.textContent = "";
    reset = false;
}

function clearAll(){
    currentScreen.textContent = "0";
    finalScreen.textContent = "";
    currentOperator = "";
    operandOne = "";
    operandTwo = "";

}


function deleteNumber (){
    if (currentScreen.textContent == "0"){
        return;
    }
    currentScreen.textContent = currentScreen.textContent.slice(0, -1);
    if (currentScreen.textContent == ""){
        currentScreen.textContent += "0";
        return;
    }
}

function keyboardSupport(e){
    if (e.key >= 0 && e.key <= 9){
        appendNum(e.key);
    }
    if (e.key == "+" || e.key == "-" || e.key == "*" || e.key == "/"){
        startOperation(e.key);
    }
    if (e.key == "."){
        appendDecimal();
    }
    if (e.key == "=" || e.key == "Enter"){
        evaluate();
    }
    if (e.key == "Backspace" || e.key == "Delete"){
        deleteNumber();
    }
    if (e.key == "Escape"){
        clearAll();
    }
}

let operandOne = "";
let operandTwo = "";
let currentOperator = "";
let reset = false;
const currentScreen = document.getElementById("current");
const finalScreen = document.getElementById("old");
const numberBtns = document.querySelectorAll(".digit");
const operatorBtns = document.querySelectorAll(".operator");
const equalBtn = document.getElementById("equal");
const clearBtn = document.getElementById("clr");
const deleteBtn = document.getElementById("del");
const decimalBtn = document.getElementById("decimal");
window.addEventListener("keydown", keyboardSupport);

numberBtns.forEach((button) =>  
    button.addEventListener("click", () => appendNum(button.textContent))
)

operatorBtns.forEach((button) =>
    button.addEventListener("click", () => startOperation(button.textContent))
)

equalBtn.addEventListener("click", evaluate);
clearBtn.addEventListener("click", clearAll);
deleteBtn.addEventListener("click", deleteNumber);
decimalBtn.addEventListener("click", appendDecimal);
