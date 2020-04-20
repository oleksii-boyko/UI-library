let burgers = document.getElementsByClassName("burger");
let media = window.matchMedia("(min-width: 769px)");

for (let i = 0; i < burgers.length; i++){
    let burger = burgers[i];
    let sign = document.createElement("i");
    sign.className = "fas fa-align-justify";
    burger.onclick = function() {
        changeState(burger);
    };
    burger.appendChild(sign);
    adoptToSize(media, burger);
    media.addEventListener("change", function (){ adoptToSize(media, burger) });
}

function changeState(burger) {
    if(burger.childNodes[0].className.includes("fas fa-align-justify")){
        burger.childNodes[0].className = "fas fa-times";
        nextSiblingWithClass(burger, "nav-menu").style.display = "flex";
    }
    else {
        turnMobileInitialState(burger);
    }
}

function nextSiblingWithClass(element, className){
    while (element.nextElementSibling !== null){
        if (element.nextElementSibling.className.includes(className)){
            return element.nextElementSibling;
        }
    }
}

function turnMobileInitialState(burger) {
    burger.childNodes[0].className = "fas fa-align-justify";
    nextSiblingWithClass(burger, "nav-menu").style.display = "none";
}

function turnDesktopInitialState(burger) {
    burger.childNodes[0].className = "fas fa-align-justify";
    nextSiblingWithClass(burger, "nav-menu").style.display = "flex";
}

function adoptToSize(media, burger) {
    if (media.matches){
        turnDesktopInitialState(burger);
    }
    else {
        turnMobileInitialState(burger);
    }
}