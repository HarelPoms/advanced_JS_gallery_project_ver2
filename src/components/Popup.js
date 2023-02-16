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
        editPicturesPopupImgDisplay.src = editPicturesPopupUrl.value;
    });
    editPicturesCancelBtn.addEventListener("click", () => {
        hidePopup();
    })
})

export {initPopup};