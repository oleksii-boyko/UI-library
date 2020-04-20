// Main function
let modals = document.getElementsByClassName("modal");
let modals_open = 0;

for (let i = 0; i < modals.length; i++){
    let modal = modals[i];
    modal.style.display = "none";
    addCross(modal);
    addBackground(modal);
}

function addCross(modal){
    let children = modal.childNodes;
    for (let i = 0; i < children.length; i++){
        if ((String)(children[i].className).includes("modal-heading")){
            children[i].appendChild(createCrossButton(modal));
        }
    }
}

function createCrossButton(modal) {
    let crossButton = document.createElement("button");
    crossButton.className = "cross";
    crossButton.innerText ="X";
    crossButton.onclick = function (){hide(modal)};
    return crossButton;
}

function addBackground(modal) {
    let background = document.createElement("div");
    background.style.background = "rgba(0, 0, 0, 0.3)";
    background.style.position = "fixed";
    background.style.top = "0";
    background.style.left = "0";
    background.style.width = "100vw";
    background.style.height = "100vh";
    background.style.zIndex =  "-1";
    modal.insertBefore(background, modal.getElementsByClassName("modal-heading")[0]);
}

setButtons(hide);
setButtons(show);

function setButtons(fnc){
    let buttons = document.getElementsByClassName(fnc.name);
    for (let i = 0; i < buttons.length; i++){
        let button = buttons[i];
        button.onclick = function () {
            fnc(document.getElementById(button.name));
        }
    }
}

function show(modal){
    modal.style.display = "block";
    modal.style.zIndex = (String)(modals_open + 1);
    modals_open++;
}

function hide(modal) {
    modal.style.display = "none";
    modals_open--;
}