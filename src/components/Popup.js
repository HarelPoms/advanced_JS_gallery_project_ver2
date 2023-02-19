import getNextPictureId from "../utils/getNextPictureId.js";
import Picture from "../models/Picture.js"

let editPicturesHeader;
let editPicturesPopupImgDisplay;
let editPicturesPopupUrl;
let editPicturesPopupAlt;
let editPicturesPopupCredit;
let editPicturesPopupPrice;
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
    if(selectedPictureFromHomePage){
        editPicturesHeader.innerHTML = EDIT_PICTURE_FORM_HEADER;
        selectedPicture = selectedPictureFromHomePage;
    }
    else{
        editPicturesHeader.innerHTML = CREATE_PICTURE_FORM_HEADER;
        selectedPicture = new Picture(getNextPictureId(),EMPTY_URL_PIC_PATH, "", "", "");
    }
    initHeader();
    
    editPicture = editPictureFromHomePage;
    if(selectedPicture.url != EMPTY_URL_PIC_PATH){
        editPicturesPopupUrl.value = selectedPicture.url;
    }
    else{
        editPicturesPopupUrl.value = "";
    }
    editPicturesPopupAlt.value = selectedPicture.alt;
    editPicturesPopupCredit.value = selectedPicture.credit;
    editPicturesPopupPrice.value = selectedPicture.price;
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
        editPicture(selectedPicture);
        hidePopup();
    });

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
    editPicturesCancelBtn.addEventListener("click", () => {
        hidePopup();
    })
}

const initHeader = () => {
    editPicturesCancelBtn = document.getElementById("editPicturesPopupCancelBtn");
    editPicturesCancelBtn.addEventListener("click", () => {
        hidePopup();
    })
}

export {initPopup};