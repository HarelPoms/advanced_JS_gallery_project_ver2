import { clearEventListeners } from "../utils/clearEventListener.js";
import { createBtnEventListener } from "../utils/createBtnEventListener.js";

let listPicturesUnorderedList;
let picturesArr;
let isAdmin;
let deletePicture;
let showPopup;


const initializePicturesList = (picturesArrFromHomePage, isAdminParam,deletePictureFromHomePage, showPopupFromHomePage) => {
    isAdmin = isAdminParam;   
    listPicturesUnorderedList = document.getElementById("home-page-pictures-list");
    deletePicture = deletePictureFromHomePage;
    updatePicturesList(picturesArrFromHomePage);
    showPopup = showPopupFromHomePage;
}

const updatePicturesList = (picturesArrFromHomePage) => {
    picturesArr = picturesArrFromHomePage;
    createList();
}

const getIdFromClick = (ev) =>{
    let idFromId = ev.target.id.split("-");
    if(!ev.target.id){
        idFromId = ev.target.parentElement.id.split("-");
    }
    return(idFromId[1]);
}

const handleDeleteBtnClick = (ev) => {
    deletePicture(+(getIdFromClick(ev)));
};

const handleEditBtnClick = (ev) => {
    showPopup(getIdFromClick(ev));
}

const createListItem = (id, url, alt, credit) => {
    const adminBtns = `<div class="col-md-1">
                            <button class="btn btn-warning" id="PictureListEditButton-${id}">
                                <i class="bi bi-pencil-square"></i>
                            </button>
                        </div>
                        <div class="col-md-1">
                            <button class="btn btn-danger" id="PictureListDeleteButton-${id}">
                                <i class="bi bi-trash3-fill"></i>
                            </button>
                        </div>`;
    return `<li class="list-group-item ms-2">
                <div class="row">
                    <div class="col-md-1">${id}</div>
                    <div class="col-md-1">
                        <img src="${url}" alt="${alt}" class="img-fluid">
                    </div>
                    <div class="col-md-4">
                        <div class="card-body">
                            <div class="card-text PicTextContent">
                                ${url}
                            </div>
                        </div>

                    </div>
                    <div class="col-md-2">${alt}</div>
                    <div class="col-md-2">${credit}</div>
                    ${isAdmin ? adminBtns : ""}
                </div>
            </li>
    `;
}

const createList = () => {
    const ADMIN_HEADLINES_ACTIONS = `
        <div class="col-md-1">Edit</div>
        <div class="col-md-1">Delete</div>
    `;
    const LIST_HEADLINES = `
    <li class="list-group-item ms-2">
        <div class="row">
            <div class="col-md-1">No.</div>
            <div class="col-md-1">
                Image
            </div>
            <div class="col-md-4">
                Pic
            </div>
            <div class="col-md-2">Title</div>
            <div class="col-md-2">Credit</div>
            ${isAdmin ? ADMIN_HEADLINES_ACTIONS : ""}
        </div>
    </li>`;

    clearEventListeners("PictureListDeleteButton", handleDeleteBtnClick);
    clearEventListeners("PictureListEditButton", handleEditBtnClick);

    let buffer = "" + LIST_HEADLINES;

    for (let picture of picturesArr){
        buffer += createListItem(picture.id,picture.url,picture.alt,picture.credit);
    }

    listPicturesUnorderedList.innerHTML = buffer;

    createBtnEventListener("PictureListDeleteButton", handleDeleteBtnClick);
    createBtnEventListener("PictureListEditButton", handleEditBtnClick);
}

export {initializePicturesList, updatePicturesList};
