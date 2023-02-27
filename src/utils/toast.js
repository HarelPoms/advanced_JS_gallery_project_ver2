
const toastWrapper = document.getElementById("toast-wrapper");
let id = 1;

const generateToast = (errorTitle, errorMessage) => {
    let thisId = id++;
    return [
        `<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" id="error-toast-${thisId}">
            <div class="toast-header">
                <img src="assets/images/errorIcon.png" class="rounded me-2 toast-error-icon" alt="error Icon">
                <strong class="me-auto">${errorTitle}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close">
                </button>
            </div>
            <div class="toast-body">
                ${errorMessage}
            </div>
        </div>`,
        `error-toast-${thisId}`];
}
const showToast = (errorTitle, errorMessage) =>{
    let newToastWithId = generateToast(errorTitle, errorMessage);
    toastWrapper.innerHTML += newToastWithId[0];
    const toast = new bootstrap.Toast(document.getElementById(newToastWithId[1]));
    toast.show()
    setTimeout(() => {
        document.getElementById(newToastWithId[1]).remove();
    }, 3000);
    
}

export {showToast};

