import Picture from "../models/Picture.js";
import Address from "../models/Address.js";
import User from "../models/User.js"
let pic_id = 1;
let user_id = 1;
const createPicturesData = () => {
    let picturesArr = [
    new Picture(pic_id++, "https://images.unsplash.com/photo-1605111126681-b6d79e2d4917?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8bGlvbnx8fHx8fDE2NzY1NDQ0NzE&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=300","Savanah Lion", "Andy Chilton", 600 ),
    new Picture(pic_id++, "https://images.unsplash.com/photo-1664699259219-04145e542951?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8U25vdyBMZW9wYXJkfHx8fHx8MTY3NjQ1NjU0NA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=300","Snow Leopard", "Robert Sachowski", 4000 ), 
    new Picture(pic_id++, "https://images.unsplash.com/photo-1675892643941-2e4a48481e80?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY3NjQ1NTg1MQ&ixlib=rb-4.0.3&q=80&w=300","Switzerland Alps", "Daniel Lloyd", 1000 ),
    new Picture(pic_id++, "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8bmF0dXJlfHx8fHx8MTY3NjU0NDMzNQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=300","Sunset Meadow", "David Clode", 700 ), 
    new Picture(pic_id++, "https://images.unsplash.com/photo-1639505905982-834ba810dbcf?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8QmFsZCBFYWdsZXx8fHx8fDE2NzY0NTY2MDU&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=300","Bald Eagle", "Iewek Gnos", 2000 ),
    new Picture(pic_id++, "https://images.unsplash.com/photo-1568430328012-21ed450453ea?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8V2hhbGV8fHx8fHwxNjc2NDU2Mzkz&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=300","Humpback Whale", "Mathew Schwartz", 3000 ), 
    ];
    return picturesArr;
};

const createUsersData = () => {
    let usersArr = [
        new User(user_id++, "Harel", "Poms", new Address("Israel", "Not Relevant", "Ramat Hasharon", "Anonymous", 4, 67900), "hareldanielpoms@gmail.com", "0515936542", "Aa123456!", true ),
        new User(user_id++, "Kenny", "Jenkins", new Address("USA", "Texas", "Huston", "Anonymous", 1, 1234900), "kenny@gmail.com", "0515456542", "Aa123456!", false ),
        new User(user_id++, "Bob", "Lincoln", new Address("USA", "Iowa", "Forgot", "Anonymous", 8, 1267800), "bob@gmail.com", "0518906542", "Aa123456!", false )
        ];
    return usersArr;
}

const setInitialData = () => {
    let pictures = localStorage.getItem("pics");
    let users = localStorage.getItem("users");
    if(pictures){
    }
    else{
        localStorage.setItem("pics", JSON.stringify(createPicturesData()));
        localStorage.setItem("next_pic_id", JSON.stringify(pic_id + ""));
    }

    if(users){
    }
    else{
        localStorage.setItem("users", JSON.stringify(createUsersData()));
        localStorage.setItem("next_user_id", JSON.stringify(user_id + ""));
    }
}

setInitialData();