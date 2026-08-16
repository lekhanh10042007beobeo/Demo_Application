import { sendFriendRequest } from "../../../services/friendService.js";
import { FriendShipRequest } from "../../../services/friendService.js";
import { updateFriendStatus } from "../../../services/friendService.js";
import { userInfoMap } from "../../../components/commoncomponents.js";
import { UserInfo } from "../../../services/userService.js";

class UserInfoRender {

    constructor() { }

    renderFriendRequestStatusButton(friendStatusButton, userInfo) {
        //     NONE,
        //     SENT,
        //     REQUESTED,
        //     ACCEPTED,
        //     REJECTED
        console.log(userInfo.friendRequestStatus);

        const updateFriendStatusUI = (status) => {

            if (status === "NONE" || status === "REJECTED") {
                friendStatusButton.textContent = "+ Friend";
                friendStatusButton.title = "Gửi lời mời kết bạn";

                friendStatusButton.onclick = async () => {

                    const friendshipRequest = new FriendShipRequest(localStorage.getItem('userId'), userInfo.userId);
                    await sendFriendRequest(friendshipRequest);

                    const newUserInfo = new UserInfo(userInfo.userId, userInfo.username, userInfo.ownername);
                    newUserInfo.setFriendRequestStatus("SENT");
                    userInfoMap.set(userInfo.userId, newUserInfo);

                    updateFriendStatusUI("SENT");
                };

            }
            else if (status === "SENT") {

                friendStatusButton.textContent = "You sent " + userInfo.ownername + " a friend request";
                friendStatusButton.title = "Hủy yêu cầu";

                friendStatusButton.onclick = async () => {

                    const friendshipRequest = new FriendShipRequest(localStorage.getItem('userId'), userInfo.userId);
                    friendshipRequest.setFriendRequestStatus("NONE");

                    const newUserInfo = new UserInfo(userInfo.userId, userInfo.username, userInfo.ownername);
                    newUserInfo.setFriendRequestStatus("NONE");
                    userInfoMap.set(userInfo.userId, newUserInfo);

                    await updateFriendStatus(friendshipRequest);

                    updateFriendStatusUI("NONE");
                };

            }

            else if (status === "REQUESTED") {

                friendStatusButton.textContent = userInfo.ownername + " sent you a friend request";
                friendStatusButton.title = "";

                document.getElementById('popup-menu').style.display = "flex";

                //
                document.getElementById('acceptButton').onclick = async () => {

                    const friendshipRequest = new FriendShipRequest(localStorage.getItem('userId'), userInfo.userId);
                    friendshipRequest.setFriendRequestStatus("ACCEPTED");

                    const newUserInfo = new UserInfo(userInfo.userId, userInfo.username, userInfo.ownername);
                    newUserInfo.setFriendRequestStatus("ACCEPTED");
                    userInfoMap.set(userInfo.userId, newUserInfo);

                    await updateFriendStatus(friendshipRequest);


                    updateFriendStatusUI("ACCEPTED");

                    document.getElementById('popup-menu').style.display = "none";



                }
                document.getElementById('denyButton').onclick = async () => {
                    const friendshipRequest = new FriendShipRequest(localStorage.getItem('userId'), userInfo.userId);
                    friendshipRequest.setFriendRequestStatus("REJECTED");

                    const newUserInfo = new UserInfo(userInfo.userId, userInfo.username, userInfo.ownername);
                    newUserInfo.setFriendRequestStatus("REJECTED");
                    userInfoMap.set(userInfo.userId, newUserInfo);

                    await updateFriendStatus(friendshipRequest);

                    updateFriendStatusUI("NONE");

                    document.getElementById('popup-menu').style.display = "none";

                }

            }
            //ACCEPTED
            else {

                friendStatusButton.textContent = "✓ Friends";
                friendStatusButton.title = "Hủy kết bạn";

                friendStatusButton.onclick = async () => {

                    const friendshipRequest = new FriendShipRequest(localStorage.getItem('userId'), userInfo.userId);
                    friendshipRequest.setFriendRequestStatus("NONE");

                    const newUserInfo = new UserInfo(userInfo.userId, userInfo.username, userInfo.ownername);
                    newUserInfo.setFriendRequestStatus("NONE");
                    userInfoMap.set(userInfo.userId, newUserInfo);

                    await updateFriendStatus(friendshipRequest);

                    updateFriendStatusUI("NONE");
                };

            }

        }

        updateFriendStatusUI(userInfo.friendRequestStatus);

    }


}

export const userInfoRenderUI = new UserInfoRender();