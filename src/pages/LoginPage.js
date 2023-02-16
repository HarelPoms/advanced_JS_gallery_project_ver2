import PAGES from "../models/pageModel.js"
import { handlePageChange } from "../routes/router.js";
import validateEmail from "../validation/validateEmail.js";
import validatePassword from "../validation/validatePassword.js";

const loginEmailInput = document.getElementById("login-input-email");
const loginPasswordInput = document.getElementById("login-input-password");
const loginRegisterIfNoAccountLink = document.getElementById("login-goto-register-page");
const btnLogin = document.getElementById("login-btn");

window.addEventListener("load", () => {
  //when page loaded
    loginEmailInput.value = "";
    loginPasswordInput.value = "";
});

loginEmailInput.addEventListener("input", () => {
    let errorArr = validateEmail(loginEmailInput.value);
    if (errorArr.length === 0) {
        //no error
        loginEmailInput.classList.remove("is-invalid");
        document.getElementById("login-alert-email").classList.add("d-none");
    } else {
        // error/s
        loginEmailInput.classList.add("is-invalid");
        document.getElementById("login-alert-email").classList.remove("d-none");
        document.getElementById("login-alert-email").innerHTML = errorArr.join("<br>"); 
    }
});

loginPasswordInput.addEventListener("input", () => {
    let errorArr = validatePassword(loginPasswordInput.value);
    if (errorArr.length === 0) {
        //no error
        loginPasswordInput.classList.remove("is-invalid");
        document.getElementById("login-alert-password").classList.add("d-none");
    } else {
        // error/s
        loginPasswordInput.classList.add("is-invalid");
        document.getElementById("login-alert-password").classList.remove("d-none");
        document.getElementById("login-alert-password").innerHTML =
        errorArr.join("<br>");
    }
});

btnLogin.addEventListener("click", () => {
    if (validateEmail(loginEmailInput.value).length) {
        return;
    }
    if (validatePassword(loginPasswordInput.value).length) {
        return;
    }
    let users = JSON.parse(localStorage.getItem("users"));
    if (!users) {
        //users === null
        return;
    }
    let user = users.find(
        (currUser) =>
        currUser.email === loginEmailInput.value &&
        currUser.password === loginPasswordInput.value);
        
    if (!user) {
        console.log("invalid email and/or password");
        return;
    }
    localStorage.setItem("token", JSON.stringify({id: user.id, first_name:user.first_name, 
        last_name: user.last_name, email:user.email, isAdmin: user.isAdmin}));
    //initProfile(user);
    handlePageChange(PAGES.HOME);
    //location.reload();
});

loginRegisterIfNoAccountLink.addEventListener("click", ()=>{
    handlePageChange(PAGES.REGISTER);
})