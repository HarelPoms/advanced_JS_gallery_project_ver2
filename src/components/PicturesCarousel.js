let picturesArr;
let carouselDiv;
let showIdx;
let animationStarted;
let picIds;
let carouselNextBtn;

const initializePicturesCarousel = (picturesArrFromHomePage) => {
    carouselDiv = document.getElementById("gallery-carousel-inner");
    updatePicturesCarousel(picturesArrFromHomePage);
    initBtns();
}

const updatePicturesCarousel = (picturesArrFromHomePage) => {
    picturesArr = picturesArrFromHomePage;
    picIds = picturesArr.map(picture => picture.id);
    showIdx = 0;   
    createCarousel();
}

// const createCarouselItem = (id, src, alt, credit) => {
//     return `
//     <div id="carousel-item-${id}" class="opacity-0 d-none carousel-picture">
//         <img src="${src}"
//             alt="${alt}" class="carousel-center-img" />
//         <span class="d-flex justify-content-center">Photographed by: ${credit}</span>
//     </div>
//     `;
// };

const createCarouselItem = (id, src, alt, credit) => {
    return `
    <div class="carousel-item">
        <div class="card carousel-picture border-0" 
        id="carousel-item-${id}">
            <img src="${src}" class="card-img-top img-fluid carousel-center-img" alt="${alt}">
            <div class="card-body">
                <p class="card-text text-center">Photographed by: ${credit}</p>
            </div>
        </div>
    </div>
    `;
};

// const createCarouselItem = (id, src, alt, credit) => {
//     return `<div class="carousel-item">
//                 <img src="${src}" class="d-block carousel-center-img" alt="${alt}">
//                 <span class="d-flex justify-content-center">Photographed by: ${credit}
//                 </span>
//             </div>
//     `
// }

const createCarousel = () => {
    let buffer = "";
    for (let picture of picturesArr){
        buffer += createCarouselItem(picture.id, picture.url, picture.alt, picture.credit);
    }
    carouselDiv.innerHTML = buffer;
    document.querySelector(`.carousel-item`).classList.add("active");
    //document.querySelector(`.carousel-picture`).classList.remove("border-0");
}

const initBtns = () => {
    carouselNextBtn = document.getElementById("next-carousel-btn");
    setInterval(() => {carouselNextBtn.click();}, 3000);
}


export {initializePicturesCarousel, updatePicturesCarousel};