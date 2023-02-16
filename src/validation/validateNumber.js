import validate from "./validate.js";
const validateNumber = (value, label) => {
    const reg = new RegExp("/^\d+$/", "ig");

    return validate(reg, value, 2, 10).map((err) => `${label} is ${err}`);

};

export default validateNumber;