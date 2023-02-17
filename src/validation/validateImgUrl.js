import validate from "./validate.js";
const validateImgUrl= (value) => {
    const reg = new RegExp(
    "(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)",
    "ig");
    return validate(reg, value, 5, 255).map((err) => `Image Url is ${err}`);
};

export default validateImgUrl;
