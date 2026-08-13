//THIS FILE WILL DEFINATELY HAVE TO BE REFACTORED LATER ON!!!!!!!

import { display_conversation } from "../../services/chatService.js";
import { ChatMessage } from "../../services/chatService.js";
import { websocketService } from "../../services/websocketService.js";

const container = document.getElementById('activeChatBox');

const sendMessageButton = document.getElementById('sendMsgBtn');
const chatInputText = document.getElementById('chatInputText');


//functions which gonna be used outside the file
export async function openChatModal(userInfo) {
    const responseData = await fetch("../ChatPage/chat.html");
    const htmlText = await responseData.text();

    container.innerHTML = htmlText;

    container.style.display = 'block';


    // Set information:
    closeChatModal(document.getElementById('closeChatBtn'));

    setChatWithOwnerName(document.getElementById('chatWithUsername'), userInfo.ownername);

    await show_message_with_single(localStorage.getItem('userName'),
        userInfo.username,
        document.getElementById('chatMessages'));

    sendMessage(document.getElementById('chatInputText'),
        document.getElementById('sendMsgBtn'),
        document.getElementById('chatMessages'),
        userInfo);


}

//supported functions:

function closeChatModal(closeChatBtn) {
    if (closeChatBtn) {

        closeChatBtn.addEventListener('click', () => {

            container.style.display = 'none';

        });
    }
}

function setChatWithOwnerName(span, ownerName) {
    span.textContent = ownerName;
}

async function show_message_with_single(username, receiverUsername, chatMessagesContainer) {

    const chatMessageRequest = new ChatMessage(username, receiverUsername);

    if (localStorage.getItem('accessToken')) {

        const responseData = await display_conversation(chatMessageRequest, localStorage.getItem('accessToken'));

        if (responseData.ok) {

            const chatMessageList = await responseData.json();

            for (const chatMessage of chatMessageList) {

                const senderUsernameFromServer = chatMessage.senderUsername;
                const receiverUsernameFromServer = chatMessage.receiverUsername;

                const messageDiv = document.createElement('div');
                const messageContent = document.createElement('p');
                const sendTime = document.createElement('span');



                if (senderUsernameFromServer === username) {

                    messageDiv.classList.add("message", "outgoing");


                }

                else if (senderUsernameFromServer === receiverUsername) {

                    messageDiv.classList.add("message", "incoming");

                }

                messageContent.textContent = chatMessage.content;

                sendTime.textContent = chatMessage.sendAt;
                sendTime.classList.add("time");

                messageDiv.appendChild(messageContent);
                messageDiv.appendChild(sendTime);


                chatMessagesContainer.appendChild(messageDiv);
                chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;



            }

        }

        //Later I'm gonna log out the user when the accessToken is invalid!!
        else {
            console.warn("Your login session was due");

            localStorage.clear();

            location.reload();

        }
    }

}

function sendMessage(chatInputText, sendMessageButton, chatMessagesContainer, userInfo) {

    chatInputText.addEventListener('keydown', async (event) => {

        if (chatInputText.value !== "" && event.key == "Enter") {

            createSingleMessage(chatInputText, chatMessagesContainer, userInfo);

        }

    });


    sendMessageButton.addEventListener('click', async () => {

        createSingleMessage(chatInputText, chatMessagesContainer, userInfo);

    });


}

function createSingleMessage(chatInputText, chatMessagesContainer, userInfo) {

    if (localStorage.getItem('userName') && chatInputText.value !== "") {

        //send chatmessageRequestToServer:

        const chatMessageRequest = new ChatMessage(localStorage.getItem('userName'), userInfo.username);
        chatMessageRequest.setContent(chatInputText.value);


        websocketService.sendMessage(chatMessageRequest);

        //create html components:
        const messageDiv = document.createElement('div');
        const messageContent = document.createElement('p');
        const sendStatus = document.createElement('span');

        messageDiv.classList.add("message", "outgoing");

        messageContent.textContent = chatInputText.value;
        sendStatus.textContent = "sent";

        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(sendStatus);

        chatInputText.value = "";

        chatMessagesContainer.appendChild(messageDiv);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;


    }


}

