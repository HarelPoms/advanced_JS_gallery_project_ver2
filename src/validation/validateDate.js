import validate from "./validate.js";
const validateDate = (value, prefixLabel = "Created At") => {
    const reg = new RegExp("^[0-9]{2}[\/]{1}[0-9]{2}[\/]{1}[0-9]{4}$", "ig");

    return validate(reg, value, 10, 10).map((err) => `${prefixLabel} is ${err}`);
};

export default validateDate;