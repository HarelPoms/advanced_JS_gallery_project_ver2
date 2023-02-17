const editPicturesPopupImgDisplay = document.getElementById("editPicturesPopupImgDisplay");
const editPicturesPopupUrl = document.getElementById("editPicturesPopupUrl");
const editPicturesPopupAlt = document.getElementById("editPicturesPopupAlt");
const editPicturesPopupCredit = document.getElementById("editPicturesPopupCredit");
const editPicturesPopupPrice = document.getElementById("editPicturesPopupPrice");
const editPicturesPopup = document.getElementById("editPicturesPopup");
const editPicturesCancelBtn = document.getElementById("editPicturesPopupCancelBtn");
const editPicturesSaveBtn = document.getElementById("editPicturesPopupSaveBtn");
let selectedPicture, editPicture;


const initPopup = (selectedPictureFromHomePage, editPictureFromHomePage) => {
    selectedPicture = selectedPictureFromHomePage;
    editPicture = editPictureFromHomePage;
    editPicturesPopupUrl.value = selectedPicture.url;
    editPicturesPopupAlt.value = selectedPicture.alt;
    editPicturesPopupCredit.value = selectedPicture.credit;
    editPicturesPopupPrice.value = selectedPicture.price;
    editPicturesPopupImgDisplay.src = selectedPicture.url;
    showPopup();
};

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
})

export {initPopup};