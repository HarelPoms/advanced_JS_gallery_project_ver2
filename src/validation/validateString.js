import validate from "./validate.js";
const validateString = (value, label) => {
    const reg = new RegExp("/^[a-zA-Z]+$/", "ig");

    return validate(reg, value, 2, 10).map((err) => `${label} is ${err}`);

};

export default validateString;