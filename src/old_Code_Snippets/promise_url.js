
function isImgUrlPromise(url) {
    const img = new Image();
    img.src = url;
    return new Promise((resolve) => {
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
    });
}

const urlPromise = async (givenUrl) => {
    try {
        let res = await isImgUrlPromise(givenUrl);
        console.log("🚀 ~ file: Popup.js:161 ~ urlPromise ~ res:", res)
        return res;
    }
    catch (err) {
        console.log("🚀 ~ file: Popup.js:165 ~ urlPromise ~ err:", err)
        return false;
    }
};

const testImage = async (url) => {

    // Define the promise
    const imgPromise = new Promise(function imgPromise(resolve, reject) {

        // Create the image
        const imgElement = new Image();

        // When image is loaded, resolve the promise
        imgElement.addEventListener('load', function imgOnLoad() {
            resolve(this);
        });

        // When there's an error during load, reject the promise
        imgElement.addEventListener('error', function imgOnError() {
            reject();
        })

        // Assign URL
        imgElement.src = url;

    });

    return imgPromise;
}


let URLRegexValidityCheck = validateImgUrl(editPicturesPopupUrl.value);
//let URLImageValidityCheck = isImage(editPicturesPopupUrl.value);
let URLImageValidityCheckPromise = urlPromise(editPicturesPopupUrl.value);
// let URLImageValidityCheckMime = isImgUrlMime(editPicturesPopupUrl.value);
// console.log("🚀 ~ file: Popup.js:204 ~ editPicturesPopupUrl.addEventListener ~ URLImageValidityCheckMime:", URLImageValidityCheckMime)

URLImageValidityCheckPromise.then((urlPromiseResultValid) => {
    if(URLRegexValidityCheck.length == 0 &&  urlPromiseResultValid){
        editPicturesPopupImgDisplay.src = editPicturesPopupUrl.value;
        editPicturesSaveBtn.disabled = false;
    }
    else{
        editPicturesPopupImgDisplay.src = "../../public/assets/images/invalid_url.png";
        editPicturesSaveBtn.disabled = true;
    }
});


testImage(editPicturesPopupUrl.value).then((msg) => {
            editPicturesPopupImgDisplay.src = editPicturesPopupUrl.value;
            editPicturesSaveBtn.disabled = false;
        })
        .catch((err) => {
            editPicturesPopupImgDisplay.src = "../../public/assets/images/invalid_url.png";
            editPicturesSaveBtn.disabled = true;
        });