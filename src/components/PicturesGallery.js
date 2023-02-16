let galleryDiv;
let isAdmin;
let picturesArr;

const initializePicturesGallery = (picturesArrFromHomePage, isAdminParam) => {
    galleryDiv = document.getElementById("home-page-pictures-gallery");
    isAdmin = isAdminParam;
    updatePicturesGallery(picturesArrFromHomePage);
}

const updatePicturesGallery = (picturesArrFromHomePage) => {
    picturesArr = picturesArrFromHomePage;
    createGallery();
}

const createCard = (id, url, alt, credit, price) => {
    const adminBtns = `<button type="button" class="btn btn-warning" id="PictureGalleryEditButton-${id}">
                                <i class="bi bi-pen-fill"></i> Edit
                            </button>
                            <button type="button" class="btn btn-danger" 
                            id="PictureGalleryDeleteButton-${id}">
                                <i class="bi bi-x-circle-fill"></i> Delete
                            </button>`;
    return `
    <div class="col">
        <div class="card">
        <img
            src="${url}"
            class="card-img-top"
            alt="${alt}"
        />
        <div class="card-body">
            <h5 class="card-title">${alt}</h5>
            <p class="card-text">
            Credits: <b>${credit}</b>
            </p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between">
                <span>Price: <b>${price}$</b></span>
            
                <button type="button" class="btn btn-success">
                    <i class="bi bi-cart"></i>
                </button>
            </li>
        </ul>
        <div class="card-body d-flex justify-content-center">
            
            ${isAdmin ? adminBtns : ""}
        </div>
        </div>
    </div>
    `;
};

const createGallery = () => {
    let buffer = "";

    for (let picture of picturesArr){
        buffer += createCard(picture.id,picture.url,picture.alt,picture.credit,picture.price);
    }

    galleryDiv.innerHTML = buffer;
}

export {initializePicturesGallery};