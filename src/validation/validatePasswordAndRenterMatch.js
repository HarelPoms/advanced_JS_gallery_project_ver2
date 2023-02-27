const validatePasswordAndRenterMatch = (passwordElem, renterElem) => {
    return passwordElem.value == renterElem.value;
};

export default validatePasswordAndRenterMatch;