import {createElement} from "./support.js";

let modals = document.getElementsByClassName("modal");
let modals_open = 0;

for (let i = 0; i < modals.length; i++){
    initializeModal(modals[i]);
}

export function initializeModal(modal) {
    modal.style.display = "none";
    addCross(modal);
    createElement("div", modal, "", "background");
}

function addCross(modal, parent) {
    let crossButton = createElement("button",
        modal.querySelector(".modal-heading"), "X", "cross");
    crossButton.addEventListener('click', function (){ hide(modal) });
}

setButtons(hide);
setButtons(show);

function setButtons(fnc){
    let buttons = document.getElementsByClassName(fnc.name);
    for (let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener('click', function () {
            fnc(document.getElementById(buttons[i].name));
        });
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