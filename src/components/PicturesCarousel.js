let picturesArr;
let carouselDiv;
let showIdx;
let animationStarted;
let picIds;
const initializePicturesCarousel = (picturesArrFromHomePage) => {
    carouselDiv = document.getElementById("home-page-pictures-carousel");
    updatePicturesCarousel(picturesArrFromHomePage);
    initBtns();
}

const updatePicturesCarousel = (picturesArrFromHomePage) => {
    picturesArr = picturesArrFromHomePage;   
    showIdx = 0;
    animationStarted = 0;
    picIds = picturesArr.map(picture => picture.id);
    console.log(picIds);
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
    <div class="card opacity-0 d-none carousel-picture" id="carousel-item-${id}">
        <img src="${src}" class="card-img-top" alt="${alt}">
        <div class="card-body">
            <p class="card-text">Photographed by ${credit}</p>
        </div>
    </div>
    `;
};

const createCarousel = () => {
    let buffer = "";
    for (let picture of picturesArr){
        buffer += createCarouselItem(picture.id, picture.url, picture.alt, picture.credit);
    }
    carouselDiv.innerHTML = buffer;
    document.querySelector("#carousel-item-1").classList.remove("opacity-0");
    document.querySelector("#carousel-item-1").classList.remove("d-none");
}

const initBtns = () => {
    document.getElementById("back-carousel-btn").addEventListener("click", ()=>{
    if (animationStarted !== 0) {
        return;
    }
    animationStarted = 2;
    let prevIdx = showIdx - 1;
    if (prevIdx < 0) {
        prevIdx = picturesArr.length - 1; //last image
    }
    let imgToHide = document.querySelector(`#carousel-item-${picIds[showIdx]}`);
    imgToHide.classList.add("fade-out");

    imgToHide.addEventListener("animationend", () => {
            
        imgToHide.classList.add("opacity-0");
        imgToHide.classList.add("d-none");

        imgToHide.classList.remove("fade-out");
        animationStarted--;
    },{once:true});

    let imgToShow = document.querySelector(`#carousel-item-${picIds[prevIdx]}`);
    
    imgToShow.classList.remove("opacity-0");
    imgToShow.classList.remove("d-none");

    imgToShow.classList.add("fade-in");
    imgToShow.addEventListener("animationend", () => {
        imgToShow.classList.remove("fade-in");
        animationStarted--;
    }, { once: true });
    showIdx = prevIdx;

    });
    document.getElementById("next-carousel-btn").addEventListener("click", ()=>{
        if(animationStarted !== 0){
            return;
        }
        animationStarted = 2;
        let nextIdx = showIdx + 1;
        //showIdx = index of image to hide
        //nextIdx = index of image to display
        if(nextIdx >= picturesArr.length){
            nextIdx = 0;
        }
        let imgToHide = document.querySelector(`#carousel-item-${picIds[showIdx]}`);
        imgToHide.classList.add("fade-out");
        imgToHide.addEventListener("animationend", () => {

            imgToHide.classList.add("opacity-0");
            imgToHide.classList.add("d-none");

            imgToHide.classList.remove("fade-out");
            animationStarted--;
        }, {once:true});

        console.log(nextIdx);
        let imgToShow = document.querySelector(`#carousel-item-${picIds[nextIdx]}`);

        imgToShow.classList.remove("opacity-0");
        imgToShow.classList.remove("d-none");

        imgToShow.classList.add("fade-in");
        imgToShow.addEventListener("animationend", () => {
            imgToShow.classList.remove("fade-in");
            animationStarted--;
    }, {once:true});
    showIdx = nextIdx;

    });

}


export {initializePicturesCarousel, updatePicturesCarousel};