const validate = (regex, value, min, max) => {
    let msgsArr = [];
    if(value.length < min){
        msgsArr = [...msgsArr, " Too short"];
    }
    if(value.length > max){
        msgsArr = [...msgsArr, " Too long"];
    }
    if(!regex.test(value)){
        msgsArr = [...msgsArr, " invalid"]
    }
    return msgsArr;
}

export default validate;