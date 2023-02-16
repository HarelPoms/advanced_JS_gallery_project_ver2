import validate from "./validate.js";
const validateName = (value, prefix = "") => {
    const reg = new RegExp("^[A-Z][a-z0-9-s]{2,255}$", "ig");

    return validate(reg, value, 2, 10).map((err) => `${prefix} Name is ${err}`);

};

export default validateName;