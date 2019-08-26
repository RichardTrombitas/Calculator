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
