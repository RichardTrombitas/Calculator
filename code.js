window.onload = init;

function init() {
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

var myStack = [];
var resultElement = document.getElementById("result");

function peek(stack)
{
    return stack[stack.length-1];
}

function registerKey(eventObject) {
    key = eventObject.target.innerHTML;
    makeDimmer(eventObject.target.id);

    if(isNaN(key) && key!="=") // operator
    {
        
        
    }
    else if(!isNaN(key)) // operand
    {
       

    }
    else // equality
    {
        
        
    }
    
}



