import validate from "./validate.js";
const validateNumber = (value, prefixLabel) => {
    const reg = new RegExp("^[0-9]+$", "ig");

    return validate(reg, value, 1, 15).map((err) => `${prefixLabel} is ${err}`);

};

export default validateNumber;