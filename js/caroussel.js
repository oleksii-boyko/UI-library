const config1 = ["https://loremflickr.com/320/240", "https://loremflickr.com/320/240/dog", "https://loremflickr.com/320/240/paris,girl/all"];
const INITIAL_INDEX = 0;
let currentImageIndex = INITIAL_INDEX;
let prevButton, nextButton;

putCarousel("carousel", config1);

function putCarousel(id, images) {
    let carousel = document.getElementById(id);

    prevButton = document.createElement("i");
    prevButton.className = "fas fa-chevron-left carousel-button left";
    prevButton.addEventListener("click", function (){ previous(content)});
    carousel.appendChild(prevButton);

    let content = createCarouselMain(images, carousel);

    nextButton = document.createElement("i");
    nextButton.className = "fas fa-chevron-right carousel-button right";
    nextButton.addEventListener("click", function (){ next(content)});
    carousel.appendChild(nextButton);
}

function createCarouselMain(images, carousel) {
    let main = document.createElement("div");
    main.className = "carousel-main";

    let content = document.createElement("ul");
    content.className = "carousel-content";
    for (let i = 0; i < images.length; i++) {
        let carousel_element = document.createElement("li");
        carousel_element.className = "carousel-image";
        let image = document.createElement("img");
        image.src = images[i];
        carousel_element.appendChild(image);
        content.appendChild(carousel_element);
    }

    let first = content.childNodes[INITIAL_INDEX];
    first.classList.add("current");

    main.appendChild(content);
    carousel.appendChild(main);
    return content;
}

let images = shiftImages();
checkButtons();

function shiftImages() {
    let images = document.getElementsByClassName("carousel-image");
    for (let i = 0; i < images.length; i++) {
        images[i].style.left = images[i].getBoundingClientRect().width * i + 'px';
    }
    return images;
}

function next(content){
    let currentSlide = content.querySelector(".current");
    moveTo(content, currentSlide, currentSlide.nextElementSibling);
    currentImageIndex++;
    checkButtons();
}

function previous(content) {
    let currentSlide = content.querySelector(".current");
    moveTo(content, currentSlide, currentSlide.previousElementSibling);
    currentImageIndex--;
    checkButtons();
}

function moveTo(content, from, target) {
    let currentSlide = content.querySelector(".current");
    content.style.transform = 'translateX(-' + target.style.left + ')';
    currentSlide.classList.remove("current");
    target.classList.add("current");
}

function checkButtons() {
    if (currentImageIndex >= images.length - 1){
        nextButton.style.visibility = "hidden";
        currentImageIndex = images.length - 1;
    }
    else {
        nextButton.style.visibility = "visible";
    }

    if (currentImageIndex <= 0){
        prevButton.style.visibility = "hidden";
        currentImageIndex = 0;
    }
    else {
        prevButton.style.visibility = "visible";
    }
}