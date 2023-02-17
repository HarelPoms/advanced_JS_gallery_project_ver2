const createBtnEventListener = (idKeyword, handleFunc) => {
    let Btns = document.querySelectorAll(`[id^=${idKeyword}-]`);
    for (let Btn of Btns){
        Btn.addEventListener("click", handleFunc);
    }
}

export {createBtnEventListener}