function makeBright(eventObject) {
    var button = document.getElementById(eventObject.target.id);
    button.style.backgroundColor = "#ec3f3f";
    button.style.cursor = "pointer";
}

function makeDim(eventObject) {
    var button = document.getElementById(eventObject.target.id);
    button.style.backgroundColor = "#c02e2e";
}

function init() {
    var buttons = document.getElementsByTagName("td");
    for (el of buttons) {
        el.onmouseover = makeBright;
        el.onmouseout = makeDim;
    }

}

window.onload = init;
