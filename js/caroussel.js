const config1 = ["https://loremflickr.com/320/240", "https://loremflickr.com/320/240/dog", "https://loremflickr.com/320/240/paris,girl/all"];
const INITIAL_INDEX = 0;
let currentImageIndex = INITIAL_INDEX;
let prevButton, nextButton;

putCarousel("carousel", config1);

function putCarousel(id, images) {
    let carousel = document.getElementById(id);

    prevButton = document.createElement("i");
    prevButton.className = "fas fa-chevron-left carousel-button left";
    carousel.appendChild(prevButton);

    let content = createCarouselMain(images, carousel);

    nextButton = document.createElement("i");
    nextButton.className = "fas fa-chevron-right carousel-button right";
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
