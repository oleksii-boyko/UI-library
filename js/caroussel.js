const config1 = ["https://loremflickr.com/320/240", "https://loremflickr.com/320/240/dog", "https://loremflickr.com/320/240/paris,girl/all"];
const INITIAL_INDEX = 0;

putCarousel("carousel", config1);

function putCarousel(id, images) {
    let currentImageIndex = INITIAL_INDEX;
    let carousel = document.getElementById(id);
    let imagesNum = images.length;

    let prevButton = document.createElement("i");
    prevButton.className = "fas fa-chevron-left carousel-button left";
    prevButton.addEventListener("click", function (){
        previous(content);
        currentImageIndex--;
        currentImageIndex = checkButtons(prevButton, nextButton, currentImageIndex, imagesNum);
    });
    carousel.appendChild(prevButton);

    let content = createCarouselMain(images, carousel);

    let nextButton = document.createElement("i");
    nextButton.className = "fas fa-chevron-right carousel-button right";
    nextButton.addEventListener("click", function (){
        next(content);
        currentImageIndex++;
        currentImageIndex = checkButtons(prevButton, nextButton, currentImageIndex, imagesNum);
    });
    carousel.appendChild(nextButton);

    checkButtons(prevButton, nextButton, currentImageIndex, imagesNum);
    shiftImages();
}

function createCarouselMain(images, carousel) {
    let main = document.createElement("div");
    main.className = "carousel-main";
    carousel.appendChild(main);

    let content = document.createElement("ul");
    content.className = "carousel-content";
    main.appendChild(content);
    addImages(images, content);

    let first = content.childNodes[INITIAL_INDEX];
    first.classList.add("current");

    return content;
}

function addImages(images, content) {
    for (let i = 0; i < images.length; i++) {
        let carousel_element = document.createElement("li");
        carousel_element.className = "carousel-image";
        let image = document.createElement("img");
        image.src = images[i];
        carousel_element.appendChild(image);
        content.appendChild(carousel_element);
    }
}

function shiftImages() {
    let images = document.getElementsByClassName("carousel-image");
    for (let i = 0; i < images.length; i++) {
        images[i].style.left = images[i].getBoundingClientRect().width * i + 'px';
    }
}

function next(content){
    let currentSlide = content.querySelector(".current");
    moveTo(content, currentSlide, currentSlide.nextElementSibling);
}

function previous(content) {
    let currentSlide = content.querySelector(".current");
    moveTo(content, currentSlide, currentSlide.previousElementSibling);
}

function moveTo(content, from, target) {
    let currentSlide = content.querySelector(".current");
    content.style.transform = 'translateX(-' + target.style.left + ')';
    currentSlide.classList.remove("current");
    target.classList.add("current");
}

function checkButtons(prev, next, index, max) {
    if (index >= max - 1){
        next.style.visibility = "hidden";
        index = max - 1;
    }
    else {
        next.style.visibility = "visible";
    }

    if (index <= 0){
        prev.style.visibility = "hidden";
        index = 0;
    }
    else {
        prev.style.visibility = "visible";
    }
    return index;
}