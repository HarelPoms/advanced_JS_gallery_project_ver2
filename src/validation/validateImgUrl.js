import validate from "./validate.js";
const validateImgUrl= (value) => {
    const reg = new RegExp(
    "^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$",
    "ig");
    return validate(reg, value, 5, 255).map((err) => `Image Url is ${err}`);
};

export default validateImgUrl;
