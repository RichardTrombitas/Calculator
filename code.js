window.onload = function(){
    var buttons = document.getElementsByClassName("button");
    for (el of buttons) {
        el.onmouseover = makeBright;
        el.onmouseout = makeDim;
        el.onmousedown = registerKey;
        el.onmouseup = makeBright;
    }
}

function makeBright(eventObject) {
    var button = document.getElementById(eventObject.target.id);
    button.style.backgroundColor = "#ec3f3f";
}

function makeDim(eventObject) {
    var button = document.getElementById(eventObject.target.id);
    button.style.backgroundColor = "#c02e2e";
}

function makeDimmer(id) {
    var button = document.getElementById(id);
    button.style.backgroundColor = "#641818";
}

function updateResult(res)
{
    var resultElement = document.getElementById("result"); // calculator screen
    resultElement.innerHTML = res;
    len = resultElement.innerHTML.length;
    console.log(len);
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



var operationsArray = ["0"];
var showZero = true;
var separateItem = true;
var calculatedResult = false;
var lastOperator = "";
var lastNumber = "";

function registerKey(eventObject) {
    makeDimmer(eventObject.target.id);
    key = eventObject.target.innerHTML;

    if(key=="C")
    {
        operationsArray = ["0"];
        //resultElement.innerHTML="0";
        updateResult("0");
        showZero = true;
        separateItem = true;
        calculatedResult = false;
        lastOperator = "";
        lastNumber = "";
    }
    else if (key=="DEL")
    {
        
        pos = operationsArray.length-1;
        str = operationsArray[pos];
        if(typeof str == "number")
        {
            //do nothing
        }
        else
        {
            if(pos==0 && str.length==1)
            {
                operationsArray = ["0"];
                resultElement.innerHTML="0";
                updateResult("0");
                showZero = true;
                separateItem = true;
                calculatedResult = false;
                lastOperator = "";
                lastNumber = "";
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
                //resultElement.innerHTML=operationsArray.join("");
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
                //resultElement.innerHTML=operationsArray.join("");
                updateResult(operationsArray.join(""));
        }
    }
    else if (key=="=")
    {  
        var result = parseFloat(evaulateExpression(operationsArray));
        //resultElement.innerHTML = result;
        updateResult(result);
        operationsArray = [result];
        if(calculatedResult && lastNumber!="" && lastOperator!="")
        {
            result = parseFloat(performOperation(result, lastNumber, lastOperator));
            //resultElement.innerHTML = result;
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
                    //resultElement.innerHTML=key;
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
        //resultElement.innerHTML=operationsArray.join("");
        updateResult(operationsArray.join(""));
        separateItem = true;
    } 
}


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