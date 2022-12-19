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
    if(b) return a / b;
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
let flag = false;
document.querySelectorAll('.key').forEach(key => {
    key.addEventListener("click", function(){
        if (firstNumber === null){
            if(key.classList.contains('number')){
                if(displayText.innerText === '0'){
                    displayText.innerText = '';
                }
                displayText.innerText += key.innerText;
            }
            else if(key.classList.contains('sign') && key.innerText !== "="){
                firstNumber = Number(displayText.innerText);
                operator = key.innerText;
                displayText.innerText = key.innerText;
            }
       }
       else if (secondNumber === null && operator !== null){
            if(key.classList.contains('number')){
                if(displayText.innerText.length === 1 && !flag){
                    displayText.innerText = '';
                    flag = true;
                }
                displayText.innerText += key.innerText;
            }
            else if(key.classList.contains('sign')){
                secondNumber = Number(displayText.innerText)
                displayText.innerText = operate(operator, firstNumber,secondNumber);
                firstNumber = Number(displayText.innerText);
                operator = null;
                secondNumber = null;
                flag = false;
            }
       }
       else if (secondNumber === null && operator === null){
        if(key.classList.contains('number')){
            if(!flag){
                displayText.innerText = '';
                flag = true;
            }
            displayText.innerText += key.innerText;
        }
        else if(key.classList.contains('sign')){
                operator = key.innerText;
                secondNumber = Number(displayText.innerText);
                displayText.innerText = operate(operator,firstNumber,secondNumber);
                firstNumber = Number(displayText.innerText);
                operator = null;
                secondNumber = null;
                flag = false;
        }
       }
       
    })
})