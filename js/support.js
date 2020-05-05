export function createElement(type, parent, value = "", classes = "") {
    let element = document.createElement(type);
    parent.appendChild(element);
    element.innerHTML = value;
    addClasses(element, classes);
    return element;
}

export function addClasses(obj, classes) {
    let classesArray = classes.split(" ");
    classesArray.forEach(c => { if (c !== "") obj.classList.add(c) })
}