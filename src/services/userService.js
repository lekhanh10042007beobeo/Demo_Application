// const BASE_URL = "http://localhost:8080/users";
// const BASE_URL = "https://khaki-boxes-post.loca.lt/users";
// const BASE_URL = "https://hidropoietic-unloyally-eleonor.ngrok-free.dev/users";
import { BASE_URL } from "../components/commoncomponents.js";

const BASE_USER_URL = BASE_URL + "/users";

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}
class UserFavoriteSongRequest {
    constructor(userId, songId) {
        this.userId = userId;
        this.songId = songId;
    }
}
export class UserInfo {

    constructor(userId, username, ownername) {
        this.userId = userId;
        this.username = username;
        this.ownername = ownername;
    }

    setFriendRequestStatus(friendRequestStatus) {
        this.friendRequestStatus = friendRequestStatus;
    }

}


export async function login(username, password) {

    if (username !== "" && password !== "") {
        const responseData = await fetch(BASE_USER_URL + "/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(new User(username, password))

        });

        return await responseData.json();
    }

}

export async function findallusers(userId) {

    const responseData = await fetch(BASE_USER_URL + "/findallusers/" + userId);

    return await responseData.json();

}

export async function getUserFavoriteSongs(userId) {

    if (userId) {

        const responsData = await fetch(BASE_USER_URL + "/getfavoritesongs/" + userId);

        return responsData.json();

    }

    return null;
}

export async function addFavoriteSong(userFavoriteSongRequest) {

    const responseData = await fetch(BASE_USER_URL + "/addfavoritesong", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userFavoriteSongRequest)
    });

    return responseData;

}

export async function removeFavoriteSong(userFavoriteSongRequest) {

    const responseData = await fetch(BASE_USER_URL + "/removefavoritesong", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userFavoriteSongRequest)
    });

    return responseData;

}