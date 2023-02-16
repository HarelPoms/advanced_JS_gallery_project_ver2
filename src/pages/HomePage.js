import {initializePicturesGallery, updatePicturesGallery} from "../components/PicturesGallery.js";
import checkIfAdmin from "../utils/checkIfAdmin.js";

let picturesArr, originalPicturesArr;
let currentDisplayMode;
let isAdmin;

let galleryBtn;
let listBtn;
let carouselBtn;

let galleryOfItems;
let listOfItems;
let carouselOfItems;

window.addEventListener("load", ()=>{
    picturesArr = localStorage.getItem("pics")
    if(!picturesArr){
        return;
    }
    picturesArr = JSON.parse(picturesArr);
    originalPicturesArr = [...picturesArr];
    isAdmin = checkIfAdmin();
    initializePicturesGallery(picturesArr, isAdmin, deletePicture);
    initElements();
    initBtns();
})

const initElements = () =>{
    galleryBtn = document.getElementById("home-gallery-btn");
    listBtn = document.getElementById("home-list-btn");
    carouselBtn = document.getElementById("home-carousel-btn");
    galleryOfItems = document.getElementById("pictures-gallery");
    listOfItems = document.getElementById("pictures-list");
    carouselOfItems = document.getElementById("pictures-carousel");
    currentDisplayMode = galleryOfItems; // choose who we want to display
    switchToAnotherDisplayMode(currentDisplayMode);
}

const initBtns = () => {
    
    galleryBtn.addEventListener("click", ()=>{
        switchToAnotherDisplayMode(galleryOfItems);
    });

    listBtn.addEventListener("click", ()=>{
        switchToAnotherDisplayMode(listOfItems);
    });

    carouselBtn.addEventListener("click", ()=>{
        switchToAnotherDisplayMode(carouselOfItems);
    });

    document.getElementById("homeDisplaySortASC").addEventListener("click", () => {
        // sortProperties();
    });

    document.getElementById("homeDisplaySortDESC").addEventListener("click", () => {
        // sortProperties(false);
    });

}

const switchToAnotherDisplayMode = (DisplayToSwitchTo) => {
    // hide what we currently showing
    currentDisplayMode.classList.remove("d-block");
    currentDisplayMode.classList.add("d-none");
    // show what we want to display now
    DisplayToSwitchTo.classList.remove("d-none");
    DisplayToSwitchTo.classList.add("d-block");
    //this is what we displaying now
    currentDisplayMode = DisplayToSwitchTo;
};

const updateDisplays = () => {
    updatePicturesGallery(picturesArr);
}

const saveToLocalStorage = (arrToSave) => {
    localStorage.setItem("pics", JSON.stringify(arrToSave));
}

const deletePicture = (id) => {
    originalPicturesArr = originalPicturesArr.filter((item) => item.id !== id);
    saveToLocalStorage(originalPicturesArr);

    picturesArr = picturesArr.filter((item) => item.id !== id);
    updateDisplays();
}