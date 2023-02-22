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

let homeDisplaySortAsc;
let homeDisplaySortDesc;
let homeSearchLine;

window.addEventListener("load", ()=>{
    picturesArr = localStorage.getItem("pics")
    if(!picturesArr){
        return;
    }
    picturesArr = JSON.parse(picturesArr);
    originalPicturesArr = [...picturesArr];
    isAdmin = checkIfAdmin();
    initializePicturesGallery(picturesArr, isAdmin, deletePicture, showPopup, showExtraDetailsPopup);
    initializePicturesList(picturesArr, isAdmin, deletePicture, showPopup, showExtraDetailsPopup);
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

    homeDisplaySortAsc = document.getElementById("homeDisplaySortASC");
    homeDisplaySortDesc = document.getElementById("homeDisplaySortDESC");

    homeSearchLine = document.getElementById("homeDisplaySearch");
    currentDisplayMode = listOfItems; // choose who we want to display
    switchToAnotherDisplayMode(currentDisplayMode);
}

const initBtns = () => {
    
    galleryBtn.addEventListener("click", ()=>{
        homeSearchLine.classList.remove("d-none");
        homeSearchLine.style.marginLeft  = "0rem";
        switchToAnotherDisplayMode(galleryOfItems);
    });

    listBtn.addEventListener("click", ()=>{
        homeSearchLine.classList.remove("d-none");
        homeSearchLine.style.marginLeft  = "0.55rem";
        switchToAnotherDisplayMode(listOfItems);
    });

    carouselBtn.addEventListener("click", ()=>{
        homeSearchLine.classList.remove("d-none");
        homeSearchLine.classList.add("d-none");
        switchToAnotherDisplayMode(carouselOfItems);
    });

    homeDisplaySortAsc.addEventListener("click", () => {
        sortPictures();
    });

    homeDisplaySortDesc.addEventListener("click", () => {
        sortPictures(false);
    });

    homeSearchLine.addEventListener("input", (ev) => {
        let regex = new RegExp("^" + ev.target.value, "i");
        picturesArr = originalPicturesArr.filter((pic) => {
            return regex.test(pic.alt);
        });
        updateDisplays();
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

const showExtraDetailsPopup = (id) => {
    let clickedPicture = picturesArr.find((picture) => picture.id === (+id));
    if(!clickedPicture){
        return;
    }
    initPopup(clickedPicture, undefined);
}

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