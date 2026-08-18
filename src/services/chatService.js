// const BASE_URL = "http://localhost:8080";
// const BASE_URL = "https://khaki-boxes-post.loca.lt";
// const BASE_URL = "https://hidropoietic-unloyally-eleonor.ngrok-free.dev";
import { BASE_URL } from "../components/commoncomponents.js";


export class ChatMessage {
    constructor(senderUsername, receiverUsername) {
        this.senderUsername = senderUsername;
        this.receiverUsername = receiverUsername;
    }

    setContent(content) {
        this.content = content;
    }


}

export class ChatMessageResponse {

    constructor(chatMessage, sendStatus) {
        this.chatMessage = chatMessage;
        this.sendStatus = sendStatus;
    }

    setReceiverStatus(receiverStatus) {
        this.receiverStatus = receiverStatus;
    }
}



export async function display_conversation(chatMessage, accessToken) {

    // const responseData = await fetch(BASE_URL + "/auth/chatmessage/display_conversation", {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer ' + accessToken

    //     },
    //     body: JSON.stringify(chatMessage)

    // });

    // return responseData;

    try {
        const responseData = await fetch(BASE_URL + "/auth/chatmessage/display_conversation", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
            body: JSON.stringify(chatMessage)
        });

        return responseData;
    } catch (error) {
        return {
            status: 401
        };
    }

}


