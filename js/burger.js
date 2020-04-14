let burgers = document.getElementsByClassName("burger");

for (let i = 0; i < burgers.length; i++){
    let burger = burgers[i];
    let sign = document.createElement("i");
    sign.className = "fas fa-align-justify";
    burger.appendChild(sign);
}

