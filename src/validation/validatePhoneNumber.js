import validate from "./validate.js";

const validatePhoneNumber = (value, prefixLabel) => {
    const reg = new RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$", "ig");

    return validate(reg, value, 10, 13).map((err) => `${prefixLabel} is ${err}`);
};

export default validatePhoneNumber;