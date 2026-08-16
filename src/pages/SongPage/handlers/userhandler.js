import { findallusers } from "../../../services/userService.js";
import { openChatModal } from "../../ChatPage/chat.js";
import { dom } from "../../../components/songpagecomponents.js";
import { getUserFavoriteSongs } from "../../../services/userService.js";
import { websocketService } from "../../../services/websocketService.js";
import { setFavoriteSongListToLocalStorage } from "./songhandler.js";
import { userInfoHandler } from "../../UserInfoPage/userinfo.js";
import { getFriendList } from "../../../services/friendService.js";
import { userInfoMap } from "../../../components/commoncomponents.js";

export async function loadUserChatList() {

    if (localStorage.getItem('loginStatus') === 'true') {
        console.log("Load userlist");

        const userList = await findallusers(localStorage.getItem("userId"));
        // const accessToken = localStorage.getItem('accessToken');
        // let userList = null;
        // if (accessToken) {

        //     const responseData = await getFriendList(localStorage.getItem('accessToken'));

        //     if (responseData) {

        //         userList = await responseData.json();
        //         console.log(userList);
        //     }


        // }


        if (userList && userList.length !== 0) {

            for (const userInfo of userList) {

                if (userInfo.username !== localStorage.getItem('userName')) {

                    userInfoMap.set(userInfo.userId, userInfo);

                    //Create html components:
                    const li = document.createElement('li');
                    const span = document.createElement('span');

                    span.textContent = userInfo.ownername;

                    li.appendChild(span);
                    li.addEventListener('click', async () => await userInfoHandler.openUserInfoModal(userInfoMap.get(userInfo.userId)));

                    dom.userChatList.appendChild(li);

                }
            }



        }
    }

}

export async function setInfoAfterLogin(user) {
    //
    websocketService.establishConnection(user.username);

    localStorage.setItem('accessToken', user.accessToken);
    localStorage.setItem('loginStatus', 'true');
    localStorage.setItem('ownerName', user.ownername);
    localStorage.setItem('userName', user.username);
    localStorage.setItem('userId', user.userId);

    //
    if (user.userId) {

        const favoriteSongList = await getUserFavoriteSongs(user.userId);

        if (favoriteSongList && favoriteSongList.length !== 0) {

            setFavoriteSongListToLocalStorage(favoriteSongList);
        }

    }

}

