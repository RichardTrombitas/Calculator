window.onload = function(){
    var buttons = document.getElementsByClassName("button");
    for (el of buttons) {

        // make the button text unselectable
        el.style="-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;-o-user-select:none;" 
        el.unselectable="on"
        el.onselectstart="return false;" 
        el.onmousedown="return false;"

        // register button clicks
        el.onmousedown = registerKey;
    }
}

// updates the calculator screen with the specified result and changes the font
// of the text to make it fit
function updateResult(res)
{
    var resultElement = document.getElementById("result"); // calculator screen
    resultElement.innerHTML = res;
    len = resultElement.innerHTML.length;
    if(len >= 10 && len < 13)
    {
        newSize = 44-len-4;
        resultElement.style.fontSize = newSize+"px";
    }
    else if(len >= 13 && len < 18)
    {
        newSize = 44-len-6;
        resultElement.style.fontSize = newSize+"px";
    }
    else if(len >= 18 && len < 21)
    {
        resultElement.style.fontSize = "17.5px";
    }
    else if(len >= 21 && len < 23)
    {
        resultElement.style.fontSize = "16px";
    }
    else if(len>=23)
    {
        resultElement.style.fontSize = "15.5px";
    }
    else
    {
        resultElement.style.fontSize = "35px";
    }
}

// the array in which we store the operations that need to be executed
var operationsArray = ["0"];

// keeps track of the need for displaying 0
var showZero = true;

// if it is false, the screen content will be overwritten 
// (happens after a result is shown and the user enters a value)
var separateItem = true; 

// keeps track of the item's type: either an user-entered value or a computed result
var calculatedResult = false;

// these two variables are used for the automatic computation that takes place when
// the equality symbol is pressed after an operation is executed
var lastOperator = "";
var lastNumber = "";

// resets the calculator
function reset(){
    operationsArray = ["0"];
    updateResult("0");
    showZero = true;
    separateItem = true;
    calculatedResult = false;
    lastOperator = "";
    lastNumber = "";
}

// does the required action based on the type of button pressed
function registerKey(eventObject) {    
    key = eventObject.target.innerHTML; //the key that was pressed

    if(key=="C")
    {
        reset();
    }
    else if (key=="DEL")
    {
        pos = operationsArray.length-1;
        str = operationsArray[pos];
        if(typeof str == "number")
        {
            // do nothing
        }
        else
        {
            if(pos==0 && str.length==1)
            {
                reset();
            }
            else
            {
                newStr = str.substr(0,str.length-1);
                if(newStr!="")
                {
                    operationsArray[pos] = newStr;
                    
                }
                else
                {
                    operationsArray.pop();
                }
                updateResult(operationsArray.join(""));
            }
        }
    }
    else if (key==".")
    {
        calculatedResult = false;
        lastStringElement = operationsArray[operationsArray.length-1];
        if(Number.isInteger(parseFloat(lastStringElement)) && lastStringElement[lastStringElement.length-1]!=".")
        {
                operationsArray.push(operationsArray.pop()+key);
                updateResult(operationsArray.join(""));
        }
    }
    else if (key=="=")
    {  
        var result = parseFloat(evaulateExpression(operationsArray));
        updateResult(result);
        operationsArray = [result];
        if(calculatedResult && lastNumber!="" && lastOperator!="")
        {
            result = parseFloat(performOperation(result, lastNumber, lastOperator));
            updateResult(result);
            operationsArray = [result];
        }
        calculatedResult = true;
    }
    else
    {
        if(showZero && !isNaN(key))
        {
            showZero = false;
            operationsArray = [];
        }
        else if(showZero && isNaN(key))
        {
            showZero = false;
            operationsArray = ["0"];
        }
        if(!isNaN(key)) // number
        {
            if(!isNaN(operationsArray[operationsArray.length-1]))
            {
                lastNumber = operationsArray.pop()+key;
                operationsArray.push(lastNumber);
                separateItem = false;
                if(calculatedResult)
                {
                    operationsArray = [key];
                    updateResult(key);
                    calculatedResult= false;
                }
            }
            else{
                lastNumber = key;
            }
        }
        if(isNaN(key)) // operator
        {
            lastOperator = key;
            calculatedResult=false;
            if(isNaN(operationsArray[operationsArray.length-1]))
            {
                operationsArray.pop();
            }
        }
        if(separateItem)
        {
            operationsArray.push(key);
        }
        updateResult(operationsArray.join(""));
        separateItem = true;
    } 
}

// compares the precedence of two operators
// returns true if the first operator has a higher or equal precedence than the second
function higherOrEqualPrecedence(operatorA, operatorB)
{
    if(operatorA == "*" || operatorA == "/")
    {
        return true;
    }
    if(operatorA == "+" || operatorA =="-")
    {
        if(operatorB == "+" || operatorB =="-")
        {
            return true;
        }
    }
    return false;
}

// transforms an array of operations from infix to postfix notation
// this makes evaluating our expressions easier
// (for example: 2*3+4-1 -> 23*4+1-)
// input: array - the array that needs to be transformed
// output: newArray - the transformed array
function infixToPostFix(array)
{
    var myStack = [];
    var newArray = [];
    for(el of array)
    {
        if (isNaN(el)) // operator
        {
            if(myStack.length==0)
            {
                myStack.push(el);
            }
            else
            {
                while(higherOrEqualPrecedence(myStack[myStack.length-1], el))
                {
                    newArray.push(myStack.pop());
                }
                myStack.push(el);
            }
        }
        else // number
        {
           newArray.push(el);
        }
    }
    while(myStack.length!=0)
    {
        newArray.push(myStack.pop());
    }
    return newArray;
}

// performs an operation on two numbers and returns the result
function performOperation(nr1, nr2, operator)
{
    if(operator=="+")
    {
        return parseFloat(nr1) + parseFloat(nr2);
    }
    if(operator=="-")
    {
        return parseFloat(nr1) - parseFloat(nr2);
    }
    if(operator=="*")
    {
        return parseFloat(nr1) * parseFloat(nr2);
    }
    if(operator=="/")
    {
        return parseFloat(nr1) / parseFloat(nr2);
    }
}

// makes use of the functions defined above to evaluate an expression
// input: array - the array that holds the expression
// output: the result
function evaulateExpression(array)
{
    array = infixToPostFix(array);
    var myStack = [];
    for(el of array)
    {
        if (isNaN(el)) // operator
        {
            var nr2 = myStack.pop();
            var nr1 = myStack.pop();
            myStack.push(performOperation(nr1, nr2, el));
        }
        else // number
        {
           myStack.push(el);
        }
    }
    return myStack.pop();
}