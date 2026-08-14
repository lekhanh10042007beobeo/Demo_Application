// const BASE_URL = "http://localhost:8080/auth/friends";
// const BASE_URL = "https://khaki-boxes-post.loca.lt/auth/friends";
// const BASE_URL = "https://hidropoietic-unloyally-eleonor.ngrok-free.dev/friends";
import { BASE_URL } from "../components/apicomponents.js";
const BASE_FRIEND_URL = BASE_URL + "/auth/friends";


class FriendShipRequest {

    constructor(senderId, receiverId, friendRequestStatus) {

        this.senderId = senderId;
        this.receiverId = receiverId;
        this.friendRequestStatus = friendRequestStatus;

    }

}

async function postFriendShipData(friendShipRequest, path) {

    const responseData = await fetch(BASE_FRIEND_URL + path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(friendShipRequest)

    });

    return responseData;

}

export async function sendFriendRequest(friendShipRequest) {

    return await postFriendShipData(friendShipRequest, "/sendfriendrequest");

}

export async function updateFriendStatus(friendShipRequest) {

    return await postFriendShipData(friendShipRequest, "/updatefriendrequest");
}

export async function getFriendList(accessToken) {
    const responseData = await fetch(BASE_FRIEND_URL, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    });

    return responseData;

}