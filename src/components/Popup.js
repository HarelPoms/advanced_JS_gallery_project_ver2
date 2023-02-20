import getNextPictureId from "../utils/getNextPictureId.js";
import Picture from "../models/Picture.js"
import AdditionalDetails from "../models/AdditionalDetails.js";

let editPicturesHeader;
let editPicturesPopupImgDisplay;
let editPicturesPopupUrl;
let editPicturesPopupAlt;
let editPicturesPopupCredit;
let editPicturesPopupPrice;
let editPicturesPopupCreatedAt;
let editPicturesPopupDescription;
let editPicturesPopupTitle;
let editPicturesPopupSubtitle;
let editPicturesPopup;
let editPicturesCancelBtn;
let editPicturesSaveBtn;
let selectedPicture, editPicture;

const EMPTY_URL_PIC_PATH = "../../public/assets/images/empty_image_preview.png"
const EDIT_PICTURE_FORM_HEADER = `EDIT PICTURE FORM
                                <button type="button" class="btn btn-danger" id="editPicturesPopupCancelBtn">
                                    <i class="bi bi-x-circle-fill"></i>
                                </button>`;
const CREATE_PICTURE_FORM_HEADER = `CREATE PICTURE FORM
                                    <button type="button" class="btn btn-danger" id="editPicturesPopupCancelBtn">
                                        <i class="bi bi-x-circle-fill"></i>
                                    </button>`;

const initPopup = (selectedPictureFromHomePage, editPictureFromHomePage) => {
    //If editing existing picture
    if(selectedPictureFromHomePage){
        editPicturesHeader.innerHTML = EDIT_PICTURE_FORM_HEADER;
        selectedPicture = selectedPictureFromHomePage;
    }
    //Otherwise we're creating a new picture
    else{
        editPicturesHeader.innerHTML = CREATE_PICTURE_FORM_HEADER;
        selectedPicture = new Picture(getNextPictureId(),EMPTY_URL_PIC_PATH, "", "", "", new AdditionalDetails("", "", "", ""));
    }
    initHeader();
    
    editPicture = editPictureFromHomePage;
    //If editing an existing picture, present url 
    if(selectedPicture.url != EMPTY_URL_PIC_PATH){
        editPicturesPopupUrl.value = selectedPicture.url;
    }
    //otherwise, show it as empty
    else{
        editPicturesPopupUrl.value = "";
    }
    editPicturesPopupAlt.value = selectedPicture.alt;
    editPicturesPopupCredit.value = selectedPicture.credit;
    editPicturesPopupPrice.value = selectedPicture.price;
    //Additional details added
    editPicturesPopupCreatedAt.value = selectedPicture.additionalDetails.createdAt;
    editPicturesPopupDescription.value = selectedPicture.additionalDetails.description;
    editPicturesPopupTitle.value = selectedPicture.additionalDetails.title;
    editPicturesPopupSubtitle.value = selectedPicture.additionalDetails.subtitle;
    //
    editPicturesPopupImgDisplay.src = selectedPicture.url;
    showPopup();
};

const initElems = () => {
    editPicturesHeader = document.getElementById("popupHeader");
    editPicturesPopupImgDisplay = document.getElementById("editPicturesPopupImgDisplay");
    editPicturesPopupUrl = document.getElementById("editPicturesPopupUrl");
    editPicturesPopupAlt = document.getElementById("editPicturesPopupAlt");
    editPicturesPopupCredit = document.getElementById("editPicturesPopupCredit");
    editPicturesPopupPrice = document.getElementById("editPicturesPopupPrice");
    //AdditionalDetails Added
    editPicturesPopupCreatedAt = document.getElementById("editPicturesPopupCreatedAt");
    editPicturesPopupDescription = document.getElementById("editPicturesPopupDescription");
    editPicturesPopupTitle = document.getElementById("editPicturesPopupTitle");
    editPicturesPopupSubtitle = document.getElementById("editPicturesPopupSubtitle");
    //
    editPicturesPopup = document.getElementById("editPicturesPopup");
    editPicturesCancelBtn = document.getElementById("editPicturesPopupCancelBtn");
    editPicturesSaveBtn = document.getElementById("editPicturesPopupSaveBtn");
}

const showPopup = () => {
    editPicturesPopup.classList.remove("d-none");
}

const hidePopup = () => {
    editPicturesPopup.classList.add("d-none");
}

const isImage = (src) => {
    // Create new offscreen image to test
    let imageNew = new Image();
    
    imageNew.src = src;

    // Get accurate measurements from that.
    if ((imageNew.width > 0) && (imageNew.height > 0)){
        return true;
    } else {
        return false;
    }
}

window.addEventListener("load", () => {
    initElems();
    initBtns();
})

const initBtns = () => {
    editPicturesSaveBtn.addEventListener("click", () => {
        selectedPicture.url = editPicturesPopupUrl.value;
        selectedPicture.alt = editPicturesPopupAlt.value;
        selectedPicture.credit = editPicturesPopupCredit.value;
        selectedPicture.price = editPicturesPopupPrice.value;
        //additional details added
        selectedPicture.additionalDetails.createdAt = editPicturesPopupCreatedAt.value;
        selectedPicture.additionalDetails.description = editPicturesPopupDescription.value;
        selectedPicture.additionalDetails.title = editPicturesPopupTitle.value;
        selectedPicture.additionalDetails.subtitle = editPicturesPopupSubtitle.value;
        //
        editPicture(selectedPicture);
        hidePopup();
    });

    editPicturesCancelBtn.addEventListener("click", () => {
        hidePopup();
    })

    editPicturesPopupUrl.addEventListener("input", () => {
        let URLValidityCheck = isImage(editPicturesPopupUrl.value);
        if(URLValidityCheck){
            editPicturesPopupImgDisplay.src = editPicturesPopupUrl.value;
            editPicturesSaveBtn.disabled = false;
        }
        else{
            editPicturesPopupImgDisplay.src = "../../public/assets/images/invalid_url.png";
            editPicturesSaveBtn.disabled = true;
        }
    });
    
}

const initHeader = () => {
    editPicturesCancelBtn = document.getElementById("editPicturesPopupCancelBtn");
    editPicturesCancelBtn.addEventListener("click", () => {
        hidePopup();
    })
}

export {initPopup};