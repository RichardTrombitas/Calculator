function makeBright(eventObject) {
    var button = document.getElementById(eventObject.target.id);
    button.style.backgroundColor = "#ec3f3f";
}

function makeDim(eventObject) {
    var button = document.getElementById(eventObject.target.id);
    button.style.backgroundColor = "#c02e2e";
}

function makePressed(eventObject) {
    var button = document.getElementById(eventObject.target.id);
    button.style.backgroundColor = "#641818";
}

function init() {
    var buttons = document.getElementsByClassName("button");
    for (el of buttons) {
        el.onmouseover = makeBright;
        el.onmouseout = makeDim;
        el.onmousedown = makePressed;
        el.onmouseup = makeBright;
    }
}

window.onload = init;

