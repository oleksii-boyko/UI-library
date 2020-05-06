import {createElement} from "./support.js";
import {addClasses} from "./support.js";

const config1 = ["https://loremflickr.com/320/240", "https://loremflickr.com/320/240/dog", "https://loremflickr.com/320/240/paris,girl/all"];

putCarousel("carousel", config1);

function putCarousel(id, images) {
    let currentImageIndex = 0;
    let carousel = document.getElementById(id);
    let imagesNum = images.length;

    let prevButton = createElement("i", carousel, "", "fas fa-chevron-left carousel-button left");
    prevButton.addEventListener("click", function (){
        moveTo(content, getCurrent(content), getCurrent(content).previousElementSibling);
        currentImageIndex--;
        currentImageIndex = checkButtons(currentImageIndex, imagesNum);
    });

    let content = createCarouselMain(images, carousel);

    let nextButton = createElement("i", carousel, "", "fas fa-chevron-right carousel-button right");

    nextButton.addEventListener("click", function (){
        moveTo(content, getCurrent(content), getCurrent(content).nextElementSibling);
        currentImageIndex++;
        currentImageIndex = checkButtons(currentImageIndex, imagesNum);
    });

    currentImageIndex = checkButtons(currentImageIndex, imagesNum);
    shiftImages();

    function checkButtons(index) {
        index = checkIndex(nextButton, imagesNum - 1);
        index = checkIndex(prevButton, 0);

        function checkIndex(button, value) {
            button.style.visibility = index === value ? "hidden" : "visible";
            return index === value ? value : index;
        }

        return index;
    }
}

function createCarouselMain(images, carousel) {
    let main = createElement("div", carousel, "", "carousel-main");

    let content = createElement("ul", main, "", "carousel-content");
    addImages();

    let first = content.childNodes[0];
    addClasses(first, "current");

    function addImages() {
        images.forEach(i => {
            let carousel_element = createElement("li", content, "", "carousel-image");
            let image = createElement("img", carousel_element);
            image.src = i;
        });
    }

    return content;
}

function shiftImages() {
    const images = document.querySelectorAll(".carousel-image");
    let shift = 0;
    images.forEach(i => {
        i.style.left = shift + 'px';
        shift += i.getBoundingClientRect().width;
    });
}

function moveTo(content, from, target) {
    content.style.transform = 'translateX(-' + target.style.left + ')';
    from.classList.remove("current");
    addClasses(target, "current");
}

function getCurrent(content) {
    return content.querySelector(".current");
}