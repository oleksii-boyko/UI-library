import {createElement} from "./support.js";

let burgers = document.querySelectorAll(".burger");
let media = window.matchMedia("(min-width: 769px)");

burgers.forEach(b => { initializeBurger(b) });

function initializeBurger(burger) {
    let icon = createElement("i", burger, "", "fas fa-align-justify");

    burger.addEventListener('click', function () {
        changeState(...(icon.className.includes("fas fa-align-justify") ? ["flex", true] : ["none", false]));
    });

    changeState(media.matches ? "flex" : "none", false);

    media.addEventListener("change", function () {
        changeState(media.matches ? "flex" : "none", false);
    });

    function changeState(display, change) {
        icon.className = change ? "fas fa-times":"fas fa-align-justify";
        nextSiblingWithClass(burger, "nav-menu").style.display = display;
    }
}

function nextSiblingWithClass(element, className){
    for (let next = element.nextElementSibling; next !== null; next = next.nextElementSibling){
        if (next.className.includes(className)){
            return next;
        }
    }
}