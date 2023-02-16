import PAGES from "../models/pageModel.js";
import { handlePageChange } from "../routes/router.js";
import validateEmail from "../validation/validateEmail.js";
import validatePassword from "../validation/validatePassword.js";
import validateName from "../validation/validateName.js";
import validateString from "../validation/validateString.js";
import validateNumber from "../validation/validateNumber.js";
import User from "../models/User.js";
import Address from "../models/Address.js"


const registerInputFirstName = document.getElementById("register-input-first-name");
const registerInputLastName = document.getElementById("register-input-last-name");
const registerInputCountry = document.getElementById("register-input-country");
const registerInputState = document.getElementById("register-input-state");
const registerInputCity = document.getElementById("register-input-city");
const registerInputStreet = document.getElementById("register-input-street");
const registerInputHouseNumber = document.getElementById("register-input-house-number");
const registerInputZipCode = document.getElementById("register-input-zip-code");
const registerInputEmail = document.getElementById("register-input-email");
const registerInputPhone = document.getElementById("register-input-phone");
const registerInputPassword = document.getElementById("register-input-password");
const registerInputReenterPassword = document.getElementById("register-input-re_enter-password");
const registerIsAdminChkbox = document.getElementById("isAdminCheckbox");
const btnRegisterSubmit = document.getElementById("register-submit-btn");
const btnRegisterCancel = document.getElementById("register-cancel-btn");
//Bool array to keep track of which inputs are valid for generic checkInput Func, 
//order: 0:firstName, 1:lastName, 2:email, 3:password, 4:country 5: zip-code
let inputOkArr = [false, false, false, false, false, false];
const inputIndexes = {
	firstName: 0,
	lastName: 1,
	email: 2,
	password: 3,
    country: 4,
    zip_code: 5
}
let reEnterPasswordOk = false;
let next_user_id = 1;

const checkInput = (registerInput, registerAlert, registerBooleanIndex, validateFunc, prefixLabel) => {
    let errorArr = validateFunc(registerInput.value, prefixLabel);
    if (errorArr.length === 0) {
    //no error
    registerInput.classList.remove("is-invalid");
    document.getElementById(registerAlert).classList.add("d-none");
    inputOkArr[registerBooleanIndex] = true;
    } else {
        // error/s
        registerInput.classList.add("is-invalid");
        document.getElementById(registerAlert).classList.remove("d-none");
        document.getElementById(registerAlert).innerHTML = errorArr.join("<br>"); 
        inputOkArr[registerBooleanIndex] = false;
    }
    checkIfCanEnableButton();
}

const checkPasswordToReEnterMatch = () => {
    reEnterPasswordOk = (registerInputPassword.value == registerInputReenterPassword.value);
    if(reEnterPasswordOk){
        registerInputReenterPassword.classList.remove("is-invalid");
        document.getElementById("register-alert-re_enter-password").classList.add("d-none");
    }
    else{
        registerInputReenterPassword.classList.add("is-invalid");
        document.getElementById("register-alert-re_enter-password").classList.remove("d-none");
        document.getElementById("register-alert-re_enter-password").innerHTML = "Re-entered password doesn't match actual given password";
    }
    checkIfCanEnableButton();
}


window.addEventListener("load", () => {
    //when page is loaded
    if (registerInputFirstName.value !== "") {
        checkInput(registerInputFirstName, "register-alert-first-name", inputIndexes.firstName, validateName, "First ");
    }
    if (registerInputLastName.value !== "") {
        checkInput(registerInputLastName, "register-alert-last-name", inputIndexes.lastName, validateName, "Last ");
    }
    if (registerInputEmail.value !== "") {
        checkInput(registerInputEmail, "register-alert-email", inputIndexes.email, validateEmail, "Email ");
    }
    if (registerInputPassword.value !== "") {
        checkInput(registerInputPassword, "register-alert-password", inputIndexes.password, validatePassword, "Password ");
    }
    if (registerInputCountry.value !== "") {
        checkInput(registerInputCountry, "register-alert-country", inputIndexes.country, validateString, "Country " );
    }
    if (registerInputZipCode.value !== "") {
        checkInput(registerInputZipCode, "register-alert-zip-code", inputIndexes.zip_code, validateNumber, "Zip-Code " );
    }
    if (registerInputReenterPassword.value !== "") {
        checkPasswordToReEnterMatch();
    }
    
});

registerInputFirstName.addEventListener("input", () => {
    checkInput(registerInputFirstName, "register-alert-first-name", inputIndexes.firstName, validateName, "First ");
});

registerInputLastName.addEventListener("input", () => {
    checkInput(registerInputLastName, "register-alert-last-name", inputIndexes.lastName, validateName, 
    "Last ");
});

registerInputEmail.addEventListener("input", () => {
    checkInput(registerInputEmail, "register-alert-email", inputIndexes.email, validateEmail, "Email ");
});

registerInputPassword.addEventListener("input", () => {
    checkInput(registerInputPassword, "register-alert-password", inputIndexes.password, validatePassword, "Password ");
});

registerInputReenterPassword.addEventListener("input", () => {
    checkPasswordToReEnterMatch();
});

registerInputCountry.addEventListener("input", ()=> {
    checkInput(registerInputCountry, "register-alert-country", inputIndexes.country, validateString, "Country " );
})

registerInputZipCode.addEventListener("input", ()=> {
    checkInput(registerInputZipCode, "register-alert-zip-code", inputIndexes.zip_code, validateNumber, "Zip-Code " );
})

const checkIfCanEnableButton = () => {
    (btnRegisterSubmit.disabled = !(inputOkArr[inputIndexes.firstName] 
        && inputOkArr[inputIndexes.lastName]  
        && inputOkArr[inputIndexes.email] 
        && inputOkArr[inputIndexes.password] 
        && inputOkArr[inputIndexes.country]
        && inputOkArr[inputIndexes.zip_code]
        && reEnterPasswordOk));
}

btnRegisterSubmit.addEventListener("click", () => {
    if(!(inputOkArr[inputIndexes.firstName] 
        && inputOkArr[inputIndexes.lastName]  
        && inputOkArr[inputIndexes.email] 
        && inputOkArr[inputIndexes.password] 
        && inputOkArr[inputIndexes.country]
        && inputOkArr[inputIndexes.zip_code]
        && reEnterPasswordOk))
    {
            return;
    }

    let users = localStorage.getItem("users");
    if(!users){
        users = [new User(next_user_id++,registerInputFirstName.value, registerInputLastName.value, new Address(registerInputCountry.value, registerInputState.value, registerInputCity.value, registerInputStreet.value, registerInputHouseNumber.value, registerInputZipCode.value), registerInputEmail.value, registerInputPhone.value, registerInputPassword.value,registerIsAdminChkbox.checked)];
        // save the array above into local storage,
        // users being key, and the value being the 
        // JSON string we get by converting users.
        localStorage.setItem("users", JSON.stringify(users));
        //update next_user_id in local storage
        localStorage.setItem("next_user_id", next_user_id + "");
    }
    else {
        users = JSON.parse(users);
        for(let user of users){
            if(user.email === registerInputEmail.value){
                //display msg - email already taken
                console.log("email already exists")
                return;
            }
        }
        next_user_id = (parseInt(JSON.parse(localStorage.getItem("next_user_id"))));
        users = [...users, new User(next_user_id++,registerInputFirstName.value, registerInputLastName.value, new Address(registerInputCountry.value, registerInputState.value, registerInputCity.value, registerInputStreet.value, registerInputHouseNumber.value, registerInputZipCode.value), registerInputEmail.value, registerInputPhone.value, registerInputPassword.value,registerIsAdminChkbox.checked)];
        localStorage.setItem("users",JSON.stringify(users));
        localStorage.setItem("next_user_id", next_user_id + "");
    }
    handlePageChange(PAGES.LOGIN);
})

btnRegisterCancel.addEventListener("click", ()=> {
    handlePageChange(PAGES.HOME);
})