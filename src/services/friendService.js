// const BASE_URL = "http://localhost:8080/auth/friends";
// const BASE_URL = "https://khaki-boxes-post.loca.lt/auth/friends";
// const BASE_URL = "https://hidropoietic-unloyally-eleonor.ngrok-free.dev/friends";
import { BASE_URL } from "../components/commoncomponents.js";
const BASE_FRIEND_URL = BASE_URL + "/auth/friends";


export class FriendShipRequest {

    constructor(senderId, receiverId) {

        this.senderId = senderId;
        this.receiverId = receiverId;
    }

    setFriendRequestStatus(friendRequestStatus) {
        this.friendRequestStatus = friendRequestStatus;
    }

}

async function postFriendShipData(friendShipRequest, path) {

    try {
        const responseData = await fetch(BASE_FRIEND_URL + path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')

            },
            body: JSON.stringify(friendShipRequest)

        });

        return responseData;
    }
    catch (error) {
        return {
            status: 401,
            async json() { return {}; }
        };
    }

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