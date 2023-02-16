import PAGES from "./models/pageModel.js";
import { handlePageChange } from "./routes/router.js";
import "./initialData/initialData.js";
import "./pages/RegisterPage.js";
import "./pages/LoginPage.js";

const navHomeLink = document.getElementById("nav-home-link");
const navAboutUsLink = document.getElementById("nav-aboutus-link");
const navContactUsLink = document.getElementById("nav-contactus-link");
const navLoginUsLink = document.getElementById("nav-login-link");
const navRegisterUsLink = document.getElementById("nav-register-link");
const navEditProfilePage = document.getElementById("nav-edit-profile-page");
const navLogout = document.getElementById("nav-logout");


navHomeLink.addEventListener("click", function(){
    handlePageChange(PAGES.HOME);
})
navAboutUsLink.addEventListener("click", function() {
    handlePageChange(PAGES.ABOUT);
})
navContactUsLink.addEventListener("click", function(){
    handlePageChange(PAGES.CONTACT);
})
navLoginUsLink.addEventListener("click", function() {
    handlePageChange(PAGES.LOGIN);
})
navRegisterUsLink.addEventListener("click", function(){
    handlePageChange(PAGES.REGISTER);
})

navEditProfilePage.addEventListener("click", () => {
    handlePageChange(PAGES.PROFILE);
});