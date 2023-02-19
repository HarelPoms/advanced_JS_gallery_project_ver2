import {initializePicturesGallery, updatePicturesGallery} from "../components/PicturesGallery.js";
import { initializePicturesList, updatePicturesList } from "../components/PicturesList.js";
import { initializePicturesCarousel, updatePicturesCarousel } from "../components/PicturesCarousel.js";
import {initPopup} from "../components/Popup.js";

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
    initializePicturesGallery(picturesArr, isAdmin, deletePicture, showPopup);
    initializePicturesList(picturesArr, isAdmin, deletePicture, showPopup);
    initializePicturesCarousel(picturesArr);
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
    currentDisplayMode = listOfItems; // choose who we want to display
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
        sortPictures();
    });

    document.getElementById("homeDisplaySortDESC").addEventListener("click", () => {
        sortPictures(false);
    });

}

const sortPictures = (asc = true) => {
    if(asc){
        //sort from a to z
        picturesArr.sort((a,b) => a.alt.localeCompare(b.alt));
    }
    else{
        //sort from z to a
        picturesArr.sort((a,b) => b.alt.localeCompare(a.alt));
    }
    updateDisplays();
}

const switchToAnotherDisplayMode = (DisplayToSwitchTo) => {
    // hide what we are currently showing
    currentDisplayMode.classList.remove("d-block");
    currentDisplayMode.classList.add("d-none");
    // show what we want to display now
    DisplayToSwitchTo.classList.remove("d-none");
    DisplayToSwitchTo.classList.add("d-block");
    //this is what we are displaying now
    currentDisplayMode = DisplayToSwitchTo;
};

const updateDisplays = () => {
    updatePicturesGallery(picturesArr);
    updatePicturesList(picturesArr);
    updatePicturesCarousel(picturesArr);
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

const showPopup = (id) => {
    let selectedPicture = picturesArr.find((picture) => picture.id === (+id));
    if(!selectedPicture){
        return;
    }
    initPopup(selectedPicture, editPicture);
}

const showNewPopup = () => {
    initPopup(undefined, addNewPicture);
};

const addNewPicture = (newPicture) => {
    originalPicturesArr = [...originalPicturesArr, newPicture];
    
    localStorage.setItem("next_pic_id", (+newPicture.id + 1) + "");
    picturesArr = [...originalPicturesArr];
    editPicture();
};

const editPicture = () => {
    saveToLocalStorage(originalPicturesArr);
    updateDisplays();
};

export {showNewPopup};