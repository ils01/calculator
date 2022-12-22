function add(a, b){
    let res = a + b;
    return Math.round(res * 1000) / 1000;
}
function substract(a, b){
    let res = a - b;
    return Math.round(res * 1000) / 1000;
}
function multiply(a, b){
    let res = a * b;
    return Math.round(res * 1000) / 1000;
}
function divide(a,b){
    if(b) {
        let res = a / b;
        return Math.round(res * 1000) / 1000;
    }
    else return "Oopsy!";
}

function operate(operator, a, b){
    if(typeof a !== "number" || typeof b !== "number") return "wrong type";
    if(operator === "+") return add(a,b);
    else if(operator === "-") return substract(a,b);
    else if (operator === "*") return multiply(a,b);
    else if(operator === "/") return divide(a,b);
    else return "wrong operator";
}

function nullEverything(){
    displayText.innerText='0';
    firstNumber = null;
    secondNumber = null;
    operator = null;
    flagTypingNum = false;
    dotDisabled = false;
}

function pressC(){
    if(displayText.innerText.length === 1){
        nullEverything();
    }else{
        displayText.innerText = displayText.innerText.substring(0, displayText.innerText.length - 1);
    }
}

function displayOperator(key){
    operator = key.innerText;
    displayText.innerText = key.innerText;
    dotDisabled = false;
}

function addNumber(key){
    if(!flagTypingNum){
        displayText.innerText = '';
        flagTypingNum = true;
    }
    if(key.id === "dot"){
        if(displayText.innerText.indexOf(".") === -1) dotDisabled = false;
        if(!dotDisabled){
            displayText.innerText += key.innerText;
            dotDisabled = true;
        }
    }else{
        displayText.innerText += key.innerText;
    }
}

let displayText = document.getElementById('displayText');
let firstNumber;
let secondNumber;
let operator;
let flagTypingNum;
let dotDisabled;
nullEverything();

document.querySelectorAll('.key').forEach(key => {
    key.addEventListener("click", function(){
        //AC clears everything
        if(key.id === "ac"){
            nullEverything();
        }
        //C deletes 1 symbol
        else if(key.id === "c" && !isNaN(displayText.innerText)){
            pressC();
        }
        //in the beginning, after AC or if C deleted the only left number
        else if (firstNumber === null){
            if(key.classList.contains('number')){
                addNumber(key);
            }
            else if(key.classList.contains('sign') && key.id !== "equals"){
                firstNumber = Number(displayText.innerText);
                displayOperator(key);
                flagTypingNum = false;
            }
       }
       //after firstNumber and operator is set
       else if (secondNumber === null && operator !== null){
            if(key.classList.contains('sign') && !isNaN(displayText.innerText) && flagTypingNum){
                    secondNumber = Number(displayText.innerText)
                    displayText.innerText = operate(operator,firstNumber,secondNumber);
                    firstNumber = Number(displayText.innerText);
                    secondNumber = null;
                    flagTypingNum = false;
                    dotDisabled = false;
                    if(key.id === 'equals') operator = null;
                    else operator = key.innerText;
            }
            else if(key.classList.contains('sign') && !flagTypingNum){
                displayOperator(key);
            }
            else if(key.classList.contains('number')){
                addNumber(key);
            }
       }
       //after '='
       else if (secondNumber === null && operator === null){
        if(key.classList.contains('number')){
            addNumber(key);
        }
        else if(key.classList.contains('sign') && key.id !== "equals"){
                firstNumber = Number(displayText.innerText);
                displayOperator(key);
                secondNumber = null;
                flagTypingNum = false;
        }
       }
    });
})