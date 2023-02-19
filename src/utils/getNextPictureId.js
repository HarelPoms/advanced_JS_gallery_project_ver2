const getNextPictureId = () => {
    let nextPictureId = localStorage.getItem("next_pic_id");
    if(!nextPictureId){
        
        nextPictureId = 1;
        return;
    }

    nextPictureId = parseInt(JSON.parse(nextPictureId));

    if(isNaN(nextPictureId)){
        nextPictureId = 1;
    }
    return nextPictureId;
}

export default getNextPictureId;