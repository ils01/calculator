function add(a, b){
    return a + b;
}
function substract(a, b){
    return a - b;
}
function multiply(a, b){
    return a * b;
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

let displayText = document.getElementById('displayText');
let firstNumber = null;
let secondNumber = null;
let operator = null;
let flagTypingNum = false;

document.querySelectorAll('.key').forEach(key => {
    key.addEventListener("click", function(){
        if(key.id === "ac"){
            displayText.innerText='0';
            firstNumber = null;
            secondNumber = null;
            operator = null;
            flagTypingNum = false;
        }
        else if (firstNumber === null){
            if(key.classList.contains('number')){
                if(displayText.innerText === '0'){
                    displayText.innerText = '';
                    flagTypingNum = true;
                }
                displayText.innerText += key.innerText;
            }
            else if(key.classList.contains('sign') && key.id !== "equals"){
                firstNumber = Number(displayText.innerText);
                operator = key.innerText;
                displayText.innerText = key.innerText;
                flagTypingNum = false;
            }
       }
       else if (secondNumber === null && operator !== null){
            if(key.classList.contains('sign') && !isNaN(displayText.innerText) && flagTypingNum){
                    secondNumber = Number(displayText.innerText)
                    displayText.innerText = operate(operator, firstNumber,secondNumber);
                    firstNumber = Number(displayText.innerText);
                    secondNumber = null;
                    flagTypingNum = false;
                    if(key.id === 'equals') operator = null;
                    else operator = key.innerText;
            }
            else if(key.classList.contains('sign') && isNaN(displayText.innerText) && !flagTypingNum){
                operator = key.innerText;
                displayText.innerText = operator;
            }
            else if(key.classList.contains('number')){
                if(!flagTypingNum){
                    displayText.innerText = '';
                    flagTypingNum = true;
                }
                displayText.innerText += key.innerText;
            }
       }
       else if (secondNumber === null && operator === null){
        if(key.classList.contains('number')){
            if(!flagTypingNum){
                displayText.innerText = '';
                flagTypingNum = true;
            }
            firstNumber = null;
            displayText.innerText += key.innerText;
        }
        else if(key.classList.contains('sign') && key.id !== "equals"){
                console.log('here');
                console.log(key.innerText);
                operator = key.innerText;
                displayText.innerText = operator;
                secondNumber = null;
                flagTypingNum = false;
        }
       }
       console.log("first " + firstNumber)
       console.log("oper " + operator)
       console.log("second " + secondNumber)
       console.log('flagTypingNum ' + flagTypingNum)
    })
})