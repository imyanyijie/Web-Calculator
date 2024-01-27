const negButton = document.querySelector("#negtive");
const percButton = document.querySelector("#percent");
const equalButton = document.querySelector("#equal");
const clearButton = document.querySelector("#ac");

const numDisplay = document.querySelector(".display");

const operateButtons = document.querySelectorAll(".operate");
const numButtons = document.querySelectorAll(".num");

let currSum = 0;
let currOperator = '';

appendFlag = true;

function add(x,y){
    return x+y;
}

function subtract(x,y){
    return x-y;
}

function divide(x,y){
    return x/y;
}

function multiply(x,y){
    return x*y;
}

function operate(operator,x,y){
    x = Number(x);
    y = Number(y);
    switch(operator) {
        case '+':
            return add(x,y);
        case '-':
            return subtract(x,y);
        case '/':
            return divide(x,y);
        case '*':
            return multiply(x,y);
        default:
            alert('Not a valide operation');
    }
}
//TODO: Maybe limit the number of digit that can be displayed
function display(text,){
    if(appendFlag){
        if(!numDisplay.textContent.includes(".")||text !=="."){
            numDisplay.append(text);
        }
    }
    else{
        numDisplay.textContent = text;
    }

}

//track state of operation
function operation(){
    appendFlag=false;
    //if first time seen a operator
    if(currOperator===''){
        currSum = numDisplay.textContent;
        currOperator = this.textContent;
    }
    else if(this.textContent==='=') {
        let y = numDisplay.textContent;
        let result = operate(currOperator,currSum,y);
        currSum = result;
        //set curr operation as empty since we complete this iter of operation
        currOperator = "";
        display(result);
    }
    //nested operation
    else{
        let y = numDisplay.textContent;
        let result = operate(currOperator,currSum,y);
        currSum = result;
        display(result);
        currOperator = this.textContent;
        appendFlag = false;
    }
}

function clear(){
    numDisplay.textContent = "";
    currSum=0;
    currOperator ='';
}
function percentage(){
    numDisplay.textContent = numDisplay.textContent/100;
}


numButtons.forEach((btn) =>{
   btn.addEventListener("click",(e)=>{
    display(e.target.textContent)
    if(!appendFlag)
    appendFlag=true;
   });
});

operateButtons.forEach((btn) =>{
   btn.addEventListener("click",operation);
});

clearButton.addEventListener("click",clear);

negButton.addEventListener("click",(e)=>{
    numDisplay.textContent = -numDisplay.textContent;
 });
 
percButton.addEventListener("click",percentage);




