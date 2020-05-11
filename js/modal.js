import {createElement} from "./support.js";

let modals = document.querySelectorAll(".modal");
let modals_open = 0;

modals.forEach(m => {
    m.style.display = "none";
    initializeModal(m, false);
});

export function initializeModal(modal, removeFlag) {
    addCross(modal, removeFlag);
    createElement("div", modal, "", "background");
}

function addCross(modal, removeFlag) {
    let crossButton = createElement("button",
        modal.querySelector(".modal-heading"), "X", "cross");
    crossButton.addEventListener('click', function (){
        removeFlag ? remove(modal) : hide(modal);
    });
}

setButtons(hide);
setButtons(show);

function setButtons(fnc){
    let buttons = document.querySelectorAll("." + fnc.name).forEach(b => {
        b.addEventListener('click', function () {
            fnc(document.getElementById(b.name));
        });
    });
}

export function show(modal){
    modal.style.display = "block";
    modal.style.zIndex = (String)(modals_open + 1);
    modals_open++;
}

export function hide(modal) {
    modal.style.display = "none";
    modals_open--
}

export function remove(modal) {
    modal.parentElement.removeChild(modal);
    modals_open--;
}