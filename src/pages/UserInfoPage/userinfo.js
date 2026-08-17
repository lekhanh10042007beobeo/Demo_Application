import { dom } from "../../components/songpagecomponents.js";
import { openChatModal } from "../ChatPage/chat.js";
import { userInfoRenderUI } from "./render/userinfoUI.js";

class UserInfoHandler {

    constructor() { }

    async openUserInfoModal(userInfo) {
        dom.chatBoxContainer.style.display = "none";

        console.log("Open user information modal");

        const userInfoContainer = dom.userInfoContainer;

        const responseData = await fetch("../UserInfoPage/userinfo.html");

        userInfoContainer.innerHTML = await responseData.text();
        userInfoContainer.style.display = 'block';


        this.initData(userInfo);

        
    }




    initData(userInfo) {
        console.log(userInfo);

        document.getElementById("close-popup").addEventListener("click", () => {
            dom.userInfoContainer.style.display = 'none';
        });;

        document.getElementById("popup-username").textContent = userInfo.ownername;

        document.getElementById("chat-btn").addEventListener("click", async () => {
            dom.userInfoContainer.style.display = 'none';

            await openChatModal(userInfo);
        });

        userInfoRenderUI.renderFriendRequestStatusButton(document.getElementById("friendStatus-btn"), userInfo);    

    }


}

export const userInfoHandler = new UserInfoHandler();