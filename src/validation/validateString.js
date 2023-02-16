import validate from "./validate.js";
const validateString = (value, prefixLabel) => {
    const reg = new RegExp("^[A-Za-z0-9]*$", "ig");

    return validate(reg, value, 2, 10).map((err) => `${prefixLabel} is ${err}`);

};

export default validateString;