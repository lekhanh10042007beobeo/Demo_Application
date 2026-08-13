// const BASE_URL = "http://localhost:8080/users";
const BASE_URL = "https://old-peas-report.loca.lt/users";
// const BASE_URL = "https://hidropoietic-unloyally-eleonor.ngrok-free.dev/users";

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

export async function login(username, password) {

    if (username !== "" && password !== "") {
        const responseData = await fetch(BASE_URL + "/login", {
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

    const responseData = await fetch(BASE_URL + "/findallusers/" + userId);

    return await responseData.json();

}

export async function getUserFavoriteSongs(userId) {

    if (userId) {

        const responsData = await fetch(BASE_URL + "/getfavoritesongs/" + userId);

        return responsData.json();

    }

    return null;
}

export async function addFavoriteSong(userFavoriteSongRequest) {

    const responseData = await fetch(BASE_URL + "/addfavoritesong", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userFavoriteSongRequest)
    });

    return responseData;

}

export async function removeFavoriteSong(userFavoriteSongRequest) {

    const responseData = await fetch(BASE_URL + "/removefavoritesong", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userFavoriteSongRequest)
    });

    return responseData;

}