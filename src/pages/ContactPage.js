import validateEmail from "../validation/validateEmail.js";
import validateName from "../validation/validateName.js";
import validateString from "../validation/validateString.js";
let contactNameInput;
let contactEmailInput;
let contactMessageInput;
let btnSubmitContactForm;
let formSubmitResult;
let inputOkArr = [false, false, false];
const inputIndexes = {
	name: 0,
	email: 1,
    msg: 2
}

window.addEventListener("load", () => {
    //when page is loaded
    initElems();
    firstLoadChecks();
    initEventListeners();
});

const checkInput = (contactInput, contactAlert, contactBooleanIndex, validateFunc, prefixLabel) => {
    let errorArr = validateFunc(contactInput.value, prefixLabel);
    if (errorArr.length === 0) {
    //no error
        contactInput.classList.remove("is-invalid");
        document.getElementById(contactAlert).classList.add("d-none");
        inputOkArr[contactBooleanIndex] = true;
    } else {
        // error/s
        contactInput.classList.add("is-invalid");
        document.getElementById(contactAlert).classList.remove("d-none");
        document.getElementById(contactAlert).innerHTML = errorArr.join("<br>"); 
        inputOkArr[contactBooleanIndex] = false;
    }
    checkIfCanEnableButton();
}

const initElems = ()=> {
    contactNameInput = document.getElementById("contact-input-name");
    contactEmailInput = document.getElementById("contact-input-email");
    contactMessageInput = document.getElementById("contact-input-message");
    btnSubmitContactForm = document.getElementById("contact-btn");
    formSubmitResult = document.getElementById("submitSuccessMessage");
}

const initEventListeners = () => {
    contactNameInput.addEventListener("input", () => {
        checkInput(contactNameInput, "contact-alert-name", inputIndexes.name, validateName, "");
    });

    contactEmailInput.addEventListener("input", () => {
        checkInput(contactEmailInput, "contact-alert-email", inputIndexes.email, validateEmail, "Email ");
    });

    contactMessageInput.addEventListener("input", () => {
        checkInput(contactMessageInput, "contact-alert-message", inputIndexes.msg, validateString, "Message ");
    });
    btnSubmitContactForm.addEventListener("click", () => {
        if(!(inputOkArr[inputIndexes.name] 
            && inputOkArr[inputIndexes.email]
            && inputOkArr[inputIndexes.msg]
            ))
        {
                return;
        }
        formSubmitResult.innerHTML = "Form submission successful!";
        formSubmitResult.classList.remove("d-none");
        setTimeout( ()=>{formSubmitResult.innerHTML=""; formSubmitResult.classList.add("d-none");}, 3000);        
    })
}

const firstLoadChecks = ()=>{
    if (contactNameInput.value !== "") {
        checkInput(contactNameInput, "contact-alert-name", inputIndexes.name, validateName, "Name ");
    }
    if (contactEmailInput.value !== "") {
        checkInput(contactEmailInput, "contact-alert-email", inputIndexes.email, validateEmail, "Email ");
    }
    if (contactMessageInput.value !== "") {
        checkInput(contactMessageInput, "contact-alert-message", inputIndexes.msg, validateString, "Message ");
    }

}

const checkIfCanEnableButton = () => {
    if(!(inputOkArr[0] && inputOkArr[1] && inputOkArr[2]))
    {
        btnSubmitContactForm.classList.add("disabled");
    }
    else{
        btnSubmitContactForm.classList.remove("disabled");
    }
}