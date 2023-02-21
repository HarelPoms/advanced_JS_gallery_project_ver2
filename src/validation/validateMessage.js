import validate from "./validate.js";
const validateMessage = (value) => {
    const reg = new RegExp("^[a-zA-Z ]*$", "ig");
    return validate(reg, value, 10, 20).map((err) => `Messsageis ${err}`);
};

export default validateString;