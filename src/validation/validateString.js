import validate from "./validate.js";
const validateString = (value, prefixLabel) => {
    const reg = new RegExp("^[a-zA-Z ]*$", "ig");
    return validate(reg, value, 2, 20).map((err) => `${prefixLabel} is ${err}`);
};

export default validateString;