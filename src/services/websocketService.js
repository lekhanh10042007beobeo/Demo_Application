import { openChatModal } from "../pages/ChatPage/chat.js";


// const BASE_URL = "ws://localhost:8080/chat?username=";
const BASE_URL = "wss://longest-rubber-throws-debate.trycloudflare/chat?username=";

class WebSocketService {

    constructor() {
        this.websocket = null;
    }

    establishConnection(username) {

        if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
            return;
        }

        this.websocket = new WebSocket(BASE_URL + username);

        this.websocket.onopen = (event) => {

            console.log("handshake websocket successfully");
        }

        this.websocket.onmessage = (event) => {

            display_message_announcement(event);


        }

        this.websocket.onclose = (event) => {

            console.log('websocket closed');

        }

    }

    sendMessage(chatmessage) {
        if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {

            this.websocket.send(JSON.stringify(chatmessage));

            console.log(JSON.stringify(chatmessage));
        }
    }

}

function display_message_announcement(event) {

    const dataResponse = JSON.parse(event.data);

    const chatMessageInfo = dataResponse.chatMessage;

    if (localStorage.getItem('userName') && chatMessageInfo.senderUsername !== localStorage.getItem('userName')) {

        const userNameMap = new Map(JSON.parse(localStorage.getItem('usernameMap')));

        const userInfo = {
            username: chatMessageInfo.senderUsername,
            ownername: userNameMap.get(chatMessageInfo.senderUsername)

        }

        openChatModal(userInfo);

    }
}



export const websocketService = new WebSocketService();